import {
  // decorators here

  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ContactDto } from '../../shared/dto/contact.dto';

export class CreateSupplierDto {
  @ApiProperty({
    required: false,
    type: () => ContactDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactDto)
  contact?: ContactDto | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  ice?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  name?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
