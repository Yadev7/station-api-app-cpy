import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NozzleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
