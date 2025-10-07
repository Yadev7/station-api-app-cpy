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
import { SupplierPaiementDetailsService } from './supplier-paiement-details.service';
import { CreateSupplierPaiementDetailsDto } from './dto/create-supplier-paiement-details.dto';
import { UpdateSupplierPaiementDetailsDto } from './dto/update-supplier-paiement-details.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SupplierPaiementDetails } from './domain/supplier-paiement-details';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSupplierPaiementDetailsDto } from './dto/find-all-supplier-paiement-details.dto';

@ApiTags('Supplierpaiementdetails')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'supplier-paiement-details',
  version: '1',
})
export class SupplierPaiementDetailsController {
  constructor(
    private readonly supplierPaiementDetailsService: SupplierPaiementDetailsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: SupplierPaiementDetails,
  })
  create(
    @Body() createSupplierPaiementDetailsDto: CreateSupplierPaiementDetailsDto,
  ) {
    return this.supplierPaiementDetailsService.create(
      createSupplierPaiementDetailsDto,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(SupplierPaiementDetails),
  })
  async findAll(
    @Query() query: FindAllSupplierPaiementDetailsDto,
  ): Promise<InfinityPaginationResponseDto<SupplierPaiementDetails>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.supplierPaiementDetailsService.findAllWithPagination({
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
    type: SupplierPaiementDetails,
  })
  findById(@Param('id') id: string) {
    return this.supplierPaiementDetailsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SupplierPaiementDetails,
  })
  update(
    @Param('id') id: string,
    @Body() updateSupplierPaiementDetailsDto: UpdateSupplierPaiementDetailsDto,
  ) {
    return this.supplierPaiementDetailsService.update(
      id,
      updateSupplierPaiementDetailsDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.supplierPaiementDetailsService.remove(id);
  }
}
