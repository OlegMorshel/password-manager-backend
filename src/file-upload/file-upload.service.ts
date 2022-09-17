import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { File } from './file.model';



@Injectable()
export class FileUploadService {
  constructor(@InjectModel(File)
  private fileRepository: typeof File, private minioClientService: MinioClientService) { }

  async getFiles() {
    return await this.fileRepository.findAll()
  }
  async getFileById(id: number) {
    const existedFile = await this.fileRepository.findOne({ where: { id } })
    if (!existedFile) throw new HttpException(`File with ID:${id} NOT FOUND`, HttpStatus.NOT_FOUND)
    return existedFile
  }
  async deleteFile(id: number) {
    const removedFile = await this.getFileById(id)
    await this.fileRepository.destroy({ where: { id: removedFile.id } })
    return { message: 'File success deleted' }
  }

  async uploadFile(image: BufferedFile) {
    let uploaded_image = await this.minioClientService.upload(image)

    const dbFile = await this.fileRepository.create({ name: image.originalname, path: uploaded_image.relative_path });

    return {
      file: {
        id: dbFile.id,
        name: dbFile.name,
        path: process.env.MINIO_FILES_ENDPOINT + uploaded_image.relative_path
      },
      message: "Success"
    }
  }

}