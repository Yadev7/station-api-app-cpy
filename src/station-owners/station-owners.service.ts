import { StationsService } from '../stations/stations.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateStationOwnerDto } from './dto/create-station-owner.dto';
import { UpdateStationOwnerDto } from './dto/update-station-owner.dto';
import { StationOwnerRepository } from './infrastructure/persistence/station-owner.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { StationOwner } from './domain/station-owner';
import { Station } from 'src/stations/domain/station';

@Injectable()
export class StationOwnersService {
  constructor(
    @Inject(forwardRef(() => StationsService))
    private readonly stationService: StationsService,

    // Dependencies here
    private readonly stationOwnerRepository: StationOwnerRepository,
  ) {}

  async create(createStationOwnerDto: CreateStationOwnerDto) {
    // Do not remove comment below.
    // <creating-property />
    let stations: Station[] | null | undefined = undefined;

    if (createStationOwnerDto.stations) {
      const stationsObjects = await this.stationService.findByIds(
        createStationOwnerDto.stations.map((entity) => entity.id),
      );
      if (stationsObjects.length !== createStationOwnerDto.stations.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            stations: 'notExists',
          },
        });
      }
      stations = stationsObjects;
    } else if (createStationOwnerDto.stations === null) {
      stations = null;
    }

    return this.stationOwnerRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      stations,

      ownerType: createStationOwnerDto.ownerType,

      ownerName: createStationOwnerDto.ownerName,

      contact: createStationOwnerDto.contact,

      address: createStationOwnerDto.address,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.stationOwnerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: StationOwner['id']) {
    return this.stationOwnerRepository.findById(id);
  }

  findByIds(ids: StationOwner['id'][]) {
    return this.stationOwnerRepository.findByIds(ids);
  }

  async update(
    id: StationOwner['id'],

    updateStationOwnerDto: UpdateStationOwnerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let stations: Station[] | null | undefined = undefined;

    if (updateStationOwnerDto.stations) {
      const stationsObjects = await this.stationService.findByIds(
        updateStationOwnerDto.stations.map((entity) => entity.id),
      );
      if (stationsObjects.length !== updateStationOwnerDto.stations.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            stations: 'notExists',
          },
        });
      }
      stations = stationsObjects;
    } else if (updateStationOwnerDto.stations === null) {
      stations = null;
    }

    return this.stationOwnerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      stations,

      ownerType: updateStationOwnerDto.ownerType,

      ownerName: updateStationOwnerDto.ownerName,

      contact: updateStationOwnerDto.contact,

      address: updateStationOwnerDto.address,
    });
  }

  remove(id: StationOwner['id']) {
    return this.stationOwnerRepository.remove(id);
  }
}
