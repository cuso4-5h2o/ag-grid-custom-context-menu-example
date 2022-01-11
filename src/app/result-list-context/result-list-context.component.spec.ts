import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultListContextComponent } from './result-list-context.component';

describe('ResultListContextComponent', () => {
  let component: ResultListContextComponent;
  let fixture: ComponentFixture<ResultListContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultListContextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
