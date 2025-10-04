// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSupplierBlDto } from './create-supplier-bl.dto';

export class UpdateSupplierBlDto extends PartialType(CreateSupplierBlDto) {}
