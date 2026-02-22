import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {AuthService} from '../services/auth.service';
import {User} from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {

  user:User|null=null;

  constructor(private authService:AuthService) {}

  ngOnInit() {
    this.user=this.authService.getUser();
  }

  deconnection() {
    this.authService.deconnection();
    this.user = null;

  }
}
