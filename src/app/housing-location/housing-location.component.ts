import { Component, Input } from '@angular/core';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [],
  template: `
    <a class="bg-indigo-50 focus:scale-[1.025] hover:scale-[1.025] active:scale-[0.975] transition-all will-change-auto duration-200 rounded-3xl overflow-hidden flex flex-col items-stretch" href="/{{ housingLocation.id }}">
      <img class="rounded-t-[inherit] aspect-video object-cover object-center" [src]="housingLocation.photo" alt="Exterior photo of {{ housingLocation.name }}" />
      <div class="m-5">
        <p class="text-indigo-600 text-xl leading-none font-bold mb-1">{{ housingLocation.name }}</p>
        <span class="text-sm leading-none">{{ housingLocation.city }}, {{ housingLocation.state }}</span>
      </div>
    </a>
  `,
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
