import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cumpleanos } from './cumpleanos';

describe('Cumpleanos', () => {
  let component: Cumpleanos;
  let fixture: ComponentFixture<Cumpleanos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cumpleanos],
    }).compileComponents();

    fixture = TestBed.createComponent(Cumpleanos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
