(function(){
  'use strict';

  var BUILD='2026-10-01-quick-original-v1';
  var config=window.ArtmugPortfolioConfig||{};
  var scriptEl=document.currentScript||document.querySelector("script[src*='parent-script']");
  var scriptOrigin='';
  try{scriptOrigin=scriptEl&&scriptEl.src?new URL(scriptEl.src).origin:''}catch(e){}

  var iframeId=config.iframeId||'portfolioFrame';
  var iframeSelector=config.iframeSelector||"iframe[src*='kina-artmug.netlify.app'], iframe[src*='artmug_portfolio'], iframe[src*='index.html'], iframe[src*='iframe.html'], [name='am-root'] iframe, #portfolioFrame, #riggingFrame";
  var allowedOrigin=config.allowedOrigin||scriptOrigin||'*';
  var stickyOffset=Number(config.stickyOffset)||0;
  var maxWidth=Math.min(1180,Math.max(320,Number(config.maxWidth)||1180));

  // IMPORTANT: Reserve enough height immediately so Artmug can make its own
  // native "내용 더 보기" decision during the first layout pass.
  // This script never queries, hides, removes or styles Artmug-owned buttons/UI.
  var initialHeight=Math.max(1400,Number(config.initialHeight)||2600);
  var heightCacheKey='starahri:artmug:frame-height:v1';

  var iframe=null;
  var bound=false;
  var observer=null;
  var retryTimer=null;
  var retryCount=0;
  var viewportTick=false;
  var widthObserver=null;
  var quickNav=null;
  var quickItems=[];

  function q(selector){try{return document.querySelector(selector)}catch(e){return null}}

  function cachedHeight(){
    try{
      var value=Number(sessionStorage.getItem(heightCacheKey));
      return Number.isFinite(value)&&value>=initialHeight?Math.ceil(value):initialHeight;
    }catch(e){return initialHeight}
  }

  function saveHeight(value){
    try{sessionStorage.setItem(heightCacheKey,String(Math.ceil(value)))}catch(e){}
  }

  function findIframe(){
    var found=document.getElementById(iframeId);
    if(found&&found.tagName&&found.tagName.toLowerCase()==='iframe')return found;
    if(config.iframeSelector){found=q(config.iframeSelector);if(found&&found.tagName&&found.tagName.toLowerCase()==='iframe')return found}
    found=q("[name='am-root'] iframe");
    if(found&&found.tagName&&found.tagName.toLowerCase()==='iframe')return found;
    if(scriptOrigin){found=q("iframe[src*='"+scriptOrigin+"']");if(found&&found.tagName&&found.tagName.toLowerCase()==='iframe')return found}
    found=q(iframeSelector);
    return found&&found.tagName&&found.tagName.toLowerCase()==='iframe'?found:null;
  }

  function post(message){
    if(!iframe||!iframe.contentWindow)return;
    try{iframe.contentWindow.postMessage(message,'*')}catch(e){}
  }

  function injectQuickStyle(){
    if(document.getElementById('artmugPortfolioQuickStyle'))return;
    var style=document.createElement('style');
    style.id='artmugPortfolioQuickStyle';
    style.textContent="@font-face{font-family:Paperozi;src:url(https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-4Regular.woff2) format('woff2');font-weight:400;font-display:swap}@font-face{font-family:Paperozi;src:url(https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-6SemiBold.woff2) format('woff2');font-weight:600;font-display:swap}#artmugPortfolioQuickNav{--amq-progress:0;position:fixed;z-index:2147483000;display:grid;gap:0;width:212px;max-height:calc(100vh - 48px);padding:13px 12px 12px 15px;border:1px solid #ddd7e7;border-radius:8px;background:rgba(255,255,255,.975);box-shadow:0 20px 52px rgba(55,43,82,.11);overflow:auto;scrollbar-width:none;opacity:0;pointer-events:none;transform:translate3d(8px,8px,0);transition:opacity .28s ease,transform .38s cubic-bezier(.16,1,.3,1),box-shadow .28s ease;backdrop-filter:blur(16px)}#artmugPortfolioQuickNav::before{content:'QUICK MENU';display:block;padding:3px 10px 12px 12px;margin-bottom:3px;border-bottom:1px solid #ece8f1;color:#6958bc;font:600 11px/1.2 Paperozi,'Noto Sans KR',sans-serif;letter-spacing:.14em}#artmugPortfolioQuickNav::after{content:'';position:absolute;left:0;top:48px;width:2px;height:calc(100% - 60px);border-radius:2px;background:#7865d4;transform-origin:top;transform:scaleY(var(--amq-progress));transition:transform .18s ease}#artmugPortfolioQuickNav::-webkit-scrollbar{display:none}#artmugPortfolioQuickNav.amq-visible{opacity:1;pointer-events:auto;transform:translate3d(0,0,0)}#artmugPortfolioQuickNav.amq-visible:hover{box-shadow:0 24px 58px rgba(55,43,82,.14)}#artmugPortfolioQuickNav button{position:relative;appearance:none;-webkit-appearance:none;width:100%;min-height:45px;padding:11px 29px 11px 22px;border:0;border-bottom:1px solid #f0edf4;border-radius:4px;background:transparent;color:#554f5b;text-align:left;cursor:pointer;font:500 14px/1.45 Paperozi,'Noto Sans KR',sans-serif;letter-spacing:-.015em;white-space:normal;word-break:keep-all;transition:background .22s ease,color .22s ease,padding-left .34s cubic-bezier(.16,1,.3,1),transform .34s cubic-bezier(.16,1,.3,1)}#artmugPortfolioQuickNav button:last-child{border-bottom:0}#artmugPortfolioQuickNav button::before{content:'';position:absolute;left:8px;top:50%;width:4px;height:4px;border-radius:50%;background:#bbb1de;transform:translateY(-50%) scale(1);transition:background .22s ease,transform .32s cubic-bezier(.16,1,.3,1)}#artmugPortfolioQuickNav button::after{content:'→';position:absolute;right:10px;top:50%;color:#7562cb;font:500 15px/1 Paperozi,sans-serif;opacity:0;transform:translate3d(-6px,-50%,0);transition:opacity .22s ease,transform .34s cubic-bezier(.16,1,.3,1)}#artmugPortfolioQuickNav button:hover,#artmugPortfolioQuickNav button:focus-visible{outline:none;background:#faf9fd;color:#5c4aac;padding-left:27px;transform:translate3d(2px,0,0)}#artmugPortfolioQuickNav button:hover::before,#artmugPortfolioQuickNav button:focus-visible::before{background:#7562cb;transform:translateY(-50%) scale(1.65)}#artmugPortfolioQuickNav button:hover::after,#artmugPortfolioQuickNav button:focus-visible::after{opacity:1;transform:translate3d(0,-50%,0)}@media(max-width:1510px){#artmugPortfolioQuickNav{display:none!important}}";
    document.head.appendChild(style);
  }

  function ensureQuickNav(){
    if(quickNav&&quickNav.isConnected)return quickNav;
    if(!document.body)return null;
    injectQuickStyle();
    quickNav=document.createElement('nav');
    quickNav.id='artmugPortfolioQuickNav';
    quickNav.setAttribute('aria-label','페이지 퀵메뉴');
    quickNav.addEventListener('click',function(event){
      var button=event.target.closest('button[data-quick-target]');
      if(!button)return;
      post({type:'artmugPortfolio:navigate',id:button.getAttribute('data-quick-target')||''});
    });
    document.body.appendChild(quickNav);
    return quickNav;
  }

  function renderQuickNav(){
    var nav=ensureQuickNav();
    if(!nav)return;
    nav.innerHTML='';
    quickItems.forEach(function(item){
      var button=document.createElement('button');
      button.type='button';
      button.setAttribute('data-quick-target',String(item.id||''));
      button.setAttribute('aria-label',String(item.title||item.id||'')+'로 이동');
      button.textContent=String(item.title||item.id||'');
      nav.appendChild(button);
    });
    positionQuickNav();
  }

  function positionQuickNav(){
    if(!quickNav||!iframe||!iframe.getBoundingClientRect)return;
    var rect=iframe.getBoundingClientRect();
    var vw=window.innerWidth||document.documentElement.clientWidth;
    var vh=window.innerHeight||document.documentElement.clientHeight;
    var width=212;
    var gap=18;
    var rightSpace=vw-rect.right;
    var top=Math.max(18,stickyOffset+70);
    var hasSpace=rightSpace>=width+gap+8;
    var visible=hasSpace&&quickItems.length>0;
    var scrollable=Math.max(1,rect.height-vh+top);
    var progress=Math.max(0,Math.min(1,(top-rect.top)/scrollable));
    quickNav.style.setProperty('--amq-progress',String(progress));
    quickNav.style.top=top+'px';
    quickNav.style.left=Math.round(rect.right+gap)+'px';
    quickNav.classList.toggle('amq-visible',visible);
  }

  function getAvailableWidth(){
    if(!iframe)return maxWidth;
    var parent=iframe.parentElement;
    if(!parent)return Math.min(maxWidth,window.innerWidth||document.documentElement.clientWidth||1180);
    var available=parent.clientWidth||parent.getBoundingClientRect().width||maxWidth;
    try{
      var style=window.getComputedStyle(parent);
      available-=parseFloat(style.paddingLeft)||0;
      available-=parseFloat(style.paddingRight)||0;
    }catch(e){}
    return Math.max(0,available);
  }

  function styleIframe(){
    if(!iframe)return;
    var limit=Math.min(1180,maxWidth);
    var available=getAvailableWidth();
    var target=Math.min(limit,available||limit);
    if(!Number.isFinite(target)||target<=0)target=limit;
    target=Math.floor(target*1000)/1000;

    // Only the creator-owned iframe is styled. No Artmug controls are touched.
    iframe.style.setProperty('box-sizing','border-box','important');
    iframe.style.setProperty('width',target+'px','important');
    iframe.style.setProperty('min-width','0','important');
    iframe.style.setProperty('max-width',limit+'px','important');
    iframe.style.setProperty('margin-left','auto','important');
    iframe.style.setProperty('margin-right','auto','important');
    iframe.style.setProperty('display','block','important');
    iframe.style.setProperty('border','0','important');
  }

  function reserveInitialHeight(){
    if(!iframe)return;
    var reserved=cachedHeight();
    iframe.style.setProperty('min-height',initialHeight+'px','important');
    iframe.style.height=reserved+'px';
    iframe.setAttribute('height',String(reserved));
  }

  function sendViewport(){
    if(!iframe||!iframe.getBoundingClientRect)return;
    styleIframe();
    var rect=iframe.getBoundingClientRect();
    var viewportHeight=window.innerHeight||document.documentElement.clientHeight;
    var viewportWidth=window.innerWidth||document.documentElement.clientWidth;
    var visibleTop=Math.max(0,stickyOffset-rect.top);
    var visibleBottom=Math.max(visibleTop,Math.min(rect.height,viewportHeight-rect.top));
    post({
      type:'artmugPortfolio:viewport',
      frameTop:rect.top,
      frameLeft:rect.left,
      frameWidth:rect.width,
      frameHeight:rect.height,
      visibleTop:visibleTop,
      visibleBottom:visibleBottom,
      viewportHeight:viewportHeight,
      viewportWidth:viewportWidth,
      scrollY:window.pageYOffset||document.documentElement.scrollTop,
      stickyOffset:stickyOffset
    });
    positionQuickNav();
  }

  function scheduleViewport(){
    if(viewportTick)return;
    viewportTick=true;
    requestAnimationFrame(function(){viewportTick=false;sendViewport()});
  }

  function setHeight(height){
    if(!iframe)return;
    var numeric=Number(height);
    if(!Number.isFinite(numeric)||numeric<=0)return;
    var next=Math.max(initialHeight,Math.ceil(numeric));
    iframe.style.height=next+'px';
    iframe.setAttribute('height',String(next));
    saveHeight(next);
    scheduleViewport();

    // Let host layout listeners react naturally without touching any host UI.
    try{window.dispatchEvent(new Event('resize'))}catch(e){}
  }

  function bindIframe(found){
    if(!found||bound)return;
    iframe=found;
    if(!iframe.id)iframe.id=iframeId;

    // Reserve height BEFORE requesting child measurements.
    styleIframe();
    reserveInitialHeight();
    bound=true;
    ensureQuickNav();

    iframe.addEventListener('load',function(){
      styleIframe();
      post({type:'artmugPortfolio:requestHeight'});
      sendViewport();
    });
    window.addEventListener('scroll',scheduleViewport,{passive:true});
    window.addEventListener('resize',scheduleViewport,{passive:true});
    window.addEventListener('orientationchange',scheduleViewport,{passive:true});

    if(window.ResizeObserver&&iframe.parentElement){
      widthObserver=new ResizeObserver(function(){styleIframe();scheduleViewport()});
      widthObserver.observe(iframe.parentElement);
    }

    post({type:'artmugPortfolio:requestHeight'});
    sendViewport();
    setTimeout(function(){post({type:'artmugPortfolio:requestHeight'});sendViewport()},250);
    setTimeout(function(){post({type:'artmugPortfolio:requestHeight'});sendViewport()},900);
  }

  function tryBind(){
    var found=findIframe();
    if(found){bindIframe(found);return true}
    return false;
  }

  window.addEventListener('message',function(event){
    if(allowedOrigin!=='*'&&event.origin!==allowedOrigin)return;
    if(!iframe||event.source!==iframe.contentWindow)return;
    var data=event.data||{};
    if(data.type==='artmugPortfolio:height')setHeight(data.height);
    if(data.type==='artmugPortfolio:requestViewport')sendViewport();
    if(data.type==='artmugPortfolio:quickNav'&&Array.isArray(data.items)){
      quickItems=data.items.filter(function(item){return item&&item.id});
      renderQuickNav();
    }
    if(data.type==='artmugPortfolio:scrollTop'){
      window.scrollTo({top:iframe.getBoundingClientRect().top+window.pageYOffset,behavior:'smooth'});
    }
    if(data.type==='artmugPortfolio:scrollTo'){
      window.scrollTo({top:iframe.getBoundingClientRect().top+window.pageYOffset+Math.max(0,Number(data.offset)||0),behavior:'smooth'});
    }
  });

  function start(){
    if(tryBind())return;
    observer=new MutationObserver(function(){
      if(tryBind()&&observer){observer.disconnect();observer=null}
    });
    try{observer.observe(document.documentElement,{childList:true,subtree:true})}catch(e){}
    retryTimer=setInterval(function(){
      retryCount++;
      if(tryBind()||retryCount>30){
        clearInterval(retryTimer);retryTimer=null;
        if(observer){observer.disconnect();observer=null}
      }
    },200);
  }

  // Run immediately when possible so the iframe has a tall first layout before
  // Artmug evaluates its native collapsed/expanded content state.
  if(document.documentElement) start();
  else document.addEventListener('DOMContentLoaded',start,{once:true});
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){
      if(bound){ensureQuickNav();post({type:'artmugPortfolio:requestViewport'});}
    },{once:true});
  }

  // Exposed only for troubleshooting/version checks; no host UI mutation.
  window.StarahriArtmugBridge={build:BUILD};
})();
