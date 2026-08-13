(function(){
var config=window.ArtmugPortfolioConfig||{};
var scriptEl=document.currentScript||document.querySelector("script[src*='parent-script']");
var scriptOrigin="";
try{scriptOrigin=scriptEl&&scriptEl.src?new URL(scriptEl.src).origin:""}catch(e){}
var iframeId=config.iframeId||"portfolioFrame";
var iframeSelector=config.iframeSelector||"iframe[src*='kina-artmug.netlify.app'], iframe[src*='artmug_portfolio'], iframe[src*='index.html'], iframe[src*='iframe.html'], [name='am-root'] iframe, #portfolioFrame, #riggingFrame";
var allowedOrigin=config.allowedOrigin||scriptOrigin||"*";
var stickyOffset=Number(config.stickyOffset)||0;
var maxWidth=Math.min(1180,Math.max(320,Number(config.maxWidth)||1180));
var removeSelectors=config.removeSelectors||[".artmug_btn",".artmug-button",".portfolio_button",".btn_area",".button_area","a[href*='order']","a[href*='request']","a[href*='apply']"];
var iframe=null;
var binded=false;
var observer=null;
var retryTimer=null;
var retryCount=0;
var viewportTick=false;
var widthObserver=null;
var quickNav=null;
var quickItems=[];
var butterfly=null;
var butterflyTargetX=0;
var butterflyTargetY=0;
var butterflyX=0;
var butterflyY=0;
var butterflyFrame=0;
var butterflySeen=false;
var butterflyFinePointer=true;
var initialScrollDone=false;
var initialScrollY=null;
function q(selector){try{return document.querySelector(selector)}catch(e){return null}}
function findIframe(){
var found=document.getElementById(iframeId);
if(found&&found.tagName&&found.tagName.toLowerCase()==="iframe")return found;
if(config.iframeSelector){found=q(config.iframeSelector);if(found&&found.tagName&&found.tagName.toLowerCase()==="iframe")return found}
found=q("[name='am-root'] iframe");
if(found&&found.tagName&&found.tagName.toLowerCase()==="iframe")return found;
if(scriptOrigin){found=q("iframe[src*='"+scriptOrigin+"']");if(found&&found.tagName&&found.tagName.toLowerCase()==="iframe")return found}
found=q(iframeSelector);
if(found&&found.tagName&&found.tagName.toLowerCase()==="iframe")return found;
return null;
}
function post(message){
if(!iframe||!iframe.contentWindow)return;
try{iframe.contentWindow.postMessage(message,"*")}catch(e){}
}
function injectQuickStyle(){
if(document.getElementById("artmugPortfolioQuickStyle"))return;
var style=document.createElement("style");
style.id="artmugPortfolioQuickStyle";
style.textContent="@font-face{font-family:Paperozi;src:url(https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-4Regular.woff2) format('woff2');font-weight:400;font-display:swap}@font-face{font-family:Paperozi;src:url(https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-6SemiBold.woff2) format('woff2');font-weight:600;font-display:swap}#artmugPortfolioQuickNav{--amq-progress:0;position:fixed;z-index:2147483000;display:grid;gap:0;width:212px;max-height:calc(100vh - 48px);padding:13px 12px 12px 15px;border:1px solid #ddd7e7;border-radius:8px;background:rgba(255,255,255,.975);box-shadow:0 20px 52px rgba(55,43,82,.11);overflow:auto;scrollbar-width:none;opacity:0;pointer-events:none;transform:translate3d(8px,8px,0);transition:opacity .28s ease,transform .38s cubic-bezier(.16,1,.3,1),box-shadow .28s ease;backdrop-filter:blur(16px)}#artmugPortfolioQuickNav::before{content:'QUICK MENU';display:block;padding:3px 10px 12px 12px;margin-bottom:3px;border-bottom:1px solid #ece8f1;color:#6958bc;font:600 11px/1.2 Paperozi,'Noto Sans KR',sans-serif;letter-spacing:.14em}#artmugPortfolioQuickNav::after{content:'';position:absolute;left:0;top:48px;width:2px;height:calc(100% - 60px);border-radius:2px;background:#7865d4;transform-origin:top;transform:scaleY(var(--amq-progress));transition:transform .18s ease}#artmugPortfolioQuickNav::-webkit-scrollbar{display:none}#artmugPortfolioQuickNav.amq-visible{opacity:1;pointer-events:auto;transform:translate3d(0,0,0)}#artmugPortfolioQuickNav.amq-visible:hover{box-shadow:0 24px 58px rgba(55,43,82,.14)}#artmugPortfolioQuickNav button{position:relative;appearance:none;-webkit-appearance:none;width:100%;min-height:45px;padding:11px 29px 11px 22px;border:0;border-bottom:1px solid #f0edf4;border-radius:4px;background:transparent;color:#554f5b;text-align:left;cursor:pointer;font:500 14px/1.45 Paperozi,'Noto Sans KR',sans-serif;letter-spacing:-.015em;white-space:normal;word-break:keep-all;transition:background .22s ease,color .22s ease,padding-left .34s cubic-bezier(.16,1,.3,1),transform .34s cubic-bezier(.16,1,.3,1)}#artmugPortfolioQuickNav button:last-child{border-bottom:0}#artmugPortfolioQuickNav button::before{content:'';position:absolute;left:8px;top:50%;width:4px;height:4px;border-radius:50%;background:#bbb1de;transform:translateY(-50%) scale(1);transition:background .22s ease,transform .32s cubic-bezier(.16,1,.3,1)}#artmugPortfolioQuickNav button::after{content:'→';position:absolute;right:10px;top:50%;color:#7562cb;font:500 15px/1 Paperozi,sans-serif;opacity:0;transform:translate3d(-6px,-50%,0);transition:opacity .22s ease,transform .34s cubic-bezier(.16,1,.3,1)}#artmugPortfolioQuickNav button:hover,#artmugPortfolioQuickNav button:focus-visible{outline:none;background:#faf9fd;color:#5c4aac;padding-left:27px;transform:translate3d(2px,0,0)}#artmugPortfolioQuickNav button:hover::before,#artmugPortfolioQuickNav button:focus-visible::before{background:#7562cb;transform:translateY(-50%) scale(1.65)}#artmugPortfolioQuickNav button:hover::after,#artmugPortfolioQuickNav button:focus-visible::after{opacity:1;transform:translate3d(0,-50%,0)}@media(max-width:1510px){#artmugPortfolioQuickNav{display:none!important}}";
document.head.appendChild(style);
}
function ensureQuickNav(){
if(quickNav&&quickNav.isConnected)return quickNav;
injectQuickStyle();
quickNav=document.createElement("nav");
quickNav.id="artmugPortfolioQuickNav";
quickNav.setAttribute("aria-label","페이지 퀵메뉴");
quickNav.addEventListener("click",function(event){
var button=event.target.closest("button[data-quick-target]");
if(!button)return;
post({type:"artmugPortfolio:navigate",id:button.getAttribute("data-quick-target")||""});
});
document.body.appendChild(quickNav);
return quickNav;
}
function renderQuickNav(){
var nav=ensureQuickNav();
nav.innerHTML="";
quickItems.forEach(function(item){
var button=document.createElement("button");
button.type="button";
button.setAttribute("data-quick-target",String(item.id||""));
button.setAttribute("aria-label",String(item.title||item.id||"")+"로 이동");
button.textContent=String(item.title||item.id||"");
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
var visible=hasSpace&&rect.bottom>top+20&&rect.top<vh-20&&quickItems.length>0;var scrollable=Math.max(1,rect.height-vh+top);var progress=Math.max(0,Math.min(1,(top-rect.top)/scrollable));quickNav.style.setProperty('--amq-progress',String(progress));
quickNav.style.top=top+"px";
quickNav.style.left=Math.round(rect.right+gap)+"px";
quickNav.classList.toggle("amq-visible",visible);
}
function ensureButterfly(){
if(config.butterflyCursor===false)return null;
if(butterfly&&butterfly.isConnected)return butterfly;
if(window.matchMedia){
try{butterflyFinePointer=window.matchMedia("(hover:hover) and (pointer:fine)").matches}catch(e){butterflyFinePointer=true}
}
if(!butterflyFinePointer)return null;
if(!document.getElementById("artmugButterflyStyle")){
var style=document.createElement("style");
style.id="artmugButterflyStyle";
style.textContent="#artmugButterflyFollower{position:fixed;left:0;top:0;width:31px;height:29px;z-index:2147483646;pointer-events:none;opacity:0;transform:translate3d(-100px,-100px,0);transition:opacity .18s ease;will-change:transform;contain:layout paint style;filter:drop-shadow(0 2px 4px rgba(117,93,181,.14))}#artmugButterflyFollower.am-butterfly-visible{opacity:.97}#artmugButterflyFollower svg{display:block;width:100%;height:100%;overflow:visible}.am-butterfly-wing-left,.am-butterfly-wing-right{transform-box:fill-box;will-change:transform}.am-butterfly-wing-left{transform-origin:right center;animation:amButterflyLeft 1.18s ease-in-out infinite}.am-butterfly-wing-right{transform-origin:left center;animation:amButterflyRight 1.18s ease-in-out infinite}@keyframes amButterflyLeft{0%,100%{transform:scaleX(1) scaleY(1)}50%{transform:scaleX(.82) scaleY(.97)}}@keyframes amButterflyRight{0%,100%{transform:scaleX(1) scaleY(1)}50%{transform:scaleX(.82) scaleY(.97)}}@media(prefers-reduced-motion:reduce){.am-butterfly-wing-left,.am-butterfly-wing-right{animation:none!important}}@media(hover:none),(pointer:coarse){#artmugButterflyFollower{display:none!important}}";
document.head.appendChild(style);
}
butterfly=document.createElement("div");
butterfly.id="artmugButterflyFollower";
butterfly.setAttribute("aria-hidden","true");
butterfly.innerHTML='<svg viewBox="0 0 52 46" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true"><defs><linearGradient id="amBfTopL" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#dcc9ff"/><stop offset="45%" stop-color="#9db3ff"/><stop offset="100%" stop-color="#6f79d9"/></linearGradient><linearGradient id="amBfBotL" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ead8ff"/><stop offset="50%" stop-color="#b2c6ff"/><stop offset="100%" stop-color="#7e8be2"/></linearGradient><linearGradient id="amBfTopR" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#d9c4ff"/><stop offset="45%" stop-color="#9db4ff"/><stop offset="100%" stop-color="#6b73d3"/></linearGradient><linearGradient id="amBfBotR" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#efd9ff"/><stop offset="50%" stop-color="#b4c8ff"/><stop offset="100%" stop-color="#7c86df"/></linearGradient></defs><g class="am-butterfly-wing-left"><path d="M24.5 19.6C21.7 8.1 12.9 4.4 8.1 6.9c-4 2.2-4.3 8.7 5.1 14.6 3 1.9 6.7 3.1 10.2 3.3z" fill="url(#amBfTopL)" stroke="#4e488f" stroke-width="1.3" stroke-linejoin="round"/><path d="M23.9 21.1c-4.7 1-8.9 3.4-11.6 6.5-2.8 3.1-2 7.1 1.4 8.7 4.1 1.9 9.3-.7 12-4.7 1.8-2.7 2.2-6 1.5-10.5" fill="url(#amBfBotL)" stroke="#4e488f" stroke-width="1.3" stroke-linejoin="round"/><path d="M23.8 20.3c-2.7-4.8-7.7-8.3-12.4-9.7" fill="none" stroke="#584ea3" stroke-width=".82" stroke-linecap="round" opacity=".9"/><path d="M23.8 20.3c-3.8.4-8 1.9-11.6 4.7" fill="none" stroke="#584ea3" stroke-width=".82" stroke-linecap="round" opacity=".9"/><path d="M18.6 13.2c1.9 1 3.4 2.2 4.7 4" fill="none" stroke="#f3b6da" stroke-width="1.02" stroke-linecap="round" opacity=".88"/><path d="M17.1 27.3c2.1-1.3 4-2.1 5.8-2.6" fill="none" stroke="#f3b6da" stroke-width="1.02" stroke-linecap="round" opacity=".88"/><circle cx="14.7" cy="14.5" r="1.3" fill="#f7eefc" opacity=".95"/><circle cx="15.6" cy="28.7" r="1.15" fill="#f7eefc" opacity=".9"/></g><g class="am-butterfly-wing-right"><path d="M27.5 19.6C30.3 8.1 39.1 4.4 43.9 6.9c4 2.2 4.3 8.7-5.1 14.6-3 1.9-6.7 3.1-10.2 3.3z" fill="url(#amBfTopR)" stroke="#4e488f" stroke-width="1.3" stroke-linejoin="round"/><path d="M28.1 21.1c4.7 1 8.9 3.4 11.6 6.5 2.8 3.1 2 7.1-1.4 8.7-4.1 1.9-9.3-.7-12-4.7-1.8-2.7-2.2-6-1.5-10.5" fill="url(#amBfBotR)" stroke="#4e488f" stroke-width="1.3" stroke-linejoin="round"/><path d="M28.2 20.3c2.7-4.8 7.7-8.3 12.4-9.7" fill="none" stroke="#584ea3" stroke-width=".82" stroke-linecap="round" opacity=".9"/><path d="M28.2 20.3c3.8.4 8 1.9 11.6 4.7" fill="none" stroke="#584ea3" stroke-width=".82" stroke-linecap="round" opacity=".9"/><path d="M33.4 13.2c-1.9 1-3.4 2.2-4.7 4" fill="none" stroke="#f3b6da" stroke-width="1.02" stroke-linecap="round" opacity=".88"/><path d="M34.9 27.3c-2.1-1.3-4-2.1-5.8-2.6" fill="none" stroke="#f3b6da" stroke-width="1.02" stroke-linecap="round" opacity=".88"/><circle cx="37.3" cy="14.5" r="1.3" fill="#f7eefc" opacity=".95"/><circle cx="36.4" cy="28.7" r="1.15" fill="#f7eefc" opacity=".9"/></g><path d="M26 18.1c-1.95 0-2.58 2.18-2.32 5.35.25 3.15.83 7.71 2.32 10.7 1.49-2.99 2.07-7.55 2.32-10.7.26-3.17-.37-5.35-2.32-5.35z" fill="#4f467f"/><ellipse cx="26" cy="15.9" rx="2.3" ry="1.95" fill="#5b5091"/><path d="M25.4 14.9c-1.18-2.62-2.71-3.48-3.73-3.94M26.6 14.9c1.18-2.62 2.71-3.48 3.73-3.94" fill="none" stroke="#5b5091" stroke-width=".74" stroke-linecap="round"/><circle cx="24.95" cy="15.75" r=".28" fill="#fff" opacity=".92"/><circle cx="27.05" cy="15.75" r=".28" fill="#fff" opacity=".92"/></svg>';
document.body.appendChild(butterfly);
return butterfly;
}
function renderButterfly(){
butterflyFrame=0;
var el=ensureButterfly();
if(!el||!butterflySeen)return;
var reduced=false;
try{reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}
var ease=reduced?1:.2;
butterflyX+=(butterflyTargetX-butterflyX)*ease;
butterflyY+=(butterflyTargetY-butterflyY)*ease;
el.style.transform="translate3d("+butterflyX.toFixed(2)+"px,"+butterflyY.toFixed(2)+"px,0)";
if(Math.abs(butterflyTargetX-butterflyX)>.1||Math.abs(butterflyTargetY-butterflyY)>.1)butterflyFrame=requestAnimationFrame(renderButterfly);
}
function moveButterfly(clientX,clientY){
var el=ensureButterfly();
if(!el)return;
var x=Number(clientX),y=Number(clientY);
if(!Number.isFinite(x)||!Number.isFinite(y))return;
butterflyTargetX=x+13;
butterflyTargetY=y-11;
if(!butterflySeen){butterflyX=butterflyTargetX;butterflyY=butterflyTargetY;butterflySeen=true;el.classList.add("am-butterfly-visible")}
if(!butterflyFrame)butterflyFrame=requestAnimationFrame(renderButterfly);
}
function hideButterfly(){
butterflySeen=false;
if(butterfly)butterfly.classList.remove("am-butterfly-visible");
}
function setupButterfly(){
if(config.butterflyCursor===false)return;
ensureButterfly();
document.addEventListener("pointermove",function(event){if(event.pointerType==="touch")return;moveButterfly(event.clientX,event.clientY)},{passive:true});
document.addEventListener("pointerout",function(event){if(!event.relatedTarget)hideButterfly()},{passive:true});
window.addEventListener("blur",hideButterfly);
}
function sendViewport(){
if(!iframe||!iframe.getBoundingClientRect)return;
enforceIframeWidth();
var rect=iframe.getBoundingClientRect();
var viewportHeight=window.innerHeight||document.documentElement.clientHeight;
var viewportWidth=window.innerWidth||document.documentElement.clientWidth;
var visibleTop=Math.max(0,stickyOffset-rect.top);
var visibleBottom=Math.max(visibleTop,Math.min(rect.height,viewportHeight-rect.top));
post({type:"artmugPortfolio:viewport",frameTop:rect.top,frameLeft:rect.left,frameWidth:rect.width,frameHeight:rect.height,visibleTop:visibleTop,visibleBottom:visibleBottom,viewportHeight:viewportHeight,viewportWidth:viewportWidth,scrollY:window.pageYOffset||document.documentElement.scrollTop,stickyOffset:stickyOffset});
positionQuickNav();
}
function getPageScrollY(){
return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
}
function getInitialScrollTarget(){
if(!iframe||!iframe.getBoundingClientRect)return null;
var configuredOffset=Number(config.autoScrollOffset);
var offset=Number.isFinite(configuredOffset)?Math.max(0,configuredOffset):0;
var rect=iframe.getBoundingClientRect();
return Math.max(0,Math.round(rect.top+getPageScrollY()-offset));
}
function scrollToIframeOnEntry(){
if(initialScrollDone||config.autoScrollToIframe===false||!iframe)return;
if(window.location&&window.location.hash){initialScrollDone=true;return}
var target=getInitialScrollTarget();
if(target===null)return;
initialScrollDone=true;
initialScrollY=target;
window.scrollTo(0,target);
scheduleViewport();
setTimeout(function(){
if(!iframe||initialScrollY===null)return;
var current=getPageScrollY();
if(Math.abs(current-initialScrollY)>24)return;
var corrected=getInitialScrollTarget();
if(corrected===null||Math.abs(corrected-current)<2)return;
initialScrollY=corrected;
window.scrollTo(0,corrected);
scheduleViewport();
},240);
}
function scheduleInitialIframeScroll(){
if(initialScrollDone||config.autoScrollToIframe===false)return;
requestAnimationFrame(function(){requestAnimationFrame(scrollToIframeOnEntry)});
}
function setHeight(height){
if(!iframe)return;
var next=Math.max(300,Math.ceil(Number(height)||0));
iframe.style.height=next+"px";
iframe.setAttribute("height",String(next));
sendViewport();
}
function scheduleViewport(){
if(viewportTick)return;
viewportTick=true;
requestAnimationFrame(function(){viewportTick=false;sendViewport()});
}
function hideButtons(){
if(config.hideArtmugButtons===false)return;
removeSelectors.forEach(function(selector){
try{document.querySelectorAll(selector).forEach(function(el){if(!el.closest("[name='am-root']")&&!el.closest("#artmugPortfolioMount")&&!el.closest("#artmugPortfolioQuickNav")){el.style.display="none"}})}catch(e){}
});
}
function getIframeAvailableWidth(){
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
function enforceIframeWidth(){
if(!iframe)return;
var limit=Math.min(1180,maxWidth);
var available=getIframeAvailableWidth();
var target=Math.min(limit,available||limit);
if(!Number.isFinite(target)||target<=0)target=limit;
target=Math.floor(target*1000)/1000;
iframe.style.setProperty("box-sizing","border-box","important");
iframe.style.setProperty("width",target+"px","important");
iframe.style.setProperty("min-width","0","important");
iframe.style.setProperty("max-width",limit+"px","important");
iframe.style.setProperty("margin-left","auto","important");
iframe.style.setProperty("margin-right","auto","important");
iframe.style.setProperty("justify-self","center","important");
iframe.style.setProperty("align-self","center","important");
}
function styleIframe(){
if(!iframe)return;
enforceIframeWidth();
iframe.style.setProperty("border","0","important");
iframe.style.setProperty("display","block","important");
iframe.style.setProperty("overflow","hidden","important");
iframe.scrolling="no";
iframe.setAttribute("scrolling","no");
}
function bindIframe(found){
if(!found||binded)return;
iframe=found;
if(!iframe.id)iframe.id=iframeId;
styleIframe();
binded=true;
ensureQuickNav();
iframe.addEventListener("load",function(){styleIframe();post({type:"artmugPortfolio:requestHeight"});sendViewport()});
window.addEventListener("scroll",scheduleViewport,{passive:true});
window.addEventListener("resize",function(){styleIframe();scheduleViewport()});
window.addEventListener("orientationchange",function(){styleIframe();scheduleViewport()});
if(window.ResizeObserver&&iframe.parentElement){
widthObserver=new ResizeObserver(function(){styleIframe();scheduleViewport()});
widthObserver.observe(iframe.parentElement);
}
post({type:"artmugPortfolio:requestHeight"});
sendViewport();
scheduleInitialIframeScroll();
setTimeout(function(){post({type:"artmugPortfolio:requestHeight"});sendViewport()},300);
setTimeout(function(){post({type:"artmugPortfolio:requestHeight"});sendViewport()},1000);
}
function tryBind(){
var found=findIframe();
if(found){bindIframe(found);return true}
return false;
}
window.addEventListener("message",function(event){
if(allowedOrigin!=="*"&&event.origin!==allowedOrigin)return;
var data=event.data||{};
if(data.type==="artmugPortfolio:height")setHeight(data.height);
if(data.type==="artmugPortfolio:scrollTop"&&iframe)window.scrollTo({top:iframe.getBoundingClientRect().top+window.pageYOffset,behavior:"smooth"});
if(data.type==="artmugPortfolio:scrollTo"&&iframe)window.scrollTo({top:iframe.getBoundingClientRect().top+window.pageYOffset+Math.max(0,Number(data.offset)||0),behavior:"smooth"});
if(data.type==="artmugPortfolio:pointer"&&iframe&&event.source===iframe.contentWindow){var frameRect=iframe.getBoundingClientRect();moveButterfly(frameRect.left+(Number(data.x)||0),frameRect.top+(Number(data.y)||0))}
if(data.type==="artmugPortfolio:pointerleave"&&iframe&&event.source===iframe.contentWindow)hideButterfly();
if(data.type==="artmugPortfolio:requestViewport")sendViewport();
if(data.type==="artmugPortfolio:quickNav"&&Array.isArray(data.items)){quickItems=data.items.filter(function(item){return item&&item.id});renderQuickNav()}
});
function start(){
setupButterfly();
hideButtons();
if(tryBind())return;
observer=new MutationObserver(function(){if(tryBind()&&observer){observer.disconnect();observer=null}});
try{observer.observe(document.documentElement,{childList:true,subtree:true})}catch(e){}
retryTimer=setInterval(function(){
retryCount++;
hideButtons();
if(tryBind()||retryCount>30){clearInterval(retryTimer);retryTimer=null;if(observer){observer.disconnect();observer=null}}
},300);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
setInterval(hideButtons,1200);
setInterval(function(){if(binded)sendViewport()},700);
})();
