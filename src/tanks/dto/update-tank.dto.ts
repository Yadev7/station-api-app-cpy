// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateTankDto } from './create-tank.dto';

export class UpdateTankDto extends PartialType(CreateTankDto) {}
