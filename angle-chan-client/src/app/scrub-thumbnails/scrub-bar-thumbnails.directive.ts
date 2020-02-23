import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrubBarThumbnails]'
})
export class ScrubBarThumbnailsDirective {

  @Input()
  appScrubBarThumbnails: string;

  showThumbnail = false;
  // gradientTop: number;
  localeLeft: number;
  totalWidth: number;

  constructor(public el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showThumbnail = true;
    this.totalWidth = this.el.nativeElement.getBoundingClientRect().width;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.showThumbnail = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.localeLeft = event.pageX - this.el.nativeElement.offsetLeft;
    console.log('appScrub: ' + this.appScrubBarThumbnails, 'locale: ' + this.localeLeft, 'totalWidth= ' + this.totalWidth);
    // this.gradientTop = event.pageY - this.el.nativeElement.offsetTop;
  }

  // first: make it just listen for when hovered & log total width &
  // curr location.

}
