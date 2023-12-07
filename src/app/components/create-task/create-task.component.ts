import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/interfaces/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent  implements OnInit {
  tasks: Task[] = [];
  formularioTarea: FormGroup;
  taskComplete: number = 0;
  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    ) {
    this.formularioTarea = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      prioridad: ['', Validators.required],
    });
   }

  ngOnInit() {}

  async agregarTarea() {
    const alert = await this.alertController.create({
      header: 'Agregar Tarea',
      message: '¿Estás seguro de que deseas agregar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Agregar',
          handler: async () => {
            try {
              const request: Task = {
                idTarea: 0,
                nombre: this.formularioTarea.value.nombre,
                descripcion: this.formularioTarea.value.descripcion,
                prioridad: this.formularioTarea.value.prioridad,
                taskComplete: this.taskComplete,
              };
  
              // Llama a tu servicio y espera la respuesta
              const data = await this.taskService.add(request).toPromise();
  
              // Verifica que la respuesta no sea undefined antes de continuar
              if (data) {
                this.tasks.push(data);
  
                this.formularioTarea.patchValue({
                  nombre: '',
                  descripcion: '',
                  prioridad: '',
                });
  
                // Redirige a la página deseada después de agregar la tarea
                this.router.navigate(['/tareas']);
                this.taskService.notificarActualizacionTabla();
              } else {
                console.error('La respuesta del servicio es undefined.');
              }
            } catch (error) {
              // Maneja el error según tus necesidades
              console.error('Error al agregar la tarea:', error);
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  

}
