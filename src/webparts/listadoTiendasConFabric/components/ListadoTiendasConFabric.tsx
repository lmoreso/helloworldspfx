import * as React from 'react';
import styles from './ListadoTiendasConFabric.module.scss';
import { IListadoTiendasConFabricProps, IListadoTiendasConFabricState } from './IListadoTiendasConFabricProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import SPServices from '../../../services/SPservices';
import * as Entities from '../../../entities/tienda';

export default class ListadoTiendasConFabric extends React.Component<IListadoTiendasConFabricProps, IListadoTiendasConFabricState> {
  private _selection: Selection;

  public constructor(props:any) {
    super(props);
    
    this.state = {
      showPanel : false,
      readonly: true,
      tiendas : this.props.tiendas,
      selectedTienda : undefined
    };
    
    this.viewItemClick = this.viewItemClick.bind(this);
    this.addItemClick = this.addItemClick.bind(this);
    this.deleteItemClick = this.deleteItemClick.bind(this);
    this._setShowPanel = this._setShowPanel.bind(this);

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState((state) => {
          state.selectedTienda = this._getSelectionDetails();
        });
      }
    });

  }
  public render(): React.ReactElement<IListadoTiendasConFabricProps> {

    var columns = [
      { key: 'column1', name: 'Id', fieldName: 'Id', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column2', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true }
    ]

    var commandBarItems = [
      {
        key: 'viewItem',
        name: 'Ver elemento',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Add'
        },
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick: this.viewItemClick
      },
      {
        key: 'newItem',
        name: 'Nuevo',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'View'
        },
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick: this.addItemClick
      },
      {
        key: 'edit',
        name: 'Editar',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Edit'
        },
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick: this.editItemClick
      },
      {
        key: 'delete',
        name: 'Eliminar',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Delete'
        },
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick: this.deleteItemClick
      }
    ];

    return (
      <Fabric>
        <CommandBar
          items={commandBarItems}
        />
        <DetailsList
          items={this.props.tiendas}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.fixedColumns}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          selectionMode={SelectionMode.single}
          selection={this._selection}
        />
        <Panel isOpen={this.state.showPanel} onDismiss={this._setShowPanel(false)} type={PanelType.medium} headerText={  this.state.selectedTienda ? this.state.selectedTienda.Title : 'Nuevo elemento' }>
          <TextField label="Title" readOnly={this.state.readonly} value={ this.state.selectedTienda ? this.state.selectedTienda.Title : 'New item' } />
        </Panel>
      </Fabric>
    );
  }


  private viewItemClick() {
    this.setState((state, props) => ({
      showPanel: true,
      readonly: true
    }))
  }

  private addItemClick() {
    this.setState((state, props) => ({
      showPanel: true,
      readonly: false
    }))
  }
  

  private editItemClick() {
    window.alert('Item edited');
  }

  private deleteItemClick() {
    window.alert('Delete item:'+ this.state.selectedTienda.key);
    
    SPServices.deleteItemFromSharePointList("Tienda", this.state.selectedTienda.Id, this.context).then((result) => {


    });


  }

  private _setShowPanel = (showPanel: boolean): (() => void) => {
    return (): void => {
      this.setState({ showPanel });
    };
  };

  private _getSelectionDetails(): Entities.Tiendas.ITienda {
    return this._selection.getSelection()[0] as Entities.Tiendas.ITienda;
  }
}
