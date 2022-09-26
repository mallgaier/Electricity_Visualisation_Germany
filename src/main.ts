import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Highchart 1
import './polyfills';
import {
  bootstrapApplication
} from '@angular/platform-browser';
import {
  AppComponent
} from './app/app.component';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

if (environment.production) {
  enableProdMode();
}

// Highchart 2
bootstrapApplication(AppComponent);
