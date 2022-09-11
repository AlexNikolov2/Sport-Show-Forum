import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostParticleComponent } from './post-particle/post-particle.component';



@NgModule({
  declarations: [
    PostParticleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PostParticleComponent
  ]
})
export class SharedModule { }
