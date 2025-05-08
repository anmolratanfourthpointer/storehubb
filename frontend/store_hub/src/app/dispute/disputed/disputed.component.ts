import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DisputeService } from '../../services/dispute.service';
import { Transaction } from '../../models/transaction.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-disputed',
  standalone: false,
  templateUrl: './disputed.component.html',
  styleUrl: './disputed.component.css'
})
export class DisputedComponent implements OnInit {

  constructor (private DisputeService : DisputeService , private fb: FormBuilder) {}
  transactionForm !: FormGroup;
  disputes : Transaction []= [];  
  filterStore = '';
  filterReceivedFrom = '';
  filterUTR = '';
  filterVPA = '';
  filterDateTime = '';
  filterAmount = '';
  filterRaised = '';
 
  showModal: boolean = false;

  // Function to close the modal
  closeModal(): void {
    this.showModal = false;
  }

  filteredDisputes = [...this.disputes];

  ngOnInit(): void {
    
   
    
    this.DisputeService.getDispute().subscribe({
      next: (data) => {
        this.disputes = data;
        this.applyFilters();  
      },
      error: (err) => {
        console.log("Error while fetching dispute data", err);
      }
    });

    this.transactionForm = this.fb.group({
      _id:'',
      store: ['', Validators.required],
      receivedFrom: ['', Validators.required],
      utr: ['', Validators.required],
      vpa: ['', Validators.required],
      datetime: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      raised: [false]
    });

  }
  

  applyFilters(): void {
    this.filteredDisputes = this.disputes.filter(d =>
      d.store.toLowerCase().includes(this.filterStore.toLowerCase()) &&
      d.receivedFrom.toLowerCase().includes(this.filterReceivedFrom.toLowerCase()) &&
      d.utr.toLowerCase().includes(this.filterUTR.toLowerCase()) &&
      d.vpa.toLowerCase().includes(this.filterVPA.toLowerCase()) &&
      d.datetime.toLowerCase().includes(this.filterDateTime.toLowerCase()) &&
      d.amount.toString().toLowerCase().includes(this.filterAmount.toLowerCase()) && 
      d.raised.toString().toLowerCase().includes(this.filterRaised.toLowerCase())
    );
  }
  

  getTotalAmount(): number {
    return this.disputes.reduce((total, item) => total + item.amount, 0);
  }
  
  exportData() {
    const headers = ['Store', 'Received From', 'UTR', 'VPA', 'Date & Time', 'Amount', 'Dispute Raised'];
    const rows = this.disputes.map(item => [
      item.store,
      item.receivedFrom,
      item.utr,
      item.vpa,
      item.datetime,
      item.amount,
      item.raised
    ]);
  
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\r\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\r\n';
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'disputes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  

  activeMenu: string = 'dispute'; 

  setActiveMenu(menu: string) {
    this.activeMenu = menu; 
  }
  

  editDispute(item: any) {
    if (item) {
      this.transactionForm.patchValue({
        _id: item._id,
        store: item.store,
        receivedFrom: item.receivedFrom,
        utr: item.utr,
        vpa: item.vpa,
        datetime: item.datetime,
        amount: item.amount,
        raised: item.raised
      });
    }
    
  }
  

  removeDispute(item:any){

  }
  viewDispute(item:any){

  }
  
  
  
 
  onSubmit(): void {
    if (this.transactionForm.valid) {
      const payload = this.transactionForm.value;
  
      this.DisputeService.editDispute(payload).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.transactionForm.reset(); 
          this.showModal = false; 

        },
        error: (error) => {
          console.error('Update failed:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  
  
}
