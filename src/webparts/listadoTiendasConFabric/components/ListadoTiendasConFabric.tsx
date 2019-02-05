import * as React from 'react';
import styles from './ListadoTiendasConFabric.module.scss';
import { IListadoTiendasConFabricProps } from './IListadoTiendasConFabricProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

export default class ListadoTiendasConFabric extends React.Component<IListadoTiendasConFabricProps, {}> {
  public render(): React.ReactElement<IListadoTiendasConFabricProps> {
    
    console.log("My response:");
    console.log(this.props.tiendas);
    var  columns = [
      { key: 'column1', name: 'Id', fieldName: 'Id', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column2', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true }
    ]

    return (
      <DetailsList
        items={this.props.tiendas}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
      />
    );

  }
}
