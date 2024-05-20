import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PostTaskComponent } from './pages/post-task/post-task.component';
import { UpdateTaskComponent } from './pages/update-task/update-task.component';
import { ViewTaskDetailsComponent } from './pages/view-task-details/view-task-details.component';
import { ProjectTaskComponent } from './project-task.component';

const routes: Routes = [
  { path: '', component: ProjectTaskComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "task/post", component: PostTaskComponent },
  { path: "task/:id/edit", component: UpdateTaskComponent },
  { path: "task-details/:id", component: ViewTaskDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectTaskRoutingModule { }
