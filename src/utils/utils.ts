export const fmt = (n: number): string =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(n);

export const fmtDate = (d: string | Date): string =>
  new Date(d).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

export const today = (): string =>
  new Date().toISOString().split("T")[0];

type Item = {
  qty: number | string;
  price: number | string;
};

export const calcTotal = (items: Item[]): number =>
  items.reduce(
    (sum, item) =>
      sum +
      Number(item.qty || 0) * Number(item.price || 0),
    0
  );