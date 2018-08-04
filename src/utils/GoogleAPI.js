const api = 'https://maps.googleapis.com/maps/api/js';
const key = 'AIzaSyDp6EaOjIVW_TlxSgwbqkuMTdS3RzADPe8';

export const load = () => {
  const root = document.getElementById('root');
  const googleScriptTag = document.createElement('script');
  googleScriptTag.src = api + `?key=${key}&callback=initAPI`;
  googleScriptTag.async = true; 

  root.after(googleScriptTag);
};