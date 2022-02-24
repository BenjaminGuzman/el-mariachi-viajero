import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {ApolloQueryResult, gql} from "@apollo/client/core";
import {TourCardInfo} from "../modules/tours/TourCardInfo";
import {Subscription} from "rxjs";
import {Category} from "./tour-categories/Category";

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  /**
   * GraphQL fields to get from the tour (as card)
   *
   * If you update this -> REMEMBER to also update the interfaces and code depending on this
   */
  public static tourCardProjection = `
    id: objectId
    name: tourName
    shortDescription: tourShortDescription
    # featuresIncluded: tourFeaturesIncluded
    # featuresExcluded: tourFeaturesExcluded
    price: tourPrice
  `;

  private categories: Category[] = [];

  constructor(private _apollo: Apollo) {
  }

  /**
   * Get state cards from cache or from backend (in this case cache will be populated)
   *
   * The returned promise will be rejected on error
   */
  public getCategories(): Promise<Category[]> {
    return new Promise<Category[]>((resolve, reject) => {
      if (this.categories.length > 0)
        return resolve(this.categories);

      // fetch categories from backend
      const subscription: Subscription = this._apollo.query<GQLCategoriesQuery>({
        query: gql`query {
          categories {
            edges {
              node {
                id: objectId
                name: categoryName
                icon: categoryIcon
                iconType: categoryIconType
                img: categoryImg {
                  url
                }
                thumb: categoryThumb {
                  url
                }
              }
            }
          }
        }`
      }).subscribe({
        next: (res: ApolloQueryResult<GQLCategoriesQuery>) => {
          subscription.unsubscribe();
          this.categories = res.data.categories.edges.map(c => c.node);
          return resolve(this.categories);
        },
        error: err => {
          subscription.unsubscribe();
          reject(err);
        }
      });
    });
  }

  /**
   * Query the server to get the corresponding image for each tour
   *
   * To prevent side effects, don't update the array until the promise returned is resolved or rejected
   *
   * @param tours array of tours just with tour's text information, without images. This array will be updated
   * @return the same array received after the update
   */
  public fillToursThumbs(tours: TourCardInfo[]): Promise<TourCardInfo[]> {
    return new Promise<TourCardInfo[]>((resolve, reject) => {
      const subscription: Subscription = this._apollo.query<GQLToursThumbsQuery>({
        query: gql`query {
          tourImages(where: {
            OR: [${tours.map(t => `{tourId: {have: {objectId: {equalTo: "${t.id}"}}}}`).join(',')}]
          }) {
            edges {
              node {
                tourId {
                  edges {
                    node {
                      id: objectId
                    }
                  }
                }
                thumb: tourThumb {
                  url
                }
              }
            }
          }
        }`
      }).subscribe({
        next: (res: ApolloQueryResult<GQLToursThumbsQuery>) => {
          subscription.unsubscribe();

          // map the id of the tour with its index inside the tours array
          const toursIdIdxMap: {[id: string]: number} = {};
          for (let i = 0; i < tours.length; ++i)
            toursIdIdxMap[tours[i].id] = i; // WARNING: this has a race condition. What if the array was updated while the subscription received the event?

          // assign each thumb to the corresponding tour object
          for (const thumb of res.data.tourImages.edges)
            tours[toursIdIdxMap[thumb.node.tourId.edges[0].node.id]].thumbs.push(thumb.node.thumb);

          return resolve(tours);
        },
        error: err => {
          subscription.unsubscribe();
          reject(err);
        }
      });
    });
  }
}

interface GQLToursThumbsQuery {
  tourImages: {
    edges: {
      node: {
        tourId: {
          edges: {
            node: {
              id: string;
            }
          }[]
        };
        thumb: {url: string};
      };
    }[];
  }
}

interface GQLCategoriesQuery {
  categories: {
    edges: {
      node: Category;
    }[];
  }
}
