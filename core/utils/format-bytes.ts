import { SizeUnit, SizeUnits } from "../types/size-units";

export function formatBytes(
  bytes: number,
  decimals = 2
): {
  value: number;
  unit: SizeUnit;
} {
  if (!+bytes) {
    return {
      value: 0,
      unit: "Bytes",
    };
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return {
    value: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
    unit: SizeUnits[i],
  };
}
