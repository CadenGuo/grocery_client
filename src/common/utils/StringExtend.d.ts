/* tslint:disable */
interface String {
  trimToLength(stringMaxLength: number, addEllipsis: boolean): String;
  /**
   * A js string templating implementation similar to python's String.format or <string> % ().
   * Can be called against on any string. The token to be recongnized matches the pattern: \$\{[A-Za-z0-9_]*\}.
   * @param {string | number} arg Any number of args is acceptable but the substitution will only be applied on the first N args.
   * Where N is the number of the valid token in the string calling this function.
   * @returns a new string with the valid tokens subsituted with the provided args.
   *
   * @example
   * const templateString = 'my name is ${givenName} ${familyName}';
   * const renderedString = templateString.format('Donald', 'Trump');
   * console.log(renderedString); // should get: my name is Donald Trump
   */
  format(...arg?: Array<string | number>): String;
  replaceAt(index: number, replacedBy: string): String;
}
