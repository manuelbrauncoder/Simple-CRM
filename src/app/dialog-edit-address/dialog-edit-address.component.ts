import { Component, inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-address',
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
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  public fireService = inject(FirebaseService);
  readonly dialogRef = inject(MatDialogRef<DialogEditAddressComponent>);
  loading: boolean = false;

  /**
   * creates a copy from currentUser
   * important for editing objects
   */
  user: User = new User(this.fireService.currentUser);

  closeDialog(): void {
    this.dialogRef.close();
  }

  async saveEditedUserAddress() {
    this.loading = true;  
    await this.fireService.updateUser(this.user);
    this.loading = false;
    this.closeDialog();
  }
}
