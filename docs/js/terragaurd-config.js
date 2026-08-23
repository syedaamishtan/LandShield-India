// TerraGuard API configuration.
// Change only this URL when the GeoGuard backend tunnel/host changes.
window.TERRAGUARD_CONFIG = {
  API_URL: "https://scholar-bigger-experts-healthy.trycloudflare.com"
};

// GitHub Pages publishes this app from /docs, so map files are relative to /docs.
// The original local frontend used ../maps; that path becomes a GitHub Pages 404.
(function fixGitHubPagesMapPath(){
  function fix(){
    document.querySelectorAll('iframe.map-frame').forEach(function(frame){
      var src = frame.getAttribute('src') || '';
      if(src.indexOf('../maps/') === 0){
        frame.setAttribute('src', src.replace('../maps/', 'maps/'));
      }
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fix);
  else fix();
})();
