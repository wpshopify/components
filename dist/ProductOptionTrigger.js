(window.wpshopifyComponents=window.wpshopifyComponents||[]).push([[9],{330:function(e,t,n){"use strict";n.r(t);var o=n(1),i=n.n(o),s=n(0),a=n.n(s),c=n(301),p=n(37),r=n(5),u=n(8),d=n(6),O=n(302),f=n(56);t.default=function(){var e=Object(s.useContext)(u.a),t=i()(e,1)[0],n=Object(s.useContext)(d.a),o=i()(n,1)[0],l=Object(s.useContext)(c.a),w=i()(l,2),b=w[0],y=w[1],C=Object(s.useContext)(O.a),j=i()(C,2),m=j[0],S=j[1],g=Object(s.useContext)(f.a),h=i()(g,2),D=h[0],E=h[1],R=Object(s.useRef)(),v=Object(p.e)(p.c),x=Object(s.useRef)(!0);function G(){return m.isOptionSelected}function N(){return m.option.name}function T(){return N()+": "+(e=m.selectedOption,t=m.option,e[t.name]);var e,t}return Object(s.useEffect)(function(){t.isShopReady&&(x.current?x.current=!1:b.missingSelections&&(G()||(y({type:"SET_MISSING_SELECTIONS",payload:!1}),v(R.current))))},[b.missingSelections]),a.a.createElement("a",{href:"#!",className:"wps-btn wps-icon wps-icon-dropdown wps-modal-trigger","data-option":"","data-option-id":"","data-wps-is-ready":t.isShopReady?"1":"0",onClick:function(){Object(r.f)()&&wp.hooks.doAction("before.product.variantDropdown.toggle",m),S({type:"TOGGLE_DROPDOWN",payload:!m.isDropdownOpen}),E({type:"TOGGLE_DROPDOWN",payload:!D.isDropdownOpen})},ref:R,style:{backgroundColor:o.componentOptions.variantButtonColor}},G()?T():N())}}}]);