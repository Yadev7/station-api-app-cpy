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
import { SupplierBlDetailsService } from './supplier-bl-details.service';
import { CreateSupplierBlDetailsDto } from './dto/create-supplier-bl-details.dto';
import { UpdateSupplierBlDetailsDto } from './dto/update-supplier-bl-details.dto';
import {
  // ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SupplierBlDetails } from './domain/supplier-bl-details';
// import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSupplierBlDetailsDto } from './dto/find-all-supplier-bl-details.dto';

@ApiTags('Supplierbldetails')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'supplier-bl-details',
  version: '1',
})
export class SupplierBlDetailsController {
  constructor(
    private readonly supplierBlDetailsService: SupplierBlDetailsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: SupplierBlDetails,
  })
  create(@Body() createSupplierBlDetailsDto: CreateSupplierBlDetailsDto) {
    return this.supplierBlDetailsService.create(createSupplierBlDetailsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(SupplierBlDetails),
  })
  async findAll(
    @Query() query: FindAllSupplierBlDetailsDto,
  ): Promise<InfinityPaginationResponseDto<SupplierBlDetails>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.supplierBlDetailsService.findAllWithPagination({
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
    type: SupplierBlDetails,
  })
  findById(@Param('id') id: string) {
    return this.supplierBlDetailsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SupplierBlDetails,
  })
  update(
    @Param('id') id: string,
    @Body() updateSupplierBlDetailsDto: UpdateSupplierBlDetailsDto,
  ) {
    return this.supplierBlDetailsService.update(id, updateSupplierBlDetailsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.supplierBlDetailsService.remove(id);
  }
}
