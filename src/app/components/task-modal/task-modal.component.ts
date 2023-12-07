// src/app/task-modal/task-modal.component.ts
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Completed } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-modal', 
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'], 
})
export class TaskModalComponent { 
  @Input() taskId!: number;
  @Input() taskComplete!: number;

  constructor(private modalController: ModalController, private taskService: TaskService) {}



  guardarCambios() {
    const tareaActualizada: Completed = {
      taskComplete: this.taskComplete,
      // Otras propiedades necesarias para el modelo Completed...
    };

    this.taskService.Completed(this.taskId, tareaActualizada).subscribe(
      (completedTask) => {
        // La actualización fue exitosa
        this.modalController.dismiss({
          role: 'ok',
          data: {
            updatedStatus: 'completed',
            completedTask: completedTask,
          },
        });
        this.taskService.notificarActualizacionTabla();
      },
     
      (error) => {
        // Manejar el error de actualización aquí
        console.error('Error al actualizar el estado de la tarea:', error);
      }
    );
  }


  cerrarModal(){
    this.modalController.dismiss();
    this.taskService.notificarActualizacionTabla();
  }

  onEstadoChange(event: CustomEvent) {
    this.taskComplete = event.detail.value as number;
  }
}
