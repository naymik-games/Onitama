var cacheName = 'Space Cadet v1.00';
var filesToCache = [
  '/',
  '/index.html',
  '/game.js',
  '/phaser.min.js',
  '/manifest.json',
  '/sw.js',


  '/assets/fonts/KenneyPixelSquare.tff',
  '/assets/fonts/KenneyMiniSquare.tff',
  '/assets/fonts/Gamer.tff',

  '/assets/classes/settings.png',
  '/assets/classes/deck.png',
  '/assets/classes/hand.png',

  '/assets/scenes/preload.png',
  '/assets/scenes/startGame.png',
  '/assets/scenes/UI.png',



  '/assets/sprites/68x68-scanFlash.png',
  '/assets/sprites/256x32-power-critical.png',
  '/assets/sprites/144x44-explosions.png',

  '/assets/sprites/armor_icons.png',
  '/assets/sprites/blank.png',
  '/assets/sprites/cards.png',
  '/assets/sprites/caution.png',
  '/assets/sprites/cell.png',
  '/assets/sprites/crate_explode.png',
  '/assets/sprites/dialogue.png',
  '/assets/sprites/door_back.png',
  '/assets/sprites/explosion.png',
  '/assets/sprites/powerups.png',
  '/assets/sprites/radiation.png',
  '/assets/sprites/ranks.png',
  '/assets/sprites/scan.png',
  '/assets/sprites/smallscan.png',
  '/assets/sprites/star_back.png',





  //'https://cdn.jsdelivr.net/gh/photonstorm/phaser@3.10.1/dist/phaser.min.js'
];
self.addEventListener('install', function (event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function (err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});