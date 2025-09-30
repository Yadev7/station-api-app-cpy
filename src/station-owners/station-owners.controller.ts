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
import { StationOwnersService } from './station-owners.service';
import { CreateStationOwnerDto } from './dto/create-station-owner.dto';
import { UpdateStationOwnerDto } from './dto/update-station-owner.dto';
import {
  //ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { StationOwner } from './domain/station-owner';
//import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllStationOwnersDto } from './dto/find-all-station-owners.dto';

@ApiTags('Stationowners')
//@ApiBearerAuth()
//@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'station-owners',
  version: '1',
})
export class StationOwnersController {
  constructor(private readonly stationOwnersService: StationOwnersService) {}

  @Post()
  @ApiCreatedResponse({
    type: StationOwner,
  })
  create(@Body() createStationOwnerDto: CreateStationOwnerDto) {
    return this.stationOwnersService.create(createStationOwnerDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(StationOwner),
  })
  async findAll(
    @Query() query: FindAllStationOwnersDto,
  ): Promise<InfinityPaginationResponseDto<StationOwner>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.stationOwnersService.findAllWithPagination({
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
    type: StationOwner,
  })
  findById(@Param('id') id: string) {
    return this.stationOwnersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: StationOwner,
  })
  update(
    @Param('id') id: string,
    @Body() updateStationOwnerDto: UpdateStationOwnerDto,
  ) {
    return this.stationOwnersService.update(id, updateStationOwnerDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.stationOwnersService.remove(id);
  }
}
