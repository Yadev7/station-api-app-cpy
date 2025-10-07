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
import { SupplierBlTankStoragesService } from './supplier-bl-tank-storages.service';
import { CreateSupplierBlTankStorageDto } from './dto/create-supplier-bl-tank-storage.dto';
import { UpdateSupplierBlTankStorageDto } from './dto/update-supplier-bl-tank-storage.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SupplierBlTankStorage } from './domain/supplier-bl-tank-storage';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSupplierBlTankStoragesDto } from './dto/find-all-supplier-bl-tank-storages.dto';

@ApiTags('Supplierbltankstorages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'supplier-bl-tank-storages',
  version: '1',
})
export class SupplierBlTankStoragesController {
  constructor(
    private readonly supplierBlTankStoragesService: SupplierBlTankStoragesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: SupplierBlTankStorage,
  })
  create(
    @Body() createSupplierBlTankStorageDto: CreateSupplierBlTankStorageDto,
  ) {
    return this.supplierBlTankStoragesService.create(
      createSupplierBlTankStorageDto,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(SupplierBlTankStorage),
  })
  async findAll(
    @Query() query: FindAllSupplierBlTankStoragesDto,
  ): Promise<InfinityPaginationResponseDto<SupplierBlTankStorage>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.supplierBlTankStoragesService.findAllWithPagination({
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
    type: SupplierBlTankStorage,
  })
  findById(@Param('id') id: string) {
    return this.supplierBlTankStoragesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SupplierBlTankStorage,
  })
  update(
    @Param('id') id: string,
    @Body() updateSupplierBlTankStorageDto: UpdateSupplierBlTankStorageDto,
  ) {
    return this.supplierBlTankStoragesService.update(
      id,
      updateSupplierBlTankStorageDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.supplierBlTankStoragesService.remove(id);
  }
}
