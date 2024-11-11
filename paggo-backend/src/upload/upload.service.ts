import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
const T = require('tesseract.js');

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async saveFile(file: Express.Multer.File, userId: number): Promise<void> {
    if (!file) {
        throw new HttpException('File could not be uploaded. Please try again.', HttpStatus.BAD_REQUEST);
      }
 try{ 
    const ocr = await T.recognize(file.buffer, 'eng+por', {
        logger: info => {
          if (info.status === 'recognizing text...') {
            console.log(`OCR Progress: ${Math.round(info.progress * 100)}%`);
          }
        },
      });
  
    const ocrText= ocr.data.text;

    await this.prisma.invoice.create({
      data: {
        img: file.buffer, 
        text: ocrText,               
        upload_date: new Date(), 
        user_id: userId,             
      },
    });

    console.log('The file was successfully uploaded.');

  } catch (OCRerror) {
    console.error('Error processing OCR:', OCRerror)
    throw new HttpException(
        'Error processing OCR. Please check if the file is readable and try again.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
  }

  async getUserFiles(userId: number) {
  try {
    const files = await this.prisma.invoice.findMany({
      where: { user_id: userId },  
      orderBy: { upload_date: 'desc' },
    });
    return files;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw new HttpException(
      'Error fetching files.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

}

  
