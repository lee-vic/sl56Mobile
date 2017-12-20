import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

/**
 * Generated class for the FocuserDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[focuser]' // Attribute selector
})
export class FocuserDirective  implements OnInit{
  ngOnInit(): void {
    const searchInput = this.elementRef.nativeElement.querySelector('input');
    setTimeout(() => {
      //delay required or ionic styling gets finicky
      this.renderer.invokeElementMethod(searchInput, 'focus', []);
    }, 0);
  }

  constructor(public renderer: Renderer, public elementRef: ElementRef) {
    console.log('Hello FocuserDirective Directive');
  }

}
