import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogActions,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent implements OnInit {
  public fireService = inject(FirebaseService);
  loading: boolean = false;

  readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);
  user = new User();
  birthDate: Date | null = null;

  ngOnInit(): void {
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveUser(){
    this.loading = true;
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    }
    this.fireService.addUser(this.user);
    this.loading = false;
    this.closeDialog();    
  }
}
