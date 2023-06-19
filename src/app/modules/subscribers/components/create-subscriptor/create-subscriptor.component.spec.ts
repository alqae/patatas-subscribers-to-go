import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubscriptorComponent } from './create-subscriptor.component';

describe('CreateSubscriptorComponent', () => {
  let component: CreateSubscriptorComponent;
  let fixture: ComponentFixture<CreateSubscriptorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSubscriptorComponent]
    });
    fixture = TestBed.createComponent(CreateSubscriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
