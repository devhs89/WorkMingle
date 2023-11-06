import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToasterService} from "../../../../services/toaster.service";
import {PageTitleService} from "../../../../services/page-title.service";
import {AccountService} from "../../../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss']
})
export class OnboardComponent implements OnInit {
  @ViewChild('empFormDirective') empFormDirective: any;
  employerForm: FormGroup = new FormGroup({});
  businessNameCtrl = new FormControl('', Validators.required);
  industryCtrl = new FormControl('', Validators.required);
  streetAddressCtrl = new FormControl('', Validators.required);
  cityCtrl = new FormControl('', Validators.required);
  postalCodeCtrl = new FormControl('', Validators.required);
  countryCtrl = new FormControl('', Validators.required);
  websiteCtrl = new FormControl('', [Validators.pattern('https?://.+')]);
  workEmailCtrl = new FormControl('', [Validators.required, Validators.email]);
  workPhoneCtrl = new FormControl('');
  descriptionCtrl = new FormControl('');

  dummyData = {
    "businessName": "ABC Corporation",
    "industry": "Information Technology",
    "streetAddress": "123 Main Street",
    "city": "Example City",
    "postalCode": "12345",
    "country": "Example Country",
    "website": "https://www.abccorp.com",
    "workEmail": "contact@abccorp.com",
    "workPhone": "123-456-7890",
    "description": "ABC Corporation is a leading IT company."
  };


  constructor(pageTitleService: PageTitleService, private router: Router, private fb: FormBuilder, private toasterService: ToasterService, private accountService: AccountService) {
    pageTitleService.setWindowTitle('Onboard');
    pageTitleService.setPageTitle('Register as an Employer');
    this.createForm();
  }


  ngOnInit(): void {
    this.employerForm.patchValue(this.dummyData);
  }

  createForm() {
    this.employerForm = this.fb.group({
      businessName: this.businessNameCtrl,
      industry: this.industryCtrl,
      streetAddress: this.streetAddressCtrl,
      city: this.cityCtrl,
      postalCode: this.postalCodeCtrl,
      country: this.countryCtrl,
      website: this.websiteCtrl,
      workEmail: this.workEmailCtrl,
      workPhone: this.workPhoneCtrl,
      description: this.descriptionCtrl
    });
  }

  onEmOnSubmit() {
    if (this.employerForm.valid) {
      const formData = this.employerForm.value;
      this.accountService.registerEmployer(formData).subscribe({
        next: (authResp) => {
          if (authResp.token) {
            this.router.navigate(['/employer/dashboard']).then(() =>
              this.toasterService.openSnackbar({message: 'Employer account created successfully.', type: 'success'}));
          } else {
            this.toasterService.openSnackbar({
              message: 'Employer registration failed. Please contact site administrator.',
              type: 'error'
            });
          }
        },
        error: (err) => {
          this.toasterService.openSnackbar({message: err.error.message, type: 'error'});
        }
      });
    } else {
      // Display an error message
      this.toasterService.openSnackbar({message: 'Please fill out all required fields correctly.', type: 'error'});
    }
  }

}
