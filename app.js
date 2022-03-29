/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const ObjectIframe = document.createElement('iframe');

setInterval(() => {
  readyOk();
}, 0);

function readyOk() {

  for (let i = 0; i <= 500; i++) {
    const doc = document.querySelectorAll(`#custom_html-${i}`);
    if (doc.length > 0) {
      doc.forEach((a) => {
        a.style.display = 'none';
      });
    }
    loopCustomhtml(doc);
  }
}

function loopCustomhtml(dc) {
  dc.forEach((a) => {
    if (a.nodeName == 'SCRIPT') {
      loopCustomhtmlScript(a);
    } else {
      loopCustomhtml(a.childNodes);
    }
  });
}

if (document.getElementById('printedit-toolbar')) {
  document.getElementById('printedit-toolbar').remove();
}

if (document.getElementById('savepage-message-panel-container')) {
  document.getElementById('savepage-message-panel-container').remove();
}

function loopCustomhtmlScript(script) {
  let text = script.innerHTML;
  if (text.indexOf('detect()') >= 0) {
    let queryS = text.indexOf('querySelector(');
    if (queryS >= 0) {
      queryS = 14 + queryS;
      text = text.slice(queryS, text.length);
      const parenthe = text.indexOf(')');
      if (parenthe >= 0) {
        text = text.slice(0, parenthe);
        const result = eval(text);
        const search = document.querySelectorAll(result);
        search.forEach((a) => {
          const search_i = a.querySelectorAll('iframe');
          if (search_i.length >= 0) {
            search_i.forEach((b) => {
              b.remove();
            });
          }
          a.appendChild(ObjectIframe);
        });
      }
    }
  }
}
