/** Monday-first calendar rows for a month (0 = Monday column). */
export function getCalendarMatrix(year: number, monthIndex: number): (number | null)[][] {
  const first = new Date(year, monthIndex, 1);
  const mondayOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < mondayOffset; i += 1) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push(d);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }
  return rows;
}

export function formatBookingDate(year: number, monthIndex: number, day: number): string {
  const d = new Date(year, monthIndex, day);
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}
