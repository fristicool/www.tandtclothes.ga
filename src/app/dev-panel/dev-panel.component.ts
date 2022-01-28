import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import Products from 'https:/customkey.herokuapp.com/static//products.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dev-panel',
  templateUrl: './dev-panel.component.html',
  styleUrls: ['./dev-panel.component.scss']
})
export class DevPanelComponent implements OnInit {

  password: any = ""
  products: any[] = []

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.password = this.route.snapshot.paramMap.get("password");
  }

  ngOnInit(): void {
  }

  switch(num: number) {
    console.log({id: num, password: this.password})
    this.http.post<any>('http://localhost:4242/switchoutofstock', {id: num, password: this.password}).subscribe(data => {
      console.log(data.data.toString())
    })
  }
}
