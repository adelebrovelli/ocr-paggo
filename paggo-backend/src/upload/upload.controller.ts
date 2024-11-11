import { Controller, Post, HttpStatus, HttpException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}


@Post ("/")
@UseInterceptors(FileInterceptor('file'))
async uploadFile(@UploadedFile() file: Express.Multer.File) {
  if (!file) {
    throw new HttpException('Arquivo não encontrado', HttpStatus.BAD_REQUEST);
  }
  await this.uploadService.saveFile(file); 
  return { message: 'Upload realizado com sucesso', file };
}
}