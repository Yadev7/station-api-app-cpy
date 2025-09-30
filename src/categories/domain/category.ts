import { Product } from '../../products/domain/product';
//import { Category } from '../../categories/domain/category';
import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty({
    type: () => [Product],
    nullable: true,
  })
  products?: Product[] | null;

  @ApiProperty({
    type: () => [Category],
    nullable: true,
  })
  children?: Category[] | null;

  @ApiProperty({
    type: () => Category,
    nullable: true,
  })
  catParent?: Category | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  catName: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
