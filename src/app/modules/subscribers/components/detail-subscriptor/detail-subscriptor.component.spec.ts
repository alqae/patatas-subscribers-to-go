import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSubscriberComponent } from './detail-subscriptor.component';

describe('DetailSubscriberComponent', () => {
  let component: DetailSubscriberComponent;
  let fixture: ComponentFixture<DetailSubscriberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailSubscriberComponent]
    });
    fixture = TestBed.createComponent(DetailSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
