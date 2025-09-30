import { DispensersService } from '../dispensers/dispensers.service';
import { Dispenser } from '../dispensers/domain/dispenser';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateNozzleDto } from './dto/create-nozzle.dto';
import { UpdateNozzleDto } from './dto/update-nozzle.dto';
import { NozzleRepository } from './infrastructure/persistence/nozzle.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Nozzle } from './domain/nozzle';

@Injectable()
export class NozzlesService {
  constructor(
    @Inject(forwardRef(() => DispensersService))
    private readonly dispenserService: DispensersService,

    // Dependencies here
    private readonly nozzleRepository: NozzleRepository,
  ) {}

  async create(createNozzleDto: CreateNozzleDto) {
    // Do not remove comment below.
    // <creating-property />
    const dispenserObject = await this.dispenserService.findById(
      createNozzleDto.dispenser.id,
    );
    if (!dispenserObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          dispenser: 'notExists',
        },
      });
    }
    const dispenser = dispenserObject;

    return this.nozzleRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      dispenser,

      lastIndexTime: createNozzleDto.lastIndexTime,

      lastIndexDate: createNozzleDto.lastIndexDate,

      lastIndex: createNozzleDto.lastIndex,

      lubricantRate: createNozzleDto.lubricantRate,

      isMixer: createNozzleDto.isMixer,

      nozzleRef: createNozzleDto.nozzleRef,

      desc: createNozzleDto.desc,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.nozzleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Nozzle['id']) {
    return this.nozzleRepository.findById(id);
  }

  findByIds(ids: Nozzle['id'][]) {
    return this.nozzleRepository.findByIds(ids);
  }

  async update(
    id: Nozzle['id'],

    updateNozzleDto: UpdateNozzleDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let dispenser: Dispenser | undefined = undefined;

    if (updateNozzleDto.dispenser) {
      const dispenserObject = await this.dispenserService.findById(
        updateNozzleDto.dispenser.id,
      );
      if (!dispenserObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            dispenser: 'notExists',
          },
        });
      }
      dispenser = dispenserObject;
    }

    return this.nozzleRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      dispenser,

      lastIndexTime: updateNozzleDto.lastIndexTime,

      lastIndexDate: updateNozzleDto.lastIndexDate,

      lastIndex: updateNozzleDto.lastIndex,

      lubricantRate: updateNozzleDto.lubricantRate,

      isMixer: updateNozzleDto.isMixer,

      nozzleRef: updateNozzleDto.nozzleRef,

      desc: updateNozzleDto.desc,
    });
  }

  remove(id: Nozzle['id']) {
    return this.nozzleRepository.remove(id);
  }
}
