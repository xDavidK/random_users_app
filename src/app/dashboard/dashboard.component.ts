import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  randomUsersForm : FormGroup;
  showUsers = false;

  constructor(
    private formB : FormBuilder,
    private userS: UserService
  ) { }

  ngOnInit() {
    this.createRandomUsersForm();
  }

  createRandomUsersForm(){
    if(this.userS.getSeed() !== undefined){
      this.randomUsersForm = this.formB.group({
        results: new FormControl(this.userS.getResults(),[Validators.max(5000),Validators.min(1)]),
        seed: new FormControl(this.userS.getSeed())
      });
      this.showUsers = true;
    }else {
      this.randomUsersForm = this.formB.group({
        results: new FormControl(1,[Validators.max(5000),Validators.min(1)]),
        seed: new FormControl("seedRandom")
      });
    }
  
  }



  generate(){
    this.randomUsersForm.markAllAsTouched();
    if(this.randomUsersForm.valid){
      this.userS.setSeed(this.randomUsersForm.value.seed);
      this.userS.setResults(this.randomUsersForm.value.results);
      if(this.showUsers){
        this.userS.reloadData();
      }
      this.showUsers = true;
    }
  }

}
