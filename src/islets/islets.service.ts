import { DispensersService } from '../dispensers/dispensers.service';
import { Dispenser } from '../dispensers/domain/dispenser';

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
import { CreateIsletDto } from './dto/create-islet.dto';
import { UpdateIsletDto } from './dto/update-islet.dto';
import { IsletRepository } from './infrastructure/persistence/islet.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Islet } from './domain/islet';

@Injectable()
export class IsletsService {
  constructor(
    @Inject(forwardRef(() => DispensersService))
    private readonly dispenserService: DispensersService,

    @Inject(forwardRef(() => StationsService))
    private readonly stationService: StationsService,

    // Dependencies here
    private readonly isletRepository: IsletRepository,
  ) {}

  async create(createIsletDto: CreateIsletDto) {
    // Do not remove comment below.
    // <creating-property />
    let dispensers: Dispenser[] | null | undefined = undefined;

    if (createIsletDto.dispensers) {
      const dispensersObjects = await this.dispenserService.findByIds(
        createIsletDto.dispensers.map((entity) => entity.id),
      );
      if (dispensersObjects.length !== createIsletDto.dispensers.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            dispensers: 'notExists',
          },
        });
      }
      dispensers = dispensersObjects;
    } else if (createIsletDto.dispensers === null) {
      dispensers = null;
    }

    const stationObject = await this.stationService.findById(
      createIsletDto.station.id,
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

    return this.isletRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      dispensers,

      station,

      isletRef: createIsletDto.isletRef,

      desc: createIsletDto.desc,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.isletRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Islet['id']) {
    return this.isletRepository.findById(id);
  }

  findByIds(ids: Islet['id'][]) {
    return this.isletRepository.findByIds(ids);
  }

  async update(
    id: Islet['id'],

    updateIsletDto: UpdateIsletDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let dispensers: Dispenser[] | null | undefined = undefined;

    if (updateIsletDto.dispensers) {
      const dispensersObjects = await this.dispenserService.findByIds(
        updateIsletDto.dispensers.map((entity) => entity.id),
      );
      if (dispensersObjects.length !== updateIsletDto.dispensers.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            dispensers: 'notExists',
          },
        });
      }
      dispensers = dispensersObjects;
    } else if (updateIsletDto.dispensers === null) {
      dispensers = null;
    }

    let station: Station | undefined = undefined;

    if (updateIsletDto.station) {
      const stationObject = await this.stationService.findById(
        updateIsletDto.station.id,
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

    return this.isletRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      dispensers,

      station,

      isletRef: updateIsletDto.isletRef,

      desc: updateIsletDto.desc,
    });
  }

  remove(id: Islet['id']) {
    return this.isletRepository.remove(id);
  }
}
