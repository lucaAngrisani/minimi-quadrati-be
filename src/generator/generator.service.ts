import { Injectable } from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { PointDto } from './dto/point.dto';
import { MQ } from './entities/mq.entity';
import { Neo4jService } from '@nhogs/nestjs-neo4j';

@Injectable()
export class GeneratorService {
  constructor(private calculateService: CalculateService, private readonly neo4jService: Neo4jService) { }

  async generate(points: PointDto[]): Promise<MQ> {
    const xArr: number[] = [];
    const yArr: number[] = [];

    // store points in neo4j and generate a shortlink
    await Promise.all(points.map(async (p) => {
      xArr.push(p.x);
      yArr.push(p.y);

      await this.neo4jService.run(
        {
          cypher: 'CREATE (c:`Point`) SET c=$props RETURN properties(c) AS point',
          parameters: {
            props: p,
          },
        },
        { write: true },
      );
    }))


    return this.calculateService.MinimiQuadrati(xArr, yArr);
  }
}
