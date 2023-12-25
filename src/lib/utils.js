export function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)'+ // protocol
                             '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                             '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                             '(\\:\\d+)?(\\/[-A-Za-z\\d%_.~+()]*)*'+ // port and path
                             '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                             '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

export function date_str(date) {
  let now = Date.now()/1000;
  let diff = now - date;
  console.log(now, date, diff);
  // very sad
  let ss = Math.floor(diff) % 60;
  let mm = Math.floor(diff / 60) % 60;
  let hh = Math.floor(diff / 60 / 60) % 24;
  let dd = Math.floor(diff / (60 * 60 * 24));
  console.log(dd, hh, mm, ss);
  
  if (dd != 0) { return dd+" day"+(dd != 1 ? 's' : '')+" ago" }
  if (hh != 0) { return hh+" hour"+(hh != 1 ? 's' : '')+" ago" }
  if (mm != 0) { return mm+" minute"+(mm != 1 ? 's' : '')+" ago" }
  if (ss != 0) { return ss+" second"+(ss != 1 ? 's' : '')+" ago" }
  return "just now";
}

