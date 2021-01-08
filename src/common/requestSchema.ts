// import queryString from 'query-string';
// import download from 'download';

type GeneralGetWithParamsQuery = (url: string, data?: { [key: string]: any }) => Promise<any>;
type GeneralPostPutWithBodyQuery = GeneralGetWithParamsQuery;
type GeneralPostPutWithFormQuery = (url: string, data?: FormData) => Promise<any>;

const parseJson = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    if (response.status === 204) {
      return {};
    }
    return response.json();
  }
  if (response.status >= 400 && response.status < 600) {
    return response.text().then(text => {
      throw new Error(`${response.status} ${response.statusText}: ${text}`);
    });
  }
  throw new Error(`${response.status} ${response.statusText}: Unexpected status code`);
};

const parseText = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    if (response.status === 204) {
      return {};
    }

    return response.text();
  }
  if (response.status >= 400 && response.status < 600) {
    return response.text().then(text => {
      throw new Error(`${response.status} ${response.statusText}: ${text}`);
    });
  }
  throw new Error(`${response.status} ${response.statusText}: Unexpected status code`);
};

const baseHeaders = () => {
  const base: { [key: string]: string } = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  let authToken;
  try {
    authToken = JSON.parse(localStorage.getItem('user') || '').token;
  } catch (_) {
    authToken = undefined;
  }
  if (authToken) {
    base.AUTHORIZATION = `Token ${authToken}`;
  }
  return base;
};

const baseHeadersForm = () => {
  const base: { [key: string]: string } = {};
  let authToken;
  try {
    authToken = JSON.parse(localStorage.getItem('user') || '').token;
  } catch (_) {
    authToken = undefined;
  }
  if (authToken) {
    base.AUTHORIZATION = `Token ${authToken}`;
  }
  return base;
};

export const encodeObjectAsQueryString = (obj: { [key: string]: any } = {}) => {
  return Object
    .keys(obj)
    .filter(k => obj[k] !== null && obj[k] !== undefined)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(typeof obj[k] === 'object' ? JSON.stringify(obj[k]) : obj[k])}`)
    .join('&');
};

export const getPlainTextWithQuery: GeneralGetWithParamsQuery = (url, data = {}) => {
  const options = {
    method: 'get',
    headers: {
      Accept: 'text/csv',
      ...baseHeaders(),
    },
  };

  return fetch(`${encodeURI(url)}?${encodeObjectAsQueryString(data)}`, options).then(parseText);
};

export const getJsonWithQuery: GeneralGetWithParamsQuery = (url, data = {}) => {
  const options = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      ...baseHeaders(),
    },
  };

  return fetch(`${encodeURI(url)}?${encodeObjectAsQueryString(data)}`, options).then(parseJson);
};

export const getJsonWithQueryAndToken: GeneralGetWithParamsQuery = (url, data) => {
  const options = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      ...baseHeaders(),
      AUTHORIZATION: 'Token d4d011c4c3643be5501872a6b507fcfaaac42d43',
    },
  };

  return fetch(`${encodeURI(url)}?${encodeObjectAsQueryString(data)}`, options).then(parseJson);
};

export const putJson: GeneralPostPutWithBodyQuery = (url, data) => {
  const options = {
    method: 'put',
    headers: {
      ...baseHeaders(),
    },
    body: JSON.stringify(data),
  };
  return fetch(url, options).then(parseJson);
};

export const postJson: GeneralPostPutWithBodyQuery = (url, data) => {
  const options = {
    method: 'post',
    headers: {
      ...baseHeaders(),
    },
    body: JSON.stringify(data),
  };
  return fetch(url, options).then(parseJson);
};

export const deleteJson: GeneralPostPutWithBodyQuery = (url, data) => {
  const options = {
    method: 'delete',
    headers: {
      ...baseHeaders(),
    },
    body: JSON.stringify(data),
  };
  return fetch(url, options).then(parseJson);
};

const downloadFile = (filename: string) => (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.blob().then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      if (!link || !link.parentNode) {
        throw new Error();
      }
      link.parentNode.removeChild(link);
      return new Response();
    });
  }
  if (response.status >= 400 && response.status < 600) {
    return response.text().then(text => {
      throw new Error(`${response.status} ${response.statusText}: ${text}`);
    });
  }
  throw new Error(`${response.status} ${response.statusText}: Unexpected status code`);
};

/**
 * Helper function to call an api with `get` method and tranlate the text response as a download.
 * @param url `string` Api endpoint.
 * @param data `object` This this the query param. A filename filed will be processed if set, after which the filed will deleted, and the value will be set as the default download filename.
 */
export const getCSVWithQuery = (url: string, data?: { [key: string]: any }) => {
  const options = {
    method: 'get',
    headers: {
      Accept: 'text/csv',
      ...baseHeaders(),
    },
  };
  let filename = 'download.csv';
  if (data) {
    filename = data.filename;
    delete data.filename;
  }
  return fetch(`${encodeURI(url)}?${encodeObjectAsQueryString(data)}`, options).then(downloadFile(filename));
};

export const postForm: GeneralPostPutWithFormQuery = (url, data) => {
  const options = {
    method: 'post',
    headers: {
      ...baseHeadersForm(),
    },
    body: data,
  };
  return fetch(url, options).then(parseJson);
};

export const putForm: GeneralPostPutWithFormQuery = (url, data) => {
  const options = {
    method: 'put',
    headers: {
      ...baseHeadersForm(),
    },
    body: data,
  };
  return fetch(url, options).then(parseJson);
};

export const fetchFile = (url: string, data: string) => {
  const options = {
    method: 'get',
    headers: {
      ...baseHeaders(),
      Accept: ['application/pdf', 'image/jpeg', 'image/png'].join(','),
    },
  };
  return fetch(`${url}/${data}`, options).then((res: Response) => res.blob());
};
