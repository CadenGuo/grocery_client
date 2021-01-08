import { propertyPathTracer } from './stringUtils';

export const getUniqArrayByProp = (objArray: any[], key: string) => {
  const propArray = objArray.map(obj => obj[key]);
  const uniqPropArray = propArray.filter((value, index, self) => self.indexOf(value) === index);
  return uniqPropArray.map(value => objArray.find(obj => obj[key] === value));
};

export const objectArrayDeepSearch = <T = any>(
  objArray: T[],
  searchKeyPath: string[],
  searchValue: any,
  recursingKey: string,
  exactMatch: boolean = false,
) => {
  const matchedObjArray: T[] = [];
  const parentTrace: T[] = [];
  const indexTrace: number[] = [];

  const test = (parent: any, objArr: any[]): boolean => {
    let isChildrenHit = false;
    objArr.forEach((obj, index) => {
      if (!exactMatch
        && (propertyPathTracer(obj, searchKeyPath) as string).replace(/\s/g, '').toLowerCase()
        === searchValue.replace(/\s/g, '').toLowerCase()) {
        matchedObjArray.push(obj);
        parentTrace.push(parent);
        indexTrace.push(index);
        isChildrenHit = true;
      } else if (exactMatch
        && propertyPathTracer(obj, searchKeyPath) === searchValue) {
        matchedObjArray.push(obj);
        parentTrace.push(parent);
        indexTrace.push(index);
        isChildrenHit = true;
      }
      if (obj[recursingKey]) {
        if (test(obj, obj[recursingKey])) {
          isChildrenHit = true;
          parentTrace.push(parent);
          indexTrace.push(index);
        }
      }
    });
    return isChildrenHit;
  };

  test(null, objArray);
  return { resultObj: matchedObjArray[0], parentTrace: parentTrace.slice(0, -1), indexTrace };
};

export const objectArrayGetUniq = (arr: { [key: string]: any }[], key: string) => {
  const map = new Map();
  for (const obj of arr) {
    map.set(obj[key], obj);
  }
  return [...map.values()];
};

/**
 * This function merges arrays of two-number array.
 *
 * Mainly used in ticket module => ON_RACK work orders.
 * @example
 * ```typescript
 * const arrayOfArrays = [
 *   [1, 4],
 *   [4, 8],
 *   [5, 10],
 *   [12, 14],
 * ];
 * arrayOf2NumberArrayMerge(arrayOfArrays); // returns [[1, 10], [12, 14]]
 * ```
 */
export const arrayOf2NumberArrayMerge = (arrayOfArrays: [number, number][]) => {
  if (arrayOfArrays.length <= 0) return [];

  // Make the original array sorted and each element sorted as well.
  const sortedArrayOfArrays = arrayOfArrays
    .map(array => array.sort((a, b) => a - b))
    .sort(
      (a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1],
    );

  return sortedArrayOfArrays.reduce<[number, number][]>((acc, curr) => {
    const lastRecordInAcc = acc.slice(-1)[0];
    if (!lastRecordInAcc) {
      acc.push(curr);
      return acc;
    } else if (lastRecordInAcc[1] >= curr[0] || lastRecordInAcc[1] + 1 === curr[0]) {
      acc[acc.length - 1] = [lastRecordInAcc[0], curr[1]];
      return acc;
    }
    acc.push(curr);
    return acc;
  }, []);
};
