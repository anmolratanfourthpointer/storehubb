import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputedComponent } from './disputed.component';

describe('DisputedComponent', () => {
  let component: DisputedComponent;
  let fixture: ComponentFixture<DisputedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisputedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisputedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
