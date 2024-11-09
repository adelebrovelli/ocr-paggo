import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
//import * as fs from 'fs';
//import * as path from 'path';


@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async saveFile(file: Express.Multer.File): Promise<void> {
 try{ 
    //lembrar que é com essa funcao onde ele armazena as NF no banco
    await this.prisma.invoice.create({
      data: {
        img: file.buffer, 
        text: '',               // preencherei após OCR implementado
        upload_date: new Date(), 
        user_id: 1,             // tentar substituir pelo id do login caso dê tempo
      },
    });
    console.log('O upload foi realizado corretamente.');
  } catch (error) {
    throw new HttpException(
        'Não foi possível realizar o upload. Por favor, tente novamente.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
  }
}
