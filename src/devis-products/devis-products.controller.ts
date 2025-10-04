import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UseGuards,
  Query,
} from '@nestjs/common';
import { DevisProductsService } from './devis-products.service';
import { CreateDevisProductDto } from './dto/create-devis-product.dto';
import { UpdateDevisProductDto } from './dto/update-devis-product.dto';
import {
  // ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DevisProduct } from './domain/devis-product';
// import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllDevisProductsDto } from './dto/find-all-devis-products.dto';

@ApiTags('Devisproducts')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'devis-products',
  version: '1',
})
export class DevisProductsController {
  constructor(private readonly devisProductsService: DevisProductsService) {}

  @Post()
  @ApiCreatedResponse({
    type: DevisProduct,
  })
  create(@Body() createDevisProductDto: CreateDevisProductDto) {
    return this.devisProductsService.create(createDevisProductDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(DevisProduct),
  })
  async findAll(
    @Query() query: FindAllDevisProductsDto,
  ): Promise<InfinityPaginationResponseDto<DevisProduct>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.devisProductsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: DevisProduct,
  })
  findById(@Param('id') id: string) {
    return this.devisProductsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: DevisProduct,
  })
  update(
    @Param('id') id: string,
    @Body() updateDevisProductDto: UpdateDevisProductDto,
  ) {
    return this.devisProductsService.update(id, updateDevisProductDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.devisProductsService.remove(id);
  }
}
