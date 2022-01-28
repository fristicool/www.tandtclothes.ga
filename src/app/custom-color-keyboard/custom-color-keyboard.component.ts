import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import Products from 'http://localhost:4242/static/products.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-custom-color-keyboard',
  templateUrl: './custom-color-keyboard.component.html',
  styleUrls: ['./custom-color-keyboard.component.scss']
})
export class CustomColorKeyboardComponent implements OnInit {

  products: any[] = [];
  currentProduct: any = {};
  colorOptions: string[] = ["Black", "Blue", "Gray", "Green", "Mint", "Pink", "Purple", "Red", "Yellow"];
  colorCodes: string[] = ["#101010", "#0084AE", "#3A424F", "#78A056", "#01A999", "#D2577E", "#5E52A6", "#B0141C", "#C88324"];

  outOfStock: any = false
  innerColor: string = sessionStorage.getItem('innerColor') || "Red";
  outerColor: string = sessionStorage.getItem('outerColor') || "Blue";
  currentImage: string = "http://localhost:4242/static/Red&Blue-shop-image.png"
  currentProductName: string = `custom keyboard - ${this.innerColor} & ${this.outerColor}`

  constructor(private router: Router, private http: HttpClient) {
    this.http.post<any>('http://localhost:4242/isoutofstock', { id: 0 }).subscribe(data => {
      console.log(data.data)
      this.outOfStock = data.data
    })
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('innerColor') != null) {
      this.updateImage()
    }

    this.http.get<any>('http://localhost:4242/static/products.json').subscribe(data => {
      this.products = data.products
      this.currentProduct = this.products.find(o => o.id === 0)
    })
  }

  checkout() {
    // this.http.post<any>('http://localhost:4242/create-checkout-session', this.currentProduct).subscribe(data => {
    //   console.log(data.url.toString())
    //   window.location.href = data.url.toString()
    // })
  }

  setColorInner(color: string) {
    this.innerColor = color;

    sessionStorage.setItem('innerColor', this.innerColor)
    sessionStorage.setItem('outerColor', this.outerColor)
    this.updateImage()
  }

  setColorOuter(color: string) {
    this.outerColor = color;

    this.updateImage()

    sessionStorage.setItem('innerColor', this.innerColor)
    sessionStorage.setItem('outerColor', this.outerColor)
  }

  getColorCode(color: string) {
    return this.colorCodes[this.colorOptions.indexOf(color)]
  }

  updateImage() {
    this.currentImage = `http://localhost:4242/static/${this.innerColor}&${this.outerColor}.png`
  }

  addToCart() {
    var cart = []
    cart = JSON.parse(localStorage.getItem('cart') || "[]")

    console.log(cart.find((product: { image: string; }) => product.image === this.currentImage))

    if (cart.find((product: { image: string; }) => product.image === this.currentImage) === undefined) {
      cart.push({
        id: this.currentProduct.id,
        name: this.currentProduct.name,
        price: this.currentProduct.price,
        description: this.currentProduct.description,
        price_unit: this.currentProduct.price_unit,
        image: this.currentImage,
        delivery_estimate_minimum: this.currentProduct.delivery_estimate_minimum,
        delivery_estimate_maximum: this.currentProduct.delivery_estimate_maximum,
        quantity: 1,
      })
    } else {
      cart[cart.findIndex((product: { image: string; }) => product.image === this.currentImage)].quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    window.location.reload();
  }
}
