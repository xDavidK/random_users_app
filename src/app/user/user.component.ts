import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.models';

export interface Contact {
  icon: string,
  contact: string
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  userId: number;

  contacts: Contact[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (history.state.userData) {
      this.user = JSON.parse(history.state.userData);
      this.userId = this.activeRoute.snapshot.params.id;
      this.generateContacts();
    }else {
      this.toDashboard();
    }

  }

  generateContacts(){
    this.contacts.push({icon: "email", contact: this.user.email});
    this.contacts.push({icon: "smartphone", contact: this.user.phone});
    this.contacts.push({icon: "phone", contact: this.user.cell});
  }

  toDashboard(){
    this.router.navigate(['dashboard']);
  }

}
