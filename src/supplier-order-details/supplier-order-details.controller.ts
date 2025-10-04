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
import { SupplierOrderDetailsService } from './supplier-order-details.service';
import { CreateSupplierOrderDetailsDto } from './dto/create-supplier-order-details.dto';
import { UpdateSupplierOrderDetailsDto } from './dto/update-supplier-order-details.dto';
import {
  // ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SupplierOrderDetails } from './domain/supplier-order-details';
// import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSupplierOrderDetailsDto } from './dto/find-all-supplier-order-details.dto';

@ApiTags('Supplierorderdetails')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'supplier-order-details',
  version: '1',
})
export class SupplierOrderDetailsController {
  constructor(
    private readonly supplierOrderDetailsService: SupplierOrderDetailsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: SupplierOrderDetails,
  })
  create(@Body() createSupplierOrderDetailsDto: CreateSupplierOrderDetailsDto) {
    return this.supplierOrderDetailsService.create(
      createSupplierOrderDetailsDto,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(SupplierOrderDetails),
  })
  async findAll(
    @Query() query: FindAllSupplierOrderDetailsDto,
  ): Promise<InfinityPaginationResponseDto<SupplierOrderDetails>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.supplierOrderDetailsService.findAllWithPagination({
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
    type: SupplierOrderDetails,
  })
  findById(@Param('id') id: string) {
    return this.supplierOrderDetailsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SupplierOrderDetails,
  })
  update(
    @Param('id') id: string,
    @Body() updateSupplierOrderDetailsDto: UpdateSupplierOrderDetailsDto,
  ) {
    return this.supplierOrderDetailsService.update(
      id,
      updateSupplierOrderDetailsDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.supplierOrderDetailsService.remove(id);
  }
}
