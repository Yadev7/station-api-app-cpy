// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateIsletDto } from './create-islet.dto';

export class UpdateIsletDto extends PartialType(CreateIsletDto) {}
