// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSupplierPaiementDetailsDto } from './create-supplier-paiement-details.dto';

export class UpdateSupplierPaiementDetailsDto extends PartialType(
  CreateSupplierPaiementDetailsDto,
) {}
