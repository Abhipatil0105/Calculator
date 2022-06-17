import { CanvasEngine } from "@projectstorm/react-canvas-core";
import { NodeModel, NodeModelGenerics } from "@projectstorm/react-diagrams";
import NumericNodeModel from "../NumericNode/Model";
import PortModel from "../PortModel";

export enum Operator {
  PLUS = "+",
  MINUS = "-",
  MUL = "*",
  DIV = "/"
}

const operators: Record<Operator, (a: number, b: number) => number> = {
  [Operator.PLUS]: (a: number, b: number) => a + b,
  [Operator.MINUS]: (a: number, b: number) => a - b,
  [Operator.MUL]: (a: number, b: number) => a * b,
  [Operator.DIV]: (a: number, b: number) => a / b
};

class OperatorNodeModel extends NodeModel<NodeModelGenerics> {
  operator = Operator.PLUS;
  outPort = new PortModel(false, "equal");
  aPort = new PortModel(true, "a");
  bPort = new PortModel(true, "b");

  constructor(readonly engine: CanvasEngine) {
    super({ type: "operator-node" });
    this.addPort(this.outPort);

    this.addPort(this.aPort);
    this.aPort.setMaximumLinks(1);

    this.addPort(this.bPort);
    this.bPort.setMaximumLinks(1);
  }

  setOperator = (operator: Operator) => {
    this.operator = operator;
    this.engine.repaintCanvas();
  };

  serialize() {
    return {
      ...super.serialize(),
      operator: this.operator,
      value: this.value
    };
  }

  getNumber(port: PortModel): number {
    const link = Object.values(port.getLinks())[0];
    const node = link?.getSourcePort()?.getNode();
    if (node instanceof NumericNodeModel || node instanceof OperatorNodeModel) {
      return node.value;
    }

    return 0;
  }

  get value() {
    const op = operators[this.operator];
    const a = this.getNumber(this.aPort);
    const b = this.getNumber(this.bPort);
    return op(a, b);
  }
}

export default OperatorNodeModel;
