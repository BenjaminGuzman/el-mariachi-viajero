import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PromoCard } from '../PromoCard';

@Component({
  selector: 'app-promotion-card',
  templateUrl: './promo-card.component.html',
  styleUrls: ['./promo-card.component.scss'],
})
export class PromoCardComponent {
  // max number of features to show
  public static readonly N_FEATURES = 2;

  public bgImageStyle: string = '';
  public link: string = '';

  private _promo!: PromoCard;

  public featuresIncluded: string[] = [];
  public featuresExcluded: string[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  @Input()
  set promo(data: PromoCard) {
    if (!data)
      return;

    this.bgImageStyle = `background-image: url(${data.img.url})`;
    this.link = `/promociones/${data.id}`;
    this._promo = data;
    this.featuresIncluded = this._promo.featuresIncluded.split('\n', PromoCardComponent.N_FEATURES).map(s => s.trim());

    if (this._promo.featuresExcluded)
      this.featuresExcluded = this._promo.featuresExcluded.split('\n', PromoCardComponent.N_FEATURES).map(s => s.trim());

    this.changeDetectorRef.markForCheck();
  }

  get promo(): PromoCard {
    return this._promo;
  }
}
