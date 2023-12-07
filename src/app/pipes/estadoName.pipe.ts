import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoTask'
})
export class EstadoTaskPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Incompleta';
      case 1:
        return 'Completa';
      case 3:
        return 'En Proceso';
      default:
        return 'Desconocido';
    }
  }

}
