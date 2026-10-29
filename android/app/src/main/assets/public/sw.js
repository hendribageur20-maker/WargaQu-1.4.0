/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "402b66900e731ca748771b6fc5e7a068"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "5b7f272ef3bcd9214ae4947ed2ffdeaa"
  }, {
    "url": "pwa-512x512.png",
    "revision": "79b35a46f1bd67abffdb942b48318920"
  }, {
    "url": "pwa-192x192.png",
    "revision": "be0a2554aee589d73aa51a7aa5fb1858"
  }, {
    "url": "index.html",
    "revision": "c4f36e3709571c4670ac68cac2a95a4e"
  }, {
    "url": "icon.svg",
    "revision": "04d5c3f2a300416ce01ff5083e94763a"
  }, {
    "url": "favicon.ico",
    "revision": "ce3a4028934d656e32433c9296932544"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "7487a33b9f12e8f6fe2cbd31a538474b"
  }, {
    "url": "404.html",
    "revision": "42e80e9d602b3444214077b77142d806"
  }, {
    "url": "assets/index-DdnBC66-.css",
    "revision": null
  }, {
    "url": "assets/index-BbCqssFH.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "7487a33b9f12e8f6fe2cbd31a538474b"
  }, {
    "url": "favicon.ico",
    "revision": "ce3a4028934d656e32433c9296932544"
  }, {
    "url": "icon.svg",
    "revision": "04d5c3f2a300416ce01ff5083e94763a"
  }, {
    "url": "pwa-192x192.png",
    "revision": "be0a2554aee589d73aa51a7aa5fb1858"
  }, {
    "url": "pwa-512x512.png",
    "revision": "79b35a46f1bd67abffdb942b48318920"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "5b7f272ef3bcd9214ae4947ed2ffdeaa"
  }, {
    "url": "manifest.webmanifest",
    "revision": "27d591241bfe5416fee321e0ae70900c"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
