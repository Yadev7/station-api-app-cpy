import {
  // decorators here

  IsString,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateSupplierIncomePaiementDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  paiementType?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
