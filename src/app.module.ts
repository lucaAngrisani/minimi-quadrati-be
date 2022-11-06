import { Module } from '@nestjs/common';
import { NeodeModule } from 'neode-nestjs';
import { TransformInterceptor } from './app.interceptor';
import { CalculateService } from './generator/calculate.service';
import { GeneratorModule } from './generator/generator.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
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
