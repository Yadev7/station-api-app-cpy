// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSupplierBlDepositStorageDto } from './create-supplier-bl-deposit-storage.dto';

export class UpdateSupplierBlDepositStorageDto extends PartialType(
  CreateSupplierBlDepositStorageDto,
) {}
