import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Country } from '../countries/country';
import { CountriesService } from './../countries/countries.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup | any;

  genders = ['male', 'female']

  countries: Country[] = []

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {

    this.countriesService.getCountries()
      .subscribe(
        (response) => {
          this.countries = response;
          console.log(this.countries)
        }
      )


    this.signUpForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      mobile: new FormControl(null),
      dateOfBirth: new FormControl(null),
      gender: new FormControl(null),
      countryID: new FormControl(null)

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
    this.signUpForm.patchValue({
      firstName: 'Zartab',
      lastName: 'Nakhwa',
      email: 'zartab@codewithz.com',

    })
    // 3.reset
  }

}
