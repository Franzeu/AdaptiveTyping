import { Component, OnInit, Inject, DoCheck } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from 'src/app/shared/services/user';
import { userStats } from 'src/app/shared/services/userStats';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

export interface DialogData {
  wpmData: string;
  accData: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  wpm!: number;
  accuracy!: number;
  private statsURL = 'http://localhost:4000/api/gtusrdata';

  constructor(public dialog: MatDialog, private http: HttpClient, private authService: AuthService) {}
  
  ngOnInit(): void {
  }

  getUserStats(): Observable<userStats>{
    const criteria = [ {uid: this.authService.userData.uid} ];
    return this.http.get<userStats>(this.statsURL + "/?criteria=" + encodeURIComponent( JSON.stringify(criteria)));
  }

  openDialog(): void {
    // Make sure old user stats are read in
    this.getUserStats().subscribe((response) => {
      this.wpm = response.wpm;
      this.accuracy = response.accuracy;
      
      this.dialog.open(ProfileDialog, {
        data: {wpmData: this.wpm, accData: this.accuracy},
      });
      this.ngOnInit();
    });
  }
}


@Component({
  selector: 'profile-dialog',
  templateUrl: './profile-dialog.html',
})
export class ProfileDialog {
  constructor(
    public dialogRef: MatDialogRef<ProfileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

}