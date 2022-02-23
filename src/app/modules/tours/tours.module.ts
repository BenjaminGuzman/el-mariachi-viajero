import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TourDetailsComponent} from "./tour-details/tour-details.component";
import {ManageToursComponent} from "./manage-tours/manage-tours.component";
import {TourItemComponent} from "./tour-item/tour-item.component";
import {ToursRoutingModule} from "./tours-routing.module";
import {UtilsModule} from "../../utils/utils.module";
import { ToursComponent } from './tours/tours.component';

@NgModule({
    declarations: [
        TourItemComponent,
        TourDetailsComponent,
        ManageToursComponent,
        ToursComponent
    ],
    exports: [
        TourItemComponent
    ],
    imports: [
        ToursRoutingModule,
        CommonModule,
        UtilsModule
    ]
})
export class ToursModule {
}
