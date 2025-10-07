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
import { SupplierIncomePaiementsService } from './supplier-income-paiements.service';
import { CreateSupplierIncomePaiementDto } from './dto/create-supplier-income-paiement.dto';
import { UpdateSupplierIncomePaiementDto } from './dto/update-supplier-income-paiement.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SupplierIncomePaiement } from './domain/supplier-income-paiement';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSupplierIncomePaiementsDto } from './dto/find-all-supplier-income-paiements.dto';

@ApiTags('Supplierincomepaiements')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'supplier-income-paiements',
  version: '1',
})
export class SupplierIncomePaiementsController {
  constructor(
    private readonly supplierIncomePaiementsService: SupplierIncomePaiementsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: SupplierIncomePaiement,
  })
  create(
    @Body() createSupplierIncomePaiementDto: CreateSupplierIncomePaiementDto,
  ) {
    return this.supplierIncomePaiementsService.create(
      createSupplierIncomePaiementDto,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(SupplierIncomePaiement),
  })
  async findAll(
    @Query() query: FindAllSupplierIncomePaiementsDto,
  ): Promise<InfinityPaginationResponseDto<SupplierIncomePaiement>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.supplierIncomePaiementsService.findAllWithPagination({
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
    type: SupplierIncomePaiement,
  })
  findById(@Param('id') id: string) {
    return this.supplierIncomePaiementsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SupplierIncomePaiement,
  })
  update(
    @Param('id') id: string,
    @Body() updateSupplierIncomePaiementDto: UpdateSupplierIncomePaiementDto,
  ) {
    return this.supplierIncomePaiementsService.update(
      id,
      updateSupplierIncomePaiementDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.supplierIncomePaiementsService.remove(id);
  }
}
