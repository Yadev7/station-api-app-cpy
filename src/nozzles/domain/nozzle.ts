import { Dispenser } from '../../dispensers/domain/dispenser';
import { ApiProperty } from '@nestjs/swagger';

export class Nozzle {
  @ApiProperty({
    type: () => Dispenser,
    nullable: false,
  })
  dispenser: Dispenser;

  @ApiProperty({
    type: () => Date,
    //nullable: false,
    required: false,
  })
  lastIndexTime?: Date;

  @ApiProperty({
    type: () => Date,
    //nullable: false,
    required: false,
  })
  lastIndexDate?: Date;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  lastIndex?: number = 0;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  lubricantRate?: number;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  isMixer?: boolean = false;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  nozzleRef: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  desc?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
