import { CommonModule } from "@angular/common";
import { Component, inject } from '@angular/core';
import { HousingLocation } from '@app/housing-location/housing-location';
import { HousingLocationComponent } from '@app/housing-location/housing-location.component';
import { HousingService } from "@app/housing.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <div class="w-[90%] mx-auto flex mb-4">
    <input class="w-full max-w-80 mx-auto sm:mx-0 sm:ml-auto border border-indigo-600 rounded-lg p-2.5" type="search" placeholder="Filter by city" />
  </div>
  <div class="grow overflow-auto">
    <div class="w-[90%] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
      <app-housing-location
        *ngFor="let housingLocation of housingLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </div>
  </div>
  `,
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = []
  housingService: HousingService = inject(HousingService)

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations()
  }
}
