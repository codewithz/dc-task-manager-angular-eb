import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appTeamSizeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: TeamSizeValidatorDirective,
    multi: true
  }]
})
export class TeamSizeValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {

    const currentValue = control.value;

    const isValid = currentValue % 5 == 0;

    if (isValid) {
      return null;
    }
    else {
      return { divisible: { valid: false } }
    }

  }

}
