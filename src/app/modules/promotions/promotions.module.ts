import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsRoutingModule } from './promotions.routing.module';
import { PromoCardComponent } from './promotion-card/promo-card.component';
import { PromotionDetailsComponent } from './promotion-details/promotion-details.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { UtilsModule } from '../../utils/utils.module';


@NgModule({
  declarations: [
    PromoCardComponent,
    PromotionDetailsComponent,
    PromotionsComponent,
  ],
  exports: [
    PromoCardComponent,
  ],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    UtilsModule,
  ],
})
export class PromotionsModule {
}
