import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideTranslateService } from '@ngx-translate/core/public-api';

export const appConfig: ApplicationConfig = {
  providers:


  [provideRouter(routes,
    withViewTransitions({
      skipInitialTransition: true, // Puedes ajustar esto según tus necesidades
    }),

  )]
}; 
