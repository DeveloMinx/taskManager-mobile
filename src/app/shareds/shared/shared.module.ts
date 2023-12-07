import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from 'src/app/components/task-list/task-list.component';
import { EditTaskComponent } from 'src/app/components/edit-task/edit-task.component';
import { CreateTaskComponent } from 'src/app/components/create-task/create-task.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TaskModalComponent } from 'src/app/components/task-modal/task-modal.component';
import { UpdateModalComponent } from 'src/app/components/update-modal/update-modal.component';


import { EstadoTaskPipe } from 'src/app/pipes/estadoName.pipe';



@NgModule({
  declarations: [
    TaskListComponent,
    EditTaskComponent,
    CreateTaskComponent,
    HeaderComponent,
    TaskModalComponent,
    UpdateModalComponent,
    EstadoTaskPipe
  ],
  exports:[
    TaskListComponent,
    EditTaskComponent,
    CreateTaskComponent,
    HeaderComponent,
    TaskModalComponent,
    ReactiveFormsModule,
    UpdateModalComponent,
    EstadoTaskPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,


  ]
})
export class SharedModule { }
