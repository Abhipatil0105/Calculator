import React, { FC } from "react";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import * as S from "../styled";
import NumbericNodeModel from "./Model";

export interface NumbericNodeWidgetProps {
  node: NumbericNodeModel;
  engine: DiagramEngine;
}

const NumbericNodeWidget: FC<NumbericNodeWidgetProps> = ({ engine, node }) => {
  return (
    <S.Widget>
      <S.Port
        style={{ right: -4, top: "50%" }}
        port={node.outPort}
        engine={engine}
      />
      <S.Input
        value={node.value}
        onChange={(e) => node.setValue(+e.target.value)}
      />
    </S.Widget>
  );
};

export default NumbericNodeWidget;
