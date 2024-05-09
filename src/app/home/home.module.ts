import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { EventFilterComponent } from './pages/event-filter/event-filter.component';
import { EventListComponent } from './pages/event-list/event-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeDashboardComponent,
    EventFilterComponent,
    EventListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DemoNgZorroAntdModule,
  ]
})

export class HomeModule { }
