// service worker
if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.');
  navigator.serviceWorker
    .register('../sw.js')
    .then(val => {
      console.log(val);
    })
    .catch(err => {
      console.log(err);
    });
} else {
  console.log('CLIENT: service worker is not supported.');
}
