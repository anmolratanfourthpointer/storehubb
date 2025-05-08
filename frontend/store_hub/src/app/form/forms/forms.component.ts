import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisputeService } from '../../services/dispute.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  standalone: false,  
 
})
export class FormsComponent implements OnInit {
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  currentStep = 1;
  formData: any = {};
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private formUploadService: DisputeService
  ) {}

  ngOnInit(): void {
    this.step1Form = this.fb.group({
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      userId: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      ipAddress: ['', Validators.required],
      deviceOs: ['', Validators.required],
      deviceModel: ['', Validators.required],
      lastLoginTime: ['', Validators.required],
      userAddress: ['', Validators.required],
      orderId: ['', Validators.required],
      extId: ['', Validators.required]
    });

    this.step2Form = this.fb.group({
      receivedAmount: ['', Validators.required],
      recDate: ['', Validators.required],
      mtId: ['', Validators.required],
      bank: ['', Validators.required],
      bankAccNo: ['', Validators.required],
      paidAmount: ['', Validators.required],
      feeAmount: ['', Validators.required],
      feePer: ['', Validators.required],
      feeFixed: ['', Validators.required],
      userWallet: ['', Validators.required],
      status: ['', Validators.required],
      parseStatus: ['', Validators.required],
      transactionFile: [null, Validators.required]
    });
  }

  nextStep(): void {
    if (this.step1Form.valid) {
      this.formData.step1 = this.step1Form.value;
      this.currentStep = 2;
    }
  }

  prevStep(): void {
    this.currentStep = 1;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.step2Form.patchValue({ transactionFile: this.selectedFile.name });
    }
  }

  submitForm(): void {
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    if (this.step2Form.valid) {
      const combinedData = { ...this.step1Form.value, ...this.step2Form.value };

      const formPayload = new FormData();
      for (const key in combinedData) {
        if (key !== 'transactionFile') {
          formPayload.append(key, combinedData[key]);
        }
      }

      formPayload.append('transactionFile', this.selectedFile);

      this.formUploadService.uploadForm(formPayload).subscribe({
        next: (res) => {
          console.log('Upload success:', res);
          alert('Form submitted successfully!');
          this.step1Form.reset();
          this.step2Form.reset();
          this.currentStep = 1;
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Upload failed:', err);
          alert('Upload failed!');
        }
      });
    } else {
      alert('Please complete all fields before submitting.');
    }
  }
}
