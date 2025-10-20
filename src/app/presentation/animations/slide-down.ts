import { animate, style, transition, trigger } from "@angular/animations";

export function slideDown(duration: string = '500ms') {
  return trigger('slideDown', [
    transition(':enter', [
      style({ transform: 'translateY(-30px)', opacity: 0 }),
      animate(duration, style({ transform: 'translateY(0)', opacity: 1 }))
    ])
  ]);
}
