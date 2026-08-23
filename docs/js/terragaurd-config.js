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

// Keep the About page aligned with the actual LandShield India V1 project.
(function updateAboutSection(){
  function install(){
    var page = document.getElementById('page-about');
    if(!page || page.dataset.aboutUpdated === '1') return;
    var card = page.querySelector('.card');
    if(!card) return;
    card.innerHTML = `
      <div class="card-title">About LandShield India</div>
      <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.7;">
        LandShield India is an AI-assisted landslide susceptibility assessment and field-verification platform for North-East and hill-state India, developed under SIH26001. The current V1 system uses an XGBoost binary classifier to estimate landslide susceptibility from terrain and historical landslide-inventory features.
      </p>
      <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.7;margin-top:10px;">
        The platform brings the model output into an operational interface with an interactive risk map, elevated-risk views, field report submission, analytics, and TerraGuard Intelligence for AI-assisted assessment of uploaded satellite or aerial imagery. TerraGuard connects the frontend to the GeoGuard AI service for image-based assessment and recommendations.
      </p>
      <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.7;margin-top:10px;">
        V1 is based on 6,707 cleaned GSI sample records covering 16 states/UTs: 2,223 documented landslide points and 4,484 background points. The model uses elevation, terrain slope, historical landslide density, and distance to the nearest documented landslide, with a spatial train/test split by 0.5° grid cell rather than a random split.
      </p>
      <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.7;margin-top:10px;">
        LandShield is a decision-support and assessment system, not a replacement for official disaster warnings or confirmed ground observations. Model scores represent susceptibility estimates, while field reports provide a pathway for ground verification.
      </p>
    `;
    page.dataset.aboutUpdated = '1';
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
})();
