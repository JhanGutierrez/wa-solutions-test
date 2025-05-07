export interface ColorZones {
  redZone: number;
  yellowZone: number;
  greenZone: number;
}

export const getColor = (
  netFlow: number,
  makeToOrder: number,
  colorZones: ColorZones
) => {
  const total = netFlow + makeToOrder;
  const { redZone, yellowZone, greenZone } = colorZones;

  if (total === 0) return "bg-cell-black";
  if (total >= 1 && total <= redZone) return "bg-cell-red";
  if (total <= redZone + yellowZone) return "bg-cell-yellow";
  if (total <= redZone + yellowZone + greenZone) return "bg-cell-green";
  return "bg-cell-blue";
};
