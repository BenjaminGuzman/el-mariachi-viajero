import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import SwiperCore, {Navigation, Pagination} from 'swiper';
import {Subscription} from 'rxjs';
import {CONTACT_EMAIL, CONTACT_PHONE_NUMBER} from '../../globals';
import {PromoCard} from '../../modules/promotions/PromoCard';
import {PackCard} from '../../modules/packs/PackCard';
import {PromotionsService} from 'src/app/modules/promotions/promotions.service';
import {PacksService} from 'src/app/modules/packs/packs.service';


SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public readonly CONTACT_PHONE_NUMBER = CONTACT_PHONE_NUMBER;
  public readonly CONTACT_EMAIL = CONTACT_EMAIL;

  public promotions: PromoCard[] = [];
  public packs: PackCard[] = [];

  /**
   * Maximum number of cards
   */
  public readonly nCards: number = 4;

  constructor(private promotionsService: PromotionsService, private packsService: PacksService, private _changeDetectorRef: ChangeDetectorRef) {
  }

  async ngOnInit() {
    try {
      [this.promotions, this.packs] = await Promise.all([
        this.promotionsService.getPromoCards(this.nCards),
        this.packsService.getPacks(this.nCards)
      ])
    } catch (e) {
      alert('Error al obtener los paquetes y promociones disponibles. Los detalles se encuentran en la consola');
      console.error(e);
    } finally {
      this._changeDetectorRef.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
