// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSupplierIncomePaiementDto } from './create-supplier-income-paiement.dto';

export class UpdateSupplierIncomePaiementDto extends PartialType(
  CreateSupplierIncomePaiementDto,
) {}
