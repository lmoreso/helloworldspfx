import { BaseComponentContext } from "@microsoft/sp-component-base";
import * as Entities from '../../../entities/tienda';

export interface IListadoTiendasConFabricProps {
  context: BaseComponentContext;
  tiendas: Entities.Tiendas.ITienda[];
  showPanel : false;
}

export interface IListadoTiendasConFabricState {
  showPanel:boolean;
  dialog?: {
    title: string,
    subtitle?: string,
    showSuccess?: boolean,
    showCancel?: boolean,
    onSuccess?(): void,
    onDismiss?(): void
  };
  showDialog:boolean;
  selectedTienda : Entities.Tiendas.ITienda;
  newTienda : Entities.Tiendas.ITienda;
  tiendas: Entities.Tiendas.ITienda[];
  readonly: boolean,
  formMode: string
}
