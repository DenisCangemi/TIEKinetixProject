import { Component, OnInit } from '@angular/core';
import { DatasService } from '../services/datas.service';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  books=[];
  authors=[];

  constructor(datasService:DatasService, private router: Router) {
    //Call service to fecth book from json file
    datasService.getBooks().subscribe(datas => {
      //Save in local variable
      this.books=datas;
    })
  }

  goBookDetails(id:number){
    //Navigate to book details page
    this.router.navigate(['/book', id]);
  }

  delete(id:number){
    //Find the book and delete it
    for(let i=0;i<this.books.length;i++){
      if(this.books[i].id==id){
        this.books.splice(i,1);
      }
    }
  }

  ngOnInit() {
  }

}
