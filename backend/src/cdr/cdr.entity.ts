import { Column, Entity, PrimaryColumn ,AfterInsert} from 'typeorm';
import * as nodemailer from 'nodemailer';

@Entity({ name: 'cdr' })
export class CdrEntity {

  @PrimaryColumn({ type: 'varchar', length: 150 })
  uniqueid!: string;

  @Column({ type: 'timestamp' })
  calldate!: Date;

  @Column({ type: 'varchar', length: 80 })
  clid!: string;

  @Column({ type: 'varchar', length: 80 })
  src!: string;

  @Column({ type: 'varchar', length: 80 })
  dst!: string;

  @Column({ type: 'varchar', length: 80 })
  dcontext!: string;

  @Column({ type: 'varchar', length: 80 })
  channel!: string;

  @Column({ type: 'varchar', length: 80 })
  dstchannel!: string;

  @Column({ type: 'varchar', length: 80 })
  lastapp!: string;

  @Column({ type: 'varchar', length: 80 })
  lastdata!: string;

  @Column({ type: 'int' })
  duration!: number;

  @Column({ type: 'int' })
  billsec!: number;

  @Column({ type: 'varchar', length: 45 })
  disposition!: string;

  @Column({ type: 'int' })
  amaflags!: number;

  @Column({ type: 'varchar', length: 20 })
  accountcode!: string;

  @Column({ type: 'varchar', length: 255 })
  userfield!: string;


}

