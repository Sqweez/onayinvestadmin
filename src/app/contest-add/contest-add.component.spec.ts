import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestAddComponent } from './contest-add.component';

describe('ContestAddComponent', () => {
  let component: ContestAddComponent;
  let fixture: ComponentFixture<ContestAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
