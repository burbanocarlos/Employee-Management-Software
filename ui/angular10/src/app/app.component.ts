import { Component, OnInit} from '@angular/core';

import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  constructor(private service:SharedService){}
  title = 'angular10';

  public searchInput: string;
  public dictOne = this.service.getDepList();
  public programmingLanguages = [
    'Python','TypeScript','C','C++','Java',
    'Go','JavaScript','PHP','Ruby','Swift','Kotlin'
 ]
  
  // hey = this.service.getDepList().subscribe(data =>
  //     {this.programmingLanguages= data
  //     console.log(this.programmingLanguages);
  //    });

  
  
  
  
  

}
