import { Injectable } from '@angular/core';
import { PackCard } from '../modules/packs/PackCard';
import { PromoCard } from '../modules/promotions/PromoCard';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult, gql } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class LandingPacksNPromosService {
  private packs: PackCard[] = [];
  private promos: PromoCard[] = [];

  constructor(private _apollo: Apollo) {
  }

  /**
   * Get packs from backend and populate the cache.
   *
   * @param limit limit the number of packs to return from backend. If cache is populated, this is ignored
   */
  public getPacks(limit: number): Promise<PackCard[]> {
    return new Promise<PackCard[]>((resolve, reject) => {
      if (this.packs.length > 0)
        return resolve(this.packs);

      if (limit <= 0)
        return resolve([]);

      const subscription = this._apollo.query<GQLPacksQuery>({
        query: gql`query($limit: Int) {
          packs(first: $limit) {
            edges {
              node {
                id
                name: packName
                img: packImg {
                  url
                }
                shortDescription: packShortDescription
                featuresIncluded: packFeaturesIncluded
                featuresExcluded: packFeaturesExcluded
                price: packPrice
              }
            }
          }
        }`,
        variables: {
          limit,
        },
      }).subscribe({
        next: (res: ApolloQueryResult<GQLPacksQuery>) => {
          subscription.unsubscribe();
          this.packs = res.data.packs.edges.map(node => node.node);
          return resolve(this.packs);
        },
        error: err => {
          subscription.unsubscribe();
          return reject(err);
        },
      });
    });
  }

  /**
   * Get promotions from backend and populate the cache.
   *
   * @param limit limit the number of promotions to return from backend. If cache is populated, this is ignored
   */
  public getPromos(limit: number): Promise<PromoCard[]> {
    return new Promise<PromoCard[]>((resolve, reject) => {
      if (this.promos.length > 0)
        return resolve(this.promos);

      if (limit <= 0)
        return resolve([]);

      const subscription = this._apollo.query<GQLPromosQuery>({
        query: gql`query($limit: Int) {
          health
          promotions(first: $limit) {
            edges {
              node {
                id
                name: promoName
                img: promoImg {
                  url
                }
                description: promoDescription
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

interface GQLPacksQuery {
  packs: {
    edges: {
      node: PackCard
    }[];
  };
}

interface GQLPromosQuery {
  health: boolean;
  promotions: {
    edges: {
      node: PromoCard
    }[];
  };
}
