import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-en',
  templateUrl: './en.component.html',
  styleUrls: ['./en.component.sass']
})
export class EnComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {

  }
  getWidth(){
    var width = document.getElementById("termsDocumentEn")?.clientWidth;

    return width + "px";
  }
  getWidth50(){
    var width = document.getElementById("termsDocumentEn")!.clientWidth;
    var resp = (width * 50) / 100;
    return resp + "px";
  }
}
