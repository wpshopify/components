(window.wpshopifyComponents=window.wpshopifyComponents||[]).push([[13],{319:function(e,t){e.exports=function(e){return null===e}},322:function(e,t,i){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var s="object"===("undefined"==typeof HTMLElement?"undefined":n(HTMLElement));function o(e){return s?e instanceof HTMLElement:e&&"object"===n(e)&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName}function h(e,t){t.forEach(function(t){e.classList.add(t)})}function a(e,t){t.forEach(function(t){e.classList.remove(t)})}var l=".drift-bounding-box,.drift-zoom-pane{position:absolute;pointer-events:none}@keyframes noop{0%{zoom:1}}@-webkit-keyframes noop{0%{zoom:1}}.drift-zoom-pane.drift-open{display:block}.drift-zoom-pane.drift-closing,.drift-zoom-pane.drift-opening{animation:noop 1ms;-webkit-animation:noop 1ms}.drift-zoom-pane{overflow:hidden;width:100%;height:100%;top:0;left:0}.drift-zoom-pane-loader{display:none}.drift-zoom-pane img{position:absolute;display:block;max-width:none;max-height:none}";function r(){throw new Error("Missing parameter")}function d(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.isShowing=!1;var i=t.namespace,n=void 0===i?null:i,s=t.zoomFactor,o=void 0===s?r():s,h=t.containerEl,a=void 0===h?r():h;this.settings={namespace:n,zoomFactor:o,containerEl:a},this.openClasses=this._buildClasses("open"),this._buildElement()}var t,i,n;return t=e,(i=[{key:"_buildClasses",value:function(e){var t=["drift-".concat(e)],i=this.settings.namespace;return i&&t.push("".concat(i,"-").concat(e)),t}},{key:"_buildElement",value:function(){this.el=document.createElement("div"),h(this.el,this._buildClasses("bounding-box"))}},{key:"show",value:function(e,t){this.isShowing=!0,this.settings.containerEl.appendChild(this.el);var i=this.el.style;i.width="".concat(Math.round(e/this.settings.zoomFactor),"px"),i.height="".concat(Math.round(t/this.settings.zoomFactor),"px"),h(this.el,this.openClasses)}},{key:"hide",value:function(){this.isShowing&&this.settings.containerEl.removeChild(this.el),this.isShowing=!1,a(this.el,this.openClasses)}},{key:"setPosition",value:function(e,t,i){var n=window.pageXOffset,s=window.pageYOffset,o=i.left+e*i.width-this.el.clientWidth/2+n,h=i.top+t*i.height-this.el.clientHeight/2+s;o<i.left+n?o=i.left+n:o+this.el.clientWidth>i.left+i.width+n&&(o=i.left+i.width-this.el.clientWidth+n),h<i.top+s?h=i.top+s:h+this.el.clientHeight>i.top+i.height+s&&(h=i.top+i.height-this.el.clientHeight+s),this.el.style.left="".concat(o,"px"),this.el.style.top="".concat(h,"px")}}])&&d(t.prototype,i),n&&d(t,n),e}();function u(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var m=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._show=this._show.bind(this),this._hide=this._hide.bind(this),this._handleEntry=this._handleEntry.bind(this),this._handleMovement=this._handleMovement.bind(this);var i=t.el,n=void 0===i?r():i,s=t.zoomPane,o=void 0===s?r():s,h=t.sourceAttribute,a=void 0===h?r():h,l=t.handleTouch,d=void 0===l?r():l,u=t.onShow,m=void 0===u?null:u,g=t.onHide,v=void 0===g?null:g,f=t.hoverDelay,p=void 0===f?0:f,y=t.touchDelay,b=void 0===y?0:y,w=t.hoverBoundingBox,_=void 0===w?r():w,E=t.touchBoundingBox,C=void 0===E?r():E,z=t.namespace,k=void 0===z?null:z,B=t.zoomFactor,L=void 0===B?r():B,x=t.boundingBoxContainer,S=void 0===x?r():x;this.settings={el:n,zoomPane:o,sourceAttribute:a,handleTouch:d,onShow:m,onHide:v,hoverDelay:p,touchDelay:b,hoverBoundingBox:_,touchBoundingBox:C,namespace:k,zoomFactor:L,boundingBoxContainer:S},(this.settings.hoverBoundingBox||this.settings.touchBoundingBox)&&(this.boundingBox=new c({namespace:this.settings.namespace,zoomFactor:this.settings.zoomFactor,containerEl:this.settings.boundingBoxContainer})),this.enabled=!0,this._bindEvents()}var t,i,n;return t=e,(i=[{key:"_preventDefault",value:function(e){e.preventDefault()}},{key:"_bindEvents",value:function(){this.settings.el.addEventListener("mouseenter",this._handleEntry,!1),this.settings.el.addEventListener("mouseleave",this._hide,!1),this.settings.el.addEventListener("mousemove",this._handleMovement,!1),this.settings.handleTouch?(this.settings.el.addEventListener("touchstart",this._handleEntry,!1),this.settings.el.addEventListener("touchend",this._hide,!1),this.settings.el.addEventListener("touchmove",this._handleMovement,!1)):(this.settings.el.addEventListener("touchstart",this._preventDefault,!1),this.settings.el.addEventListener("touchend",this._preventDefault,!1),this.settings.el.addEventListener("touchmove",this._preventDefault,!1))}},{key:"_unbindEvents",value:function(){this.settings.el.removeEventListener("mouseenter",this._handleEntry,!1),this.settings.el.removeEventListener("mouseleave",this._hide,!1),this.settings.el.removeEventListener("mousemove",this._handleMovement,!1),this.settings.handleTouch?(this.settings.el.removeEventListener("touchstart",this._handleEntry,!1),this.settings.el.removeEventListener("touchend",this._hide,!1),this.settings.el.removeEventListener("touchmove",this._handleMovement,!1)):(this.settings.el.removeEventListener("touchstart",this._preventDefault,!1),this.settings.el.removeEventListener("touchend",this._preventDefault,!1),this.settings.el.removeEventListener("touchmove",this._preventDefault,!1))}},{key:"_handleEntry",value:function(e){e.preventDefault(),this._lastMovement=e,"mouseenter"==e.type&&this.settings.hoverDelay?this.entryTimeout=setTimeout(this._show,this.settings.hoverDelay):this.settings.touchDelay?this.entryTimeout=setTimeout(this._show,this.settings.touchDelay):this._show()}},{key:"_show",value:function(){if(this.enabled){var e=this.settings.onShow;if(e&&"function"==typeof e&&e(),this.settings.zoomPane.show(this.settings.el.getAttribute(this.settings.sourceAttribute),this.settings.el.clientWidth,this.settings.el.clientHeight),this._lastMovement){var t=this._lastMovement.touches;(t&&this.settings.touchBoundingBox||!t&&this.settings.hoverBoundingBox)&&this.boundingBox.show(this.settings.zoomPane.el.clientWidth,this.settings.zoomPane.el.clientHeight)}this._handleMovement()}}},{key:"_hide",value:function(e){e&&e.preventDefault(),this._lastMovement=null,this.entryTimeout&&clearTimeout(this.entryTimeout),this.boundingBox&&this.boundingBox.hide();var t=this.settings.onHide;t&&"function"==typeof t&&t(),this.settings.zoomPane.hide()}},{key:"_handleMovement",value:function(e){if(e)e.preventDefault(),this._lastMovement=e;else{if(!this._lastMovement)return;e=this._lastMovement}var t,i;if(e.touches){var n=e.touches[0];t=n.clientX,i=n.clientY}else t=e.clientX,i=e.clientY;var s=this.settings.el.getBoundingClientRect(),o=t-s.left,h=i-s.top,a=o/this.settings.el.clientWidth,l=h/this.settings.el.clientHeight;this.boundingBox&&this.boundingBox.setPosition(a,l,s),this.settings.zoomPane.setPosition(a,l,s)}},{key:"isShowing",get:function(){return this.settings.zoomPane.isShowing}}])&&u(t.prototype,i),n&&u(t,n),e}();function g(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var v=document.createElement("div").style,f="undefined"!=typeof document&&("animation"in v||"webkitAnimation"in v),p=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._completeShow=this._completeShow.bind(this),this._completeHide=this._completeHide.bind(this),this._handleLoad=this._handleLoad.bind(this),this.isShowing=!1;var i=t.container,n=void 0===i?null:i,s=t.zoomFactor,o=void 0===s?r():s,h=t.inline,a=void 0===h?r():h,l=t.namespace,d=void 0===l?null:l,c=t.showWhitespaceAtEdges,u=void 0===c?r():c,m=t.containInline,g=void 0===m?r():m,v=t.inlineOffsetX,f=void 0===v?0:v,p=t.inlineOffsetY,y=void 0===p?0:p,b=t.inlineContainer,w=void 0===b?document.body:b;this.settings={container:n,zoomFactor:o,inline:a,namespace:d,showWhitespaceAtEdges:u,containInline:g,inlineOffsetX:f,inlineOffsetY:y,inlineContainer:w},this.openClasses=this._buildClasses("open"),this.openingClasses=this._buildClasses("opening"),this.closingClasses=this._buildClasses("closing"),this.inlineClasses=this._buildClasses("inline"),this.loadingClasses=this._buildClasses("loading"),this._buildElement()}var t,i,n;return t=e,(i=[{key:"_buildClasses",value:function(e){var t=["drift-".concat(e)],i=this.settings.namespace;return i&&t.push("".concat(i,"-").concat(e)),t}},{key:"_buildElement",value:function(){this.el=document.createElement("div"),h(this.el,this._buildClasses("zoom-pane"));var e=document.createElement("div");h(e,this._buildClasses("zoom-pane-loader")),this.el.appendChild(e),this.imgEl=document.createElement("img"),this.el.appendChild(this.imgEl)}},{key:"_setImageURL",value:function(e){this.imgEl.setAttribute("src",e)}},{key:"_setImageSize",value:function(e,t){this.imgEl.style.width="".concat(e*this.settings.zoomFactor,"px"),this.imgEl.style.height="".concat(t*this.settings.zoomFactor,"px")}},{key:"setPosition",value:function(e,t,i){var n=this.imgEl.offsetWidth,s=this.imgEl.offsetHeight,o=this.el.offsetWidth,h=this.el.offsetHeight,a=o/2-n*e,l=h/2-s*t,r=o-n,d=h-s,c=r>0,u=d>0,m=c?r/2:0,g=u?d/2:0,v=c?r/2:r,f=u?d/2:d;if(this.el.parentElement===this.settings.inlineContainer){var p=window.pageXOffset,y=window.pageYOffset,b=i.left+e*i.width-o/2+this.settings.inlineOffsetX+p,w=i.top+t*i.height-h/2+this.settings.inlineOffsetY+y;this.settings.containInline&&(b<i.left+p?b=i.left+p:b+o>i.left+i.width+p&&(b=i.left+i.width-o+p),w<i.top+y?w=i.top+y:w+h>i.top+i.height+y&&(w=i.top+i.height-h+y)),this.el.style.left="".concat(b,"px"),this.el.style.top="".concat(w,"px")}this.settings.showWhitespaceAtEdges||(a>m?a=m:a<v&&(a=v),l>g?l=g:l<f&&(l=f)),this.imgEl.style.transform="translate(".concat(a,"px, ").concat(l,"px)"),this.imgEl.style.webkitTransform="translate(".concat(a,"px, ").concat(l,"px)")}},{key:"_removeListenersAndResetClasses",value:function(){this.el.removeEventListener("animationend",this._completeShow,!1),this.el.removeEventListener("animationend",this._completeHide,!1),this.el.removeEventListener("webkitAnimationEnd",this._completeShow,!1),this.el.removeEventListener("webkitAnimationEnd",this._completeHide,!1),a(this.el,this.openClasses),a(this.el,this.closingClasses)}},{key:"show",value:function(e,t,i){this._removeListenersAndResetClasses(),this.isShowing=!0,h(this.el,this.openClasses),h(this.el,this.loadingClasses),this.imgEl.addEventListener("load",this._handleLoad,!1),this._setImageURL(e),this._setImageSize(t,i),this._isInline?this._showInline():this._showInContainer(),f&&(this.el.addEventListener("animationend",this._completeShow,!1),this.el.addEventListener("webkitAnimationEnd",this._completeShow,!1),h(this.el,this.openingClasses))}},{key:"_showInline",value:function(){this.settings.inlineContainer.appendChild(this.el),h(this.el,this.inlineClasses)}},{key:"_showInContainer",value:function(){this.settings.container.appendChild(this.el)}},{key:"hide",value:function(){this._removeListenersAndResetClasses(),this.isShowing=!1,f?(this.el.addEventListener("animationend",this._completeHide,!1),this.el.addEventListener("webkitAnimationEnd",this._completeHide,!1),h(this.el,this.closingClasses)):(a(this.el,this.openClasses),a(this.el,this.inlineClasses))}},{key:"_completeShow",value:function(){this.el.removeEventListener("animationend",this._completeShow,!1),this.el.removeEventListener("webkitAnimationEnd",this._completeShow,!1),a(this.el,this.openingClasses)}},{key:"_completeHide",value:function(){this.el.removeEventListener("animationend",this._completeHide,!1),this.el.removeEventListener("webkitAnimationEnd",this._completeHide,!1),a(this.el,this.openClasses),a(this.el,this.closingClasses),a(this.el,this.inlineClasses),this.el.setAttribute("style",""),this.el.parentElement===this.settings.container?this.settings.container.removeChild(this.el):this.el.parentElement===this.settings.inlineContainer&&this.settings.inlineContainer.removeChild(this.el)}},{key:"_handleLoad",value:function(){this.imgEl.removeEventListener("load",this._handleLoad,!1),a(this.el,this.loadingClasses)}},{key:"_isInline",get:function(){var e=this.settings.inline;return!0===e||"number"==typeof e&&window.innerWidth<=e}}])&&g(t.prototype,i),n&&g(t,n),e}();function y(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}i.d(t,"a",function(){return b});var b=function(){function e(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.VERSION="1.3.4",this.triggerEl=t,this.destroy=this.destroy.bind(this),!o(this.triggerEl))throw new TypeError("`new Drift` requires a DOM element as its first argument.");var n=i.namespace||null,s=i.showWhitespaceAtEdges||!1,h=i.containInline||!1,a=i.inlineOffsetX||0,r=i.inlineOffsetY||0,d=i.inlineContainer||document.body,c=i.sourceAttribute||"data-zoom",u=i.zoomFactor||3,m=void 0===i.paneContainer?document.body:i.paneContainer,g=i.inlinePane||375,v=!("handleTouch"in i)||!!i.handleTouch,f=i.onShow||null,p=i.onHide||null,y=!("injectBaseStyles"in i)||!!i.injectBaseStyles,b=i.hoverDelay||0,w=i.touchDelay||0,_=i.hoverBoundingBox||!1,E=i.touchBoundingBox||!1,C=i.boundingBoxContainer||document.body;if(!0!==g&&!o(m))throw new TypeError("`paneContainer` must be a DOM element when `inlinePane !== true`");if(!o(d))throw new TypeError("`inlineContainer` must be a DOM element");this.settings={namespace:n,showWhitespaceAtEdges:s,containInline:h,inlineOffsetX:a,inlineOffsetY:r,inlineContainer:d,sourceAttribute:c,zoomFactor:u,paneContainer:m,inlinePane:g,handleTouch:v,onShow:f,onHide:p,injectBaseStyles:y,hoverDelay:b,touchDelay:w,hoverBoundingBox:_,touchBoundingBox:E,boundingBoxContainer:C},this.settings.injectBaseStyles&&function(){if(!document.querySelector(".drift-base-styles")){var e=document.createElement("style");e.type="text/css",e.classList.add("drift-base-styles"),e.appendChild(document.createTextNode(l));var t=document.head;t.insertBefore(e,t.firstChild)}}(),this._buildZoomPane(),this._buildTrigger()}var t,i,n;return t=e,(i=[{key:"_buildZoomPane",value:function(){this.zoomPane=new p({container:this.settings.paneContainer,zoomFactor:this.settings.zoomFactor,showWhitespaceAtEdges:this.settings.showWhitespaceAtEdges,containInline:this.settings.containInline,inline:this.settings.inlinePane,namespace:this.settings.namespace,inlineOffsetX:this.settings.inlineOffsetX,inlineOffsetY:this.settings.inlineOffsetY,inlineContainer:this.settings.inlineContainer})}},{key:"_buildTrigger",value:function(){this.trigger=new m({el:this.triggerEl,zoomPane:this.zoomPane,handleTouch:this.settings.handleTouch,onShow:this.settings.onShow,onHide:this.settings.onHide,sourceAttribute:this.settings.sourceAttribute,hoverDelay:this.settings.hoverDelay,touchDelay:this.settings.touchDelay,hoverBoundingBox:this.settings.hoverBoundingBox,touchBoundingBox:this.settings.touchBoundingBox,namespace:this.settings.namespace,zoomFactor:this.settings.zoomFactor,boundingBoxContainer:this.settings.boundingBoxContainer})}},{key:"setZoomImageURL",value:function(e){this.zoomPane._setImageURL(e)}},{key:"disable",value:function(){this.trigger.enabled=!1}},{key:"enable",value:function(){this.trigger.enabled=!0}},{key:"destroy",value:function(){this.trigger._hide(),this.trigger._unbindEvents()}},{key:"isShowing",get:function(){return this.zoomPane.isShowing}},{key:"zoomFactor",get:function(){return this.settings.zoomFactor},set:function(e){this.settings.zoomFactor=e,this.zoomPane.settings.zoomFactor=e,this.trigger.settings.zoomFactor=e,this.boundingBox.settings.zoomFactor=e}}])&&y(t.prototype,i),n&&y(t,n),e}();Object.defineProperty(b.prototype,"isShowing",{get:function(){return this.isShowing}}),Object.defineProperty(b.prototype,"zoomFactor",{get:function(){return this.zoomFactor},set:function(e){this.zoomFactor=e}}),b.prototype.setZoomImageURL=b.prototype.setZoomImageURL,b.prototype.disable=b.prototype.disable,b.prototype.enable=b.prototype.enable,b.prototype.destroy=b.prototype.destroy}}]);