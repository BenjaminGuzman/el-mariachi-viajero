import { Injectable } from '@angular/core';
import { PromoCard } from './PromoCard';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult, gql } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class PromotionsService {
  private promos: PromoCard[] = [];

  constructor(private _apollo: Apollo) {
  }

  /**
   * Get promotions from backend and populate the cache.
   *
   * @param limit limit the number of promotions to return from backend. If cache is populated, this is ignored
   */
  public getPromoCards(limit: number): Promise<PromoCard[]> {
    return new Promise<PromoCard[]>((resolve, reject) => {
      if (this.promos.length > 0)
        return resolve(this.promos);

      if (limit <= 0)
        return resolve([]);

      const subscription = this._apollo.query<GQLPromosQuery>({
        query: gql`query($limit: Int, $today: Date) {
          health
          promotions(
            first: $limit,
            where: {promoValidUntil: {greaterThanOrEqualTo: $today}},
            order: [promoValidUntil_ASC]
          ) {
            edges {
              node {
                id
                name: promoName
                img: promoImg {
                  url
                }
                shortDescription: promoShortDescription
                featuresIncluded: promoFeaturesIncluded
                featuresExcluded: promoFeaturesExcluded
                price: promoPrice
                validFrom: promoValidFrom
                validUntil: promoValidUntil
              }
            }
          }
        }`,
        variables: {
          limit,
          today: new Date().toISOString() //'01/01/1900'
        },
      }).subscribe({
        next: (res: ApolloQueryResult<GQLPromosQuery>) => {
          subscription.unsubscribe();
          this.promos = res.data.promotions.edges.map(node => node.node);
          return resolve(this.promos);
        },
        error: err => {
          subscription.unsubscribe();
          return reject(err);
        },
      });
    });
  }

}

interface GQLPromosQuery {
  health: boolean;
  promotions: {
    edges: {
      node: PromoCard
    }[];
  };
}
