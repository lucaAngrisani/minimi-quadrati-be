import { CalculateService } from './generator/calculate.service';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GeneratorModule } from './generator/generator.module';
import { Neo4jModule } from '@nhogs/nestjs-neo4j';

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: 'ad38df85.databases.neo4j.io',
      port: '7687',
      database: 'neo4j',
      username: 'neo4j',
      password: 'Ky4ttrXWiZ-6o05XIyUCQV2qpit8AHahMeqoE7fNe1Y',
      global: true, // to register in the global scope
    }),
    UserModule, GeneratorModule],
  controllers: [],
  providers: [
    CalculateService,],
})
export class AppModule { }
