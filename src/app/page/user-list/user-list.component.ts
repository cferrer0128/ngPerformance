import { Component, OnInit } from '@angular/core';
import { IUsersResponse, UserService } from '../../service/user.service';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public output$: Observable<IUsersResponse>;
  public page$ = new BehaviorSubject<number>(1)
  public itemsPerPage = 5;
  public isLoading = true;
 
  constructor(private userService: UserService) {
    this.output$ = this.page$.pipe(
      tap(() => this.isLoading = true),
      switchMap((page) => this.userService.loadData(page, this.itemsPerPage)),
      tap(() => this.isLoading = false)
    );
  }
  ngOnInit(): void {
  }
  public pageChanged(page: number) {
    this.page$.next(page);
  }

}
