// touch-scale-animation.directive.ts

import { Directive, ElementRef, HostListener } from '@angular/core';
import { TouchGestureEventData } from "@nativescript/core/ui/gestures";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Directive({
  selector: '[appTouchScaleAnimation]'
})
export class TouchScaleAnimationDirective {

  private element: ElementRef;
  private currentAnimation;

  constructor(el: ElementRef) {
      this.element = el;
  }

  @HostListener('touch', ['$event'])
  onTouch(args: TouchGestureEventData): void {
      if (args.action === 'down') {
          this.animatePressed();
          console.log('down')
      } else if (args.action === 'up') {
          this.animateReleased();
      }
  }

  private animatePressed(): void {
      if (this.currentAnimation) {
          this.currentAnimation.cancel();
      }
      this.currentAnimation = this.element.nativeElement.animate({
          scale: { x: 0.98, y: 0.98 },
          opacity: 0.8,
          curve: AnimationCurve.easeIn,
          duration: 100
      }).catch(e => {});
  }

  private animateReleased(): void {
      if (this.currentAnimation) {
          this.currentAnimation.cancel();
      }
      this.currentAnimation = this.element.nativeElement.animate({
          scale: { x: 1, y: 1 },
          opacity: 1,
          curve: AnimationCurve.easeIn,
          duration: 100
      }).catch(e => {});
  }

}