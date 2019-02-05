import { BaseComponentContext } from "@microsoft/sp-component-base";
import * as Entities from '../../../entities/tienda';

export interface IListadoTiendasConFabricProps {
  context: BaseComponentContext;
  tiendas: Entities.Tiendas.ITienda[];
}
