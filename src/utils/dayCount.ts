export function weekdayCount(startDate: Date, endDate: Date) {
  enum Day {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
  }

  const result = new Map<Day, number>([
    [Day.Sunday, 0],
    [Day.Monday, 0],
    [Day.Tuesday, 0],
    [Day.Wednesday, 0],
    [Day.Thursday, 0],
    [Day.Friday, 0],
    [Day.Saturday, 0],
  ]);

  const dayCount = Math.ceil(Math.abs(endDate.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24))+1; 

  for(let i=0; i<dayCount; i++) {
    const day = (startDate.getDay() + i) % 7;
    result.set(day, result.get(day)! + 1);
  }

  return result;
}
