import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent { 
  @Input() dataUpdate: any; 


 
  constructor(
    private modalController: ModalController,
     private taskService: TaskService,
     private alertController: AlertController,) {

  }

  cerrarModal() {
    this.modalController.dismiss();
    this.taskService.notificarActualizacionTabla();
  }

  async guardarCambios() {
    const alert = await this.alertController.create({
      header: 'Guardar Cambios',
      message: '¿Estás seguro de que deseas guardar los cambios?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: async () => {
            try {
              const taskActualizada = await this.taskService.update(this.dataUpdate.idTarea, this.dataUpdate).toPromise();
              this.modalController.dismiss({
                role: 'ok',
                data: {
                  updatedStatus: 'updated',
                  editedTask: taskActualizada,
                },
              });
              // Notifica la actualización de la tabla
              this.taskService.notificarActualizacionTabla();
            } catch (error) {
              // Manejar el error de actualización aquí
              console.error('Error al actualizar la tarea:', error);
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
  
}
