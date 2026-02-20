import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { CdrEntity } from './cdr.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CdrService {
  private lastProcessedDate: Date = new Date();
  //private lastProcessedDate: Date = new Date(Date.now() -3600 * 1000);

  constructor(
    @InjectRepository(CdrEntity)
    private readonly cdrRepo: Repository<CdrEntity>,
  ) {}

 
  async list(n?: number) { 
    return await this.cdrRepo.find({
      order: { calldate: 'DESC' },
      take: n || 50, // Si el controlador pasa 'n', lo usa; si no, usa 50 por defecto
    });
  }

}