import * as Entities from '../entities/tienda';

export default class MockHttpClient  {

   private static _items: Entities.Tiendas.ITienda[] = [{ Title: 'Mock List', key: 1, FechaApertura: new Date(2019, 0, 1) },
                                       { Title: 'Mock List 2', key: 2, FechaApertura: new Date(2019, 0, 1)  },
                                       { Title: 'Mock List 3', key: 3, FechaApertura: new Date(2019, 0, 1)  }];

   public static get(): Promise<Entities.Tiendas.ITienda[]> {
   return new Promise<Entities.Tiendas.ITienda[]>((resolve) => {
           resolve(MockHttpClient._items);
       });
   }
}