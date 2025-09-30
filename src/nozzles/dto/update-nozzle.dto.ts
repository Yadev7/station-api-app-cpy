// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateNozzleDto } from './create-nozzle.dto';

export class UpdateNozzleDto extends PartialType(CreateNozzleDto) {}
