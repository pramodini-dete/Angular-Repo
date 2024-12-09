import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { PostModule } from './post/post.module'
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { PostService } from './post/post.service';

export const appConfig: ApplicationConfig = {
  providers: [
    PostService,
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient()
  ]
};
