import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CdrEntity } from './cdr/cdr.entity';
import { CdrModule } from './cdr/cdr.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RootController } from './root.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres_asterisk',
      port: 5432,
      username: 'asterisk_user',
      password: 'asterisk_pass',
      database: 'asterisk_cdr',
      entities: [CdrEntity],
      synchronize: false, // NO tocar esquema en producción
      
    }),
    CdrModule,
  ],
 controllers: [RootController] 
}
)

export class AppModule {}
