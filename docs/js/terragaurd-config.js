// TerraGuard API configuration.
// Change only this URL when the GeoGuard backend tunnel/host changes.
window.TERRAGUARD_CONFIG = {
  API_URL: "https://members-rental-face-rather.trycloudflare.com"
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

// Keep the About page aligned with the actual SIH26001 problem statement
// without claiming that V1 already implements every planned capability.
(function updateAboutSection(){
  function install(){
    var page = document.getElementById('page-about');
    if(!page || page.dataset.aboutUpdated === '1') return;
    var card = page.querySelector('.card');
    if(!card) return;
    card.innerHTML = `
      <div class="card-title">About LandShield India</div>
      <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.7;">
        LandShield India is an AI-assisted, GIS-enabled decision-support platform developed for SIH26001: <strong>Intelligent Identification of Hazard-Based Red Zones, Carrying Capacity Assessment, and Immediate Relocation Needs for Vulnerable Habitations.</strong> The broader objective is to support evidence-based disaster-management decisions by identifying unsafe areas, assessing safer alternatives, and helping authorities prioritize vulnerable habitations for relocation.
      </p>
      <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.7;margin-top:10px;">
        The problem statement is multi-hazard in scope, covering hazards such as landslides, floods, coastal erosion, and cloudbursts. LandShield is being structured as a platform for hazard-based Red Zone identification, safer-site assessment, and relocation planning rather than as a system limited to North-East India.
      </p>
      <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.7;margin-top:10px;">
        The current V1 implementation operationalizes the landslide-susceptibility component of that broader objective. It uses an XGBoost binary classifier trained on 6,707 cleaned GSI sample records across 16 states/UTs: 2,223 documented landslide points and 4,484 background points. V1 uses elevation, terrain slope, historical landslide density, and distance to the nearest documented landslide, with a spatial train/test split by 0.5° grid cell rather than a random split.
      </p>
      <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.7;margin-top:10px;">
        The platform currently provides risk mapping, elevated-risk views, analytics, field-report submission, and TerraGuard Intelligence for AI-assisted image assessment. Future expansion can extend these capabilities toward multi-hazard Red Zone mapping, carrying-capacity assessment, safer relocation-site prioritization, and short-, medium-, and long-term relocation support described in the problem statement.
      </p>
      <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.7;margin-top:10px;">
        LandShield is a decision-support and assessment system, not a replacement for official disaster warnings or confirmed ground observations. Model scores are susceptibility estimates, while field reports provide a pathway for ground verification.
      </p>
    `;

    // Remove the old geographic limitation from the persistent sidebar summary.
    var foot = document.querySelector('.sidebar-foot-text');
    if(foot){
      foot.innerHTML = '6,707 GSI sample points<br>16 states/UTs covered in V1';
    }

    // Make the dashboard scope explicit without overstating the current V1 model.
    var dashboard = document.getElementById('page-dashboard');
    if(dashboard){
      var intro = dashboard.querySelector('.section-sub');
      if(intro){
        intro.textContent = 'Overview of the V1 landslide-susceptibility component of the broader SIH26001 disaster-management platform. The current XGBoost model uses 4 terrain and historical-inventory features across GSI-documented landslide points and background samples from 16 states/UTs.';
      }
    }

    page.dataset.aboutUpdated = '1';
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
})();
