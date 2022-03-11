import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectsService } from './../projects/projects.service';

@Directive({
  selector: '[appProjectIdUniqueValidator]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ProjectIdUniqueValidatorDirective,
    multi: true
  }]
})
export class ProjectIdUniqueValidatorDirective implements AsyncValidator {

  constructor(private projectService: ProjectsService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const projectId = control.value;

    return this.projectService.getProjectById(projectId)
      .pipe(
        map(
          (existingProject) => {
            if (existingProject != null) {
              return { uniqueProjectId: { valid: false } }
            }
            else {
              return null;
            }
          }
        )
      )

  }

}
