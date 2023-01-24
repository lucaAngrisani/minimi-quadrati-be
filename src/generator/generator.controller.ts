import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/app.interceptor';
import { MQDto } from './dto/mq.dto';
import { PointDto } from './dto/point.dto';
import { GeneratorService } from './generator.service';

@Controller('generator')
@UseInterceptors(TransformInterceptor)
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) { }

  @Post()
  async generate(@Body() points: PointDto[]): Promise<MQDto> {
    return await this.generatorService.generate(points);
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.generatorService.findOne(id);
  }

  @Get('count')
  countMQ() {
    return this.generatorService.count();
  }

}
