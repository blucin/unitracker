import _ from "lodash";
import type { RouterOutput } from "~/server/api/root";

/**
 * @description Calculates the minimum and maximum attendance of the given data
 * @param data The attendance data
 * @returns The minimum and maximum attendance name and % value for lab and theory separately
 * @example
 * const data = {
 *  theory: {
 *    "Subject 1": 80,
 *    "Subject 2": 90,
 *    "Subject 3": 70,
 *  },
 *  lab: {
 *    "Subject 1": 80,
 *    "Subject 2": 90,
 *    "Subject 3": 70,
 *  },
 * };
 * const result = calculateMinMaxAttendance(data);
 * console.log(result);
 * // {
 * //   theoryMaxName: "Subject 2",
 * //   labMaxName: "Subject 2",
 * //   theoryMinName: "Subject 3",
 * //   labMinName: "Subject 3",
 * //   theoryMax: 90,
 * //   labMax: 90,
 * //   theoryMin: 70,
 * //   labMin: 70,
 * // }
 */
export function calculateMinMaxAttendance(
  data: RouterOutput["attendance"]["getByRange"] | undefined
) {
  // if there are multiple subjects with same attendance, return the last one
  // if there are no subjects, return "-"
  let theoryMaxName = "-";
  let labMaxName = "-";
  let theoryMinName = "-";
  let labMinName = "-";
  let theoryMax = 0;
  let labMax = 0;
  let theoryMin = 100;
  let labMin = 100;

  if (data) {
    _.map(data.theory, (value, key) => {
      if (value > theoryMax) {
        theoryMax = value;
        theoryMaxName = key;
      }

      if (value < theoryMin) {
        theoryMin = value;
        theoryMinName = key;
      }
    });

    _.map(data.lab, (value, key) => {
      if (value > labMax) {
        labMax = value;
        labMaxName = key;
      }

      if (value < labMin) {
        labMin = value;
        labMinName = key;
      }
    });
  }
  return {
    theoryMaxName,
    labMaxName,
    theoryMinName,
    labMinName,
    theoryMax,
    labMax,
    theoryMin,
    labMin,
  };
}
