import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DepositDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
