import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '@app/housing-location/housing-location';
import { HousingService } from '@app/housing.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matCheckBox, matCheckBoxOutlineBlank, matPlace } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ matPlace, matCheckBox, matCheckBoxOutlineBlank })],
  template: `
    <div class="grow flex flex-col lg:flex-row items-stretch lg:items-start w-[90%] mx-auto gap-4 lg:gap-3">
      <img class="lg:w-1/2 aspect-video rounded-3xl object-cover object-center shadow-md shadow-[#0001] dark:shadow-[#FFF1]" src="{{ housingLocation?.photo }}" alt="Exterior photo of {{ housingLocation?.name }}" />
      <div class="grow relative lg:static lg:grow-0 lg:w-1/2 pb-16">
        <div class="text-2xl leading-tight font-bold">
          <p>{{ housingLocation?.name }}</p>
          <div class="flex items-end gap-0.5 mt-2">
            <ng-icon class="text-indigo-600" name="matPlace" />
            <span class="text-lg leading-none font-medium">{{ housingLocation?.city }}, {{ housingLocation?.state }}</span>
          </div>
        </div>
        <div class="text-xl leading-snug my-4">
          <p class="text-indigo-400">About Housing Location</p>
          <ul class="mt-2 text-sm leading-normal *:flex *:items-center *:gap-1.5 last:*:*:text-lg *:leading-none">
            <li>
              <span>Available Units</span>
              <span>{{ housingLocation?.availableUnits }}</span>
            </li>
            <li>
              <span>WiFi</span>
              <ng-icon name="matCheckBox{{ !housingLocation?.wifi ? 'OutlineBlank' : '' }}" />
            </li>
            <li>
              <span>Laundry Services</span>
              <ng-icon name="matCheckBox{{ !housingLocation?.laundry ? 'OutlineBlank' : '' }}" />
            </li>
          </ul>
        </div>
        <button type="button" class="outline-none absolute inset-x-0 bottom-0 rounded-lg text-white bg-indigo-600 leading-none p-4 focus:scale-[1.01] hover:scale-[1.01] active:scale-[0.99] transition-transform will-change-transform md:static">Lease</button>
      </div>
    </div>
  `
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id'])
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId)
  }
}
