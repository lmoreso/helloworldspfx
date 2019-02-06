import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Button } from 'office-ui-fabric-react/lib/Button';



export default class HelloWorld extends React.Component<IHelloWorldProps, { thisIsMyLabel: string, otherproperty: number }> {
  public constructor(props: any) {
    super(props);

    this.state = {
      thisIsMyLabel: 'test1',
      otherproperty: 2
    };

    this.addCount = this.addCount.bind(this);
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div>
        <p>My Label: {this.state.thisIsMyLabel}</p>
        <p>My number: {this.state.otherproperty}</p>
        <Button onClick={this.addCount}></Button>
      </div>
    );
  }

  private addCount(): void {
    var current = this.state.otherproperty;
    var newVal = current + 1;
    this.setState({ otherproperty: newVal });
    return;
  };
}
