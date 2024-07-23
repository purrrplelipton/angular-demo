import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { DetailsComponent } from '@app/details/details.component';
import { HomeComponent } from '@app/home/home.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      [
        {
          path: "",
          component: HomeComponent,
          title: "Home Page"
        },
        {
          path: "details/:id",
          component: DetailsComponent,
          title: "Details Page"
        },
      ]
    )
  ]
}).catch((err) => console.error(err));
