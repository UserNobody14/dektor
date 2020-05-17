import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-private-recaptcha',
  templateUrl: './private-recaptcha.component.html',
  styleUrls: ['./private-recaptcha.component.css']
})
export class PrivateRecaptchaComponent implements OnInit {

  @Input()
  resolvedString: string = null;
  @Output()
  resolvedStringChange = new EventEmitter<string>();
  @Input()
  isCaptchaSolved: boolean = false;
  @Output()
  isCaptchaSolvedChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
