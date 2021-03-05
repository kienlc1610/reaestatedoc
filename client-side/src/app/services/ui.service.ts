import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  public loadingState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  get isLoading(): boolean {
    return this.loadingState.value;
  }

  showLoading(): void {
    this.loadingState.next(true);
  }

  hideLoading(): void {
    this.loadingState.next(false);
  }
}
