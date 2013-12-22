/**
 * Copyright (c) 2013 JeongHoon Byun aka "Outsider", <http://blog.outsider.ne.kr/>
 * Licensed under the MIT license.
 * <http://outsider.mit-license.org/>
 */
(function() {
  'use strict';

  var makeUrl = function() {
    // check whether github repo or github page
    var regexp, currentUrl, matched;
    if (location.host === 'github.com') {
      regexp = /github\.com\/(\w+)\/(\w+)/;
      currentUrl = location.host + location.pathname;
      matched = currentUrl.match(regexp);

      return 'http://' + matched[1] + '.github.io/' + matched[2];
    } else if (/github\.io/.test(location.host)) {
      regexp = /(\w+)\.github.io\/(\w+)\//;
      currentUrl = location.host + location.pathname;
      matched = currentUrl.match(regexp);

      return 'https://github.com/' + matched[1] + '/' + matched[2];
    }
  };

  var checkRepoOrPage = function(url, callback) {
    $.ajax({
      type: 'HEAD',
      async: true,
      url: url,
      success: function() {
        callback(true);
      },
      error: function() {
        callback(false);
      }
    });
  };

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

    $('<a>').text(text).attr('title', alt)
      .attr('href', url)
      .css({
        position:'fixed',
        right: '20px',
        bottom: '20px',
        backgroundColor: '#333332',
        color: '#fff',
        width: '30px',
        height: '30px',
        fontWeight: 700,
        fontSize: '25px',
        textAlign: 'center',
        lineHeight: '30px'
      }).appendTo('body');
  };

  var url = makeUrl();
  if (url) {
    checkRepoOrPage(url, function(isExist) {
      if (isExist) {
        makeButton(url);
      }
    });
  }

})();

