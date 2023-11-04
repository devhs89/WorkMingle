import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from "../../../services/account.service";
import {Subscription} from "rxjs";
import {ToasterService} from "../../../services/toaster.service";
import {PageTitleService} from "../../../services/page-title.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  profileForm: FormGroup = new FormGroup({});
  private _subscriptions: Subscription[] = [];
  private _getUserProfileSubscription: Subscription | null = null;
  private _updateUserSubscription: Subscription | null = null;

  constructor(pageTitleService: PageTitleService, private fb: FormBuilder, private accountService: AccountService, private toasterService: ToasterService) {
    pageTitleService.setPageTitle('Profile');
    pageTitleService.setWindowTitle('Profile');
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      state: [''],
      city: [''],
      postcode: [''],
    });
  }

  getUserProfile() {
    this._getUserProfileSubscription = this.accountService.getUserProfile().subscribe({
      next: (jsonData) => {
        this.profileForm.patchValue({
          email: jsonData.email,
          firstName: jsonData.firstName,
          lastName: jsonData.lastName,
          country: jsonData.country,
          state: jsonData.state,
          city: jsonData.city,
          postcode: jsonData.postcode,
        });
      },
      error: (httpErrResp) => this.toasterService.openSnackbar({message: httpErrResp.error.message, type: "error"})
    });
    this._subscriptions.push(this._getUserProfileSubscription);
  }

  ngAfterViewInit(): void {
    this.getUserProfile();
  }

  onWmPfUpdateSubmit() {
    if (this.profileForm.valid) {
      const updatedProfile = this.profileForm.value;
      this._updateUserSubscription = this.accountService.updateUser(updatedProfile).subscribe({
        next: (jsonData) => {
          this.profileForm.patchValue({
            email: jsonData.email,
            firstName: jsonData.firstName,
            lastName: jsonData.lastName,
            country: jsonData.country,
            state: jsonData.state,
            city: jsonData.city,
            postcode: jsonData.postcode,
          });
          this.toasterService.openSnackbar({message: 'Profile updated successfully', type: 'success'});
        },
        error: (httpErrResp) => {
          this.toasterService.openSnackbar({message: httpErrResp.error.message, type: 'error'});
        }
      });
      this._subscriptions.push(this._updateUserSubscription);
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
  }
}
