import { trigger, transition, style, animate } from '@angular/animations';

export const fadeScale = trigger('fadeScale', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.9)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
  ])
]);

export const slideDown = trigger('slideDown', [
  transition(':enter', [
    style({ transform: 'translateY(-20px)', opacity: 0 }),
    animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ transform: 'translateY(-20px)', opacity: 0 }))
  ])
]);

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('250ms ease-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0 }))
  ])
]);

export const expandCollapse = trigger('expandCollapse', [
  transition(':enter', [
    style({ height: 0, opacity: 0 }),
    animate('300ms ease-out', style({ height: '*', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ height: 0, opacity: 0 }))
  ])
]);