import {
  forwardRef,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTankDto } from './dto/create-tank.dto';
import { UpdateTankDto } from './dto/update-tank.dto';
import { TankRepository } from './infrastructure/persistence/tank.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Tank } from './domain/tank';
import { StationsService } from 'src/stations/stations.service';
import { Station } from 'src/stations/domain/station';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/domain/product';

@Injectable()
export class TanksService {
  constructor(
    @Inject(forwardRef(() => ProductsService))
    private readonly productService: ProductsService,

    @Inject(forwardRef(() => StationsService))
    private readonly stationService: StationsService,
    // Dependencies here
    private readonly tankRepository: TankRepository,
  ) {}

  async create(createTankDto: CreateTankDto) {
    // Do not remove comment below.
    // <creating-property />

    const productObject = await this.productService.findById(
      createTankDto.product.id,
    );
    if (!productObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          product: 'notExists',
        },
      });
    }
    const product = productObject;

    const stationObject = await this.stationService.findById(
      createTankDto.station.id,
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
    return this.tankRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />

      product,
      station,
      desc: createTankDto.desc,

      maxCapacity: createTankDto.maxCapacity,

      minCapacity: createTankDto.minCapacity,

      directSale: createTankDto.directSale,

      refId: createTankDto.refId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.tankRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Tank['id']) {
    return this.tankRepository.findById(id);
  }

  findByIds(ids: Tank['id'][]) {
    return this.tankRepository.findByIds(ids);
  }

  async update(
    id: Tank['id'],

    updateTankDto: UpdateTankDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let station: Station | undefined = undefined;

    if (updateTankDto.station) {
      const stationObject = await this.stationService.findById(
        updateTankDto.station.id,
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

    let product: Product | undefined = undefined;

    if (updateTankDto.product) {
      const productObject = await this.productService.findById(
        updateTankDto.product.id,
      );
      if (!productObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      product = productObject;
    }

    return this.tankRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />

      product,

      station,

      desc: updateTankDto.desc,

      maxCapacity: updateTankDto.maxCapacity,

      minCapacity: updateTankDto.minCapacity,

      directSale: updateTankDto.directSale,

      refId: updateTankDto.refId,
    });
  }

  remove(id: Tank['id']) {
    return this.tankRepository.remove(id);
  }
}
