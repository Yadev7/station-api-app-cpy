import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import fileConfig from './files/config/file.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { MailerModule } from './mailer/mailer.module';

const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

import { CategoriesModule } from './categories/categories.module';

import { StationOwnersModule } from './station-owners/station-owners.module';

import { StationsModule } from './stations/stations.module';

import { ProductsModule } from './products/products.module';

import { DepositsModule } from './deposits/deposits.module';

import { TanksModule } from './tanks/tanks.module';

import { IsletsModule } from './islets/islets.module';

import { DispensersModule } from './dispensers/dispensers.module';

import { NozzlesModule } from './nozzles/nozzles.module';

import { SuppliersModule } from './suppliers/suppliers.module';

import { DevisModule } from './devis/devis.module';

import { DevisProductsModule } from './devis-products/devis-products.module';

import { SupplierOrdersModule } from './supplier-orders/supplier-orders.module';

import { SupplierOrderDetailsModule } from './supplier-order-details/supplier-order-details.module';

import { SupplierBlsModule } from './supplier-bls/supplier-bls.module';

import { SupplierBlDetailsModule } from './supplier-bl-details/supplier-bl-details.module';

@Module({
  imports: [
    SupplierBlDetailsModule,
    SupplierBlsModule,
    SupplierOrderDetailsModule,
    SupplierOrdersModule,
    DevisProductsModule,
    DevisModule,
    SuppliersModule,
    NozzlesModule,
    DispensersModule,
    IsletsModule,
    TanksModule,
    DepositsModule,
    ProductsModule,
    StationsModule,
    StationOwnersModule,
    CategoriesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, mailConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
  ],
})
export class AppModule {}
