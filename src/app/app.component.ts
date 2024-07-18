import { Component } from '@angular/core';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  template: `
  <div class="grow overflow-hidden flex flex-col items-stretch">
    <header class="shrink-0 h-16 shadow-md dark:shadow-neutral-900 flex items-center px-5">
      <a aria-label="" href="#">
        <img src="/assets/logo.svg" alt="logo" aria-hidden="true" />
      </a>
    </header>
    <div class="grow overflow-auto relative flex flex-col items-stretch py-4">
      <app-home></app-home>
    </div>
  </div>
  `,
  styleUrls: [],
})
export class AppComponent {
  title = 'homes';
}
