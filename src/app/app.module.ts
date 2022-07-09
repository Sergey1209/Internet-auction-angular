import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LotCategoriesListComponent } from './components/category-lot-list/category-lot-list.component';
import { CategoryLotsComponent } from './components/category-lot/category-lot.component';
import { EditLotCategoryComponent as LotCategoryEditComponent } from './components/category-lot-edit/category-lot-edit.component';
import { HomeComponent } from './components/home/home.component';
import { TopLineComponent } from './components/top-line/top-line.component';
import { AuthComponent } from './components/auth/auth.component';
import { AUCTION_API_URL, AUTH_API_URL } from './app.injection-tokens';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { LotsListComponent } from './components/lot-list/lot-list.component';
import { LotComponent } from './components/lot/lot.component';
import { LotEditComponent } from './components/lot-edit/lot-edit.component';
import { SelectImageComponent } from './components/select-image/select-image.component';
import { ComboBoxComponent } from './components/combo-box/combo-box.component';
import { AuthGuard } from './guards/auth-guard';
import { AuctionComponent } from './components/auction/auction.component';
import { AdminGuard } from './guards/admin-guard.guard';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    LotCategoriesListComponent,
    CategoryLotsComponent,
    LotCategoryEditComponent,
    HomeComponent,
    TopLineComponent,
    AuthComponent,
    LotsListComponent,
    LotComponent,
    LotEditComponent,
    SelectImageComponent,
    ComboBoxComponent,
    AuctionComponent,
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.tokenWhiteListedDomains
      }
    }),
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'login', component: AuthComponent},
      {path: 'lotcategory/add', component: LotCategoryEditComponent, canActivate: [AdminGuard]},
      {path: 'lotcategory/:id', component: LotCategoryEditComponent, canActivate: [AdminGuard]},
      {path: 'lot/:id', component: LotEditComponent, canActivate: [AuthGuard]},
      {path: 'lot/add', component: LotEditComponent, canActivate: [AuthGuard]},
      {path: 'auction/:id', component: AuctionComponent, canActivate: [AuthGuard]},
    ]),
  ],
  providers: [{
    provide: AUCTION_API_URL,
    useValue: environment.auctionApi
  },
  {
    provide: AUTH_API_URL,
    useValue: environment.authApi
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
