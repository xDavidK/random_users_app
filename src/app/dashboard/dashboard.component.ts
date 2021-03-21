import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  randomUsersForm: FormGroup;
  showUsers = false;

  constructor(
    private formB: FormBuilder,
    private userS: UserService
  ) { }

  ngOnInit() {
    if (this.userS.getSeed() !== undefined) {
      this.createRandomUsersForm(this.userS.getResults(), this.userS.getSeed());
      this.showUsers = true;
    } else {
      this.createRandomUsersForm(1, "seedRandom");
    }
  }

  createRandomUsersForm(initResults: number, initSeed: string) {
    this.randomUsersForm = this.formB.group({
      results: new FormControl(initResults, [Validators.max(5000), Validators.min(1)]),
      seed: new FormControl(initSeed)
    });

  }



  generate() {
    this.randomUsersForm.markAllAsTouched();
    if (this.randomUsersForm.valid) {
      this.userS.setSeed(this.randomUsersForm.value.seed);
      this.userS.setResults(this.randomUsersForm.value.results);
      if (this.showUsers) {
        this.userS.reloadData();
      }
      this.showUsers = true;
    }
  }

}
