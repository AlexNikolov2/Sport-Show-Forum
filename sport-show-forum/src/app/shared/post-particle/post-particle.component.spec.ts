import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostParticleComponent } from './post-particle.component';

describe('PostParticleComponent', () => {
  let component: PostParticleComponent;
  let fixture: ComponentFixture<PostParticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostParticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostParticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
