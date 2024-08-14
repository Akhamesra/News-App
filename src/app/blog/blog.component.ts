import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  modal: boolean = true;
  selected: Array<boolean> = [false, false, false, false, false, false];
  selectedblog: any = "hello";
  news: any;

  constructor(public http: HttpClient, public store: StoreService) {}

  ngOnInit() {
    console.log(this.store.category);
    
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.store.category}&apiKey=5a15f82320c54c608c7370e6a1f5af00&limit=4`;
    
    this.http.get(apiUrl).subscribe(
      (res) => {
        if (res) {
          this.filter(res);
        } else {
          alert("Failed to fetch news");
        }
      },
      (error) => {
        console.error("Error fetching news:", error);
        alert("There was an error fetching news. Please check the console for details.");
      }
    );
  }

 filter(res:any){
  this.news = res.articles;
  console.log(this.news[1].urlToImage);
 }
 check(val:string){
  this.http.get(`https://newsapi.org/v2/top-headlines?country=in&category=${val}&apiKey=5a15f82320c54c608c7370e6a1f5af00&limit=4`).subscribe((res) => {
    if(res != null){
      this.filter(res);
      console.log(val)
      if(val==='sports'){
        this.selected[0] = true;this.selected[1]=false;this.selected[2]=false;this.selected[3]=false;this.selected[4]=false;this.selected[5]=false;
      }
      if(val==='business'){
        this.selected[1] = true;this.selected[0]=false;this.selected[2]=false;this.selected[3]=false;this.selected[4]=false;this.selected[5]=false;
      }
      if(val==='health'){
        this.selected[2] = true;this.selected[1]=false;this.selected[0]=false;this.selected[3]=false;this.selected[4]=false;this.selected[5]=false;
      }
      if(val==='entertainment'){
        this.selected[3] = true;this.selected[1]=false;this.selected[2]=false;this.selected[0]=false;this.selected[4]=false;this.selected[5]=false;
      }
      if(val==='technology'){
        this.selected[4] = true;this.selected[1]=false;this.selected[2]=false;this.selected[3]=false;this.selected[0]=false;this.selected[5]=false;
      }
      if(val==='science'){
        this.selected[5] = true;this.selected[1]=false;this.selected[2]=false;this.selected[3]=false;this.selected[4]=false;this.selected[0]=false;
      }
      window.scroll({
        top: 800,
        // left: 800,
        behavior: 'smooth'
      });
    }
    else
      alert("failed")
  })
 }
 checkAuth(blog:any){
  if(localStorage.getItem("user")!=null){
    console.log(blog);
    this.selectedblog = blog;
    this.modal = false
  }
  else{
    this.modal = true;
  }
 }
}
