import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
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
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatProgressBarModule,
    FormsModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent implements OnInit {
  public fireService = inject(FirebaseService);
  readonly dialogRef = inject(MatDialogRef<DialogEditUserComponent>);
  loading: boolean = false;
  birthDate: any = '2022-12-06';

  user: User = new User(this.fireService.currentUser);

  constructor() {
    this.birthDate = this.formatUnixTimestampForDatePicker(this.user.birthDate);
  }

  formatUnixTimestampForDatePicker(unixTimestamp: number): string {
    const date = new Date(unixTimestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async saveEditedUser() {
    this.loading = true;
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    }
    await this.fireService.updateUser(this.user);
    this.loading = false;
    this.closeDialog();
  }

  ngOnInit(): void {}
}
