import {ControlValueAccessor, FormGroup, NgControl} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {Directive, OnDestroy} from "@angular/core";

@Directive()
export class FormControlAdapter<T extends { [key: string]: any}> implements ControlValueAccessor, OnDestroy {
  protected subscribeAll: Subject<null>;
  public ngControl!: NgControl;

  public get form(): FormGroup<T> {
    return this._form;
  }

  protected set form(newForm: FormGroup) {
    this._form = newForm;
    this.callRegisteredFunctions();
  }

  public touched = false;
  private onChange = (value: object) => {
  };
  private onTouched = () => {
  };

  constructor(
    protected _form: FormGroup<T>,
    ngControl: NgControl
  ) {
    const setNgControlValueAccessor = () => {
      this.ngControl = ngControl;
      this.ngControl.valueAccessor = this;
    }

    setNgControlValueAccessor();
    this.subscribeAll = new Subject<null>();
    this.callRegisteredFunctions();
  }

  private callRegisteredFunctions(): void {
    this.form.valueChanges.pipe(takeUntil(this.subscribeAll)).subscribe((value) => {
      this.onChange(value);
      this.markAsTouched();
    })
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  registerOnChange(callbackFunction: () => never): void {
    this.onChange = callbackFunction;
  }

  registerOnTouched(callbackFunction: () => never): void {
    this.onTouched = callbackFunction;
  }

  writeValue(value: object): void {
    this.form.patchValue(value || {});
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  ngOnDestroy(): void {
    this.subscribeAll.next(null);
    this.subscribeAll.complete();
  };
}
