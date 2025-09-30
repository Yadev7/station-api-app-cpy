import { StationsService } from '../stations/stations.service';
import { Station } from '../stations/domain/station';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { DepositRepository } from './infrastructure/persistence/deposit.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Deposit } from './domain/deposit';

@Injectable()
export class DepositsService {
  constructor(
    @Inject(forwardRef(() => StationsService))
    private readonly stationService: StationsService,

    // Dependencies here
    private readonly depositRepository: DepositRepository,
  ) {}

  async create(createDepositDto: CreateDepositDto) {
    // Do not remove comment below.
    // <creating-property />
    const stationObject = await this.stationService.findById(
      createDepositDto.station.id,
    );
    if (!stationObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          station: 'notExists',
        },
      });
    }
    const station = stationObject;

    return this.depositRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      station,

      contact: createDepositDto.contact,

      address: createDepositDto.address,

      desc: createDepositDto.desc,

      name: createDepositDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.depositRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Deposit['id']) {
    return this.depositRepository.findById(id);
  }

  findByIds(ids: Deposit['id'][]) {
    return this.depositRepository.findByIds(ids);
  }

  async update(
    id: Deposit['id'],

    updateDepositDto: UpdateDepositDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let station: Station | undefined = undefined;

    if (updateDepositDto.station) {
      const stationObject = await this.stationService.findById(
        updateDepositDto.station.id,
      );
      if (!stationObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            station: 'notExists',
          },
        });
      }
      station = stationObject;
    }

    return this.depositRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      station,

      contact: updateDepositDto.contact,

      address: updateDepositDto.address,

      desc: updateDepositDto.desc,

      name: updateDepositDto.name,
    });
  }

  remove(id: Deposit['id']) {
    return this.depositRepository.remove(id);
  }
}
