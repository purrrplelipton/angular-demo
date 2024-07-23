import { Injectable } from '@angular/core';
import { HousingLocation } from '@app/housing-location/housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  API_URL = `http://localhost:3000`

  constructor() { }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const response = await fetch(`${this.API_URL}/locations`);
    return await response.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const res = await fetch(`${this.API_URL}/locations/${id}`);
    return await res.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log({ firstName, lastName, email })
  }
}
