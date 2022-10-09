import { animate, animation, sequence, style } from '@angular/animations';

export const flashAnimation = animation([
  sequence([
    animate('{{ time }}', style({
      'background-color': '{{ flasColor }}'
    })),
    animate('{{ time }}', style({
      'background-color': 'white'
    })),
  ]),
])