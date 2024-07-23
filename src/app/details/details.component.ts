import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '@app/housing-location/housing-location';
import { HousingService } from '@app/housing.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matCheckBox, matCheckBoxOutlineBlank, matPlace } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ReactiveFormsModule],
  providers: [provideIcons({ matPlace, matCheckBox, matCheckBoxOutlineBlank })],
  template: `
    <div class="grow flex flex-col lg:flex-row items-stretch lg:items-center w-[90%] mx-auto gap-4">
      <label for="viewFullPhoto" class="relative lg:w-1/2 aspect-video rounded-3xl overflow-hidden shadow-md shadow-[#0001] dark:shadow-[#FFF1]">
        <img class="size-full rounded-[inherit] object-cover object-center" src="{{ 'https://angular.io/assets/images/tutorials/faa/' + housingLocation?.photo }}" alt="Exterior photo of {{ housingLocation?.name }}" />
        <input type="checkbox" id="viewFullPhoto" class="sr-only peer" />
        <div class="peer-checked:translate-y-full peer-checked:opacity-0 transition-all will-change-auto duration-300 delay-75 absolute inset-x-0 bottom-0 text-white bg-gradient-to-t from-[#0009] to-transparent rounded-b-[inherit] pt-3.5 px-2 pb-2.5 text-2xl leading-none font-bold">
          <p>{{ housingLocation?.name }}</p>
          <div class="flex items-end gap-0.5">
            <ng-icon class="text-indigo-500" name="matPlace" />
            <span class="text-lg leading-none font-medium">{{ housingLocation?.city }}, {{ housingLocation?.state }}</span>
          </div>
        </div>
      </label>
      <div class="grow relative lg:static lg:grow-0 lg:w-1/2 pb-16 lg:pb-0">
        <div class="text-xl leading-snug">
          <p class="text-indigo-600 dark:text-indigo-400">About Housing Location</p>
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
        <form class="mt-4" [formGroup]="applyForm" (submit)="submitApplication()">
          <div class="input-field">
            <input autocomplete="off" id="first-name" type="text" formControlName="firstName" />
            <label for="first-name" [class.floating]="applyForm.get('firstName')?.value">First Name</label>
          </div>
          <div class="input-field">
            <input autocomplete="off" id="last-name" type="text" formControlName="lastName" />
            <label for="last-name" [class.floating]="applyForm.get('lastName')?.value">Last Name</label>
          </div>
          <div class="input-field">
            <input autocomplete="off" id="email" type="text" formControlName="email" />
            <label for="email" [class.floating]="applyForm.get('email')?.value">Email</label>
          </div>
          <button type="submit" class="outline-none absolute inset-x-0 bottom-0 rounded-lg text-white bg-indigo-600 leading-none p-4 focus:scale-[1.01] hover:scale-[1.01] active:scale-[0.99] transition-transform will-change-transform lg:static lg:mt-4" [class.disabled]="!housingLocation || housingLocation.availableUnits === 0">Lease</button>
        </form>
      </div>
    </div>
  `,
  styles: `
    .input-field {
      @apply relative flex;
      input {
        @apply grow outline-none bg-black/5 dark:bg-white/5 p-3 rounded-md;
        & + label {
          @apply absolute bottom-1/2 left-3 translate-y-1/2 text-sm leading-none font-semibold transition-all will-change-auto origin-left opacity-30 pointer-events-none select-none opacity-60;
          &.floating {
            @apply opacity-40 left-1.5 scale-75 -translate-y-1/2;
          }
        }
      }
      &:not(:first-of-type, :last-of-type) {
        @apply my-3;
      }
    }
    button[type="submit"].disabled {
      @apply transform-none opacity-60 cursor-default;
    }
  `
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id'])
    this.housingService.getHousingLocationById(housingLocationId)
      .then((housingLocation) => this.housingLocation = housingLocation)
      .catch(() => { })
  }
  submitApplication() {
    if (!this.housingLocation || this.housingLocation.availableUnits === 0) return;
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    )
  }
}
