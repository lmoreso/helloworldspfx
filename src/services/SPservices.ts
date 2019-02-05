import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
    SPHttpClient,
    SPHttpClientResponse
} from '@microsoft/sp-http';
import * as Entities from '../entities/tienda';
import MockHttpClient from '../services/MockHttpClient';

export default class SPServices {

    public static getListData(listName: string, context: WebPartContext): Promise<any> {
        return context.spHttpClient.get(context.pageContext.web.absoluteUrl + '/_api/lists/getbytitle(\'' + listName + '\')/items', SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            });
    }

    public static getMockListData(): Promise<Entities.Tiendas.ITiendaCollection> {
        return MockHttpClient.get()
            .then((data: Entities.Tiendas.ITienda[]) => {
                var listData: Entities.Tiendas.ITiendaCollection = { value: data };
                return listData;
            }) as Promise<Entities.Tiendas.ITiendaCollection>;
    }

}