import {
  DefaultLinkModel,
  DefaultPortModel
} from "@projectstorm/react-diagrams";
import OperatorNodeModel from "./OperatorNode/Model";

const checkLoop = (port: PortModel, node: OperatorNodeModel): boolean => {
  const portNode = port.getNode();
  if (portNode === node) return true;
  if (portNode instanceof OperatorNodeModel) {
    const links = Object.values(portNode.outPort.getLinks());
    return links.some((link) =>
      checkLoop(link.getTargetPort() as PortModel, node)
    );
  }
  return false;
};

export default class PortModel extends DefaultPortModel {
  canLinkToPort(port: PortModel) {
    if (!super.canLinkToPort(port)) return false;
    const node = this.getNode();
    if (node instanceof OperatorNodeModel && checkLoop(port, node))
      return false;

    var links = Object.values(port.getLinks());
    if (links.length > 0) links[0].remove();
    return super.canLinkToPort(port);
  }

  createLinkModel(): any {
    if (this.getOptions().in) return null;
    var links = Object.values(this.getLinks());
    if (links.length >= this.getMaximumLinks()) links[0].remove();
    return new DefaultLinkModel();
  }
}
