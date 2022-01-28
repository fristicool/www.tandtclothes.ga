import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators'

declare var gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'www.keyboard-master.be';
  dropdown: boolean = false;

  cart: any = []

  constructor(private http: HttpClient, private router: Router) {
    const navEndEvents = router.events.pipe(filter(event => event instanceof NavigationEnd))

    navEndEvents.subscribe((event: any) => {
      gtag('config', 'G-RRVLNQ0V80', {
        'page_path': event.urlAfterRedirects
      });
    })
  }

  ngOnInit(): void {
    if (localStorage.getItem('cart') != null) {
      this.cart = JSON.parse(localStorage.getItem('cart') || "[]")
    }

    if (sessionStorage.getItem('products') === null) {
      this.http.get<any>('http://localhost:4242/static/products.json').subscribe(data => {
        sessionStorage.setItem('products', JSON.stringify(data.products))
      })
    }
  }

  getTotalCartItems() {
    var totalCount: number = 0
    this.cart.forEach((element: { quantity: number; }) => {
      totalCount += element.quantity
    });

    return totalCount
  }

  switchMenu() {
    this.dropdown = !this.dropdown
    console.log('hey')
  }
}
