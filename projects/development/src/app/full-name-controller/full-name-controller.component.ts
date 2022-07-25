import {Component, Injector, OnInit} from '@angular/core';
import {MatFormFieldControl} from "@angular/material/form-field";
import {MatFormFieldAdapter} from "../../../../forms/src/lib/MatFormFieldAdapter/MatFormFieldAdapter";
import {FormControlAdapter} from "../../../../forms/src/lib/FormControlAdapater/FormControlAdapter";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-full-name-controller',
  templateUrl: './full-name-controller.component.html',
  styleUrls: ['./full-name-controller.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: FullNameControllerComponent,
      multi: true
    }
  ]

})
export class FullNameControllerComponent extends MatFormFieldAdapter<any> implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly injector: Injector
  ) {
    super(
      FullNameControllerComponent.name,
      // todo(medium): create a factory for this
      new FormControlAdapter(formBuilder.group({first: 'lol', last: ''})),
      injector
    )
  }

  ngOnInit(): void {
  }

}
