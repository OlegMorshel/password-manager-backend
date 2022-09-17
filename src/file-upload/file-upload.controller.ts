import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio-client/file.model';
import { FileUploadService } from './file-upload.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) { }

  @Get('')
  async getAllFiles() {
    return await this.fileUploadService.getFiles();
  }

  @Get(':id')
  async getFileById(@Param('id') id: number) {
    return await this.fileUploadService.getFileById(id)
  }


  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() image: BufferedFile
  ) {
    return await this.fileUploadService.uploadFile(image)
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: number) {
    return await this.fileUploadService.deleteFile(id)
  }


}
