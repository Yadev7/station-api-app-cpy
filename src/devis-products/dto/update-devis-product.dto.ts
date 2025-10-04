// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateDevisProductDto } from './create-devis-product.dto';

export class UpdateDevisProductDto extends PartialType(CreateDevisProductDto) {}
