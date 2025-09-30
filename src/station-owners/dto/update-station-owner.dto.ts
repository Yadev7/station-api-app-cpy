// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateStationOwnerDto } from './create-station-owner.dto';

export class UpdateStationOwnerDto extends PartialType(CreateStationOwnerDto) {}
