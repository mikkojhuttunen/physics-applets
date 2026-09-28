(function () {
  var COURSES = {
    'fys232-structure-of-matter': 'FYS.232 Structure of Matter',
    'fys240-optics': 'FYS.240 Optics',
    'fys310-solid-state-physics': 'FYS.310 Solid-State Physics',
    'fys501-laser-physics': 'FYS.501 Laser Physics',
    'finnmath-app': 'FinnMath-app'
  };
  var parts = location.pathname.split('/').filter(Boolean);
  var file = parts[parts.length - 1] || '';
  var folder = parts[parts.length - 2] || '';
  if (!COURSES[folder] || file === 'index.html' || file === '') return;
  if (document.querySelector('.course-back')) return;

  var style = document.createElement('style');
  style.textContent =
    '.course-back{display:inline-block;margin:0 0 14px;padding:2px 0;font:500 15px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;' +
    'color:inherit;opacity:.68;text-decoration:none;-webkit-tap-highlight-color:transparent}' +
    '.course-back:hover,.course-back:focus-visible{opacity:1;text-decoration:underline}';
  document.head.appendChild(style);

  var a = document.createElement('a');
  a.className = 'course-back';
  a.href = 'index.html';
  a.innerHTML = '&larr; ' + COURSES[folder];

  var body = document.body, target = null;
  for (var i = 0; i < body.children.length; i++) {
    var t = body.children[i].tagName;
    if (t !== 'SCRIPT' && t !== 'STYLE' && t !== 'LINK' && t !== 'NOSCRIPT') { target = body.children[i]; break; }
  }
  if (target && /^(DIV|MAIN|SECTION|ARTICLE|HEADER)$/.test(target.tagName)) target.insertBefore(a, target.firstChild);
  else body.insertBefore(a, body.firstChild);
})();
