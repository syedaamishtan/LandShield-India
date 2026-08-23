// TerraGuard API configuration.
// Change only this URL when the GeoGuard backend tunnel/host changes.
window.TERRAGUARD_CONFIG = {
  API_URL: "https://pirates-pursuant-filtering-enough.trycloudflare.com"
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

// TerraGuard is created dynamically by terragaurd.js after app.js has already
// cached the original .page NodeList. When another sidebar item is clicked,
// app.js hides only the original pages, so the dynamic TerraGuard page would
// otherwise remain visible at the bottom of the new page. Use event delegation
// on the nav list to remove it whenever a non-TerraGuard page is selected.
(function fixTerraGuardNavigation(){
  function install(){
    var navList = document.getElementById('navList');
    if(!navList || navList.dataset.tgNavFix === '1') return;
    navList.dataset.tgNavFix = '1';

    navList.addEventListener('click', function(event){
      var item = event.target.closest('.nav-item');
      if(!item) return;
      if(item.getAttribute('data-page') !== 'terragaurd'){
        var page = document.getElementById('page-terragaurd');
        if(page) page.classList.remove('active');
      }
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
})();
