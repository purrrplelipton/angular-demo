import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HousingLocation } from '@app/housing-location/housing-location';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matPlace } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent],
  providers: [provideIcons({ matPlace })],
  template: `
    <a
      class="bg-indigo-50 dark:bg-indigo-600 focus:scale-[1.01] hover:scale-[1.01] active:scale-[0.99] transition-transform will-change-transform rounded-3xl overflow-hidden flex flex-col items-stretch"
      routerLink="details/{{ housingLocation.id }}"
    >
      <img
        class="rounded-t-[inherit] aspect-video object-cover object-center"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
      />
      <div class="m-5">
        <p
          class="text-indigo-600 dark:text-white text-xl leading-none font-bold mb-1"
        >{{ housingLocation.name }}</p>
        <div class="flex items-end gap-0.5 dark:text-indigo-200">
          <ng-icon name="matPlace" />
          <span class="text-sm leading-none">{{ housingLocation.city }}, {{ housingLocation.state }}</span>
        </div>
      </div>
    </a>
  `,
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
