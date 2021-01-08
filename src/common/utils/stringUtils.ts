/* eslint-disable no-extend-native */
import moment from 'moment';
import queryString from 'query-string';

export function localizeDateTime(dateStr: string, format = 'YYYY-MM-DD HH:mm') {
  if (!dateStr) return '';
  return moment(dateStr).format(format);
}

export function standardizeLocalDateTime(dateStr: string) {
  return moment.utc(dateStr).format();
  // return dateStr;
}

export function standardizeLocalDateTimeToFormat(dateStr: string, format: string) {
  return moment.utc(dateStr).format(format);
}

/**
 * This function will try to get the nested field value in `obj` according to the order of field name defined in `propertyArray`.
 * In the process tracing, upon any value of the field in the `propertyArray`, the function will return `undefined`.
 * @param obj The object to operate on.
 * @param propertyArray An array of filed names.
 */
export function propertyPathTracer(obj: { [key: string]: any } | string, propertyArray: string[] = []) {
  if ((propertyArray.length === 0 && propertyArray[0] === '') || typeof obj === 'string') {
    return obj;
  }
  let propertyValue;
  propertyValue = obj[propertyArray[0]];
  for (const property of propertyArray.slice(1)) {
    if (!propertyValue) {
      return propertyValue;
    }
    propertyValue = propertyValue[property];
  }

  return propertyValue;
}

export const queryStringParse = (rawQueryString: string, shouldParseInt: boolean = true, allowedKeys?: string[]) => {
  const queryObject = queryString.parse(rawQueryString);
  const intParsedQueryObejct: { [key: string]: string | number } = {};
  Object.keys(queryObject).forEach(key => {
    if (allowedKeys) {
      const isLegitimateKey = allowedKeys.includes(key);
      if (!isLegitimateKey) {
        return;
      }
    }
    const parseIntResult = parseInt(queryObject[key] as string, 10);
    if (parseIntResult && /^[0-9]+$/.test(queryObject[key] as string) && shouldParseInt) {
      intParsedQueryObejct[key] = parseIntResult;
    } else {
      intParsedQueryObejct[key] = queryObject[key] as string;
    }
  });
  return intParsedQueryObejct;
};

export const formatCurrency = (amount: number, currency?: string) => {
  if (!currency) {
    return amount;
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency,
  });
  return formatter.format(amount);
};

export function getExtension(fileName: string) {
  return fileName.split('.').pop()?.toLocaleLowerCase();
}

export const safeStringSpliter = (string: string, seperater: string) => {
  if (!string || string === '') return [];
  return string.split(seperater);
};

export const parseIDTrace = (idTrace: string, separator = '-') => {
  try {
    const idArray = idTrace.split(separator);
    return idArray;
  } catch {
    return false;
  }
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

declare global {
  // tslint:disable-next-line
  interface JSON {
    safeParse: (jsonString: string) => object | false;
  }
}

JSON.safeParse = (jsonString: string) => {
  if (typeof jsonString !== 'string') {
    return false;
  }
  try {
    const jsonObject = JSON.parse(jsonString);
    return typeof jsonObject === 'object' ? jsonObject : {};
  } catch (e) {
    return false;
  }
};

String.prototype.trimToLength = function(stringMaxLength: number, addEllipsis = false) {
  let returnValue = this;
  if (this.length > stringMaxLength) {
    returnValue = this.slice(0, stringMaxLength - 1);
    if (addEllipsis) {
      returnValue = `${returnValue}...`;
    }
  }
  return returnValue;
};

String.prototype.format = function() {
  const args = arguments;
  let invokeNumber = 0;
  return this.replace(/\$\{[A-Za-z0-9_]*\}/g, () => {
    const newSubString = args[invokeNumber];
    invokeNumber += 1;
    return newSubString;
  });
};

String.prototype.replaceAt = function(index: number, replacedBy: string) {
  return this.substr(0, index) + replacedBy + this.substr(index + 1);
};
