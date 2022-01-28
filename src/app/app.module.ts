import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { CustomColorKeyboardComponent } from './custom-color-keyboard/custom-color-keyboard.component';
import { KeyboardStandardComponent } from './keyboard-standard/keyboard-standard.component';
import { ErrorComponent } from './error/error.component';
import { SuccesComponent } from './succes/succes.component';
import { FailureComponent } from './failure/failure.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DevPanelComponent } from './dev-panel/dev-panel.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { RedirectComponent } from './redirect/redirect.component'

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    CustomColorKeyboardComponent,
    KeyboardStandardComponent,
    ErrorComponent,
    SuccesComponent,
    FailureComponent,
    HomeComponent,
    AboutUsComponent,
    DevPanelComponent,
    CartComponent,
    ContactComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
