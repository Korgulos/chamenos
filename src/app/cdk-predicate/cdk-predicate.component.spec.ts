import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkPredicateComponent } from './cdk-predicate.component';

describe('CdkPredicateComponent', () => {
  let component: CdkPredicateComponent;
  let fixture: ComponentFixture<CdkPredicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdkPredicateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdkPredicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
