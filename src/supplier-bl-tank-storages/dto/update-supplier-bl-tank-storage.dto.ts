// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSupplierBlTankStorageDto } from './create-supplier-bl-tank-storage.dto';

export class UpdateSupplierBlTankStorageDto extends PartialType(
  CreateSupplierBlTankStorageDto,
) {}
