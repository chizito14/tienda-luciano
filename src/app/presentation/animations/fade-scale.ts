import { animate, style, transition, trigger } from "@angular/animations";

export const fadeScale = trigger('fadeScale', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.9)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ])
]);