import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';


export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {

    
    console.log("My response:");
    console.log(this.props.tiendas);

    return (
      <ul>{ this.props.tiendas.map((tienda) => {
        return (<li>{tienda.Title}</li>);
     })}</ul>
    );

  }
}
