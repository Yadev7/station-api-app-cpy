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
import { IsletsService } from './islets.service';
import { CreateIsletDto } from './dto/create-islet.dto';
import { UpdateIsletDto } from './dto/update-islet.dto';
import {
  //ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Islet } from './domain/islet';
//import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllIsletsDto } from './dto/find-all-islets.dto';

@ApiTags('Islets')
//@ApiBearerAuth()
//@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'islets',
  version: '1',
})
export class IsletsController {
  constructor(private readonly isletsService: IsletsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Islet,
  })
  create(@Body() createIsletDto: CreateIsletDto) {
    return this.isletsService.create(createIsletDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Islet),
  })
  async findAll(
    @Query() query: FindAllIsletsDto,
  ): Promise<InfinityPaginationResponseDto<Islet>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.isletsService.findAllWithPagination({
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
    type: Islet,
  })
  findById(@Param('id') id: string) {
    return this.isletsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Islet,
  })
  update(@Param('id') id: string, @Body() updateIsletDto: UpdateIsletDto) {
    return this.isletsService.update(id, updateIsletDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.isletsService.remove(id);
  }
}
