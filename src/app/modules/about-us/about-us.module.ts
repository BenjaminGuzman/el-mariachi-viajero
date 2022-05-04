import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';
import { AboutUsRoutingModule } from './about-us-routing.module';
import {UtilsModule} from "../../utils/utils.module";

@NgModule({
  declarations: [
    AboutUsComponent,
  ],
    imports: [
        AboutUsRoutingModule,
        CommonModule,
        UtilsModule,
    ],
})
export class AboutUsModule {
}
