import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FormField } from './types/form-builder';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  /** Inputs / Outputs */
  @Input() formFields: Array<FormField>;
  @Output() controlsEventEmitter: EventEmitter<{
    [key: string]: AbstractControl;
  }>;

  /** Props */
  private readonly _formGroup: FormGroup;

  constructor(private readonly _router: Router) {
    this._formGroup = new FormGroup({});
    this.controlsEventEmitter = new EventEmitter();
  }

  ngOnInit() {
    this._initializeFormGroup();
  }

  public get formGroup(): FormGroup {
    return this._formGroup;
  }

  private _initializeFormGroup(): void {
    for (const formField of this.formFields) {
      const validators = [];

      for (const rule of formField.rules) {
        validators.push(Validators[rule]);
      }

      const formControl = new FormControl('', Validators.compose(validators));

      this._formGroup.addControl(formField.controlName, formControl);
    }
  }

  public checkFormErrors(): boolean {
    const controls = this._formGroup.controls;

    for (const formField of this.formFields) {
      const touchControl = controls[formField.controlName].touched;

      if (touchControl === true) {
        const passwordControl = controls['password'];
        const matchingPasswordControl = controls['confirmPassword'];

        if (passwordControl && matchingPasswordControl) {
          if (passwordControl.value !== matchingPasswordControl.value) {
            return true;
          }
        }

        const errorsControl = controls[formField.controlName].errors;

        if (errorsControl !== null) {
          return true;
        }
      }
    }

    return false;
  }

  public onSubmit(): void {
    const controls = this._formGroup.controls;

    return this.controlsEventEmitter.emit(controls);
  }

  public trackEditList(index, item) {
    return index;
  }

  public checkRoutePresence(routeURL: string): boolean {
    if (routeURL !== this._router.url) {
      return true;
    }

    return false;
  }
}
