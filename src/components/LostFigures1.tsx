import React, { FC } from "react";
import { Figure } from "../models/figures/Figure";

interface LostFigures1Props {
  title: string;
  figures: Figure[];
}

const LostFigures1: FC<LostFigures1Props> = ({ title, figures }) => {
  return (
    <div className="lost1">
      <h2>{title}</h2>
      {figures.map((figure) => (
        <div key={figure.id}>
          {figure.name}{" "}
          {figure.logo && <img width={20} height={20} src={figure.logo} />}
        </div>
      ))}
    </div>
  );
};

export default LostFigures1;
