import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toaster: ToastrService) { }

  showSuccess(title: string, message: string) {
    this.toaster.success(title, message);
  }
  showError(title: string, message: string) {
    this.toaster.error(title, message);
  }
  showWarning(title: string, message: string) {
    this.toaster.warning(title, message);
  }
  showInfo(title: string, message: string) {
    this.toaster.info(title, message);
  }
}
