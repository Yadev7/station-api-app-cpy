import { NozzlesService } from '../nozzles/nozzles.service';
import { Nozzle } from '../nozzles/domain/nozzle';

import { IsletsService } from '../islets/islets.service';
import { Islet } from '../islets/domain/islet';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateDispenserDto } from './dto/create-dispenser.dto';
import { UpdateDispenserDto } from './dto/update-dispenser.dto';
import { DispenserRepository } from './infrastructure/persistence/dispenser.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Dispenser } from './domain/dispenser';

@Injectable()
export class DispensersService {
  constructor(
    @Inject(forwardRef(() => NozzlesService))
    private readonly nozzleService: NozzlesService,

    @Inject(forwardRef(() => IsletsService))
    private readonly isletService: IsletsService,

    // Dependencies here
    private readonly dispenserRepository: DispenserRepository,
  ) {}

  async create(createDispenserDto: CreateDispenserDto) {
    // Do not remove comment below.
    // <creating-property />
    let nozzles: Nozzle[] | null | undefined = undefined;

    if (createDispenserDto.nozzles) {
      const nozzlesObjects = await this.nozzleService.findByIds(
        createDispenserDto.nozzles.map((entity) => entity.id),
      );
      if (nozzlesObjects.length !== createDispenserDto.nozzles.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            nozzles: 'notExists',
          },
        });
      }
      nozzles = nozzlesObjects;
    } else if (createDispenserDto.nozzles === null) {
      nozzles = null;
    }

    const isletObject = await this.isletService.findById(
      createDispenserDto.islet.id,
    );
    if (!isletObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          islet: 'notExists',
        },
      });
    }
    const islet = isletObject;

    return this.dispenserRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      nozzles,

      islet,

      dispRef: createDispenserDto.dispRef,

      desc: createDispenserDto.desc,

      brand: createDispenserDto.brand,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.dispenserRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Dispenser['id']) {
    return this.dispenserRepository.findById(id);
  }

  findByIds(ids: Dispenser['id'][]) {
    return this.dispenserRepository.findByIds(ids);
  }

  async update(
    id: Dispenser['id'],

    updateDispenserDto: UpdateDispenserDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let nozzles: Nozzle[] | null | undefined = undefined;

    if (updateDispenserDto.nozzles) {
      const nozzlesObjects = await this.nozzleService.findByIds(
        updateDispenserDto.nozzles.map((entity) => entity.id),
      );
      if (nozzlesObjects.length !== updateDispenserDto.nozzles.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            nozzles: 'notExists',
          },
        });
      }
      nozzles = nozzlesObjects;
    } else if (updateDispenserDto.nozzles === null) {
      nozzles = null;
    }

    let islet: Islet | undefined = undefined;

    if (updateDispenserDto.islet) {
      const isletObject = await this.isletService.findById(
        updateDispenserDto.islet.id,
      );
      if (!isletObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            islet: 'notExists',
          },
        });
      }
      islet = isletObject;
    }

    return this.dispenserRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      nozzles,

      islet,

      dispRef: updateDispenserDto.dispRef,

      desc: updateDispenserDto.desc,

      brand: updateDispenserDto.brand,
    });
  }

  remove(id: Dispenser['id']) {
    return this.dispenserRepository.remove(id);
  }
}
