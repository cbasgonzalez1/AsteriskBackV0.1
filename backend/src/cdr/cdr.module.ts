import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CdrEntity } from './cdr.entity';
import { CdrService } from './cdr.service';
import { CdrController } from './cdr.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CdrEntity])],
  providers: [CdrService],
  controllers: [CdrController],
})
export class CdrModule {}
