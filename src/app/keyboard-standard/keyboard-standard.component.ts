import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import Products from 'http://localhost:4242/static/products.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-keyboard-standard',
  templateUrl: './keyboard-standard.component.html',
  styleUrls: ['./keyboard-standard.component.scss']
})
export class KeyboardStandardComponent implements OnInit {

  availableProduct: boolean = false
  outOfStock:any = false
  product_id: any = ""
  products: any[] = []
  current_product: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.product_id = this.route.snapshot.paramMap.get("id");
    console.log(this.product_id)

    this.http.post<any>('http://localhost:4242/isoutofstock', {id: this.product_id}).subscribe(data => {
      console.log(data.data)
      this.outOfStock = data.data
    })
  }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:4242/static/products.json').subscribe(data => {
      this.products = data.products
      this.current_product = this.products.find(o => o.id.toString() === this.product_id)

      this.isProductAvailable( this.product_id, data.products)
    })
  }

  isProductAvailable(id: any, products: any) {
    if (id > products.length) {
      this.router.navigate(['/404'])
    }
    this.availableProduct = true;
  }

  checkout() {
    this.http.post<any>('http://localhost:4242/create-checkout-session', this.current_product).subscribe(data => {
      console.log(data.url.toString())
      window.location.href = data.url.toString()
    })
  }

  addToCart() {
    var cart = []
    cart = JSON.parse(localStorage.getItem('cart') || "[]")

    console.log(cart.find((product: { image: string; }) => product.image === this.current_product.image))

    if (cart.find((product: { image: string; }) => product.image === this.current_product.image) === undefined) {
      cart.push({
        id: this.current_product.id,
        name: this.current_product.name,
        price: this.current_product.price,
        description: this.current_product.description,
        price_unit: this.current_product.price_unit,
        image: this.current_product.image,
        delivery_estimate_minimum: this.current_product.delivery_estimate_minimum,
        delivery_estimate_maximum: this.current_product.delivery_estimate_maximum,
        quantity: 1,
      })
    } else {
      cart[cart.findIndex((product: { image: string; }) => product.image === this.current_product.image)].quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    window.location.reload();
  }
}
