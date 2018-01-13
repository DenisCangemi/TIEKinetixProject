import { Author } from './author';
import { Chapter } from './chapter';

export class Book {

    constructor(
      public id: number,
      public title: string,
      public author: Author,
      public publisher: string,
      public edition:string,
      public ISBN:string,
      public publishingDate:Date,
      public chapters: Chapter[]
    ) {  }


  
}