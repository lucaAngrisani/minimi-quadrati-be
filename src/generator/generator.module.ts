import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';
import { CalculateService } from './calculate.service';
import { NeodeModule } from 'neode-nestjs';
import PointSchema from './schema/point.schema';

@Module({
  imports: [NeodeModule.forFeature({ Point: PointSchema })],
  controllers: [GeneratorController],
  providers: [GeneratorService, CalculateService]
})
export class GeneratorModule {

}
