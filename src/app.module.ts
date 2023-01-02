import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NeodeModule } from 'neode-nestjs';
import { TransformInterceptor } from './app.interceptor';
import config from './config';
import { CalculateService } from './generator/calculate.service';
import { GeneratorModule } from './generator/generator.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get("database"),
    }),
    NeodeModule.forRoot(),
    UserModule,
    GeneratorModule
  ],
  controllers: [],
  providers: [
    CalculateService,
    TransformInterceptor
  ],
})
export class AppModule { }
