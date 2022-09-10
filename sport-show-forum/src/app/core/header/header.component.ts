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

  ngOnInit(): void {
  }
  toggleEditable(event: any) {
    let output = document.querySelector<HTMLElement>('.sidebarIconToggle')
    if ( event.target.checked ) {
        this.contentEditable = true;
        
        if (output) output.style.display = 'block';
   }
   else{
    if (output) output.style.display = 'none';
   }
   
}

}
