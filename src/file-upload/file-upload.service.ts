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

  async uploadFile(file: BufferedFile) {

    if (!file) throw new HttpException('Error: loading file', HttpStatus.NOT_FOUND)

    let uploaded_file = await this.minioClientService.upload(file)
    if (uploaded_file) {
      const dbFile = await this.fileRepository.create({ name: uploaded_file.hashedFileName.encryptedData, path: uploaded_file.relative_path });

      return {
        file: {
          id: dbFile.id,
          name: dbFile.name,
          path: process.env.MINIO_FILES_ENDPOINT + uploaded_file.relative_path
        },
        message: "Success"
      }
    } else {
      throw new HttpException('Error: loading file to server ', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}