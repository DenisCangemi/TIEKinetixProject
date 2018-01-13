import { Component, OnInit } from '@angular/core';
import { DatasService } from '../services/datas.service';
import { Book } from '../classes/book';
import { Author } from '../classes/author';
import { Chapter } from '../classes/chapter';


@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  books=[];
  authors=[];
  newBook:Book;
  submitted = false;
  titleerr=false;
  authorerr=false;
  puberr=false;
  isbnerr=false;
  editionerr=false;
  chapterserr=false;
  dateerr=false;
  authorid;
  chapter_index=0;
  chapters:Chapter[];
  success=false;

  constructor(datasService:DatasService) {
    //Init local book var
    this.newBook=new Book(0,'',new Author(0,"","",new Date(),""),"","","",null,[]);
    //Init chapters local var
    this.chapters=[new Chapter("",0,0)];
    //Call service to fecth authors array
    datasService.getAuthors().subscribe(datas => {
      this.authors=datas;
    });
    //Call service to fecth books array
    datasService.getBooks().subscribe(datas => {
      this.books=datas;
    });
  }


  //Add a new chapter to our book
  addChapter(){
    this.chapters.push(new Chapter("",0,0));
  }

  //Method called when user submit the form
  onSubmit() { 
    //Check if all the form input has been filled correctly.
    this.success=false;
    let anErrorOccured=false;
    //Check title
    if(this.newBook.title=="") {
      this.titleerr=true
      anErrorOccured=true;
    }
    else this.titleerr=false;
    //Check author
    if(this.authorid==null) {
      this.authorerr=true;
      anErrorOccured=true;
    }
    else {
      this.newBook.author=this.authors[this.authorid];
    }
    //Check publisher
    if(this.newBook.publisher=="") {
      this.puberr=true;
      anErrorOccured=true;
    }
    else this.puberr=false;
    //Check edition
    if(this.newBook.edition=="") {
      this.editionerr=true;
      anErrorOccured=true;
    }
    else this.editionerr=false;
    //Check ISBN
    if(this.newBook.ISBN=="") {
      this.isbnerr=true;
      anErrorOccured=true;
    }
    else this.isbnerr=false;
    //Check Date
    if(this.newBook.publishingDate==null) {
      this.dateerr=true;
      anErrorOccured=true;
    }
    else this.dateerr=false;

    this.chapterserr=false;
    //Check chapters
    for(let i=0;i<this.chapters.length;i++){
      if(this.chapters[i].title=="" || this.chapters[i].startPage==0 || this.chapters[i].numberOfPages==0){
        this.chapterserr=true;
        anErrorOccured=true;
        break;
      }
    }
    if(this.chapterserr==false){
      
      this.newBook.chapters=this.chapters;
    }

    //No errors occured, we can save our new book
    if(!anErrorOccured){
      this.newBook.id=this.books[this.books.length-1].id+1;
      //To write the new json object we need a backend logic
      this.success=true;
    }
    
  }

  ngOnInit() {
  }

}
