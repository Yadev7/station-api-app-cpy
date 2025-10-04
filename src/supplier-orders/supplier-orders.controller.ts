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
import { SupplierOrdersService } from './supplier-orders.service';
import { CreateSupplierOrderDto } from './dto/create-supplier-order.dto';
import { UpdateSupplierOrderDto } from './dto/update-supplier-order.dto';
import {
  // ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SupplierOrder } from './domain/supplier-order';
// import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSupplierOrdersDto } from './dto/find-all-supplier-orders.dto';

@ApiTags('Supplierorders')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'supplier-orders',
  version: '1',
})
export class SupplierOrdersController {
  constructor(private readonly supplierOrdersService: SupplierOrdersService) {}

  @Post()
  @ApiCreatedResponse({
    type: SupplierOrder,
  })
  create(@Body() createSupplierOrderDto: CreateSupplierOrderDto) {
    return this.supplierOrdersService.create(createSupplierOrderDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(SupplierOrder),
  })
  async findAll(
    @Query() query: FindAllSupplierOrdersDto,
  ): Promise<InfinityPaginationResponseDto<SupplierOrder>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.supplierOrdersService.findAllWithPagination({
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
    type: SupplierOrder,
  })
  findById(@Param('id') id: string) {
    return this.supplierOrdersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SupplierOrder,
  })
  update(
    @Param('id') id: string,
    @Body() updateSupplierOrderDto: UpdateSupplierOrderDto,
  ) {
    return this.supplierOrdersService.update(id, updateSupplierOrderDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.supplierOrdersService.remove(id);
  }
}
