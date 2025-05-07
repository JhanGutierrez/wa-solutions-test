import { FC, useMemo } from "react";
import { getColor } from "../utils/getColor";
import { useSelectedColumn } from "../store/index";

type ColorKey = "red" | "yellow" | "green" | "blue" | "black";
interface ColorCount {
  count: number;
  bgClass: string;
}

const colorKeys: ColorKey[] = ["red", "yellow", "green", "blue", "black"];

const colorNames: Record<ColorKey, string> = {
  red: "Rojo",
  yellow: "Amarillo",
  blue: "Azul",
  green: "Verde",
  black: "Negro",
};

const Summary: FC = () => {
  const column = useSelectedColumn();
  const total = Object.keys(column).length;

  /**
   * Calculates the count of elements by color category
   */
  const colorCounts = useMemo(() => {
    // Initialize counters for each color
    const counts: Record<ColorKey, ColorCount> = colorKeys.reduce(
      (acc, key) => {
        acc[key] = { count: 0, bgClass: `bg-cell-${key}` };
        return acc;
      },
      {} as Record<ColorKey, ColorCount>
    );

    // Count elements by color
    for (const item of Object.values(column)) {
      const color = getColor(item.NetFlow, item.MakeToOrder, {
        redZone: item.RedZone,
        yellowZone: item.YellowZone,
        greenZone: item.GreenZone,
      });
      const key = color.split("-")[2] as ColorKey;
      counts[key].count++;
    }

    return counts;
  }, [column]);

  return (
    <div className="border border-border rounded-lg w-full shadow-md overflow-hidden bg-card">
      <div className="bg-primary text-primary-foreground px-3 py-2 font-semibold text-lg">
        Resumen
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {colorKeys.map((key) => {
            const { count, bgClass } = colorCounts[key];
            const percentage = total
              ? ((count / total) * 100).toFixed(1)
              : "0.0";

            return (
              <div key={key} className="grid grid-cols-8 items-center gap-2">
                <div className={`col-span-2 font-semibold`}>
                  {colorNames[key]}
                </div>

                <div className="col-span-1 text-center font-semibold">
                  {count}
                </div>

                <div className="col-span-4">
                  <div className={`w-full bg-muted rounded-full h-2`}>
                    <div
                      className={`h-2 rounded-full ${bgClass}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="col-span-1 text-right text-sm text-muted-foreground">
                  {percentage}%
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
          <div className="text-lg font-semibold">Total</div>
          <div className="bg-accent text-accent-foreground py-1 px-3 rounded-full font-bold">
            {total}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
