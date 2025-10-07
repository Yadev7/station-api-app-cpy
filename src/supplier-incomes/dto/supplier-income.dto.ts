import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SupplierIncomeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
