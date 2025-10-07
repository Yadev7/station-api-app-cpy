import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SupplierIncomesService } from './supplier-incomes.service';
import { CreateSupplierIncomeDto } from './dto/create-supplier-income.dto';
import { UpdateSupplierIncomeDto } from './dto/update-supplier-income.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SupplierIncome } from './domain/supplier-income';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSupplierIncomesDto } from './dto/find-all-supplier-incomes.dto';

@ApiTags('Supplierincomes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'supplier-incomes',
  version: '1',
})
export class SupplierIncomesController {
  constructor(
    private readonly supplierIncomesService: SupplierIncomesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: SupplierIncome,
  })
  create(@Body() createSupplierIncomeDto: CreateSupplierIncomeDto) {
    return this.supplierIncomesService.create(createSupplierIncomeDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(SupplierIncome),
  })
  async findAll(
    @Query() query: FindAllSupplierIncomesDto,
  ): Promise<InfinityPaginationResponseDto<SupplierIncome>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.supplierIncomesService.findAllWithPagination({
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
    type: SupplierIncome,
  })
  findById(@Param('id') id: string) {
    return this.supplierIncomesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SupplierIncome,
  })
  update(
    @Param('id') id: string,
    @Body() updateSupplierIncomeDto: UpdateSupplierIncomeDto,
  ) {
    return this.supplierIncomesService.update(id, updateSupplierIncomeDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.supplierIncomesService.remove(id);
  }
}
