import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PageTitleService} from "../../../services/page-title.service";
import {AccountService} from "../../../services/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {JobsService} from "../../../services/jobs.service";
import {ActivatedRoute} from "@angular/router";
import {JobAdvertInterface} from "../../../interfaces/job-advert.interface";
import {AppUserInterface} from "../../../interfaces/app-user.interface";
import {faBriefcaseClock} from "@fortawesome/free-solid-svg-icons/faBriefcaseClock";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons/faLocationDot";
import {faCircleDollarToSlot} from "@fortawesome/free-solid-svg-icons/faCircleDollarToSlot";
import {faBuilding} from "@fortawesome/free-solid-svg-icons/faBuilding";
import {faHourglassHalf} from "@fortawesome/free-solid-svg-icons/faHourglassHalf";
import {ToasterService} from "../../../services/toaster.service";

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.scss']
})
export class JobApplicationComponent implements OnInit {
  jobApplicationForm: FormGroup = new FormGroup({});
  userDetails: AppUserInterface | undefined;
  jobDetails: JobAdvertInterface | undefined;
  @ViewChild('coverLetterFileInput') coverLetterFileInput: ElementRef | undefined;
  @ViewChild('resumeFileInput') resumeFileInput: ElementRef | undefined;
  selectedCoverLetterArrayBuffer: Blob | undefined | null = undefined;
  selectedResumeArrayBuffer: Blob | undefined | null = undefined;
  selectedCoverLetterName: string | undefined = undefined;
  selectedResumeName: string | undefined = undefined;

  constructor(pageTitleService: PageTitleService, private activatedRoute: ActivatedRoute, private accountService: AccountService, private jobsService: JobsService, private toasterService: ToasterService) {
    pageTitleService.setWindowTitle('Job Apply');
    pageTitleService.setPageTitle('Submit Your Application');
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.getJobDetails();
    this.jobApplicationForm.addControl('firstName', new FormControl('', [Validators.required]));
    this.jobApplicationForm.addControl('lastName', new FormControl('', [Validators.required]));
  }

  getUserDetails() {
    this.accountService.getUserProfile().subscribe((appUser) => {
      this.userDetails = appUser;
      this.jobApplicationForm.patchValue(appUser);
    });
  }

  getJobDetails() {
    const id = this.activatedRoute.snapshot.queryParamMap.get('id');
    if (!id) return;
    this.jobsService.showJob({jobAdvertId: id}).subscribe((job) => {
      this.jobDetails = job;
    });
  }

  onJafSubmit() {
    if (!this.jobApplicationForm.valid) {
      this.toasterService.openSnackbar({
        message: 'Please fill all the required fields',
        type: 'error'
      });
      return;
    }
    if (!this.jobDetails?._id) {
      this.toasterService.openSnackbar({
        message: 'Job details not found',
        type: 'error'
      });
      return;
    }
    if (!this.selectedResumeArrayBuffer) {
      this.toasterService.openSnackbar({
        message: 'Please select a resume',
        type: 'error'
      });
      return;
    }
    const formData = this.jobApplicationForm.value;
    const {firstName, lastName} = formData;
    const payload = {
      jobAdvertId: this.jobDetails._id,
      firstName,
      lastName,
      coverLetter: this.coverLetterFileInput?.nativeElement.files[0] ?? null,
      resume: this.resumeFileInput?.nativeElement.files[0]
    };
    this.jobsService.applyJob(payload).subscribe((response) => {
      console.log(response);
    });
  }

  protected readonly faBriefcaseClock = faBriefcaseClock;
  protected readonly faLocationDot = faLocationDot;
  protected readonly faCircleDollarToSlot = faCircleDollarToSlot;
  protected readonly faBuilding = faBuilding;
  protected readonly faHourglassHalf = faHourglassHalf;

  parseDate(dateExpires: any) {
    const dateObj = new Date(dateExpires);
    return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
  }

  async onCoverLetterFileSelected() {
    if (!this.coverLetterFileInput) return;
    const result = await this.onFileSelected(this.coverLetterFileInput.nativeElement.files[0]);
    if (!result || !result.fileBlob) return;
    this.selectedCoverLetterName = result.fileName;
    this.selectedCoverLetterArrayBuffer = result.fileBlob;
  }

  async onResumeFileSelected() {
    if (!this.resumeFileInput) return;
    const result = await this.onFileSelected(this.resumeFileInput.nativeElement.files[0]);
    if (!result || !result.fileBlob) return;
    this.selectedResumeName = result.fileName;
    this.selectedResumeArrayBuffer = result.fileBlob;
  }

  async onFileSelected(selectedFile: File) {
    try {
      const fileExtension = selectedFile.name.split('.').pop();
      if (!fileExtension || !['pdf', 'doc', 'docx'].includes(fileExtension)) {
        this.toasterService.openSnackbar({
          message: 'Only PDF, DOC and DOCX files are allowed',
          type: 'error'
        });
        return null;
      }
      if (selectedFile.size > 1024 * 1024) {
        this.toasterService.openSnackbar({
          message: 'File size must be less than 1MB',
          type: 'error'
        });
        return null;
      }
      const fileBuffer = await selectedFile.arrayBuffer();
      const fileBlob = new Blob([fileBuffer], {type: selectedFile.type});
      if (!fileBlob) {
        this.toasterService.openSnackbar({
          message: 'Something went wrong. Please contact support team if the problem persists',
          type: 'error'
        });
        return null;
      }
      return {fileBlob, fileName: selectedFile.name};
    } catch (e) {
      this.toasterService.openSnackbar({
        message: 'Something went wrong. Please contact support team if the problem persists',
        type: 'error'
      });
      return null;
    }
  }
}
