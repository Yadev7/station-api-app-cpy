import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SupplierOrderDetailsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
