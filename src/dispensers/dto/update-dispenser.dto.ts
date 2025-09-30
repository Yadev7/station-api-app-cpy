// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateDispenserDto } from './create-dispenser.dto';

export class UpdateDispenserDto extends PartialType(CreateDispenserDto) {}
