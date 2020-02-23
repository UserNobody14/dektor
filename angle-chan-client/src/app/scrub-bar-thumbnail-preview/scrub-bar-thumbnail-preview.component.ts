import { Component, OnInit, Input, ElementRef, HostListener, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-scrub-bar-thumbnail-preview',
  templateUrl: './scrub-bar-thumbnail-preview.component.html',
  styleUrls: ['./scrub-bar-thumbnail-preview.component.css']
})
export class ScrubBarThumbnailPreviewComponent implements OnInit {

  @Input()
  url: string;

  @Input()
  height: number;
  @Input()
  width: number;
  @Input()
  column: number;
  @Input()
  number: number;


  showThumbnail = false;
  // gradientTop: number;
  localeLeft: number;
  totalWidth: number;
  positionString = '';
  thumbnailPositionLeft = '';

  @ViewChild('bar', {static: false})
  public el: ElementRef<HTMLElement>;

  constructor(private elem: ElementRef<HTMLElement>, private renderer2: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showThumbnail = true;
    // console.log('beginning of err?');
    this.totalWidth = this.el.nativeElement.getBoundingClientRect().width;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.showThumbnail = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // console.log('beginning of err2?');
    this.localeLeft = event.pageX - this.el.nativeElement.offsetLeft;
    this.positionString = this.processItems();
    // console.log('appScrub: ' + this.url, 'locale: ' + this.localeLeft, 'totalWidth= ' + this.totalWidth);
    // this.gradientTop = event.pageY - this.el.nativeElement.offsetTop;
  }
  processItems() {
    const perWidth = this.totalWidth / this.number;
    const perIndex = Math.floor(this.localeLeft / perWidth);
    const yIndex = Math.ceil(perIndex / this.column) - 1;
    const xIndex = perIndex % this.column || this.column - 1;
    if (this.localeLeft <= this.width / 2) {
      this.thumbnailPositionLeft = 0 + 'px';
    } else if (this.localeLeft > this.totalWidth - this.width / 2) {
      this.thumbnailPositionLeft = `${this.totalWidth - this.width}px`;
    } else {
      this.thumbnailPositionLeft = `${this.localeLeft - this.width / 2}px`;
    }
    return `-${xIndex * this.width}px -${yIndex * this.height}px`;
  }

  // first: make it just listen for when hovered & log total width &
  // curr location.

  ngOnInit() {
    // this.renderer2.setStyle(this.elem, 'height', '100%');
    // this.renderer2.setStyle(this.elem, 'width', '100%');
  }

}
