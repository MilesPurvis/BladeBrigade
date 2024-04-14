/*
Project: Blade Brigade - Final Project
    Miles Purvis & Stefan Kobetich

    Revision History:
      Created 2024-03-31
*/
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
