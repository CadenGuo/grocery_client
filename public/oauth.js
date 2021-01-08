/* global gapi */
function initSigninV2() {
  gapi.auth2.init({
    client_id: '334346548322-ue45fgph5mkqhub36i6mn8or7sq5mg25.apps.googleusercontent.com',
    scope: 'profile email',
  });
}

function gglOauthOnload() { // eslint-disable-line
  gapi.load('auth2', initSigninV2);
}
