import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PointDto } from './dto/point.dto';
import { MQ } from './entities/mq.entity';
import { GeneratorService } from './generator.service';

@Controller('generator')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) { }

  @Post()
  async generate(@Body() points: PointDto[]): Promise<MQ> {
    return await this.generatorService.generate(points);
  }

}
