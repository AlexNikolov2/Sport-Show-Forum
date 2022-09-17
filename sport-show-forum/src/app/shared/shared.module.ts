import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostParticleComponent } from './post-particle/post-particle.component';
import { ShortenPipe } from './pipes/shorten.pipe';



@NgModule({
  declarations: [
    PostParticleComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PostParticleComponent
  ]
})
export class SharedModule { }
