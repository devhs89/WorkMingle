import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToasterService} from "../../../../services/toaster.service";
import {PageTitleService} from "../../../../services/page-title.service";

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss']
})
export class OnboardComponent implements OnInit {
  employerForm: FormGroup = new FormGroup({});
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
    console.log();
  }


  ngOnInit(): void {
    this.employerForm.patchValue(this.dummyData);
  }

  createForm() {
    this.employerForm = this.fb.group({
      businessName: ['', Validators.required],
      industry: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      website: ['', [Validators.pattern('https?://.+')]],
      workEmail: ['', [Validators.required, Validators.email]],
      workPhone: [''],
      description: ['']
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
    } else {
      // Display an error message
      this.toasterService.openSnackbar({message: 'Please fill out all required fields correctly.', type: 'error'});
    }
  }

}
