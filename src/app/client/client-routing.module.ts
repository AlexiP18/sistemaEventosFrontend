import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { ReviewComponent } from './pages/review/review.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ViewTaskDetailsComponent } from './pages/view-task-details/view-task-details.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'dashboard', component: ClientDashboardComponent },
  { path: 'bookings', component: MyBookingsComponent },
  { path: 'ad/:adId', component: AdDetailComponent },
  { path: 'review/:id', component: ReviewComponent },
  { path: 'task/dashboard', component: DashboardComponent},
  { path: 'task-details/:id', component: ViewTaskDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
