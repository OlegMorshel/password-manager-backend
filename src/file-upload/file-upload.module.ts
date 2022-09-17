import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './file.model';

@Module({
  imports: [MinioClientModule, SequelizeModule.forFeature([File]),],
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule { }
