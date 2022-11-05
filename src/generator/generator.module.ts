import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';
import { CalculateService } from './calculate.service';

@Module({
  controllers: [GeneratorController],
  providers: [GeneratorService, CalculateService]
})
export class GeneratorModule {

}
