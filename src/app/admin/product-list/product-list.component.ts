import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  prodcutsData:any=[];
  sortDirection='asc';
  sortby='hightolow';
  total:any=[];

  constructor(private http:HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event) {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        this.assignProduct();
      }
    }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.prodcutsData=[];
        this.sortby = params.sortType ? params.sortType:this.sortby ;
        this.getProducts();
      }
    );
    
  }


  getProducts(){
    this.http.get('./assets/products.json')
    .subscribe((responseData)=>{
      
          this.total = responseData;
          this.total.sort((a,b)=>{
            if(this.sortby==='lowtohigh'){
              return a.Price-b.Price;
            }else{
              return b.Price-a.Price;
            }
          });
          this.assignProduct();
       
    })
  }
  
  assignProduct(){
    let startIndex = this.prodcutsData.length;
    let endIndex = startIndex + 11;
    if(startIndex<this.total.length){
      for(let i = startIndex; i<=endIndex; i++){
        this.prodcutsData.push(this.total[i]);
      }
      
    }
  }


  reload(){
    this.router.navigate(['/admin/product-list'], { queryParams: { sortType: this.sortby } });
  }
}
