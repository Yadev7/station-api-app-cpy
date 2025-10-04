// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSupplierBlDetailsDto } from './create-supplier-bl-details.dto';

export class UpdateSupplierBlDetailsDto extends PartialType(
  CreateSupplierBlDetailsDto,
) {}
