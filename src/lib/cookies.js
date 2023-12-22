export function setCookie(c_name, value, exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
  console.log(document.cookie);
}

export function getCookie(name) {
      const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  console.log(document.cookie);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

