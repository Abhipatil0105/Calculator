import React, { FC } from "react";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import Select from "react-select";
import * as S from "../styled";
import OperatorNodeModel, { Operator } from "./Model";

export interface OperatorNodeWidgetProps {
  node: OperatorNodeModel;
  engine: DiagramEngine;
}

const options = Object.values(Operator).map((value) => ({
  value,
  label: value
}));

const OperatorNodeWidget: FC<OperatorNodeWidgetProps> = ({ engine, node }) => {
  return (
    <S.Widget>
      <S.Port port={node.aPort} engine={engine} style={{ left: -4, top: 12 }} />
      <S.Port
        port={node.bPort}
        engine={engine}
        style={{ left: -4, bottom: 12 }}
      />
      <S.Port
        port={node.outPort}
        engine={engine}
        style={{ right: -4, top: "50%" }}
      />
      <Select
        options={options}
        value={options.find((v) => v.value === node.operator)}
        onChange={(item) => item && node.setOperator(item.value)}
      />
      <S.Result>{+node.value.toFixed(2)}</S.Result>
    </S.Widget>
  );
};

export default OperatorNodeWidget;
