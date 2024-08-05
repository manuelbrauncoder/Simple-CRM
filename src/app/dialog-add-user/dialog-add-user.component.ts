import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {
  
   MatDialogRef, MatDialogActions, MatDialogContent, MatDialogClose
  
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatDialogActions, MatFormFieldModule, MatDialogContent, MatDialogClose, MatButtonModule, MatInputModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);

  onNoClick(): void {

    this.dialogRef.close();
  }
}
