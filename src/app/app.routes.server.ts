import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender }, // SSG
  { path: 'about', renderMode: RenderMode.Prerender }, // SSG
  { path: 'profile', renderMode: RenderMode.Server }, // SSR
  { path: '**', renderMode: RenderMode.Server }, // FALLBACK SSR
];
