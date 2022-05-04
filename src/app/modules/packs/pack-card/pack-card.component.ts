import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PackCard } from '../PackCard';

@Component({
  selector: 'app-pack-card',
  templateUrl: './pack-card.component.html',
  styleUrls: ['./pack-card.component.scss'],
})
export class PackCardComponent {
  // max number of features to show
  public static readonly N_FEATURES = 2;

  public bgImageStyle: string = '';
  public link: string = '';

  private _pack!: PackCard;

  public featuresIncluded: string[] = [];
  public featuresExcluded: string[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  @Input()
  set pack(data: PackCard) {
    if (!data)
      return;
    this.bgImageStyle = `background-image: url(${data.img.url})`;
    this.link = `/paquetes/${data.id}`;
    this._pack = data;
    this.featuresIncluded = this._pack.featuresIncluded.split('\n', PackCardComponent.N_FEATURES).map(s => s.trim());

    if (this._pack.featuresExcluded)
      this.featuresExcluded = this._pack.featuresExcluded.split('\n', PackCardComponent.N_FEATURES).map(s => s.trim());

    this.changeDetectorRef.markForCheck();
  }

  get pack(): PackCard {
    return this._pack;
  }
}
