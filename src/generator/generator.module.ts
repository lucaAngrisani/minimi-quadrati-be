import { Module } from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';
@Module({
  imports: [],
  controllers: [GeneratorController],
  providers: [GeneratorService, CalculateService]
})
export class GeneratorModule {

}
