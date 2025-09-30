import { ProductDto } from '../../products/dto/product.dto';

import { CategoryDto } from '../../categories/dto/category.dto';

import {
  // decorators here

  IsString,
  ValidateNested,
  //IsNotEmptyObject,
  IsArray,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateCategoryDto {
  @ApiProperty({
    required: false,
    type: () => [ProductDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  @IsArray()
  products?: ProductDto[] | null;

  @ApiProperty({
    required: false,
    type: () => [CategoryDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryDto)
  @IsArray()
  children?: CategoryDto[] | null;

  @ApiProperty({
    required: false,
    type: () => CategoryDto,
  })
  @ValidateNested()
  @Type(() => CategoryDto)
  @IsOptional()
  catParent?: CategoryDto;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  catName: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
