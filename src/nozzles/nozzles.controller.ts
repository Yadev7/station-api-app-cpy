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
import { NozzlesService } from './nozzles.service';
import { CreateNozzleDto } from './dto/create-nozzle.dto';
import { UpdateNozzleDto } from './dto/update-nozzle.dto';
import {
  //ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Nozzle } from './domain/nozzle';
//import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllNozzlesDto } from './dto/find-all-nozzles.dto';

@ApiTags('Nozzles')
//@ApiBearerAuth()
//@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'nozzles',
  version: '1',
})
export class NozzlesController {
  constructor(private readonly nozzlesService: NozzlesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Nozzle,
  })
  create(@Body() createNozzleDto: CreateNozzleDto) {
    return this.nozzlesService.create(createNozzleDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Nozzle),
  })
  async findAll(
    @Query() query: FindAllNozzlesDto,
  ): Promise<InfinityPaginationResponseDto<Nozzle>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.nozzlesService.findAllWithPagination({
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
    type: Nozzle,
  })
  findById(@Param('id') id: string) {
    return this.nozzlesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Nozzle,
  })
  update(@Param('id') id: string, @Body() updateNozzleDto: UpdateNozzleDto) {
    return this.nozzlesService.update(id, updateNozzleDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.nozzlesService.remove(id);
  }
}
