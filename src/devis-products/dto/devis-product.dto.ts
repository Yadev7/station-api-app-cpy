import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DevisProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
