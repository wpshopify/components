(window.wpshopifyComponents=window.wpshopifyComponents||[]).push([[8],{334:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),c=a(0),l=a.n(c),r=a(302),s=a(8),i=a(301),p=a(56),u=a(27),O=a.n(u),d=a(9),E=a.n(d),f=a(5);function b(e){var t=e.variant,a=Object(c.useState)(!0),n=o()(a,2),u=n[0],d=n[1],b=Object(c.useRef)(!0),m=Object(c.useContext)(s.a),y=o()(m,2),v=(y[0],y[1],Object(c.useContext)(r.a)),T=o()(v,2),w=T[0],j=T[1],_=Object(c.useContext)(i.a),S=o()(_,2),C=S[0],D=S[1],N=Object(c.useContext)(p.a),L=o()(N,2),P=(L[0],L[1]);return Object(c.useEffect)(function(){if(b.current)b.current=!1;else{var e=Object(f.d)(w.option.name,t.value),a=O()(C.availableVariants,e);d(void 0!==a)}},[C.availableVariants]),Object(c.useEffect)(function(){b.current?b.current=!1:E()(C.selectedOptions)&&d(!0)},[C.selectedOptions]),l.a.createElement("li",{itemProp:"category",className:"wps-product-variant wps-product-style wps-modal-close-trigger",onClick:function(){var e=Object(f.d)(w.option.name,t.value);D({type:"UPDATE_SELECTED_OPTIONS",payload:e}),P({type:"TOGGLE_DROPDOWN",payload:!1}),j({type:"TOGGLE_DROPDOWN",payload:!1}),j({type:"SET_IS_OPTION_SELECTED",payload:!0}),j({type:"SET_SELECTED_OPTION",payload:e}),Object(f.f)()&&wp.hooks.doAction("on.product.variant.selection",e,w)},"data-wps-is-selectable":u},t.value)}var m=a(10);function y(){var e=Object(c.useRef)(!0),t=Object(c.useContext)(i.a),a=o()(t,2),n=(a[0],a[1]),s=Object(c.useContext)(r.a),u=o()(s,2),O=u[0],d=u[1],E=Object(c.useContext)(p.a),f=o()(E,2),y=(f[0],f[1]);return Object(m.c)(O.dropdownElement,function(){y({type:"TOGGLE_DROPDOWN",payload:!1}),d({type:"TOGGLE_DROPDOWN",payload:!1})},function(){return O.isDropdownOpen}),Object(c.useEffect)(function(){e.current?e.current=!1:n({type:"SET_AVAILABLE_VARIANTS",payload:O.selectedOption})},[O.selectedOption]),l.a.createElement("ul",{className:"wps-modal wps-variants","data-wps-modal-is-open":O.isDropdownOpen},O.option.values.map(function(e){return l.a.createElement(b,{key:e.value,variant:e})}))}var v=a(326),T=l.a.lazy(function(){return a.e(9).then(a.bind(null,330))});t.default=function(){var e=Object(c.useContext)(i.a),t=o()(e,2),a=t[0],n=t[1],s=Object(c.useContext)(r.a),u=o()(s,2),d=u[0],f=u[1],b=Object(c.useContext)(p.a),m=(o()(b,1)[0],Object(c.useRef)(!0));return Object(c.useEffect)(function(){m.current?m.current=!1:void 0===O()(a.availableVariants,d.selectedOption)&&(f({type:"SET_IS_OPTION_SELECTED",payload:!1}),n({type:"UNSET_SELECTED_OPTIONS",payload:d.option.name}))},[a.availableVariants]),Object(c.useEffect)(function(){m.current?m.current=!1:E()(a.selectedOptions)&&f({type:"SET_IS_OPTION_SELECTED",payload:!1})},[a.selectedOptions]),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"wps-btn-dropdown","data-wps-is-selected":d.isOptionSelected,ref:d.dropdownElement},l.a.createElement(v.a,{visible:d.isDropdownOpen,animateFill:!1,placement:"bottom",allowHTML:!0,appendTo:"parent",animation:"shift-away",flip:!1,theme:"light",interactive:!0,inertia:!0,delay:[0,0],content:l.a.createElement(y,null)},l.a.createElement("span",null,l.a.createElement(T,null)))))}}}]);