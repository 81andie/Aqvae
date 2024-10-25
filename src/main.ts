import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



const combinedProviders = [
  importProvidersFrom(HttpClientModule),
  ...(appConfig.providers || []) // Asegúrate de que sea un array
];

bootstrapApplication(AppComponent, {
  providers: combinedProviders
}).catch(err => console.error(err));
