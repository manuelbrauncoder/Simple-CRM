import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import {MatCardModule} from '@angular/material/card';
import {
  
  MatDialog,
  
} from '@angular/material/dialog';
import { User } from '../models/user.class';
import { FirebaseService } from '../services/firebase.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  fireService = inject(FirebaseService);

  readonly dialog = inject(MatDialog);
  user = new User();

  openDialog(){
    this.dialog.open(DialogAddUserComponent);
  }

  ngOnInit(): void {
    
    
  }
}
