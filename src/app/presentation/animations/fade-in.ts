import { animate, animation, style } from "@angular/animations";

export const fadeIn = animation([
  style({ opacity: 0 }),
  animate('{{duration}} ease-out', style({ opacity: 1 }))
], { params: { duration: '300ms' } });

export const fadeOut = animation([
  animate('{{duration}} ease-in', style({ opacity: 0 }))
], { params: { duration: '300ms' } });

export const slideInDown = animation([
  style({ transform: 'translateY(-100%)', opacity: 0 }),
  animate('{{duration}} ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
], { params: { duration: '400ms' } });

export const scaleIn = animation([
  style({ transform: 'scale(0.8)', opacity: 0 }),
  animate('{{duration}} ease-out', style({ transform: 'scale(1)', opacity: 1 }))
], { params: { duration: '300ms' } });

export const shake = animation([
  animate('100ms', style({ transform: 'translateX(-10px)' })),
  animate('100ms', style({ transform: 'translateX(10px)' })),
  animate('100ms', style({ transform: 'translateX(-10px)' })),
  animate('100ms', style({ transform: 'translateX(10px)' })),
  animate('100ms', style({ transform: 'translateX(0)' })),
]);
