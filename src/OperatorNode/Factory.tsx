import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import OperatorNodeWidget from "./Widget";
import OperatorNodeModel from "./Model";

class OperatorNodeFactory extends AbstractReactFactory<
  OperatorNodeModel,
  DiagramEngine
> {
  constructor() {
    super("operator-node");
  }

  generateReactWidget(event: any) {
    return <OperatorNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event: any) {
    return new OperatorNodeModel(this.engine);
  }
}

export default OperatorNodeFactory;
