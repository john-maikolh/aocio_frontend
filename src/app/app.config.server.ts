import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { provideHttpClient } from '@angular/common/http';  // <-- importar
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    provideHttpClient(),  // <-- agregar aquí también
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
