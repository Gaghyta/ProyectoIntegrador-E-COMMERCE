import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';


@Component({
  selector: 'app-sections-descriptions',
  templateUrl: './sections-descriptions.component.html',
  styleUrls: ['./sections-descriptions.component.css']
})
export class SectionsDescriptionsComponent implements OnInit {

  constructor(private navigationService: NavigationService) { }

  ngOnInit():void {
  }

  navigate() {
    this.navigationService.navigateToProducts();
  }
}
