import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { LocalStorageDriver } from './local-storage.driver';
import { S3StorageDriver } from './s3-storage.driver';
import { STORAGE_DRIVER } from './storage-driver';

@Module({
  controllers: [AssetsController],
  providers: [
    AssetsService,
    LocalStorageDriver,
    S3StorageDriver,
    {
      provide: STORAGE_DRIVER,
      useFactory: (config: ConfigService, local: LocalStorageDriver, s3: S3StorageDriver) =>
        config.get('STORAGE_DRIVER', 'local') === 's3' ? s3 : local,
      inject: [ConfigService, LocalStorageDriver, S3StorageDriver],
    },
  ],
  exports: [AssetsService],
})
export class AssetsModule {}
