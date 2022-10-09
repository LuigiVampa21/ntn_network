import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit {

    @Input() highlight ='';

  constructor(private el: ElementRef,
              private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setBackgroundColor(this.highlight);
  }

  setBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.setBackgroundColor('lightblue')
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.setBackgroundColor(this.highlight)
  }
}