import _ from "lodash";
import type { RouterOutput } from "~/server/api/root";

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
