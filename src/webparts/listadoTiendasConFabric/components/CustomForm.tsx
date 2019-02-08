import React = require("react");
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as Entities from '../../../entities/tienda';
import SPServices from '../../../services/SPservices';

export interface CustomFormProps {
    selectedTienda?: Entities.Tiendas.ITienda,
    showPanel: boolean,
    formMode: string,
    readonly?: boolean,
    onClosed(): void;
}


export interface CustomFormState {
    mytextValue: string,
    showPanel: boolean,
    newTienda: Entities.Tiendas.ITienda
}

export default class CustomForm extends React.Component<CustomFormProps, CustomFormState>
{
    public constructor(props: any) {
        super(props);
        this.state = {
            mytextValue: '',
            showPanel: false,
            newTienda: undefined
        };
        this._setShowPanel = this._setShowPanel.bind(this);
        this.createItem = this.createItem.bind(this);
        this._onTitleChange = this._onTitleChange.bind(this);

    }

    public render(): React.ReactElement<CustomForm> {
        return (
            <Panel isOpen={this.props.showPanel} onDismiss={this.props.onClosed}
                type={PanelType.medium}
                headerText={this.props.selectedTienda ? this.props.selectedTienda.Title : 'Nuevo elemento'}>
                <TextField label="Title" readOnly={false} onChanged={this._onTitleChange} />
                My value is: {this.state.mytextValue}
                {this.props.formMode == 'new' && <PrimaryButton onClick={this.createItem} text="Save" />}
                {this.props.formMode == 'new' && <PrimaryButton text="Cancel" />}
            </Panel>);
    }

    private _onTitleChange(newval: string) {
        this.setState({ mytextValue: newval });
    }

    private _setShowPanel = (showPanel: boolean): (() => void) => {
        return (): void => {
            this.setState({ showPanel });
        };
    };

    private createItem() {
        window.alert(this.state.newTienda.Title);

        // SPServices.createTiendaInSharePoint("Tiendas", newTienda).then((result) => {
        //     var arrTiendas = [...this.state.tiendas];
        //     arrTiendas.push(newTienda);
        //     this.setState({ tiendas: arrTiendas });
        // });
    }

}
