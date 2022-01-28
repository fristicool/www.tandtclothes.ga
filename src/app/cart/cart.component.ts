import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: any = []
  quantitys: number[] = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || "[]");
    console.log(this.cart)

    this.setQuantitys()
  }

  deleteFromCart(index: number) {
    this.cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(this.cart))

    window.location.reload();
  }

  getQuantity(index: number) {
    return this.cart[index].quantity
  }

  setQuantitys() {
    for (let i = 0; i < this.cart.length; i++) {
      this.quantitys[i] = this.cart[i].quantity
    }
  }

  checkout() {
    let cartToSend: any = []
    this.cart.forEach((element: any, index: number) => {
      cartToSend.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: element.name,
          },
          unit_amount: element.price * 100,
        },
        quantity: this.quantitys[index]
      })
    });

    this.http.post<any>('http://localhost:4242/create-checkout-session', { object: cartToSend}).subscribe(data => {
      console.log(data.url.toString())
      window.location.href = data.url.toString()
    })
  }
}
