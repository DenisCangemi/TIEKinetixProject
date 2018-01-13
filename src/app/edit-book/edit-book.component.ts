import { Component, OnInit } from '@angular/core';
import { DatasService } from '../services/datas.service';
import { Book } from '../classes/book';
import { Author } from '../classes/author';
import { Chapter } from '../classes/chapter';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  books=[];
  authors=[];
  newBook:Book;
  bookID;
  submitted = false;
  titleerr=false;
  authorerr=false;
  puberr=false;
  isbnerr=false;
  editionerr=false;
  chapterserr=false;
  dateerr=false;
  authorid;
  chapters:Chapter[];
  bookId;
  success=false;

  constructor(datasService:DatasService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
        //Get selected book id from home
        let id = +params['id'];
        this.bookId=id;
        //Call service to get the full list
        datasService.getBooks().subscribe(datas => {
          for(let i=0;i<datas.length;i++){
            if(datas[i].id==id){
              this.newBook=datas[i];
              //Save chapters in local variable to manage it better
              this.chapters=datas[i].chapters;
              this.authorid=datas[i].author.id;
              //Call service to fetch authors array
              datasService.getAuthors().subscribe(datas => {
                this.authors=datas;
              });
              break;
            }
          }
        });
    });
    //Book init
    this.newBook=new Book(0,'',new Author(0,"","",new Date(),""),"","","",null,[]);
    
  }

  //Add a new chapter to the book
  addChapter(){
    this.chapters.push(new Chapter("",0,0));
  }

  //Method called when user submit the form
  onSubmit() { 
    let anErrorOccured=false;
    //In this phase I check if all the input has been filled correctly. If not, show error message"
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
      this.newBook.id=this.bookId;
      //To write the new json object we need a backend logic
      this.success=true;
    }
  }

  ngOnInit() {
  }

}
