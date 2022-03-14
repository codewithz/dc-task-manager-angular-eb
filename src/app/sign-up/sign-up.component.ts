import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../countries/country';
import { CountriesService } from './../countries/countries.service';
import { CustomSignUpValidatorService } from './../validators/custom-sign-up-validator.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup | any;

  genders = ['male', 'female']

  countries: Country[] = []

  constructor(private countriesService: CountriesService, 
    private customValidator: CustomSignUpValidatorService) { }

  ngOnInit(): void {

    this.countriesService.getCountries()
      .subscribe(
        (response) => {
          this.countries = response;
          console.log(this.countries)
        }
      )


    this.signUpForm = new FormGroup({
      personalDetails: new FormGroup({

        firstName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      }),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobile: new FormControl(null,
        [Validators.required, Validators.pattern(/^[789]\d{9}$/)]),
      dateOfBirth: new FormControl(null, [Validators.required,
      this.customValidator.minimumAgeValidator(18)]),
      gender: new FormControl(null, [Validators.required]),
      countryID: new FormControl(null, [Validators.required]),
      skills: new FormArray([])

    })

    this.signUpForm.valueChanges.subscribe(
      (values: any) => {
        // console.log(values)
      }
    )
  }

  onCreateAccountClicked() {
    // 1. setValue
    // this.signUpForm.setValue({
    //   firstName: 'Zartab',
    //   lastName: 'Nakhwa',
    //   email: 'zartab@codewithz.com',
    //   mobile: '7715036251',
    //   dateOfBirth: '1990-12-13',
    //   gender: 'male',
    //   countryID: 300
    // })

    // 2.patchValue
    // this.signUpForm.patchValue({
    //   firstName: 'Zartab',
    //   lastName: 'Nakhwa',
    //   email: 'zartab@codewithz.com',

    // })
    // 3.reset
    this.signUpForm.reset();
  }

  onAddSkillClicked() {

    const skillFormGroup = new FormGroup({
      skillName: new FormControl(null, [Validators.required]),
      level: new FormControl(null, [Validators.required]),
    })

    let skillsFormArray = <FormArray>this.signUpForm.get('skills');

    skillsFormArray.push(skillFormGroup);
  }

  onSkillRemove(index: number) {
    let skillsFormArray = <FormArray>this.signUpForm.get('skills');
    skillsFormArray.removeAt(index)
  }


}
