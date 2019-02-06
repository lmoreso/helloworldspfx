import * as Entities from '../entities/tienda';

export default class MockHttpClient {

    private static _items: Entities.Tiendas.ITienda[] = [{ Title: 'Mock List', Id: 1, key: 1, FechaApertura: new Date(2019, 0, 1) },
    { Title: 'Mock List 2', Id: 2, key: 2, FechaApertura: new Date(2019, 0, 1) },
    { Title: 'Mock List 3', Id: 3, key: 3, FechaApertura: new Date(2019, 0, 1) }];

    public static get(): Promise<Entities.Tiendas.ITienda[]> {
        return new Promise<Entities.Tiendas.ITienda[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }

    public static delete(): Promise<any> {
        return new Promise<any>((resolve) => {
            resolve(true);
        });
    }

}