import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageTitleService} from "../../../services/page-title.service";
import {PaymentService} from "../../../services/payment.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-preview',
  templateUrl: './order-preview.component.html',
  styleUrls: ['./order-preview.component.scss']
})
export class OrderPreviewComponent implements OnInit, OnDestroy {
  subscriptionServiceSubscription: Subscription | null = null;
  subscriptions: Subscription[] = [];

  constructor(pageTitleService: PageTitleService, private paymentService: PaymentService) {
    pageTitleService.setWindowTitle('Order Preview');
    pageTitleService.setPageTitle('Order Preview');
  }

  ngOnInit(): void {
  }

  openCheckout() {
    this.subscriptionServiceSubscription = this.paymentService.openCheckoutSession()
      .subscribe((resp) => {
        if (resp) {
          window.open(resp.successUrl, '_self');
        }
      });
    this.subscriptions.push(this.subscriptionServiceSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
