import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../shared/services/user.service';
import { User } from '../user.models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  reloadSubs: Subscription; 
  displayedColumns = ["name", "gender", "email", "phone", "toDetail"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource : MatTableDataSource<User> = new MatTableDataSource([]);

  constructor(
    private router: Router,
    private userS: UserService
  ) { }

  ngOnInit() {
    this.setTableData();
    this.reloadSubs = this.userS.getReloadObs().subscribe(() => {
      this.setTableData();
    });
  }

  ngOnDestroy(): void {
    this.reloadSubs.unsubscribe();
  }

  setTableData(){
    this.dataSource.data = [];
    this.userS.getRandomUsers()
    .pipe(take(1))
    .subscribe((data)=>{
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    })
  }

  toDetail(user: User,id: number) {
    this.router.navigate(['user', id],{state: {userData: JSON.stringify(user)}});
  }

}
