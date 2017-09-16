export function storeToken(token) {
  return storageAvailable('localStorage') ? localStorage.setItem('varcityToken', token) : null;
}

export function getToken() {
  return storageAvailable('localStorage') ? localStorage.getItem('varcityToken') : { code: 401, error: 'No Authorization Found' };
}

export function storageAvailable(type) {
  try {
      var storage = window[type],
          x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          storage.length !== 0;
  }
}