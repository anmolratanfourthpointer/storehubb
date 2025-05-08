
export interface Transaction {
    _id: string;
    store: string;
    receivedFrom: string;
    utr: string;
    vpa: string;
    datetime: string;
    amount: number;
    raised: boolean;
    __v: number;
  }
  
