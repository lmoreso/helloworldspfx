import { BaseComponentContext } from "@microsoft/sp-component-base";
import * as Entities from '../../../entities/tienda';

export interface IListadoTiendasConFabricProps {
  context: BaseComponentContext;
  tiendas: Entities.Tiendas.ITienda[];
  showPanel : false;
}

export interface IListadoTiendasConFabricState {
  showPanel:boolean;
  selectedTienda : Entities.Tiendas.ITienda;
  tiendas: Entities.Tiendas.ITienda[];
  readonly: boolean 
}
