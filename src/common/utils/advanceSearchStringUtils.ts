type IValueOperator = '=' | '>=' | '<=' | 'CONTAINS' | 'IN' | '!=' | '!CONTAINS' | '!IN';
type ILogicOperator = '&' | '|';

export const getValueExpression = (fieldName: string, value?: string | number, operator?: IValueOperator): string => {
  if (!fieldName || fieldName === '') {
    return value as string;
  }
  return `${fieldName} ${operator} "${value}"`;
};

export const getEqualExpression = (fieldName: string, value: string) => {
  return `${fieldName} = "${value}"`;
};

export const getCombinedExpresstion = (expressions: string[], operator: ILogicOperator): string => {
  return expressions.filter(expression => expression).join(operator);
};

export const getOrExpression = (...expressions: string[]) => {
  return expressions
    .filter(expression => expression)
    .join('||');
};

export const getAndExpression = (...expressions: string[]) => {
  return expressions
    .filter(expression => expression)
    .join('&');
};

export const getAdvancedQueryFromObject = (
  obj: { [key: string]: string | number },
  operator: IValueOperator = '=',
  combinePolicy: ILogicOperator = '&',
) => {
  const valueExpressions = Object
  .entries(obj)
  .filter(entry => entry[1])
  .map(entry => getValueExpression(entry[0], entry[1], operator));
  const queryString = getCombinedExpresstion(valueExpressions, combinePolicy);
  return queryString;
};
