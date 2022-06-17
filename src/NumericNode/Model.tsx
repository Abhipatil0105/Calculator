import { CanvasEngine } from "@projectstorm/react-canvas-core";
import { NodeModel, NodeModelGenerics } from "@projectstorm/react-diagrams";
import PortModel from "../PortModel";

class NumericNodeModel extends NodeModel<NodeModelGenerics> {
  value = 0;
  outPort = new PortModel(false, "out");

  constructor(readonly engine: CanvasEngine, value: number) {
    super({ type: "numeric-node" });
    this.addPort(this.outPort);
    this.value = value;
  }

  setValue(value: number | string) {
    this.value = isNaN(+value) ? 0 : +value;
    this.engine.repaintCanvas();
  }

  serialize() {
    return {
      ...super.serialize(),
      value: this.value
    };
  }
}

export default NumericNodeModel;
