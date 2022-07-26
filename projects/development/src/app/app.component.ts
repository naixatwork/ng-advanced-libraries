import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      fullName: [{value: null, disabled: true}, Validators.required],
    })
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(console.log)

    setTimeout(() => {
      this.formGroup.controls['fullName'].enable();
    }, 2000)
  }

}
