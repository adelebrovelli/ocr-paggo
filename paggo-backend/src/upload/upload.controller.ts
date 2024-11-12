import { Controller, Post, Get, Req, HttpException, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('dashboard')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const userId = req.session.userId; 
    if (!userId) {
      throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
    }
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    await this.uploadService.saveFile(file, userId);
    return { message: 'Successfully uploaded', file };
  }

  @Get('upload')
  async getUserFiles(@Req() req) {
    const userId = req.session.userId;
    if (!userId) {
      throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
    }
    const files = await this.uploadService.getUserFiles(userId);
    return files;
  }
}
