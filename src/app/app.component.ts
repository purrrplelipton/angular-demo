import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  providers: [],
  template: `
  <header class="shrink-0 h-16 shadow-md dark:shadow-neutral-900 flex items-center px-5">
    <a aria-label="" routerLink="/">
      <img src="assets/svgs/logo.svg" alt="logo" aria-hidden="true" />
    </a>
  </header>
  <div class="grow overflow-auto relative flex flex-col items-stretch py-4">
    <router-outlet />
  </div>
  `,
  styleUrls: [],
})
export class AppComponent {
  title = 'homes';
}
