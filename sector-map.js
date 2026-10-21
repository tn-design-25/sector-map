/*! Wonderstruct Sector City Map | built from the Claude prototype | mount: <div id="ws-sector-map"></div> */
(function(){
  if(window.__wsmLoaded)return; window.__wsmLoaded=true;
  var CSS=".wsm{font-family:var(--font);color:var(--ink);line-height:1.5;-webkit-font-smoothing:antialiased}\n.wsm *,.wsm *::before,.wsm *::after{box-sizing:border-box}\n.wsm [hidden]{display:none!important}\n.wsm svg{max-width:none}\n.wsm button{font-family:inherit}\n.wsm{\n  --bg:#F6F2EA; --surface:#FFFDF8; --ink:#14302E; --muted:#5A6765; --rule:#E1D7C6;\n  --copper:#BF6238; --copper-soft:#F4E2D4; --teal:#1F6A6D;\n  --stage:#EEE8DC; --stage-edge:#DCD3C2;\n  --font:\"Manrope\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", sans-serif;\n  --mono:ui-monospace, \"SF Mono\", Menlo, Consolas, monospace;\n  /* map palette: the drawing stays on light paper in both themes */\n  --m-road:#DCD4C5; --m-lot:#F3EFE7; --m-line:#7D8584; --m-dash:#F8F5EF;\n}\n.wsm-stage{position:relative;container-type:inline-size;width:100%;aspect-ratio:16/10;max-height:78vh;min-height:420px;background:var(--stage);\n  border:1px solid var(--stage-edge);border-radius:6px;overflow:hidden;touch-action:manipulation;user-select:none;-webkit-user-select:none}\n.wsm-stage::after{content:\"\";position:absolute;inset:0;pointer-events:none;\n  background-image:linear-gradient(rgba(20,48,46,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(20,48,46,.05) 1px,transparent 1px);\n  background-size:32px 32px;mix-blend-mode:multiply}\n@media (max-width:720px){.wsm-stage{aspect-ratio:3/4;max-height:none;min-height:420px}.wsm-stage.wsm-zoomed{touch-action:none}}\n.wsm-world{position:absolute;left:0;top:0;transform-origin:0 0}\n.wsm-world svg{display:block;overflow:visible}\n.wsm-map polygon,.wsm-map path,.wsm-map line,.wsm-map polyline,.wsm-map ellipse,.wsm-map rect.wsm-s{stroke:var(--m-line);stroke-width:.7;stroke-linejoin:round;stroke-linecap:round}\n.wsm-map .wsm-dl{stroke-width:.45;opacity:.75;fill:none}\n.wsm-map .wsm-nos{stroke:none}\n.wsm-zone{cursor:pointer;transition:opacity .35s ease, transform .35s ease;outline:none}\n.wsm-zone .wsm-lot{fill:var(--m-lot);transition:fill .3s ease, stroke .3s ease;stroke:#CFC6B5}\n.wsm-zone.wsm-is-hot{transform:translateY(-5px)}\n.wsm-zone.wsm-is-hot .wsm-lot,.wsm-zone:focus-visible .wsm-lot{fill:#F9EEE2;stroke:var(--copper);stroke-width:2.2}\n.wsm-zone.wsm-dim{opacity:.32}\n.wsm-zone.wsm-dim.wsm-is-hot{opacity:.7}\n.wsm-sub{transition:filter .25s ease}\n.wsm-sub.wsm-hot{filter:drop-shadow(0 0 5px rgba(191,98,56,.85))}\n.wsm-lotlabel{font-family:var(--mono);font-size:11px;letter-spacing:.12em;fill:#8C8577;text-transform:uppercase;pointer-events:none}\n.wsm-pins{position:absolute;inset:0;pointer-events:none}\n.wsm-slabels{position:absolute;inset:0;pointer-events:none;transition:opacity .3s ease}\n.wsm-stage.wsm-zoomed .wsm-slabels{opacity:0}\n.wsm-stage.wsm-zoomed .wsm-slabel{pointer-events:none}\n.wsm-leaders{position:absolute;inset:0;width:100%;height:100%;overflow:visible}\n.wsm-leaders line{stroke:#BF6238;stroke-width:1;stroke-dasharray:3 3;opacity:.7}\n.wsm-leaders circle{fill:#BF6238}\n.wsm-slabel{position:absolute;left:0;top:0;pointer-events:auto;display:inline-flex;align-items:center;gap:.5em;font:600 clamp(12px,1.2cqi,15.5px)/1.2 var(--font);\n  background:#FFFDF8;color:#14302E;border:1px solid #DDD3C2;border-radius:6px;padding:.5em .8em;box-shadow:0 2px 10px rgba(20,48,46,.12);cursor:pointer;white-space:nowrap;transition:background .2s,color .2s,border-color .2s}\n.wsm-slabel .wsm-ws-ico{color:#BF6238;font-size:1.2em}\n.wsm-slabel small{font:500 .74em var(--mono);color:#8A7A66;letter-spacing:.04em;margin-left:.15em}\n.wsm-slabel.wsm-hot,.wsm-slabel:focus-visible{background:#14302E;color:#FFFDF8;border-color:#14302E;outline:none}\n.wsm-slabel.wsm-hot .wsm-ws-ico,.wsm-slabel:focus-visible .wsm-ws-ico{color:#F4C2A3}\n.wsm-slabel.wsm-hot small,.wsm-slabel:focus-visible small{color:#C9D6D4}\n@container (max-width: 760px){.wsm-slabel small{display:none}}\n@container (max-width: 560px){.wsm-slabel .wsm-nm,.wsm-slabel small{display:none}.wsm-slabel{padding:.42em;border-radius:999px;font-size:13px}.wsm-slabel .wsm-ws-ico{font-size:1.15em}}\n.wsm-pin{position:absolute;left:0;top:0;display:flex;align-items:center;gap:6px;padding:0;border:0;background:none;cursor:pointer;\n  pointer-events:auto;font:inherit;color:var(--ink);transform-origin:0 50%;will-change:transform}\n.wsm-pin[hidden]{display:none!important}\n.wsm-pin .wsm-dot{width:16px;height:16px;border-radius:50%;background:var(--copper);border:2.5px solid #fff;box-shadow:0 1px 4px rgba(20,48,46,.35);flex:none;margin-left:-8px}\n.wsm-pin .wsm-lbl{font-size:clamp(12px,1.1cqi,14.5px);font-weight:600;line-height:1.2;background:#FFFDF8;color:#14302E;border:1px solid #DDD3C2;border-radius:5px;padding:.38em .7em;white-space:nowrap;\n  box-shadow:0 2px 8px rgba(20,48,46,.12);transition:background .2s, color .2s, border-color .2s}\n.wsm-pins:not(.wsm-labels) .wsm-pin .wsm-lbl,.wsm-pins.wsm-compact .wsm-pin .wsm-lbl{display:none}\n.wsm-pin .wsm-dot{font-size:0;line-height:1;font-weight:700;color:#fff;display:grid;place-items:center;transition:transform .2s, background .2s}\n.wsm-pins.wsm-compact .wsm-pin{pointer-events:none}\n.wsm-pins.wsm-compact .wsm-pin .wsm-dot{width:24px;height:24px;margin-left:-12px;font-size:11.5px;font-family:var(--font)}\n.wsm-pins.wsm-compact .wsm-pin.wsm-hot .wsm-dot{background:#14302E;transform:scale(1.3)}\n.wsm-panel .wsm-sel{display:none}\n.wsm-panel li b{display:none}\n.wsm-pins.wsm-dots-only .wsm-pin{pointer-events:none}\n.wsm-pin:hover .wsm-lbl,.wsm-pin:focus-visible .wsm-lbl,.wsm-pin.wsm-hot .wsm-lbl{background:#14302E;color:#FFFDF8;border-color:#14302E}\n.wsm-pin:focus-visible{outline:none}\n.wsm-pin:focus-visible .wsm-dot{outline:2px solid #14302E;outline-offset:2px}\n.wsm-pop,.wsm-card{position:absolute;left:0;top:0;z-index:5;background:#FFFDF8;color:#14302E;border:1px solid #DDD3C2;border-radius:6px;\n  box-shadow:0 10px 30px rgba(20,48,46,.18);pointer-events:none;opacity:0;transition:opacity .18s ease}\n.wsm-pop.wsm-show,.wsm-card.wsm-show{opacity:1}\n.wsm-pop.wsm-show{pointer-events:auto}\n.wsm-card{width:330px;padding:16px 18px}\n.wsm-card h3,.wsm-pop h4{margin:0;font-weight:600;letter-spacing:-.01em;display:flex;align-items:center;gap:8px}\n.wsm-ws-ico{display:inline-grid;place-items:center;width:1.25em;height:1.25em;flex:none;color:#163A40;line-height:1}\n.wsm-ws-ico svg{width:1em;height:1em;fill:currentColor;display:block}\n.wsm-ws-ico i{font-size:1em}\n.wsm-ws-ico.wsm-sector{color:#BF6238}\n.wsm-pin .wsm-lbl{display:inline-flex;align-items:center;gap:.45em}\n.wsm-pin .wsm-lbl .wsm-ws-ico{font-size:1.12em}\n.wsm-pin:hover .wsm-lbl .wsm-ws-ico,.wsm-pin.wsm-hot .wsm-lbl .wsm-ws-ico,.wsm-pin:focus-visible .wsm-lbl .wsm-ws-ico{color:#FFFDF8}\n.wsm-card h3{font-size:20px}\n.wsm-card h3 .wsm-ws-ico,.wsm-pop h4 .wsm-ws-ico{font-size:1.15em}\n.wsm-card p{margin:4px 0 10px;font-size:13.5px;color:#56625F}\n.wsm-card ul{list-style:none;margin:0 0 12px;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:13.5px}\n.wsm-card li .wsm-ws-ico{font-size:1.1em}\n.wsm-card li{display:flex;gap:6px;align-items:flex-start}\n.wsm-card li .wsm-ws-ico{margin-top:.05em}\n.wsm-card .wsm-go{font-family:ui-monospace,\"SF Mono\",Menlo,monospace;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:#BF6238}\n.wsm-pop{width:280px;padding:14px 16px}\n.wsm-pop h4{font-size:17px}\n.wsm-pop p{margin:4px 0 10px;font-size:13.5px;color:#56625F}\n.wsm-pop a{font-weight:600;font-size:13.5px;color:#BF6238;text-decoration:none}\n.wsm-pop a:hover{text-decoration:underline}\n.wsm-panel{position:absolute;z-index:4;left:16px;top:16px;width:290px;background:#FFFDF8;color:#14302E;border:1px solid #DDD3C2;border-radius:6px;\n  box-shadow:0 10px 30px rgba(20,48,46,.14);padding:18px 18px 16px;display:flex;flex-direction:column;gap:10px}\n.wsm-panel .wsm-count{font-family:ui-monospace,\"SF Mono\",Menlo,monospace;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:#BF6238;margin:0}\n.wsm-panel h2{display:flex;gap:10px;align-items:center;margin:0;font-size:22px;line-height:1.15;font-weight:600;letter-spacing:-.015em;text-wrap:balance}\n.wsm-panel .wsm-line{margin:0;font-size:14px;color:#56625F}\n.wsm-panel ul{list-style:none;margin:2px 0 0;padding:8px 0 0;border-top:1px solid #E6DDCD;display:flex;flex-direction:column}\n.wsm-panel li button{all:unset;cursor:pointer;display:flex;gap:8px;align-items:center;width:100%;padding:5px 0;font-size:14.5px;border-bottom:1px solid #EFE8DB;box-sizing:border-box}\n.wsm-panel li button:hover,.wsm-panel li button:focus-visible,.wsm-panel li button.wsm-hot{color:#BF6238}\n.wsm-panel li button.wsm-hot .wsm-ws-ico,.wsm-panel li button:hover .wsm-ws-ico{color:#BF6238}\n.wsm-panel li button:focus-visible{outline:2px solid #BF6238;outline-offset:2px}\n.wsm-panel .wsm-row{display:flex;gap:8px;align-items:center;justify-content:space-between;margin-top:4px}\n.wsm-panel .wsm-link{font-weight:600;font-size:14px;color:#BF6238;text-decoration:none}\n.wsm-panel .wsm-link:hover{text-decoration:underline}\n.wsm-btn{font:inherit;font-size:13px;font-weight:600;border:1px solid #D7CDBB;background:#FFFDF8;color:#14302E;border-radius:4px;padding:6px 10px;cursor:pointer;line-height:1.2}\n.wsm-btn:hover{border-color:#14302E}\n.wsm-btn:focus-visible{outline:2px solid #BF6238;outline-offset:2px}\n.wsm-nav{display:flex;gap:6px}\n.wsm-back{position:absolute;z-index:4;right:16px;top:16px}\n@media (max-width:720px){.wsm-panel{left:10px;right:10px;top:auto;bottom:10px;width:auto;padding:14px;gap:6px}.wsm-panel ul{flex-direction:row;gap:6px;overflow-x:auto;padding:8px 0 4px;border-top:1px solid #E6DDCD;scrollbar-width:none}.wsm-panel li{flex:none}.wsm-panel li button{border:1px solid #DDD3C2;border-radius:999px;padding:5px 10px;font-size:12.5px;white-space:nowrap}.wsm-panel .wsm-line{display:none}.wsm-panel .wsm-count{display:none}.wsm-panel li b{display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;background:#BF6238;color:#fff;font-size:10.5px;margin-right:6px;vertical-align:-3px}.wsm-panel li button.wsm-hot{background:#14302E;color:#FFFDF8;border-color:#14302E}.wsm-panel li button.wsm-hot b{background:#FFFDF8;color:#14302E}.wsm-panel .wsm-sel{display:block;font-size:13.5px;line-height:1.4;min-height:58px}.wsm-panel .wsm-sel strong{display:flex;gap:6px;align-items:center;font-size:15px}.wsm-panel li button .wsm-ws-ico{display:none}.wsm-panel .wsm-sel p{margin:2px 0 4px;color:#56625F}.wsm-panel .wsm-sel a{font-weight:600;color:#BF6238;text-decoration:none}.wsm-panel .wsm-sel .wsm-tip{color:#6E6A60;margin:6px 0 0}.wsm-panel .wsm-row{margin-top:0}.wsm-pop{display:none}.wsm-panel h2{font-size:19px}.wsm-back{right:10px;top:10px}.wsm-card{display:none}}\n.wsm-toast{position:absolute;z-index:6;left:50%;bottom:16px;transform:translate(-50%,8px);background:#14302E;color:#FFFDF8;font-size:13px;\n  padding:8px 14px;border-radius:4px;opacity:0;transition:opacity .2s, transform .2s;pointer-events:none;max-width:calc(100% - 32px);text-align:center}\n.wsm-toast.wsm-show{opacity:1;transform:translate(-50%,0)}\n.wsm-hint{position:absolute;z-index:3;left:16px;bottom:14px;font-family:var(--mono);font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:#6E6A60;\n  transition:opacity .3s}\n.wsm-stage.wsm-zoomed .wsm-hint{opacity:0}\n.wsm-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px}\n.wsm-chip{font:inherit;font-size:14px;font-weight:500;padding:7px 12px;border-radius:999px;border:1px solid var(--rule);background:var(--surface);color:var(--ink);cursor:pointer}\n.wsm-chip:hover{border-color:var(--ink)}\n.wsm-chip[aria-pressed=\"true\"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}\n.wsm-chip:focus-visible{outline:2px solid var(--copper);outline-offset:2px}\n@media (prefers-reduced-motion: reduce){.wsm-zone,.wsm-pop,.wsm-card,.wsm-toast{transition:none}}\n";
  var HTML="<nav class=\"wsm-chips\" id=\"wsm-chips\" aria-label=\"Jump to a sector\"></nav>\n<div class=\"wsm-stage\" id=\"wsm-stage\" aria-label=\"Interactive map of the sectors Wonderstruct serves\">\n    <div class=\"wsm-world\" id=\"wsm-world\"></div>\n    <div class=\"wsm-slabels\" id=\"wsm-slabels\"><svg class=\"wsm-leaders\" id=\"wsm-leaders\" aria-hidden=\"true\"></svg></div>\n    <div class=\"wsm-pins\" id=\"wsm-pins\"></div>\n    <div class=\"wsm-card\" id=\"wsm-card\" aria-hidden=\"true\"></div>\n    <div class=\"wsm-pop\" id=\"wsm-pop\" role=\"dialog\" aria-live=\"polite\"></div>\n    <div class=\"wsm-panel\" id=\"wsm-panel\" hidden></div>\n    <button class=\"wsm-btn wsm-back\" id=\"wsm-back\" type=\"button\" hidden>\u2190 All sectors</button>\n    <div class=\"wsm-hint\" id=\"wsm-hint\">Hover a district \u00b7 Click to zoom</div>\n    <div class=\"wsm-toast\" id=\"wsm-toast\" role=\"status\"></div>\n  </div>";
  function boot(){
    var host=document.getElementById('ws-sector-map'); if(!host)return;
    if(!document.getElementById('wsm-style')){var st=document.createElement('style');st.id='wsm-style';st.textContent=CSS;document.head.appendChild(st);}
    host.classList.add('wsm'); host.innerHTML=HTML;
    start();
  }
  function start(){

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- content ---------- */
const SECTORS = [
 {id:'urban-planning', name:'Urban Planning', c:0, r:0, line:'We help public agencies and planners share plans residents can understand and take part in.',
  subs:[['municipalities-local-government','Municipalities & Local Government','Websites and brands organized around what residents call about.'],
        ['planning-urban-design','Planning & Urban Design','Engagement that brings new voices into plans and zoning updates.'],
        ['state-federal-agencies','State & Federal Agencies','Program communication and outreach that hold up in public review.'],
        ['special-districts-authorities','Special Districts & Authorities','Communication for transit, water, port, and other authorities.']]},
 {id:'aec-technology', name:'AEC Technology', c:1, r:0, line:'Software, offsite, robotics, and materials companies changing how buildings get built.',
  subs:[['software-companies','Software Companies','Messaging and content for every stakeholder in a long deal.'],
        ['aec-startups-founders','AEC Startups & Founders','Positioning, product sites, and launch content for new AEC tools.'],
        ['in-house-it-teams','In-House IT Teams','Intranets and internal tools that field crews will open.'],
        ['modular-offsite-construction','Modular & Offsite Construction','Factory-built construction explained to owners, lenders, and code officials.'],
        ['3d-printed-construction','3D Printed Construction','Proof and storytelling that move printed homes from pilot to permit.'],
        ['construction-robotics-automation','Construction Robotics & Automation','Showing superintendents what a robot changes on their jobsite.'],
        ['construction-materials','Construction Materials','Specs, carbon data, and stories for new and low-carbon materials.']]},
 {id:'energy', name:'Energy', c:2, r:0, line:'We help energy teams earn local support and win the contracts that follow.',
  subs:[['renewable-energy','Renewable Energy','Community support and siting materials for solar and wind projects.'],
        ['transmission-grid','Transmission & Grid','Landowner outreach and route maps for new lines.'],
        ['energy-storage','Energy Storage','Plain-language answers on battery safety for boards and neighbors.'],
        ['nuclear','Nuclear','Clear, credible communication for new nuclear and the teams that build it.'],
        ['utilities-power-providers','Utilities & Power Providers','Ratepayer communication, recruiting, and internal systems for utilities.']]},
 {id:'transportation', name:'Transportation', c:0, r:1, line:'We help transportation firms win qualifications-based work and help agencies bring the public along.',
  subs:[['roads-highways-bridges','Roads, Highways & Bridges','SOQs and public outreach for DOT and county work.'],
        ['transit-rail','Transit & Rail','Pursuits and community engagement for transit agencies and their consultants.'],
        ['aviation-airports','Aviation & Airports','Construction communication that keeps travelers moving through every phase.'],
        ['ports-maritime','Ports & Maritime','Proposals and outreach for terminals, harbors, and waterfront work.'],
        ['aerospace','Aerospace','Marketing for commercial and civil aerospace facilities and firms.']]},
 {id:'buildings-development', name:'Buildings & Development', c:1, r:1, line:'We help design and construction firms win the work they want next.',
  subs:[['general-contractors','General Contractors','Proposals, interviews, and safety programs for builders competing on a shortlist.'],
        ['architecture','Architecture','Portfolios and proposals that show your design thinking to the owners you want next.'],
        ['specialty-trade-contractors','Specialty & Trade Contractors','Marketing that wins GC relationships and recruits skilled crews.'],
        ['mep-engineering','MEP Engineering','SOQs and project stories that make building systems easy to follow.'],
        ['site-civil-engineering','Site & Civil Engineering','Proposals and maps that show how a site comes together.'],
        ['structural-engineering','Structural Engineering','Technical work explained clearly for owners and selection committees.'],
        ['real-estate-land-development','Real Estate & Land Development','Project branding and entitlement outreach from first sketch to sales center.'],
        ['luxury-homebuilders','Luxury Homebuilders','Brands and websites that match the craft of the homes you build.']]},
 {id:'water-environment', name:'Water & Environment', c:2, r:1, line:'We help water and environmental teams explain their work to ratepayers, regulators, and future hires.',
  subs:[['water-wastewater','Water & Wastewater','Capital plans and rate stories ratepayers can follow.'],
        ['environmental-remediation','Environmental Remediation','Cleanup work explained to neighbors, regulators, and clients.'],
        ['waste-recycling','Waste & Recycling','Facility outreach and brand work for materials recovery operators.'],
        ['carbon-capture-sequestration','Carbon Capture & Sequestration','Community engagement and technical content for capture and storage projects.']]},
];


/* ---------- icons (Font Awesome 6 Sharp Regular; names from the Figma megamenu) ---------- */
const SECTOR_ICON={'buildings-development':'excavator','transportation':'road','energy':'bolt','water-environment':'water','urban-planning':'building-columns','aec-technology':'cube'};
const SUB_ICON={'architecture':'compass-drafting','general-contractors':'helmet-safety','specialty-trade-contractors':'screwdriver-wrench','structural-engineering':'bridge','mep-engineering':'fan','site-civil-engineering':'draw-polygon','real-estate-land-development':'sign-hanging','luxury-homebuilders':'house-chimney-window',
 'roads-highways-bridges':'road-bridge','transit-rail':'train-subway','aviation-airports':'plane-departure','aerospace':'satellite','ports-maritime':'ship',
 'renewable-energy':'solar-panel','nuclear':'atom','energy-storage':'battery-full','utilities-power-providers':'plug-circle-bolt','transmission-grid':'utility-pole',
 'water-wastewater':'droplet','environmental-remediation':'seedling','waste-recycling':'recycle','carbon-capture-sequestration':'cloud-arrow-down',
 'municipalities-local-government':'building-flag','planning-urban-design':'city','state-federal-agencies':'landmark-dome','special-districts-authorities':'map-location-dot',
 'aec-startups-founders':'rocket','software-companies':'laptop-code','in-house-it-teams':'users-gear','modular-offsite-construction':'cube','3d-printed-construction':'e5f8','construction-robotics-automation':'robot','construction-materials':'trowel-bricks'};
/* Preview-only fallback: Font Awesome Free 6.7.2 solid paths (CC BY 4.0, fontawesome.com). Used when the kit can't load. */
const FA_FREE={};
const FA_KIT=!!window.FontAwesomeKitConfig;
function ico(name,cls=''){
  let inner='';
  if(FA_KIT) inner = name==='e5f8' ? '<i class="fa-sharp fa-regular" style="font-style:normal">&#xe5f8;</i>' : `<i class="fa-sharp fa-regular fa-${name}"></i>`;
  else { const f=FA_FREE[name]; if(f) inner=`<svg viewBox="${f[0]}"><path d="${f[1]}"/></svg>`; }
  return `<span class="wsm-ws-ico ${cls}" aria-hidden="true">${inner}</span>`;
}

/* ---------- isometric geometry ---------- */
const U=16, C=0.8660254, S=0.5, LOT=22, ROAD=4, PITCH=LOT+ROAD, TX=ROAD+3*PITCH, TY=ROAD+2*PITCH;
let OX=0, OY=0;
const P=(x,y,z=0)=>[((x+OX)-(y+OY))*U*C, ((x+OX)+(y+OY))*U*S - z*U];
const f=p=>p[0].toFixed(1)+','+p[1].toFixed(1);
const poly=(pts,fill,cls='')=>`<polygon class="${cls}" points="${pts.map(f).join(' ')}" fill="${fill}"/>`;
const ln=(a,b,cls='wsm-dl',extra='')=>`<line class="${cls}" x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" ${extra}/>`;
const PAL={
 plain:['#FAF8F4','#E5E1D9','#CDC8BF'], glass:['#D7ECEC','#B7D9DB','#96C2C5'], white:['#FFFFFF','#EDEBE6','#D6D3CC'],
 brick:['#E3CDBB','#C2906F','#A87558'], teal:['#5E9FA1','#2C7376','#1F5A5D'], orange:['#F7B37A','#EE8A3A','#D17128'],
 dark:['#7B8584','#5C6665','#4A5352'], wood:['#EDD3A8','#D8AE74','#BE9258'], solar:['#5A88A0','#3E6E86','#30586C'],
 water:['#CFE3E4','#B5D2D4','#9FC2C4'], dirt:['#E8D9BE','#D6C29F','#C4AE89'], steel:['#B8C2C3','#9AA6A7','#7F8C8D'],
 green:['#B9D3A7','#9DBD89','#87A774'], gravel:['#E2DDD3','#CFC9BD','#BDB6A9'], copper:['#E7A887','#BF6238','#A3502C']
};
function box(x,y,z,w,d,h,pal='plain',o={}){
  const [t,l,r]=PAL[pal]||pal, z1=z+h; let s='';
  s+=poly([P(x,y+d,z),P(x+w,y+d,z),P(x+w,y+d,z1),P(x,y+d,z1)],l);
  s+=poly([P(x+w,y,z),P(x+w,y+d,z),P(x+w,y+d,z1),P(x+w,y,z1)],r);
  s+=poly([P(x,y,z1),P(x+w,y,z1),P(x+w,y+d,z1),P(x,y+d,z1)],o.top||t);
  if(o.floors){for(let k=1;k<o.floors;k++){const zz=z+h*k/o.floors;s+=ln(P(x,y+d,zz),P(x+w,y+d,zz))+ln(P(x+w,y,zz),P(x+w,y+d,zz));}}
  if(o.cols){for(let k=1;k<o.cols;k++){const xx=x+w*k/o.cols, yy=y+d*k/o.cols;s+=ln(P(xx,y+d,z),P(xx,y+d,z1))+ln(P(x+w,yy,z),P(x+w,yy,z1));}}
  return s;
}
const flat=(x,y,w,d,fill,z=0.02)=>poly([P(x,y,z),P(x+w,y,z),P(x+w,y+d,z),P(x,y+d,z)],fill);
function cyl(cx,cy,r,z,h,pal='plain',o={}){
  const [t,l]=PAL[pal]||pal, b=P(cx,cy,z), tp=P(cx,cy,z+h), rx=r*U*1.2247, ry=r*U*0.7071;
  let s=`<path d="M${(tp[0]-rx).toFixed(1)},${tp[1].toFixed(1)} L${(b[0]-rx).toFixed(1)},${b[1].toFixed(1)} A${rx.toFixed(1)},${ry.toFixed(1)} 0 0 0 ${(b[0]+rx).toFixed(1)},${b[1].toFixed(1)} L${(tp[0]+rx).toFixed(1)},${tp[1].toFixed(1)} Z" fill="url(#cg-${pal})"/>`;
  s+=`<ellipse cx="${tp[0].toFixed(1)}" cy="${tp[1].toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${o.top||t}"/>`;
  if(o.bands){for(let k=1;k<o.bands;k++){const p=P(cx,cy,z+h*k/o.bands);s+=`<path class="wsm-dl" d="M${(p[0]-rx).toFixed(1)},${p[1].toFixed(1)} A${rx.toFixed(1)},${ry.toFixed(1)} 0 0 0 ${(p[0]+rx).toFixed(1)},${p[1].toFixed(1)}"/>`;}}
  return s;
}
function dome(cx,cy,r,z,pal='plain'){
  const c=P(cx,cy,z), rx=r*U*1.2247, ry=r*U*0.7071, hr=r*U*1.15;
  return `<path d="M${(c[0]-rx).toFixed(1)},${c[1].toFixed(1)} A${rx.toFixed(1)},${hr.toFixed(1)} 0 0 1 ${(c[0]+rx).toFixed(1)},${c[1].toFixed(1)} A${rx.toFixed(1)},${ry.toFixed(1)} 0 0 1 ${(c[0]-rx).toFixed(1)},${c[1].toFixed(1)} Z" fill="url(#cg-${pal})"/>`;
}
function tower(cx,cy,r,h){ // cooling tower
  const b=P(cx,cy,0), t=P(cx,cy,h), rx=r*U*1.2247, ry=r*U*0.7071, w=P(cx,cy,h*0.62);
  let s=`<path d="M${(b[0]-rx).toFixed(1)},${b[1].toFixed(1)} Q${(w[0]-rx*0.55).toFixed(1)},${w[1].toFixed(1)} ${(t[0]-rx*0.72).toFixed(1)},${t[1].toFixed(1)} L${(t[0]+rx*0.72).toFixed(1)},${t[1].toFixed(1)} Q${(w[0]+rx*0.55).toFixed(1)},${w[1].toFixed(1)} ${(b[0]+rx).toFixed(1)},${b[1].toFixed(1)} A${rx.toFixed(1)},${ry.toFixed(1)} 0 0 1 ${(b[0]-rx).toFixed(1)},${b[1].toFixed(1)} Z" fill="url(#cg-plain)"/>`;
  s+=`<ellipse cx="${t[0].toFixed(1)}" cy="${t[1].toFixed(1)}" rx="${(rx*0.72).toFixed(1)}" ry="${(ry*0.72).toFixed(1)}" fill="#C9C4BA"/>`;
  return s;
}
function tree(x,y,s=1){
  const b=P(x,y,0), t=P(x,y,.7*s), k=s;
  const c=(dx,dy,r,fill)=>`<circle cx="${(t[0]+dx*k).toFixed(1)}" cy="${(t[1]+dy*k).toFixed(1)}" r="${(r*k).toFixed(1)}" fill="${fill}" style="stroke:#8E9C88;stroke-width:.6"/>`;
  const sh=P(x,y,0);
  return `<ellipse cx="${sh[0].toFixed(1)}" cy="${sh[1].toFixed(1)}" rx="${(6*k).toFixed(1)}" ry="${(3*k).toFixed(1)}" fill="rgba(80,90,80,.12)" style="stroke:none"/>`+
   `<line x1="${b[0].toFixed(1)}" y1="${b[1].toFixed(1)}" x2="${t[0].toFixed(1)}" y2="${t[1].toFixed(1)}" style="stroke:#8A7A66;stroke-width:1.4"/>`+
   c(-3,-4,4.6,'#CFDCC5')+c(3,-4.5,4.4,'#C5D4BA')+c(0,-8,4.8,'#D8E3CF');
}
function pylon(x,y,h){
  const b=P(x,y,0), t=P(x,y,h), a1=P(x,y,h*0.78), a2=P(x,y,h*0.92); const w=7;
  let s=`<g style="stroke:#6F7877;stroke-width:.8;fill:none">`;
  s+=`<path d="M${b[0]-w},${b[1]} L${t[0]},${t[1]} L${b[0]+w},${b[1]}"/>`;
  for(let k=1;k<6;k++){const p1=P(x,y,h*k/6*0.9), ww=w*(1-k/6*0.9);s+=`<line x1="${p1[0]-ww}" y1="${p1[1]}" x2="${p1[0]+ww}" y2="${p1[1]}"/>`;}
  s+=`<line x1="${a1[0]-14}" y1="${a1[1]}" x2="${a1[0]+14}" y2="${a1[1]}"/><line x1="${a2[0]-10}" y1="${a2[1]}" x2="${a2[0]+10}" y2="${a2[1]}"/></g>`;
  return {svg:s, arms:[[a1[0]-14,a1[1]],[a1[0]+14,a1[1]],[a2[0],a2[1]-1]]};
}
let turbineId=0;
function turbine(x,y,h){
  const b=P(x,y,0), t=P(x,y,h), id='tb'+(turbineId++), L=2.9*U;
  let blades='';for(let k=0;k<3;k++){blades+=`<path d="M0,0 L-1.6,${-L*0.3} L0,${-L} L1.6,${-L*0.3} Z" transform="rotate(${k*120})" fill="#FFFFFF" style="stroke:#7D8584;stroke-width:.6"/>`;}
  return `<line x1="${b[0]}" y1="${b[1]}" x2="${t[0]}" y2="${t[1]}" style="stroke:#7D8584;stroke-width:2.2"/>`+
    `<g transform="translate(${t[0].toFixed(1)},${t[1].toFixed(1)})"><g class="wsm-blades" id="${id}">${blades}</g><circle r="2.4" fill="#FFF" style="stroke:#7D8584;stroke-width:.7"/></g>`;
}

/* ---------- General Contractors site: true-isometric vector drawing ---------- */
function worker(x,y,z){
  const f=P(x,y,z), h=P(x,y,z+.42), hd=P(x,y,z+.62);
  return `<line x1="${f[0]}" y1="${f[1]}" x2="${h[0]}" y2="${h[1]}" style="stroke:#2E4A6B;stroke-width:2"/>`+
    `<line x1="${f[0]}" y1="${(f[1]-3.2).toFixed(1)}" x2="${h[0]}" y2="${h[1]}" style="stroke:#E9C93C;stroke-width:2.8"/>`+
    `<circle cx="${hd[0].toFixed(1)}" cy="${hd[1].toFixed(1)}" r="1.6" fill="#F7F7F2" style="stroke:#7D8584;stroke-width:.5"/>`;
}
function rail(a,b,z,posts=true){ // orange guardrail between two ground points at height z
  const A1=P(a[0],a[1],z+.32),B1=P(b[0],b[1],z+.32),A2=P(a[0],a[1],z+.62),B2=P(b[0],b[1],z+.62);
  let s=`<line x1="${A1[0].toFixed(1)}" y1="${A1[1].toFixed(1)}" x2="${B1[0].toFixed(1)}" y2="${B1[1].toFixed(1)}" style="stroke:#EE8A3A;stroke-width:.8"/>`+
        `<line x1="${A2[0].toFixed(1)}" y1="${A2[1].toFixed(1)}" x2="${B2[0].toFixed(1)}" y2="${B2[1].toFixed(1)}" style="stroke:#EE8A3A;stroke-width:1.1"/>`;
  if(posts){const L=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.round(L/0.9));
    for(let i=0;i<=n;i++){const x=a[0]+(b[0]-a[0])*i/n,y=a[1]+(b[1]-a[1])*i/n;const p0=P(x,y,z),p1=P(x,y,z+.62);
      s+=`<line x1="${p0[0].toFixed(1)}" y1="${p0[1].toFixed(1)}" x2="${p1[0].toFixed(1)}" y2="${p1[1].toFixed(1)}" style="stroke:#EE8A3A;stroke-width:.7"/>`;}}
  return s;
}
function fence(a,b){
  const h=.85, L=Math.hypot(b[0]-a[0],b[1]-a[1]), n=Math.max(1,Math.round(L/1.2));
  let s=poly([P(a[0],a[1],0),P(b[0],b[1],0),P(b[0],b[1],h),P(a[0],a[1],h)],'rgba(125,135,134,.16)','wsm-nos');
  // chain-link hatch
  for(let i=0;i<n*3;i++){const t=i/(n*3),t2=Math.min(1,t+1/(n*3)*2);
    const p0=P(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,0), p1=P(a[0]+(b[0]-a[0])*t2,a[1]+(b[1]-a[1])*t2,h);
    s+=`<line x1="${p0[0].toFixed(1)}" y1="${p0[1].toFixed(1)}" x2="${p1[0].toFixed(1)}" y2="${p1[1].toFixed(1)}" style="stroke:#9AA2A1;stroke-width:.3"/>`;}
  s+=ln(P(a[0],a[1],h),P(b[0],b[1],h),'', 'style="stroke:#7D8584;stroke-width:.8"');
  for(let i=0;i<=n;i++){const x=a[0]+(b[0]-a[0])*i/n,y=a[1]+(b[1]-a[1])*i/n;s+=ln(P(x,y,0),P(x,y,h+.05),'', 'style="stroke:#6F7877;stroke-width:.9"');}
  return s;
}
function lattice(x0,y0,z0,x1,y1,z1,hTop,col){ // horizontal truss along a line, top chord offset hTop
  const n=Math.max(2,Math.round(Math.hypot(x1-x0,y1-y0)/0.5)); let d='';
  const b0=P(x0,y0,z0),b1=P(x1,y1,z1),t0=P(x0,y0,z0+hTop),t1=P(x1,y1,z1+hTop);
  let s=`<line x1="${b0[0].toFixed(1)}" y1="${b0[1].toFixed(1)}" x2="${b1[0].toFixed(1)}" y2="${b1[1].toFixed(1)}" style="stroke:${col};stroke-width:1.6"/>`+
        `<line x1="${t0[0].toFixed(1)}" y1="${t0[1].toFixed(1)}" x2="${t1[0].toFixed(1)}" y2="${t1[1].toFixed(1)}" style="stroke:${col};stroke-width:1.2"/>`;
  for(let i=0;i<=n;i++){const t=i/n, x=x0+(x1-x0)*t, y=y0+(y1-y0)*t, z=z0+(z1-z0)*t; const p=i%2?P(x,y,z):P(x,y,z+hTop); d+=(i?'L':'M')+f(p)+' ';}
  return s+`<path d="${d}" fill="none" style="stroke:${col};stroke-width:.7"/>`;
}
function gcSite(){
  const BX=3, BY=2, BW=6, BD=4.5, FH=1.3, NF=5, ST=.22;
  const colsX=[3.05,5,7,8.7], colsY=[2.05,4.1,6.2];
  let s='';
  // site ground + back fence
  s+=flat(.6,.6,10.8,10.6,'#ECE3D1',.015);
  s+=ln(P(1.2,7.2,.03),P(10.6,7.2,.03),'wsm-dl')+ln(P(1.2,7.2,.03),P(1.2,10.6,.03),'wsm-dl');
  s+=fence([.6,.6],[11.4,.6])+fence([.6,.6],[.6,11.2]);
  s+=tree(.2,.3,.9);
  // building, storey by storey (painter's order bottom to top)
  for(let k=0;k<=NF;k++){
    const z=k*FH;
    s+=box(BX-.1,BY-.1,z,BW+.2,BD+.2,ST,'plain',{top:'#F6F4EF'});
    if(k===NF)break;
    const zc=z+ST, hc=FH-ST;
    // back-to-front contents of this storey
    const parts=[];
    colsX.forEach(cx=>colsY.forEach(cy=>parts.push({d:cx+cy, s:box(cx,cy,zc,.28,.28,hc,'plain')})));
    parts.push({d:4.2+2.4, s:box(4.2,2.4,zc,1.4,1.4,hc,'plain',{})+poly([P(4.7,3.8,zc+.15),P(5.2,3.8,zc+.15),P(5.2,3.8,zc+.85),P(4.7,3.8,zc+.85)],'#8E9695')});
    parts.push({d:6.4+2.4, s:box(6.4,2.4,zc,1.5,1.6,hc,'plain')+`<path d="M${f(P(7.9,2.6,zc+.1))} L${f(P(7.9,3.5,zc+.6))} L${f(P(7.9,2.6,zc+1.0))}" fill="none" style="stroke:#EE8A3A;stroke-width:.9"/>`});
    if(k===1||k===2) parts.push({d:9.5, s:box(3.6,5.4,zc+hc-.42,3.4,.45,.32,'glass')+box(6.6,4.5,zc+hc-.42,.45,1.35,.32,'glass')});
    if(k<=3) parts.push({d:14.4, s:ln(P(8.3,6.1,zc),P(8.3,6.1,zc+hc),'', 'style="stroke:#D9534F;stroke-width:1.4"')+ln(P(8.45,6.1,zc),P(8.45,6.1,zc+hc),'', 'style="stroke:#3D7DBF;stroke-width:1.4"')+ln(P(8.15,6.1,zc),P(8.15,6.1,zc+hc),'', 'style="stroke:#D9534F;stroke-width:1"')});
    if(k<=2) parts.push({d:15.6, s:[5.25,6.35].map((yy,i)=>box(9.02,yy-.55,zc+.05,.08,1.05,hc-.1,'glass',{cols:2})).join('')});
    if(k===2) parts.push({d:12, s:worker(8.6,5.9,zc)});
    parts.sort((a,b)=>a.d-b.d).forEach(p=>s+=p.s);
    // front-edge guardrails for the floor above this slab... (rails sit on slab k)
    if(k>0) s+=rail([BX-.05,BY+BD+.05],[BX+BW+.05,BY+BD+.05],z+ST)+rail([BX+BW+.05,BY-.05],[BX+BW+.05,BY+BD+.05],z+ST);
  }
  // roof
  const zr=NF*FH+ST;
  s+=rail([BX-.05,BY-.05],[BX+BW+.05,BY-.05],zr)+rail([BX-.05,BY-.05],[BX-.05,BY+BD+.05],zr);
  const roof=[];
  colsX.forEach(cx=>colsY.forEach(cy=>{if((cx>4&&cx<8&&cy<4))return;roof.push({d:cx+cy,s:box(cx,cy,zr,.28,.28,.5,'plain')+[0,1].map(i=>ln(P(cx+.08+i*.12,cy+.14,zr+.5),P(cx+.08+i*.12,cy+.14,zr+.85),'', 'style="stroke:#6F7877;stroke-width:.6"')).join('')+box(cx+.02,cy+.02,zr+.85,.24,.24,.12,'orange')});}));
  roof.push({d:6.6,s:box(4.2,2.4,zr,1.4,1.4,1.6,'plain',{floors:2})+rail([4.2,3.8],[5.6,3.8],zr+1.6,false)+rail([5.6,2.4],[5.6,3.8],zr+1.6,false)});
  roof.push({d:8.8,s:box(6.4,2.4,zr,1.5,1.6,1.9,'plain',{floors:2})+rail([6.4,4.0],[7.9,4.0],zr+1.9,false)+rail([7.9,2.4],[7.9,4.0],zr+1.9,false)});
  roof.push({d:9.6,s:worker(4,5.6,zr)});
  roof.push({d:10.9,s:worker(6.2,5.2,zr)});
  roof.push({d:12.6,s:worker(7.4,5.4,zr)+worker(8.4,4.6,zr)});
  roof.push({d:7.4,s:ln(P(3.5,2.6,zr),P(3.5,2.6,zr+.55),'', 'style="stroke:#555;stroke-width:.7"')+ln(P(3.35,2.75,zr),P(3.5,2.6,zr+.55),'', 'style="stroke:#555;stroke-width:.7"')+ln(P(3.65,2.75,zr),P(3.5,2.6,zr+.55),'', 'style="stroke:#555;stroke-width:.7"')+worker(3.9,3,zr)});
  roof.sort((a,b)=>a.d-b.d).forEach(p=>s+=p.s);
  s+=rail([BX-.05,BY+BD+.05],[BX+BW+.05,BY+BD+.05],zr)+rail([BX+BW+.05,BY-.05],[BX+BW+.05,BY+BD+.05],zr);
  // tower crane (teal), mast in front-right of the building
  const T='#1F6A6D', mx=10.1, my=3.4, mw=.6, top=12.4;
  s+=box(mx-.4,my-.4,0,1.4,1.4,.45,'plain')+rail([mx-.4,my+1.0],[mx+1.0,my+1.0],.45,false)+rail([mx+1.0,my-.4],[mx+1.0,my+1.0],.45,false);
  const legs=[[mx,my],[mx+mw,my],[mx+mw,my+mw],[mx,my+mw]];
  legs.forEach(([a,b])=>s+=ln(P(a,b,.45),P(a,b,top),'', `style="stroke:${T};stroke-width:1.3"`));
  let zz='';for(let i=0;i<=24;i++){const z=.45+(top-.45)*i/24;zz+=(i?'L':'M')+f(i%2?P(mx,my+mw,z):P(mx+mw,my+mw,z))+' ';}
  let zz2='';for(let i=0;i<=24;i++){const z=.45+(top-.45)*i/24;zz2+=(i?'L':'M')+f(i%2?P(mx+mw,my,z):P(mx+mw,my+mw,z))+' ';}
  s+=`<path d="${zz}" fill="none" style="stroke:${T};stroke-width:.6"/><path d="${zz2}" fill="none" style="stroke:${T};stroke-width:.6"/>`;
  const jy=my+mw/2, jz=top+.3;
  s+=lattice(mx+mw/2,jy,jz,.6,jy,jz,.55,T);              // jib over the building
  s+=lattice(mx+mw/2,jy,jz,12.6,jy,jz,.5,T);             // counter-jib
  s+=box(11.8,jy-.35,jz-.7,.8,.7,.8,'plain',{floors:2}); // counterweight
  const apex=P(mx+mw/2,jy,jz+2.3);
  s+=`<line x1="${f(P(mx,jy,jz)).split(',')[0]}" y1="${f(P(mx,jy,jz)).split(',')[1]}" x2="${apex[0]}" y2="${apex[1]}" style="stroke:${T};stroke-width:1.1"/>`;
  s+=`<path d="M${f(P(.6,jy,jz+.55))} L${f(apex)} L${f(P(12.6,jy,jz+.5))}" fill="none" style="stroke:#5E7E80;stroke-width:.5"/>`;
  s+=box(mx+mw+.02,my-.1,top-1.1,.8,.8,.9,'white',{top:'#D7ECEC'}); // cab
  // trolley, hook, curtain-wall panel
  const hx=6.1; s+=box(hx-.2,jy-.2,jz-.15,.4,.4,.15,'dark');
  s+=ln(P(hx,jy,jz-.15),P(hx,jy,9.9),'', 'style="stroke:#444;stroke-width:.6"');
  s+=box(hx-.5,jy-.08,9.7,1,.16,.18,'orange');
  s+=ln(P(hx-.45,jy,9.7),P(hx-.35,jy,9.15),'', 'style="stroke:#444;stroke-width:.5"')+ln(P(hx+.45,jy,9.7),P(hx+.35,jy,9.15),'', 'style="stroke:#444;stroke-width:.5"');
  s+=box(hx-.45,jy-.06,7.9,.9,.12,1.25,'glass',{cols:2});
  // laydown yard, forklift, trailer
  [[1.3,7.7],[1.3,8.7],[1.3,9.7]].forEach(([a,b],i)=>{s+=box(a,b,0,2,.7,.12,'wood')+box(a+.05,b+.05,.12,1.9,.6,.32+i*.06,'steel',{floors:3});});
  s+=box(3.8,7.8,0,1,.8,.1,'wood')+box(3.85,7.85,.1,.9,.7,.4,'dark',{floors:3});
  s+=box(4.6,9.4,0,.9,.6,.45,'orange')+ln(P(4.55,9.5,.1),P(4.55,9.5,1.1),'', 'style="stroke:#555;stroke-width:.9"')+ln(P(4.55,9.9,.1),P(4.55,9.9,1.1),'', 'style="stroke:#555;stroke-width:.9"')+box(4.85,9.5,.45,.4,.4,.35,'plain')+worker(5.05,9.7,.45);
  s+=box(6.4,9,0,1.4,.7,.1,'wood')+box(6.45,9.05,.1,1.3,.6,.35,'steel',{floors:3});
  s+=box(8.2,8.6,0,2.6,1.2,1.05,'white',{cols:3})+poly([P(9.4,9.8,.05),P(9.8,9.8,.05),P(9.8,9.8,.8),P(9.4,9.8,.8)],'#2C7376');
  // front fence + gate gap, trees outside
  s+=fence([.6,11.2],[6.4,11.2])+fence([8.6,11.2],[11.4,11.2])+fence([11.4,.6],[11.4,11.2]);
  return s;
}

/* ---------- Buildings & Development: detailed vector sites ---------- */
PAL.stone=['#E8E2D6','#D2C9B9','#BBB1A0']; PAL.asphalt=['#BDB7AC','#A9A398','#958F84'];
function person(x,y,z,col='#5C7C8A'){
  const f0=P(x,y,z), h=P(x,y,z+.4), hd=P(x,y,z+.55);
  return `<line x1="${f0[0].toFixed(1)}" y1="${f0[1].toFixed(1)}" x2="${h[0].toFixed(1)}" y2="${h[1].toFixed(1)}" style="stroke:#3B4A55;stroke-width:1.8"/>`+
   `<line x1="${f0[0].toFixed(1)}" y1="${(f0[1]-2.8).toFixed(1)}" x2="${h[0].toFixed(1)}" y2="${h[1].toFixed(1)}" style="stroke:${col};stroke-width:2.6"/>`+
   `<circle cx="${hd[0].toFixed(1)}" cy="${hd[1].toFixed(1)}" r="1.4" fill="#E9CBB0" style="stroke:#7D8584;stroke-width:.4"/>`;
}
function car(x,y,col='white',ax='x'){
  return ax==='x'? box(x,y,.1,1.3,.62,.32,col)+box(x+.35,y+.06,.42,.62,.5,.24,'glass')
                 : box(x,y,.1,.62,1.3,.32,col)+box(x+.06,y+.35,.42,.5,.62,.24,'glass');
}
function van(x,y,stripe='#EE8A3A'){
  let s=box(x,y,.12,1.7,.78,.78,'white')+box(x+1.7,y,.12,.5,.78,.5,'white')+poly([P(x+2.2,y+.08,.4),P(x+2.2,y+.7,.4),P(x+2.05,y+.7,.62),P(x+2.05,y+.08,.62)],'#9CC5C8');
  s+=ln(P(x+.1,y+.78,.5),P(x+2.1,y+.78,.5),'', `style="stroke:${stripe};stroke-width:2"`);
  return s;
}
function stake(x,y){const b=P(x,y,0),t=P(x,y,.55);return `<line x1="${b[0].toFixed(1)}" y1="${b[1].toFixed(1)}" x2="${t[0].toFixed(1)}" y2="${t[1].toFixed(1)}" style="stroke:#8C7A5C;stroke-width:.8"/><path d="M${t[0].toFixed(1)},${t[1].toFixed(1)} l4,1.5 l-4,1.5 Z" fill="#EE8A3A" style="stroke:none"/>`;}
function shrub(x,y,r=2.6){const c=P(x,y,.15);return `<ellipse cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" rx="${(r*1.2).toFixed(1)}" ry="${r.toFixed(1)}" fill="#B9D3A7" style="stroke:#87A774;stroke-width:.5"/>`;}
function gable(x,y,z,w,d,h,roof='#B9B2A6',end='#EDEBE6'){
  return poly([P(x,y,z),P(x+w,y,z),P(x+w,y+d/2,z+h),P(x,y+d/2,z+h)],roof)+
         poly([P(x,y+d,z),P(x+w,y+d,z),P(x+w,y+d/2,z+h),P(x,y+d/2,z+h)],roof)+
         poly([P(x+w,y,z),P(x+w,y+d,z),P(x+w,y+d/2,z+h)],end);
}
function frameHouse(x,y,w,d,h){ // wood stud framing
  const W='#C9965A'; let s=box(x-.1,y-.1,0,w+.2,d+.2,.12,'stone');
  const st=`style="stroke:${W};stroke-width:.9"`;
  for(let i=0;i<=6;i++){const xx=x+w*i/6; s+=ln(P(xx,y,.12),P(xx,y,.12+h),'',st)+ln(P(xx,y+d,.12),P(xx,y+d,.12+h),'',st);}
  for(let i=0;i<=4;i++){const yy=y+d*i/4; s+=ln(P(x+w,yy,.12),P(x+w,yy,.12+h),'',st);}
  for(const z of [.12,.12+h]){s+=`<polyline points="${[P(x,y,z),P(x+w,y,z),P(x+w,y+d,z),P(x,y+d,z),P(x,y,z)].map(f).join(' ')}" fill="none" ${st}/>`;}
  for(let i=0;i<=4;i++){const xx=x+w*i/4; s+=`<polyline points="${[P(xx,y,.12+h),P(xx,y+d/2,.12+h+.6),P(xx,y+d,.12+h)].map(f).join(' ')}" fill="none" ${st}/>`;}
  s+=ln(P(x,y+d/2,.12+h+.6),P(x+w,y+d/2,.12+h+.6),'',st);
  return s;
}
function steelCol(x,y,z0,z1){return box(x-.09,y-.09,z0,.18,.18,z1-z0,'steel');}
function beamX(x0,x1,y,z){return box(x0,y-.07,z-.2,x1-x0,.14,.2,'steel');}
function beamY(x,y0,y1,z){return box(x-.07,y0,z-.2,.14,y1-y0,.2,'steel');}

function bdArchitecture(){
  let s=flat(12.6,.6,5,5.2,'#E9E3D8',.012);
  for(let i=1;i<5;i++) s+=ln(P(12.6,.6+i*1.04,.02),P(17.6,.6+i*1.04,.02),'wsm-dl');
  s+=box(13,1,0,4.2,4.2,1.5,'glass',{cols:7});
  s+=box(12.9,.9,1.5,4.4,4.4,.18,'plain');
  s+=box(13.2,1.2,1.68,3.8,3.8,5.2,'glass',{floors:6,cols:6});
  s+=flat(13.2,1.2,3.8,3.8,'#B9D3A7',6.9)+box(13.15,1.15,6.88,3.9,3.9,.12,'plain');
  s+=tree(16.4,4.3,.55)+tree(16.5,1.8,.5)+shrub(16.4,3,1.8);
  s+=box(13.3,1.3,7,2.8,3.6,3.4,'glass',{floors:4,cols:4});
  s+=box(13.25,1.25,10.4,2.9,3.7,.12,'plain')+flat(13.3,4.0,2.8,.9,'#B9D3A7',10.53)+shrub(14.5,4.4,1.5)+person(15.2,4.4,10.52,'#BF6238');
  s+=box(13.3,1.3,10.52,2.8,2.6,2.1,'glass',{floors:2,cols:4});
  s+=box(13.25,1.25,12.62,2.9,2.7,.12,'plain')+box(13.8,1.7,12.74,1.4,1.2,.45,'plain');
  // copper fins up the front corner
  [[13.2,5.0],[13.9,5.0],[14.6,5.0]].forEach(([a,b])=>s+=box(a,b,1.68,.1,.08,5.2,'copper'));
  [[17.0,4.3],[17.0,3.6]].forEach(([a,b])=>s+=box(a,b,1.68,.08,.1,5.2,'copper'));
  s+=box(13.4,5.2,1.25,2.2,.6,.1,'plain');
  s+=person(13.9,5.6,0,'#2C7376')+person(15.6,5.5,0,'#BF6238')+person(16.6,5.3,0)+box(16.0,5.4,0,.8,.25,.18,'wood');
  s+=tree(12.8,5.6,.7)+tree(17.4,5.6,.7);
  return s;
}
function bdSpecialty(){
  let s=flat(17.9,.6,4,6.1,'#E6E0D5',.012);
  s+=box(18.3,1,0,3.2,3.6,5,'plain',{floors:4,cols:3});
  for(let k=0;k<4;k++){for(let i=0;i<3;i++){const z=k*1.25+.45;s+=poly([P(18.5+i*1.05,4.6,z),P(19.1+i*1.05,4.6,z),P(19.1+i*1.05,4.6,z+.5),P(18.5+i*1.05,4.6,z+.5)],'#AFCFD1');}}
  // scaffolding on the two visible faces
  const SC='style="stroke:#7D8584;stroke-width:.7"', y0=4.65, y1=5.15, x0=21.55, x1=22.0;
  for(let k=1;k<=4;k++){const z=k*1.25; s+=box(18.1,y0,z-.06,3.6,y1-y0,.06,'wood')+box(x0,.8,z-.06,x1-x0,4.35,.06,'wood');}
  [18.1,19.0,19.9,20.8,21.7].forEach(x=>{s+=ln(P(x,y1,0),P(x,y1,5.4),'',SC);});
  [.8,1.9,3.0,4.1,5.15].forEach(y=>{s+=ln(P(x1,y,0),P(x1,y,5.4),'',SC);});
  for(let k=0;k<=4;k++){const z=k*1.25+.6;s+=ln(P(18.1,y1,z),P(21.7,y1,z),'', 'style="stroke:#EE8A3A;stroke-width:.7"')+ln(P(x1,.8,z),P(x1,5.15,z),'', 'style="stroke:#EE8A3A;stroke-width:.7"');}
  for(let k=0;k<4;k++){s+=ln(P(18.1+((k%2)*0.9),y1,k*1.25),P(19.0+((k%2)*0.9),y1,(k+1)*1.25),'',SC)+ln(P(x1,.8+(k%2)*1.1,k*1.25),P(x1,1.9+(k%2)*1.1,(k+1)*1.25),'',SC);}
  s+=worker(19.4,4.9,2.5)+worker(21.8,2.5,3.75);
  // scissor lift with electrician
  s+=box(18.2,5.5,0,1.2,.65,.3,'orange');
  const L1=P(18.3,5.8,.3),L2=P(19.3,5.8,1.1),L3=P(18.3,5.8,1.9),L4=P(19.3,5.8,.3),L5=P(18.3,5.8,1.1),L6=P(19.3,5.8,1.9);
  s+=`<path d="M${f(L1)} L${f(L2)} L${f(L3)} M${f(L4)} L${f(L5)} L${f(L6)}" fill="none" style="stroke:#555;stroke-width:1"/>`;
  s+=box(18.15,5.45,1.9,1.3,.75,.08,'orange')+rail([18.15,6.2],[19.45,6.2],1.98,false)+worker(18.8,5.8,1.98);
  s+=van(19.6,5.6,'#2C7376');
  [[21.1,.85],[21.1,.45]].forEach(([a,b])=>s+=cyl(a,b,.22,0,.32,'copper'));
  return s;
}
function bdMEP(){
  let s=flat(12.6,6.6,5,4.9,'#E6E0D5',.012);
  const X0=13, X1=15, Y0=7, Y1=11, FH=1.2;
  for(let k=0;k<3;k++){
    const z=k*FH;
    s+=poly([P(X0,Y0,z),P(X1,Y0,z),P(X1,Y0,z+FH),P(X0,Y0,z+FH)],'#D6D2CA');
    s+=poly([P(X0,Y0,z),P(X0,Y1,z),P(X0,Y1,z+FH),P(X0,Y0,z+FH)],'#C6C1B8');
    s+=box(X0,Y0,z,X1-X0,Y1-Y0,.12,'plain',{top:'#F1EEE8'});
    const zc=z+.12;
    s+=box(13.15,8.6,zc,.5,.4,.35,'steel')+cyl(13.4,9.3,.16,zc,.35,'steel');
    s+=ln(P(14.6,7.1,zc),P(14.6,7.1,zc+FH-.12),'', 'style="stroke:#D9534F;stroke-width:1.5"')+ln(P(14.75,7.1,zc),P(14.75,7.1,zc+FH-.12),'', 'style="stroke:#3D7DBF;stroke-width:1.5"')+ln(P(14.9,7.1,zc),P(14.9,7.1,zc+FH-.12),'', 'style="stroke:#5FA05A;stroke-width:1.5"');
    s+=ln(P(14.6,7.1,zc+.55),P(14.6,Y1,zc+.55),'', 'style="stroke:#D9534F;stroke-width:1.4"')+ln(P(14.75,7.1,zc+.45),P(14.75,Y1,zc+.45),'', 'style="stroke:#3D7DBF;stroke-width:1.4"');
    s+=box(13.15,7.2,zc+.72,1.75,.42,.3,'glass')+box(13.25,7.62,zc+.72,.42,3.2,.3,'glass');
    s+=ln(P(13.45,8.8,zc+.72),P(13.45,8.8,zc+.4),'', 'style="stroke:#7D8584;stroke-width:1"');
  }
  s+=box(X0,Y0,3*FH,X1-X0,Y1-Y0,.15,'plain');
  s+=box(15,7,0,2,4,3.75,'plain',{floors:3,cols:2});
  for(let k=0;k<3;k++)for(let i=0;i<3;i++){const z=k*FH+.35;s+=poly([P(15.25+i*.6,11,z),P(15.65+i*.6,11,z),P(15.65+i*.6,11,z+.5),P(15.25+i*.6,11,z+.5)],'#AFCFD1');}
  const zr=3.75;
  s+=box(13.3,7.3,zr,1.5,1.2,.6,'steel',{cols:3})+`<ellipse cx="${f(P(14.05,7.9,zr+.6)).split(',')[0]}" cy="${f(P(14.05,7.9,zr+.6)).split(',')[1]}" rx="9" ry="5" fill="#7F8C8D"/>`;
  s+=box(15.3,7.3,zr,1.4,1.6,.9,'white',{cols:4})+`<ellipse cx="${f(P(16,8.1,zr+.9)).split(',')[0]}" cy="${f(P(16,8.1,zr+.9)).split(',')[1]}" rx="10" ry="5.6" fill="#9AA6A7"/>`;
  s+=cyl(13.6,10.2,.18,zr,1.1,'steel')+cyl(14.2,10.2,.18,zr,.9,'steel');
  s+=box(15.2,9.6,zr,1.6,1.1,.5,'steel',{cols:4});
  s+=rail([13,11.02],[17,11.02],zr,false)+rail([17.02,7],[17.02,11.02],zr,false);
  s+=box(12.7,11.05,0,.9,.4,.6,'steel')+box(16.6,11.1,0,.8,.35,.7,'white',{top:'#E7A887'});
  return s;
}
function bdSiteCivil(){
  let s=flat(17.6,7.4,4.3,4.4,'#E3D3B6',.012);
  for(let i=0;i<4;i++){const y=7.9+i*.9;s+=`<path class="wsm-dl" d="M${f(P(17.7,y,.02))} Q${f(P(19.8,y+.5,.02))} ${f(P(21.8,y-.2,.02))}" style="stroke:#B39B73"/>`;}
  // silt fence
  s+=ln(P(17.6,7.4,.35),P(21.9,7.4,.35),'', 'style="stroke:#3A3A3A;stroke-width:.8"')+ln(P(17.6,7.4,.35),P(17.6,11.8,.35),'', 'style="stroke:#3A3A3A;stroke-width:.8"');
  // stockpile
  const c=P(21,8.3,0), tp=P(21,8.3,1.0); const rx=1.0*U*1.2247, ry=1.0*U*.7071;
  s+=`<path d="M${(c[0]-rx).toFixed(1)},${c[1].toFixed(1)} L${tp[0].toFixed(1)},${tp[1].toFixed(1)} L${(c[0]+rx).toFixed(1)},${c[1].toFixed(1)} A${rx.toFixed(1)},${ry.toFixed(1)} 0 0 1 ${(c[0]-rx).toFixed(1)},${c[1].toFixed(1)} Z" fill="#CDB68F"/>`;
  // excavator
  s+=box(18.2,7.9,0,1.5,.32,.26,'dark')+box(18.2,8.75,0,1.5,.32,.26,'dark');
  s+=box(18.35,8.0,.26,1.15,.95,.42,'orange')+box(18.4,8.05,.68,.5,.5,.48,'glass');
  const b1=P(19.3,8.55,.7), b2=P(20.15,8.55,1.75), b3=P(20.65,8.55,.55);
  s+=`<path d="M${f(b1)} L${f(b2)} L${f(b3)}" fill="none" style="stroke:#D17128;stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>`;
  s+=`<path d="M${f(b3)} l6,2 l-1,5 l-7,-2 Z" fill="#5C6665" style="stroke:none"/>`;
  s+=worker(19.9,9.3,0);
  // trench with storm pipe + manhole
  s+=flat(18,10.1,3.7,.55,'#8C7A5C',.02);
  [18.3,19.4,20.5].forEach(x=>s+=box(x,10.2,.02,1,.35,.3,'stone'));
  s+=cyl(21.4,10.4,.32,0,.8,'stone',{bands:2});
  // survey crew + stakes
  const tb=P(21.4,11.3,0), tt=P(21.4,11.3,.75);
  s+=[-5,0,5].map(dx=>`<line x1="${tb[0]+dx}" y1="${tb[1]+(dx?0:2)}" x2="${tt[0]}" y2="${tt[1]}" style="stroke:#555;stroke-width:.8"/>`).join('')+box(21.33,11.23,.75,.14,.14,.12,'orange')+worker(21.0,11.4,0);
  [[18.2,11.4],[19.5,11.5],[20.6,11.5],[17.9,9.6]].forEach(([a,b])=>s+=stake(a,b));
  return s;
}
function bdStructural(){
  let s=flat(.5,12.6,5.8,6.1,'#E6E0D5',.012);
  const xs=[1,3,5], ys=[13,15,17], lv=[0,2.3,4.6,6.9];
  for(let k=0;k<3;k++){
    const z0=lv[k], z1=lv[k+1];
    const cols=[]; xs.forEach(x=>ys.forEach(y=>cols.push([x,y])));
    cols.sort((a,b)=>(a[0]+a[1])-(b[0]+b[1])).forEach(([x,y])=>s+=steelCol(x,y,z0,z1));
    // bracing in the front bays
    if(k<2){s+=`<path d="M${f(P(1,17,z0))} L${f(P(3,17,z1-.2))} M${f(P(3,17,z0))} L${f(P(1,17,z1-.2))} M${f(P(5,13,z0))} L${f(P(5,15,z1-.2))} M${f(P(5,15,z0))} L${f(P(5,13,z1-.2))}" fill="none" style="stroke:#4E6E70;stroke-width:1"/>`;}
    // beams at the top of this tier
    ys.forEach(y=>s+=beamX(1,5,y,z1)); xs.forEach(x=>s+=beamY(x,13,17,z1));
    if(k===0){ s+=box(1,13,z1,4,4,.06,'steel',{top:'#C9D0D0'}); for(let i=1;i<10;i++) s+=ln(P(1+i*.4,13,z1+.07),P(1+i*.4,17,z1+.07),'wsm-dl'); }
    if(k===1){ s+=box(1,13,z1,2,4,.06,'steel',{top:'#C9D0D0'}); }
  }
  s+=worker(3.0,15.1,6.9)+worker(4.6,13.1,6.9)+worker(2.2,15.1,4.6);
  // beam bundle + boom lift
  s+=box(1,18,0,3.8,.25,.08,'wood')+box(1.05,18.02,.08,3.7,.21,.12,'steel')+box(1.05,18.02,.2,3.7,.21,.12,'steel');
  s+=box(5.4,16.7,0,.8,.55,.3,'orange')+`<path d="M${f(P(5.8,17,.3))} L${f(P(5.6,16.1,3.6))}" fill="none" style="stroke:#D17128;stroke-width:2.2;stroke-linecap:round"/>`+box(5.35,15.85,3.6,.55,.5,.08,'orange')+worker(5.6,16.1,3.68);
  return s;
}
function bdRealEstate(){
  let s=flat(6.6,12.6,6,9,'#EEE7D8',.012);
  // street + cul-de-sac
  s+=flat(9.3,12.6,1,7.6,'#BDB7AC',.02);
  const cc=P(9.8,20.4,.02); s+=`<ellipse cx="${cc[0].toFixed(1)}" cy="${cc[1].toFixed(1)}" rx="${(1.3*U*1.2247).toFixed(1)}" ry="${(1.3*U*.7071).toFixed(1)}" fill="#BDB7AC"/>`;
  s+=ln(P(9.8,12.6,.03),P(9.8,19.6,.03),'', 'style="stroke:#fff;stroke-width:.8;stroke-dasharray:3 4"');
  // lot lines
  for(let i=0;i<4;i++){const y=12.8+i*2;s+=ln(P(6.8,y,.03),P(9.2,y,.03),'wsm-dl')+ln(P(10.4,y,.03),P(12.4,y,.03),'wsm-dl');}
  [[6.8,12.8],[9.2,12.8],[6.8,18.8],[9.2,18.8],[10.4,18.8],[12.4,18.8],[12.4,16.8],[6.8,16.8]].forEach(([a,b])=>s+=stake(a,b));
  // homes in different stages
  s+=box(7.1,13.2,0,1.7,1.3,.9,'white',{cols:3})+gable(7.0,13.1,.9,1.9,1.5,.55,'#9AA6A7');
  s+=frameHouse(10.7,13.2,1.5,1.3,.85);
  s+=box(7.1,15.2,0,1.7,1.3,.1,'stone')+[[7.5,15.6],[8.2,15.9]].map(([a,b])=>ln(P(a,b,.1),P(a,b,.4),'', 'style="stroke:#5C6665;stroke-width:1.2"')).join('');
  s+=box(10.7,15.2,0,1.5,1.3,.9,'white',{cols:3})+gable(10.6,15.1,.9,1.7,1.5,.55,'#B98A6B');
  // sales center with flags + car
  s+=box(10.6,17.2,0,1.7,1.2,1.0,'glass',{cols:4})+box(10.5,17.1,1.0,1.9,1.4,.1,'plain');
  [[12.6,17.3,'#BF6238'],[12.6,17.9,'#2C7376'],[12.6,18.5,'#EE8A3A']].forEach(([a,b,c])=>{const p0=P(a,b,0),p1=P(a,b,1.4);s+=`<line x1="${p0[0].toFixed(1)}" y1="${p0[1].toFixed(1)}" x2="${p1[0].toFixed(1)}" y2="${p1[1].toFixed(1)}" style="stroke:#6F7877;stroke-width:.7"/><path d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} l-1,9 l6,-4 Z" fill="${c}" style="stroke:none"/>`;});
  s+=car(7.3,19.3,'copper');
  s+=person(10.4,18.6,0,'#BF6238')+person(9.0,18.2,0);
  // entry sign (blank panel)
  const sp1=P(8.4,12.75,0), sp2=P(9.0,12.75,0);
  s+=ln(sp1,P(8.4,12.75,.7),'', 'style="stroke:#6F7877;stroke-width:1"')+ln(sp2,P(9.0,12.75,.7),'', 'style="stroke:#6F7877;stroke-width:1"')+poly([P(8.3,12.75,.45),P(9.1,12.75,.45),P(9.1,12.75,.85),P(8.3,12.75,.85)],'#2C7376');
  [[9.1,14.6],[9.1,16.8],[10.5,20.9],[9.1,20.9]].forEach(([a,b])=>s+=tree(a,b,.55));
  return s;
}
function bdLuxury(){
  let s='';
  // terraced hillside
  s+=box(13.6,13.1,0,8.3,8.8,.35,'stone')+shrub(13.95,13.3,2.2);
  s+=box(13.9,13.3,.35,4.6,3.4,.45,'stone');
  // house 1: glass ground floor, wood-clad cantilever
  s+=box(14.1,13.5,.8,3.9,2.8,1.05,'white',{cols:4,top:'#D9D5CC'});
  s+=poly([P(14.3,16.3,.85),P(17.8,16.3,.85),P(17.8,16.3,1.75),P(14.3,16.3,1.75)],'#B7D9DB');
  for(let i=1;i<6;i++){const x=14.3+i*.58;s+=ln(P(x,16.3,.85),P(x,16.3,1.75),'wsm-dl');}
  s+=box(14.5,13.3,1.85,2.7,3.8,1.0,'wood',{cols:6})+poly([P(14.7,17.1,2.0),P(16.9,17.1,2.0),P(16.9,17.1,2.7),P(14.7,17.1,2.7)],'#B7D9DB');
  s+=box(14.35,13.15,2.85,3.0,4.1,.1,'dark',{top:'#5C6665'});
  // pool deck 1
  s+=box(13.9,16.9,.35,4.6,1.7,.3,'stone',{top:'#E7D3B0'})+flat(14.2,17.15,3.2,1.0,'#9FCCD0',.66)+box(17.6,17.2,.65,.35,.7,.12,'white')+box(17.6,18.0,.65,.35,.5,.12,'white');
  s+=tree(21.5,13.6,.8)+shrub(21.4,16.4,2.2);
  // driveway + car
  s+=flat(19.6,13.4,1.2,3.4,'#D8D2C6',.37)+car(19.85,14.0,'dark','y');
  // house 2 lower on the hill
  s+=box(18.1,17.1,.35,3.8,3.3,.3,'stone');
  s+=box(18.3,17.3,.65,3.3,2.6,1.15,'white',{cols:4,top:'#D9D5CC'});
  s+=poly([P(18.5,19.9,.7),P(21.4,19.9,.7),P(21.4,19.9,1.6),P(18.5,19.9,1.6)],'#B7D9DB');
  s+=box(18.3,17.3,1.8,2,2.6,.85,'glass',{cols:3});
  s+=box(18.15,17.15,2.65,2.3,2.9,.1,'dark',{top:'#5C6665'});
  s+=box(18.1,20.3,.35,3.8,1.5,.28,'stone',{top:'#E7D3B0'})+flat(18.4,20.55,2.8,.85,'#9FCCD0',.64)+person(21.4,21,.63,'#2C7376');
  s+=tree(13.9,21.4,.8)+shrub(16.5,20.5,2.6)+shrub(15.3,21.3,2.2)+tree(17.4,19.4,.7);
  return s;
}

/* ---------- Transportation: detailed vector sites ---------- */
PAL.yard=['#D6D0C4','#C4BDB0','#B0A99B'];
const CONT=['teal','orange','copper','steel','white','dark','teal','steel'];
function lineY(a,b,col,w,dash){return ln(a,b,'', `style="stroke:${col};stroke-width:${w}${dash?';stroke-dasharray:'+dash:''}"`);}
function plane(cx,y0,len=5,span=4.6,tail='#2C7376'){
  let s='';
  const wing=(sg)=>poly([P(cx+sg*.3,y0+len*.36,.48),P(cx+sg*span/2,y0+len*.58,.48),P(cx+sg*span/2,y0+len*.66,.48),P(cx+sg*.3,y0+len*.57,.48)],'#E6E6E1');
  const eng=(sg)=>box(cx+sg*span*.22-.19,y0+len*.33,.12,.38,.8,.34,'steel');
  const stab=(sg)=>poly([P(cx+sg*.15,y0+len-.9,.95),P(cx+sg*1.3,y0+len-.35,.95),P(cx+sg*1.3,y0+len-.15,.95),P(cx+sg*.15,y0+len-.35,.95)],'#F4F4F1');
  s+=wing(-1)+eng(-1)+stab(-1);
  s+=box(cx-.3,y0+.45,.3,.6,len-1.05,.62,'white');
  s+=box(cx-.22,y0+.12,.36,.44,.33,.5,'white')+poly([P(cx-.22,y0+.12,.6),P(cx+.22,y0+.12,.6),P(cx+.22,y0+.25,.75),P(cx-.22,y0+.25,.75)],'#5C6665');
  s+=box(cx-.2,y0+len-.6,.4,.4,.6,.45,'white');
  s+=eng(1)+wing(1)+stab(1);
  s+=poly([P(cx,y0+len-1.15,.92),P(cx,y0+len-.1,.92),P(cx,y0+len,2.0),P(cx,y0+len-.55,2.0)],tail);
  return s;
}
function trRoads(){
  let s=flat(0,.4,11.6,3.6,'#BDB7AC',.012);
  s+=box(0,1.9,0,11.6,.35,.28,'stone');
  [[0,1.22],[0,2.95]].forEach(([a,b])=>s+=lineY(P(0,b,.02),P(11.6,b,.02),'#fff',.8,'5 5'));
  [.55,3.85].forEach(b=>s+=lineY(P(0,b,.02),P(11.6,b,.02),'#fff',.8));
  [.75,1.6].forEach(b=>s+=lineY(P(0,b+.0,.02),P(0,b,.02),'#fff',.1));
  // cars in both directions
  s+=car(1.2,.8,'teal')+car(4.5,1.3,'white')+car(9.2,.8,'copper')+car(2.8,2.55,'steel')+car(8.4,3.05,'white');
  // sign gantry
  s+=box(2.4,.25,0,.15,.15,2.2,'steel')+box(2.4,3.95,0,.15,.15,2.2,'steel')+box(2.35,.25,2.1,.25,3.85,.18,'steel');
  s+=poly([P(2.6,.9,1.45),P(2.6,1.9,1.45),P(2.6,1.9,2.05),P(2.6,.9,2.05)],'#2F6B4F')+poly([P(2.6,2.4,1.45),P(2.6,3.4,1.45),P(2.6,3.4,2.05),P(2.6,2.4,2.05)],'#2F6B4F');
  // overpass carrying a cross street over the highway
  s+=box(5.9,-.2,0,1.9,.75,1.55,'stone')+box(6.4,1.95,0,.9,.25,1.55,'plain');
  s+=box(5.9,4.05,0,1.9,1.1,1.55,'stone');
  s+=poly([P(5.9,5.15,1.55),P(7.8,5.15,1.55),P(7.8,6.3,0),P(5.9,6.3,0)],'#C9C2B5');
  s+=box(5.95,-.2,1.55,1.8,5.35,.32,'plain',{top:'#B8B2A7'});
  s+=box(5.95,-.2,1.87,.12,5.35,.28,'plain')+box(7.63,-.2,1.87,.12,5.35,.28,'plain');
  s+=lineY(P(6.85,-.2,1.88),P(6.85,5.15,1.88),'#fff',.7,'3 4');
  s+=car(6.15,1.6,'orange','y');
  return s;
}
function trTransit(){
  let s='';
  // ground street beneath
  s+=flat(0,10.3,11.6,1.0,'#C9C2B5',.012);
  const piers=[1.2,4.2,7.2,10.2];
  piers.forEach(x=>s+=box(x,8.35,0,.4,.4,1.75,'plain')+box(x-.15,7.85,1.75,.7,1.4,.25,'plain'));
  s+=box(0,7.85,2.0,11.6,1.4,.3,'plain',{top:'#C8C0B1'});
  [8.25,8.85].forEach(b=>s+=lineY(P(0,b,2.31),P(11.6,b,2.31),'#6F7877',.8));
  // station platform + canopy + vertical circulation
  s+=box(6.9,9.25,2.0,3.8,.8,.3,'plain',{top:'#E2DDD3'});
  [7.1,8.9,10.5].forEach(x=>s+=lineY(P(x,9.95,2.3),P(x,9.95,3.35),'#6F7877',.9));
  s+=person(7.8,9.7,2.3,'#BF6238')+person(9.4,9.6,2.3)+person(10.1,9.75,2.3,'#2C7376');
  s+=box(6.8,9.15,3.35,4.0,1.0,.1,'teal',{top:'#5E9FA1'});
  s+=box(10.85,9.3,0,.8,.8,3.45,'glass',{floors:3});
  // two-car light rail train with pantograph
  s+=box(1.0,8.1,2.33,3.0,.9,.78,'white')+box(4.05,8.1,2.33,3.0,.9,.78,'white');
  [1.0,4.05].forEach(x=>{s+=poly([P(x+.1,9.0,2.6),P(x+2.9,9.0,2.6),P(x+2.9,9.0,2.92),P(x+.1,9.0,2.92)],'#9CC5C8')+lineY(P(x,9.0,2.47),P(x+3,9.0,2.47),'#2C7376',1.6);});
  const pa=P(2.4,8.55,3.11), pb=P(2.9,8.55,3.45), pc=P(3.3,8.55,3.11);
  s+=`<path d="M${f(pa)} L${f(pb)} L${f(pc)}" fill="none" style="stroke:#555;stroke-width:.8"/>`;
  // catenary poles + contact wire
  [.3,3.3,6.3,9.3].forEach(x=>{s+=lineY(P(x,9.15,2.3),P(x,9.15,3.75),'#6F7877',1.1)+lineY(P(x,9.15,3.65),P(x,8.3,3.65),'#6F7877',.8);});
  s+=lineY(P(0,8.55,3.47),P(11.6,8.55,3.47),'#555',.6)+lineY(P(0,8.55,3.65),P(11.6,8.55,3.65),'#777',.4);
  s+=car(2,10.5,'white')+van(5.5,10.4,'#EE8A3A');
  return s;
}
function trPorts(){
  let s='';
  // container yard
  s+=flat(.2,12.2,11.6,3.5,'#D6D0C4',.012);
  let k=0;
  for(let r=0;r<3;r++)for(let c=0;c<5;c++){const x=.6+c*2.15,y=12.5+r*1.05,n=1+((r*5+c*7)%3);
    for(let h=0;h<n;h++){s+=box(x,y,h*.48,1.85,.8,.48,CONT[(k++)%CONT.length]);}}
  // RTG crane spanning the middle rows
  const RX=4.55; [[RX,12.3],[RX,15.55],[RX+.25,12.3],[RX+.25,15.55]].forEach(([a,b])=>s+=box(a,b,0,.12,.12,2.0,'white'));
  s+=box(RX-.05,12.25,2.0,.45,3.45,.25,'white')+box(RX-.1,13.4,2.25,.55,.6,.3,'orange');
  // quay apron, rails, quay wall, water
  s+=flat(0,15.8,12,1.95,'#CFC8BB',.012);
  [16.1,17.35].forEach(b=>s+=lineY(P(0,b,.02),P(12,b,.02),'#7D8584',.6));
  s+=poly([P(0,17.75,-.35),P(12,17.75,-.35),P(12,17.75,0),P(0,17.75,0)],'#BBB1A0');
  s+=flat(0,17.75,12,4.25,'#B9D6D9',-.34);
  for(let i=0;i<5;i++)s+=lineY(P(.5+i*2.3,19.2+i*.5,-.33),P(1.4+i*2.3,19.2+i*.5,-.33),'#E2F0F1',.7);
  // container ship moored along the quay
  s+=box(1,18.3,-.34,9.4,2.2,1.05,'dark',{top:'#6B7473'})+poly([P(10.4,18.3,-.34),P(11.5,19.4,-.34),P(10.4,20.5,-.34)],'#4A5352')+poly([P(10.4,18.3,.71),P(11.5,19.4,.71),P(10.4,20.5,.71)],'#6B7473')+poly([P(10.4,20.5,-.34),P(11.5,19.4,-.34),P(11.5,19.4,.71),P(10.4,20.5,.71)],'#5C6665');
  s+=lineY(P(1,20.5,-.05),P(10.4,20.5,-.05),'#BF6238',2);
  k=3;
  for(let c=0;c<6;c++)for(let r=0;r<2;r++){const x=2.9+c*1.2,y=18.5+r*.95,n=1+((c+r)%2);for(let h=0;h<n;h++)s+=box(x,y,.71+h*.45,1.1,.85,.45,CONT[(k++)%CONT.length]);}
  s+=box(1.25,18.55,.71,1.2,1.7,1.7,'white',{floors:4})+box(1.1,18.45,2.41,1.5,1.9,.1,'plain')+box(1.5,19.2,2.5,.5,.5,.6,'copper');
  // two ship-to-shore cranes: portal legs on the quay rails, boom out over the ship
  [3.6,7.6].forEach(x=>{
    [[x,16.0],[x+1.3,16.0],[x,17.25],[x+1.3,17.25]].forEach(([a,b])=>s+=box(a,b,0,.18,.18,3.3,'teal'));
    s+=box(x-.05,15.95,3.3,1.5,1.5,.25,'teal');
    s+=box(x+.45,14.6,3.95,.4,7.0,.35,'teal');
    s+=box(x+.2,15.3,4.3,.9,1.2,.6,'white',{cols:2});
    s+=box(x+.35,16.6,3.55,.6,.5,.4,'white',{top:'#D7ECEC'});
    s+=lineY(P(x+.65,19.6,3.95),P(x+.65,19.6,1.9),'#444',.6)+box(x+.25,19.25,1.55,.8,.7,.35,'orange');
    s+=`<path d="M${f(P(x+.65,14.6,4.3))} L${f(P(x+.65,16.6,6.0))} L${f(P(x+.65,21.6,4.3))}" fill="none" style="stroke:#1F5A5D;stroke-width:.8"/>`;
  });
  // truck with container on the apron
  s+=box(.6,16.4,0,.6,.7,.55,'white')+box(1.25,16.45,.25,2.2,.6,.12,'dark')+box(1.25,16.45,.37,2.2,.6,.48,'orange');
  // tug
  s+=box(8.6,21.0,-.34,1.6,.7,.4,'copper')+box(8.9,21.05,.06,.6,.6,.45,'white');
  return s;
}
function trAviation(){
  let s=flat(12,.4,10,11.8,'#D3CCBF',.012);
  // taxiway centreline + lead-in lines
  s+=lineY(P(12,11.3,.02),P(22,11.3,.02),'#E3B53C',1.2);
  [14.6,18.6].forEach(x=>s+=lineY(P(x,5,.02),P(x,11.3,.02),'#E3B53C',.9));
  [[13.3,4.6],[17.3,4.6]].forEach(([a,b])=>s+=flat(a,b,2.6,6.4,'none',.02).replace('fill="none"','fill="none" style="stroke:#FFFFFF;stroke-width:.6;stroke-dasharray:3 3"'));
  // terminal
  s+=box(12.5,.8,0,7.6,3.2,1.9,'glass',{floors:2,cols:12});
  s+=box(12.3,.6,1.9,8.0,3.6,.18,'plain');
  s+=box(13.4,1.4,2.08,1.6,1.2,.5,'steel',{cols:3})+box(17.6,1.6,2.08,1.2,1.0,.4,'steel');
  // jet bridges to the aircraft's left (+x) door
  [[14.6],[18.6]].forEach(([cx])=>{s+=cyl(cx+1.15,4.25,.3,0,1.15,'plain')+box(cx+1.0,4.0,.8,.32,1.75,.42,'plain',{cols:3})+box(cx+.32,5.62,.74,1.0,.42,.5,'plain',{cols:2});
    s+=box(cx+1.05,4.6,0,.2,.2,.8,'steel');});
  s+=plane(14.6,5.2,5.2,4.9,'#2C7376');
  s+=plane(18.6,5.2,5.2,4.9,'#BF6238');
  // ground support: baggage tug + carts, fuel truck
  s+=box(12.5,8.2,0,.5,.4,.35,'orange')+box(12.5,8.8,0,.5,.6,.35,'steel')+box(12.5,9.6,0,.5,.6,.35,'steel');
  s+=box(20.7,7.0,0,.6,.7,.5,'white')+box(20.7,7.75,0,.6,1.7,.6,'white')+lineY(P(21.3,7.75,.35),P(21.3,9.45,.35),'#BF6238',1.5);
  // control tower
  s+=cyl(21.2,2.6,.42,0,6.0,'plain',{bands:5});
  s+=cyl(21.2,2.6,.75,6.0,.25,'plain')+cyl(21.2,2.6,.82,6.25,.65,'glass')+cyl(21.2,2.6,.9,6.9,.15,'plain');
  s+=lineY(P(21.2,2.6,7.05),P(21.2,2.6,7.9),'#555',.8);
  return s;
}
function trAerospace(){
  let s=flat(12.4,13,9.6,9,'#D3CCBF',.012);
  const X0=12.9,X1=20.4,Y0=13.6,Y1=19.4,WH=1.6,AR=1.7,N=14;
  const arch=(t,y)=>P(X0+(X1-X0)*t,y,WH+AR*Math.sin(Math.PI*t));
  // interior: back wall, floor, contents
  let back=[P(X0,Y0,0)];for(let i=0;i<=N;i++)back.push(arch(i/N,Y0));back.push(P(X1,Y0,0));
  s+=`<polygon points="${back.map(f).join(' ')}" fill="#B9B4AA"/>`;
  s+=poly([P(X0,Y0,0),P(X0,Y1,0),P(X0,Y1,WH),P(X0,Y0,WH)],'#A9A49A');
  s+=flat(X0,Y0,X1-X0,Y1-Y0,'#E9E6DF',.02);
  // fuselage on assembly jigs with work stands
  s+=box(15.9,14.4,.0,.25,.25,.5,'orange')+box(15.9,17.6,0,.25,.25,.5,'orange');
  s+=box(15.6,14.2,.5,.95,4.6,.95,'white',{cols:6})+box(15.72,18.8,.6,.7,.5,.7,'white');
  s+=box(14.3,14.8,0,.9,3.4,1.4,'orange',{floors:3})+box(17.1,14.8,0,.9,3.4,1.4,'orange',{floors:3});
  s+=box(18.6,14.3,.3,1.4,.5,.15,'white')+box(18.4,15.6,0,.12,.12,.3,'steel');
  s+=worker(16.9,16.2,1.4)+worker(14.7,17.5,1.4)+worker(18.8,18.7,0);
  // vault roof strips, left to right
  for(let i=0;i<N;i++){const t0=i/N,t1=(i+1)/N; const g=Math.round(230-18*Math.sin(Math.PI*(t0+.5/N))+(t0>.5?-12:6));
    s+=`<polygon points="${[arch(t0,Y0),arch(t1,Y0),arch(t1,Y1),arch(t0,Y1)].map(f).join(' ')}" fill="rgb(${g},${g-3},${g-8})" style="stroke:#9AA2A1;stroke-width:.35"/>`;}
  s+=box(X0+3.2,Y0+.4,WH+AR-.05,1.1,4.8,.18,'glass');
  // right side wall with windows
  s+=poly([P(X1,Y0,0),P(X1,Y1,0),P(X1,Y1,WH),P(X1,Y0,WH)],'#CDC8BF');
  for(let i=0;i<5;i++)s+=poly([P(X1,Y0+.5+i*1.1,.9),P(X1,Y0+1.2+i*1.1,.9),P(X1,Y0+1.2+i*1.1,1.3),P(X1,Y0+.5+i*1.1,1.3)],'#AFCFD1');
  // front arch frame + stacked door leaves at each end
  let fr='';for(let i=0;i<=N;i++)fr+=(i?'L':'M')+f(arch(i/N,Y1))+' ';
  s+=`<path d="${fr}" fill="none" style="stroke:#7D8584;stroke-width:1.4"/>`;
  s+=lineY(P(X0,Y1,0),P(X0,Y1,WH),'#7D8584',1.4)+lineY(P(X1,Y1,0),P(X1,Y1,WH),'#7D8584',1.4);
  s+=box(X0,Y1,0,1.1,.25,WH+.4,'steel',{cols:2})+box(X1-1.1,Y1,0,1.1,.25,WH+.4,'steel',{cols:2});
  // office annex
  s+=box(20.6,14.0,0,1.2,3.4,1.3,'plain',{floors:2,cols:3});
  // apron: business jet + tug
  s+=plane(15.4,19.9,2.6,2.5,'#5C6665')+box(17.6,20.4,0,.5,.7,.35,'orange');
  return s;
}

/* ---------- Energy: detailed vector sites ---------- */
PAL.grass=['#DCE3CF','#C9D2BA','#B6C0A6'];
function turbine2(x,y,h){
  const b=P(x,y,0), t=P(x,y,h), id='tb'+(turbineId++), L=3.1*U;
  let blades='';for(let k=0;k<3;k++){blades+=`<path d="M0,0 L-1.8,${(-L*0.25).toFixed(1)} L-.5,${(-L).toFixed(1)} L.9,${(-L*0.28).toFixed(1)} Z" transform="rotate(${k*120})" fill="#FFFFFF" style="stroke:#7D8584;stroke-width:.6"/>`;}
  return `<ellipse cx="${b[0].toFixed(1)}" cy="${b[1].toFixed(1)}" rx="7" ry="3.5" fill="#C9C2B5" style="stroke:none"/>`+
    `<polygon points="${(b[0]-2.4).toFixed(1)},${b[1].toFixed(1)} ${(b[0]+2.4).toFixed(1)},${b[1].toFixed(1)} ${(t[0]+1.1).toFixed(1)},${t[1].toFixed(1)} ${(t[0]-1.1).toFixed(1)},${t[1].toFixed(1)}" fill="url(#cg-white)" style="stroke:#8A9291;stroke-width:.5"/>`+
    box(x-.45,y-.18,h-.12,.95,.36,.38,'white')+
    `<g transform="translate(${(t[0]-6).toFixed(1)},${(t[1]-1).toFixed(1)})"><g class="wsm-blades" id="${id}">${blades}</g><circle r="2.3" fill="#FFF" style="stroke:#7D8584;stroke-width:.7"/></g>`;
}
function pylon2(x,y,h){
  const b=P(x,y,0), t=P(x,y,h), w=8, S='style="stroke:#6F7877;stroke-width:.75;fill:none"';
  const lvl=k=>{const p=P(x,y,h*k);return {x:p[0],y:p[1],w:w*(1-k*.82)};};
  let s=`<g ${S}>`;
  s+=`<path d="M${b[0]-w},${b[1]} L${t[0]-1.2},${t[1]} M${b[0]+w},${b[1]} L${t[0]+1.2},${t[1]}"/>`;
  for(let i=0;i<6;i++){const a=lvl(i/6*0.88),c=lvl((i+1)/6*0.88);s+=`<path d="M${(a.x-a.w).toFixed(1)},${a.y.toFixed(1)} L${(c.x+c.w).toFixed(1)},${c.y.toFixed(1)} M${(a.x+a.w).toFixed(1)},${a.y.toFixed(1)} L${(c.x-c.w).toFixed(1)},${c.y.toFixed(1)}"/>`;}
  const A1=lvl(.66),A2=lvl(.84);
  s+=`<path d="M${A1.x-17},${A1.y} L${A1.x+17},${A1.y} M${A2.x-12},${A2.y} L${A2.x+12},${A2.y} M${A1.x-17},${A1.y} L${A1.x-A1.w},${A1.y-5} M${A1.x+17},${A1.y} L${A1.x+A1.w},${A1.y-5}"/>`;
  const att=[[A1.x-16,A1.y+5],[A1.x+16,A1.y+5],[A2.x-11,A2.y+5],[A2.x+11,A2.y+5],[t[0],t[1]]];
  att.slice(0,4).forEach(([ax,ay])=>s+=`<line x1="${ax}" y1="${ay-5}" x2="${ax}" y2="${ay}" style="stroke:#3B4A55;stroke-width:1.4"/>`);
  s+=`</g>`;
  return {svg:s, att};
}
function wire(a,b,sag=9){return `<path d="M${a[0].toFixed(1)},${a[1].toFixed(1)} Q${((a[0]+b[0])/2).toFixed(1)},${((a[1]+b[1])/2+sag).toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}" fill="none" style="stroke:#4E5857;stroke-width:.9"/>`;}
function fenceRect(x0,y0,x1,y1,backOnly){ // back edges only, or front edges only
  return backOnly? fence([x0,y0],[x1,y0])+fence([x0,y0],[x0,y1]) : fence([x0,y1],[x1,y1])+fence([x1,y0],[x1,y1]);
}
function enRenewable(){
  let s=flat(.6,.6,9.8,2.0,'#DCE3CF',.012);
  s+=`<path class="wsm-dl" d="M${f(P(.8,2.3,.02))} Q${f(P(5.5,1.6,.02))} ${f(P(10.2,2.3,.02))}" style="stroke:#C9C2B5;stroke-width:3;opacity:1"/>`;
  s+=turbine2(2.2,1.4,9.5)+turbine2(5.6,1.2,9.5)+turbine2(9.0,1.6,9.5);
  s+=flat(.6,2.8,9.8,7.8,'#E2E6D6',.012)+fenceRect(.6,2.8,10.4,10.6,true);
  s+=flat(.6,9.95,9.8,.6,'#D8D2C6',.015);
  for(let i=0;i<6;i++){
    const x=1.2+i*1.5, ya=3.4, yb=9.5;
    for(let p=0;p<5;p++){const yy=ya+p*(yb-ya)/4;s+=ln(P(x+.45,yy,0),P(x+.45,yy,.5),'', 'style="stroke:#7D8584;stroke-width:.8"');}
    s+=poly([P(x,ya,.35),P(x,yb,.35),P(x+.95,yb,.68),P(x+.95,ya,.68)],'#3F6F88');
    s+=poly([P(x,yb,.35),P(x+.95,yb,.68),P(x+.95,yb,.6),P(x,yb,.28)],'#30586C');
    for(let c=1;c<10;c++){const yy=ya+c*(yb-ya)/10;s+=ln(P(x,yy,.35),P(x+.95,yy,.68),'', 'style="stroke:#7FA3B6;stroke-width:.4"');}
    s+=ln(P(x+.47,ya,.52),P(x+.47,yb,.52),'', 'style="stroke:#7FA3B6;stroke-width:.4"');
  }
  s+=box(2.6,10.0,0,.9,.45,.5,'white',{cols:2})+box(6.6,10.0,0,.9,.45,.5,'white',{cols:2})+worker(4.6,10.25,0);
  s+=fenceRect(.6,2.8,10.4,10.6,false);
  return s;
}
function gantry(a,b,h){ // H-frame between two ground points; returns svg + 3 attach points
  const G='style="stroke:#6F7877;stroke-width:1.1"';
  let s=ln(P(a[0],a[1],0),P(a[0],a[1],h),'',G)+ln(P(b[0],b[1],0),P(b[0],b[1],h),'',G)+ln(P(a[0],a[1],h-.1),P(b[0],b[1],h-.1),'',G);
  const att=[.22,.5,.78].map(k=>P(a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,h-.1));
  att.forEach(p=>s+=`<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${p[0].toFixed(1)}" y2="${(p[1]+4).toFixed(1)}" style="stroke:#3B4A55;stroke-width:1.3"/>`);
  return {svg:s, att:att.map(p=>[p[0],p[1]+4])};
}
function span3(A,B,sag=7){ // connect three conductors left-to-right
  const a=[...A].sort((p,q)=>p[0]-q[0]), b=[...B].sort((p,q)=>p[0]-q[0]);
  return [0,1,2].map(k=>wire(a[k],b[k],sag)).join('');
}
function bucketTruck(x,y,raise){
  let s=box(x,y,0,1.8,.7,.55,'white')+box(x+1.8,y,0,.55,.7,.5,'white')+lineY(P(x,y+.7,.35),P(x+2.35,y+.7,.35),'#EE8A3A',1.6);
  if(raise){s+=`<path d="M${f(P(x+.6,y+.35,.6))} L${f(P(raise[0],raise[1],raise[2]-.9))}" fill="none" style="stroke:#EBEBE6;stroke-width:2.6;stroke-linecap:round"/>`+box(raise[0]-.25,raise[1]-.25,raise[2]-1.0,.5,.5,.35,'orange')+worker(raise[0],raise[1],raise[2]-.65);}
  else s+=box(x+.2,y+.15,.55,1.4,.4,.12,'plain');
  return s;
}
const EN_ROUTE={nuc:null,p1:null,subIn:null,subOut:null,p2:null,sto:null};
function enStorage2(){
  let s=flat(12.6,.6,9,6.6,'#E2DDD3',.012);
  s+=fenceRect(12.6,.6,21.6,7.2,true);
  for(let r=0;r<2;r++)for(let c=0;c<4;c++){
    const x=13.2+c*1.95, y=1.2+r*2.3;
    s+=box(x-.05,y-.05,0,1.6,1.0,.12,'stone')+box(x,y,.12,1.3,.9,.85,'white',{cols:4})+box(x+1.3,y+.1,.12,.2,.7,.6,'steel',{floors:3});
  }
  s+=box(15.0,5.8,0,.7,.5,.6,'steel',{floors:2})+box(17.0,5.8,0,.7,.5,.6,'steel',{floors:2});
  s+=box(19.9,5.3,0,.9,.6,.8,'steel');
  [.25,.45,.65].forEach(d=>s+=ln(P(19.9+d,5.55,.8),P(19.9+d,5.55,1.25),'', 'style="stroke:#3B4A55;stroke-width:1.4"'));
  const g=gantry([19.8,6.6],[21.2,6.6],2.4); s+=g.svg; EN_ROUTE.sto=g.att;
  s+=fenceRect(12.6,.6,21.6,7.2,false);
  return s;
}
function enNuclear2(){
  let s=flat(.6,11.4,10.2,10.2,'#E4E0D7',.012);
  s+=fenceRect(.6,11.4,10.8,21.6,true);
  s+=tower(3.3,14.3,2.25,6.2);
  const tp=P(3.3,14.3,6.2);
  [[2,-10,14,.75],[18,-20,17,.6],[38,-28,19,.45],[60,-34,20,.3]].forEach(([dx,dy,r,o])=>s+=`<circle cx="${(tp[0]+dx).toFixed(1)}" cy="${(tp[1]+dy).toFixed(1)}" r="${r}" fill="rgba(255,255,255,${o})" style="stroke:none"/>`);
  s+=box(6.2,12.0,0,4.3,2.4,2.3,'plain',{cols:7,floors:2})+box(6.1,11.9,2.3,4.5,2.6,.15,'plain',{top:'#D9D5CC'})+box(7.6,12.4,2.45,1.4,.9,.5,'steel');
  s+=tower(2.9,19.3,1.8,4.9);
  s+=box(5.6,15.4,0,2.4,1.5,1.4,'plain',{floors:2,cols:3});
  s+=cyl(8.4,17.6,1.55,0,2.8,'plain',{bands:3})+dome(8.4,17.6,1.55,2.8,'plain');
  s+=box(6.0,19.9,0,1.6,1.2,1.1,'plain',{floors:2});
  // main step-up transformer + switchyard gantry feeding the grid
  s+=box(9.0,19.5,0,.9,.8,.85,'steel');
  [.25,.45,.65].forEach(d=>s+=ln(P(9.0+d,19.9,.85),P(9.0+d,19.9,1.3),'', 'style="stroke:#3B4A55;stroke-width:1.4"'));
  const g=gantry([10.3,18.6],[10.3,20.4],2.4); s+=g.svg; EN_ROUTE.nuc=g.att;
  s+=fenceRect(.6,11.4,10.8,21.6,false);
  return s;
}
function enUtilityOps(){
  let s=flat(12.6,7.6,6.8,6.0,'#E2DDD3',.012);
  s+=box(12.9,7.9,0,3.6,2.3,1.7,'plain',{floors:2,cols:5})+box(12.8,7.8,1.7,3.8,2.5,.12,'plain',{top:'#D9D5CC'});
  s+=poly([P(13.6,10.2,.05),P(14.4,10.2,.05),P(14.4,10.2,1.0),P(13.6,10.2,1.0)],'#2C7376');
  s+=flag(16.9,10.0,2.4,'#2C7376');
  for(let k=0;k<3;k++)s+=box(17.0,8.0+k*.3,0,2.1,.24,.22,'wood');
  s+=cyl(17.6,9.6,.35,0,.5,'copper')+cyl(18.5,9.6,.35,0,.5,'copper');
  s+=flat(12.8,10.8,6.4,2.6,'#DDD8CE',.015);
  s+=ln(P(18.6,11.6,0),P(18.6,11.6,3.9),'', 'style="stroke:#8A6E52;stroke-width:1.8"')+ln(P(18.6,11.1,3.6),P(18.6,12.1,3.6),'', 'style="stroke:#8A6E52;stroke-width:1.2"');
  s+=bucketTruck(14.6,11.0,[18.2,11.6,3.9]);
  s+=bucketTruck(13.0,12.4,null)+car(16.2,12.6,'white');
  return s;
}
function enSubstation2(){
  let s=flat(13.2,14.2,8.4,7.4,'#DDD8CE',.012);
  s+=fenceRect(13.2,14.2,21.6,21.6,true);
  // outgoing gantry on the north side, feeding storage
  const go=gantry([19.8,14.7],[21.2,14.7],2.6); s+=go.svg; EN_ROUTE.subOut=go.att;
  // transformers
  [[14.6,14.8],[17.0,14.8]].forEach(([a,b])=>{
    s+=box(a,b,0,1.6,1.2,.15,'stone')+box(a+.15,b+.15,.15,1.3,.9,1.0,'steel');
    for(let i=1;i<6;i++)s+=ln(P(a+.15+i*.22,b+1.05,.25),P(a+.15+i*.22,b+1.05,1.05),'', 'style="stroke:#6F7877;stroke-width:.7"');
    [.4,.8,1.2].forEach(d=>s+=ln(P(a+d,b+.45,1.15),P(a+d,b+.45,1.75),'', 'style="stroke:#3B4A55;stroke-width:1.6"'));
  });
  // breakers + bus
  [15.2,16.2,17.8,18.8].forEach(a=>s+=box(a,17.3,0,.35,.35,.6,'steel')+ln(P(a+.17,17.47,.6),P(a+.17,17.47,1.3),'', 'style="stroke:#3B4A55;stroke-width:1.4"'));
  [18.9,19.4,19.9].forEach(y=>s+=ln(P(14,y,2.5),P(19.2,y,2.5),'', 'style="stroke:#7E8786;stroke-width:.6"'));
  [[16.6,18.6],[19.2,18.6]].forEach(([a,b])=>s+=ln(P(a,b,0),P(a,b,2.6),'', 'style="stroke:#6F7877;stroke-width:1"')+ln(P(a,b+1.6,0),P(a,b+1.6,2.6),'', 'style="stroke:#6F7877;stroke-width:1"'));
  // incoming gantry from the nuclear plant
  const gi=gantry([14.0,18.6],[14.0,20.2],2.6); s+=gi.svg; EN_ROUTE.subIn=gi.att;
  s+=box(19.9,19.4,0,1.3,1.6,1.1,'plain',{cols:2})+poly([P(19.9,20.0,.1),P(19.9,20.5,.1),P(19.9,20.5,.85),P(19.9,20.0,.85)],'#2C7376');
  s+=fenceRect(13.2,14.2,21.6,21.6,false);
  return s;
}
function enGrid2(){
  const p1=pylon2(12.0,19.4,7.2), p2=pylon2(21.0,10.6,7.6);
  let s=p1.svg+p2.svg;
  const a1=p1.att.slice(0,3), a2=p2.att.slice(0,3);
  if(EN_ROUTE.nuc) s+=span3(EN_ROUTE.nuc,a1,5);
  if(EN_ROUTE.subIn) s+=span3(a1,EN_ROUTE.subIn,5);
  if(EN_ROUTE.subOut) s+=span3(EN_ROUTE.subOut,a2,8);
  if(EN_ROUTE.sto) s+=span3(a2,EN_ROUTE.sto,8);
  return s;
}

/* ---------- Water & Environment: detailed vector sites ---------- */
function clarifier(cx,cy,r){
  let s=cyl(cx,cy,r,0,.55,'stone',{top:'#B5D3D6'});
  const c=P(cx,cy,.56), rx=r*U*1.2247*.92, ry=r*U*.7071*.92;
  s+=`<ellipse cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" style="stroke:#8FB5B9;stroke-width:.6"/>`;
  s+=cyl(cx,cy,.25,.55,.25,'plain')+ln(P(cx,cy,.75),P(cx+r,cy,.75),'', 'style="stroke:#6F7877;stroke-width:1.6"')+ln(P(cx,cy,.6),P(cx-r*.7,cy+r*.7,.6),'', 'style="stroke:#6F7877;stroke-width:.7"');
  return s;
}
function stream(){
  const L=[[1.0,0],[1.4,4],[0.8,8],[1.5,12],[1.0,16],[1.6,22]]; const w=1.3;
  const left=L.map(([x,y])=>P(x-w/2,y,-.2)), right=L.map(([x,y])=>P(x+w/2,y,-.2)).reverse();
  let s=`<polygon points="${left.concat(right).map(f).join(' ')}" fill="#B9D6D9" style="stroke:#9FC2C4;stroke-width:.6"/>`;
  [[1.2,3],[0.9,9],[1.3,14.5],[1.2,19]].forEach(([x,y])=>s+=ln(P(x-.3,y,-.19),P(x+.1,y+.7,-.19),'', 'style="stroke:#E2F0F1;stroke-width:.7"'));
  return s;
}
function waWater(){
  let s=flat(2,.6,10.2,10.6,'#E4E0D7',.012);
  // headworks + primary clarifiers
  s+=box(2.4,.9,0,1.8,1.3,1.4,'plain',{floors:2,cols:2});
  s+=clarifier(3.6,3.9,1.45)+clarifier(3.6,7.6,1.45);
  // aeration basins with diffused-air bubbles and walkways
  s+=box(6,1,0,4.4,4.6,.6,'stone',{top:'#A9CBCE'});
  [2.15,3.3,4.45].forEach(y=>s+=box(6,y,.6,4.4,.12,.05,'plain'));
  for(let i=0;i<36;i++){const x=6.3+(i%9)*.48+((i*7)%3)*.05, y=1.25+Math.floor(i/9)*1.15+((i*5)%3)*.18;const p=P(x,y,.61);s+=`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="1.1" fill="#E2F0F1" style="stroke:none"/>`;}
  s+=rail([6,5.6],[10.4,5.6],.6,false);
  // secondary clarifier + digesters
  s+=clarifier(8.0,8.4,1.7);
  s+=cyl(11.1,1.9,.85,0,2.0,'plain',{bands:2})+dome(11.1,1.9,.85,2.0,'plain');
  s+=cyl(11.1,4.1,.85,0,2.0,'plain',{bands:2})+dome(11.1,4.1,.85,2.0,'plain');
  // operations building, UV channel, outfall
  s+=box(10.4,7.6,0,1.6,2.4,1.3,'plain',{floors:2,cols:3})+poly([P(10.4,9.4,.1),P(10.4,9.9,.1),P(10.4,9.9,.85),P(10.4,9.4,.85)],'#2C7376');
  s+=box(5.6,9.9,0,3.2,.6,.35,'stone',{top:'#A9CBCE'});
  s+=ln(P(5.6,10.2,.2),P(1.6,10.6,-.1),'', 'style="stroke:#7D8584;stroke-width:2"');
  s+=ln(P(5.2,3.9,.4),P(6,3.9,.4),'', 'style="stroke:#7D8584;stroke-width:1.6"')+ln(P(10.4,4.2,.4),P(9.0,7.4,.4),'', 'style="stroke:#7D8584;stroke-width:1.6"');
  s+=worker(7.4,5.75,.65)+person(10.2,10.3,0,'#2C7376');
  return s;
}
function waRemediation(){
  let s=flat(2.2,12,8.6,9.6,'#E3D3B6',.012);
  // silt fence along the stream side
  s+=ln(P(2.2,12,.35),P(2.2,21.6,.35),'', 'style="stroke:#3A3A3A;stroke-width:.8"')+ln(P(2.2,12,.35),P(10.8,12,.35),'', 'style="stroke:#3A3A3A;stroke-width:.8"');
  // lined excavation cell
  s+=flat(3,12.8,4.4,4.2,'#9C9486',.02)+flat(3.4,13.2,3.6,3.4,'#7E786E',.03);
  for(let i=1;i<4;i++)s+=ln(P(3.4+i*.9,13.2,.04),P(3.4+i*.9,16.6,.04),'', 'style="stroke:#6A645B;stroke-width:.5"');
  // excavator loading a dump truck
  s+=box(7.6,13.2,0,1.4,.3,.25,'dark')+box(7.6,14.0,0,1.4,.3,.25,'dark')+box(7.7,13.3,.25,1.1,.9,.42,'orange')+box(7.75,13.35,.67,.5,.45,.45,'glass');
  s+=`<path d="M${f(P(7.75,13.75,.7))} L${f(P(6.8,13.75,1.6))} L${f(P(6.3,13.75,.6))}" fill="none" style="stroke:#D17128;stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>`;
  s+=box(8.3,15.2,0,.7,.75,.65,'white')+box(9.0,15.2,0,1.6,.75,.75,'orange');
  // covered soil stockpile with weights
  const c=P(5,19.2,0), tp=P(5,19.2,.9), rx=1.6*U*1.2247, ry=1.0*U*.7071;
  s+=`<path d="M${(c[0]-rx).toFixed(1)},${c[1].toFixed(1)} Q${tp[0].toFixed(1)},${(tp[1]-12).toFixed(1)} ${(c[0]+rx).toFixed(1)},${c[1].toFixed(1)} A${rx.toFixed(1)},${ry.toFixed(1)} 0 0 1 ${(c[0]-rx).toFixed(1)},${c[1].toFixed(1)} Z" fill="#4A5352"/>`;
  [[-14,-4],[0,-9],[14,-4],[-6,2],[8,2]].forEach(([dx,dy])=>s+=`<ellipse cx="${(c[0]+dx).toFixed(1)}" cy="${(c[1]+dy-4).toFixed(1)}" rx="2.4" ry="1.4" fill="#2E3333" style="stroke:none"/>`);
  // monitoring wells with protective casings
  [[2.8,18],[7.4,20.8],[9.6,17.6],[3.2,21]].forEach(([a,b])=>s+=box(a-.12,b-.12,0,.24,.24,.55,'orange')+box(a-.2,b-.2,0,.4,.4,.08,'stone'));
  // pump-and-treat system: tanks, carbon vessels, trailer
  s+=box(8.0,18.3,0,2.5,1.2,1.0,'white',{cols:3});
  s+=cyl(8.4,20.2,.38,0,1.2,'steel')+cyl(9.3,20.2,.38,0,1.2,'steel')+cyl(10.2,20.2,.38,0,1.2,'plain');
  s+=ln(P(8.4,19.5,.6),P(10.2,19.5,.6),'', 'style="stroke:#7D8584;stroke-width:1.2"');
  // crew in Tyvek
  s+=person(4.4,17.4,0,'#F4F4F2')+person(6.4,17.6,0,'#F4F4F2')+worker(7.2,16.6,0);
  return s;
}
function waRecycling(){
  let s=flat(12.2,12,9.6,9.6,'#DDD8CE',.012);
  // truck scale + scale house
  s+=flat(12.6,12.4,3.4,1,'#B9B2A6',.02)+box(16.3,12.3,0,.9,.9,.9,'plain',{cols:2});
  s+=box(12.9,12.55,0,.7,.7,.7,'white')+box(13.6,12.55,0,1.8,.7,.85,'teal');
  // MRF building with high bay and open tipping-floor door
  s+=box(13,14.2,0,6.6,4.6,2.6,'plain',{cols:6});
  s+=box(12.9,14.1,2.6,6.8,4.8,.12,'plain',{top:'#C9C4BA'});
  [0,1,2,3].forEach(i=>s+=poly([P(13.4+i*1.6,14.4,2.72),P(14.6+i*1.6,14.4,2.72),P(14.6+i*1.6,18.6,2.72),P(13.6+i*1.6,18.6,3.25),P(13.6+i*1.6,14.4,3.25)],'#B7D9DB'));
  s+=poly([P(13.6,18.8,0),P(15.6,18.8,0),P(15.6,18.8,1.9),P(13.6,18.8,1.9)],'#5C6665');
  s+=poly([P(16.6,18.8,0),P(17.8,18.8,0),P(17.8,18.8,1.6),P(16.6,18.8,1.6)],'#5C6665');
  // inclined conveyor into the building
  s+=`<path d="M${f(P(19.6,17.0,2.0))} L${f(P(21.3,17.0,.3))}" fill="none" style="stroke:#7D8584;stroke-width:3.2;stroke-linecap:round"/>`;
  s+=lineY(P(19.6,17.0,2.15),P(21.3,17.0,.45),'#EE8A3A',.8);
  // bales of sorted material
  const BC=['#7FA3B6','#9DBD89','#C2906F','#E8E4DA','#7FA3B6','#C9C2B5'];
  for(let r=0;r<2;r++)for(let c=0;c<4;c++){const x=13.3+c*1.15,y=20.1+r*.85; s+=box(x,y,0,1.0,.8,.7,[BC[(r*4+c)%6],BC[(r*4+c)%6],BC[(r*4+c)%6]].map((h,i)=>i?shade(h,i):h),{floors:2});}
  // roll-off containers + collection truck at the door
  s+=box(19.4,19.4,0,2.0,.9,.7,'teal')+box(19.4,20.5,0,2.0,.9,.7,'copper');
  s+=box(13.75,18.95,0,.75,.85,.75,'white')+box(14.5,18.95,0,1.6,.85,.9,'teal');
  return s;
}
function shade(hex,i){const n=parseInt(hex.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;const k=i===1?.86:.74;return '#'+[r,g,b].map(v=>Math.round(v*k).toString(16).padStart(2,'0')).join('');}
function waCarbon(){
  let s=flat(12.6,.6,9,10.6,'#E2DDD3',.012);
  // pipe rack
  [13.2,15.2,17.2,19.2].forEach(x=>s+=ln(P(x,6.2,0),P(x,6.2,1.6),'', 'style="stroke:#6F7877;stroke-width:1"')+ln(P(x,7.2,0),P(x,7.2,1.6),'', 'style="stroke:#6F7877;stroke-width:1"')+ln(P(x,6.2,1.6),P(x,7.2,1.6),'', 'style="stroke:#6F7877;stroke-width:1"'));
  [6.45,6.75,7.0].forEach((y,i)=>s+=ln(P(13.2,y,1.65),P(19.2,y,1.65),'', `style="stroke:${['#7D8584','#5FA05A','#9AA6A7'][i]};stroke-width:1.6"`));
  // absorber column with platforms + stripper
  s+=box(13.2,1.4,0,2.2,2.2,.3,'stone');
  s+=cyl(14.3,2.5,.75,.3,8.2,'plain',{bands:6});
  [3.2,5.8,8.1].forEach(z=>{const c=P(14.3,2.5,z);s+=`<ellipse cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" rx="${(1.05*U*1.2247).toFixed(1)}" ry="${(1.05*U*.7071).toFixed(1)}" fill="none" style="stroke:#EE8A3A;stroke-width:1"/>`;});
  s+=ln(P(15.0,3.1,.3),P(15.0,3.1,8.5),'', 'style="stroke:#6F7877;stroke-width:.7;stroke-dasharray:1.5 1.5"');
  s+=cyl(16.9,2.6,.55,0,5.2,'plain',{bands:4})+cyl(16.9,2.6,.15,5.2,.6,'steel');
  // compressor building + heat exchangers
  s+=box(18.3,1.2,0,3,2.6,1.8,'plain',{floors:2,cols:4})+box(18.6,1.5,1.8,1.2,1.0,.4,'steel')+box(20.1,1.5,1.8,.9,1.0,.4,'steel');
  s+=box(13.2,8.0,0,3.2,1.1,.6,'steel',{cols:6});
  // CO2 pipeline to the fenced injection well pad
  s+=flat(18.4,8.0,3.0,2.8,'#D8D2C6',.015)+fence([18.4,8.0],[21.4,8.0])+fence([18.4,8.0],[18.4,10.8]);
  s+=ln(P(16.4,8.5,.3),P(19.9,9.4,.3),'', 'style="stroke:#5FA05A;stroke-width:2"');
  s+=box(19.6,9.1,0,.6,.6,.25,'stone')+cyl(19.9,9.4,.16,.25,1.0,'teal')+ln(P(19.6,9.4,.8),P(20.2,9.4,.8),'', 'style="stroke:#1F5A5D;stroke-width:2"');
  s+=box(20.6,9.8,0,.5,.5,.6,'white');
  s+=fence([18.4,10.8],[21.4,10.8])+fence([21.4,8.0],[21.4,10.8]);
  s+=worker(16.2,4.6,0)+worker(14.9,3.3,5.8);
  return s;
}

/* ---------- Urban Planning: detailed vector sites ---------- */
function flag(x,y,h,c='#B4413C'){
  const b=P(x,y,0), t=P(x,y,h);
  return `<line x1="${b[0].toFixed(1)}" y1="${b[1].toFixed(1)}" x2="${t[0].toFixed(1)}" y2="${t[1].toFixed(1)}" style="stroke:#7D8584;stroke-width:.8"/>`+
   `<path d="M${t[0].toFixed(1)},${(t[1]+.5).toFixed(1)} l8,-1.2 l0,5 l-8,1.2 Z" fill="${c}" style="stroke:none"/><path d="M${t[0].toFixed(1)},${(t[1]+.5).toFixed(1)} l3.4,-.5 l0,2.4 l-3.4,.5 Z" fill="#2E4A6B" style="stroke:none"/>`;
}
function portico(x0,x1,y,z0,z1,n,ped=.7){ // columns + pediment on a +y facing plane
  let s=poly([P(x0,y,z1),P(x1,y,z1),P(x1,y,z1+.22),P(x0,y,z1+.22)],'#F4F2EE');
  for(let i=0;i<n;i++){const x=x0+.15+(x1-x0-.3)*i/(n-1);s+=ln(P(x,y,z0),P(x,y,z1),'', 'style="stroke:#9AA2A1;stroke-width:2.2"')+ln(P(x,y,z0),P(x,y,z1),'', 'style="stroke:#FBFAF7;stroke-width:1.2"');}
  s+=poly([P(x0,y,z1+.22),P(x1,y,z1+.22),P((x0+x1)/2,y,z1+.22+ped)],'#EDEBE6');
  return s;
}
function steps(x,y,w,n,dir=1){let s='';for(let i=0;i<n;i++)s+=box(x,y+i*.18,0,w,.18*(n-i)+.01,.12*(n-i),'stone');return s;}
function tent(x,y,w,top='#FFFFFF',trim='#EE8A3A'){
  const h=.85, pk=P(x+w/2,y+w/2,h+.45); let s='';
  [[x,y],[x+w,y],[x,y+w],[x+w,y+w]].forEach(([a,b])=>s+=ln(P(a,b,0),P(a,b,h),'', 'style="stroke:#7D8584;stroke-width:.7"'));
  s+=`<polygon points="${[P(x,y,h),P(x+w,y,h),pk].map(f).join(' ')}" fill="${top}"/><polygon points="${[P(x,y,h),P(x,y+w,h),pk].map(f).join(' ')}" fill="${top}"/>`;
  s+=`<polygon points="${[P(x,y+w,h),P(x+w,y+w,h),pk].map(f).join(' ')}" fill="${top}"/><polygon points="${[P(x+w,y,h),P(x+w,y+w,h),pk].map(f).join(' ')}" fill="#E6E3DC"/>`;
  s+=poly([P(x,y+w,h),P(x+w,y+w,h),P(x+w,y+w,h-.15),P(x,y+w,h-.15)],trim)+poly([P(x+w,y,h),P(x+w,y+w,h),P(x+w,y+w,h-.15),P(x+w,y,h-.15)],trim);
  return s;
}
function board(x,y,cols=['#9DBD89','#E7A887','#7FA3B6']){
  let s=ln(P(x+.1,y,0),P(x+.15,y,.95),'', 'style="stroke:#8A7A66;stroke-width:.8"')+ln(P(x+.75,y,0),P(x+.7,y,.95),'', 'style="stroke:#8A7A66;stroke-width:.8"');
  s+=poly([P(x,y,.4),P(x+.85,y,.4),P(x+.85,y,1.05),P(x,y,1.05)],'#FFFFFF');
  s+=poly([P(x+.08,y,.48),P(x+.4,y,.48),P(x+.4,y,.8),P(x+.08,y,.8)],cols[0])+poly([P(x+.45,y,.48),P(x+.77,y,.48),P(x+.77,y,.68),P(x+.45,y,.68)],cols[1])+poly([P(x+.45,y,.72),P(x+.77,y,.72),P(x+.77,y,.97),P(x+.45,y,.97)],cols[2]);
  return s;
}
function bus(x,y,col='#2C7376'){
  let s=box(x,y,.12,2.6,.8,.78,'white');
  s+=poly([P(x+.1,y+.8,.45),P(x+2.5,y+.8,.45),P(x+2.5,y+.8,.75),P(x+.1,y+.8,.75)],'#9CC5C8');
  s+=ln(P(x,y+.8,.32),P(x+2.6,y+.8,.32),'', `style="stroke:${col};stroke-width:2"`);
  s+=box(x+.8,y+.15,.9,1.0,.5,.1,'steel');
  return s;
}
function upCityHall(){
  let s=flat(.6,.6,10.2,10.2,'#E9E3D8',.012);
  // lawn + parking
  s+=flat(1.2,8.2,9,2.4,'#DCE3CF',.015)+flat(.8,.8,1.6,7,'#C9C2B5',.015);
  for(let i=1;i<6;i++)s+=ln(P(.8,.8+i*1.15,.02),P(2.4,.8+i*1.15,.02),'', 'style="stroke:#fff;stroke-width:.6"');
  s+=car(.95,1.05,'teal')+car(.95,3.35,'white')+car(.95,4.5,'copper')+car(.95,6.8,'steel');
  // main building with wings and central tower
  s+=box(3,1.4,0,7.2,4.6,2.6,'plain',{floors:3,cols:10});
  s+=box(2.9,1.3,2.6,7.4,4.8,.15,'plain',{top:'#D9D5CC'});
  s+=box(5.4,2.4,2.75,2.4,2.4,1.1,'plain',{cols:3})+box(5.3,2.3,3.85,2.6,2.6,.12,'plain');
  s+=box(5.9,2.9,3.97,1.4,1.4,2.2,'plain',{floors:2});
  const cf=P(6.6,4.3,5.3); s+=`<ellipse cx="${cf[0].toFixed(1)}" cy="${cf[1].toFixed(1)}" rx="4.2" ry="5.2" transform="skewY(-30) " style="display:none"/>`;
  s+=`<circle cx="${cf[0].toFixed(1)}" cy="${cf[1].toFixed(1)}" r="5" fill="#FFFFFF" style="stroke:#7D8584;stroke-width:.7"/><path d="M${cf[0].toFixed(1)},${cf[1].toFixed(1)} l0,-3.4 M${cf[0].toFixed(1)},${cf[1].toFixed(1)} l2.4,1" style="stroke:#14302E;stroke-width:.8"/>`;
  s+=poly([P(5.9,2.9,6.17),P(7.3,2.9,6.17),P(6.6,3.6,7.3)],'#B98A6B')+poly([P(5.9,4.3,6.17),P(7.3,4.3,6.17),P(6.6,3.6,7.3)],'#C9A084')+poly([P(7.3,2.9,6.17),P(7.3,4.3,6.17),P(6.6,3.6,7.3)],'#A87558');
  // portico + steps on the public (front) face
  s+=box(4.6,6.0,0,4.0,.9,.15,'stone');
  s+=portico(4.7,8.5,6.85,.15,2.1,6,.6);
  s+=steps(4.9,6.9,3.4,4);
  s+=flag(3.9,7.6,2.8)+flag(9.2,7.6,2.8,'#2C7376');
  s+=person(5.4,7.9,0)+person(7.6,8.3,0,'#BF6238');
  return s;
}
function upPlaza(){
  let s=flat(11.4,.6,10.2,9.8,'#E9E3D8',.012);
  for(let i=1;i<7;i++)s+=ln(P(11.4+i*1.45,.6,.02),P(11.4+i*1.45,10.4,.02),'wsm-dl');
  // splash pad + trees in a grid
  const sp=P(17.5,2.6,.02); s+=`<ellipse cx="${sp[0].toFixed(1)}" cy="${sp[1].toFixed(1)}" rx="${(1.4*U*1.2247).toFixed(1)}" ry="${(1.4*U*.7071).toFixed(1)}" fill="#C7DFE0" style="stroke:#9FC2C4;stroke-width:.6"/>`;
  [[-.5,-.3],[.4,.2],[-.1,.6],[.6,-.5]].forEach(([dx,dy])=>{const p=P(17.5+dx,2.6+dy,.02);s+=`<path d="M${p[0].toFixed(1)},${p[1].toFixed(1)} l0,-7" style="stroke:#9FC2C4;stroke-width:1.2"/>`;});
  [[12.2,1.3],[14.6,1.3],[20.8,1.3],[12.2,9.6],[20.8,6.2]].forEach(([a,b])=>s+=tree(a,b,.75));
  // community open house: tents, map boards, residents
  s+=tent(12.4,3.4,1.5,'#FFFFFF','#EE8A3A')+tent(14.4,3.4,1.5,'#FFFFFF','#2C7376');
  s+=board(12.6,5.3)+board(13.8,5.3,['#E7A887','#B7D9DB','#9DBD89'])+board(15.0,5.3,['#7FA3B6','#9DBD89','#F7B37A']);
  s+=box(16.4,4.3,0,1.6,1.0,.55,'wood',{top:'#D8E3CF'})+box(16.8,4.5,.55,.5,.5,.35,'white')+box(17.4,4.6,.55,.3,.3,.5,'plain');
  [[12.9,6.2,'#BF6238'],[13.5,6.4,'#2C7376'],[14.4,6.1,'#5C7C8A'],[15.3,6.5,'#9DBD89'],[16.6,5.7,'#BF6238'],[17.6,5.9,'#E9C93C'],[15.9,6.9,'#7FA3B6']].forEach(([a,b,c])=>s+=person(a,b,0,c));
  // food truck, bike racks, parklet + crosswalk
  s+=box(18.8,4.4,0,2.2,1.0,1.0,'teal',{top:'#5E9FA1'})+box(18.9,5.4,.75,2.0,.4,.06,'orange')+poly([P(19.1,5.4,.45),P(20.4,5.4,.45),P(20.4,5.4,.8),P(19.1,5.4,.8)],'#F7E7C9');
  for(let i=0;i<4;i++)s+=`<path d="M${f(P(19.2+i*.35,7.4,0))} Q${f(P(19.2+i*.35,7.4,.5))} ${f(P(19.2+i*.35,7.8,0))}" fill="none" style="stroke:#6F7877;stroke-width:.9"/>`;
  s+=flat(11.6,8.4,3.2,1.2,'#C9A084',.03)+box(11.8,8.5,0,2.8,.15,.4,'wood')+tree(14.3,9.1,.5);
  for(let i=0;i<6;i++)s+=flat(16.2+i*.42,10.0,.24,.7,'#FFFFFF',.03);
  return s;
}
function upCapitol(){
  let s=flat(.6,11.4,10.2,10.2,'#E4E9DC',.012);
  // symmetrical walks
  s+=flat(5.4,17.4,1.0,4.2,'#E3DDD1',.02)+flat(1.4,19.8,8.4,.8,'#E3DDD1',.02);
  // wings + central block
  s+=box(1.2,12.4,0,3.2,4.2,2.2,'white',{floors:2,cols:6})+box(1.1,12.3,2.2,3.4,4.4,.15,'plain');
  s+=box(7.4,12.4,0,3.2,4.2,2.2,'white',{floors:2,cols:6})+box(7.3,12.3,2.2,3.4,4.4,.15,'plain');
  s+=box(4.2,12.0,0,3.4,5.0,2.7,'white',{floors:2,cols:5})+box(4.1,11.9,2.7,3.6,5.2,.18,'plain');
  // drum with columns, dome, lantern
  s+=cyl(5.9,14.5,1.35,2.88,1.2,'white');
  for(let i=0;i<=8;i++){const a=Math.PI*(i/8);const x=5.9+1.35*Math.cos(a)*.707-1.35*Math.sin(a)*-.707*0, y=14.5+1.35*Math.sin(a)*.707+1.35*Math.cos(a)*-.707*0;}
  for(let i=0;i<9;i++){const t=Math.PI*(0.08+0.84*i/8); const dx=Math.cos(t), dy=Math.sin(t); const px=5.9+1.35*(dx*.7071+dy*.7071), py=14.5+1.35*(-dx*.7071+dy*.7071); s+=ln(P(px,py,2.92),P(px,py,4.0),'', 'style="stroke:#B8B3AA;stroke-width:1.1"');}
  s+=cyl(5.9,14.5,1.45,4.08,.15,'plain')+dome(5.9,14.5,1.3,4.23,'white');
  s+=cyl(5.9,14.5,.32,5.7,.55,'white')+dome(5.9,14.5,.32,6.25,'white')+ln(P(5.9,14.5,6.6),P(5.9,14.5,7.1),'', 'style="stroke:#7D8584;stroke-width:.8"');
  // portico + grand stair
  s+=portico(4.6,7.2,17.0,.1,2.4,6,.7);
  s+=steps(4.6,17.05,2.6,5);
  s+=flag(3.6,19.4,3.2)+flag(8.2,19.4,3.2,'#2C7376');
  s+=tree(1.6,18.6,.85)+tree(9.6,18.6,.85)+tree(1.6,21.2,.7)+tree(9.6,21.2,.7);
  s+=person(5.6,18.9,0,'#2C7376')+person(6.3,19.6,0);
  return s;
}
function upDistrict(){
  let s=flat(11.4,11.4,10.2,10.2,'#E2DDD3',.012);
  // transit authority bus depot: maintenance bays + yard under solar canopy
  s+=box(12.2,12.0,0,5.0,2.8,2.0,'plain',{cols:5});
  [0,1,2].forEach(i=>s+=poly([P(12.6+i*1.5,14.8,0),P(13.6+i*1.5,14.8,0),P(13.6+i*1.5,14.8,1.5),P(12.6+i*1.5,14.8,1.5)],i==1?'#5C6665':'#9AA6A7'));
  s+=box(12.1,11.9,2.0,5.2,3.0,.12,'plain');
  s+=bus(12.6,16.0)+bus(12.6,17.2,'#BF6238')+bus(12.6,18.4);
  [16.4,17.6,18.8].forEach(y=>s+=box(15.6,y,0,.25,.25,.9,'white',{top:'#2C7376'}));
  // district office
  s+=box(12.2,20.0,0,3.4,1.3,1.2,'glass',{cols:5})+box(12.1,19.9,1.2,3.6,1.5,.1,'plain')+flag(16.0,20.9,2.2,'#2C7376');
  // elevated water tower
  const tx=19.0, ty=16.6, legH=4.6, r=1.35;
  const legs=[[-.9,-.9],[.9,-.9],[-.9,.9],[.9,.9]];
  legs.forEach(([a,b])=>s+=ln(P(tx+a,ty+b,0),P(tx+a*.75,ty+b*.75,legH),'', 'style="stroke:#6F7877;stroke-width:1.3"'));
  [1.5,3.0].forEach(z=>{const k=1-z/legH*.25;s+=`<polyline points="${[P(tx-.9*k,ty-.9*k,z),P(tx+.9*k,ty-.9*k,z),P(tx+.9*k,ty+.9*k,z),P(tx-.9*k,ty+.9*k,z),P(tx-.9*k,ty-.9*k,z)].map(f).join(' ')}" fill="none" style="stroke:#6F7877;stroke-width:.7"/>`;});
  s+=`<path d="M${f(P(tx-.9,ty+.9,0))} L${f(P(tx+.75*.9,ty+.9*.75,1.5*1.6))} M${f(P(tx+.9,ty+.9,0))} L${f(P(tx-.75*.9,ty+.9*.75,1.5*1.6))}" fill="none" style="stroke:#6F7877;stroke-width:.6"/>`;
  s+=ln(P(tx,ty,0),P(tx,ty,legH),'', 'style="stroke:#7D8584;stroke-width:2.2"');
  const c=P(tx,ty,legH+1.0), rx=r*U*1.2247, ry=r*U*.95;
  s+=`<ellipse cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="url(#cg-teal)"/>`;
  s+=`<path d="M${(c[0]-rx).toFixed(1)},${c[1].toFixed(1)} A${rx.toFixed(1)},${(r*U*.7071*.5).toFixed(1)} 0 0 0 ${(c[0]+rx).toFixed(1)},${c[1].toFixed(1)}" fill="none" style="stroke:#EE8A3A;stroke-width:1"/>`;
  s+=cyl(tx,ty,.18,legH+1.0+r*.9,.3,'teal');
  s+=box(20.2,20.0,0,1.2,1.2,1.0,'plain',{floors:2})+worker(20.6,19.6,0);
  return s;
}

/* ---------- AEC Technology: detailed vector sites ---------- */
function sawtooth(x,y,w,d,z,n,h=.55){
  let s=''; const tw=w/n;
  for(let i=0;i<n;i++){const xi=x+i*tw;
    s+=poly([P(xi,y,z),P(xi,y+d,z),P(xi+tw,y+d,z+h),P(xi+tw,y,z+h)],'#D9D5CC');
    s+=poly([P(xi+tw,y,z),P(xi+tw,y+d,z),P(xi+tw,y+d,z+h),P(xi+tw,y,z+h)],'#A9CFD2');
    s+=poly([P(xi,y+d,z),P(xi+tw,y+d,z),P(xi+tw,y+d,z+h)],'#E5E1D9');}
  return s;
}
function drone(x,y,z){
  const c=P(x,y,z), g=P(x,y,0); let s=`<ellipse cx="${g[0].toFixed(1)}" cy="${g[1].toFixed(1)}" rx="5" ry="2.4" fill="rgba(60,70,70,.15)" style="stroke:none"/>`;
  s+=`<path d="M${c[0]-6},${c[1]-2} L${c[0]+6},${c[1]+2} M${c[0]-6},${c[1]+2} L${c[0]+6},${c[1]-2}" style="stroke:#3B4A55;stroke-width:1.2"/>`;
  [[-6,-2],[6,2],[-6,2],[6,-2]].forEach(([dx,dy])=>s+=`<ellipse cx="${c[0]+dx}" cy="${c[1]+dy}" rx="3.2" ry="1.4" fill="rgba(255,255,255,.7)" style="stroke:#7D8584;stroke-width:.5"/>`);
  return s+`<rect x="${c[0]-2}" y="${c[1]-1.5}" width="4" height="3" fill="#EE8A3A" style="stroke:none"/>`;
}
function mixerTruck(x,y){
  let s=box(x,y,.1,3.0,.75,.25,'dark')+box(x+2.4,y,.35,.6,.75,.75,'white')+poly([P(x+3.0,y+.1,.7),P(x+3.0,y+.65,.7),P(x+3.0,y+.65,1.0),P(x+3.0,y+.1,1.0)],'#9CC5C8');
  s+=box(x+.35,y+.1,.35,.25,.55,.5,'steel');
  s+=box(x+.6,y+.05,.45,1.7,.65,.7,'white');
  s+=poly([P(x+.6,y+.05,.45),P(x+.6,y+.7,.45),P(x+.25,y+.55,.85),P(x+.25,y+.2,.85)],'#D6D3CC');
  [.9,1.35,1.8].forEach(dx=>s+=ln(P(x+dx,y+.7,.45),P(x+dx+.3,y+.7,1.15),'', 'style="stroke:#EE8A3A;stroke-width:1.2"')+ln(P(x+dx+.3,y+.05,1.15),P(x+dx+.3,y+.7,1.15),'', 'style="stroke:#EE8A3A;stroke-width:1.2"'));
  return s;
}
function aeSoftware(){
  let s=flat(.6,.6,8.4,7.4,'#E9E3D8',.012);
  s+=flat(1,6.2,7.6,1.5,'#DCE3CF',.015);
  s+=box(1.4,1.2,0,6.2,4.6,1.4,'glass',{cols:9});
  s+=box(1.3,1.1,1.4,6.4,4.8,.15,'plain');
  s+=box(1.6,1.4,1.55,4.0,4.2,5.4,'glass',{floors:6,cols:6});
  s+=flat(5.6,1.4,1.9,4.2,'#B9D3A7',1.56)+tree(6.6,2.6,.5)+tree(6.7,4.4,.5)+person(6.2,3.6,1.56,'#BF6238')+person(6.9,3.3,1.56,'#2C7376');
  s+=box(1.5,1.3,6.95,4.2,4.4,.15,'plain',{top:'#B9D3A7'})+box(2.4,2.0,7.1,1.6,1.4,.5,'plain');
  [[1.6,5.6],[2.6,5.6],[3.6,5.6],[4.6,5.6]].forEach(([a,b])=>s+=box(a,b,1.55,.06,.06,5.4,'copper'));
  s+=box(2.2,6.6,0,1.6,.6,.35,'wood')+box(4.4,6.9,0,1.6,.6,.35,'wood');
  s+=person(2.6,7.3,0)+person(3.2,7.1,0,'#E9C93C')+person(5.2,7.5,0,'#2C7376');
  for(let i=0;i<4;i++)s+=`<path d="M${f(P(7.0+i*.3,6.6,0))} Q${f(P(7.0+i*.3,6.6,.45))} ${f(P(7.0+i*.3,7.0,0))}" fill="none" style="stroke:#6F7877;stroke-width:.8"/>`;
  return s;
}
function aeStartup(){
  let s=flat(9.4,.6,5.6,7.4,'#E6E0D5',.012);
  s+=box(9.8,1.2,0,4.8,4.4,2.2,'brick',{cols:6});
  s+=sawtooth(9.8,1.2,4.8,4.4,2.2,4);
  // open roll-up door showing the shop
  s+=poly([P(10.6,5.6,0),P(12.2,5.6,0),P(12.2,5.6,1.5),P(10.6,5.6,1.5)],'#4E5756');
  s+=box(10.9,5.2,0,.9,.35,.55,'wood')+box(11.1,5.25,.55,.35,.25,.25,'orange');
  for(let i=0;i<3;i++)s+=poly([P(12.6+i*.65,5.6,.6),P(13.1+i*.65,5.6,.6),P(13.1+i*.65,5.6,1.6),P(12.6+i*.65,5.6,1.6)],'#AFCFD1');
  s+=box(10.4,6.4,0,1.6,.7,.4,'wood')+person(10.6,7.3,0,'#BF6238')+person(11.6,7.2,0,'#7FA3B6')+person(12.6,6.6,0,'#2C7376');
  s+=drone(13.4,6.9,1.6);
  return s;
}
function aeInHouse(){
  let s=flat(15.6,.6,6,7.4,'#E9E3D8',.012);
  // glass ground floor reveals the server room
  s+=poly([P(16,1.2,0),P(21,1.2,0),P(21,1.2,1.3),P(16,1.2,1.3)],'#C9C4BB')+poly([P(16,1.2,0),P(16,5.4,0),P(16,5.4,1.3),P(16,1.2,1.3)],'#BAB5AC');
  s+=flat(16,1.2,5,4.2,'#E9E6DF',.02);
  for(let r=0;r<2;r++)for(let c=0;c<4;c++){const x=16.5+c*1.0,y=1.8+r*1.5;s+=box(x,y,0,.55,.8,1.05,'dark',{top:'#4A5352'});
    for(let k=0;k<4;k++){const p=P(x+.2,y+.8,.2+k*.22);s+=`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r=".9" fill="${k%2?'#5FD07A':'#6FB7FF'}" style="stroke:none"/>`;}}
  s+=person(20.4,4.8,0,'#2C7376');
  s+=poly([P(16,5.4,0),P(21,5.4,0),P(21,5.4,1.3),P(16,5.4,1.3)],'rgba(183,217,219,.28)')+poly([P(21,1.2,0),P(21,5.4,0),P(21,5.4,1.3),P(21,1.2,1.3)],'rgba(150,194,197,.32)');
  for(let i=1;i<6;i++)s+=ln(P(16+i*.83,5.4,0),P(16+i*.83,5.4,1.3),'wsm-dl');
  s+=box(15.9,1.1,1.3,5.2,4.4,.12,'plain');
  s+=box(16,1.2,1.42,5,4.2,3.6,'plain',{floors:4,cols:6});
  s+=box(15.95,1.15,5.02,5.1,4.3,.12,'plain');
  // roof comms: satellite dish + antenna mast
  const dc=P(17.4,2.4,5.6); s+=box(17.2,2.2,5.14,.4,.4,.3,'steel')+`<ellipse cx="${dc[0].toFixed(1)}" cy="${dc[1].toFixed(1)}" rx="7" ry="4.5" transform="rotate(-25 ${dc[0].toFixed(1)} ${dc[1].toFixed(1)})" fill="#F4F4F1" style="stroke:#7D8584;stroke-width:.7"/>`;
  s+=ln(P(19.8,3.4,5.14),P(19.8,3.4,7.0),'', 'style="stroke:#6F7877;stroke-width:1.1"')+ln(P(19.6,3.4,6.6),P(20.0,3.4,6.6),'', 'style="stroke:#6F7877;stroke-width:.8"');
  // connected jobsite trailer with a wi-fi mast
  s+=box(16.4,6.3,0,2.4,1.0,.95,'white',{cols:3})+ln(P(19.2,6.6,0),P(19.2,6.6,2.4),'', 'style="stroke:#6F7877;stroke-width:1"');
  const w=P(19.2,6.6,2.5); s+=[4,7,10].map(r=>`<path d="M${(w[0]-r).toFixed(1)},${(w[1]-r*.4).toFixed(1)} Q${w[0].toFixed(1)},${(w[1]-r*1.1).toFixed(1)} ${(w[0]+r).toFixed(1)},${(w[1]-r*.4).toFixed(1)}" fill="none" style="stroke:#2C7376;stroke-width:.9"/>`).join('');
  return s;
}
function aeModular(){
  let s=flat(.6,8.6,8.8,7,'#E2DDD3',.012);
  // factory with sawtooth roof and open bay showing the assembly line
  s+=box(1,9,0,7.6,3.8,2.2,'plain',{cols:8});
  s+=sawtooth(1,9,7.6,3.8,2.2,5,.6);
  s+=poly([P(1.6,12.8,0),P(4.6,12.8,0),P(4.6,12.8,1.7),P(1.6,12.8,1.7)],'#5C6665');
  s+=box(1.9,11.9,0,1.1,.85,.85,'wood',{cols:3})+box(3.2,11.9,0,1.1,.85,.85,'white',{cols:2});
  // finished volumetric modules stacked in the yard
  s+=box(5.2,13.4,0,2.0,.95,.85,'white',{cols:3})+box(5.2,13.4,.85,2.0,.95,.85,'white',{cols:3})+box(7.4,13.4,0,1.6,.95,.85,'white',{cols:2});
  s+=poly([P(5.3,14.35,.25),P(5.8,14.35,.25),P(5.8,14.35,.65),P(5.3,14.35,.65)],'#AFCFD1')+poly([P(6.3,14.35,1.1),P(6.8,14.35,1.1),P(6.8,14.35,1.5),P(6.3,14.35,1.5)],'#AFCFD1');
  // flatbed hauling a module, oversize flags
  s+=box(1.2,14.4,0,.7,.8,.75,'teal')+box(1.95,14.45,.25,3.0,.7,.12,'dark')+box(2.05,14.45,.37,2.7,.7,.8,'white',{cols:3});
  const fl=P(4.75,15.15,1.25); s+=`<rect x="${fl[0].toFixed(1)}" y="${(fl[1]-3).toFixed(1)}" width="5" height="3" fill="#EE8A3A" style="stroke:none"/>`;
  return s;
}
function ae3D(){
  let s=flat(10,8.6,5.4,6,'#E3D3B6',.012);
  // finished printed house with curved walls
  s+=box(10.4,12.6,0,2.0,1.4,1.0,'dirt',{floors:8})+box(10.3,12.5,1.0,2.2,1.6,.1,'plain',{top:'#C9C2B5'});
  // house being printed: layered walls + gantry printer
  const W='#D6C29F';
  s+=box(12.8,9.4,0,2.2,.25,1.0,'dirt',{floors:8})+box(12.8,9.4,0,.25,2.6,1.0,'dirt',{floors:8});
  s+=box(12.8,11.75,0,1.4,.25,.75,'dirt',{floors:6})+box(14.75,9.4,0,.25,1.6,.85,'dirt',{floors:7});
  [[12.5,9.1],[15.3,9.1],[12.5,12.3],[15.3,12.3]].forEach(([a,b])=>s+=box(a,b,0,.14,.14,2.2,'orange'));
  s+=box(12.45,9.05,2.2,3.0,.25,.18,'orange')+box(12.45,12.25,2.2,3.0,.25,.18,'orange')+box(13.9,9.05,2.38,.25,3.45,.2,'orange');
  s+=box(13.85,11.55,1.2,.35,.35,1.18,'steel')+ln(P(14.0,11.7,1.2),P(14.0,11.7,.85),'', 'style="stroke:#555;stroke-width:1.2"');
  s+=`<path d="M${f(P(14.0,12.4,2.4))} Q${f(P(14.6,13.6,2.8))} ${f(P(14.9,13.8,.9))}" fill="none" style="stroke:#5C6665;stroke-width:1.5"/>`;
  s+=mixerTruck(12.2,13.6)+worker(11.8,12.0,0);
  return s;
}
function aeRobotics(){
  let s=flat(15.8,8.6,5.8,6,'#E2DDD3',.012);
  // slab with layout lines being marked by a layout robot
  s+=flat(16.2,9.0,5,2.8,'#D3CEC4',.02);
  [[16.6,9.6,20.6,9.6],[16.6,10.8,19.4,10.8],[18.0,9.2,18.0,11.6],[19.4,10.8,19.4,11.6]].forEach(([a,b,c,d])=>s+=ln(P(a,b,.03),P(c,d,.03),'', 'style="stroke:#2C7376;stroke-width:.8;stroke-dasharray:3 2"'));
  s+=box(19.6,9.45,.02,.5,.35,.22,'orange')+box(19.75,9.5,.24,.2,.2,.1,'dark');
  // robotic arm laying block on a tracked base
  s+=box(16.4,12.4,0,2.8,.5,.95,'stone',{floors:4,cols:6});
  s+=box(17.0,13.3,0,1.2,.8,.3,'dark')+cyl(17.6,13.7,.35,.3,.4,'orange');
  s+=`<path d="M${f(P(17.6,13.7,.7))} L${f(P(17.8,13.3,1.9))} L${f(P(18.6,12.7,1.5))}" fill="none" style="stroke:#D17128;stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>`;
  s+=box(18.45,12.55,1.15,.4,.35,.3,'stone');
  s+=box(15.9,13.8,0,1.0,.8,.6,'wood',{floors:3});
  // quadruped robot scanning
  s+=box(20.0,12.6,.45,.9,.35,.25,'orange',{top:'#F2C94C'});
  [[20.1,12.65],[20.8,12.65],[20.1,12.95],[20.8,12.95]].forEach(([a,b])=>s+=ln(P(a,b,0),P(a+.05,b,.45),'', 'style="stroke:#3B4A55;stroke-width:1.2"'));
  s+=box(20.85,12.65,.7,.2,.25,.15,'dark');
  s+=drone(18.6,9.6,2.6)+worker(21.1,10.2,0);
  return s;
}
function aeMaterials(){
  let s=flat(.6,16.2,21,5.4,'#E2DDD3',.012);
  // low-carbon concrete batch plant: silos on legs, aggregate bins, conveyor, mixer tower
  [[2.0,18.0],[3.6,18.0]].forEach(([a,b])=>{[[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5]].forEach(([dx,dy])=>s+=ln(P(a+dx,b+dy,0),P(a+dx,b+dy,1.6),'', 'style="stroke:#6F7877;stroke-width:1.1"'));
    const c0=P(a,b,1.0), c1=P(a,b,1.8), rx=.75*U*1.2247; s+=`<path d="M${c0[0].toFixed(1)},${c0[1].toFixed(1)} L${(c1[0]-rx).toFixed(1)},${c1[1].toFixed(1)} L${(c1[0]+rx).toFixed(1)},${c1[1].toFixed(1)} Z" fill="#C9C4BA"/>`;
    s+=cyl(a,b,.75,1.8,4.2,'plain',{bands:4})+dome(a,b,.75,6.0,'plain').replace(/hr/,'');});
  s+=rail([1.2,17.2],[4.4,17.2],6.1,false);
  s+=box(5.2,17.2,0,2.6,1.3,1.2,'stone',{cols:3});
  [5.7,6.5,7.3].forEach((x,i)=>{const c=P(x,17.85,1.2);s+=`<ellipse cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" rx="5" ry="2.6" fill="${['#C9B79A','#B5A58C','#D8CDBB'][i]}" style="stroke:none"/>`;});
  s+=`<path d="M${f(P(7.8,17.8,.9))} L${f(P(9.6,17.8,3.4))}" fill="none" style="stroke:#7D8584;stroke-width:3;stroke-linecap:round"/>`;
  s+=box(9.2,16.8,0,1.6,1.8,3.8,'plain',{floors:3})+box(9.4,17.0,3.8,1.2,1.4,.5,'steel');
  s+=mixerTruck(8.6,19.4)+mixerTruck(4.4,20.0);
  s+=box(11.3,19.2,0,1.4,1.0,1.0,'glass',{cols:2})+box(11.2,19.1,1.0,1.6,1.2,.1,'plain',{top:'#3F6F88'});
  // mass timber + reclaimed lumber yard
  s+=box(13.8,16.8,0,3.4,1.4,.15,'stone');
  for(let k=0;k<4;k++)s+=box(13.9,16.9,.15+k*.28,3.2,1.2,.28,'wood');
  s+=box(13.8,18.8,0,3.0,1.2,.12,'stone');
  for(let k=0;k<3;k++)s+=box(13.9,18.9,.12+k*.3,2.8,1.0,.3,['#C2A27A','#AF8E66','#D2B48C']);
  s+=box(17.8,16.8,0,3.4,2.2,2.0,'plain',{cols:4})+sawtooth(17.8,16.8,3.4,2.2,2.0,3,.45);
  s+=box(18.6,19.5,0,.8,.55,.45,'orange')+ln(P(18.55,19.6,.1),P(18.55,19.6,1.1),'', 'style="stroke:#555;stroke-width:.9"')+box(18.0,19.5,.1,.5,.6,.3,'wood')+worker(19.0,19.8,.45);
  s+=tree(21.2,21.2,.7)+tree(.9,21.2,.7);
  return s;
}

/* ---------- zone layouts (local coords 0..22) ---------- */
const it=(sub,depth,pin,draw)=>({sub,depth,pin,draw});
const deco=(depth,draw)=>({sub:null,depth,draw});
const LAYOUT={
 'urban-planning':()=>[
   it('municipalities-local-government',9,[6.6,3.6,7.6],()=>upCityHall()),
   it('planning-urban-design',17,[14.2,4.2,1.6],()=>upPlaza()),
   it('state-federal-agencies',23,[5.9,14.5,7.2],()=>upCapitol()),
   it('special-districts-authorities',33,[19.0,16.6,7.4],()=>upDistrict()),
 ],
 'aec-technology':()=>[
   it('software-companies',6,[3.6,3.5,7.6],()=>aeSoftware()),
   it('aec-startups-founders',11,[12.2,3.4,2.9],()=>aeStartup()),
   it('in-house-it-teams',19,[18.5,3.3,5.3],()=>aeInHouse()),
   it('modular-offsite-construction',18,[4.8,10.9,2.9],()=>aeModular()),
   it('3d-printed-construction',24,[13.9,10.7,2.7],()=>ae3D()),
   it('construction-robotics-automation',29,[17.6,13.0,2.2],()=>aeRobotics()),
   it('construction-materials',30,[9.9,17.6,4.6],()=>aeMaterials()),
 ],
 'energy':()=>[
   it('renewable-energy',9,[5.6,6.4,1.2],()=>enRenewable()),
   it('energy-storage',20,[16.6,2.6,1.6],()=>enStorage2()),
   it('nuclear',25,[8.4,17.6,4.6],()=>enNuclear2()),
   it('utilities-power-providers',26,[14.7,9.0,2.2],()=>enUtilityOps()),
   it('utilities-power-providers',33,null,()=>enSubstation2()),
   it('transmission-grid',36,[12.0,19.4,7.5],()=>enGrid2()),
 ],
 'transportation':()=>[
   it('roads-highways-bridges',8,[6.85,2.4,2.4],()=>trRoads()),
   it('transit-rail',14,[8.8,9.65,3.5],()=>trTransit()),
   it('aviation-airports',23,[16.3,2.4,2.4],()=>trAviation()),
   it('ports-maritime',22,[8.2,16.6,6.2],()=>trPorts()),
   it('aerospace',34,[16.6,16.5,3.5],()=>trAerospace()),
 ],
 'buildings-development':()=>[
   it('general-contractors',11,[6,4.3,8.3],()=>gcSite()),
   it('architecture',15,[14.6,2.7,13.4],()=>bdArchitecture()),
   it('specialty-trade-contractors',21,[19.9,2.8,5.6],()=>bdSpecialty()),
   it('mep-engineering',22,[16,8.1,5.1],()=>bdMEP()),
   it('site-civil-engineering',29,[18.9,8.5,1.8],()=>bdSiteCivil()),
   it('structural-engineering',18,[3,15,7.5],()=>bdStructural()),
   it('real-estate-land-development',27,[11.4,17.8,1.6],()=>bdRealEstate()),
   it('luxury-homebuilders',35,[16.2,15.3,3.2],()=>bdLuxury()),
   deco(40,()=>tree(12.9,12.2,.8)+tree(6.2,21.6,.8))
 ],
 'water-environment':()=>[
   deco(1,()=>stream()),
   it('water-wastewater',10,[7.2,3.3,1.0],()=>waWater()),
   it('carbon-capture-sequestration',16,[14.3,2.5,9.0],()=>waCarbon()),
   it('environmental-remediation',23,[5.2,14.9,.6],()=>waRemediation()),
   it('waste-recycling',33,[16.3,16.5,3.4],()=>waRecycling()),
   deco(40,()=>tree(11.6,11.4,.8)+tree(21.6,11.6,.8)+tree(1.9,21.6,.8))
 ]
};

/* ---------- build svg ---------- */
const VB={x:-800,y:-190,w:1960,h:1320};
let svg=`<svg class="wsm-map" xmlns="http://www.w3.org/2000/svg" width="${VB.w}" height="${VB.h}" viewBox="${VB.x} ${VB.y} ${VB.w} ${VB.h}"><defs>`;
for(const k of Object.keys(PAL)){const [t,l,r]=PAL[k];svg+=`<linearGradient id="cg-${k}" x1="0" x2="1"><stop offset="0" stop-color="${t}"/><stop offset=".55" stop-color="${l}"/><stop offset="1" stop-color="${r}"/></linearGradient>`;}
svg+=`</defs><rect class="wsm-bg" x="${VB.x}" y="${VB.y}" width="${VB.w}" height="${VB.h}" fill="transparent" style="stroke:none"/>`;
OX=0;OY=0;
svg+=`<g class="wsm-ground">`+poly([P(0,0),P(TX,0),P(TX,TY),P(0,TY)],'#DCD4C5');
for(let r=0;r<=2;r++){const y=r*PITCH+ROAD/2;svg+=ln(P(0,y,.01),P(TX,y,.01),'', 'style="stroke:#F8F5EF;stroke-width:1.1;stroke-dasharray:6 7"');}
for(let c=0;c<=3;c++){const x=c*PITCH+ROAD/2;svg+=ln(P(x,0,.01),P(x,TY,.01),'', 'style="stroke:#F8F5EF;stroke-width:1.1;stroke-dasharray:6 7"');}
svg+=`</g><g id="wsm-cars"></g>`;

const zonesSorted=[...SECTORS].sort((a,b)=>(a.c+a.r)-(b.c+b.r)||a.c-b.c);
const PIN={}; const ZB={}; const ZL={};
for(const z of zonesSorted){
  OX=ROAD+z.c*PITCH; OY=ROAD+z.r*PITCH;
  let g=`<g class="wsm-zone" id="wsm-z-${z.id}" data-zone="${z.id}" tabindex="0" role="button" aria-label="${z.name}: ${z.subs.length} markets. Press Enter to zoom in.">`;
  g+=`<polygon class="wsm-lot" points="${[P(0,0),P(LOT,0),P(LOT,LOT),P(0,LOT)].map(f).join(' ')}"/>`;
  const items=LAYOUT[z.id]().sort((a,b)=>a.depth-b.depth);
  for(const i of items){
    if(i.sub){ g+=`<g class="wsm-sub" data-sub="${i.sub}">${i.draw()}</g>`; }
    else g+=i.draw();
    if(i.sub){ if(i.pin) PIN[i.sub]=P(...i.pin); }
  }
  // transmission pin: top of middle pylon
  g+=`</g>`;
  svg+=g;
  const pts=[P(0,0,0),P(LOT,0,0),P(0,LOT,0),P(LOT,LOT,0),P(0,0,z.id==='buildings-development'?16:12)];
  const xs=pts.map(p=>p[0]), ys=pts.map(p=>p[1]);
  ZB[z.id]={x0:Math.min(...xs)-VB.x,x1:Math.max(...xs)-VB.x,y0:Math.min(...ys)-VB.y,y1:Math.max(...ys)-VB.y};
  const lp=[P(0,0,0),P(LOT,0,0),P(0,LOT,0),P(LOT,LOT,0),P(0,0,5)], lx=lp.map(p=>p[0]), ly=lp.map(p=>p[1]);
  ZL[z.id]={x0:Math.min(...lx)-VB.x,x1:Math.max(...lx)-VB.x,y0:Math.min(...ly)-VB.y,y1:Math.max(...ly)-VB.y};
}
svg+=`</svg>`;
const world=document.getElementById('wsm-world');
world.style.width=VB.w+'px'; world.style.height=VB.h+'px';
world.innerHTML=svg;
const svgEl=world.querySelector('svg');

/* ---------- cars ---------- */
OX=0;OY=0;
const carsG=svgEl.querySelector('#wsm-cars');
const CARS=[
 {ax:'x',k:PITCH+ROAD/2-0.8,a:0,b:TX,dur:24,pal:'white'},{ax:'x',k:PITCH+ROAD/2+0.8,a:TX,b:0,dur:28,pal:'teal'},
 {ax:'y',k:PITCH+ROAD/2+0.8,a:0,b:TY,dur:17,pal:'orange'},{ax:'y',k:2*PITCH+ROAD/2-0.8,a:TY,b:0,dur:19,pal:'white'},
 {ax:'x',k:2*PITCH+ROAD/2+0.8,a:0,b:TX,dur:30,pal:'steel'},{ax:'y',k:3*PITCH+ROAD/2-0.8,a:0,b:TY,dur:21,pal:'copper'},
 {ax:'x',k:ROAD/2+0.8,a:TX,b:0,dur:26,pal:'white'}
];
const ambient=[];
CARS.forEach((c,i)=>{
  const shape=c.ax==='x'?box(-.8,-.45,0,1.6,.9,.7,c.pal):box(-.45,-.8,0,.9,1.6,.7,c.pal);
  const g=document.createElementNS('http://www.w3.org/2000/svg','g'); g.innerHTML=shape; carsG.appendChild(g);
  const s=c.ax==='x'?P(c.a,c.k):P(c.k,c.a), e=c.ax==='x'?P(c.b,c.k):P(c.k,c.b);
  ambient.push(gsap.fromTo(g,{x:s[0],y:s[1]},{x:e[0],y:e[1],duration:c.dur,ease:'none',repeat:-1,delay:-(i*7%c.dur)}));
});
svgEl.querySelectorAll('.wsm-blades').forEach((b,i)=>ambient.push(gsap.to(b,{rotation:360,svgOrigin:'0 0',duration:5+i*.7,ease:'none',repeat:-1})));
if(reduce){ambient.forEach(t=>t.pause());}

/* ---------- pins ---------- */
const stage=document.getElementById('wsm-stage'), pinsEl=document.getElementById('wsm-pins');
const SUBS={}; SECTORS.forEach(z=>z.subs.forEach(([slug,name,desc])=>SUBS[slug]={slug,name,desc,zone:z.id}));
const pinEls={};
SECTORS.forEach(z=>z.subs.forEach(([slug,name],idx)=>{
  const b=document.createElement('button'); b.type='button'; b.className='wsm-pin'; b.hidden=true; b.dataset.sub=slug;
  b.innerHTML=`<span class="wsm-dot">${idx+1}</span><span class="wsm-lbl">${ico(SUB_ICON[slug])}${name}</span>`; b.setAttribute('aria-label',name);
  const w=PIN[slug]; b._wx=w[0]-VB.x; b._wy=w[1]-VB.y;
  pinsEl.appendChild(b); pinEls[slug]=b;
}));
// labels that should sit to the left of their dot to avoid collisions
const LEFT=new Set(['general-contractors','structural-engineering','nuclear','waste-recycling','ports-maritime','software-companies','modular-offsite-construction','municipalities-local-government','state-federal-agencies','water-wastewater','roads-highways-bridges','aec-startups-founders','construction-materials','real-estate-land-development','mep-engineering']);


/* ---------- camera ---------- */
const cam={x:0,y:0,s:1};
let mode='overview', current=null, hoverZone=null;
function stageSize(){const r=stage.getBoundingClientRect();return {w:r.width,h:r.height};}
function overviewCam(){const {w,h}=stageSize();const s=Math.min(w/VB.w,h/VB.h)*(w<720?1.18:1.02);return {s,x:(w-VB.w*s)/2,y:(h-VB.h*s)/2+h*0.01};}
const isMobile=()=>stageSize().w<720;
function mobileArea(){const {w,h}=stageSize();return {L:0,R:w,T:50,B:h-((document.getElementById('wsm-panel').offsetHeight||200)+14)};}
function zoneCam(id){
  const {w,h}=stageSize();
  if(w<720){ // phones: frame the lot itself and let tall items crop; drag to pan
    const b=ZL[id], a=mobileArea(), bw=b.x1-b.x0, bh=b.y1-b.y0;
    const s=Math.min((a.R-a.L)/bw*1.15,(a.B-a.T)/bh*1.3,2.4);
    return {s,x:(a.L+a.R)/2-(b.x0+bw/2)*s,y:(a.T+a.B)/2-(b.y0+bh*0.45)*s};
  }
  const b=ZB[id], L=322, R=w-8, T=8, B=h-8, bw=b.x1-b.x0, bh=b.y1-b.y0;
  const s=Math.min((R-L)/bw,(B-T)/bh,3.4)*1.08;
  return {s,x:(L+R)/2-(b.x0+bw/2)*s,y:(T+B)/2-(b.y0+bh*0.54)*s};
}
function subCam(slug){ // phones: close-up on one market
  const p=pinEls[slug], a=mobileArea(), z=zoneCam(SUBS[slug].zone);
  const s=Math.min(z.s*1.9,2.6);
  return {s,x:(a.L+a.R)/2-p._wx*s,y:(a.T+a.B)/2-(p._wy+26)*s};
}
function applyCam(){gsap.set(world,{x:cam.x,y:cam.y,scale:cam.s,force3D:false});placePins();placeSectorLabels();}
/* Sector labels sit outside the city, on the map edge nearest each district, joined by a short leader line. */
const SLABEL={ // lot-local anchor on the outer road + outward screen normal
 'urban-planning':{a:[-1.2,7],n:[-.5,-.866]}, 'transportation':{a:[-1.2,13],n:[-.5,-.866]},
 'aec-technology':{a:[11,-1.2],n:[.5,-.866]}, 'energy':{a:[23.2,9],n:[.5,.866]},
 'water-environment':{a:[23.2,12],n:[.5,.866]}, 'buildings-development':{a:[11,23.2],n:[-.5,.866]}};
const slabelEls={}; let leadersSvg=null;
function buildSectorLabels(){
  const wrap=document.getElementById('wsm-slabels'); leadersSvg=document.getElementById('wsm-leaders');
  SECTORS.forEach(z=>{const c=SLABEL[z.id]; const ox=ROAD+z.c*PITCH, oy=ROAD+z.r*PITCH;
    const w=[((c.a[0]+ox)-(c.a[1]+oy))*U*C-VB.x, ((c.a[0]+ox)+(c.a[1]+oy))*U*S-VB.y];
    const b=document.createElement('button'); b.type='button'; b.className='wsm-slabel'; b.dataset.zone=z.id;
    b.innerHTML=`${ico(SECTOR_ICON[z.id])}<span class="wsm-nm">${z.name}</span><small>${z.subs.length}</small>`;
    b.setAttribute('aria-label',`${z.name}, ${z.subs.length} markets. Zoom in.`);
    b._w=w; b._n=c.n; wrap.appendChild(b); slabelEls[z.id]=b;
    const ln=document.createElementNS('http://www.w3.org/2000/svg','line'), dot=document.createElementNS('http://www.w3.org/2000/svg','circle'); dot.setAttribute('r','2.5');
    leadersSvg.appendChild(ln); leadersSvg.appendChild(dot); b._ln=ln; b._dot=dot;
  });
}
function placeSectorLabels(){
  if(!leadersSvg)return; const r=stage.getBoundingClientRect(), W=r.width, H=r.height;
  const off=W<720?Math.max(26,W*.07):Math.min(95,Math.max(55,W*.06));
  for(const id in slabelEls){const b=slabelEls[id];
    const ax=cam.x+b._w[0]*cam.s, ay=cam.y+b._w[1]*cam.s, bw=b.offsetWidth, bh=b.offsetHeight;
    let cx=ax+b._n[0]*off, cy=ay+b._n[1]*off;
    // anchor the chip by its inner corner so it grows away from the city
    let x=cx-(b._n[0]<0?bw:0)+(b._n[0]<0?bw*.35:-bw*.35), y=cy-(b._n[1]<0?bh:0);
    x=Math.min(Math.max(8,x),W-bw-8); y=Math.min(Math.max(8,y),H-bh-8);
    b.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
    const ex=Math.min(Math.max(ax,x),x+bw), ey=b._n[1]<0?y+bh:y;
    b._ln.setAttribute('x1',ax.toFixed(1));b._ln.setAttribute('y1',ay.toFixed(1));b._ln.setAttribute('x2',ex.toFixed(1));b._ln.setAttribute('y2',ey.toFixed(1));
    b._dot.setAttribute('cx',ax.toFixed(1));b._dot.setAttribute('cy',ay.toFixed(1));
  }
}
function placePins(){
  const sw=stageSize().w, compact=pinsEl.classList.contains('wsm-compact');
  for(const k in pinEls){const p=pinEls[k];if(p.hidden)continue;
    const x=cam.x+p._wx*cam.s, y=cam.y+p._wy*cam.s;
    if(compact){p.style.flexDirection='row';p.dataset.left='';p.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translateY(-50%)`;continue;}
    if(p._lw===undefined||!p._lw){p._lw=p.querySelector('.wsm-lbl').offsetWidth||0;}
    let left=LEFT.has(k); const lw=p._lw+14;
    if(!left&&x+lw>sw-8)left=true; else if(left&&x-lw<8)left=false;
    p.dataset.left=left?'1':''; p.style.flexDirection=left?'row-reverse':'row';
    p.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translateY(-50%)`+(left?' translateX(-100%) translateX(7px)':'');
  }
  if(popFor) positionPop(pinEls[popFor]);
}
function moveCam(t,instant){
  const dur=instant||reduce?0:0.9;
  gsap.killTweensOf(cam);
  if(!dur){Object.assign(cam,t);applyCam();return Promise.resolve();}
  return new Promise(res=>gsap.to(cam,{x:t.x,y:t.y,s:t.s,duration:dur,ease:'power3.inOut',onUpdate:applyCam,onComplete:res}));
}

/* ---------- UI elements ---------- */
const card=document.getElementById('wsm-card'), pop=document.getElementById('wsm-pop'), panel=document.getElementById('wsm-panel'),
      backBtn=document.getElementById('wsm-back'), toast=document.getElementById('wsm-toast'), chips=document.getElementById('wsm-chips');
const zoneEls={}; svgEl.querySelectorAll('.wsm-zone').forEach(g=>zoneEls[g.dataset.zone]=g);
const byId=id=>SECTORS.find(z=>z.id===id);
const ORDER=['buildings-development','transportation','energy','water-environment','urban-planning','aec-technology'];

function showToast(msg){toast.textContent=msg;toast.classList.add('wsm-show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('wsm-show'),2200);}
const SECTOR_PATH={'buildings-development':'buildings-development','transportation':'transportation','energy':'energy','water-environment':'water-environment','urban-planning':'public-sector','aec-technology':'aec-technology'};
function linkFor(slug){const o=(window.WSM_LINKS||{})[slug]; if(o)return o; if(SECTOR_PATH[slug])return '/industries/'+SECTOR_PATH[slug]; const z=SUBS[slug]?SUBS[slug].zone:null; return z?'/industries/'+SECTOR_PATH[z]+'#'+slug:'#';}

function setPins(zoneId,state){ // state: 'none' | 'dots' | 'labels'
  pinsEl.classList.toggle('wsm-labels',state==='labels'); pinsEl.classList.toggle('wsm-dots-only',state==='dots'); pinsEl.classList.toggle('wsm-compact',stageSize().w<720);
  for(const k in pinEls){const p=pinEls[k];const on=state!=='none'&&SUBS[k].zone===zoneId;p.hidden=!on;p.tabIndex=state==='labels'?0:-1;}
  placePins();
  if(state!=='none'&&!reduce){const list=Object.values(pinEls).filter(p=>!p.hidden);gsap.fromTo(list,{opacity:0},{opacity:1,duration:.3,stagger:.04,overwrite:true});gsap.fromTo(list.map(p=>p.querySelector('.wsm-dot')),{scale:.3},{scale:1,duration:.4,stagger:.04,ease:'back.out(2.5)',overwrite:true});}
}
function highlightZone(id,dimOthers){for(const k in zoneEls){zoneEls[k].classList.toggle('wsm-is-hot',k===id);zoneEls[k].classList.toggle('wsm-dim',!!dimOthers&&k!==id);slabelEls[k]?.classList.toggle('wsm-hot',k===id);}}

function showCard(z){
  card.innerHTML=`<h3>${ico(SECTOR_ICON[z.id],'wsm-sector')}${z.name}</h3><p>${z.line}</p><ul>${z.subs.map(s=>`<li>${ico(SUB_ICON[s[0]])}<span>${s[1]}</span></li>`).join('')}</ul><span class="wsm-go">Click to explore →</span>`;
  card.classList.add('wsm-show'); placeAvoiding(card,rectIn(zoneEls[z.id]));
}
function positionCard(cx,cy){const {w,h}=stageSize();const cw=card.offsetWidth,ch=card.offsetHeight;
  let x=cx+18,y=cy+18; if(x+cw>w-12)x=cx-cw-18; if(y+ch>h-12)y=h-ch-12; x=Math.max(12,x); y=Math.max(12,y);
  card.style.transform=`translate(${x}px,${y}px)`;}
function hideCard(){card.classList.remove('wsm-show');}

let popFor=null, popHideT=null;
function openPop(slug){
  clearTimeout(popHideT); const s=SUBS[slug]; if(popFor&&popFor!==slug)hotSub(popFor,false); popFor=slug;
  pop.innerHTML=`<h4>${ico(SUB_ICON[slug])}${s.name}</h4><p>${s.desc}</p><a href="${linkFor(slug)}" data-go="${slug}">View ${s.name} →</a>`;
  pop.classList.add('wsm-show'); positionPop(pinEls[slug]); hotSub(slug,true);
}
function rectIn(el){const r=el.getBoundingClientRect(),s=stage.getBoundingClientRect();return {l:r.left-s.left,t:r.top-s.top,r:r.right-s.left,b:r.bottom-s.top};}
function unionR(a,b){return {l:Math.min(a.l,b.l),t:Math.min(a.t,b.t),r:Math.max(a.r,b.r),b:Math.max(a.b,b.b)};}
// Place a tooltip beside a rectangle without covering it: try right, left, above, below; fall back to least overlap.
function placeAvoiding(el,a){
  const {w,h}=stageSize(), pw=el.offsetWidth, ph=el.offsetHeight, g=14;
  const minX=(mode==='zone'&&!isMobile()&&!panel.hidden)?318:10, maxX=w-10, minY=10, maxY=h-10;
  const cx=(a.l+a.r)/2, cy=(a.t+a.b)/2;
  const cands=[[a.r+g,cy-ph/2],[a.l-g-pw,cy-ph/2],[cx-pw/2,a.t-g-ph],[cx-pw/2,a.b+g]];
  let best=null;
  for(const [x0,y0] of cands){
    const x=Math.min(Math.max(minX,x0),maxX-pw), y=Math.min(Math.max(minY,y0),maxY-ph);
    const ox=Math.max(0,Math.min(x+pw,a.r)-Math.max(x,a.l)), oy=Math.max(0,Math.min(y+ph,a.b)-Math.max(y,a.t)), ov=ox*oy;
    if(!best||ov<best.ov){best={x,y,ov};} if(ov===0)break;
  }
  el.style.transform=`translate(${best.x.toFixed(1)}px,${best.y.toFixed(1)}px)`;
}
function positionPop(pin){if(!pin||pin.hidden)return;
  const gs=[...svgEl.querySelectorAll(`.wsm-sub[data-sub="${pin.dataset.sub}"]`)]; let a=gs.length?gs.map(rectIn).reduce(unionR):rectIn(pin);
  a=unionR(a,rectIn(pin.querySelector('.wsm-dot')));
  placeAvoiding(pop,a);}
function closePop(delay=0){clearTimeout(popHideT);popHideT=setTimeout(()=>{pop.classList.remove('wsm-show');if(popFor)hotSub(popFor,false);popFor=null;},delay);}
function hotSub(slug,on){
  svgEl.querySelectorAll(`.wsm-sub[data-sub="${slug}"]`).forEach(g=>g.classList.toggle('wsm-hot',on));
  pinEls[slug]?.classList.toggle('wsm-hot',on);
  panel.querySelector(`button[data-sub="${slug}"]`)?.classList.toggle('wsm-hot',on);
}

function renderPanel(z){
  const i=ORDER.indexOf(z.id);
  panel.innerHTML=`<p class="wsm-count">Sector ${i+1} of 6 · ${z.subs.length} markets</p><h2>${ico(SECTOR_ICON[z.id],'wsm-sector')}<span>${z.name}</span></h2><p class="wsm-line">${z.line}</p>
   <ul>${z.subs.map((s,k)=>`<li><button type="button" data-sub="${s[0]}"><b>${k+1}</b>${ico(SUB_ICON[s[0]])}<span>${s[1]}</span></button></li>`).join('')}</ul>
   <div class="wsm-sel" id="wsm-selBox"></div>
   <div class="wsm-row"><a class="wsm-link" href="${linkFor(z.id)}" data-go="${z.id}">Open sector page →</a>
   <span class="wsm-nav"><button class="wsm-btn" type="button" data-step="-1" aria-label="Previous sector">←</button><button class="wsm-btn" type="button" data-step="1" aria-label="Next sector">→</button></span></div>`;
}
function renderChips(){
  chips.innerHTML=`<button class="wsm-chip" type="button" data-z="" aria-pressed="${mode==='overview'}">All sectors</button>`+
    ORDER.map(id=>`<button class="wsm-chip" type="button" data-z="${id}" aria-pressed="${current===id}">${byId(id).name}</button>`).join('');
}

async function zoomTo(id){
  const z=byId(id); hideCard(); closePop(); hoverZone=null;
  mode='zone'; current=id; stage.classList.add('wsm-zoomed');
  clearSel(); renderPanel(z); renderSel(); panel.hidden=false; backBtn.hidden=false; renderChips();
  highlightZone(id,true); setPins(id,'none');
  await moveCam(zoneCam(id));
  if(current===id) setPins(id,'labels');
}
async function zoomOut(){
  if(mode==='overview')return;
  closePop(); clearSel(); setPins(null,'none'); mode='overview'; const was=current; current=null;
  panel.hidden=true; backBtn.hidden=true; stage.classList.remove('wsm-zoomed'); highlightZone(null,false); renderChips();
  await moveCam(overviewCam());
  if(was&&zoneEls[was]&&document.activeElement===document.body) zoneEls[was].focus({preventScroll:true});
}


/* ---------- phone selection: tap nearest pin, drag to pan ---------- */
let sel=null, dragMoved=false, drag=null;
function renderSel(){
  const box=document.getElementById('wsm-selBox'); if(!box)return;
  if(!sel){box.innerHTML=`<p class="wsm-tip">Tap a number on the map or a market above. Drag to look around.</p>`;return;}
  const s=SUBS[sel]; box.innerHTML=`<strong>${ico(SUB_ICON[s.slug])}${s.name}</strong><p>${s.desc}</p><a href="${linkFor(s.slug)}" data-go="${s.slug}">View ${s.name} →</a>`;
}
function selectSub(slug){
  if(sel&&sel!==slug)hotSub(sel,false);
  sel=slug; hotSub(slug,true); renderSel();
  const chip=panel.querySelector(`button[data-sub="${slug}"]`);
  if(chip){const ul=chip.closest('ul');ul.scrollTo({left:chip.offsetLeft-ul.clientWidth/2+chip.offsetWidth/2,behavior:reduce?'auto':'smooth'});}
  requestAnimationFrame(()=>moveCam(subCam(slug)));
}
function clearSel(){if(sel)hotSub(sel,false);sel=null;}
function mobileTap(e){
  if(dragMoved){dragMoved=false;return;}
  const r=stage.getBoundingClientRect(), tx=e.clientX-r.left, ty=e.clientY-r.top;
  let best=null, bd=46;
  for(const k in pinEls){const p=pinEls[k];if(p.hidden)continue;
    const d=Math.hypot(cam.x+p._wx*cam.s-tx, cam.y+p._wy*cam.s-ty); if(d<bd){bd=d;best=k;}}
  if(!best){const sub=e.target.closest&&e.target.closest('.wsm-sub'); if(sub&&SUBS[sub.dataset.sub]?.zone===current)best=sub.dataset.sub;}
  if(best)selectSub(best);
}
stage.addEventListener('pointerdown',e=>{
  if(mode!=='zone'||e.pointerType==='mouse'||e.target.closest('.wsm-panel,.wsm-back'))return;
  drag={id:e.pointerId,x:e.clientX,y:e.clientY,cx:cam.x,cy:cam.y,moved:false};
});
stage.addEventListener('pointermove',e=>{
  if(!drag||e.pointerId!==drag.id)return;
  const dx=e.clientX-drag.x, dy=e.clientY-drag.y;
  if(!drag.moved&&Math.hypot(dx,dy)<8)return;
  drag.moved=true; gsap.killTweensOf(cam); cam.x=drag.cx+dx; cam.y=drag.cy+dy; applyCam();
});
const endDrag=e=>{if(!drag)return; dragMoved=drag.moved; drag=null; if(dragMoved)setTimeout(()=>dragMoved=false,350);};
stage.addEventListener('pointerup',endDrag); stage.addEventListener('pointercancel',endDrag);

/* ---------- events ---------- */
for(const id in zoneEls){
  const g=zoneEls[id];
  g.addEventListener('pointerenter',e=>{if(mode!=='overview'||e.pointerType!=='mouse')return;hoverZone=id;highlightZone(id,true);setPins(id,'dots');showCard(byId(id),e.clientX-stage.getBoundingClientRect().left,e.clientY-stage.getBoundingClientRect().top);});
  g.addEventListener('pointerleave',e=>{if(mode!=='overview'||hoverZone!==id)return;hoverZone=null;highlightZone(null,false);setPins(null,'none');hideCard();});
  g.addEventListener('click',e=>{e.stopPropagation(); if(mode==='zone'&&isMobile()){mobileTap(e);return;} if(mode==='zone'&&current===id){const sub=e.target.closest('.wsm-sub'); if(sub){openPop(sub.dataset.sub);} return;} zoomTo(id);});
  g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();zoomTo(id);}});
  g.addEventListener('focus',()=>{if(mode!=='overview')return;const b=ZB[id];highlightZone(id,true);setPins(id,'dots');showCard(byId(id),cam.x+((b.x0+b.x1)/2)*cam.s,cam.y+b.y0*cam.s+30);});
  g.addEventListener('blur',()=>{if(mode!=='overview')return;highlightZone(null,false);setPins(null,'none');hideCard();});
}
svgEl.addEventListener('pointerover',e=>{if(mode!=='zone')return;const sub=e.target.closest('.wsm-sub');if(sub&&SUBS[sub.dataset.sub]?.zone===current&&e.pointerType==='mouse')openPop(sub.dataset.sub);});
svgEl.addEventListener('pointerout',e=>{if(mode!=='zone')return;const sub=e.target.closest('.wsm-sub');if(sub&&!sub.contains(e.relatedTarget))closePop(250);});
stage.addEventListener('click',e=>{
  const goEl=e.target.closest('[data-go]'); if(goEl){return;}
  if(e.target.closest('.wsm-pin,.wsm-pop,.wsm-panel,.wsm-back,.wsm-card,.wsm-slabel'))return;
  if(mode==='zone'&&isMobile()){mobileTap(e);return;}
  if(mode==='zone'){ if(popFor)closePop(); else zoomOut(); }
});
pinsEl.addEventListener('pointerover',e=>{const p=e.target.closest('.wsm-pin');if(p&&e.pointerType==='mouse')openPop(p.dataset.sub);});
pinsEl.addEventListener('pointerout',e=>{const p=e.target.closest('.wsm-pin');if(p&&!p.contains(e.relatedTarget))closePop(250);});
pinsEl.addEventListener('click',e=>{const p=e.target.closest('.wsm-pin');if(!p)return;e.stopPropagation();
  if(popFor===p.dataset.sub&&pop.classList.contains('wsm-show'))go(p.dataset.sub);else openPop(p.dataset.sub);});
pinsEl.addEventListener('focusin',e=>{const p=e.target.closest('.wsm-pin');if(p&&!isMobile())openPop(p.dataset.sub);});
pop.addEventListener('pointerenter',()=>clearTimeout(popHideT));
pop.addEventListener('pointerleave',()=>closePop(200));
panel.addEventListener('pointerover',e=>{const b=e.target.closest('button[data-sub]');if(b&&e.pointerType==='mouse')openPop(b.dataset.sub);});
panel.addEventListener('pointerout',e=>{const b=e.target.closest('button[data-sub]');if(b&&!b.contains(e.relatedTarget))closePop(250);});
panel.addEventListener('focusin',e=>{const b=e.target.closest('button[data-sub]');if(b&&!isMobile())openPop(b.dataset.sub);});
panel.addEventListener('click',e=>{const b=e.target.closest('button[data-sub]');if(b){e.stopPropagation();isMobile()?selectSub(b.dataset.sub):openPop(b.dataset.sub);return;}
  const st=e.target.closest('[data-step]');if(st){e.stopPropagation();const i=ORDER.indexOf(current);zoomTo(ORDER[(i+(+st.dataset.step)+6)%6]);}});
backBtn.addEventListener('click',e=>{e.stopPropagation();zoomOut();});
chips.addEventListener('click',e=>{const c=e.target.closest('.wsm-chip');if(!c)return;c.dataset.z?zoomTo(c.dataset.z):zoomOut();});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){if(popFor)closePop();else zoomOut();}
  if(mode==='zone'&&(e.key==='ArrowRight'||e.key==='ArrowLeft')&&!e.target.closest('input,select')){const i=ORDER.indexOf(current);zoomTo(ORDER[(i+(e.key==='ArrowRight'?1:-1)+6)%6]);}
});
new ResizeObserver(()=>{pinsEl.classList.toggle('wsm-compact',isMobile());for(const k in pinEls)pinEls[k]._lw=0;Object.assign(cam,mode==='zone'?(sel&&isMobile()?subCam(sel):zoneCam(current)):overviewCam());applyCam();}).observe(stage);

renderChips();
if(matchMedia('(hover: none)').matches)document.getElementById('wsm-hint').textContent='Tap a district to zoom';
buildSectorLabels();
document.getElementById('wsm-slabels').addEventListener('pointerover',e=>{const b=e.target.closest('.wsm-slabel');if(!b||mode!=='overview'||e.pointerType!=='mouse'||hoverZone===b.dataset.zone)return;const id=b.dataset.zone;hoverZone=id;highlightZone(id,true);setPins(id,'dots');showCard(byId(id));});
document.getElementById('wsm-slabels').addEventListener('pointerout',e=>{const b=e.target.closest('.wsm-slabel');if(!b||b.contains(e.relatedTarget)||mode!=='overview')return;hoverZone=null;highlightZone(null,false);setPins(null,'none');hideCard();});
document.getElementById('wsm-slabels').addEventListener('click',e=>{const b=e.target.closest('.wsm-slabel');if(!b)return;e.stopPropagation();hideCard();zoomTo(b.dataset.zone);});
document.getElementById('wsm-slabels').addEventListener('focusin',e=>{const b=e.target.closest('.wsm-slabel');if(b&&mode==='overview'){highlightZone(b.dataset.zone,true);setPins(b.dataset.zone,'dots');showCard(byId(b.dataset.zone));}});
document.getElementById('wsm-slabels').addEventListener('focusout',e=>{if(mode==='overview'){highlightZone(null,false);setPins(null,'none');hideCard();}});
Object.assign(cam,overviewCam()); applyCam();

  }
  function withGsap(cb){
    if(window.gsap)return cb();
    var s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'; s.onload=cb; document.head.appendChild(s);
  }
  function ready(){withGsap(boot);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready); else ready();
})();
