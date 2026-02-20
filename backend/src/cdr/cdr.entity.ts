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

@AfterInsert()
  async enviarCorreoSiFalla() {
    if (this.disposition !== 'ANSWERED') {
      
      const transporter = nodemailer.createTransport({
        host: 'mail.ipv6-informatica.es',
        port: 465,                   // 👈 Puerto SSL común en Zimbra (o usa 587)
        secure: true,                // 👈 true para puerto 465, false para 587
        auth: {
          user: 'dsebasgonzalez@ipv6-informatica.es',
          pass: 'Davckom2019#'
        },
        tls: {
          rejectUnauthorized: false // 👈 Importante si el certificado de Zimbra es propio/interno
        }
      });

      const mailOptions = {
        from: '"Alertas Asterisk" <tu_usuario@dominio.com>',
        to: 'dsebasgonzalez@ipv6-informatica.es',
        subject: `⚠️ Llamada Perdida: ${this.disposition}`,
        text: `Alerta: La llamada de ${this.src} hacia ${this.dst} no fue contestada. Estado: ${this.disposition}`
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Correo enviado vía Zimbra');
      } catch (error) {
        console.error('❌ Error en Zimbra:', error);
      }
    }
  }

}

