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
import { DepositsService } from './deposits.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import {
  //ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Deposit } from './domain/deposit';
//import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllDepositsDto } from './dto/find-all-deposits.dto';

@ApiTags('Deposits')
//@ApiBearerAuth()
//@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'deposits',
  version: '1',
})
export class DepositsController {
  constructor(private readonly depositsService: DepositsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Deposit,
  })
  create(@Body() createDepositDto: CreateDepositDto) {
    return this.depositsService.create(createDepositDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Deposit),
  })
  async findAll(
    @Query() query: FindAllDepositsDto,
  ): Promise<InfinityPaginationResponseDto<Deposit>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.depositsService.findAllWithPagination({
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
    type: Deposit,
  })
  findById(@Param('id') id: string) {
    return this.depositsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Deposit,
  })
  update(@Param('id') id: string, @Body() updateDepositDto: UpdateDepositDto) {
    return this.depositsService.update(id, updateDepositDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.depositsService.remove(id);
  }
}
