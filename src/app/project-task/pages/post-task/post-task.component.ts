import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProjectTaskService } from '../../services/project-task.service';

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.scss']
})
export class PostTaskComponent {
  taskForm: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["BAJA", "MEDIO", "ALTA"];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private projectTaskService: ProjectTaskService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      priority: [null, [Validators.required]],
    });

    this.getAllUsers();
  }

  getAllUsers() {
    this.projectTaskService.getAllUsers().subscribe(res => {
      this.listOfEmployees = res;
    })
  }

  postTask(): void {
    if (this.taskForm.valid) {
      this.projectTaskService.postTask(this.taskForm.value).subscribe((res) => {
        console.log(res);
        if (res.id != null) {
          this.snackBar.open('Proyecto Agregado Exitosamente', 'Cerrar', {
            duration: 3000
          });
          this.router.navigateByUrl('/project-task/dashboard');
        } else {
          this.snackBar.open(res.message, 'ERROR', {
            duration: 5000
          });
        }
      })
    } else {
      for (const i in this.taskForm.controls) {
        this.taskForm.controls[i].markAsDirty();
        this.taskForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
