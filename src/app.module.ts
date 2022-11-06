import { CalculateService } from './generator/calculate.service';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GeneratorModule } from './generator/generator.module';
import { NeodeModule } from 'neode-nestjs';

@Module({
  imports: [
    /* Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: 'ad38df85.databases.neo4j.io',
      port: '7687',
      database: 'neo4j',
      username: 'neo4j',
      password: 'Ky4ttrXWiZ-6o05XIyUCQV2qpit8AHahMeqoE7fNe1Y',
      global: true, // to register in the global scope
    }), */
    NeodeModule.forRoot(
      { host: 'neo4j+s://ad38df85.databases.neo4j.io', port: 7689, username: 'neo4j', password: 'Ky4ttrXWiZ-6o05XIyUCQV2qpit8AHahMeqoE7fNe1Y' }
    ),
    UserModule, GeneratorModule],
  controllers: [],
  providers: [
    CalculateService,],
})
export class AppModule { }
