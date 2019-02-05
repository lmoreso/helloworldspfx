import { BaseComponentContext } from "@microsoft/sp-component-base";
import * as Entities from '../../../entities/tienda';

export interface IHelloWorldProps {
  context: BaseComponentContext;
  tiendas: Entities.Tiendas.ITienda[];
}
