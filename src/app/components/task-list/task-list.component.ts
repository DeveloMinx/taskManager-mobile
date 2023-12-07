import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent  implements OnInit {

  tasks: Task[] = [];


  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private taskService: TaskService) {}

    ngOnInit(): void {
      this.loadTaskList();

      this.taskService.actualizarTabla$.subscribe(() => {
        this.loadTaskList();
      });
    }

    loadTaskList() {
      this.taskService.getList().subscribe(
        (tasks) => {
          this.tasks = tasks;
        },
        (error) => {
          console.error('Error al cargar la lista de tareas', error);
        }
      );
    }



  async deleteTask(task: Task) {
    const alert = await this.alertController.create({
      header: 'Eliminar Tarea',
      message: `¿Estás seguro de que deseas eliminar la tarea "${task.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              // Utiliza el servicio para eliminar la tarea
              await this.taskService.delete(task.idTarea).toPromise();
              // Elimina la tarea de la lista local después de la eliminación exitosa
              this.tasks = this.tasks.filter((t) => t.idTarea !== task.idTarea);
            } catch (error) {
              console.error('Error al eliminar la tarea', error);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  openEditStatusModal(idTarea: number, taskComplete: number) {
    this.modalController
      .create({
        component: TaskModalComponent,
        componentProps: {
          taskId: idTarea,
          taskComplete: taskComplete,
        },
      })
      .then((modal) => {
        modal.present();
        modal.onDidDismiss().then((data) => {
        });
      });
  }


  async openUdateTaskModal(task: any) {
    const modal = await this.modalController.create({
      component: UpdateModalComponent,
      componentProps: {
        dataUpdate: task,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data.role === 'ok' && data.data) {
        task.status = data.data.updatedStatus;
      }
    });

    await modal.present();
  }


  doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000); 
    this.loadTaskList();
  }
}