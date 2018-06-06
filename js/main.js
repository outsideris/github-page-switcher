/**
 * Copyright (c) 2018 JeongHoon Byun aka "Outsider", <http://blog.outsider.ne.kr/>
 * Licensed under the MIT license.
 * <http://outsider.mit-license.org/>
 */
(function() {
  'use strict';

  var makeUrl = function() {
    // check whether github repo or github page
    var regexp, currentUrl, matched;
    if (location.host === 'github.com') {
      regexp = /github\.com\/([\w-]+)\/([\w-]+)/;
      currentUrl = location.host + location.pathname;
      matched = currentUrl.match(regexp);

      return matched ? 'https://' + matched[1] + '.github.io/' + matched[2] + '/' : null;
    } else if (/github\.io/.test(location.host)) {
      regexp = /([\w-]+)\.github.io\/([\w-]+)\//;
      currentUrl = location.host + location.pathname;
      matched = currentUrl.match(regexp);

      return 'https://github.com/' + matched[1] + '/' + matched[2] + '/';
    }
  };

  var checkRepoOrPage = function(url) {
    var options = { method: 'HEAD' };
    return fetch(url, options)
      .then(function(response) {
        if (response.status !== 200) {
          return false;
        }

        return true;
      });
  }

  var makeButton = function(url) {
    var text = '',
        alt = '';

    if (location.host === 'github.com') {
      text = 'P';
      alt = 'go to the github page';
    } else if (/github\.io/.test(location.host)) {
      text = 'R';
      alt = 'Go to the github repository';
    }

    var btn = document.createElement('a');
    btn.textContent = text;
    btn.setAttribute('title', alt);
    btn.setAttribute('href', url);
    btn.style.position = 'fixed';
    btn.style.right = '20px';
    btn.style.bottom = '20px';
    btn.style.backgroundColor = '#333332';
    btn.style.color = '#fff';
    btn.style.width = '30px';
    btn.style.height = '30px';
    btn.style.fontWeight = 700;
    btn.style.fontSize = '25px';
    btn.style.textAlign = 'center';
    btn.style.lineHeight = '30px';

    document.querySelector('body').appendChild(btn);
  };

  var url = makeUrl();
  if (url) {
    checkRepoOrPage(url)
      .then(function(isExist) {
        if (isExist) {
          makeButton(url);
        }
      });
  }

})();

