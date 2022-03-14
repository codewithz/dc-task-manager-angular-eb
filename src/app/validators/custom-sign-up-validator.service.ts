import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomSignUpValidatorService {

  constructor() { }

  minimumAgeValidator(minAge: number): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;//Valid | Date of Birth is null
      }

      let today = new Date();
      let dateOfBirth = new Date(control.value);
      const differenceInMilliSeconds = Math.abs(today.getTime() - dateOfBirth.getTime());
      const differenceInYears = (differenceInMilliSeconds / (1000 * 60 * 60 * 24)) / 365.25;

      if (differenceInYears >= minAge) {
        return null; //Date of Birth is valid
      }
      else {
        return { minAge: { valid: false } };// Invalid
      }
    }

  }

  comparePasswordValidator(controlToValidate: string,
    controlToCompare: string): ValidatorFn {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const passwordControl = formGroup.get(controlToCompare) as FormControl;
      const confirmPasswordControl = formGroup.get(controlToValidate) as FormControl;

      if (!confirmPasswordControl.value) {
        return null; // Valid | Confirm password is null
      }

      if (passwordControl.value == confirmPasswordControl.value) {
        return null;
      }
      else {
        confirmPasswordControl.setErrors({
          comparePassword: { valid: false }
        })

        return { comparePassword: { valid: false } };
      }
    }
  }
}
