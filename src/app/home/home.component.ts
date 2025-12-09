import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {

  data: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getData().subscribe(response => {
      this.data = response;
    });
  }
}
