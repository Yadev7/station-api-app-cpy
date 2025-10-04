// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSupplierOrderDto } from './create-supplier-order.dto';

export class UpdateSupplierOrderDto extends PartialType(
  CreateSupplierOrderDto,
) {}
