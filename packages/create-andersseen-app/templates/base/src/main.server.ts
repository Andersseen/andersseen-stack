import '@angular/platform-server/init';
import { render } from '@analogjs/router/server';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

export default render(AppComponent, appConfig);
