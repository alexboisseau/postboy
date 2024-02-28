export const SizeUnits = [
  "Bytes",
  "KB",
  "MB",
  "GB",
  "TB",
  "PB",
  "EB",
  "ZB",
  "YB",
] as const;

export type SizeUnit = (typeof SizeUnits)[number];
