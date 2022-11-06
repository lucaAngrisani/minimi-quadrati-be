import { Module } from '@nestjs/common';
import { NeodeModule } from 'neode-nestjs';
import { CalculateService } from './calculate.service';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';
import MQSchema from './schema/model.schema';
import PointSchema from './schema/point.schema';

@Module({
  imports: [NeodeModule.forFeature({ Point: PointSchema, MQ: MQSchema})],
  controllers: [GeneratorController],
  providers: [GeneratorService, CalculateService]
})
export class GeneratorModule {

}
