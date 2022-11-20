import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { PointDto } from './dto/point.dto';
import { MQ } from './entities/mq.entity';
import { randomUUID } from 'crypto';
import * as Neode from 'neode';

@Injectable()
export class GeneratorService {
  constructor(private calculateService: CalculateService,
    @Inject('Connection') private readonly neode: Neode
  ) { }

  async generate(points: PointDto[]): Promise<MQ> {
    const xArr: number[] = points.map((p) => p.x)
    const yArr: number[] = points.map((p) => p.y)

    if (!xArr.length || !yArr.length) {
      throw new BadRequestException("BAD_ARR_LENGTH", "Array length cannot be 0")
    }

    if (xArr.length != yArr.length) {
      throw new BadRequestException("DIFF_ARR_LENGTH", "Array length cannot be different")
    }

    const calculated = this.calculateService.MinimiQuadrati(xArr, yArr);
    const mqName = randomUUID();

    const mq = await this.neode.merge('MQ', { id: mqName, ...calculated, analisiX: JSON.stringify(calculated.analisiX), analisiY: JSON.stringify(calculated.analisiY) });

    // store points in neo4j
    await Promise.all(points.map(async (p) => {
      const pointId = `${p.x}|${p.y}|${p.deltaY}`;

      const point = await this.neode.merge('Point', { id: pointId, x: p.x, y: p.y, deltaY: p.deltaY });
      point.relateTo(mq, 'IS_IN');
    }));

    calculated.points = points;
    calculated.id = mqName;
    return calculated;
  }

  async findOne(id: string): Promise<MQ> {
    const mq = await this.neode.find('MQ', id);
    if (mq) {
      let mqDB: any = await mq.toJson();
      mqDB.analisiX = JSON.parse(mqDB.analisiX);
      mqDB.analisiY = JSON.parse(mqDB.analisiY);
      let mqJSON = { ...mqDB };
      mqJSON.points = mqJSON.IS_IN.map(rel => rel.node);
      return <MQ>mqJSON;
    } else {
      return null;
    }
  }

  async count(): Promise<number> {
    return (await this.neode.all('MQ')).length;
  }
}
