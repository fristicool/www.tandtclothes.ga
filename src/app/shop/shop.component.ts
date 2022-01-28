import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: any[] = []
  colorOptions: string[] = ["Black", "Blue", "Gray", "Green", "Mint", "Pink", "Purple", "Red", "Yellow"];
  colorCodes: string[] = ["#101010", "#0084AE", "#3A424F", "#78A056", "#01A999", "#D2577E", "#5E52A6", "#B0141C", "#C88324"];

  innerColor:string = "Red";
  outerColor:string = "Blue";
  currentImage:string = "http://localhost:4242/static/Red&Blue-shop-image.png"
  
  priceId = "price_1KA04qLjJlE6s6hj9XAbK5vh";
  quantity = 1;
  stripePromise = loadStripe(environment.stripe_key);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:4242/static/products.json').subscribe(data => {
      this.products = data.products
    })
  }

  count(i: number) {
    console.log(new Array(4))
    return new Array(i)
  }

  async checkout() {
    // Call your backend to create the Checkout session.
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await this.stripePromise ;

    if (stripe == null) return

    console.log("not null")

    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: this.priceId, quantity: this.quantity }],
      successUrl: `${window.location.href}/success`,
      cancelUrl: `${window.location.href}/failure`,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      console.log(error);
    }
  }

  setColorInner(color: string) {
    this.innerColor = color;

    this.updateImage()
  }

  setColorOuter(color: string) {
    this.outerColor = color;

    this.updateImage()
  }

  getColorCode(color: string) {
    return this.colorCodes[this.colorOptions.indexOf(color)]
  }

  updateImage() {
    this.currentImage = `http://localhost:4242/static/${this.innerColor}&${this.outerColor}.png`
  }

  getNonSpecialCards (num: number) {
    let array: any[] = [];
    
    for(let i = num; i < this.products.length; i++) {
      array.push(this.products[i])
    }

    return array;
  }
}
