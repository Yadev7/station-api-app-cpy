// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSupplierOrderDetailsDto } from './create-supplier-order-details.dto';

export class UpdateSupplierOrderDetailsDto extends PartialType(
  CreateSupplierOrderDetailsDto,
) {}
