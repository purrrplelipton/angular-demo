import { CommonModule } from "@angular/common";
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { HousingLocation } from '@app/housing-location/housing-location';
import { HousingLocationComponent } from '@app/housing-location/housing-location.component';
import { HousingService } from "@app/housing.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, ReactiveFormsModule],
  template: `
  <div class="w-[90%] mx-auto flex mb-4">
    <input class="bg-black/5 dark:bg-white/5 w-full sm:max-w-80 mx-auto sm:mx-0 sm:ml-auto border border-indigo-600/50 outline-none rounded-lg p-2.5" type="search" placeholder="Filter by city" 
        [formControl]="filterInput" />
  </div>
  <div class="grow overflow-auto">
    <div class="w-[90%] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </div>
  </div>
  `,
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = []
  housingService: HousingService = inject(HousingService)
  filterInput = new FormControl('')
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      })
      .catch(() => { })

    this.filterInput.valueChanges.subscribe(filterValue => this.filterResults(filterValue));
  }

  filterResults(text: string | null) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    } else {
      this.filteredLocationList = this.housingLocationList.filter(
        housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
      );
    }
  }
}
