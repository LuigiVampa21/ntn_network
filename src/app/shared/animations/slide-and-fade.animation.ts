import { animate, animation, sequence, style } from '@angular/animations';

export const slideAndFadeAnimation = animation([

style({
    transform: 'translateX(-100%)',
    opacity: 0,
    backgroundColor: '{{ startColor }}',
  }),
  animate('{{ time }} ease-out', style({
    transform:'translateX(0)',
    opacity: 1,
    backgroundColor:'white'
  })),
])
