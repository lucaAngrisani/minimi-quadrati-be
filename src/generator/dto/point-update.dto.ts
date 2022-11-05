import { PartialType } from '@nestjs/mapped-types';
import { PointDto } from './point.dto';

export class UpdateGeneratorDto extends PartialType(PointDto) {}
