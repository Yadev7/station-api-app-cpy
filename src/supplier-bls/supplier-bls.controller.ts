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
import { SupplierBlsService } from './supplier-bls.service';
import { CreateSupplierBlDto } from './dto/create-supplier-bl.dto';
import { UpdateSupplierBlDto } from './dto/update-supplier-bl.dto';
import {
  // ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SupplierBl } from './domain/supplier-bl';
// import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSupplierBlsDto } from './dto/find-all-supplier-bls.dto';

@ApiTags('Supplierbls')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'supplier-bls',
  version: '1',
})
export class SupplierBlsController {
  constructor(private readonly supplierBlsService: SupplierBlsService) {}

  @Post()
  @ApiCreatedResponse({
    type: SupplierBl,
  })
  create(@Body() createSupplierBlDto: CreateSupplierBlDto) {
    return this.supplierBlsService.create(createSupplierBlDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(SupplierBl),
  })
  async findAll(
    @Query() query: FindAllSupplierBlsDto,
  ): Promise<InfinityPaginationResponseDto<SupplierBl>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.supplierBlsService.findAllWithPagination({
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
    type: SupplierBl,
  })
  findById(@Param('id') id: string) {
    return this.supplierBlsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SupplierBl,
  })
  update(
    @Param('id') id: string,
    @Body() updateSupplierBlDto: UpdateSupplierBlDto,
  ) {
    return this.supplierBlsService.update(id, updateSupplierBlDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.supplierBlsService.remove(id);
  }
}
