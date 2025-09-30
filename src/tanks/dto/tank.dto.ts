import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TankDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
