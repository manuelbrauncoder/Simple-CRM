import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public fireService = inject(FirebaseService);
  readonly dialog = inject(MatDialog);

  editUserAddress(){
  this.dialog.open(DialogEditAddressComponent);
  }

  editUser() {
    this.dialog.open(DialogEditUserComponent);
  }

  deleteUser(){
    this.fireService.deleteUser(this.fireService.currentUserId);
    this.router.navigate(['/user']);
  }


  getUserId(){
    this.route.params.subscribe(params => {
      this.fireService.currentUserId = params['id'];
    })
  }

  ngOnInit(): void {
    this.getUserId();
    this.fireService.getUserDetails();
  }
}
