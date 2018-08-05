const api = 'https://maps.googleapis.com/maps/api/js';
const key = 'AIzaSyDp6EaOjIVW_TlxSgwbqkuMTdS3RzADPe8';

/*
* @description: Loads the Google Map API script and
* adds it to the page
*/
export const load = () => {
  // Creates a promise to make sure the script gets loaded
  // before the api gets used
  return new Promise((resolve, reject) => {
    const root = document.getElementById('root');
    const googleScriptTag = document.createElement('script');
    googleScriptTag.src = api + `?key=${key}`;
    googleScriptTag.async = true;

    googleScriptTag.addEventListener('load', () => { resolve()});
    googleScriptTag.addEventListener('error', (e) => { reject(e)});

    root.after(googleScriptTag);
  });
};