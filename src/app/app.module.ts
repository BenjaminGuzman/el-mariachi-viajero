import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CarouselItemComponent} from './landing/carousel-item/carousel-item.component';
import {NavOptionComponent} from './nav/nav-option/nav-option.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
	declarations: [
		AppComponent,
		CarouselItemComponent,
		NavOptionComponent,
		NavComponent,
		FooterComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
