
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { interFileInterceptor } from "./inter-file.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(),withInterceptors([interFileInterceptor])),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useValue: interFileInterceptor, // Corrected to use `useValue`
    //   multi: true
    // }
  ]
};