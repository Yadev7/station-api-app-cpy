import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  //UseGuards,
  Query,
} from '@nestjs/common';
import { DispensersService } from './dispensers.service';
import { CreateDispenserDto } from './dto/create-dispenser.dto';
import { UpdateDispenserDto } from './dto/update-dispenser.dto';
import {
  //ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Dispenser } from './domain/dispenser';
//import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllDispensersDto } from './dto/find-all-dispensers.dto';

@ApiTags('Dispensers')
//@ApiBearerAuth()
//@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'dispensers',
  version: '1',
})
export class DispensersController {
  constructor(private readonly dispensersService: DispensersService) {}

  @Post()
  @ApiCreatedResponse({
    type: Dispenser,
  })
  create(@Body() createDispenserDto: CreateDispenserDto) {
    return this.dispensersService.create(createDispenserDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Dispenser),
  })
  async findAll(
    @Query() query: FindAllDispensersDto,
  ): Promise<InfinityPaginationResponseDto<Dispenser>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.dispensersService.findAllWithPagination({
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
    type: Dispenser,
  })
  findById(@Param('id') id: string) {
    return this.dispensersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Dispenser,
  })
  update(
    @Param('id') id: string,
    @Body() updateDispenserDto: UpdateDispenserDto,
  ) {
    return this.dispensersService.update(id, updateDispenserDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.dispensersService.remove(id);
  }
}
