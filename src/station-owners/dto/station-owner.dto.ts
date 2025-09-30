import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StationOwnerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
