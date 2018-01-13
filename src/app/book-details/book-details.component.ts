import { Component, OnInit } from '@angular/core';
import { DatasService } from '../services/datas.service';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book;

  constructor(datasService:DatasService,private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      //Get the selected book id from home
      let id = +params['id'];
      //Call service to fetch books
      datasService.getBooks().subscribe(datas => {
        for(let i=0;i<datas.length;i++){
          //If book has been found then exit without wasting memory
          if(datas[i].id==id){
            this.book=datas[i];
            break;
          }
        }
      });
  });
  }

  ngOnInit() {
  }

}
