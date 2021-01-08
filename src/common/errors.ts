const ERROR_UNKNOWN = 'ERROR_UNKNOWN';
const ERROR_PARAMS = 'ERROR_PARAMS';

const genericError = (error: Error) => {
  // tslint:disable-next-line
  console.log(error.message);
  return 'Internal Error. Please contact administrator';
};

const getErrorMsg = (error: string) => {
  switch (error) {
    case ERROR_UNKNOWN:
      return 'Unknown error occured. Please contact the administrator';
    case ERROR_PARAMS:
      return 'Invalid parameters passed';
    default:
      return error;
  }
};

export { genericError };
export default getErrorMsg;
