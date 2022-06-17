import React from "react";
import createEngine, {
  DefaultDiagramState,
  DiagramModel
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import NumericNodeFactory from "./NumericNode/Factory";
import OperatorNodeFactory from "./OperatorNode/Factory";
import NumericNodeModel from "./NumericNode/Model";
import OperatorNodeModel from "./OperatorNode/Model";
import "./styles.css";

const engine = createEngine({ registerDefaultDeleteItemsAction: false });
engine.getNodeFactories().registerFactory(new NumericNodeFactory());
engine.getNodeFactories().registerFactory(new OperatorNodeFactory());

const model = new DiagramModel();
const state = engine.getStateMachine().getCurrentState();
if (state instanceof DefaultDiagramState) {
  state.dragNewLink.config.allowLooseLinks = false;
}

const node1 = new NumericNodeModel(engine, 4);
node1.setPosition(100, 100);

const node2 = new NumericNodeModel(engine, 10);
node2.setPosition(100, 300);

const node3 = new OperatorNodeModel(engine);
node3.setPosition(300, 200);

const node4 = new OperatorNodeModel(engine);
node4.setPosition(300, 400);

const node5 = new OperatorNodeModel(engine);
node5.setPosition(500, 400);

model.addAll(node1, node2, node3, node4, node5);
engine.setModel(model);

export default function App() {
  return <CanvasWidget className="canvas" engine={engine} />;
}
