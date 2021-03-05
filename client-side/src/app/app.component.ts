import { Component, OnInit } from '@angular/core';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'reaestatedoc-client';
  isShowLoading = false;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.uiService.loadingState.subscribe((isLoading) => {
      this.isShowLoading = isLoading;
    });
  }
}
