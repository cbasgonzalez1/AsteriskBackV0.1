import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { CdrEntity } from './cdr.entity';

@EventSubscriber()
export class CdrSubscriber implements EntitySubscriberInterface<CdrEntity> {
  
  // Indica que este suscriptor es específicamente para la entidad CdrEntity
  listenTo() {
    return CdrEntity;
  }

  // Se ejecuta justo después de que se inserta un registro en la DB
  async afterInsert(event: InsertEvent<CdrEntity>) {
    const { disposition, src, dst, calldate } = event.entity;

    // Verificamos si la llamada NO fue contestada (NO ANSWER, BUSY, FAILED)
    if (disposition !== 'ANSWERED') {
      console.log(`Llamada perdida detectada de ${src} a ${dst}. Enviando correo...`);
      
      try {
        // Aquí llamarás a tu servicio de correo (paso siguiente)
        await this.enviarNotificacion(event.entity);
      } catch (error) {
        console.error('Error al enviar el correo de notificación:', error);
      }
    }
  }

  private async enviarNotificacion(cdr: CdrEntity) {
    // Lógica para enviar el correo a pepito@1234.com
    // Tip: Aquí inyectarás tu MailerService más adelante
  }
}