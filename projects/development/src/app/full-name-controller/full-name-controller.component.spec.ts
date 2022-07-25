import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullNameControllerComponent } from './full-name-controller.component';

describe('FullNameControllerComponent', () => {
  let component: FullNameControllerComponent;
  let fixture: ComponentFixture<FullNameControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullNameControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullNameControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
