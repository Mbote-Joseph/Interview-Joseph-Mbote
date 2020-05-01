import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {
  title = "Website Redesign";
  isLoggedIn = false;
  userDisplayName: string;
  userId: string;


}
