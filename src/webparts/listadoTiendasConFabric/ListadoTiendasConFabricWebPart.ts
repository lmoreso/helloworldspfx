import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ListadoTiendasConFabricWebPartStrings';
import ListadoTiendasConFabric from './components/ListadoTiendasConFabric';
import { IListadoTiendasConFabricProps } from './components/IListadoTiendasConFabricProps';
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import SPServices from '../../services/SPservices';

export interface IListadoTiendasConFabricWebPartProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
}

export default class ListadoTiendasConFabricWebPart extends BaseClientSideWebPart<IListadoTiendasConFabricWebPartProps> {

  public render(): void {
    // const element: React.ReactElement<IListadoTiendasConFabricProps > = React.createElement(
    //   ListadoTiendasConFabric,
    //   {
    //     description: this.properties.description
    //   }
    // );

    if (Environment.type === EnvironmentType.Local) {
      SPServices.getMockListData().then((response) => {
        const element: React.ReactElement<IListadoTiendasConFabricProps> = React.createElement(
          ListadoTiendasConFabric,
          {
            context: this.context,
            tiendas: response.value
          }
        );

        ReactDom.render(element, this.domElement);
      });
    } else {
      SPServices.getListData("Tiendas", this.context).then((response) => {
        const element: React.ReactElement<IListadoTiendasConFabricProps> = React.createElement(
          ListadoTiendasConFabric,
          {
            context: this.context,
            tiendas: response.value
          }
        );

        ReactDom.render(element, this.domElement);
      });
    }



    
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
