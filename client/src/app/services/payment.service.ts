import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) {
  }

  openCheckoutSession() {
    return this.httpClient.post<{ successUrl: string }>('/api/payment/create-checkout-session', {});
  }
}
