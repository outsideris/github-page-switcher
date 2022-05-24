/**
 * Copyright (c) 2018 JeongHoon Byun aka "Outsider", <http://blog.outsider.ne.kr/>
 * Licensed under the MIT license.
 * <http://outsider.mit-license.org/>
 */
const makeUrl = () => {
  // check whether github repo or github page
  const { host, pathname } = window.location;
  if (host === 'github.com') {
    const regexp = /github\.com\/([\w-]+)\/([\w-]+)/;
    const currentUrl = host + pathname;
    const matched = currentUrl.match(regexp);

    return matched ? `https://${matched[1]}.github.io/${matched[2]}/` : null;
  }

  if (/github\.io/.test(host)) {
    const regexp = /([\w-]+)\.github.io\/([\w-]+)\//;
    const currentUrl = host + pathname;
    const matched = currentUrl.match(regexp);

    return `https://github.com/${matched[1]}/${matched[2]}/`;
  }

  return null;
};

const checkRepoOrPage = (url) => new Promise((resolve) => {
  chrome.runtime.sendMessage({ url }, (response) => {
    resolve(response.exist);
  });
});

const makeButton = (url) => {
  let text = '';
  let alt = '';

  if (window.location.host === 'github.com') {
    text = 'P';
    alt = 'go to the github page';
  } else if (/github\.io/.test(window.location.host)) {
    text = 'R';
    alt = 'Go to the github repository';
  }

  const btn = document.createElement('a');
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

const url = makeUrl();
if (url) {
  checkRepoOrPage(url)
    .then((isExist) => {
      if (isExist) {
        makeButton(url);
      }
    });
}
