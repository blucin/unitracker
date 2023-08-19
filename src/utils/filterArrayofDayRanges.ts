export interface DateRange {
  start: Date;
  end: Date;
}
/**
 * @param {Array<{start: Date, end: Date}>} dateRanges
 * @returns {Array<{start: Date, end: Date}>}
 * @description
 * 1. Sort the ranges by start date
 * 2. Iterate over the ranges
 * 3. If the current range overlaps with the previous range, then merge them
 * 4. Else add the current range to the result
 * @example
 * ```js
 * const ranges = [
 * // case1 overlapping ranges
 * { start: new Date("2023-01-01"), 
 *   end: new Date("2023-01-05") }, 
 * { start: new Date("2023-01-03"), 
 *   end: new Date("2023-01-03") },
 * { start: new Date("2023-01-03"), 
 *   end: new Date("2023-01-07") },
 * // case2 single day
 * { start: new Date("2023-12-01"), 
 *   end: new Date("2023-12-01") },
 * // case3 non-overlapping ranges
 * { start: new Date("2023-12-25"), 
 *   end: new Date("2023-12-30") },  
 * ];
 *
 * const result = mergeOverlappingDateRanges(ranges);
 * // result = [{
 * // "start": "2023-01-01T00:00:00.000Z",
 * // "end": "2023-01-07T00:00:00.000Z"
 * // }, {
 * // "start": "2023-12-01T00:00:00.000Z",
 * // "end": "2023-12-01T00:00:00.000Z"
 * // }, {
 * // "start": "2023-12-25T00:00:00.000Z",
 * // "end": "2023-12-30T00:00:00.000Z"
 * // }] 
 * ```
 */
export function mergeOverlappingDateRanges(
  dateRanges: DateRange[]
): DateRange[] {
  if (dateRanges.length <= 1) return dateRanges;

  // sort by start date
  dateRanges.sort((a, b) => a.start.valueOf() - b.start.valueOf());
  const output = [dateRanges[0]!];
  let current = dateRanges[0]!;

  for (let i = 1; i < dateRanges.length; i++) {
    const next = dateRanges[i]!;
    if (current.end.valueOf() >= next.start.valueOf()) {
      current.end = new Date(
        Math.max(current.end.valueOf(), next.end.valueOf())
      );
    } else {
      current = next;
      output.push(current);
    }
  }
  return output;
}
