(function(){
  'use strict';

  var BUILD='2026-10-01-clean-v1';
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

  // Exposed only for troubleshooting/version checks; no host UI mutation.
  window.StarahriArtmugBridge={build:BUILD};
})();
