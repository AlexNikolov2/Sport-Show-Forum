import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  contentEditable!: boolean;

  constructor() { }

  
  ngOnInit() {
    if(window.screen.width.toString() >= '720px'){
      let output = document.querySelector<HTMLElement>('.sidebarIconToggle');
      if (output) {output.style.display = 'flex';}
    }
  }
  toggleEditable(event: any) {
    let output = document.querySelector<HTMLElement>('.sidebarIconToggle')
    let header = document.querySelector('header');
    let li = document.querySelectorAll('li');

    if(window.screen.width)

    if ( event.target.checked ) {
        this.contentEditable = true;
        
        if (output) {output.style.display = 'flex';
      output.style.flexDirection = 'column';
      output.style.width = '100%';
    }
        if(header) {header.style.display = 'flex'; 
        header.style.flexDirection = 'column';
      header.style.justifyContent = 'flex-start';
    header.style.alignItems = 'flex-start'}
    if(li){
      li.forEach(l => l.style.border = '1px solid lightgreen')
    }
   }
   else{
    if (output) output.style.display = 'none';
   }
   
}

}
