import * as React from 'react';
import styles from './ListadoTiendasConFabric.module.scss';
import { IListadoTiendasConFabricProps, IListadoTiendasConFabricState } from './IListadoTiendasConFabricProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import SPServices from '../../../services/SPservices';
import CustomForm from './CustomForm';
import * as Entities from '../../../entities/tienda';

export default class ListadoTiendasConFabric extends React.Component<IListadoTiendasConFabricProps, IListadoTiendasConFabricState> {
  private _selection: Selection;

  public constructor(props: any) {
    super(props);

    this.state = {
      showPanel: false,
      showDialog: false,
      readonly: true,
      tiendas: this.props.tiendas,
      newTienda: undefined,
      selectedTienda: undefined,
      formMode: 'view'
    };

    this.viewItemClick = this.viewItemClick.bind(this);
    this.addItemClick = this.addItemClick.bind(this);
    this.deleteItemClick = this.deleteItemClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.formClosed = this.formClosed.bind(this);

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
          items={this.state.tiendas}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.fixedColumns}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          selectionMode={SelectionMode.single}
          selection={this._selection}
        />
        <CustomForm showPanel={this.state.showPanel}
          selectedTienda={this.state.selectedTienda}
          readonly={this.state.readonly}
          formMode={this.state.formMode}
          onClosed={this.formClosed}>
        </CustomForm>

        <Dialog
          hidden={!this.state.showDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: this.state.dialog && this.state.dialog.title,
            subText: this.state.dialog && this.state.dialog.subtitle
          }}
          modalProps={{
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
          }}
        >
          <DialogFooter>
            {(this.state.dialog) && (this.state.dialog.showSuccess && <PrimaryButton onClick={this.deleteItem} text="Ok" />)}
            {(this.state.dialog) && (this.state.dialog.showCancel && <DefaultButton onClick={this._closeDialog} text="Cancel" />)}
          </DialogFooter>
        </Dialog>
      </Fabric>
    );
  }


  private formClosed() {
    this.setState((state, props) => ({
      showPanel: false,
    }));
  }

  private viewItemClick() {
    this.setState((state, props) => ({
      showPanel: true,
      readonly: true,
      formMode: 'view',
    }))
  }

  private addItemClick() {
    this.setState((state, props) => ({
      showPanel: true,
      readonly: false,
      formMode: 'new'
    }))
  }


  private editItemClick() {
    window.alert('Item edited');
  }

  private deleteItemClick() {
    this.setState({
      showDialog: true,
      dialog: {
        title: 'Are you sure?',
        subtitle : 'Item will be deleted',
        showSuccess: true,
        showCancel: true,
        onSuccess: this.deleteItem,
        onDismiss: this._closeDialog
      }
    });
  }


  private deleteItem() {
    console.log('Item will be deleted!');
    SPServices.deleteItemFromSharePointList("Tiendas", this.state.selectedTienda.Id).then((result) => {
      //Reenumeramos la colección      
      const index: number = this.state.tiendas.indexOf(this.state.selectedTienda);
      var arrTiendas = [...this.state.tiendas];
      arrTiendas.splice(index, 1);

      this.setState({ tiendas: arrTiendas, showDialog: false, selectedTienda: undefined });
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }




  private _closeDialog = (): void => {
    this.setState({ showDialog: false });
  };

  private _getSelectionDetails(): Entities.Tiendas.ITienda {
    return this._selection.getSelection()[0] as Entities.Tiendas.ITienda;
  }
}
