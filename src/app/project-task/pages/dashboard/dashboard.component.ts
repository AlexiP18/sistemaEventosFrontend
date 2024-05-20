import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectTaskService } from '../../services/project-task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  listOfTasks: any = [];
  searchTaskForm!: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private projectTaskService: ProjectTaskService
  ) {
    this.searchTaskForm = this.fb.group({
      title: [null]
    })
    this.getAllTasks();
  }

  submitForm() {
    this.listOfTasks = [];
    const title = this.searchTaskForm.get('title')!.value;
    this.projectTaskService.searchTasks(title).subscribe(res => {
      this.listOfTasks = res;
    })
  }

  getAllTasks() {
    this.projectTaskService.getAllTasks().subscribe(res => {
      this.listOfTasks = res;
    })
  }

  deleteTask(id: number): void {
    this.projectTaskService.deleteTask(id).subscribe((res) => {
      this.snackBar.open('Proyecto eliminado correctamente', 'Cerrar', {
        duration: 3000
      });
      this.getAllTasks();
    })
  }

}
