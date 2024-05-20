import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  listOfTasks: any = [];

  constructor(
    private snackBar: MatSnackBar,
    private clientService: ClientService
  ) {
    this.getTasksByUserId();
  }

  getTasksByUserId() {
    this.clientService.getTasksByUserId().subscribe(res => {
      this.listOfTasks = res;
    })
  }

  updateStatus(id: number, status: string) {
    this.clientService.updateTask(id, status).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.snackBar.open('Estado de Proyecto Actualizado', 'Cerrar', {
          duration: 5000
        });
        this.getTasksByUserId();
      } else {
        this.snackBar.open(res.message, 'ERROR', {
          duration: 5000
        });
      }
    })
  }
}
