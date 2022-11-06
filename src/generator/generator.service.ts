import { Injectable } from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { PointDto } from './dto/point.dto';
import { MQ } from './entities/mq.entity';
import { Neo4jService } from '@nhogs/nestjs-neo4j';
import { randomUUID } from 'crypto';

@Injectable()
export class GeneratorService {
  constructor(private calculateService: CalculateService, private readonly neo4jService: Neo4jService) { }

  async generate(points: PointDto[]): Promise<MQ> {
    const xArr: number[] = points.map((p) => p.x)
    const yArr: number[] = points.map((p) => p.y)

    const calculated = this.calculateService.MinimiQuadrati(xArr, yArr);
    const mqName = randomUUID();

    await this.neo4jService.run(
      {
        cypher: 'CREATE (c:`MQ`) SET c=$props RETURN properties(c) AS mq',
        parameters: {
          props: { ...calculated, name: mqName },
        },
      },
      { write: true },
    );


    // store points in neo4j and generate a shortlink
    await Promise.all(points.map(async (p) => {
      const pointId = `${p.x}|${p.y}|${p.deltaY}`;

      // create point
      await this.neo4jService.run(
        {
          cypher: 'CREATE (c:`Point`) SET c=$props RETURN properties(c) AS point',
          parameters: {
            props: { ...p, id: pointId },
          },
        },
        { write: true },
      );

      // create relation with mq
      this.neo4jService.run({
        cypher: `MERGE (mq:MQ { name: ${mqName} })
        MERGE (p:Point { id: ${pointId} })
        MERGE (mq)-[:HAS]->(p)
        `
      })
    }));

    return calculated;
  }
}
