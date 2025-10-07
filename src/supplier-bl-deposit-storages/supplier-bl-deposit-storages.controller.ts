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
import { SupplierBlDepositStoragesService } from './supplier-bl-deposit-storages.service';
import { CreateSupplierBlDepositStorageDto } from './dto/create-supplier-bl-deposit-storage.dto';
import { UpdateSupplierBlDepositStorageDto } from './dto/update-supplier-bl-deposit-storage.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SupplierBlDepositStorage } from './domain/supplier-bl-deposit-storage';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSupplierBlDepositStoragesDto } from './dto/find-all-supplier-bl-deposit-storages.dto';

@ApiTags('Supplierbldepositstorages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'supplier-bl-deposit-storages',
  version: '1',
})
export class SupplierBlDepositStoragesController {
  constructor(
    private readonly supplierBlDepositStoragesService: SupplierBlDepositStoragesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: SupplierBlDepositStorage,
  })
  create(
    @Body()
    createSupplierBlDepositStorageDto: CreateSupplierBlDepositStorageDto,
  ) {
    return this.supplierBlDepositStoragesService.create(
      createSupplierBlDepositStorageDto,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(SupplierBlDepositStorage),
  })
  async findAll(
    @Query() query: FindAllSupplierBlDepositStoragesDto,
  ): Promise<InfinityPaginationResponseDto<SupplierBlDepositStorage>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.supplierBlDepositStoragesService.findAllWithPagination({
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
    type: SupplierBlDepositStorage,
  })
  findById(@Param('id') id: string) {
    return this.supplierBlDepositStoragesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SupplierBlDepositStorage,
  })
  update(
    @Param('id') id: string,
    @Body()
    updateSupplierBlDepositStorageDto: UpdateSupplierBlDepositStorageDto,
  ) {
    return this.supplierBlDepositStoragesService.update(
      id,
      updateSupplierBlDepositStorageDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.supplierBlDepositStoragesService.remove(id);
  }
}
