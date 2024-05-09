import { Component } from '@angular/core';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent {
  array = [
    { id: 1, imageUrl: 'assets/images/logoHatunSoft.png', title: 'HatunSoft' },
    { id: 2, imageUrl: 'assets/images/logoUtaMicrosoftCommunity.png', title: 'Uta Microsoft Community' },
    { id: 3, imageUrl: 'assets/images/logoUtaBot.png', title: 'Club de Robótica' }
  ];
}
