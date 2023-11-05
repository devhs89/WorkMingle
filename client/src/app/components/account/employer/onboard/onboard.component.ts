import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToasterService} from "../../../../services/toaster.service";
import {PageTitleService} from "../../../../services/page-title.service";

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


  constructor(pageTitleService: PageTitleService, private fb: FormBuilder, private toasterService: ToasterService) {
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
      // You can send the form data to your server here for registration
      const formData = this.employerForm.value;
      // Example: Send the formData to your API
      // Your API call goes here, e.g., using HttpClient
      console.log(formData);

      // Display a success message
      this.toasterService.openSnackbar({message: 'Employer registration successful!', type: 'success'});

      // Reset the form after successful submission
      this.employerForm.reset();
      this.empFormDirective.resetForm();
    } else {
      // Display an error message
      this.toasterService.openSnackbar({message: 'Please fill out all required fields correctly.', type: 'error'});
    }
  }

}
