import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import NumericNodeWidget from "./Widget";
import NumericNodeModel from "./Model";

class NumericNodeFactory extends AbstractReactFactory<
  NumericNodeModel,
  DiagramEngine
> {
  constructor() {
    super("numeric-node");
  }

  generateReactWidget(event: any) {
    return <NumericNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event: any) {
    return new NumericNodeModel(this.engine, 0);
  }
}

export default NumericNodeFactory;
