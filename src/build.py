import os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
import re, json, sys
src = open(os.path.join(ROOT,'src','prototype.html')).read()
css = src[src.index('<style>')+7 : src.index('</style>')]
js  = src[src.index('<script>\n(function(){')+9 : src.rindex('</script>')]

# ---------- CSS: split into top-level blocks, drop page chrome + theme blocks ----------
def blocks(text):
    out=[]; i=0; n=len(text)
    while i<n:
        while i<n and text[i] in ' \n\t': i+=1
        if i>=n: break
        if text.startswith('/*',i):
            j=text.index('*/',i)+2; i=j; continue
        j=text.index('{',i); sel=text[i:j].strip(); depth=1; k=j+1
        while depth:
            if text[k]=='{': depth+=1
            elif text[k]=='}': depth-=1
            k+=1
        out.append((sel,text[j+1:k-1])); i=k
    return out
DROP = ('body','.wrap','header','h1','.eyebrow','.lede','.note','details.controls','.ctl','.test',':root[data-theme','@media (prefers-color-scheme','*','[hidden]')
keep=[]
for sel,body in blocks(css):
    if sel.startswith(DROP) and not sel.startswith('@media (prefers-reduced'): continue
    if sel==':root': sel='.wsm'
    keep.append((sel,body))
css2=''
for sel,body in keep: css2+=sel+'{'+body+'}\n'
css2 = css2.replace('"Figtree", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif','"Manrope", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif')
css2 = css2.replace('"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace','ui-monospace, "SF Mono", Menlo, Consolas, monospace')
css2 = css2.replace('"JetBrains Mono",monospace','ui-monospace,"SF Mono",Menlo,monospace')
css2 = '.wsm{font-family:var(--font);color:var(--ink);line-height:1.5;-webkit-font-smoothing:antialiased}\n.wsm *,.wsm *::before,.wsm *::after{box-sizing:border-box}\n.wsm [hidden]{display:none!important}\n.wsm svg{max-width:none}\n.wsm button{font-family:inherit}\n' + css2

# ---------- class + id prefixing ----------
classes=set(re.findall(r'(?<![\w-])\.([a-zA-Z][\w-]*)', re.sub(r'url\([^)]*\)|\d\.\d+','',css2)))
classes |= {'show','hot','is-hot','dim','labels','dots-only','compact','zoomed','dl','nos','sub','zone','lot','blades','ground','bg','lotlabel','nm','sector','sel','tip','count','line','row','link','nav','go','map','back','btn','chip','slabel','leaders','slabels','pin','dot','lbl','pins','world','stage','card','pop','panel','hint','toast','chips','ws-ico','s'}
classes -= {'wsm'}
P=lambda c:'wsm-'+c
def _ren(s):
    return re.sub(r'\.([a-zA-Z][\w-]*)', lambda m:'.'+(P(m.group(1)) if m.group(1) in classes else m.group(1)), s)
def ren_sel(s):
    parts=re.split(r'(\$\{[^}]*\})', s)
    return ''.join(p if p.startswith('${') else _ren(p) for p in parts)
# CSS selectors only (not bodies)
out=''
for sel,body in blocks(css2):
    if sel.startswith('@'):
        inner=''.join(ren_sel(s2)+'{'+b2+'}' for s2,b2 in blocks(body))
        out+=sel+'{'+inner+'}\n'
    else:
        out+=ren_sel(sel)+'{'+body+'}\n'
css3=out

def ren_tokens(v):
    return ' '.join(P(t) if t in classes else t for t in v.split(' '))
html_parts = src[src.index('<div class="stage"'):src.index('<details class="controls"')]
html = '<nav class="chips" id="chips" aria-label="Jump to a sector"></nav>\n' + html_parts.strip()

def ren_code(s):
    s = re.sub(r'class="([^"]*)"', lambda m:'class="'+ren_tokens(m.group(1))+'"', s)
    s = re.sub(r"className='([^']*)'", lambda m:"className='"+ren_tokens(m.group(1))+"'", s)
    s = re.sub(r"classList\.(add|remove|toggle|contains)\(\s*'([^']+)'", lambda m:"classList.%s('%s'"%(m.group(1),P(m.group(2)) if m.group(2) in classes else m.group(2)), s)
    s = re.sub(r"(querySelector(?:All)?|closest|matches)\((['\"`])((?:(?!\2).)*)\2", lambda m:m.group(1)+'('+m.group(2)+ren_sel(m.group(3))+m.group(2), s)
    s = s.replace("'dl'","'wsm-dl'").replace("'nos'","'wsm-nos'").replace(",'sector')",",'wsm-sector')")
    for i in ['stage','world','pins','card','pop','panel','back','hint','toast','chips','slabels','leaders','selBox','cars']:
        s = s.replace(f'id="{i}"',f'id="wsm-{i}"').replace(f"getElementById('{i}')",f"getElementById('wsm-{i}')").replace(f"'#{i}'",f"'#wsm-{i}'")
    s = s.replace('id="z-${z.id}"','id="wsm-z-${z.id}"')
    return s
html = ren_code(html)
js2 = ren_code(js)

# ---------- production behaviour ----------
def must(a,b):
    global js2
    assert js2.count(a)==1,(js2.count(a),a[:70]); js2=js2.replace(a,b)
import re as _re
js2=_re.sub(r'const FA_FREE=\{.*?\};\n','const FA_FREE={};\n',js2,count=1,flags=_re.S)
must("const dur=instant||reduce?0:parseFloat(document.getElementById('dur').value);","const dur=instant||reduce?0:0.9;")
must("ease:document.getElementById('ease').value","ease:'power3.inOut'")
must("if(reduce){ambient.forEach(t=>t.pause()); document.getElementById('amb').checked=false;}","if(reduce){ambient.forEach(t=>t.pause());}")
must("const dur=document.getElementById('dur'), durOut=document.getElementById('durOut');\ndur.addEventListener('input',()=>durOut.textContent=(+dur.value).toFixed(1)+'s');\ndocument.getElementById('amb').addEventListener('change',e=>ambient.forEach(t=>e.target.checked?t.resume():t.pause()));\n","")
must("function go(slug){showToast(`Prototype: this opens /industries/${slug}`);}",
"""const SECTOR_PATH={'buildings-development':'buildings-development','transportation':'transportation','energy':'energy','water-environment':'water-environment','urban-planning':'public-sector','aec-technology':'aec-technology'};
function linkFor(slug){const o=(window.WSM_LINKS||{})[slug]; if(o)return o; if(SECTOR_PATH[slug])return '/industries/'+SECTOR_PATH[slug]; const z=SUBS[slug]?SUBS[slug].zone:null; return z?'/industries/'+SECTOR_PATH[z]+'#'+slug:'#';}""")
js2 = re.sub(r'href="#" data-go="\$\{([^}]+)\}"', r'href="${linkFor(\1)}" data-go="${\1}"', js2)
must("const goEl=e.target.closest('[data-go]'); if(goEl){e.preventDefault();go(goEl.dataset.go);return;}","const goEl=e.target.closest('[data-go]'); if(goEl){return;}")
assert "data-go" in js2 and 'href="#"' not in js2, 'href fix failed'
# entry point: the IIFE becomes start()
assert js2.lstrip().startswith('(function(){')
body = js2.lstrip()[len('(function(){'):]
body = body[:body.rstrip().rindex('})();')]

bundle = """/*! Wonderstruct Sector City Map | built from the Claude prototype | mount: <div id="ws-sector-map"></div> */
(function(){
  if(window.__wsmLoaded)return; window.__wsmLoaded=true;
  var CSS=%s;
  var HTML=%s;
  function boot(){
    var host=document.getElementById('ws-sector-map'); if(!host)return;
    if(!document.getElementById('wsm-style')){var st=document.createElement('style');st.id='wsm-style';st.textContent=CSS;document.head.appendChild(st);}
    host.classList.add('wsm'); host.innerHTML=HTML;
    start();
  }
  function start(){
%s
  }
  function withGsap(cb){
    if(window.gsap)return cb();
    var s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'; s.onload=cb; document.head.appendChild(s);
  }
  function ready(){withGsap(boot);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready); else ready();
})();
""" % (json.dumps(css3), json.dumps(html), body)
open(os.path.join(ROOT,'sector-map.js'),'w').write(bundle)
print('bundle bytes', len(bundle))
left=[c for c in re.findall(r'class="([^"$]+)"', html) ]
print('html classes sample', left[:6])
