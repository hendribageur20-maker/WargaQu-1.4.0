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
    "revision": "a572562d32b0b2b38c98e650658cb568"
  }, {
    "url": "pwa-512x512.png",
    "revision": "f73985e4a905ccaa028e03860d4aad40"
  }, {
    "url": "pwa-192x192.png",
    "revision": "1ab841f5021e5012b04d78bcd9235b3c"
  }, {
    "url": "index.html",
    "revision": "3e97b0c8ecfe31b7fe251b8498c5b527"
  }, {
    "url": "icon.svg",
    "revision": "70104031294f24c03152d32fa22c7e61"
  }, {
    "url": "favicon.ico",
    "revision": "20f1cfac19584928d73166e755b17ba6"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "da7917ab581a5e089e4c9bf2389d1ed0"
  }, {
    "url": "404.html",
    "revision": "42e80e9d602b3444214077b77142d806"
  }, {
    "url": "assets/index-DYJ8mHLY.css",
    "revision": null
  }, {
    "url": "assets/index-D1Ith8P9.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "da7917ab581a5e089e4c9bf2389d1ed0"
  }, {
    "url": "favicon.ico",
    "revision": "20f1cfac19584928d73166e755b17ba6"
  }, {
    "url": "icon.svg",
    "revision": "70104031294f24c03152d32fa22c7e61"
  }, {
    "url": "pwa-192x192.png",
    "revision": "1ab841f5021e5012b04d78bcd9235b3c"
  }, {
    "url": "pwa-512x512.png",
    "revision": "f73985e4a905ccaa028e03860d4aad40"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "a572562d32b0b2b38c98e650658cb568"
  }, {
    "url": "manifest.webmanifest",
    "revision": "fda089184a521b6a076ae5ec6573278c"
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
