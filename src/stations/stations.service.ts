import { IsletsService } from '../islets/islets.service';
import { Islet } from '../islets/domain/islet';

import { DepositsService } from '../deposits/deposits.service';
import { Deposit } from '../deposits/domain/deposit';

import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import { StationOwnersService } from '../station-owners/station-owners.service';
import { StationOwner } from '../station-owners/domain/station-owner';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { StationRepository } from './infrastructure/persistence/station.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Station } from './domain/station';
import { TanksService } from 'src/tanks/tanks.service';
import { Tank } from 'src/tanks/domain/tank';

@Injectable()
export class StationsService {
  constructor(
    @Inject(forwardRef(() => IsletsService))
    private readonly isletService: IsletsService,

    @Inject(forwardRef(() => TanksService))
    private readonly tankService: TanksService,

    @Inject(forwardRef(() => DepositsService))
    private readonly depositService: DepositsService,

    @Inject(forwardRef(() => ProductsService))
    private readonly productService: ProductsService,

    @Inject(forwardRef(() => StationOwnersService))
    private readonly stationOwnerService: StationOwnersService,

    // Dependencies here
    private readonly stationRepository: StationRepository,
  ) {}

  async create(createStationDto: CreateStationDto) {
    // Do not remove comment below.
    // <creating-property />
    let islets: Islet[] | null | undefined = undefined;

    if (createStationDto.islets) {
      const isletsObjects = await this.isletService.findByIds(
        createStationDto.islets.map((entity) => entity.id),
      );
      if (isletsObjects.length !== createStationDto.islets.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            islets: 'notExists',
          },
        });
      }
      islets = isletsObjects;
    } else if (createStationDto.islets === null) {
      islets = null;
    }

    let tanks: Tank[] | null | undefined = undefined;

    if (createStationDto.tanks) {
      const tanksObjects = await this.tankService.findByIds(
        createStationDto.tanks.map((entity) => entity.id),
      );
      if (tanksObjects.length !== createStationDto.tanks.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            deposits: 'notExists',
          },
        });
      }
      tanks = tanksObjects;
    } else if (createStationDto.tanks === null) {
      tanks = null;
    }

    let deposits: Deposit[] | null | undefined = undefined;

    if (createStationDto.deposits) {
      const depositsObjects = await this.depositService.findByIds(
        createStationDto.deposits.map((entity) => entity.id),
      );
      if (depositsObjects.length !== createStationDto.deposits.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            deposits: 'notExists',
          },
        });
      }
      deposits = depositsObjects;
    } else if (createStationDto.deposits === null) {
      deposits = null;
    }

    let products: Product[] | null | undefined = undefined;

    if (createStationDto.products) {
      const productsObjects = await this.productService.findByIds(
        createStationDto.products.map((entity) => entity.id),
      );
      if (productsObjects.length !== createStationDto.products.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            products: 'notExists',
          },
        });
      }
      products = productsObjects;
    } else if (createStationDto.products === null) {
      products = null;
    }

    const ownerObject = await this.stationOwnerService.findById(
      createStationDto.owner.id,
    );
    if (!ownerObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          owner: 'notExists',
        },
      });
    }
    const owner = ownerObject;

    return this.stationRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      islets,

      tanks,

      deposits,

      products,

      owner,

      name: createStationDto.name,

      ICE: createStationDto.ICE,

      RC: createStationDto.RC,

      IF: createStationDto.IF,

      CNSS: createStationDto.CNSS,

      tvaCarb: createStationDto.tvaCarb,

      tvaLub: createStationDto.tvaLub,

      tvaService: createStationDto.tvaService,

      tvaCoffeRest: createStationDto.tvaCoffeRest,

      tvaShop: createStationDto.tvaShop,

      displayHeader: createStationDto.displayHeader,

      displayFooter: createStationDto.displayFooter,

      logo: createStationDto.logo,

      stampImg: createStationDto.stampImg,

      signatureImg: createStationDto.signatureImg,

      imgs: createStationDto.imgs,

      contact: createStationDto.contact,

      address: createStationDto.address,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.stationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Station['id']) {
    return this.stationRepository.findById(id);
  }

  findByIds(ids: Station['id'][]) {
    return this.stationRepository.findByIds(ids);
  }

  async update(
    id: Station['id'],

    updateStationDto: UpdateStationDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let islets: Islet[] | null | undefined = undefined;

    if (updateStationDto.islets) {
      const isletsObjects = await this.isletService.findByIds(
        updateStationDto.islets.map((entity) => entity.id),
      );
      if (isletsObjects.length !== updateStationDto.islets.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            islets: 'notExists',
          },
        });
      }
      islets = isletsObjects;
    } else if (updateStationDto.islets === null) {
      islets = null;
    }

    let tanks: Tank[] | null | undefined = undefined;

    if (updateStationDto.tanks) {
      const tanksObjects = await this.tankService.findByIds(
        updateStationDto.tanks.map((entity) => entity.id),
      );
      if (tanksObjects.length !== updateStationDto.tanks.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            deposits: 'notExists',
          },
        });
      }
      tanks = tanksObjects;
    } else if (updateStationDto.tanks === null) {
      tanks = null;
    }

    let deposits: Deposit[] | null | undefined = undefined;

    if (updateStationDto.deposits) {
      const depositsObjects = await this.depositService.findByIds(
        updateStationDto.deposits.map((entity) => entity.id),
      );
      if (depositsObjects.length !== updateStationDto.deposits.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            deposits: 'notExists',
          },
        });
      }
      deposits = depositsObjects;
    } else if (updateStationDto.deposits === null) {
      deposits = null;
    }

    let products: Product[] | null | undefined = undefined;

    if (updateStationDto.products) {
      const productsObjects = await this.productService.findByIds(
        updateStationDto.products.map((entity) => entity.id),
      );
      if (productsObjects.length !== updateStationDto.products.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            products: 'notExists',
          },
        });
      }
      products = productsObjects;
    } else if (updateStationDto.products === null) {
      products = null;
    }

    let owner: StationOwner | undefined = undefined;

    if (updateStationDto.owner) {
      const ownerObject = await this.stationOwnerService.findById(
        updateStationDto.owner.id,
      );
      if (!ownerObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            owner: 'notExists',
          },
        });
      }
      owner = ownerObject;
    }

    return this.stationRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      islets,

      tanks,

      deposits,

      products,

      owner,

      name: updateStationDto.name,

      ICE: updateStationDto.ICE,

      RC: updateStationDto.RC,

      IF: updateStationDto.IF,

      CNSS: updateStationDto.CNSS,

      tvaCarb: updateStationDto.tvaCarb,

      tvaLub: updateStationDto.tvaLub,

      tvaService: updateStationDto.tvaService,

      tvaCoffeRest: updateStationDto.tvaCoffeRest,

      tvaShop: updateStationDto.tvaShop,

      displayHeader: updateStationDto.displayHeader,

      displayFooter: updateStationDto.displayFooter,

      logo: updateStationDto.logo,

      stampImg: updateStationDto.stampImg,

      signatureImg: updateStationDto.signatureImg,

      imgs: updateStationDto.imgs,

      contact: updateStationDto.contact,

      address: updateStationDto.address,
    });
  }

  remove(id: Station['id']) {
    return this.stationRepository.remove(id);
  }
}
