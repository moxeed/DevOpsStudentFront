/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
const req = window.XMLHttpRequest
  ? new XMLHttpRequest()
  : new ActiveXObject("Microsoft.XMLHTTP");

req.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE) {
    window.config = JSON.parse(this.responseText);
  }
};
req.open("GET", "/config.json", false);
req.send();
