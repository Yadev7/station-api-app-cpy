// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateDepositDto } from './create-deposit.dto';

export class UpdateDepositDto extends PartialType(CreateDepositDto) {}
