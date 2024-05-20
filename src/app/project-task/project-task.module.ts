import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectTaskRoutingModule } from './project-task-routing.module';
import { ProjectTaskComponent } from './project-task.component';
import { PostTaskComponent } from './pages/post-task/post-task.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UpdateTaskComponent } from './pages/update-task/update-task.component';
import { ViewTaskDetailsComponent } from './pages/view-task-details/view-task-details.component';
import { DemoAngularMaterailModule } from '../DemoAngularMaterialModule';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProjectTaskComponent,
    PostTaskComponent,
    DashboardComponent,
    UpdateTaskComponent,
    ViewTaskDetailsComponent
  ],
  imports: [
    CommonModule,
    ProjectTaskRoutingModule,
    DemoAngularMaterailModule,
    ReactiveFormsModule
  ]
})
export class ProjectTaskModule { }
