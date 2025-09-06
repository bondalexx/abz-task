export function formatPhoneDisplay(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 12);

  let d = digits;
  if (!d.startsWith("38")) d = "38" + d;
  const p = (i: number, j?: number) => d.slice(i, j);

  let out = "+38";
  if (p(2)) out += ` (${p(2, 5)}`;
  if (d.length >= 5) out += ")";
  if (p(5)) out += ` ${p(5, 8)}`;
  if (p(8)) out += ` - ${p(8, 10)}`;
  if (p(10)) out += ` - ${p(10, 12)}`;
  return out;
}

export function toApiPhone(display: string) {
  const digits = display.replace(/\D/g, "");
  const normalized = digits.startsWith("380")
    ? digits
    : `380${digits.slice(2)}`;
  return `+${normalized.slice(0, 12)}`;
}
