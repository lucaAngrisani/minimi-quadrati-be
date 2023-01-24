import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DbMQ from '../db/dbmq.entity';
import DbPoint from '../db/dbpoint.entity';
import { CalculateService } from './calculate.service';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';
@Module({
  imports: [TypeOrmModule.forFeature([DbMQ, DbPoint])],
  controllers: [GeneratorController],
  providers: [GeneratorService, CalculateService]
})
export class GeneratorModule {

}
