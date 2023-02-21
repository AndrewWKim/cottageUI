import { Directive, ElementRef, OnDestroy } from '@angular/core';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';
import { ValidatorPatterns } from '../validation/validator-patterns';

@Directive({
  selector: '[appMaskPassport]'
})
export class PassportMaskDirective implements OnDestroy {

  maskedInputController;

  constructor(private element: ElementRef) {
    this.maskedInputController = textMask.maskInput({
      inputElement: this.element.nativeElement,
      mask: ValidatorPatterns.passportMask
    });
  }

  ngOnDestroy() {
    this.maskedInputController.destroy();
  }
}