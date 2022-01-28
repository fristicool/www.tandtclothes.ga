import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { CustomColorKeyboardComponent } from './custom-color-keyboard/custom-color-keyboard.component';
import { DevPanelComponent } from './dev-panel/dev-panel.component';
import { ErrorComponent } from './error/error.component';
import { FailureComponent } from './failure/failure.component';
import { HomeComponent } from './home/home.component';
import { KeyboardStandardComponent } from './keyboard-standard/keyboard-standard.component';
import { ShopComponent } from './shop/shop.component';
import { SuccesComponent } from './succes/succes.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'dev/:password', component: DevPanelComponent},
  {path: 'shop' ,component: ShopComponent},
  {path: 'contact', component: ContactComponent},
  // {path: 'product/0', component: CustomColorKeyboardComponent},
  {path: 'product/:id', component: KeyboardStandardComponent},
  {path: 'failure', component: FailureComponent},
  {path: 'succes', component: SuccesComponent},
  {path: '404', component: ErrorComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
