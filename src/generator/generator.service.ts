import { BadRequestException, Injectable } from '@nestjs/common';
import DbMQ from '../db/dbmq.entity';
import DbPoint from '../db/dbpoint.entity';
import { CalculateService } from './calculate.service';
import { MQDto } from './dto/mq.dto';
import { PointDto } from './dto/point.dto';

@Injectable()
export class GeneratorService {
  constructor(
    private calculateService: CalculateService,
  ) { }

  async generate(points: PointDto[]): Promise<MQDto> {
    const xArr: number[] = points.map((p) => p.x)
    const yArr: number[] = points.map((p) => p.y)

    if (!xArr.length || !yArr.length) {
      throw new BadRequestException("BAD_ARR_LENGTH", "Array length cannot be 0")
    }

    if (xArr.length != yArr.length) {
      throw new BadRequestException("DIFF_ARR_LENGTH", "Array length cannot be different")
    }

    const calculated = this.calculateService.MinimiQuadrati(xArr, yArr);

    const dbMQ = DbMQ.create({ ...calculated, analisiX: JSON.stringify(calculated.analisiX), analisiY: JSON.stringify(calculated.analisiY) });
    await dbMQ.save();

    await Promise.all(points.map(async (p) => {
      const dbPoint = DbPoint.create({ mq: { id: dbMQ.id }, ...p });
      await dbPoint.save();
    }));

    calculated.points = points;
    calculated.id = dbMQ.id;
    return calculated;
  }

  async findOne(id: string): Promise<MQDto> {

    const dbMQ = await DbMQ.findOne({ where: { id }, relations: { points: true } })
    if (dbMQ?.id) {
      const mq: any = { ...dbMQ, };
      try {
        mq.analisiX = JSON.parse(dbMQ.analisiX);
        mq.analisiY = JSON.parse(dbMQ.analisiY);
      }
      catch (err) {
        console.log(err);
      }
      return <MQDto>mq;
    } else {
      return null;
    }
  }

  async count(): Promise<number> {
    const c = await DbMQ.count();

    return c;
  }
}
