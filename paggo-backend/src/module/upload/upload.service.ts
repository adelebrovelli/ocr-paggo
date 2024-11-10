import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
const T = require('tesseract.js');

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async saveFile(file: Express.Multer.File): Promise<void> {
    if (!file) {
        throw new HttpException('The file could not be uploaded. Please try again.', HttpStatus.BAD_REQUEST);
      }
 try{ 

    const ocr = await T.recognize(file.buffer, 'eng+por', {
        logger: info => {
          if (info.status === 'recognizing text...') {
            console.log(`OCR Progress: ${Math.round(info.progress * 100)}%`);
          }
        },
      });
  //logger em percentual como feedback de andamento p usuário 
    const ocrText= ocr.data.text;

    await this.prisma.invoice.create({
      data: {
        img: file.buffer, 
        text: ocrText,               
        upload_date: new Date(), 
        user_id: 1,             // tentar substituir pelo id do login caso dê tempo
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
}
