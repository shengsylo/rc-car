(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function bg(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Cg={exports:{}},ac={},Rg={exports:{}},Ze={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var da=Symbol.for("react.element"),Z_=Symbol.for("react.portal"),K_=Symbol.for("react.fragment"),Q_=Symbol.for("react.strict_mode"),J_=Symbol.for("react.profiler"),ex=Symbol.for("react.provider"),tx=Symbol.for("react.context"),nx=Symbol.for("react.forward_ref"),ix=Symbol.for("react.suspense"),rx=Symbol.for("react.memo"),sx=Symbol.for("react.lazy"),gh=Symbol.iterator;function ox(t){return t===null||typeof t!="object"?null:(t=gh&&t[gh]||t["@@iterator"],typeof t=="function"?t:null)}var Pg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Lg=Object.assign,Ng={};function Js(t,e,n){this.props=t,this.context=e,this.refs=Ng,this.updater=n||Pg}Js.prototype.isReactComponent={};Js.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Js.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Dg(){}Dg.prototype=Js.prototype;function rd(t,e,n){this.props=t,this.context=e,this.refs=Ng,this.updater=n||Pg}var sd=rd.prototype=new Dg;sd.constructor=rd;Lg(sd,Js.prototype);sd.isPureReactComponent=!0;var vh=Array.isArray,Ig=Object.prototype.hasOwnProperty,od={current:null},Ug={key:!0,ref:!0,__self:!0,__source:!0};function Og(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Ig.call(e,i)&&!Ug.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:da,type:t,key:s,ref:o,props:r,_owner:od.current}}function ax(t,e){return{$$typeof:da,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function ad(t){return typeof t=="object"&&t!==null&&t.$$typeof===da}function lx(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var _h=/\/+/g;function Oc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?lx(""+t.key):e.toString(36)}function gl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case da:case Z_:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Oc(o,0):i,vh(r)?(n="",t!=null&&(n=t.replace(_h,"$&/")+"/"),gl(r,e,n,"",function(c){return c})):r!=null&&(ad(r)&&(r=ax(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(_h,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",vh(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+Oc(s,a);o+=gl(s,e,n,l,r)}else if(l=ox(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+Oc(s,a++),o+=gl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ya(t,e,n){if(t==null)return t;var i=[],r=0;return gl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function cx(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var un={current:null},vl={transition:null},ux={ReactCurrentDispatcher:un,ReactCurrentBatchConfig:vl,ReactCurrentOwner:od};function Fg(){throw Error("act(...) is not supported in production builds of React.")}Ze.Children={map:ya,forEach:function(t,e,n){ya(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ya(t,function(){e++}),e},toArray:function(t){return ya(t,function(e){return e})||[]},only:function(t){if(!ad(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ze.Component=Js;Ze.Fragment=K_;Ze.Profiler=J_;Ze.PureComponent=rd;Ze.StrictMode=Q_;Ze.Suspense=ix;Ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ux;Ze.act=Fg;Ze.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Lg({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=od.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)Ig.call(e,l)&&!Ug.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:da,type:t.type,key:r,ref:s,props:i,_owner:o}};Ze.createContext=function(t){return t={$$typeof:tx,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:ex,_context:t},t.Consumer=t};Ze.createElement=Og;Ze.createFactory=function(t){var e=Og.bind(null,t);return e.type=t,e};Ze.createRef=function(){return{current:null}};Ze.forwardRef=function(t){return{$$typeof:nx,render:t}};Ze.isValidElement=ad;Ze.lazy=function(t){return{$$typeof:sx,_payload:{_status:-1,_result:t},_init:cx}};Ze.memo=function(t,e){return{$$typeof:rx,type:t,compare:e===void 0?null:e}};Ze.startTransition=function(t){var e=vl.transition;vl.transition={};try{t()}finally{vl.transition=e}};Ze.unstable_act=Fg;Ze.useCallback=function(t,e){return un.current.useCallback(t,e)};Ze.useContext=function(t){return un.current.useContext(t)};Ze.useDebugValue=function(){};Ze.useDeferredValue=function(t){return un.current.useDeferredValue(t)};Ze.useEffect=function(t,e){return un.current.useEffect(t,e)};Ze.useId=function(){return un.current.useId()};Ze.useImperativeHandle=function(t,e,n){return un.current.useImperativeHandle(t,e,n)};Ze.useInsertionEffect=function(t,e){return un.current.useInsertionEffect(t,e)};Ze.useLayoutEffect=function(t,e){return un.current.useLayoutEffect(t,e)};Ze.useMemo=function(t,e){return un.current.useMemo(t,e)};Ze.useReducer=function(t,e,n){return un.current.useReducer(t,e,n)};Ze.useRef=function(t){return un.current.useRef(t)};Ze.useState=function(t){return un.current.useState(t)};Ze.useSyncExternalStore=function(t,e,n){return un.current.useSyncExternalStore(t,e,n)};Ze.useTransition=function(){return un.current.useTransition()};Ze.version="18.3.1";Rg.exports=Ze;var Oe=Rg.exports;const fx=bg(Oe);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dx=Oe,hx=Symbol.for("react.element"),px=Symbol.for("react.fragment"),mx=Object.prototype.hasOwnProperty,gx=dx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,vx={key:!0,ref:!0,__self:!0,__source:!0};function zg(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)mx.call(e,i)&&!vx.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:hx,type:t,key:s,ref:o,props:r,_owner:gx.current}}ac.Fragment=px;ac.jsx=zg;ac.jsxs=zg;Cg.exports=ac;var S=Cg.exports,kg={exports:{}},bn={},Bg={exports:{}},Hg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(O,F){var G=O.length;O.push(F);e:for(;0<G;){var q=G-1>>>1,X=O[q];if(0<r(X,F))O[q]=F,O[G]=X,G=q;else break e}}function n(O){return O.length===0?null:O[0]}function i(O){if(O.length===0)return null;var F=O[0],G=O.pop();if(G!==F){O[0]=G;e:for(var q=0,X=O.length,j=X>>>1;q<j;){var K=2*(q+1)-1,fe=O[K],Me=K+1,ye=O[Me];if(0>r(fe,G))Me<X&&0>r(ye,fe)?(O[q]=ye,O[Me]=G,q=Me):(O[q]=fe,O[K]=G,q=K);else if(Me<X&&0>r(ye,G))O[q]=ye,O[Me]=G,q=Me;else break e}}return F}function r(O,F){var G=O.sortIndex-F.sortIndex;return G!==0?G:O.id-F.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],u=1,f=null,h=3,p=!1,m=!1,x=!1,g=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(O){for(var F=n(c);F!==null;){if(F.callback===null)i(c);else if(F.startTime<=O)i(c),F.sortIndex=F.expirationTime,e(l,F);else break;F=n(c)}}function y(O){if(x=!1,v(O),!m)if(n(l)!==null)m=!0,H(C);else{var F=n(c);F!==null&&W(y,F.startTime-O)}}function C(O,F){m=!1,x&&(x=!1,d(D),D=-1),p=!0;var G=h;try{for(v(F),f=n(l);f!==null&&(!(f.expirationTime>F)||O&&!z());){var q=f.callback;if(typeof q=="function"){f.callback=null,h=f.priorityLevel;var X=q(f.expirationTime<=F);F=t.unstable_now(),typeof X=="function"?f.callback=X:f===n(l)&&i(l),v(F)}else i(l);f=n(l)}if(f!==null)var j=!0;else{var K=n(c);K!==null&&W(y,K.startTime-F),j=!1}return j}finally{f=null,h=G,p=!1}}var T=!1,A=null,D=-1,M=5,w=-1;function z(){return!(t.unstable_now()-w<M)}function V(){if(A!==null){var O=t.unstable_now();w=O;var F=!0;try{F=A(!0,O)}finally{F?N():(T=!1,A=null)}}else T=!1}var N;if(typeof _=="function")N=function(){_(V)};else if(typeof MessageChannel<"u"){var R=new MessageChannel,U=R.port2;R.port1.onmessage=V,N=function(){U.postMessage(null)}}else N=function(){g(V,0)};function H(O){A=O,T||(T=!0,N())}function W(O,F){D=g(function(){O(t.unstable_now())},F)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(O){O.callback=null},t.unstable_continueExecution=function(){m||p||(m=!0,H(C))},t.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<O?Math.floor(1e3/O):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(O){switch(h){case 1:case 2:case 3:var F=3;break;default:F=h}var G=h;h=F;try{return O()}finally{h=G}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(O,F){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var G=h;h=O;try{return F()}finally{h=G}},t.unstable_scheduleCallback=function(O,F,G){var q=t.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?q+G:q):G=q,O){case 1:var X=-1;break;case 2:X=250;break;case 5:X=1073741823;break;case 4:X=1e4;break;default:X=5e3}return X=G+X,O={id:u++,callback:F,priorityLevel:O,startTime:G,expirationTime:X,sortIndex:-1},G>q?(O.sortIndex=G,e(c,O),n(l)===null&&O===n(c)&&(x?(d(D),D=-1):x=!0,W(y,G-q))):(O.sortIndex=X,e(l,O),m||p||(m=!0,H(C))),O},t.unstable_shouldYield=z,t.unstable_wrapCallback=function(O){var F=h;return function(){var G=h;h=F;try{return O.apply(this,arguments)}finally{h=G}}}})(Hg);Bg.exports=Hg;var _x=Bg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xx=Oe,An=_x;function ae(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Gg=new Set,Vo={};function Yr(t,e){Bs(t,e),Bs(t+"Capture",e)}function Bs(t,e){for(Vo[t]=e,t=0;t<e.length;t++)Gg.add(e[t])}var Ti=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Zu=Object.prototype.hasOwnProperty,yx=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,xh={},yh={};function Sx(t){return Zu.call(yh,t)?!0:Zu.call(xh,t)?!1:yx.test(t)?yh[t]=!0:(xh[t]=!0,!1)}function Mx(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Ex(t,e,n,i){if(e===null||typeof e>"u"||Mx(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function fn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var $t={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){$t[t]=new fn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];$t[e]=new fn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){$t[t]=new fn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){$t[t]=new fn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){$t[t]=new fn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){$t[t]=new fn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){$t[t]=new fn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){$t[t]=new fn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){$t[t]=new fn(t,5,!1,t.toLowerCase(),null,!1,!1)});var ld=/[\-:]([a-z])/g;function cd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(ld,cd);$t[e]=new fn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(ld,cd);$t[e]=new fn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(ld,cd);$t[e]=new fn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){$t[t]=new fn(t,1,!1,t.toLowerCase(),null,!1,!1)});$t.xlinkHref=new fn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){$t[t]=new fn(t,1,!1,t.toLowerCase(),null,!0,!0)});function ud(t,e,n,i){var r=$t.hasOwnProperty(e)?$t[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Ex(e,n,r,i)&&(n=null),i||r===null?Sx(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Li=xx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Sa=Symbol.for("react.element"),gs=Symbol.for("react.portal"),vs=Symbol.for("react.fragment"),fd=Symbol.for("react.strict_mode"),Ku=Symbol.for("react.profiler"),Vg=Symbol.for("react.provider"),Wg=Symbol.for("react.context"),dd=Symbol.for("react.forward_ref"),Qu=Symbol.for("react.suspense"),Ju=Symbol.for("react.suspense_list"),hd=Symbol.for("react.memo"),Hi=Symbol.for("react.lazy"),jg=Symbol.for("react.offscreen"),Sh=Symbol.iterator;function oo(t){return t===null||typeof t!="object"?null:(t=Sh&&t[Sh]||t["@@iterator"],typeof t=="function"?t:null)}var St=Object.assign,Fc;function Mo(t){if(Fc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Fc=e&&e[1]||""}return`
`+Fc+t}var zc=!1;function kc(t,e){if(!t||zc)return"";zc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{zc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Mo(t):""}function wx(t){switch(t.tag){case 5:return Mo(t.type);case 16:return Mo("Lazy");case 13:return Mo("Suspense");case 19:return Mo("SuspenseList");case 0:case 2:case 15:return t=kc(t.type,!1),t;case 11:return t=kc(t.type.render,!1),t;case 1:return t=kc(t.type,!0),t;default:return""}}function ef(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case vs:return"Fragment";case gs:return"Portal";case Ku:return"Profiler";case fd:return"StrictMode";case Qu:return"Suspense";case Ju:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Wg:return(t.displayName||"Context")+".Consumer";case Vg:return(t._context.displayName||"Context")+".Provider";case dd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case hd:return e=t.displayName||null,e!==null?e:ef(t.type)||"Memo";case Hi:e=t._payload,t=t._init;try{return ef(t(e))}catch{}}return null}function Tx(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ef(e);case 8:return e===fd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function lr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Xg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Ax(t){var e=Xg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ma(t){t._valueTracker||(t._valueTracker=Ax(t))}function Yg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Xg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Pl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function tf(t,e){var n=e.checked;return St({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Mh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=lr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function $g(t,e){e=e.checked,e!=null&&ud(t,"checked",e,!1)}function nf(t,e){$g(t,e);var n=lr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?rf(t,e.type,n):e.hasOwnProperty("defaultValue")&&rf(t,e.type,lr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Eh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function rf(t,e,n){(e!=="number"||Pl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Eo=Array.isArray;function Ns(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+lr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function sf(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ae(91));return St({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function wh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ae(92));if(Eo(n)){if(1<n.length)throw Error(ae(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:lr(n)}}function qg(t,e){var n=lr(e.value),i=lr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Th(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Zg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function of(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Zg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ea,Kg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ea=Ea||document.createElement("div"),Ea.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ea.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Wo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Co={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},bx=["Webkit","ms","Moz","O"];Object.keys(Co).forEach(function(t){bx.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Co[e]=Co[t]})});function Qg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Co.hasOwnProperty(t)&&Co[t]?(""+e).trim():e+"px"}function Jg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Qg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var Cx=St({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function af(t,e){if(e){if(Cx[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ae(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ae(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ae(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ae(62))}}function lf(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var cf=null;function pd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var uf=null,Ds=null,Is=null;function Ah(t){if(t=ma(t)){if(typeof uf!="function")throw Error(ae(280));var e=t.stateNode;e&&(e=dc(e),uf(t.stateNode,t.type,e))}}function e0(t){Ds?Is?Is.push(t):Is=[t]:Ds=t}function t0(){if(Ds){var t=Ds,e=Is;if(Is=Ds=null,Ah(t),e)for(t=0;t<e.length;t++)Ah(e[t])}}function n0(t,e){return t(e)}function i0(){}var Bc=!1;function r0(t,e,n){if(Bc)return t(e,n);Bc=!0;try{return n0(t,e,n)}finally{Bc=!1,(Ds!==null||Is!==null)&&(i0(),t0())}}function jo(t,e){var n=t.stateNode;if(n===null)return null;var i=dc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ae(231,e,typeof n));return n}var ff=!1;if(Ti)try{var ao={};Object.defineProperty(ao,"passive",{get:function(){ff=!0}}),window.addEventListener("test",ao,ao),window.removeEventListener("test",ao,ao)}catch{ff=!1}function Rx(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var Ro=!1,Ll=null,Nl=!1,df=null,Px={onError:function(t){Ro=!0,Ll=t}};function Lx(t,e,n,i,r,s,o,a,l){Ro=!1,Ll=null,Rx.apply(Px,arguments)}function Nx(t,e,n,i,r,s,o,a,l){if(Lx.apply(this,arguments),Ro){if(Ro){var c=Ll;Ro=!1,Ll=null}else throw Error(ae(198));Nl||(Nl=!0,df=c)}}function $r(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function s0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function bh(t){if($r(t)!==t)throw Error(ae(188))}function Dx(t){var e=t.alternate;if(!e){if(e=$r(t),e===null)throw Error(ae(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return bh(r),t;if(s===i)return bh(r),e;s=s.sibling}throw Error(ae(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(ae(189))}}if(n.alternate!==i)throw Error(ae(190))}if(n.tag!==3)throw Error(ae(188));return n.stateNode.current===n?t:e}function o0(t){return t=Dx(t),t!==null?a0(t):null}function a0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=a0(t);if(e!==null)return e;t=t.sibling}return null}var l0=An.unstable_scheduleCallback,Ch=An.unstable_cancelCallback,Ix=An.unstable_shouldYield,Ux=An.unstable_requestPaint,At=An.unstable_now,Ox=An.unstable_getCurrentPriorityLevel,md=An.unstable_ImmediatePriority,c0=An.unstable_UserBlockingPriority,Dl=An.unstable_NormalPriority,Fx=An.unstable_LowPriority,u0=An.unstable_IdlePriority,lc=null,oi=null;function zx(t){if(oi&&typeof oi.onCommitFiberRoot=="function")try{oi.onCommitFiberRoot(lc,t,void 0,(t.current.flags&128)===128)}catch{}}var Kn=Math.clz32?Math.clz32:Hx,kx=Math.log,Bx=Math.LN2;function Hx(t){return t>>>=0,t===0?32:31-(kx(t)/Bx|0)|0}var wa=64,Ta=4194304;function wo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Il(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=wo(a):(s&=o,s!==0&&(i=wo(s)))}else o=n&~r,o!==0?i=wo(o):s!==0&&(i=wo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Kn(e),r=1<<n,i|=t[n],e&=~r;return i}function Gx(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Vx(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Kn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=Gx(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function hf(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function f0(){var t=wa;return wa<<=1,!(wa&4194240)&&(wa=64),t}function Hc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ha(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Kn(e),t[e]=n}function Wx(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Kn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function gd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Kn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var rt=0;function d0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var h0,vd,p0,m0,g0,pf=!1,Aa=[],Ki=null,Qi=null,Ji=null,Xo=new Map,Yo=new Map,Wi=[],jx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Rh(t,e){switch(t){case"focusin":case"focusout":Ki=null;break;case"dragenter":case"dragleave":Qi=null;break;case"mouseover":case"mouseout":Ji=null;break;case"pointerover":case"pointerout":Xo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Yo.delete(e.pointerId)}}function lo(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=ma(e),e!==null&&vd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Xx(t,e,n,i,r){switch(e){case"focusin":return Ki=lo(Ki,t,e,n,i,r),!0;case"dragenter":return Qi=lo(Qi,t,e,n,i,r),!0;case"mouseover":return Ji=lo(Ji,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Xo.set(s,lo(Xo.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Yo.set(s,lo(Yo.get(s)||null,t,e,n,i,r)),!0}return!1}function v0(t){var e=Rr(t.target);if(e!==null){var n=$r(e);if(n!==null){if(e=n.tag,e===13){if(e=s0(n),e!==null){t.blockedOn=e,g0(t.priority,function(){p0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function _l(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=mf(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);cf=i,n.target.dispatchEvent(i),cf=null}else return e=ma(n),e!==null&&vd(e),t.blockedOn=n,!1;e.shift()}return!0}function Ph(t,e,n){_l(t)&&n.delete(e)}function Yx(){pf=!1,Ki!==null&&_l(Ki)&&(Ki=null),Qi!==null&&_l(Qi)&&(Qi=null),Ji!==null&&_l(Ji)&&(Ji=null),Xo.forEach(Ph),Yo.forEach(Ph)}function co(t,e){t.blockedOn===e&&(t.blockedOn=null,pf||(pf=!0,An.unstable_scheduleCallback(An.unstable_NormalPriority,Yx)))}function $o(t){function e(r){return co(r,t)}if(0<Aa.length){co(Aa[0],t);for(var n=1;n<Aa.length;n++){var i=Aa[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Ki!==null&&co(Ki,t),Qi!==null&&co(Qi,t),Ji!==null&&co(Ji,t),Xo.forEach(e),Yo.forEach(e),n=0;n<Wi.length;n++)i=Wi[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Wi.length&&(n=Wi[0],n.blockedOn===null);)v0(n),n.blockedOn===null&&Wi.shift()}var Us=Li.ReactCurrentBatchConfig,Ul=!0;function $x(t,e,n,i){var r=rt,s=Us.transition;Us.transition=null;try{rt=1,_d(t,e,n,i)}finally{rt=r,Us.transition=s}}function qx(t,e,n,i){var r=rt,s=Us.transition;Us.transition=null;try{rt=4,_d(t,e,n,i)}finally{rt=r,Us.transition=s}}function _d(t,e,n,i){if(Ul){var r=mf(t,e,n,i);if(r===null)Kc(t,e,i,Ol,n),Rh(t,i);else if(Xx(r,t,e,n,i))i.stopPropagation();else if(Rh(t,i),e&4&&-1<jx.indexOf(t)){for(;r!==null;){var s=ma(r);if(s!==null&&h0(s),s=mf(t,e,n,i),s===null&&Kc(t,e,i,Ol,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Kc(t,e,i,null,n)}}var Ol=null;function mf(t,e,n,i){if(Ol=null,t=pd(i),t=Rr(t),t!==null)if(e=$r(t),e===null)t=null;else if(n=e.tag,n===13){if(t=s0(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Ol=t,null}function _0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ox()){case md:return 1;case c0:return 4;case Dl:case Fx:return 16;case u0:return 536870912;default:return 16}default:return 16}}var Xi=null,xd=null,xl=null;function x0(){if(xl)return xl;var t,e=xd,n=e.length,i,r="value"in Xi?Xi.value:Xi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return xl=r.slice(t,1<i?1-i:void 0)}function yl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ba(){return!0}function Lh(){return!1}function Cn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ba:Lh,this.isPropagationStopped=Lh,this}return St(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ba)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ba)},persist:function(){},isPersistent:ba}),e}var eo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},yd=Cn(eo),pa=St({},eo,{view:0,detail:0}),Zx=Cn(pa),Gc,Vc,uo,cc=St({},pa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Sd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==uo&&(uo&&t.type==="mousemove"?(Gc=t.screenX-uo.screenX,Vc=t.screenY-uo.screenY):Vc=Gc=0,uo=t),Gc)},movementY:function(t){return"movementY"in t?t.movementY:Vc}}),Nh=Cn(cc),Kx=St({},cc,{dataTransfer:0}),Qx=Cn(Kx),Jx=St({},pa,{relatedTarget:0}),Wc=Cn(Jx),ey=St({},eo,{animationName:0,elapsedTime:0,pseudoElement:0}),ty=Cn(ey),ny=St({},eo,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),iy=Cn(ny),ry=St({},eo,{data:0}),Dh=Cn(ry),sy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},oy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ay={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ly(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=ay[t])?!!e[t]:!1}function Sd(){return ly}var cy=St({},pa,{key:function(t){if(t.key){var e=sy[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=yl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?oy[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Sd,charCode:function(t){return t.type==="keypress"?yl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?yl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),uy=Cn(cy),fy=St({},cc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ih=Cn(fy),dy=St({},pa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Sd}),hy=Cn(dy),py=St({},eo,{propertyName:0,elapsedTime:0,pseudoElement:0}),my=Cn(py),gy=St({},cc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),vy=Cn(gy),_y=[9,13,27,32],Md=Ti&&"CompositionEvent"in window,Po=null;Ti&&"documentMode"in document&&(Po=document.documentMode);var xy=Ti&&"TextEvent"in window&&!Po,y0=Ti&&(!Md||Po&&8<Po&&11>=Po),Uh=" ",Oh=!1;function S0(t,e){switch(t){case"keyup":return _y.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function M0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var _s=!1;function yy(t,e){switch(t){case"compositionend":return M0(e);case"keypress":return e.which!==32?null:(Oh=!0,Uh);case"textInput":return t=e.data,t===Uh&&Oh?null:t;default:return null}}function Sy(t,e){if(_s)return t==="compositionend"||!Md&&S0(t,e)?(t=x0(),xl=xd=Xi=null,_s=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return y0&&e.locale!=="ko"?null:e.data;default:return null}}var My={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Fh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!My[t.type]:e==="textarea"}function E0(t,e,n,i){e0(i),e=Fl(e,"onChange"),0<e.length&&(n=new yd("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Lo=null,qo=null;function Ey(t){I0(t,0)}function uc(t){var e=Ss(t);if(Yg(e))return t}function wy(t,e){if(t==="change")return e}var w0=!1;if(Ti){var jc;if(Ti){var Xc="oninput"in document;if(!Xc){var zh=document.createElement("div");zh.setAttribute("oninput","return;"),Xc=typeof zh.oninput=="function"}jc=Xc}else jc=!1;w0=jc&&(!document.documentMode||9<document.documentMode)}function kh(){Lo&&(Lo.detachEvent("onpropertychange",T0),qo=Lo=null)}function T0(t){if(t.propertyName==="value"&&uc(qo)){var e=[];E0(e,qo,t,pd(t)),r0(Ey,e)}}function Ty(t,e,n){t==="focusin"?(kh(),Lo=e,qo=n,Lo.attachEvent("onpropertychange",T0)):t==="focusout"&&kh()}function Ay(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return uc(qo)}function by(t,e){if(t==="click")return uc(e)}function Cy(t,e){if(t==="input"||t==="change")return uc(e)}function Ry(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Jn=typeof Object.is=="function"?Object.is:Ry;function Zo(t,e){if(Jn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Zu.call(e,r)||!Jn(t[r],e[r]))return!1}return!0}function Bh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Hh(t,e){var n=Bh(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Bh(n)}}function A0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?A0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function b0(){for(var t=window,e=Pl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Pl(t.document)}return e}function Ed(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Py(t){var e=b0(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&A0(n.ownerDocument.documentElement,n)){if(i!==null&&Ed(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Hh(n,s);var o=Hh(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Ly=Ti&&"documentMode"in document&&11>=document.documentMode,xs=null,gf=null,No=null,vf=!1;function Gh(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;vf||xs==null||xs!==Pl(i)||(i=xs,"selectionStart"in i&&Ed(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),No&&Zo(No,i)||(No=i,i=Fl(gf,"onSelect"),0<i.length&&(e=new yd("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=xs)))}function Ca(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ys={animationend:Ca("Animation","AnimationEnd"),animationiteration:Ca("Animation","AnimationIteration"),animationstart:Ca("Animation","AnimationStart"),transitionend:Ca("Transition","TransitionEnd")},Yc={},C0={};Ti&&(C0=document.createElement("div").style,"AnimationEvent"in window||(delete ys.animationend.animation,delete ys.animationiteration.animation,delete ys.animationstart.animation),"TransitionEvent"in window||delete ys.transitionend.transition);function fc(t){if(Yc[t])return Yc[t];if(!ys[t])return t;var e=ys[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in C0)return Yc[t]=e[n];return t}var R0=fc("animationend"),P0=fc("animationiteration"),L0=fc("animationstart"),N0=fc("transitionend"),D0=new Map,Vh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function dr(t,e){D0.set(t,e),Yr(e,[t])}for(var $c=0;$c<Vh.length;$c++){var qc=Vh[$c],Ny=qc.toLowerCase(),Dy=qc[0].toUpperCase()+qc.slice(1);dr(Ny,"on"+Dy)}dr(R0,"onAnimationEnd");dr(P0,"onAnimationIteration");dr(L0,"onAnimationStart");dr("dblclick","onDoubleClick");dr("focusin","onFocus");dr("focusout","onBlur");dr(N0,"onTransitionEnd");Bs("onMouseEnter",["mouseout","mouseover"]);Bs("onMouseLeave",["mouseout","mouseover"]);Bs("onPointerEnter",["pointerout","pointerover"]);Bs("onPointerLeave",["pointerout","pointerover"]);Yr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Yr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Yr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Yr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var To="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Iy=new Set("cancel close invalid load scroll toggle".split(" ").concat(To));function Wh(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,Nx(i,e,void 0,t),t.currentTarget=null}function I0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;Wh(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;Wh(r,a,c),s=l}}}if(Nl)throw t=df,Nl=!1,df=null,t}function ut(t,e){var n=e[Mf];n===void 0&&(n=e[Mf]=new Set);var i=t+"__bubble";n.has(i)||(U0(e,t,2,!1),n.add(i))}function Zc(t,e,n){var i=0;e&&(i|=4),U0(n,t,i,e)}var Ra="_reactListening"+Math.random().toString(36).slice(2);function Ko(t){if(!t[Ra]){t[Ra]=!0,Gg.forEach(function(n){n!=="selectionchange"&&(Iy.has(n)||Zc(n,!1,t),Zc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ra]||(e[Ra]=!0,Zc("selectionchange",!1,e))}}function U0(t,e,n,i){switch(_0(e)){case 1:var r=$x;break;case 4:r=qx;break;default:r=_d}n=r.bind(null,e,n,t),r=void 0,!ff||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Kc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Rr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}r0(function(){var c=s,u=pd(n),f=[];e:{var h=D0.get(t);if(h!==void 0){var p=yd,m=t;switch(t){case"keypress":if(yl(n)===0)break e;case"keydown":case"keyup":p=uy;break;case"focusin":m="focus",p=Wc;break;case"focusout":m="blur",p=Wc;break;case"beforeblur":case"afterblur":p=Wc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Nh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Qx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=hy;break;case R0:case P0:case L0:p=ty;break;case N0:p=my;break;case"scroll":p=Zx;break;case"wheel":p=vy;break;case"copy":case"cut":case"paste":p=iy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Ih}var x=(e&4)!==0,g=!x&&t==="scroll",d=x?h!==null?h+"Capture":null:h;x=[];for(var _=c,v;_!==null;){v=_;var y=v.stateNode;if(v.tag===5&&y!==null&&(v=y,d!==null&&(y=jo(_,d),y!=null&&x.push(Qo(_,y,v)))),g)break;_=_.return}0<x.length&&(h=new p(h,m,null,n,u),f.push({event:h,listeners:x}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",h&&n!==cf&&(m=n.relatedTarget||n.fromElement)&&(Rr(m)||m[Ai]))break e;if((p||h)&&(h=u.window===u?u:(h=u.ownerDocument)?h.defaultView||h.parentWindow:window,p?(m=n.relatedTarget||n.toElement,p=c,m=m?Rr(m):null,m!==null&&(g=$r(m),m!==g||m.tag!==5&&m.tag!==6)&&(m=null)):(p=null,m=c),p!==m)){if(x=Nh,y="onMouseLeave",d="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(x=Ih,y="onPointerLeave",d="onPointerEnter",_="pointer"),g=p==null?h:Ss(p),v=m==null?h:Ss(m),h=new x(y,_+"leave",p,n,u),h.target=g,h.relatedTarget=v,y=null,Rr(u)===c&&(x=new x(d,_+"enter",m,n,u),x.target=v,x.relatedTarget=g,y=x),g=y,p&&m)t:{for(x=p,d=m,_=0,v=x;v;v=Kr(v))_++;for(v=0,y=d;y;y=Kr(y))v++;for(;0<_-v;)x=Kr(x),_--;for(;0<v-_;)d=Kr(d),v--;for(;_--;){if(x===d||d!==null&&x===d.alternate)break t;x=Kr(x),d=Kr(d)}x=null}else x=null;p!==null&&jh(f,h,p,x,!1),m!==null&&g!==null&&jh(f,g,m,x,!0)}}e:{if(h=c?Ss(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var C=wy;else if(Fh(h))if(w0)C=Cy;else{C=Ay;var T=Ty}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(C=by);if(C&&(C=C(t,c))){E0(f,C,n,u);break e}T&&T(t,h,c),t==="focusout"&&(T=h._wrapperState)&&T.controlled&&h.type==="number"&&rf(h,"number",h.value)}switch(T=c?Ss(c):window,t){case"focusin":(Fh(T)||T.contentEditable==="true")&&(xs=T,gf=c,No=null);break;case"focusout":No=gf=xs=null;break;case"mousedown":vf=!0;break;case"contextmenu":case"mouseup":case"dragend":vf=!1,Gh(f,n,u);break;case"selectionchange":if(Ly)break;case"keydown":case"keyup":Gh(f,n,u)}var A;if(Md)e:{switch(t){case"compositionstart":var D="onCompositionStart";break e;case"compositionend":D="onCompositionEnd";break e;case"compositionupdate":D="onCompositionUpdate";break e}D=void 0}else _s?S0(t,n)&&(D="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(D="onCompositionStart");D&&(y0&&n.locale!=="ko"&&(_s||D!=="onCompositionStart"?D==="onCompositionEnd"&&_s&&(A=x0()):(Xi=u,xd="value"in Xi?Xi.value:Xi.textContent,_s=!0)),T=Fl(c,D),0<T.length&&(D=new Dh(D,t,null,n,u),f.push({event:D,listeners:T}),A?D.data=A:(A=M0(n),A!==null&&(D.data=A)))),(A=xy?yy(t,n):Sy(t,n))&&(c=Fl(c,"onBeforeInput"),0<c.length&&(u=new Dh("onBeforeInput","beforeinput",null,n,u),f.push({event:u,listeners:c}),u.data=A))}I0(f,e)})}function Qo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Fl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=jo(t,n),s!=null&&i.unshift(Qo(t,s,r)),s=jo(t,e),s!=null&&i.push(Qo(t,s,r))),t=t.return}return i}function Kr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function jh(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=jo(n,s),l!=null&&o.unshift(Qo(n,l,a))):r||(l=jo(n,s),l!=null&&o.push(Qo(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Uy=/\r\n?/g,Oy=/\u0000|\uFFFD/g;function Xh(t){return(typeof t=="string"?t:""+t).replace(Uy,`
`).replace(Oy,"")}function Pa(t,e,n){if(e=Xh(e),Xh(t)!==e&&n)throw Error(ae(425))}function zl(){}var _f=null,xf=null;function yf(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Sf=typeof setTimeout=="function"?setTimeout:void 0,Fy=typeof clearTimeout=="function"?clearTimeout:void 0,Yh=typeof Promise=="function"?Promise:void 0,zy=typeof queueMicrotask=="function"?queueMicrotask:typeof Yh<"u"?function(t){return Yh.resolve(null).then(t).catch(ky)}:Sf;function ky(t){setTimeout(function(){throw t})}function Qc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),$o(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);$o(e)}function er(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function $h(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var to=Math.random().toString(36).slice(2),si="__reactFiber$"+to,Jo="__reactProps$"+to,Ai="__reactContainer$"+to,Mf="__reactEvents$"+to,By="__reactListeners$"+to,Hy="__reactHandles$"+to;function Rr(t){var e=t[si];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ai]||n[si]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=$h(t);t!==null;){if(n=t[si])return n;t=$h(t)}return e}t=n,n=t.parentNode}return null}function ma(t){return t=t[si]||t[Ai],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Ss(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ae(33))}function dc(t){return t[Jo]||null}var Ef=[],Ms=-1;function hr(t){return{current:t}}function ht(t){0>Ms||(t.current=Ef[Ms],Ef[Ms]=null,Ms--)}function ct(t,e){Ms++,Ef[Ms]=t.current,t.current=e}var cr={},nn=hr(cr),mn=hr(!1),zr=cr;function Hs(t,e){var n=t.type.contextTypes;if(!n)return cr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function gn(t){return t=t.childContextTypes,t!=null}function kl(){ht(mn),ht(nn)}function qh(t,e,n){if(nn.current!==cr)throw Error(ae(168));ct(nn,e),ct(mn,n)}function O0(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ae(108,Tx(t)||"Unknown",r));return St({},n,i)}function Bl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||cr,zr=nn.current,ct(nn,t),ct(mn,mn.current),!0}function Zh(t,e,n){var i=t.stateNode;if(!i)throw Error(ae(169));n?(t=O0(t,e,zr),i.__reactInternalMemoizedMergedChildContext=t,ht(mn),ht(nn),ct(nn,t)):ht(mn),ct(mn,n)}var xi=null,hc=!1,Jc=!1;function F0(t){xi===null?xi=[t]:xi.push(t)}function Gy(t){hc=!0,F0(t)}function pr(){if(!Jc&&xi!==null){Jc=!0;var t=0,e=rt;try{var n=xi;for(rt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}xi=null,hc=!1}catch(r){throw xi!==null&&(xi=xi.slice(t+1)),l0(md,pr),r}finally{rt=e,Jc=!1}}return null}var Es=[],ws=0,Hl=null,Gl=0,Ln=[],Nn=0,kr=null,Si=1,Mi="";function Mr(t,e){Es[ws++]=Gl,Es[ws++]=Hl,Hl=t,Gl=e}function z0(t,e,n){Ln[Nn++]=Si,Ln[Nn++]=Mi,Ln[Nn++]=kr,kr=t;var i=Si;t=Mi;var r=32-Kn(i)-1;i&=~(1<<r),n+=1;var s=32-Kn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Si=1<<32-Kn(e)+r|n<<r|i,Mi=s+t}else Si=1<<s|n<<r|i,Mi=t}function wd(t){t.return!==null&&(Mr(t,1),z0(t,1,0))}function Td(t){for(;t===Hl;)Hl=Es[--ws],Es[ws]=null,Gl=Es[--ws],Es[ws]=null;for(;t===kr;)kr=Ln[--Nn],Ln[Nn]=null,Mi=Ln[--Nn],Ln[Nn]=null,Si=Ln[--Nn],Ln[Nn]=null}var wn=null,En=null,gt=!1,$n=null;function k0(t,e){var n=zn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Kh(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,wn=t,En=er(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,wn=t,En=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=kr!==null?{id:Si,overflow:Mi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=zn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,wn=t,En=null,!0):!1;default:return!1}}function wf(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Tf(t){if(gt){var e=En;if(e){var n=e;if(!Kh(t,e)){if(wf(t))throw Error(ae(418));e=er(n.nextSibling);var i=wn;e&&Kh(t,e)?k0(i,n):(t.flags=t.flags&-4097|2,gt=!1,wn=t)}}else{if(wf(t))throw Error(ae(418));t.flags=t.flags&-4097|2,gt=!1,wn=t}}}function Qh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;wn=t}function La(t){if(t!==wn)return!1;if(!gt)return Qh(t),gt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!yf(t.type,t.memoizedProps)),e&&(e=En)){if(wf(t))throw B0(),Error(ae(418));for(;e;)k0(t,e),e=er(e.nextSibling)}if(Qh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ae(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){En=er(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}En=null}}else En=wn?er(t.stateNode.nextSibling):null;return!0}function B0(){for(var t=En;t;)t=er(t.nextSibling)}function Gs(){En=wn=null,gt=!1}function Ad(t){$n===null?$n=[t]:$n.push(t)}var Vy=Li.ReactCurrentBatchConfig;function fo(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ae(309));var i=n.stateNode}if(!i)throw Error(ae(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(ae(284));if(!n._owner)throw Error(ae(290,t))}return t}function Na(t,e){throw t=Object.prototype.toString.call(e),Error(ae(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Jh(t){var e=t._init;return e(t._payload)}function H0(t){function e(d,_){if(t){var v=d.deletions;v===null?(d.deletions=[_],d.flags|=16):v.push(_)}}function n(d,_){if(!t)return null;for(;_!==null;)e(d,_),_=_.sibling;return null}function i(d,_){for(d=new Map;_!==null;)_.key!==null?d.set(_.key,_):d.set(_.index,_),_=_.sibling;return d}function r(d,_){return d=rr(d,_),d.index=0,d.sibling=null,d}function s(d,_,v){return d.index=v,t?(v=d.alternate,v!==null?(v=v.index,v<_?(d.flags|=2,_):v):(d.flags|=2,_)):(d.flags|=1048576,_)}function o(d){return t&&d.alternate===null&&(d.flags|=2),d}function a(d,_,v,y){return _===null||_.tag!==6?(_=ou(v,d.mode,y),_.return=d,_):(_=r(_,v),_.return=d,_)}function l(d,_,v,y){var C=v.type;return C===vs?u(d,_,v.props.children,y,v.key):_!==null&&(_.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Hi&&Jh(C)===_.type)?(y=r(_,v.props),y.ref=fo(d,_,v),y.return=d,y):(y=bl(v.type,v.key,v.props,null,d.mode,y),y.ref=fo(d,_,v),y.return=d,y)}function c(d,_,v,y){return _===null||_.tag!==4||_.stateNode.containerInfo!==v.containerInfo||_.stateNode.implementation!==v.implementation?(_=au(v,d.mode,y),_.return=d,_):(_=r(_,v.children||[]),_.return=d,_)}function u(d,_,v,y,C){return _===null||_.tag!==7?(_=Ir(v,d.mode,y,C),_.return=d,_):(_=r(_,v),_.return=d,_)}function f(d,_,v){if(typeof _=="string"&&_!==""||typeof _=="number")return _=ou(""+_,d.mode,v),_.return=d,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Sa:return v=bl(_.type,_.key,_.props,null,d.mode,v),v.ref=fo(d,null,_),v.return=d,v;case gs:return _=au(_,d.mode,v),_.return=d,_;case Hi:var y=_._init;return f(d,y(_._payload),v)}if(Eo(_)||oo(_))return _=Ir(_,d.mode,v,null),_.return=d,_;Na(d,_)}return null}function h(d,_,v,y){var C=_!==null?_.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return C!==null?null:a(d,_,""+v,y);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Sa:return v.key===C?l(d,_,v,y):null;case gs:return v.key===C?c(d,_,v,y):null;case Hi:return C=v._init,h(d,_,C(v._payload),y)}if(Eo(v)||oo(v))return C!==null?null:u(d,_,v,y,null);Na(d,v)}return null}function p(d,_,v,y,C){if(typeof y=="string"&&y!==""||typeof y=="number")return d=d.get(v)||null,a(_,d,""+y,C);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Sa:return d=d.get(y.key===null?v:y.key)||null,l(_,d,y,C);case gs:return d=d.get(y.key===null?v:y.key)||null,c(_,d,y,C);case Hi:var T=y._init;return p(d,_,v,T(y._payload),C)}if(Eo(y)||oo(y))return d=d.get(v)||null,u(_,d,y,C,null);Na(_,y)}return null}function m(d,_,v,y){for(var C=null,T=null,A=_,D=_=0,M=null;A!==null&&D<v.length;D++){A.index>D?(M=A,A=null):M=A.sibling;var w=h(d,A,v[D],y);if(w===null){A===null&&(A=M);break}t&&A&&w.alternate===null&&e(d,A),_=s(w,_,D),T===null?C=w:T.sibling=w,T=w,A=M}if(D===v.length)return n(d,A),gt&&Mr(d,D),C;if(A===null){for(;D<v.length;D++)A=f(d,v[D],y),A!==null&&(_=s(A,_,D),T===null?C=A:T.sibling=A,T=A);return gt&&Mr(d,D),C}for(A=i(d,A);D<v.length;D++)M=p(A,d,D,v[D],y),M!==null&&(t&&M.alternate!==null&&A.delete(M.key===null?D:M.key),_=s(M,_,D),T===null?C=M:T.sibling=M,T=M);return t&&A.forEach(function(z){return e(d,z)}),gt&&Mr(d,D),C}function x(d,_,v,y){var C=oo(v);if(typeof C!="function")throw Error(ae(150));if(v=C.call(v),v==null)throw Error(ae(151));for(var T=C=null,A=_,D=_=0,M=null,w=v.next();A!==null&&!w.done;D++,w=v.next()){A.index>D?(M=A,A=null):M=A.sibling;var z=h(d,A,w.value,y);if(z===null){A===null&&(A=M);break}t&&A&&z.alternate===null&&e(d,A),_=s(z,_,D),T===null?C=z:T.sibling=z,T=z,A=M}if(w.done)return n(d,A),gt&&Mr(d,D),C;if(A===null){for(;!w.done;D++,w=v.next())w=f(d,w.value,y),w!==null&&(_=s(w,_,D),T===null?C=w:T.sibling=w,T=w);return gt&&Mr(d,D),C}for(A=i(d,A);!w.done;D++,w=v.next())w=p(A,d,D,w.value,y),w!==null&&(t&&w.alternate!==null&&A.delete(w.key===null?D:w.key),_=s(w,_,D),T===null?C=w:T.sibling=w,T=w);return t&&A.forEach(function(V){return e(d,V)}),gt&&Mr(d,D),C}function g(d,_,v,y){if(typeof v=="object"&&v!==null&&v.type===vs&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Sa:e:{for(var C=v.key,T=_;T!==null;){if(T.key===C){if(C=v.type,C===vs){if(T.tag===7){n(d,T.sibling),_=r(T,v.props.children),_.return=d,d=_;break e}}else if(T.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Hi&&Jh(C)===T.type){n(d,T.sibling),_=r(T,v.props),_.ref=fo(d,T,v),_.return=d,d=_;break e}n(d,T);break}else e(d,T);T=T.sibling}v.type===vs?(_=Ir(v.props.children,d.mode,y,v.key),_.return=d,d=_):(y=bl(v.type,v.key,v.props,null,d.mode,y),y.ref=fo(d,_,v),y.return=d,d=y)}return o(d);case gs:e:{for(T=v.key;_!==null;){if(_.key===T)if(_.tag===4&&_.stateNode.containerInfo===v.containerInfo&&_.stateNode.implementation===v.implementation){n(d,_.sibling),_=r(_,v.children||[]),_.return=d,d=_;break e}else{n(d,_);break}else e(d,_);_=_.sibling}_=au(v,d.mode,y),_.return=d,d=_}return o(d);case Hi:return T=v._init,g(d,_,T(v._payload),y)}if(Eo(v))return m(d,_,v,y);if(oo(v))return x(d,_,v,y);Na(d,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,_!==null&&_.tag===6?(n(d,_.sibling),_=r(_,v),_.return=d,d=_):(n(d,_),_=ou(v,d.mode,y),_.return=d,d=_),o(d)):n(d,_)}return g}var Vs=H0(!0),G0=H0(!1),Vl=hr(null),Wl=null,Ts=null,bd=null;function Cd(){bd=Ts=Wl=null}function Rd(t){var e=Vl.current;ht(Vl),t._currentValue=e}function Af(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Os(t,e){Wl=t,bd=Ts=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(pn=!0),t.firstContext=null)}function Bn(t){var e=t._currentValue;if(bd!==t)if(t={context:t,memoizedValue:e,next:null},Ts===null){if(Wl===null)throw Error(ae(308));Ts=t,Wl.dependencies={lanes:0,firstContext:t}}else Ts=Ts.next=t;return e}var Pr=null;function Pd(t){Pr===null?Pr=[t]:Pr.push(t)}function V0(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Pd(e)):(n.next=r.next,r.next=n),e.interleaved=n,bi(t,i)}function bi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Gi=!1;function Ld(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function W0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function wi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function tr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Je&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,bi(t,n)}return r=i.interleaved,r===null?(e.next=e,Pd(i)):(e.next=r.next,r.next=e),i.interleaved=e,bi(t,n)}function Sl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,gd(t,n)}}function ep(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function jl(t,e,n,i){var r=t.updateQueue;Gi=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=t.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;o=0,u=c=l=null,a=s;do{var h=a.lane,p=a.eventTime;if((i&h)===h){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var m=t,x=a;switch(h=e,p=n,x.tag){case 1:if(m=x.payload,typeof m=="function"){f=m.call(p,f,h);break e}f=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=x.payload,h=typeof m=="function"?m.call(p,f,h):m,h==null)break e;f=St({},f,h);break e;case 2:Gi=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=p,l=f):u=u.next=p,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(u===null&&(l=f),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Hr|=o,t.lanes=o,t.memoizedState=f}}function tp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ae(191,r));r.call(i)}}}var ga={},ai=hr(ga),ea=hr(ga),ta=hr(ga);function Lr(t){if(t===ga)throw Error(ae(174));return t}function Nd(t,e){switch(ct(ta,e),ct(ea,t),ct(ai,ga),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:of(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=of(e,t)}ht(ai),ct(ai,e)}function Ws(){ht(ai),ht(ea),ht(ta)}function j0(t){Lr(ta.current);var e=Lr(ai.current),n=of(e,t.type);e!==n&&(ct(ea,t),ct(ai,n))}function Dd(t){ea.current===t&&(ht(ai),ht(ea))}var _t=hr(0);function Xl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var eu=[];function Id(){for(var t=0;t<eu.length;t++)eu[t]._workInProgressVersionPrimary=null;eu.length=0}var Ml=Li.ReactCurrentDispatcher,tu=Li.ReactCurrentBatchConfig,Br=0,yt=null,Pt=null,zt=null,Yl=!1,Do=!1,na=0,Wy=0;function Zt(){throw Error(ae(321))}function Ud(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Jn(t[n],e[n]))return!1;return!0}function Od(t,e,n,i,r,s){if(Br=s,yt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ml.current=t===null||t.memoizedState===null?$y:qy,t=n(i,r),Do){s=0;do{if(Do=!1,na=0,25<=s)throw Error(ae(301));s+=1,zt=Pt=null,e.updateQueue=null,Ml.current=Zy,t=n(i,r)}while(Do)}if(Ml.current=$l,e=Pt!==null&&Pt.next!==null,Br=0,zt=Pt=yt=null,Yl=!1,e)throw Error(ae(300));return t}function Fd(){var t=na!==0;return na=0,t}function ii(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return zt===null?yt.memoizedState=zt=t:zt=zt.next=t,zt}function Hn(){if(Pt===null){var t=yt.alternate;t=t!==null?t.memoizedState:null}else t=Pt.next;var e=zt===null?yt.memoizedState:zt.next;if(e!==null)zt=e,Pt=t;else{if(t===null)throw Error(ae(310));Pt=t,t={memoizedState:Pt.memoizedState,baseState:Pt.baseState,baseQueue:Pt.baseQueue,queue:Pt.queue,next:null},zt===null?yt.memoizedState=zt=t:zt=zt.next=t}return zt}function ia(t,e){return typeof e=="function"?e(t):e}function nu(t){var e=Hn(),n=e.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=t;var i=Pt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((Br&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var f={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=f,o=i):l=l.next=f,yt.lanes|=u,Hr|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,Jn(i,e.memoizedState)||(pn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,yt.lanes|=s,Hr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function iu(t){var e=Hn(),n=e.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Jn(s,e.memoizedState)||(pn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function X0(){}function Y0(t,e){var n=yt,i=Hn(),r=e(),s=!Jn(i.memoizedState,r);if(s&&(i.memoizedState=r,pn=!0),i=i.queue,zd(Z0.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||zt!==null&&zt.memoizedState.tag&1){if(n.flags|=2048,ra(9,q0.bind(null,n,i,r,e),void 0,null),Ht===null)throw Error(ae(349));Br&30||$0(n,e,r)}return r}function $0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=yt.updateQueue,e===null?(e={lastEffect:null,stores:null},yt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function q0(t,e,n,i){e.value=n,e.getSnapshot=i,K0(e)&&Q0(t)}function Z0(t,e,n){return n(function(){K0(e)&&Q0(t)})}function K0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Jn(t,n)}catch{return!0}}function Q0(t){var e=bi(t,1);e!==null&&Qn(e,t,1,-1)}function np(t){var e=ii();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ia,lastRenderedState:t},e.queue=t,t=t.dispatch=Yy.bind(null,yt,t),[e.memoizedState,t]}function ra(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=yt.updateQueue,e===null?(e={lastEffect:null,stores:null},yt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function J0(){return Hn().memoizedState}function El(t,e,n,i){var r=ii();yt.flags|=t,r.memoizedState=ra(1|e,n,void 0,i===void 0?null:i)}function pc(t,e,n,i){var r=Hn();i=i===void 0?null:i;var s=void 0;if(Pt!==null){var o=Pt.memoizedState;if(s=o.destroy,i!==null&&Ud(i,o.deps)){r.memoizedState=ra(e,n,s,i);return}}yt.flags|=t,r.memoizedState=ra(1|e,n,s,i)}function ip(t,e){return El(8390656,8,t,e)}function zd(t,e){return pc(2048,8,t,e)}function ev(t,e){return pc(4,2,t,e)}function tv(t,e){return pc(4,4,t,e)}function nv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function iv(t,e,n){return n=n!=null?n.concat([t]):null,pc(4,4,nv.bind(null,e,t),n)}function kd(){}function rv(t,e){var n=Hn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Ud(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function sv(t,e){var n=Hn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Ud(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function ov(t,e,n){return Br&21?(Jn(n,e)||(n=f0(),yt.lanes|=n,Hr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,pn=!0),t.memoizedState=n)}function jy(t,e){var n=rt;rt=n!==0&&4>n?n:4,t(!0);var i=tu.transition;tu.transition={};try{t(!1),e()}finally{rt=n,tu.transition=i}}function av(){return Hn().memoizedState}function Xy(t,e,n){var i=ir(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},lv(t))cv(e,n);else if(n=V0(t,e,n,i),n!==null){var r=cn();Qn(n,t,i,r),uv(n,e,i)}}function Yy(t,e,n){var i=ir(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(lv(t))cv(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Jn(a,o)){var l=e.interleaved;l===null?(r.next=r,Pd(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=V0(t,e,r,i),n!==null&&(r=cn(),Qn(n,t,i,r),uv(n,e,i))}}function lv(t){var e=t.alternate;return t===yt||e!==null&&e===yt}function cv(t,e){Do=Yl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function uv(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,gd(t,n)}}var $l={readContext:Bn,useCallback:Zt,useContext:Zt,useEffect:Zt,useImperativeHandle:Zt,useInsertionEffect:Zt,useLayoutEffect:Zt,useMemo:Zt,useReducer:Zt,useRef:Zt,useState:Zt,useDebugValue:Zt,useDeferredValue:Zt,useTransition:Zt,useMutableSource:Zt,useSyncExternalStore:Zt,useId:Zt,unstable_isNewReconciler:!1},$y={readContext:Bn,useCallback:function(t,e){return ii().memoizedState=[t,e===void 0?null:e],t},useContext:Bn,useEffect:ip,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,El(4194308,4,nv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return El(4194308,4,t,e)},useInsertionEffect:function(t,e){return El(4,2,t,e)},useMemo:function(t,e){var n=ii();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ii();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Xy.bind(null,yt,t),[i.memoizedState,t]},useRef:function(t){var e=ii();return t={current:t},e.memoizedState=t},useState:np,useDebugValue:kd,useDeferredValue:function(t){return ii().memoizedState=t},useTransition:function(){var t=np(!1),e=t[0];return t=jy.bind(null,t[1]),ii().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=yt,r=ii();if(gt){if(n===void 0)throw Error(ae(407));n=n()}else{if(n=e(),Ht===null)throw Error(ae(349));Br&30||$0(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,ip(Z0.bind(null,i,s,t),[t]),i.flags|=2048,ra(9,q0.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=ii(),e=Ht.identifierPrefix;if(gt){var n=Mi,i=Si;n=(i&~(1<<32-Kn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=na++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Wy++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},qy={readContext:Bn,useCallback:rv,useContext:Bn,useEffect:zd,useImperativeHandle:iv,useInsertionEffect:ev,useLayoutEffect:tv,useMemo:sv,useReducer:nu,useRef:J0,useState:function(){return nu(ia)},useDebugValue:kd,useDeferredValue:function(t){var e=Hn();return ov(e,Pt.memoizedState,t)},useTransition:function(){var t=nu(ia)[0],e=Hn().memoizedState;return[t,e]},useMutableSource:X0,useSyncExternalStore:Y0,useId:av,unstable_isNewReconciler:!1},Zy={readContext:Bn,useCallback:rv,useContext:Bn,useEffect:zd,useImperativeHandle:iv,useInsertionEffect:ev,useLayoutEffect:tv,useMemo:sv,useReducer:iu,useRef:J0,useState:function(){return iu(ia)},useDebugValue:kd,useDeferredValue:function(t){var e=Hn();return Pt===null?e.memoizedState=t:ov(e,Pt.memoizedState,t)},useTransition:function(){var t=iu(ia)[0],e=Hn().memoizedState;return[t,e]},useMutableSource:X0,useSyncExternalStore:Y0,useId:av,unstable_isNewReconciler:!1};function Xn(t,e){if(t&&t.defaultProps){e=St({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function bf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:St({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var mc={isMounted:function(t){return(t=t._reactInternals)?$r(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=cn(),r=ir(t),s=wi(i,r);s.payload=e,n!=null&&(s.callback=n),e=tr(t,s,r),e!==null&&(Qn(e,t,r,i),Sl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=cn(),r=ir(t),s=wi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=tr(t,s,r),e!==null&&(Qn(e,t,r,i),Sl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=cn(),i=ir(t),r=wi(n,i);r.tag=2,e!=null&&(r.callback=e),e=tr(t,r,i),e!==null&&(Qn(e,t,i,n),Sl(e,t,i))}};function rp(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Zo(n,i)||!Zo(r,s):!0}function fv(t,e,n){var i=!1,r=cr,s=e.contextType;return typeof s=="object"&&s!==null?s=Bn(s):(r=gn(e)?zr:nn.current,i=e.contextTypes,s=(i=i!=null)?Hs(t,r):cr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=mc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function sp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&mc.enqueueReplaceState(e,e.state,null)}function Cf(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Ld(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Bn(s):(s=gn(e)?zr:nn.current,r.context=Hs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(bf(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&mc.enqueueReplaceState(r,r.state,null),jl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function js(t,e){try{var n="",i=e;do n+=wx(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function ru(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Rf(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Ky=typeof WeakMap=="function"?WeakMap:Map;function dv(t,e,n){n=wi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Zl||(Zl=!0,kf=i),Rf(t,e)},n}function hv(t,e,n){n=wi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Rf(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Rf(t,e),typeof i!="function"&&(nr===null?nr=new Set([this]):nr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function op(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Ky;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=fS.bind(null,t,e,n),e.then(t,t))}function ap(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function lp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=wi(-1,1),e.tag=2,tr(n,e,1))),n.lanes|=1),t)}var Qy=Li.ReactCurrentOwner,pn=!1;function an(t,e,n,i){e.child=t===null?G0(e,null,n,i):Vs(e,t.child,n,i)}function cp(t,e,n,i,r){n=n.render;var s=e.ref;return Os(e,r),i=Od(t,e,n,i,s,r),n=Fd(),t!==null&&!pn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ci(t,e,r)):(gt&&n&&wd(e),e.flags|=1,an(t,e,i,r),e.child)}function up(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Yd(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,pv(t,e,s,i,r)):(t=bl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Zo,n(o,i)&&t.ref===e.ref)return Ci(t,e,r)}return e.flags|=1,t=rr(s,i),t.ref=e.ref,t.return=e,e.child=t}function pv(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Zo(s,i)&&t.ref===e.ref)if(pn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(pn=!0);else return e.lanes=t.lanes,Ci(t,e,r)}return Pf(t,e,n,i,r)}function mv(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ct(bs,Mn),Mn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ct(bs,Mn),Mn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,ct(bs,Mn),Mn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,ct(bs,Mn),Mn|=i;return an(t,e,r,n),e.child}function gv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Pf(t,e,n,i,r){var s=gn(n)?zr:nn.current;return s=Hs(e,s),Os(e,r),n=Od(t,e,n,i,s,r),i=Fd(),t!==null&&!pn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ci(t,e,r)):(gt&&i&&wd(e),e.flags|=1,an(t,e,n,r),e.child)}function fp(t,e,n,i,r){if(gn(n)){var s=!0;Bl(e)}else s=!1;if(Os(e,r),e.stateNode===null)wl(t,e),fv(e,n,i),Cf(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Bn(c):(c=gn(n)?zr:nn.current,c=Hs(e,c));var u=n.getDerivedStateFromProps,f=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&sp(e,o,i,c),Gi=!1;var h=e.memoizedState;o.state=h,jl(e,i,o,r),l=e.memoizedState,a!==i||h!==l||mn.current||Gi?(typeof u=="function"&&(bf(e,n,u,i),l=e.memoizedState),(a=Gi||rp(e,n,a,i,h,l,c))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,W0(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:Xn(e.type,a),o.props=c,f=e.pendingProps,h=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Bn(l):(l=gn(n)?zr:nn.current,l=Hs(e,l));var p=n.getDerivedStateFromProps;(u=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||h!==l)&&sp(e,o,i,l),Gi=!1,h=e.memoizedState,o.state=h,jl(e,i,o,r);var m=e.memoizedState;a!==f||h!==m||mn.current||Gi?(typeof p=="function"&&(bf(e,n,p,i),m=e.memoizedState),(c=Gi||rp(e,n,c,i,h,m,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,m,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,m,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=m),o.props=i,o.state=m,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Lf(t,e,n,i,s,r)}function Lf(t,e,n,i,r,s){gv(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&Zh(e,n,!1),Ci(t,e,s);i=e.stateNode,Qy.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Vs(e,t.child,null,s),e.child=Vs(e,null,a,s)):an(t,e,a,s),e.memoizedState=i.state,r&&Zh(e,n,!0),e.child}function vv(t){var e=t.stateNode;e.pendingContext?qh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&qh(t,e.context,!1),Nd(t,e.containerInfo)}function dp(t,e,n,i,r){return Gs(),Ad(r),e.flags|=256,an(t,e,n,i),e.child}var Nf={dehydrated:null,treeContext:null,retryLane:0};function Df(t){return{baseLanes:t,cachePool:null,transitions:null}}function _v(t,e,n){var i=e.pendingProps,r=_t.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ct(_t,r&1),t===null)return Tf(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=_c(o,i,0,null),t=Ir(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Df(n),e.memoizedState=Nf,t):Bd(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return Jy(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=rr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=rr(a,s):(s=Ir(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?Df(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Nf,i}return s=t.child,t=s.sibling,i=rr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Bd(t,e){return e=_c({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Da(t,e,n,i){return i!==null&&Ad(i),Vs(e,t.child,null,n),t=Bd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Jy(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=ru(Error(ae(422))),Da(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=_c({mode:"visible",children:i.children},r,0,null),s=Ir(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Vs(e,t.child,null,o),e.child.memoizedState=Df(o),e.memoizedState=Nf,s);if(!(e.mode&1))return Da(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ae(419)),i=ru(s,i,void 0),Da(t,e,o,i)}if(a=(o&t.childLanes)!==0,pn||a){if(i=Ht,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,bi(t,r),Qn(i,t,r,-1))}return Xd(),i=ru(Error(ae(421))),Da(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=dS.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,En=er(r.nextSibling),wn=e,gt=!0,$n=null,t!==null&&(Ln[Nn++]=Si,Ln[Nn++]=Mi,Ln[Nn++]=kr,Si=t.id,Mi=t.overflow,kr=e),e=Bd(e,i.children),e.flags|=4096,e)}function hp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Af(t.return,e,n)}function su(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function xv(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(an(t,e,i.children,n),i=_t.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&hp(t,n,e);else if(t.tag===19)hp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ct(_t,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Xl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),su(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Xl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}su(e,!0,n,null,s);break;case"together":su(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function wl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ci(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Hr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ae(153));if(e.child!==null){for(t=e.child,n=rr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=rr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function eS(t,e,n){switch(e.tag){case 3:vv(e),Gs();break;case 5:j0(e);break;case 1:gn(e.type)&&Bl(e);break;case 4:Nd(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ct(Vl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ct(_t,_t.current&1),e.flags|=128,null):n&e.child.childLanes?_v(t,e,n):(ct(_t,_t.current&1),t=Ci(t,e,n),t!==null?t.sibling:null);ct(_t,_t.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return xv(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ct(_t,_t.current),i)break;return null;case 22:case 23:return e.lanes=0,mv(t,e,n)}return Ci(t,e,n)}var yv,If,Sv,Mv;yv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};If=function(){};Sv=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Lr(ai.current);var s=null;switch(n){case"input":r=tf(t,r),i=tf(t,i),s=[];break;case"select":r=St({},r,{value:void 0}),i=St({},i,{value:void 0}),s=[];break;case"textarea":r=sf(t,r),i=sf(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=zl)}af(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Vo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Vo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ut("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};Mv=function(t,e,n,i){n!==i&&(e.flags|=4)};function ho(t,e){if(!gt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Kt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function tS(t,e,n){var i=e.pendingProps;switch(Td(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Kt(e),null;case 1:return gn(e.type)&&kl(),Kt(e),null;case 3:return i=e.stateNode,Ws(),ht(mn),ht(nn),Id(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(La(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,$n!==null&&(Gf($n),$n=null))),If(t,e),Kt(e),null;case 5:Dd(e);var r=Lr(ta.current);if(n=e.type,t!==null&&e.stateNode!=null)Sv(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ae(166));return Kt(e),null}if(t=Lr(ai.current),La(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[si]=e,i[Jo]=s,t=(e.mode&1)!==0,n){case"dialog":ut("cancel",i),ut("close",i);break;case"iframe":case"object":case"embed":ut("load",i);break;case"video":case"audio":for(r=0;r<To.length;r++)ut(To[r],i);break;case"source":ut("error",i);break;case"img":case"image":case"link":ut("error",i),ut("load",i);break;case"details":ut("toggle",i);break;case"input":Mh(i,s),ut("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ut("invalid",i);break;case"textarea":wh(i,s),ut("invalid",i)}af(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&Pa(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Pa(i.textContent,a,t),r=["children",""+a]):Vo.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ut("scroll",i)}switch(n){case"input":Ma(i),Eh(i,s,!0);break;case"textarea":Ma(i),Th(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=zl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Zg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[si]=e,t[Jo]=i,yv(t,e,!1,!1),e.stateNode=t;e:{switch(o=lf(n,i),n){case"dialog":ut("cancel",t),ut("close",t),r=i;break;case"iframe":case"object":case"embed":ut("load",t),r=i;break;case"video":case"audio":for(r=0;r<To.length;r++)ut(To[r],t);r=i;break;case"source":ut("error",t),r=i;break;case"img":case"image":case"link":ut("error",t),ut("load",t),r=i;break;case"details":ut("toggle",t),r=i;break;case"input":Mh(t,i),r=tf(t,i),ut("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=St({},i,{value:void 0}),ut("invalid",t);break;case"textarea":wh(t,i),r=sf(t,i),ut("invalid",t);break;default:r=i}af(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Jg(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Kg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Wo(t,l):typeof l=="number"&&Wo(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Vo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ut("scroll",t):l!=null&&ud(t,s,l,o))}switch(n){case"input":Ma(t),Eh(t,i,!1);break;case"textarea":Ma(t),Th(t);break;case"option":i.value!=null&&t.setAttribute("value",""+lr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Ns(t,!!i.multiple,s,!1):i.defaultValue!=null&&Ns(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=zl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Kt(e),null;case 6:if(t&&e.stateNode!=null)Mv(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ae(166));if(n=Lr(ta.current),Lr(ai.current),La(e)){if(i=e.stateNode,n=e.memoizedProps,i[si]=e,(s=i.nodeValue!==n)&&(t=wn,t!==null))switch(t.tag){case 3:Pa(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Pa(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[si]=e,e.stateNode=i}return Kt(e),null;case 13:if(ht(_t),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(gt&&En!==null&&e.mode&1&&!(e.flags&128))B0(),Gs(),e.flags|=98560,s=!1;else if(s=La(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ae(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ae(317));s[si]=e}else Gs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Kt(e),s=!1}else $n!==null&&(Gf($n),$n=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||_t.current&1?Lt===0&&(Lt=3):Xd())),e.updateQueue!==null&&(e.flags|=4),Kt(e),null);case 4:return Ws(),If(t,e),t===null&&Ko(e.stateNode.containerInfo),Kt(e),null;case 10:return Rd(e.type._context),Kt(e),null;case 17:return gn(e.type)&&kl(),Kt(e),null;case 19:if(ht(_t),s=e.memoizedState,s===null)return Kt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)ho(s,!1);else{if(Lt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Xl(t),o!==null){for(e.flags|=128,ho(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ct(_t,_t.current&1|2),e.child}t=t.sibling}s.tail!==null&&At()>Xs&&(e.flags|=128,i=!0,ho(s,!1),e.lanes=4194304)}else{if(!i)if(t=Xl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),ho(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!gt)return Kt(e),null}else 2*At()-s.renderingStartTime>Xs&&n!==1073741824&&(e.flags|=128,i=!0,ho(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=At(),e.sibling=null,n=_t.current,ct(_t,i?n&1|2:n&1),e):(Kt(e),null);case 22:case 23:return jd(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Mn&1073741824&&(Kt(e),e.subtreeFlags&6&&(e.flags|=8192)):Kt(e),null;case 24:return null;case 25:return null}throw Error(ae(156,e.tag))}function nS(t,e){switch(Td(e),e.tag){case 1:return gn(e.type)&&kl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ws(),ht(mn),ht(nn),Id(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Dd(e),null;case 13:if(ht(_t),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ae(340));Gs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ht(_t),null;case 4:return Ws(),null;case 10:return Rd(e.type._context),null;case 22:case 23:return jd(),null;case 24:return null;default:return null}}var Ia=!1,tn=!1,iS=typeof WeakSet=="function"?WeakSet:Set,Te=null;function As(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Et(t,e,i)}else n.current=null}function Uf(t,e,n){try{n()}catch(i){Et(t,e,i)}}var pp=!1;function rS(t,e){if(_f=Ul,t=b0(),Ed(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,u=0,f=t,h=null;t:for(;;){for(var p;f!==n||r!==0&&f.nodeType!==3||(a=o+r),f!==s||i!==0&&f.nodeType!==3||(l=o+i),f.nodeType===3&&(o+=f.nodeValue.length),(p=f.firstChild)!==null;)h=f,f=p;for(;;){if(f===t)break t;if(h===n&&++c===r&&(a=o),h===s&&++u===i&&(l=o),(p=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(xf={focusedElem:t,selectionRange:n},Ul=!1,Te=e;Te!==null;)if(e=Te,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Te=t;else for(;Te!==null;){e=Te;try{var m=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var x=m.memoizedProps,g=m.memoizedState,d=e.stateNode,_=d.getSnapshotBeforeUpdate(e.elementType===e.type?x:Xn(e.type,x),g);d.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ae(163))}}catch(y){Et(e,e.return,y)}if(t=e.sibling,t!==null){t.return=e.return,Te=t;break}Te=e.return}return m=pp,pp=!1,m}function Io(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Uf(e,n,s)}r=r.next}while(r!==i)}}function gc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Of(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Ev(t){var e=t.alternate;e!==null&&(t.alternate=null,Ev(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[si],delete e[Jo],delete e[Mf],delete e[By],delete e[Hy])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function wv(t){return t.tag===5||t.tag===3||t.tag===4}function mp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||wv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ff(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=zl));else if(i!==4&&(t=t.child,t!==null))for(Ff(t,e,n),t=t.sibling;t!==null;)Ff(t,e,n),t=t.sibling}function zf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(zf(t,e,n),t=t.sibling;t!==null;)zf(t,e,n),t=t.sibling}var Vt=null,Yn=!1;function Ni(t,e,n){for(n=n.child;n!==null;)Tv(t,e,n),n=n.sibling}function Tv(t,e,n){if(oi&&typeof oi.onCommitFiberUnmount=="function")try{oi.onCommitFiberUnmount(lc,n)}catch{}switch(n.tag){case 5:tn||As(n,e);case 6:var i=Vt,r=Yn;Vt=null,Ni(t,e,n),Vt=i,Yn=r,Vt!==null&&(Yn?(t=Vt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Vt.removeChild(n.stateNode));break;case 18:Vt!==null&&(Yn?(t=Vt,n=n.stateNode,t.nodeType===8?Qc(t.parentNode,n):t.nodeType===1&&Qc(t,n),$o(t)):Qc(Vt,n.stateNode));break;case 4:i=Vt,r=Yn,Vt=n.stateNode.containerInfo,Yn=!0,Ni(t,e,n),Vt=i,Yn=r;break;case 0:case 11:case 14:case 15:if(!tn&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Uf(n,e,o),r=r.next}while(r!==i)}Ni(t,e,n);break;case 1:if(!tn&&(As(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){Et(n,e,a)}Ni(t,e,n);break;case 21:Ni(t,e,n);break;case 22:n.mode&1?(tn=(i=tn)||n.memoizedState!==null,Ni(t,e,n),tn=i):Ni(t,e,n);break;default:Ni(t,e,n)}}function gp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new iS),e.forEach(function(i){var r=hS.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Gn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Vt=a.stateNode,Yn=!1;break e;case 3:Vt=a.stateNode.containerInfo,Yn=!0;break e;case 4:Vt=a.stateNode.containerInfo,Yn=!0;break e}a=a.return}if(Vt===null)throw Error(ae(160));Tv(s,o,r),Vt=null,Yn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Et(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Av(e,t),e=e.sibling}function Av(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Gn(e,t),ti(t),i&4){try{Io(3,t,t.return),gc(3,t)}catch(x){Et(t,t.return,x)}try{Io(5,t,t.return)}catch(x){Et(t,t.return,x)}}break;case 1:Gn(e,t),ti(t),i&512&&n!==null&&As(n,n.return);break;case 5:if(Gn(e,t),ti(t),i&512&&n!==null&&As(n,n.return),t.flags&32){var r=t.stateNode;try{Wo(r,"")}catch(x){Et(t,t.return,x)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&$g(r,s),lf(a,o);var c=lf(a,s);for(o=0;o<l.length;o+=2){var u=l[o],f=l[o+1];u==="style"?Jg(r,f):u==="dangerouslySetInnerHTML"?Kg(r,f):u==="children"?Wo(r,f):ud(r,u,f,c)}switch(a){case"input":nf(r,s);break;case"textarea":qg(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Ns(r,!!s.multiple,p,!1):h!==!!s.multiple&&(s.defaultValue!=null?Ns(r,!!s.multiple,s.defaultValue,!0):Ns(r,!!s.multiple,s.multiple?[]:"",!1))}r[Jo]=s}catch(x){Et(t,t.return,x)}}break;case 6:if(Gn(e,t),ti(t),i&4){if(t.stateNode===null)throw Error(ae(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(x){Et(t,t.return,x)}}break;case 3:if(Gn(e,t),ti(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{$o(e.containerInfo)}catch(x){Et(t,t.return,x)}break;case 4:Gn(e,t),ti(t);break;case 13:Gn(e,t),ti(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Vd=At())),i&4&&gp(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(tn=(c=tn)||u,Gn(e,t),tn=c):Gn(e,t),ti(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(Te=t,u=t.child;u!==null;){for(f=Te=u;Te!==null;){switch(h=Te,p=h.child,h.tag){case 0:case 11:case 14:case 15:Io(4,h,h.return);break;case 1:As(h,h.return);var m=h.stateNode;if(typeof m.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,m.props=e.memoizedProps,m.state=e.memoizedState,m.componentWillUnmount()}catch(x){Et(i,n,x)}}break;case 5:As(h,h.return);break;case 22:if(h.memoizedState!==null){_p(f);continue}}p!==null?(p.return=h,Te=p):_p(f)}u=u.sibling}e:for(u=null,f=t;;){if(f.tag===5){if(u===null){u=f;try{r=f.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Qg("display",o))}catch(x){Et(t,t.return,x)}}}else if(f.tag===6){if(u===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(x){Et(t,t.return,x)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;u===f&&(u=null),f=f.return}u===f&&(u=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Gn(e,t),ti(t),i&4&&gp(t);break;case 21:break;default:Gn(e,t),ti(t)}}function ti(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(wv(n)){var i=n;break e}n=n.return}throw Error(ae(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Wo(r,""),i.flags&=-33);var s=mp(t);zf(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=mp(t);Ff(t,a,o);break;default:throw Error(ae(161))}}catch(l){Et(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function sS(t,e,n){Te=t,bv(t)}function bv(t,e,n){for(var i=(t.mode&1)!==0;Te!==null;){var r=Te,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Ia;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||tn;a=Ia;var c=tn;if(Ia=o,(tn=l)&&!c)for(Te=r;Te!==null;)o=Te,l=o.child,o.tag===22&&o.memoizedState!==null?xp(r):l!==null?(l.return=o,Te=l):xp(r);for(;s!==null;)Te=s,bv(s),s=s.sibling;Te=r,Ia=a,tn=c}vp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Te=s):vp(t)}}function vp(t){for(;Te!==null;){var e=Te;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:tn||gc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!tn)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Xn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&tp(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}tp(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var f=u.dehydrated;f!==null&&$o(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ae(163))}tn||e.flags&512&&Of(e)}catch(h){Et(e,e.return,h)}}if(e===t){Te=null;break}if(n=e.sibling,n!==null){n.return=e.return,Te=n;break}Te=e.return}}function _p(t){for(;Te!==null;){var e=Te;if(e===t){Te=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Te=n;break}Te=e.return}}function xp(t){for(;Te!==null;){var e=Te;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{gc(4,e)}catch(l){Et(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Et(e,r,l)}}var s=e.return;try{Of(e)}catch(l){Et(e,s,l)}break;case 5:var o=e.return;try{Of(e)}catch(l){Et(e,o,l)}}}catch(l){Et(e,e.return,l)}if(e===t){Te=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Te=a;break}Te=e.return}}var oS=Math.ceil,ql=Li.ReactCurrentDispatcher,Hd=Li.ReactCurrentOwner,kn=Li.ReactCurrentBatchConfig,Je=0,Ht=null,Rt=null,Yt=0,Mn=0,bs=hr(0),Lt=0,sa=null,Hr=0,vc=0,Gd=0,Uo=null,hn=null,Vd=0,Xs=1/0,_i=null,Zl=!1,kf=null,nr=null,Ua=!1,Yi=null,Kl=0,Oo=0,Bf=null,Tl=-1,Al=0;function cn(){return Je&6?At():Tl!==-1?Tl:Tl=At()}function ir(t){return t.mode&1?Je&2&&Yt!==0?Yt&-Yt:Vy.transition!==null?(Al===0&&(Al=f0()),Al):(t=rt,t!==0||(t=window.event,t=t===void 0?16:_0(t.type)),t):1}function Qn(t,e,n,i){if(50<Oo)throw Oo=0,Bf=null,Error(ae(185));ha(t,n,i),(!(Je&2)||t!==Ht)&&(t===Ht&&(!(Je&2)&&(vc|=n),Lt===4&&ji(t,Yt)),vn(t,i),n===1&&Je===0&&!(e.mode&1)&&(Xs=At()+500,hc&&pr()))}function vn(t,e){var n=t.callbackNode;Vx(t,e);var i=Il(t,t===Ht?Yt:0);if(i===0)n!==null&&Ch(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Ch(n),e===1)t.tag===0?Gy(yp.bind(null,t)):F0(yp.bind(null,t)),zy(function(){!(Je&6)&&pr()}),n=null;else{switch(d0(i)){case 1:n=md;break;case 4:n=c0;break;case 16:n=Dl;break;case 536870912:n=u0;break;default:n=Dl}n=Uv(n,Cv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Cv(t,e){if(Tl=-1,Al=0,Je&6)throw Error(ae(327));var n=t.callbackNode;if(Fs()&&t.callbackNode!==n)return null;var i=Il(t,t===Ht?Yt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Ql(t,i);else{e=i;var r=Je;Je|=2;var s=Pv();(Ht!==t||Yt!==e)&&(_i=null,Xs=At()+500,Dr(t,e));do try{cS();break}catch(a){Rv(t,a)}while(!0);Cd(),ql.current=s,Je=r,Rt!==null?e=0:(Ht=null,Yt=0,e=Lt)}if(e!==0){if(e===2&&(r=hf(t),r!==0&&(i=r,e=Hf(t,r))),e===1)throw n=sa,Dr(t,0),ji(t,i),vn(t,At()),n;if(e===6)ji(t,i);else{if(r=t.current.alternate,!(i&30)&&!aS(r)&&(e=Ql(t,i),e===2&&(s=hf(t),s!==0&&(i=s,e=Hf(t,s))),e===1))throw n=sa,Dr(t,0),ji(t,i),vn(t,At()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ae(345));case 2:Er(t,hn,_i);break;case 3:if(ji(t,i),(i&130023424)===i&&(e=Vd+500-At(),10<e)){if(Il(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){cn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Sf(Er.bind(null,t,hn,_i),e);break}Er(t,hn,_i);break;case 4:if(ji(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Kn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=At()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*oS(i/1960))-i,10<i){t.timeoutHandle=Sf(Er.bind(null,t,hn,_i),i);break}Er(t,hn,_i);break;case 5:Er(t,hn,_i);break;default:throw Error(ae(329))}}}return vn(t,At()),t.callbackNode===n?Cv.bind(null,t):null}function Hf(t,e){var n=Uo;return t.current.memoizedState.isDehydrated&&(Dr(t,e).flags|=256),t=Ql(t,e),t!==2&&(e=hn,hn=n,e!==null&&Gf(e)),t}function Gf(t){hn===null?hn=t:hn.push.apply(hn,t)}function aS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Jn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ji(t,e){for(e&=~Gd,e&=~vc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Kn(e),i=1<<n;t[n]=-1,e&=~i}}function yp(t){if(Je&6)throw Error(ae(327));Fs();var e=Il(t,0);if(!(e&1))return vn(t,At()),null;var n=Ql(t,e);if(t.tag!==0&&n===2){var i=hf(t);i!==0&&(e=i,n=Hf(t,i))}if(n===1)throw n=sa,Dr(t,0),ji(t,e),vn(t,At()),n;if(n===6)throw Error(ae(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Er(t,hn,_i),vn(t,At()),null}function Wd(t,e){var n=Je;Je|=1;try{return t(e)}finally{Je=n,Je===0&&(Xs=At()+500,hc&&pr())}}function Gr(t){Yi!==null&&Yi.tag===0&&!(Je&6)&&Fs();var e=Je;Je|=1;var n=kn.transition,i=rt;try{if(kn.transition=null,rt=1,t)return t()}finally{rt=i,kn.transition=n,Je=e,!(Je&6)&&pr()}}function jd(){Mn=bs.current,ht(bs)}function Dr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Fy(n)),Rt!==null)for(n=Rt.return;n!==null;){var i=n;switch(Td(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&kl();break;case 3:Ws(),ht(mn),ht(nn),Id();break;case 5:Dd(i);break;case 4:Ws();break;case 13:ht(_t);break;case 19:ht(_t);break;case 10:Rd(i.type._context);break;case 22:case 23:jd()}n=n.return}if(Ht=t,Rt=t=rr(t.current,null),Yt=Mn=e,Lt=0,sa=null,Gd=vc=Hr=0,hn=Uo=null,Pr!==null){for(e=0;e<Pr.length;e++)if(n=Pr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}Pr=null}return t}function Rv(t,e){do{var n=Rt;try{if(Cd(),Ml.current=$l,Yl){for(var i=yt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Yl=!1}if(Br=0,zt=Pt=yt=null,Do=!1,na=0,Hd.current=null,n===null||n.return===null){Lt=1,sa=e,Rt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Yt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,f=u.tag;if(!(u.mode&1)&&(f===0||f===11||f===15)){var h=u.alternate;h?(u.updateQueue=h.updateQueue,u.memoizedState=h.memoizedState,u.lanes=h.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=ap(o);if(p!==null){p.flags&=-257,lp(p,o,a,s,e),p.mode&1&&op(s,c,e),e=p,l=c;var m=e.updateQueue;if(m===null){var x=new Set;x.add(l),e.updateQueue=x}else m.add(l);break e}else{if(!(e&1)){op(s,c,e),Xd();break e}l=Error(ae(426))}}else if(gt&&a.mode&1){var g=ap(o);if(g!==null){!(g.flags&65536)&&(g.flags|=256),lp(g,o,a,s,e),Ad(js(l,a));break e}}s=l=js(l,a),Lt!==4&&(Lt=2),Uo===null?Uo=[s]:Uo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=dv(s,l,e);ep(s,d);break e;case 1:a=l;var _=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(nr===null||!nr.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=hv(s,a,e);ep(s,y);break e}}s=s.return}while(s!==null)}Nv(n)}catch(C){e=C,Rt===n&&n!==null&&(Rt=n=n.return);continue}break}while(!0)}function Pv(){var t=ql.current;return ql.current=$l,t===null?$l:t}function Xd(){(Lt===0||Lt===3||Lt===2)&&(Lt=4),Ht===null||!(Hr&268435455)&&!(vc&268435455)||ji(Ht,Yt)}function Ql(t,e){var n=Je;Je|=2;var i=Pv();(Ht!==t||Yt!==e)&&(_i=null,Dr(t,e));do try{lS();break}catch(r){Rv(t,r)}while(!0);if(Cd(),Je=n,ql.current=i,Rt!==null)throw Error(ae(261));return Ht=null,Yt=0,Lt}function lS(){for(;Rt!==null;)Lv(Rt)}function cS(){for(;Rt!==null&&!Ix();)Lv(Rt)}function Lv(t){var e=Iv(t.alternate,t,Mn);t.memoizedProps=t.pendingProps,e===null?Nv(t):Rt=e,Hd.current=null}function Nv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=nS(n,e),n!==null){n.flags&=32767,Rt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Lt=6,Rt=null;return}}else if(n=tS(n,e,Mn),n!==null){Rt=n;return}if(e=e.sibling,e!==null){Rt=e;return}Rt=e=t}while(e!==null);Lt===0&&(Lt=5)}function Er(t,e,n){var i=rt,r=kn.transition;try{kn.transition=null,rt=1,uS(t,e,n,i)}finally{kn.transition=r,rt=i}return null}function uS(t,e,n,i){do Fs();while(Yi!==null);if(Je&6)throw Error(ae(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ae(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Wx(t,s),t===Ht&&(Rt=Ht=null,Yt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ua||(Ua=!0,Uv(Dl,function(){return Fs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=kn.transition,kn.transition=null;var o=rt;rt=1;var a=Je;Je|=4,Hd.current=null,rS(t,n),Av(n,t),Py(xf),Ul=!!_f,xf=_f=null,t.current=n,sS(n),Ux(),Je=a,rt=o,kn.transition=s}else t.current=n;if(Ua&&(Ua=!1,Yi=t,Kl=r),s=t.pendingLanes,s===0&&(nr=null),zx(n.stateNode),vn(t,At()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Zl)throw Zl=!1,t=kf,kf=null,t;return Kl&1&&t.tag!==0&&Fs(),s=t.pendingLanes,s&1?t===Bf?Oo++:(Oo=0,Bf=t):Oo=0,pr(),null}function Fs(){if(Yi!==null){var t=d0(Kl),e=kn.transition,n=rt;try{if(kn.transition=null,rt=16>t?16:t,Yi===null)var i=!1;else{if(t=Yi,Yi=null,Kl=0,Je&6)throw Error(ae(331));var r=Je;for(Je|=4,Te=t.current;Te!==null;){var s=Te,o=s.child;if(Te.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(Te=c;Te!==null;){var u=Te;switch(u.tag){case 0:case 11:case 15:Io(8,u,s)}var f=u.child;if(f!==null)f.return=u,Te=f;else for(;Te!==null;){u=Te;var h=u.sibling,p=u.return;if(Ev(u),u===c){Te=null;break}if(h!==null){h.return=p,Te=h;break}Te=p}}}var m=s.alternate;if(m!==null){var x=m.child;if(x!==null){m.child=null;do{var g=x.sibling;x.sibling=null,x=g}while(x!==null)}}Te=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Te=o;else e:for(;Te!==null;){if(s=Te,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Io(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,Te=d;break e}Te=s.return}}var _=t.current;for(Te=_;Te!==null;){o=Te;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,Te=v;else e:for(o=_;Te!==null;){if(a=Te,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:gc(9,a)}}catch(C){Et(a,a.return,C)}if(a===o){Te=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,Te=y;break e}Te=a.return}}if(Je=r,pr(),oi&&typeof oi.onPostCommitFiberRoot=="function")try{oi.onPostCommitFiberRoot(lc,t)}catch{}i=!0}return i}finally{rt=n,kn.transition=e}}return!1}function Sp(t,e,n){e=js(n,e),e=dv(t,e,1),t=tr(t,e,1),e=cn(),t!==null&&(ha(t,1,e),vn(t,e))}function Et(t,e,n){if(t.tag===3)Sp(t,t,n);else for(;e!==null;){if(e.tag===3){Sp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(nr===null||!nr.has(i))){t=js(n,t),t=hv(e,t,1),e=tr(e,t,1),t=cn(),e!==null&&(ha(e,1,t),vn(e,t));break}}e=e.return}}function fS(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=cn(),t.pingedLanes|=t.suspendedLanes&n,Ht===t&&(Yt&n)===n&&(Lt===4||Lt===3&&(Yt&130023424)===Yt&&500>At()-Vd?Dr(t,0):Gd|=n),vn(t,e)}function Dv(t,e){e===0&&(t.mode&1?(e=Ta,Ta<<=1,!(Ta&130023424)&&(Ta=4194304)):e=1);var n=cn();t=bi(t,e),t!==null&&(ha(t,e,n),vn(t,n))}function dS(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Dv(t,n)}function hS(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ae(314))}i!==null&&i.delete(e),Dv(t,n)}var Iv;Iv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||mn.current)pn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return pn=!1,eS(t,e,n);pn=!!(t.flags&131072)}else pn=!1,gt&&e.flags&1048576&&z0(e,Gl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;wl(t,e),t=e.pendingProps;var r=Hs(e,nn.current);Os(e,n),r=Od(null,e,i,t,r,n);var s=Fd();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,gn(i)?(s=!0,Bl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Ld(e),r.updater=mc,e.stateNode=r,r._reactInternals=e,Cf(e,i,t,n),e=Lf(null,e,i,!0,s,n)):(e.tag=0,gt&&s&&wd(e),an(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(wl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=mS(i),t=Xn(i,t),r){case 0:e=Pf(null,e,i,t,n);break e;case 1:e=fp(null,e,i,t,n);break e;case 11:e=cp(null,e,i,t,n);break e;case 14:e=up(null,e,i,Xn(i.type,t),n);break e}throw Error(ae(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),Pf(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),fp(t,e,i,r,n);case 3:e:{if(vv(e),t===null)throw Error(ae(387));i=e.pendingProps,s=e.memoizedState,r=s.element,W0(t,e),jl(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=js(Error(ae(423)),e),e=dp(t,e,i,n,r);break e}else if(i!==r){r=js(Error(ae(424)),e),e=dp(t,e,i,n,r);break e}else for(En=er(e.stateNode.containerInfo.firstChild),wn=e,gt=!0,$n=null,n=G0(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Gs(),i===r){e=Ci(t,e,n);break e}an(t,e,i,n)}e=e.child}return e;case 5:return j0(e),t===null&&Tf(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,yf(i,r)?o=null:s!==null&&yf(i,s)&&(e.flags|=32),gv(t,e),an(t,e,o,n),e.child;case 6:return t===null&&Tf(e),null;case 13:return _v(t,e,n);case 4:return Nd(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Vs(e,null,i,n):an(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),cp(t,e,i,r,n);case 7:return an(t,e,e.pendingProps,n),e.child;case 8:return an(t,e,e.pendingProps.children,n),e.child;case 12:return an(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,ct(Vl,i._currentValue),i._currentValue=o,s!==null)if(Jn(s.value,o)){if(s.children===r.children&&!mn.current){e=Ci(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=wi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Af(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ae(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Af(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}an(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Os(e,n),r=Bn(r),i=i(r),e.flags|=1,an(t,e,i,n),e.child;case 14:return i=e.type,r=Xn(i,e.pendingProps),r=Xn(i.type,r),up(t,e,i,r,n);case 15:return pv(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),wl(t,e),e.tag=1,gn(i)?(t=!0,Bl(e)):t=!1,Os(e,n),fv(e,i,r),Cf(e,i,r,n),Lf(null,e,i,!0,t,n);case 19:return xv(t,e,n);case 22:return mv(t,e,n)}throw Error(ae(156,e.tag))};function Uv(t,e){return l0(t,e)}function pS(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function zn(t,e,n,i){return new pS(t,e,n,i)}function Yd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function mS(t){if(typeof t=="function")return Yd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===dd)return 11;if(t===hd)return 14}return 2}function rr(t,e){var n=t.alternate;return n===null?(n=zn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function bl(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Yd(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case vs:return Ir(n.children,r,s,e);case fd:o=8,r|=8;break;case Ku:return t=zn(12,n,e,r|2),t.elementType=Ku,t.lanes=s,t;case Qu:return t=zn(13,n,e,r),t.elementType=Qu,t.lanes=s,t;case Ju:return t=zn(19,n,e,r),t.elementType=Ju,t.lanes=s,t;case jg:return _c(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Vg:o=10;break e;case Wg:o=9;break e;case dd:o=11;break e;case hd:o=14;break e;case Hi:o=16,i=null;break e}throw Error(ae(130,t==null?t:typeof t,""))}return e=zn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Ir(t,e,n,i){return t=zn(7,t,i,e),t.lanes=n,t}function _c(t,e,n,i){return t=zn(22,t,i,e),t.elementType=jg,t.lanes=n,t.stateNode={isHidden:!1},t}function ou(t,e,n){return t=zn(6,t,null,e),t.lanes=n,t}function au(t,e,n){return e=zn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function gS(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Hc(0),this.expirationTimes=Hc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Hc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function $d(t,e,n,i,r,s,o,a,l){return t=new gS(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=zn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ld(s),t}function vS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:gs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Ov(t){if(!t)return cr;t=t._reactInternals;e:{if($r(t)!==t||t.tag!==1)throw Error(ae(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(gn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ae(171))}if(t.tag===1){var n=t.type;if(gn(n))return O0(t,n,e)}return e}function Fv(t,e,n,i,r,s,o,a,l){return t=$d(n,i,!0,t,r,s,o,a,l),t.context=Ov(null),n=t.current,i=cn(),r=ir(n),s=wi(i,r),s.callback=e??null,tr(n,s,r),t.current.lanes=r,ha(t,r,i),vn(t,i),t}function xc(t,e,n,i){var r=e.current,s=cn(),o=ir(r);return n=Ov(n),e.context===null?e.context=n:e.pendingContext=n,e=wi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=tr(r,e,o),t!==null&&(Qn(t,r,o,s),Sl(t,r,o)),o}function Jl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Mp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function qd(t,e){Mp(t,e),(t=t.alternate)&&Mp(t,e)}function _S(){return null}var zv=typeof reportError=="function"?reportError:function(t){console.error(t)};function Zd(t){this._internalRoot=t}yc.prototype.render=Zd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ae(409));xc(t,e,null,null)};yc.prototype.unmount=Zd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Gr(function(){xc(null,t,null,null)}),e[Ai]=null}};function yc(t){this._internalRoot=t}yc.prototype.unstable_scheduleHydration=function(t){if(t){var e=m0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Wi.length&&e!==0&&e<Wi[n].priority;n++);Wi.splice(n,0,t),n===0&&v0(t)}};function Kd(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Sc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Ep(){}function xS(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Jl(o);s.call(c)}}var o=Fv(e,i,t,0,null,!1,!1,"",Ep);return t._reactRootContainer=o,t[Ai]=o.current,Ko(t.nodeType===8?t.parentNode:t),Gr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Jl(l);a.call(c)}}var l=$d(t,0,!1,null,null,!1,!1,"",Ep);return t._reactRootContainer=l,t[Ai]=l.current,Ko(t.nodeType===8?t.parentNode:t),Gr(function(){xc(e,l,n,i)}),l}function Mc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Jl(o);a.call(l)}}xc(e,o,t,r)}else o=xS(n,e,t,r,i);return Jl(o)}h0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=wo(e.pendingLanes);n!==0&&(gd(e,n|1),vn(e,At()),!(Je&6)&&(Xs=At()+500,pr()))}break;case 13:Gr(function(){var i=bi(t,1);if(i!==null){var r=cn();Qn(i,t,1,r)}}),qd(t,1)}};vd=function(t){if(t.tag===13){var e=bi(t,134217728);if(e!==null){var n=cn();Qn(e,t,134217728,n)}qd(t,134217728)}};p0=function(t){if(t.tag===13){var e=ir(t),n=bi(t,e);if(n!==null){var i=cn();Qn(n,t,e,i)}qd(t,e)}};m0=function(){return rt};g0=function(t,e){var n=rt;try{return rt=t,e()}finally{rt=n}};uf=function(t,e,n){switch(e){case"input":if(nf(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=dc(i);if(!r)throw Error(ae(90));Yg(i),nf(i,r)}}}break;case"textarea":qg(t,n);break;case"select":e=n.value,e!=null&&Ns(t,!!n.multiple,e,!1)}};n0=Wd;i0=Gr;var yS={usingClientEntryPoint:!1,Events:[ma,Ss,dc,e0,t0,Wd]},po={findFiberByHostInstance:Rr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},SS={bundleType:po.bundleType,version:po.version,rendererPackageName:po.rendererPackageName,rendererConfig:po.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Li.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=o0(t),t===null?null:t.stateNode},findFiberByHostInstance:po.findFiberByHostInstance||_S,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Oa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Oa.isDisabled&&Oa.supportsFiber)try{lc=Oa.inject(SS),oi=Oa}catch{}}bn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yS;bn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Kd(e))throw Error(ae(200));return vS(t,e,null,n)};bn.createRoot=function(t,e){if(!Kd(t))throw Error(ae(299));var n=!1,i="",r=zv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=$d(t,1,!1,null,null,n,!1,i,r),t[Ai]=e.current,Ko(t.nodeType===8?t.parentNode:t),new Zd(e)};bn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ae(188)):(t=Object.keys(t).join(","),Error(ae(268,t)));return t=o0(e),t=t===null?null:t.stateNode,t};bn.flushSync=function(t){return Gr(t)};bn.hydrate=function(t,e,n){if(!Sc(e))throw Error(ae(200));return Mc(null,t,e,!0,n)};bn.hydrateRoot=function(t,e,n){if(!Kd(t))throw Error(ae(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=zv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Fv(e,null,t,1,n??null,r,!1,s,o),t[Ai]=e.current,Ko(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new yc(e)};bn.render=function(t,e,n){if(!Sc(e))throw Error(ae(200));return Mc(null,t,e,!1,n)};bn.unmountComponentAtNode=function(t){if(!Sc(t))throw Error(ae(40));return t._reactRootContainer?(Gr(function(){Mc(null,null,t,!1,function(){t._reactRootContainer=null,t[Ai]=null})}),!0):!1};bn.unstable_batchedUpdates=Wd;bn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Sc(n))throw Error(ae(200));if(t==null||t._reactInternals===void 0)throw Error(ae(38));return Mc(t,e,n,!1,i)};bn.version="18.3.1-next-f1338f8080-20240426";function kv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kv)}catch(t){console.error(t)}}kv(),kg.exports=bn;var MS=kg.exports,Bv,wp=MS;Bv=wp.createRoot,wp.hydrateRoot;const ES={},Tp=t=>{let e;const n=new Set,i=(u,f)=>{const h=typeof u=="function"?u(e):u;if(!Object.is(h,e)){const p=e;e=f??(typeof h!="object"||h===null)?h:Object.assign({},e,h),n.forEach(m=>m(e,p))}},r=()=>e,l={setState:i,getState:r,getInitialState:()=>c,subscribe:u=>(n.add(u),()=>n.delete(u)),destroy:()=>{(ES?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}},c=e=t(i,r,l);return l},wS=t=>t?Tp(t):Tp;var Hv={exports:{}},Gv={},Vv={exports:{}},Wv={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ys=Oe;function TS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var AS=typeof Object.is=="function"?Object.is:TS,bS=Ys.useState,CS=Ys.useEffect,RS=Ys.useLayoutEffect,PS=Ys.useDebugValue;function LS(t,e){var n=e(),i=bS({inst:{value:n,getSnapshot:e}}),r=i[0].inst,s=i[1];return RS(function(){r.value=n,r.getSnapshot=e,lu(r)&&s({inst:r})},[t,n,e]),CS(function(){return lu(r)&&s({inst:r}),t(function(){lu(r)&&s({inst:r})})},[t]),PS(n),n}function lu(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!AS(t,n)}catch{return!0}}function NS(t,e){return e()}var DS=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?NS:LS;Wv.useSyncExternalStore=Ys.useSyncExternalStore!==void 0?Ys.useSyncExternalStore:DS;Vv.exports=Wv;var IS=Vv.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ec=Oe,US=IS;function OS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var FS=typeof Object.is=="function"?Object.is:OS,zS=US.useSyncExternalStore,kS=Ec.useRef,BS=Ec.useEffect,HS=Ec.useMemo,GS=Ec.useDebugValue;Gv.useSyncExternalStoreWithSelector=function(t,e,n,i,r){var s=kS(null);if(s.current===null){var o={hasValue:!1,value:null};s.current=o}else o=s.current;s=HS(function(){function l(p){if(!c){if(c=!0,u=p,p=i(p),r!==void 0&&o.hasValue){var m=o.value;if(r(m,p))return f=m}return f=p}if(m=f,FS(u,p))return m;var x=i(p);return r!==void 0&&r(m,x)?m:(u=p,f=x)}var c=!1,u,f,h=n===void 0?null:n;return[function(){return l(e())},h===null?void 0:function(){return l(h())}]},[e,n,i,r]);var a=zS(t,s[0],s[1]);return BS(function(){o.hasValue=!0,o.value=a},[a]),GS(a),a};Hv.exports=Gv;var VS=Hv.exports;const WS=bg(VS),jv={},{useDebugValue:jS}=fx,{useSyncExternalStoreWithSelector:XS}=WS;let Ap=!1;const YS=t=>t;function $S(t,e=YS,n){(jv?"production":void 0)!=="production"&&n&&!Ap&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),Ap=!0);const i=XS(t.subscribe,t.getState,t.getServerState||t.getInitialState,e,n);return jS(i),i}const bp=t=>{(jv?"production":void 0)!=="production"&&typeof t!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const e=typeof t=="function"?wS(t):t,n=(i,r)=>$S(e,i,r);return Object.assign(n,e),n},Xv=t=>t?bp(t):bp,Nt=Xv(t=>({connected:!1,st:null,logs:{},serial:{},toast:null,set:e=>t(e)}));function qS(t){const e=Nt.getState();if(!e.st)return;const n=e.st.jobs.filter(i=>i.id!==t.id).concat(t).slice(-50);e.set({st:{...e.st,jobs:n}})}function Ri(t,e=!1){Nt.getState().set({toast:{text:t,bad:e}}),clearTimeout(Ri._t),Ri._t=setTimeout(()=>Nt.getState().set({toast:null}),e?6e3:3e3)}let Nr=null,ZS=0;const Vf=new Map;function Yv(){Nr=new WebSocket(`ws://${location.host}/admin`),Nr.onopen=()=>Nt.getState().set({connected:!0}),Nr.onclose=()=>{Nt.getState().set({connected:!1}),setTimeout(Yv,1500)},Nr.onmessage=t=>{const e=JSON.parse(t.data),n=Nt.getState();switch(e.t){case"status":n.set({st:e.data});break;case"reply":{const i=Vf.get(e.rid);i&&(Vf.delete(e.rid),e.ok?i.res(e.data):i.rej(new Error(e.error)));break}case"job":qS(e.job),(e.job.state==="done"||e.job.state==="failed")&&Cp(),e.job.state==="failed"&&Ri(`${e.job.title} 失败：${e.job.error}`,!0),e.job.state==="done"&&Ri(`${e.job.title} ✓`);break;case"log":{const i={...n.logs};i[e.id]=(i[e.id]||[]).concat(e.text).slice(-2e3),n.set({logs:i});break}case"serial":{const i={...n.serial};i[e.port]=(i[e.port]||[]).concat(e.line).slice(-1e3),n.set({serial:i});break}case"ports":n.st&&n.set({st:{...n.st,ports:e.ports}});break;case"cars":n.st&&n.set({st:{...n.st,cars:e.cars}});break;case"monitor":Cp();break}}}function Vr(t,e={}){return new Promise((n,i)=>{if(!Nr||Nr.readyState!==1)return i(new Error("没连上服务器（node server.js 开着吗？）"));const r=++ZS;Vf.set(r,{res:n,rej:i}),Nr.send(JSON.stringify({a:t,args:e,rid:r}))})}async function jt(t,e={}){try{return await Vr(t,e)}catch(n){Ri(n.message,!0);return}}async function Cp(){const t=await Vr("status").catch(()=>null);t&&Nt.getState().set({st:t})}const KS={running:"进行中",done:"完成",failed:"失败",cancelled:"已取消"};function $v({kinds:t,limit:e=6}){const i=Nt(o=>{var a;return((a=o.st)==null?void 0:a.jobs)??[]}).filter(o=>!t||t.includes(o.kind)).slice(-e).reverse(),[r,s]=Oe.useState(null);return Oe.useEffect(()=>{const o=i.find(a=>a.state==="running");o&&s(o.id)},[i.map(o=>o.id+o.state).join()]),i.length?S.jsx("div",{className:"jobs",children:i.map(o=>S.jsx(QS,{j:o,open:r===o.id,toggle:()=>s(r===o.id?null:o.id)},o.id))}):S.jsx("div",{className:"dim small",children:"还没有任务"})}function QS({j:t,open:e,toggle:n}){const i=Nt(c=>c.logs[t.id]),[r,s]=Oe.useState(null),o=Oe.useRef(null);Oe.useEffect(()=>{e&&!i&&!r&&Vr("jobLog",{id:t.id}).then(c=>s(c.log.split(`
`))).catch(()=>{})},[e]),Oe.useEffect(()=>{o.current&&(o.current.scrollTop=o.current.scrollHeight)},[i==null?void 0:i.length,e]);const a=i||r||[],l=Math.round(((t.ended||Date.now())-t.started)/1e3);return S.jsxs("div",{className:"job "+t.state,children:[S.jsxs("div",{className:"job-head",onClick:n,children:[S.jsx("span",{className:"job-title",children:t.title}),S.jsxs("span",{className:"mono dim",children:[l,"s"]}),S.jsxs("span",{className:"tag "+t.state,children:[KS[t.state],t.state==="running"?` ${t.pct}%`:""]}),t.state==="running"&&S.jsx("button",{className:"ghost xs",onClick:c=>{c.stopPropagation(),jt("cancel",{id:t.id})},children:"取消"})]}),t.state==="running"&&S.jsx("div",{className:"bar",children:S.jsx("i",{style:{width:t.pct+"%"}})}),t.error&&S.jsx("div",{className:"err small",children:t.error}),e&&S.jsx("pre",{ref:o,className:"log",children:a.join(`
`)})]})}function JS(){const t=Nt(n=>n.st),e=[...t.cars].sort((n,i)=>Number(i.online)-Number(n.online)||n.id-i.id);return S.jsxs("div",{className:"page",children:[S.jsxs("header",{className:"ph",children:[S.jsx("h1",{children:"设备"}),S.jsxs("p",{className:"dim",children:["插 USB 的板子在下面；连上 WiFi 的车在上面。第一次装车：选型号 → 车号 → ",S.jsx("b",{children:"一键装车"}),"（编译 → 刷机 → 写 WiFi）。"]})]}),S.jsxs("section",{children:[S.jsxs("h2",{children:["在线的车 ",S.jsx("span",{className:"count",children:t.cars.filter(n=>n.online).length})]}),e.length===0?S.jsx("div",{className:"card empty-card",children:"还没有车连上服务器。车开机后 5–10 秒会出现在这里。"}):S.jsx("div",{className:"grid",children:e.map(n=>S.jsx(eM,{c:n,builds:t.builds},n.id))})]}),S.jsxs("section",{children:[S.jsxs("h2",{children:["USB 串口 ",S.jsx("span",{className:"count",children:t.ports.length})," ",S.jsx("button",{className:"ghost xs",onClick:()=>jt("scan"),children:"重新扫描"})]}),t.portsError&&S.jsxs("div",{className:"card warn",children:[t.portsError,"：flash.sh 第一次跑会自动装 arduino-cli（或 ",S.jsx("code",{children:"brew install arduino-cli"}),"）。"]}),!t.serialOk&&S.jsxs("div",{className:"card warn",children:["串口库没装，不能配网/看串口：在 rc-car 文件夹跑 ",S.jsx("code",{children:"npm install"}),"。"]}),t.ports.length===0?S.jsxs("div",{className:"card empty-card",children:["没插 USB。用",S.jsx("b",{children:"能传数据"}),"的线插 ESP32（有些线只能充电）。"]}):S.jsx("div",{className:"grid",children:t.ports.map(n=>S.jsx(tM,{p:n},n.address))})]}),S.jsxs("section",{children:[S.jsx("h2",{children:"任务"}),S.jsx($v,{kinds:["setup","flash","provision","info","build"],limit:8})]})]})}function eM({c:t,builds:e}){var a;const n=Nt(l=>l.st.targets),i=e.filter(l=>{var c;return!t.soc||((c=n[l.target])==null?void 0:c.soc)===t.soc}),[r,s]=Oe.useState(((a=i[0])==null?void 0:a.id)||"");Oe.useEffect(()=>{var l;i.find(c=>c.id===r)||s(((l=i[0])==null?void 0:l.id)||"")},[i.map(l=>l.id).join()]);const o=t.online?t.busy?{ota:"升级中",selftest:"自检中",calib:"校准中"}[t.busy]||t.busy:t.driver?`${t.driverName||"有人"} 在开`:"空闲":"离线";return S.jsxs("div",{className:"card car"+(t.online?"":" off"),children:[S.jsxs("div",{className:"car-top",children:[S.jsxs("span",{className:"carno",children:["#",t.id]}),S.jsx("span",{className:"tag "+(t.online?t.busy||t.driver?"running":"done":"cancelled"),children:o})]}),S.jsxs("dl",{className:"kv",children:[S.jsx("dt",{children:"固件"}),S.jsx("dd",{className:"mono",children:t.fw||"–"}),S.jsx("dt",{children:"芯片"}),S.jsx("dd",{className:"mono",children:t.soc||"旧固件"}),S.jsx("dt",{children:"IP"}),S.jsx("dd",{className:"mono",children:t.ip||"–"}),S.jsx("dt",{children:"陀螺仪"}),S.jsx("dd",{children:t.chip||"没有"})]}),t.online&&S.jsxs("div",{className:"row",children:[S.jsxs("select",{value:r,onChange:l=>s(l.target.value),children:[i.length===0&&S.jsx("option",{value:"",children:"先去「固件」编译"}),i.map(l=>S.jsxs("option",{value:l.id,children:[l.id,l.version===t.fw?"（同版本）":""]},l.id))]}),S.jsx("button",{disabled:!r||!!t.busy||!!t.driver,onClick:()=>jt("ota",{car:t.id,build:r}),children:"无线升级"}),S.jsx("button",{className:"ghost",disabled:!!t.busy||!!t.driver,onClick:()=>jt("selftest",{car:t.id}),children:"自检"})]})]})}function tM({p:t}){const e=Nt(x=>x.st),n=Nt(x=>x.serial[t.address]),i=t.vid.toLowerCase().includes("303a")?"c3":"esp32",[r,s]=Oe.useState(i),[o,a]=Oe.useState(String(Math.max(0,...e.cars.map(x=>x.id))+1)),l=e.builds.find(x=>x.target===r),c=e.monitors.includes(t.address),u=e.jobs.some(x=>x.state==="running"&&x.title.includes(t.address)),[f,h]=Oe.useState(""),p=Oe.useRef(null);Oe.useEffect(()=>{p.current&&(p.current.scrollTop=p.current.scrollHeight)},[n==null?void 0:n.length]);const m=Object.keys(e.settings.wifi).length===0;return S.jsxs("div",{className:"card port",children:[S.jsxs("div",{className:"car-top",children:[S.jsx("span",{className:"mono",children:t.address.replace("/dev/","")}),u&&S.jsx("span",{className:"tag running",children:"忙"})]}),S.jsxs("div",{className:"small dim",children:[t.board||t.guess||"不认识的板子"," ",t.vid&&S.jsxs("span",{className:"mono",children:[t.vid,":",t.pid]})]}),S.jsxs("div",{className:"form",children:[S.jsxs("label",{children:["型号",S.jsx("select",{value:r,onChange:x=>s(x.target.value),children:Object.entries(e.targets).map(([x,g])=>S.jsx("option",{value:x,children:g.name},x))})]}),S.jsxs("label",{children:["车号",S.jsx("input",{type:"number",min:1,max:99,value:o,onChange:x=>a(x.target.value)})]})]}),m&&S.jsx("div",{className:"warn small",children:"先去「设置」填 WiFi，配网要用"}),S.jsxs("div",{className:"row wrap",children:[S.jsx("button",{className:"primary",disabled:u||m,onClick:()=>jt("setup",{target:r,port:t.address,car:Number(o)}),children:"一键装车"}),S.jsxs("button",{className:"ghost",disabled:u||!l,title:l?l.id:"先编译",onClick:()=>jt("flash",{build:l.id,port:t.address}),children:["只刷机",l?` ${l.version}+`:""]}),S.jsx("button",{className:"ghost",disabled:u||m,onClick:()=>jt("provision",{port:t.address,car:Number(o)}),children:"只配网"}),S.jsx("button",{className:"ghost",disabled:u,onClick:()=>jt("info",{port:t.address}),children:"读车信息"}),S.jsx("button",{className:c?"":"ghost",disabled:u,onClick:()=>jt("monitor",{port:t.address,open:!c}),children:c?"关串口":"看串口"})]}),c&&S.jsxs(S.Fragment,{children:[S.jsx("pre",{ref:p,className:"log serial",children:(n||[]).join(`
`)}),S.jsxs("form",{className:"row",onSubmit:x=>{x.preventDefault(),f&&jt("serialWrite",{port:t.address,text:f}),h("")},children:[S.jsx("input",{className:"mono grow",placeholder:'{"t":"info"}',value:f,onChange:x=>h(x.target.value)}),S.jsx("button",{className:"ghost",children:"发送"})]})]})]})}function nM(){const t=Nt(e=>e.st);return S.jsxs("div",{className:"page",children:[S.jsxs("header",{className:"ph",children:[S.jsx("h1",{children:"固件"}),S.jsxs("p",{className:"dim",children:["源码 ",S.jsx("code",{children:"rc_car.ino"})," 版本 ",S.jsx("b",{className:"mono",children:t.version}),"。每次编译都存一份（",S.jsx("code",{children:"builds/"}),"），可以随时刷回旧版。固件里",S.jsx("b",{children:"没有"})," WiFi 密码，密码在刷机后经 USB 写进车里。"]})]}),S.jsxs("section",{children:[S.jsx("h2",{children:"编译"}),S.jsx("div",{className:"grid",children:Object.entries(t.targets).map(([e,n])=>{const i=t.builds.find(s=>s.target===e),r=t.jobs.some(s=>s.state==="running"&&s.title===`编译 ${e}`);return S.jsxs("div",{className:"card",children:[S.jsx("div",{className:"car-top",children:S.jsx("b",{children:n.name})}),S.jsxs("dl",{className:"kv",children:[S.jsx("dt",{children:"板子"}),S.jsx("dd",{className:"mono small",children:n.fqbn}),S.jsx("dt",{children:"驱动"}),S.jsx("dd",{children:n.driver}),S.jsx("dt",{children:"最新"}),S.jsx("dd",{className:"mono",children:i?i.id:"–"})]}),S.jsx("button",{className:"primary",disabled:r,onClick:()=>jt("build",{target:e}),children:r?"编译中…":`编译 ${t.version}`})]},e)})})]}),S.jsxs("section",{children:[S.jsxs("h2",{children:["版本 ",S.jsx("span",{className:"count",children:t.builds.length})]}),t.builds.length===0?S.jsx("div",{className:"card empty-card",children:"还没编译过。"}):S.jsxs("table",{className:"tbl",children:[S.jsx("thead",{children:S.jsxs("tr",{children:[S.jsx("th",{children:"版本"}),S.jsx("th",{children:"型号"}),S.jsx("th",{children:"大小"}),S.jsx("th",{children:"时间"}),S.jsx("th",{children:"sha256"})]})}),S.jsx("tbody",{children:t.builds.map(e=>{var n;return S.jsxs("tr",{children:[S.jsx("td",{className:"mono",children:e.id}),S.jsx("td",{children:((n=t.targets[e.target])==null?void 0:n.name)||e.target}),S.jsxs("td",{className:"mono",children:[Math.round(e.files["app.bin"].size/1024)," KB"]}),S.jsx("td",{className:"mono dim",children:new Date(e.created).toLocaleString()}),S.jsx("td",{className:"mono dim small",children:e.files["app.bin"].sha256.slice(0,12)})]},e.id)})})]})]}),S.jsxs("section",{children:[S.jsx("h2",{children:"编译记录"}),S.jsx($v,{kinds:["build","setup"]})]})]})}function iM(){const t=Nt(l=>l.st),e=t.settings.wifi[t.settings.wifiDefault],[n,i]=Oe.useState((e==null?void 0:e.ssid)||""),[r,s]=Oe.useState(""),[o,a]=Oe.useState(!1);return S.jsxs("div",{className:"page",children:[S.jsxs("header",{className:"ph",children:[S.jsx("h1",{children:"设置"}),S.jsxs("p",{className:"dim",children:["这些只存在这台 Mac 的 ",S.jsx("code",{children:"~/.rcstudio/secrets.json"}),"，不进 git、不进固件、不进项目文件。"]})]}),S.jsxs("section",{children:[S.jsx("h2",{children:"车用的 WiFi"}),S.jsxs("div",{className:"card narrow",children:[S.jsxs("p",{className:"small dim",children:["必须是 2.4GHz。配网时经 USB 写进车里。",e&&S.jsxs(S.Fragment,{children:["现在：",S.jsx("b",{children:e.ssid}),"，密码 ",S.jsx("span",{className:"mono",children:e.pass}),"（",e.len," 位）"]})]}),S.jsxs("form",{className:"form",onSubmit:async l=>{l.preventDefault(),await jt("setWifi",{name:t.settings.wifiDefault,ssid:n,pass:r})&&(s(""),Ri("WiFi 存好了"),jt("status"))},children:[S.jsxs("label",{children:["名称",S.jsx("input",{value:n,onChange:l=>i(l.target.value),autoComplete:"off"})]}),S.jsxs("label",{children:["密码",S.jsx("input",{type:o?"text":"password",value:r,placeholder:e?"不改就留空":"",onChange:l=>s(l.target.value),autoComplete:"new-password"})]}),S.jsxs("label",{className:"check",children:[S.jsx("input",{type:"checkbox",checked:o,onChange:l=>a(l.target.checked)}),"显示"]}),S.jsx("button",{className:"primary",children:"保存"})]})]})]}),S.jsxs("section",{children:[S.jsx("h2",{children:"服务器"}),S.jsx("div",{className:"card narrow",children:S.jsxs("dl",{className:"kv",children:[S.jsx("dt",{children:"Mac 名字"}),S.jsxs("dd",{className:"mono",children:[t.settings.host,".local"]}),S.jsx("dt",{children:"Mac IP"}),S.jsx("dd",{className:"mono",children:t.settings.ip||"–"}),S.jsx("dt",{children:"驾驶网页"}),S.jsx("dd",{className:"mono",children:t.driveUrl||"–"}),S.jsx("dt",{children:"OTA 密码"}),S.jsx("dd",{children:t.settings.otaPassword?"已生成（配网时写进车）":"–"})]})})]}),S.jsxs("section",{children:[S.jsx("h2",{children:"手机管理链接"}),S.jsxs("div",{className:"card narrow",children:[S.jsx("p",{className:"small dim",children:"手机用这个链接打开一次，之后就能在驾驶页做校准/自检/升级。别发给别人（谁有它谁就能刷你的车）。"}),t.adminUrl?S.jsxs("div",{className:"row",children:[S.jsx("code",{className:"grow mono small break",children:t.adminUrl.replace(/admin=.*/,"admin=••••••")}),S.jsx("button",{className:"ghost",onClick:()=>{navigator.clipboard.writeText(t.adminUrl),Ri("复制了")},children:"复制"})]}):S.jsx("div",{className:"dim",children:"没有局域网 IP"})]})]})]})}const nt=Xv(t=>({id:null,doc:null,lib:{},sel:null,tool:"select",gizmo:"translate",dirty:!1,past:[],future:[],pending:null,hoverPart:null,highlight:[],t:0,playing:!1,live:null,set:e=>t(e)}));function dt(t,e={}){const n=nt.getState();if(!n.doc)return;const i=JSON.stringify(n.doc),r=JSON.parse(i);t(r);const s=e.merge&&dt._last===e.merge&&Date.now()-dt._at<800?n.past:n.past.concat(i).slice(-100);dt._last=e.merge,dt._at=Date.now(),n.set({doc:r,dirty:!0,past:s,future:[]}),Qd()}function Rp(){const t=nt.getState();if(!t.doc||!t.past.length)return;const e=t.past[t.past.length-1];t.set({doc:JSON.parse(e),past:t.past.slice(0,-1),future:[JSON.stringify(t.doc),...t.future],dirty:!0}),Qd()}function Pp(){const t=nt.getState();if(!t.doc||!t.future.length)return;const e=t.future[0];t.set({doc:JSON.parse(e),future:t.future.slice(1),past:t.past.concat(JSON.stringify(t.doc)),dirty:!0}),Qd()}let Lp;function Qd(){clearTimeout(Lp),Lp=setTimeout(Fo,1500)}async function Fo(){const t=nt.getState();if(!(!t.doc||!t.id||!t.dirty))try{await Vr("projectSave",{id:t.id,doc:t.doc}),nt.getState().set({dirty:!1})}catch(e){Ri("保存失败："+e.message,!0)}}async function cu(t){await Fo();const[e,n]=await Promise.all([Vr("projectGet",{id:t}),Vr("library")]);nt.getState().set({id:t,doc:e,lib:n,sel:null,past:[],future:[],dirty:!1,pending:null,t:0,playing:!1});try{localStorage.setItem("rc.project",t)}catch{}}function qv(t,e){let n=1;for(;e.includes(t+n);)n++;return t+n}const rM={mcu:"u",driver:"u",motor:"m",servo:"s",battery:"b",sensor:"i",io:"k",passive:"r",video:"v",wheel:"w"};function Zv(t,e=[0,0]){const n=nt.getState(),i=n.lib[t];if(!i||!n.doc)return;const r=qv(rM[i.kind]||"p",n.doc.parts.map(s=>s.id));dt(s=>s.parts.push({id:r,lib:t,label:i.name.split(/[ （(]/)[0],pose:{p:[Math.round(e[0]),Math.round(e[1]),s.enclosure.floor+i.size[2]/2],r:[0,0,0]}})),nt.getState().set({sel:{kind:"part",id:r}})}function Wf(){const t=nt.getState();if(!t.sel)return;const{kind:e,id:n}=t.sel;dt(i=>{e==="part"?(i.parts=i.parts.filter(r=>r.id!==n),i.wires=i.wires.filter(r=>r.a.part!==n&&r.b.part!==n),i.rig.joints=i.rig.joints.filter(r=>r.part!==n)):i.wires=i.wires.filter(r=>r.id!==n)}),nt.getState().set({sel:null})}const Np={power_src:"#e5484d",power_out:"#e5484d",power_in:"#e5484d",gnd:"#222222",motor_out:"#ff8b3e",motor_in:"#ff8b3e",analog_out:"#30a46c"};function sM(t){var c,u;const e=nt.getState();if(!e.doc)return;if(e.tool!=="wire"){e.set({tool:"wire",pending:t});return}if(!e.pending){e.set({pending:t});return}if(e.pending.part===t.part&&e.pending.pin===t.pin){e.set({pending:null});return}const n=e.pending,i=e.doc.parts.find(f=>f.id===n.part),r=(c=e.lib[i.lib])==null?void 0:c.pins.find(f=>f.id===n.pin),s=e.doc.parts.find(f=>f.id===t.part),o=(u=e.lib[s.lib])==null?void 0:u.pins.find(f=>f.id===t.pin),a=Np[(r==null?void 0:r.type)||""]||Np[(o==null?void 0:o.type)||""]||(/(SDA|SCL)/.test(n.pin+t.pin)?"#3e9bff":"#f5d90a"),l=qv("w",e.doc.wires.map(f=>f.id));dt(f=>f.wires.push({id:l,a:n,b:t,color:a,pts:[]})),nt.getState().set({pending:null,sel:{kind:"wire",id:l}})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jd="160",Qr={ROTATE:0,DOLLY:1,PAN:2},Jr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},oM=0,Dp=1,aM=2,Kv=1,lM=2,gi=3,ur=0,_n=1,On=2,sr=0,zs=1,Ip=2,Up=3,Op=4,cM=5,Ar=100,uM=101,fM=102,Fp=103,zp=104,dM=200,hM=201,pM=202,mM=203,jf=204,Xf=205,gM=206,vM=207,_M=208,xM=209,yM=210,SM=211,MM=212,EM=213,wM=214,TM=0,AM=1,bM=2,ec=3,CM=4,RM=5,PM=6,LM=7,Qv=0,NM=1,DM=2,or=0,IM=1,UM=2,OM=3,FM=4,zM=5,kM=6,Jv=300,$s=301,qs=302,Yf=303,$f=304,wc=306,qf=1e3,qn=1001,Zf=1002,ln=1003,kp=1004,uu=1005,Dn=1006,BM=1007,oa=1008,ar=1009,HM=1010,GM=1011,eh=1012,e_=1013,$i=1014,qi=1015,aa=1016,t_=1017,n_=1018,Ur=1020,VM=1021,Zn=1023,WM=1024,jM=1025,Or=1026,Zs=1027,XM=1028,i_=1029,YM=1030,r_=1031,s_=1033,fu=33776,du=33777,hu=33778,pu=33779,Bp=35840,Hp=35841,Gp=35842,Vp=35843,o_=36196,Wp=37492,jp=37496,Xp=37808,Yp=37809,$p=37810,qp=37811,Zp=37812,Kp=37813,Qp=37814,Jp=37815,em=37816,tm=37817,nm=37818,im=37819,rm=37820,sm=37821,mu=36492,om=36494,am=36495,$M=36283,lm=36284,cm=36285,um=36286,a_=3e3,Fr=3001,qM=3200,ZM=3201,l_=0,KM=1,Fn="",Wt="srgb",Pi="srgb-linear",th="display-p3",Tc="display-p3-linear",tc="linear",ft="srgb",nc="rec709",ic="p3",es=7680,fm=519,QM=512,JM=513,eE=514,c_=515,tE=516,nE=517,iE=518,rE=519,dm=35044,hm="300 es",Kf=1035,Ei=2e3,rc=2001;class qr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zo=Math.PI/180,Qf=180/Math.PI;function no(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qt[t&255]+Qt[t>>8&255]+Qt[t>>16&255]+Qt[t>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[n&63|128]+Qt[n>>8&255]+"-"+Qt[n>>16&255]+Qt[n>>24&255]+Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]).toLowerCase()}function Xt(t,e,n){return Math.max(e,Math.min(n,t))}function sE(t,e){return(t%e+e)%e}function gu(t,e,n){return(1-n)*t+n*e}function pm(t){return(t&t-1)===0&&t!==0}function Jf(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function mo(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function dn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const oE={DEG2RAD:zo};class ce{constructor(e=0,n=0){ce.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qe{constructor(e,n,i,r,s,o,a,l,c){qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],p=i[5],m=i[8],x=r[0],g=r[3],d=r[6],_=r[1],v=r[4],y=r[7],C=r[2],T=r[5],A=r[8];return s[0]=o*x+a*_+l*C,s[3]=o*g+a*v+l*T,s[6]=o*d+a*y+l*A,s[1]=c*x+u*_+f*C,s[4]=c*g+u*v+f*T,s[7]=c*d+u*y+f*A,s[2]=h*x+p*_+m*C,s[5]=h*g+p*v+m*T,s[8]=h*d+p*y+m*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*o*u-n*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,p=c*s-o*l,m=n*f+i*h+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=f*x,e[1]=(r*c-u*i)*x,e[2]=(a*i-r*o)*x,e[3]=h*x,e[4]=(u*n-r*l)*x,e[5]=(r*s-a*n)*x,e[6]=p*x,e[7]=(i*l-c*n)*x,e[8]=(o*n-i*s)*x,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(vu.makeScale(e,n)),this}rotate(e){return this.premultiply(vu.makeRotation(-e)),this}translate(e,n){return this.premultiply(vu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const vu=new qe;function u_(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function sc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function aE(){const t=sc("canvas");return t.style.display="block",t}const mm={};function ko(t){t in mm||(mm[t]=!0,console.warn(t))}const gm=new qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),vm=new qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Fa={[Pi]:{transfer:tc,primaries:nc,toReference:t=>t,fromReference:t=>t},[Wt]:{transfer:ft,primaries:nc,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[Tc]:{transfer:tc,primaries:ic,toReference:t=>t.applyMatrix3(vm),fromReference:t=>t.applyMatrix3(gm)},[th]:{transfer:ft,primaries:ic,toReference:t=>t.convertSRGBToLinear().applyMatrix3(vm),fromReference:t=>t.applyMatrix3(gm).convertLinearToSRGB()}},lE=new Set([Pi,Tc]),st={enabled:!0,_workingColorSpace:Pi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!lE.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=Fa[e].toReference,r=Fa[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return Fa[t].primaries},getTransfer:function(t){return t===Fn?tc:Fa[t].transfer}};function ks(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function _u(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let ts;class f_{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ts===void 0&&(ts=sc("canvas")),ts.width=e.width,ts.height=e.height;const i=ts.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ts}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=sc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ks(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ks(n[i]/255)*255):n[i]=ks(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let cE=0;class d_{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cE++}),this.uuid=no(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(xu(r[o].image)):s.push(xu(r[o]))}else s=xu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function xu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?f_.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let uE=0;class Tn extends qr{constructor(e=Tn.DEFAULT_IMAGE,n=Tn.DEFAULT_MAPPING,i=qn,r=qn,s=Dn,o=oa,a=Zn,l=ar,c=Tn.DEFAULT_ANISOTROPY,u=Fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uE++}),this.uuid=no(),this.name="",this.source=new d_(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(ko("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Fr?Wt:Fn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Jv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qf:e.x=e.x-Math.floor(e.x);break;case qn:e.x=e.x<0?0:1;break;case Zf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qf:e.y=e.y-Math.floor(e.y);break;case qn:e.y=e.y<0?0:1;break;case Zf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ko("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Wt?Fr:a_}set encoding(e){ko("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Fr?Wt:Fn}}Tn.DEFAULT_IMAGE=null;Tn.DEFAULT_MAPPING=Jv;Tn.DEFAULT_ANISOTROPY=1;class Bt{constructor(e=0,n=0,i=0,r=1){Bt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],m=l[9],x=l[2],g=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(c+1)/2,y=(p+1)/2,C=(d+1)/2,T=(u+h)/4,A=(f+x)/4,D=(m+g)/4;return v>y&&v>C?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=T/i,s=A/i):y>C?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=T/r,s=D/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=A/s,r=D/s),this.set(i,r,s,n),this}let _=Math.sqrt((g-m)*(g-m)+(f-x)*(f-x)+(h-u)*(h-u));return Math.abs(_)<.001&&(_=1),this.x=(g-m)/_,this.y=(f-x)/_,this.z=(h-u)/_,this.w=Math.acos((c+p+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class fE extends qr{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Bt(0,0,e,n),this.scissorTest=!1,this.viewport=new Bt(0,0,e,n);const r={width:e,height:n,depth:1};i.encoding!==void 0&&(ko("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Fr?Wt:Fn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Tn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,n,i=1){(this.width!==e||this.height!==n||this.depth!==i)&&(this.width=e,this.height=n,this.depth=i,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new d_(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wr extends fE{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class h_ extends Tn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=ln,this.minFilter=ln,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class dE extends Tn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=ln,this.minFilter=ln,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class kt{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const h=s[o+0],p=s[o+1],m=s[o+2],x=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=f;return}if(a===1){e[n+0]=h,e[n+1]=p,e[n+2]=m,e[n+3]=x;return}if(f!==x||l!==h||c!==p||u!==m){let g=1-a;const d=l*h+c*p+u*m+f*x,_=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const C=Math.sqrt(v),T=Math.atan2(C,d*_);g=Math.sin(g*T)/C,a=Math.sin(a*T)/C}const y=a*_;if(l=l*g+h*y,c=c*g+p*y,u=u*g+m*y,f=f*g+x*y,g===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=C,c*=C,u*=C,f*=C}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],h=s[o+1],p=s[o+2],m=s[o+3];return e[n]=a*m+u*f+l*p-c*h,e[n+1]=l*m+u*h+c*f-a*p,e[n+2]=c*m+u*p+a*h-l*f,e[n+3]=u*m-a*f-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),h=l(i/2),p=l(r/2),m=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*p*m,this._y=c*p*f-h*u*m,this._z=c*u*m+h*p*f,this._w=c*u*f-h*p*m;break;case"YXZ":this._x=h*u*f+c*p*m,this._y=c*p*f-h*u*m,this._z=c*u*m-h*p*f,this._w=c*u*f+h*p*m;break;case"ZXY":this._x=h*u*f-c*p*m,this._y=c*p*f+h*u*m,this._z=c*u*m+h*p*f,this._w=c*u*f-h*p*m;break;case"ZYX":this._x=h*u*f-c*p*m,this._y=c*p*f+h*u*m,this._z=c*u*m-h*p*f,this._w=c*u*f+h*p*m;break;case"YZX":this._x=h*u*f+c*p*m,this._y=c*p*f+h*u*m,this._z=c*u*m-h*p*f,this._w=c*u*f-h*p*m;break;case"XZY":this._x=h*u*f-c*p*m,this._y=c*p*f-h*u*m,this._z=c*u*m+h*p*f,this._w=c*u*f+h*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],u=n[6],f=n[10],h=i+a+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-n)*u)/c,h=Math.sin(n*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=Math.random(),n=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(n*Math.cos(r),i*Math.sin(s),i*Math.cos(s),n*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,n=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(_m.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(_m.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*n-s*r),f=2*(s*i-o*n);return this.x=n+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return yu.copy(this).projectOnVector(e),this.sub(yu)}reflect(e){return this.sub(yu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(n),this.y=i*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const yu=new L,_m=new kt;class fr{constructor(e=new L(1/0,1/0,1/0),n=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Vn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Vn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Vn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Vn):Vn.fromBufferAttribute(s,o),Vn.applyMatrix4(e.matrixWorld),this.expandByPoint(Vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),za.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),za.copy(i.boundingBox)),za.applyMatrix4(e.matrixWorld),this.union(za)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Vn),Vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(go),ka.subVectors(this.max,go),ns.subVectors(e.a,go),is.subVectors(e.b,go),rs.subVectors(e.c,go),Di.subVectors(is,ns),Ii.subVectors(rs,is),vr.subVectors(ns,rs);let n=[0,-Di.z,Di.y,0,-Ii.z,Ii.y,0,-vr.z,vr.y,Di.z,0,-Di.x,Ii.z,0,-Ii.x,vr.z,0,-vr.x,-Di.y,Di.x,0,-Ii.y,Ii.x,0,-vr.y,vr.x,0];return!Su(n,ns,is,rs,ka)||(n=[1,0,0,0,1,0,0,0,1],!Su(n,ns,is,rs,ka))?!1:(Ba.crossVectors(Di,Ii),n=[Ba.x,Ba.y,Ba.z],Su(n,ns,is,rs,ka))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const fi=[new L,new L,new L,new L,new L,new L,new L,new L],Vn=new L,za=new fr,ns=new L,is=new L,rs=new L,Di=new L,Ii=new L,vr=new L,go=new L,ka=new L,Ba=new L,_r=new L;function Su(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){_r.fromArray(t,s);const a=r.x*Math.abs(_r.x)+r.y*Math.abs(_r.y)+r.z*Math.abs(_r.z),l=e.dot(_r),c=n.dot(_r),u=i.dot(_r);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const hE=new fr,vo=new L,Mu=new L;class Ac{constructor(e=new L,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):hE.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vo.subVectors(e,this.center);const n=vo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(vo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vo.copy(e.center).add(Mu)),this.expandByPoint(vo.copy(e.center).sub(Mu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const di=new L,Eu=new L,Ha=new L,Ui=new L,wu=new L,Ga=new L,Tu=new L;class bc{constructor(e=new L,n=new L(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,di)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=di.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(di.copy(this.origin).addScaledVector(this.direction,n),di.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Eu.copy(e).add(n).multiplyScalar(.5),Ha.copy(n).sub(e).normalize(),Ui.copy(this.origin).sub(Eu);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Ha),a=Ui.dot(this.direction),l=-Ui.dot(Ha),c=Ui.lengthSq(),u=Math.abs(1-o*o);let f,h,p,m;if(u>0)if(f=o*l-a,h=o*a-l,m=s*u,f>=0)if(h>=-m)if(h<=m){const x=1/u;f*=x,h*=x,p=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h<=-m?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c):h<=m?(f=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Eu).addScaledVector(Ha,h),p}intersectSphere(e,n){di.subVectors(e.center,this.origin);const i=di.dot(this.direction),r=di.dot(di)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,di)!==null}intersectTriangle(e,n,i,r,s){wu.subVectors(n,e),Ga.subVectors(i,e),Tu.crossVectors(wu,Ga);let o=this.direction.dot(Tu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ui.subVectors(this.origin,e);const l=a*this.direction.dot(Ga.crossVectors(Ui,Ga));if(l<0)return null;const c=a*this.direction.dot(wu.cross(Ui));if(c<0||l+c>o)return null;const u=-a*Ui.dot(Tu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pt{constructor(e,n,i,r,s,o,a,l,c,u,f,h,p,m,x,g){pt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,u,f,h,p,m,x,g)}set(e,n,i,r,s,o,a,l,c,u,f,h,p,m,x,g){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=m,d[11]=x,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/ss.setFromMatrixColumn(e,0).length(),s=1/ss.setFromMatrixColumn(e,1).length(),o=1/ss.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,p=o*f,m=a*u,x=a*f;n[0]=l*u,n[4]=-l*f,n[8]=c,n[1]=p+m*c,n[5]=h-x*c,n[9]=-a*l,n[2]=x-h*c,n[6]=m+p*c,n[10]=o*l}else if(e.order==="YXZ"){const h=l*u,p=l*f,m=c*u,x=c*f;n[0]=h+x*a,n[4]=m*a-p,n[8]=o*c,n[1]=o*f,n[5]=o*u,n[9]=-a,n[2]=p*a-m,n[6]=x+h*a,n[10]=o*l}else if(e.order==="ZXY"){const h=l*u,p=l*f,m=c*u,x=c*f;n[0]=h-x*a,n[4]=-o*f,n[8]=m+p*a,n[1]=p+m*a,n[5]=o*u,n[9]=x-h*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const h=o*u,p=o*f,m=a*u,x=a*f;n[0]=l*u,n[4]=m*c-p,n[8]=h*c+x,n[1]=l*f,n[5]=x*c+h,n[9]=p*c-m,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*c,m=a*l,x=a*c;n[0]=l*u,n[4]=x-h*f,n[8]=m*f+p,n[1]=f,n[5]=o*u,n[9]=-a*u,n[2]=-c*u,n[6]=p*f+m,n[10]=h-x*f}else if(e.order==="XZY"){const h=o*l,p=o*c,m=a*l,x=a*c;n[0]=l*u,n[4]=-f,n[8]=c*u,n[1]=h*f+x,n[5]=o*u,n[9]=p*f-m,n[2]=m*f-p,n[6]=a*u,n[10]=x*f+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pE,e,mE)}lookAt(e,n,i){const r=this.elements;return yn.subVectors(e,n),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Oi.crossVectors(i,yn),Oi.lengthSq()===0&&(Math.abs(i.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Oi.crossVectors(i,yn)),Oi.normalize(),Va.crossVectors(yn,Oi),r[0]=Oi.x,r[4]=Va.x,r[8]=yn.x,r[1]=Oi.y,r[5]=Va.y,r[9]=yn.y,r[2]=Oi.z,r[6]=Va.z,r[10]=yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],p=i[13],m=i[2],x=i[6],g=i[10],d=i[14],_=i[3],v=i[7],y=i[11],C=i[15],T=r[0],A=r[4],D=r[8],M=r[12],w=r[1],z=r[5],V=r[9],N=r[13],R=r[2],U=r[6],H=r[10],W=r[14],O=r[3],F=r[7],G=r[11],q=r[15];return s[0]=o*T+a*w+l*R+c*O,s[4]=o*A+a*z+l*U+c*F,s[8]=o*D+a*V+l*H+c*G,s[12]=o*M+a*N+l*W+c*q,s[1]=u*T+f*w+h*R+p*O,s[5]=u*A+f*z+h*U+p*F,s[9]=u*D+f*V+h*H+p*G,s[13]=u*M+f*N+h*W+p*q,s[2]=m*T+x*w+g*R+d*O,s[6]=m*A+x*z+g*U+d*F,s[10]=m*D+x*V+g*H+d*G,s[14]=m*M+x*N+g*W+d*q,s[3]=_*T+v*w+y*R+C*O,s[7]=_*A+v*z+y*U+C*F,s[11]=_*D+v*V+y*H+C*G,s[15]=_*M+v*N+y*W+C*q,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],p=e[14],m=e[3],x=e[7],g=e[11],d=e[15];return m*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*p-i*l*p)+x*(+n*l*p-n*c*h+s*o*h-r*o*p+r*c*u-s*l*u)+g*(+n*c*f-n*a*p-s*o*f+i*o*p+s*a*u-i*c*u)+d*(-r*a*u-n*l*f+n*a*h+r*o*f-i*o*h+i*l*u)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],p=e[11],m=e[12],x=e[13],g=e[14],d=e[15],_=f*g*c-x*h*c+x*l*p-a*g*p-f*l*d+a*h*d,v=m*h*c-u*g*c-m*l*p+o*g*p+u*l*d-o*h*d,y=u*x*c-m*f*c+m*a*p-o*x*p-u*a*d+o*f*d,C=m*f*l-u*x*l-m*a*h+o*x*h+u*a*g-o*f*g,T=n*_+i*v+r*y+s*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=_*A,e[1]=(x*h*s-f*g*s-x*r*p+i*g*p+f*r*d-i*h*d)*A,e[2]=(a*g*s-x*l*s+x*r*c-i*g*c-a*r*d+i*l*d)*A,e[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*p-i*l*p)*A,e[4]=v*A,e[5]=(u*g*s-m*h*s+m*r*p-n*g*p-u*r*d+n*h*d)*A,e[6]=(m*l*s-o*g*s-m*r*c+n*g*c+o*r*d-n*l*d)*A,e[7]=(o*h*s-u*l*s+u*r*c-n*h*c-o*r*p+n*l*p)*A,e[8]=y*A,e[9]=(m*f*s-u*x*s-m*i*p+n*x*p+u*i*d-n*f*d)*A,e[10]=(o*x*s-m*a*s+m*i*c-n*x*c-o*i*d+n*a*d)*A,e[11]=(u*a*s-o*f*s-u*i*c+n*f*c+o*i*p-n*a*p)*A,e[12]=C*A,e[13]=(u*x*r-m*f*r+m*i*h-n*x*h-u*i*g+n*f*g)*A,e[14]=(m*a*r-o*x*r-m*i*l+n*x*l+o*i*g-n*a*g)*A,e[15]=(o*f*r-u*a*r+u*i*l-n*f*l-o*i*h+n*a*h)*A,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,u=o+o,f=a+a,h=s*c,p=s*u,m=s*f,x=o*u,g=o*f,d=a*f,_=l*c,v=l*u,y=l*f,C=i.x,T=i.y,A=i.z;return r[0]=(1-(x+d))*C,r[1]=(p+y)*C,r[2]=(m-v)*C,r[3]=0,r[4]=(p-y)*T,r[5]=(1-(h+d))*T,r[6]=(g+_)*T,r[7]=0,r[8]=(m+v)*A,r[9]=(g-_)*A,r[10]=(1-(h+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=ss.set(r[0],r[1],r[2]).length();const o=ss.set(r[4],r[5],r[6]).length(),a=ss.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Wn.copy(this);const c=1/s,u=1/o,f=1/a;return Wn.elements[0]*=c,Wn.elements[1]*=c,Wn.elements[2]*=c,Wn.elements[4]*=u,Wn.elements[5]*=u,Wn.elements[6]*=u,Wn.elements[8]*=f,Wn.elements[9]*=f,Wn.elements[10]*=f,n.setFromRotationMatrix(Wn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=Ei){const l=this.elements,c=2*s/(n-e),u=2*s/(i-r),f=(n+e)/(n-e),h=(i+r)/(i-r);let p,m;if(a===Ei)p=-(o+s)/(o-s),m=-2*o*s/(o-s);else if(a===rc)p=-o/(o-s),m=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=Ei){const l=this.elements,c=1/(n-e),u=1/(i-r),f=1/(o-s),h=(n+e)*c,p=(i+r)*u;let m,x;if(a===Ei)m=(o+s)*f,x=-2*f;else if(a===rc)m=s*f,x=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const ss=new L,Wn=new pt,pE=new L(0,0,0),mE=new L(1,1,1),Oi=new L,Va=new L,yn=new L,xm=new pt,ym=new kt;class Zr{constructor(e=0,n=0,i=0,r=Zr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return xm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return ym.setFromEuler(this),this.setFromQuaternion(ym,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Zr.DEFAULT_ORDER="XYZ";class nh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let gE=0;const Sm=new L,os=new kt,hi=new pt,Wa=new L,_o=new L,vE=new L,_E=new kt,Mm=new L(1,0,0),Em=new L(0,1,0),wm=new L(0,0,1),xE={type:"added"},yE={type:"removed"};class wt extends qr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gE++}),this.uuid=no(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wt.DEFAULT_UP.clone();const e=new L,n=new Zr,i=new kt,r=new L(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new pt},normalMatrix:{value:new qe}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return os.setFromAxisAngle(e,n),this.quaternion.multiply(os),this}rotateOnWorldAxis(e,n){return os.setFromAxisAngle(e,n),this.quaternion.premultiply(os),this}rotateX(e){return this.rotateOnAxis(Mm,e)}rotateY(e){return this.rotateOnAxis(Em,e)}rotateZ(e){return this.rotateOnAxis(wm,e)}translateOnAxis(e,n){return Sm.copy(e).applyQuaternion(this.quaternion),this.position.add(Sm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Mm,e)}translateY(e){return this.translateOnAxis(Em,e)}translateZ(e){return this.translateOnAxis(wm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Wa.copy(e):Wa.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),_o.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(_o,Wa,this.up):hi.lookAt(Wa,_o,this.up),this.quaternion.setFromRotationMatrix(hi),r&&(hi.extractRotation(r.matrixWorld),os.setFromRotationMatrix(hi),this.quaternion.premultiply(os.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(xE)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(yE)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_o,e,vE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_o,_E,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),p=o(e.animations),m=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}wt.DEFAULT_UP=new L(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jn=new L,pi=new L,Au=new L,mi=new L,as=new L,ls=new L,Tm=new L,bu=new L,Cu=new L,Ru=new L;let ja=!1;class In{constructor(e=new L,n=new L,i=new L){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),jn.subVectors(e,n),r.cross(jn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){jn.subVectors(r,n),pi.subVectors(i,n),Au.subVectors(e,n);const o=jn.dot(jn),a=jn.dot(pi),l=jn.dot(Au),c=pi.dot(pi),u=pi.dot(Au),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,p=(c*l-a*u)*h,m=(o*u-a*l)*h;return s.set(1-p-m,m,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getUV(e,n,i,r,s,o,a,l){return ja===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ja=!0),this.getInterpolation(e,n,i,r,s,o,a,l)}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,mi.x),l.addScaledVector(o,mi.y),l.addScaledVector(a,mi.z),l)}static isFrontFacing(e,n,i,r){return jn.subVectors(i,n),pi.subVectors(e,n),jn.cross(pi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),jn.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return In.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return In.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,i,r,s){return ja===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ja=!0),In.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}getInterpolation(e,n,i,r,s){return In.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return In.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return In.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;as.subVectors(r,i),ls.subVectors(s,i),bu.subVectors(e,i);const l=as.dot(bu),c=ls.dot(bu);if(l<=0&&c<=0)return n.copy(i);Cu.subVectors(e,r);const u=as.dot(Cu),f=ls.dot(Cu);if(u>=0&&f<=u)return n.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),n.copy(i).addScaledVector(as,o);Ru.subVectors(e,s);const p=as.dot(Ru),m=ls.dot(Ru);if(m>=0&&p<=m)return n.copy(s);const x=p*c-l*m;if(x<=0&&c>=0&&m<=0)return a=c/(c-m),n.copy(i).addScaledVector(ls,a);const g=u*m-p*f;if(g<=0&&f-u>=0&&p-m>=0)return Tm.subVectors(s,r),a=(f-u)/(f-u+(p-m)),n.copy(r).addScaledVector(Tm,a);const d=1/(g+x+h);return o=x*d,a=h*d,n.copy(i).addScaledVector(as,o).addScaledVector(ls,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const p_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fi={h:0,s:0,l:0},Xa={h:0,s:0,l:0};function Pu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ke{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=st.workingColorSpace){return this.r=e,this.g=n,this.b=i,st.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=st.workingColorSpace){if(e=sE(e,1),n=Xt(n,0,1),i=Xt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Pu(o,s,e+1/3),this.g=Pu(o,s,e),this.b=Pu(o,s,e-1/3)}return st.toWorkingColorSpace(this,r),this}setStyle(e,n=Wt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Wt){const i=p_[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ks(e.r),this.g=ks(e.g),this.b=ks(e.b),this}copyLinearToSRGB(e){return this.r=_u(e.r),this.g=_u(e.g),this.b=_u(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wt){return st.fromWorkingColorSpace(Jt.copy(this),e),Math.round(Xt(Jt.r*255,0,255))*65536+Math.round(Xt(Jt.g*255,0,255))*256+Math.round(Xt(Jt.b*255,0,255))}getHexString(e=Wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=st.workingColorSpace){st.fromWorkingColorSpace(Jt.copy(this),n);const i=Jt.r,r=Jt.g,s=Jt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=st.workingColorSpace){return st.fromWorkingColorSpace(Jt.copy(this),n),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=Wt){st.fromWorkingColorSpace(Jt.copy(this),e);const n=Jt.r,i=Jt.g,r=Jt.b;return e!==Wt?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Fi),this.setHSL(Fi.h+e,Fi.s+n,Fi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Fi),e.getHSL(Xa);const i=gu(Fi.h,Xa.h,n),r=gu(Fi.s,Xa.s,n),s=gu(Fi.l,Xa.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new Ke;Ke.NAMES=p_;let SE=0;class io extends qr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:SE++}),this.uuid=no(),this.name="",this.type="Material",this.blending=zs,this.side=ur,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jf,this.blendDst=Xf,this.blendEquation=Ar,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=ec,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=es,this.stencilZFail=es,this.stencilZPass=es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==zs&&(i.blending=this.blending),this.side!==ur&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==jf&&(i.blendSrc=this.blendSrc),this.blendDst!==Xf&&(i.blendDst=this.blendDst),this.blendEquation!==Ar&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ec&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==es&&(i.stencilFail=this.stencilFail),this.stencilZFail!==es&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==es&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ks extends io{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Qv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bt=new L,Ya=new ce;class li{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=dm,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=qi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ya.fromBufferAttribute(this,n),Ya.applyMatrix3(e),this.setXY(n,Ya.x,Ya.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)bt.fromBufferAttribute(this,n),bt.applyMatrix3(e),this.setXYZ(n,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)bt.fromBufferAttribute(this,n),bt.applyMatrix4(e),this.setXYZ(n,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)bt.fromBufferAttribute(this,n),bt.applyNormalMatrix(e),this.setXYZ(n,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)bt.fromBufferAttribute(this,n),bt.transformDirection(e),this.setXYZ(n,bt.x,bt.y,bt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=mo(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=dn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=mo(n,this.array)),n}setX(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=mo(n,this.array)),n}setY(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=mo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=mo(n,this.array)),n}setW(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array),r=dn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array),r=dn(r,this.array),s=dn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==dm&&(e.usage=this.usage),e}}class m_ extends li{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class g_ extends li{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class it extends li{constructor(e,n,i){super(new Float32Array(e),n,i)}}let ME=0;const Pn=new pt,Lu=new wt,cs=new L,Sn=new fr,xo=new fr,Ft=new L;class Gt extends qr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ME++}),this.uuid=no(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(u_(e)?g_:m_)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new qe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Pn.makeRotationFromQuaternion(e),this.applyMatrix4(Pn),this}rotateX(e){return Pn.makeRotationX(e),this.applyMatrix4(Pn),this}rotateY(e){return Pn.makeRotationY(e),this.applyMatrix4(Pn),this}rotateZ(e){return Pn.makeRotationZ(e),this.applyMatrix4(Pn),this}translate(e,n,i){return Pn.makeTranslation(e,n,i),this.applyMatrix4(Pn),this}scale(e,n,i){return Pn.makeScale(e,n,i),this.applyMatrix4(Pn),this}lookAt(e){return Lu.lookAt(e),Lu.updateMatrix(),this.applyMatrix4(Lu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new it(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ac);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];xo.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(Sn.min,xo.min),Sn.expandByPoint(Ft),Ft.addVectors(Sn.max,xo.max),Sn.expandByPoint(Ft)):(Sn.expandByPoint(xo.min),Sn.expandByPoint(xo.max))}Sn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Ft.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ft));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ft.fromBufferAttribute(a,c),l&&(cs.fromBufferAttribute(e,c),Ft.add(cs)),r=Math.max(r,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=n.position.array,s=n.normal.array,o=n.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new li(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let w=0;w<a;w++)c[w]=new L,u[w]=new L;const f=new L,h=new L,p=new L,m=new ce,x=new ce,g=new ce,d=new L,_=new L;function v(w,z,V){f.fromArray(r,w*3),h.fromArray(r,z*3),p.fromArray(r,V*3),m.fromArray(o,w*2),x.fromArray(o,z*2),g.fromArray(o,V*2),h.sub(f),p.sub(f),x.sub(m),g.sub(m);const N=1/(x.x*g.y-g.x*x.y);isFinite(N)&&(d.copy(h).multiplyScalar(g.y).addScaledVector(p,-x.y).multiplyScalar(N),_.copy(p).multiplyScalar(x.x).addScaledVector(h,-g.x).multiplyScalar(N),c[w].add(d),c[z].add(d),c[V].add(d),u[w].add(_),u[z].add(_),u[V].add(_))}let y=this.groups;y.length===0&&(y=[{start:0,count:i.length}]);for(let w=0,z=y.length;w<z;++w){const V=y[w],N=V.start,R=V.count;for(let U=N,H=N+R;U<H;U+=3)v(i[U+0],i[U+1],i[U+2])}const C=new L,T=new L,A=new L,D=new L;function M(w){A.fromArray(s,w*3),D.copy(A);const z=c[w];C.copy(z),C.sub(A.multiplyScalar(A.dot(z))).normalize(),T.crossVectors(D,z);const N=T.dot(u[w])<0?-1:1;l[w*4]=C.x,l[w*4+1]=C.y,l[w*4+2]=C.z,l[w*4+3]=N}for(let w=0,z=y.length;w<z;++w){const V=y[w],N=V.start,R=V.count;for(let U=N,H=N+R;U<H;U+=3)M(i[U+0]),M(i[U+1]),M(i[U+2])}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new li(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new L,s=new L,o=new L,a=new L,l=new L,c=new L,u=new L,f=new L;if(e)for(let h=0,p=e.count;h<p;h+=3){const m=e.getX(h+0),x=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(n,m),s.fromBufferAttribute(n,x),o.fromBufferAttribute(n,g),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ft.fromBufferAttribute(e,n),Ft.normalize(),e.setXYZ(n,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let p=0,m=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*u;for(let d=0;d<u;d++)h[m++]=c[p++]}return new li(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Gt,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=e(h,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Am=new pt,xr=new bc,$a=new Ac,bm=new L,us=new L,fs=new L,ds=new L,Nu=new L,qa=new L,Za=new ce,Ka=new ce,Qa=new ce,Cm=new L,Rm=new L,Pm=new L,Ja=new L,el=new L;class ge extends wt{constructor(e=new Gt,n=new Ks){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){qa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(Nu.fromBufferAttribute(f,e),o?qa.addScaledVector(Nu,u):qa.addScaledVector(Nu.sub(n),u))}n.add(qa)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),$a.copy(i.boundingSphere),$a.applyMatrix4(s),xr.copy(e.ray).recast(e.near),!($a.containsPoint(xr.origin)===!1&&(xr.intersectSphere($a,bm)===null||xr.origin.distanceToSquared(bm)>(e.far-e.near)**2))&&(Am.copy(s).invert(),xr.copy(e.ray).applyMatrix4(Am),!(i.boundingBox!==null&&xr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,xr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=h.length;m<x;m++){const g=h[m],d=o[g.materialIndex],_=Math.max(g.start,p.start),v=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let y=_,C=v;y<C;y+=3){const T=a.getX(y),A=a.getX(y+1),D=a.getX(y+2);r=tl(this,d,e,i,c,u,f,T,A,D),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let g=m,d=x;g<d;g+=3){const _=a.getX(g),v=a.getX(g+1),y=a.getX(g+2);r=tl(this,o,e,i,c,u,f,_,v,y),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,x=h.length;m<x;m++){const g=h[m],d=o[g.materialIndex],_=Math.max(g.start,p.start),v=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let y=_,C=v;y<C;y+=3){const T=y,A=y+1,D=y+2;r=tl(this,d,e,i,c,u,f,T,A,D),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let g=m,d=x;g<d;g+=3){const _=g,v=g+1,y=g+2;r=tl(this,o,e,i,c,u,f,_,v,y),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function EE(t,e,n,i,r,s,o,a){let l;if(e.side===_n?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===ur,a),l===null)return null;el.copy(a),el.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(el);return c<n.near||c>n.far?null:{distance:c,point:el.clone(),object:t}}function tl(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,us),t.getVertexPosition(l,fs),t.getVertexPosition(c,ds);const u=EE(t,e,n,i,us,fs,ds,Ja);if(u){r&&(Za.fromBufferAttribute(r,a),Ka.fromBufferAttribute(r,l),Qa.fromBufferAttribute(r,c),u.uv=In.getInterpolation(Ja,us,fs,ds,Za,Ka,Qa,new ce)),s&&(Za.fromBufferAttribute(s,a),Ka.fromBufferAttribute(s,l),Qa.fromBufferAttribute(s,c),u.uv1=In.getInterpolation(Ja,us,fs,ds,Za,Ka,Qa,new ce),u.uv2=u.uv1),o&&(Cm.fromBufferAttribute(o,a),Rm.fromBufferAttribute(o,l),Pm.fromBufferAttribute(o,c),u.normal=In.getInterpolation(Ja,us,fs,ds,Cm,Rm,Pm,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new L,materialIndex:0};In.getNormal(us,fs,ds,f.normal),u.face=f}return u}class lt extends Gt{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,p=0;m("z","y","x",-1,-1,i,n,e,o,s,0),m("z","y","x",1,-1,i,n,-e,o,s,1),m("x","z","y",1,1,e,i,n,r,o,2),m("x","z","y",1,-1,e,i,-n,r,o,3),m("x","y","z",1,-1,e,n,i,r,s,4),m("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new it(c,3)),this.setAttribute("normal",new it(u,3)),this.setAttribute("uv",new it(f,2));function m(x,g,d,_,v,y,C,T,A,D,M){const w=y/A,z=C/D,V=y/2,N=C/2,R=T/2,U=A+1,H=D+1;let W=0,O=0;const F=new L;for(let G=0;G<H;G++){const q=G*z-N;for(let X=0;X<U;X++){const j=X*w-V;F[x]=j*_,F[g]=q*v,F[d]=R,c.push(F.x,F.y,F.z),F[x]=0,F[g]=0,F[d]=T>0?1:-1,u.push(F.x,F.y,F.z),f.push(X/A),f.push(1-G/D),W+=1}}for(let G=0;G<D;G++)for(let q=0;q<A;q++){const X=h+q+U*G,j=h+q+U*(G+1),K=h+(q+1)+U*(G+1),fe=h+(q+1)+U*G;l.push(X,j,fe),l.push(j,K,fe),O+=6}a.addGroup(p,O,M),p+=O,h+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Qs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function on(t){const e={};for(let n=0;n<t.length;n++){const i=Qs(t[n]);for(const r in i)e[r]=i[r]}return e}function wE(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function v_(t){return t.getRenderTarget()===null?t.outputColorSpace:st.workingColorSpace}const TE={clone:Qs,merge:on};var AE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class jr extends io{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=AE,this.fragmentShader=bE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qs(e.uniforms),this.uniformsGroups=wE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class __ extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=Ei}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Un extends __{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Qf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qf*2*Math.atan(Math.tan(zo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(zo*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const hs=-90,ps=1;class CE extends wt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Un(hs,ps,e,n);r.layers=this.layers,this.add(r);const s=new Un(hs,ps,e,n);s.layers=this.layers,this.add(s);const o=new Un(hs,ps,e,n);o.layers=this.layers,this.add(o);const a=new Un(hs,ps,e,n);a.layers=this.layers,this.add(a);const l=new Un(hs,ps,e,n);l.layers=this.layers,this.add(l);const c=new Un(hs,ps,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===Ei)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===rc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(n,u),e.setRenderTarget(f,h,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class x_ extends Tn{constructor(e,n,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],n=n!==void 0?n:$s,super(e,n,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class RE extends Wr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];n.encoding!==void 0&&(ko("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Fr?Wt:Fn),this.texture=new x_(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Dn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new lt(5,5,5),s=new jr({name:"CubemapFromEquirect",uniforms:Qs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:_n,blending:sr});s.uniforms.tEquirect.value=n;const o=new ge(r,s),a=n.minFilter;return n.minFilter===oa&&(n.minFilter=Dn),new CE(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const Du=new L,PE=new L,LE=new qe;class Vi{constructor(e=new L(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Du.subVectors(i,n).cross(PE.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Du),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||LE.getNormalMatrix(e),r=this.coplanarPoint(Du).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yr=new Ac,nl=new L;class ih{constructor(e=new Vi,n=new Vi,i=new Vi,r=new Vi,s=new Vi,o=new Vi){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Ei){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],f=r[6],h=r[7],p=r[8],m=r[9],x=r[10],g=r[11],d=r[12],_=r[13],v=r[14],y=r[15];if(i[0].setComponents(l-s,h-c,g-p,y-d).normalize(),i[1].setComponents(l+s,h+c,g+p,y+d).normalize(),i[2].setComponents(l+o,h+u,g+m,y+_).normalize(),i[3].setComponents(l-o,h-u,g-m,y-_).normalize(),i[4].setComponents(l-a,h-f,g-x,y-v).normalize(),n===Ei)i[5].setComponents(l+a,h+f,g+x,y+v).normalize();else if(n===rc)i[5].setComponents(a,f,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),yr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yr)}intersectsSprite(e){return yr.center.set(0,0,0),yr.radius=.7071067811865476,yr.applyMatrix4(e.matrixWorld),this.intersectsSphere(yr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(nl.x=r.normal.x>0?e.max.x:e.min.x,nl.y=r.normal.y>0?e.max.y:e.min.y,nl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(nl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function y_(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function NE(t,e){const n=e.isWebGL2,i=new WeakMap;function r(c,u){const f=c.array,h=c.usage,p=f.byteLength,m=t.createBuffer();t.bindBuffer(u,m),t.bufferData(u,f,h),c.onUploadCallback();let x;if(f instanceof Float32Array)x=t.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(n)x=t.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=t.UNSIGNED_SHORT;else if(f instanceof Int16Array)x=t.SHORT;else if(f instanceof Uint32Array)x=t.UNSIGNED_INT;else if(f instanceof Int32Array)x=t.INT;else if(f instanceof Int8Array)x=t.BYTE;else if(f instanceof Uint8Array)x=t.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)x=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:m,type:x,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,u,f){const h=u.array,p=u._updateRange,m=u.updateRanges;if(t.bindBuffer(f,c),p.count===-1&&m.length===0&&t.bufferSubData(f,0,h),m.length!==0){for(let x=0,g=m.length;x<g;x++){const d=m[x];n?t.bufferSubData(f,d.start*h.BYTES_PER_ELEMENT,h,d.start,d.count):t.bufferSubData(f,d.start*h.BYTES_PER_ELEMENT,h.subarray(d.start,d.start+d.count))}u.clearUpdateRanges()}p.count!==-1&&(n?t.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):t.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(t.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=i.get(c);(!h||h.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);if(f===void 0)i.set(c,r(c,u));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,u),f.version=c.version}}return{get:o,remove:a,update:l}}class va extends Gt{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,h=n/l,p=[],m=[],x=[],g=[];for(let d=0;d<u;d++){const _=d*h-o;for(let v=0;v<c;v++){const y=v*f-s;m.push(y,-_,0),x.push(0,0,1),g.push(v/a),g.push(1-d/l)}}for(let d=0;d<l;d++)for(let _=0;_<a;_++){const v=_+c*d,y=_+c*(d+1),C=_+1+c*(d+1),T=_+1+c*d;p.push(v,y,T),p.push(y,C,T)}this.setIndex(p),this.setAttribute("position",new it(m,3)),this.setAttribute("normal",new it(x,3)),this.setAttribute("uv",new it(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new va(e.width,e.height,e.widthSegments,e.heightSegments)}}var DE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,IE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,UE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,OE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,FE=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,zE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,BE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,HE=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,GE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,VE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,WE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,XE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,YE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$E=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,qE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ZE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,KE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,QE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,JE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ew=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,tw=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,nw=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,iw=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,rw=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,sw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ow=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,aw=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lw=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cw="gl_FragColor = linearToOutputTexel( gl_FragColor );",uw=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,fw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,dw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hw=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,pw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_w=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yw=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Sw=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Mw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ew=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ww=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tw=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Aw=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,bw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cw=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pw=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lw=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Nw=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Dw=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Iw=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Uw=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ow=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Fw=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zw=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,kw=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Bw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Vw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ww=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xw=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,$w=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,qw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Zw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Kw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,t1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,n1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,i1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,r1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,s1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,o1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,a1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,l1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,c1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,u1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,f1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,d1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,h1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,p1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,m1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,g1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,v1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,_1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,x1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,y1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,S1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,M1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,E1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,T1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,A1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,b1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,C1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,R1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,P1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,L1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const N1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,D1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,U1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,k1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,B1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,H1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,G1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,V1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,j1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,X1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Y1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,q1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,K1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,J1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,eT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,iT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,aT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,uT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:DE,alphahash_pars_fragment:IE,alphamap_fragment:UE,alphamap_pars_fragment:OE,alphatest_fragment:FE,alphatest_pars_fragment:zE,aomap_fragment:kE,aomap_pars_fragment:BE,batching_pars_vertex:HE,batching_vertex:GE,begin_vertex:VE,beginnormal_vertex:WE,bsdfs:jE,iridescence_fragment:XE,bumpmap_pars_fragment:YE,clipping_planes_fragment:$E,clipping_planes_pars_fragment:qE,clipping_planes_pars_vertex:ZE,clipping_planes_vertex:KE,color_fragment:QE,color_pars_fragment:JE,color_pars_vertex:ew,color_vertex:tw,common:nw,cube_uv_reflection_fragment:iw,defaultnormal_vertex:rw,displacementmap_pars_vertex:sw,displacementmap_vertex:ow,emissivemap_fragment:aw,emissivemap_pars_fragment:lw,colorspace_fragment:cw,colorspace_pars_fragment:uw,envmap_fragment:fw,envmap_common_pars_fragment:dw,envmap_pars_fragment:hw,envmap_pars_vertex:pw,envmap_physical_pars_fragment:Aw,envmap_vertex:mw,fog_vertex:gw,fog_pars_vertex:vw,fog_fragment:_w,fog_pars_fragment:xw,gradientmap_pars_fragment:yw,lightmap_fragment:Sw,lightmap_pars_fragment:Mw,lights_lambert_fragment:Ew,lights_lambert_pars_fragment:ww,lights_pars_begin:Tw,lights_toon_fragment:bw,lights_toon_pars_fragment:Cw,lights_phong_fragment:Rw,lights_phong_pars_fragment:Pw,lights_physical_fragment:Lw,lights_physical_pars_fragment:Nw,lights_fragment_begin:Dw,lights_fragment_maps:Iw,lights_fragment_end:Uw,logdepthbuf_fragment:Ow,logdepthbuf_pars_fragment:Fw,logdepthbuf_pars_vertex:zw,logdepthbuf_vertex:kw,map_fragment:Bw,map_pars_fragment:Hw,map_particle_fragment:Gw,map_particle_pars_fragment:Vw,metalnessmap_fragment:Ww,metalnessmap_pars_fragment:jw,morphcolor_vertex:Xw,morphnormal_vertex:Yw,morphtarget_pars_vertex:$w,morphtarget_vertex:qw,normal_fragment_begin:Zw,normal_fragment_maps:Kw,normal_pars_fragment:Qw,normal_pars_vertex:Jw,normal_vertex:e1,normalmap_pars_fragment:t1,clearcoat_normal_fragment_begin:n1,clearcoat_normal_fragment_maps:i1,clearcoat_pars_fragment:r1,iridescence_pars_fragment:s1,opaque_fragment:o1,packing:a1,premultiplied_alpha_fragment:l1,project_vertex:c1,dithering_fragment:u1,dithering_pars_fragment:f1,roughnessmap_fragment:d1,roughnessmap_pars_fragment:h1,shadowmap_pars_fragment:p1,shadowmap_pars_vertex:m1,shadowmap_vertex:g1,shadowmask_pars_fragment:v1,skinbase_vertex:_1,skinning_pars_vertex:x1,skinning_vertex:y1,skinnormal_vertex:S1,specularmap_fragment:M1,specularmap_pars_fragment:E1,tonemapping_fragment:w1,tonemapping_pars_fragment:T1,transmission_fragment:A1,transmission_pars_fragment:b1,uv_pars_fragment:C1,uv_pars_vertex:R1,uv_vertex:P1,worldpos_vertex:L1,background_vert:N1,background_frag:D1,backgroundCube_vert:I1,backgroundCube_frag:U1,cube_vert:O1,cube_frag:F1,depth_vert:z1,depth_frag:k1,distanceRGBA_vert:B1,distanceRGBA_frag:H1,equirect_vert:G1,equirect_frag:V1,linedashed_vert:W1,linedashed_frag:j1,meshbasic_vert:X1,meshbasic_frag:Y1,meshlambert_vert:$1,meshlambert_frag:q1,meshmatcap_vert:Z1,meshmatcap_frag:K1,meshnormal_vert:Q1,meshnormal_frag:J1,meshphong_vert:eT,meshphong_frag:tT,meshphysical_vert:nT,meshphysical_frag:iT,meshtoon_vert:rT,meshtoon_frag:sT,points_vert:oT,points_frag:aT,shadow_vert:lT,shadow_frag:cT,sprite_vert:uT,sprite_frag:fT},_e={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},ri={basic:{uniforms:on([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:on([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:on([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:on([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:on([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:on([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:on([_e.points,_e.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:on([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:on([_e.common,_e.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:on([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:on([_e.sprite,_e.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:on([_e.common,_e.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:on([_e.lights,_e.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};ri.physical={uniforms:on([ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const il={r:0,b:0,g:0};function dT(t,e,n,i,r,s,o){const a=new Ke(0);let l=s===!0?0:1,c,u,f=null,h=0,p=null;function m(g,d){let _=!1,v=d.isScene===!0?d.background:null;v&&v.isTexture&&(v=(d.backgroundBlurriness>0?n:e).get(v)),v===null?x(a,l):v&&v.isColor&&(x(v,1),_=!0);const y=t.xr.getEnvironmentBlendMode();y==="additive"?i.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||_)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),v&&(v.isCubeTexture||v.mapping===wc)?(u===void 0&&(u=new ge(new lt(1,1,1),new jr({name:"BackgroundCubeMaterial",uniforms:Qs(ri.backgroundCube.uniforms),vertexShader:ri.backgroundCube.vertexShader,fragmentShader:ri.backgroundCube.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=st.getTransfer(v.colorSpace)!==ft,(f!==v||h!==v.version||p!==t.toneMapping)&&(u.material.needsUpdate=!0,f=v,h=v.version,p=t.toneMapping),u.layers.enableAll(),g.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new ge(new va(2,2),new jr({name:"BackgroundMaterial",uniforms:Qs(ri.background.uniforms),vertexShader:ri.background.vertexShader,fragmentShader:ri.background.fragmentShader,side:ur,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=st.getTransfer(v.colorSpace)!==ft,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||h!==v.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,f=v,h=v.version,p=t.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null))}function x(g,d){g.getRGB(il,v_(t)),i.buffers.color.setClear(il.r,il.g,il.b,d,o)}return{getClearColor:function(){return a},setClearColor:function(g,d=1){a.set(g),l=d,x(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,x(a,l)},render:m}}function hT(t,e,n,i){const r=t.getParameter(t.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=g(null);let c=l,u=!1;function f(R,U,H,W,O){let F=!1;if(o){const G=x(W,H,U);c!==G&&(c=G,p(c.object)),F=d(R,W,H,O),F&&_(R,W,H,O)}else{const G=U.wireframe===!0;(c.geometry!==W.id||c.program!==H.id||c.wireframe!==G)&&(c.geometry=W.id,c.program=H.id,c.wireframe=G,F=!0)}O!==null&&n.update(O,t.ELEMENT_ARRAY_BUFFER),(F||u)&&(u=!1,D(R,U,H,W),O!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(O).buffer))}function h(){return i.isWebGL2?t.createVertexArray():s.createVertexArrayOES()}function p(R){return i.isWebGL2?t.bindVertexArray(R):s.bindVertexArrayOES(R)}function m(R){return i.isWebGL2?t.deleteVertexArray(R):s.deleteVertexArrayOES(R)}function x(R,U,H){const W=H.wireframe===!0;let O=a[R.id];O===void 0&&(O={},a[R.id]=O);let F=O[U.id];F===void 0&&(F={},O[U.id]=F);let G=F[W];return G===void 0&&(G=g(h()),F[W]=G),G}function g(R){const U=[],H=[],W=[];for(let O=0;O<r;O++)U[O]=0,H[O]=0,W[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:H,attributeDivisors:W,object:R,attributes:{},index:null}}function d(R,U,H,W){const O=c.attributes,F=U.attributes;let G=0;const q=H.getAttributes();for(const X in q)if(q[X].location>=0){const K=O[X];let fe=F[X];if(fe===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(fe=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(fe=R.instanceColor)),K===void 0||K.attribute!==fe||fe&&K.data!==fe.data)return!0;G++}return c.attributesNum!==G||c.index!==W}function _(R,U,H,W){const O={},F=U.attributes;let G=0;const q=H.getAttributes();for(const X in q)if(q[X].location>=0){let K=F[X];K===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(K=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(K=R.instanceColor));const fe={};fe.attribute=K,K&&K.data&&(fe.data=K.data),O[X]=fe,G++}c.attributes=O,c.attributesNum=G,c.index=W}function v(){const R=c.newAttributes;for(let U=0,H=R.length;U<H;U++)R[U]=0}function y(R){C(R,0)}function C(R,U){const H=c.newAttributes,W=c.enabledAttributes,O=c.attributeDivisors;H[R]=1,W[R]===0&&(t.enableVertexAttribArray(R),W[R]=1),O[R]!==U&&((i.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,U),O[R]=U)}function T(){const R=c.newAttributes,U=c.enabledAttributes;for(let H=0,W=U.length;H<W;H++)U[H]!==R[H]&&(t.disableVertexAttribArray(H),U[H]=0)}function A(R,U,H,W,O,F,G){G===!0?t.vertexAttribIPointer(R,U,H,O,F):t.vertexAttribPointer(R,U,H,W,O,F)}function D(R,U,H,W){if(i.isWebGL2===!1&&(R.isInstancedMesh||W.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const O=W.attributes,F=H.getAttributes(),G=U.defaultAttributeValues;for(const q in F){const X=F[q];if(X.location>=0){let j=O[q];if(j===void 0&&(q==="instanceMatrix"&&R.instanceMatrix&&(j=R.instanceMatrix),q==="instanceColor"&&R.instanceColor&&(j=R.instanceColor)),j!==void 0){const K=j.normalized,fe=j.itemSize,Me=n.get(j);if(Me===void 0)continue;const ye=Me.buffer,Ne=Me.type,Fe=Me.bytesPerElement,Ae=i.isWebGL2===!0&&(Ne===t.INT||Ne===t.UNSIGNED_INT||j.gpuType===e_);if(j.isInterleavedBufferAttribute){const ze=j.data,k=ze.stride,de=j.offset;if(ze.isInstancedInterleavedBuffer){for(let ee=0;ee<X.locationSize;ee++)C(X.location+ee,ze.meshPerAttribute);R.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ze.meshPerAttribute*ze.count)}else for(let ee=0;ee<X.locationSize;ee++)y(X.location+ee);t.bindBuffer(t.ARRAY_BUFFER,ye);for(let ee=0;ee<X.locationSize;ee++)A(X.location+ee,fe/X.locationSize,Ne,K,k*Fe,(de+fe/X.locationSize*ee)*Fe,Ae)}else{if(j.isInstancedBufferAttribute){for(let ze=0;ze<X.locationSize;ze++)C(X.location+ze,j.meshPerAttribute);R.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ze=0;ze<X.locationSize;ze++)y(X.location+ze);t.bindBuffer(t.ARRAY_BUFFER,ye);for(let ze=0;ze<X.locationSize;ze++)A(X.location+ze,fe/X.locationSize,Ne,K,fe*Fe,fe/X.locationSize*ze*Fe,Ae)}}else if(G!==void 0){const K=G[q];if(K!==void 0)switch(K.length){case 2:t.vertexAttrib2fv(X.location,K);break;case 3:t.vertexAttrib3fv(X.location,K);break;case 4:t.vertexAttrib4fv(X.location,K);break;default:t.vertexAttrib1fv(X.location,K)}}}}T()}function M(){V();for(const R in a){const U=a[R];for(const H in U){const W=U[H];for(const O in W)m(W[O].object),delete W[O];delete U[H]}delete a[R]}}function w(R){if(a[R.id]===void 0)return;const U=a[R.id];for(const H in U){const W=U[H];for(const O in W)m(W[O].object),delete W[O];delete U[H]}delete a[R.id]}function z(R){for(const U in a){const H=a[U];if(H[R.id]===void 0)continue;const W=H[R.id];for(const O in W)m(W[O].object),delete W[O];delete H[R.id]}}function V(){N(),u=!0,c!==l&&(c=l,p(c.object))}function N(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:V,resetDefaultState:N,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfProgram:z,initAttributes:v,enableAttribute:y,disableUnusedAttributes:T}}function pT(t,e,n,i){const r=i.isWebGL2;let s;function o(u){s=u}function a(u,f){t.drawArrays(s,u,f),n.update(f,s,1)}function l(u,f,h){if(h===0)return;let p,m;if(r)p=t,m="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](s,u,f,h),n.update(f,s,h)}function c(u,f,h){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<h;m++)this.render(u[m],f[m]);else{p.multiDrawArraysWEBGL(s,u,0,f,0,h);let m=0;for(let x=0;x<h;x++)m+=f[x];n.update(m,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function mT(t,e,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&t.constructor.name==="WebGL2RenderingContext";let a=n.precision!==void 0?n.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=n.logarithmicDepthBuffer===!0,f=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),h=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),x=t.getParameter(t.MAX_VERTEX_ATTRIBS),g=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),d=t.getParameter(t.MAX_VARYING_VECTORS),_=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),v=h>0,y=o||e.has("OES_texture_float"),C=v&&y,T=o?t.getParameter(t.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:m,maxAttributes:x,maxVertexUniforms:g,maxVaryings:d,maxFragmentUniforms:_,vertexTextures:v,floatFragmentTextures:y,floatVertexTextures:C,maxSamples:T}}function gT(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Vi,a=new qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||r;return r=h,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){n=u(f,h,0)},this.setState=function(f,h,p){const m=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,d=t.get(f);if(!r||m===null||m.length===0||s&&!g)s?u(null):c();else{const _=s?0:i,v=_*4;let y=d.clippingState||null;l.value=y,y=u(m,h,v,p);for(let C=0;C!==v;++C)y[C]=n[C];d.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,p,m){const x=f!==null?f.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const d=p+x*4,_=h.matrixWorldInverse;a.getNormalMatrix(_),(g===null||g.length<d)&&(g=new Float32Array(d));for(let v=0,y=p;v!==x;++v,y+=4)o.copy(f[v]).applyMatrix4(_,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function vT(t){let e=new WeakMap;function n(o,a){return a===Yf?o.mapping=$s:a===$f&&(o.mapping=qs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Yf||a===$f)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new RE(l.height/2);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class S_ extends __{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Cs=4,Lm=[.125,.215,.35,.446,.526,.582],br=20,Iu=new S_,Nm=new Ke;let Uu=null,Ou=0,Fu=0;const wr=(1+Math.sqrt(5))/2,ms=1/wr,Dm=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,wr,ms),new L(0,wr,-ms),new L(ms,0,wr),new L(-ms,0,wr),new L(wr,ms,0),new L(-wr,ms,0)];class Im{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){Uu=this._renderer.getRenderTarget(),Ou=this._renderer.getActiveCubeFace(),Fu=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Om(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Uu,Ou,Fu),e.scissorTest=!1,rl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===$s||e.mapping===qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Uu=this._renderer.getRenderTarget(),Ou=this._renderer.getActiveCubeFace(),Fu=this._renderer.getActiveMipmapLevel();const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Dn,minFilter:Dn,generateMipmaps:!1,type:aa,format:Zn,colorSpace:Pi,depthBuffer:!1},r=Um(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Um(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_T(s)),this._blurMaterial=xT(s,e,n)}return r}_compileMaterial(e){const n=new ge(this._lodPlanes[0],e);this._renderer.compile(n,Iu)}_sceneToCubeUV(e,n,i,r){const a=new Un(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Nm),u.toneMapping=or,u.autoClear=!1;const p=new Ks({name:"PMREM.Background",side:_n,depthWrite:!1,depthTest:!1}),m=new ge(new lt,p);let x=!1;const g=e.background;g?g.isColor&&(p.color.copy(g),e.background=null,x=!0):(p.color.copy(Nm),x=!0);for(let d=0;d<6;d++){const _=d%3;_===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):_===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const v=this._cubeSize;rl(r,_*v,d>2?v:0,v,v),u.setRenderTarget(r),x&&u.render(m,a),u.render(e,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===$s||e.mapping===qs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Om());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ge(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;rl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Iu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Dm[(r-1)%Dm.length];this._blur(e,r-1,r,s,o)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new ge(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*br-1),x=s/m,g=isFinite(s)?1+Math.floor(u*x):br;g>br&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${br}`);const d=[];let _=0;for(let A=0;A<br;++A){const D=A/x,M=Math.exp(-D*D/2);d.push(M),A===0?_+=M:A<g&&(_+=2*M)}for(let A=0;A<d.length;A++)d[A]=d[A]/_;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=d,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:v}=this;h.dTheta.value=m,h.mipInt.value=v-i;const y=this._sizeLods[r],C=3*y*(r>v-Cs?r-v+Cs:0),T=4*(this._cubeSize-y);rl(n,C,T,3*y,2*y),l.setRenderTarget(n),l.render(f,Iu)}}function _T(t){const e=[],n=[],i=[];let r=t;const s=t-Cs+1+Lm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-Cs?l=Lm[o-t+Cs-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,m=6,x=3,g=2,d=1,_=new Float32Array(x*m*p),v=new Float32Array(g*m*p),y=new Float32Array(d*m*p);for(let T=0;T<p;T++){const A=T%3*2/3-1,D=T>2?0:-1,M=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];_.set(M,x*m*T),v.set(h,g*m*T);const w=[T,T,T,T,T,T];y.set(w,d*m*T)}const C=new Gt;C.setAttribute("position",new li(_,x)),C.setAttribute("uv",new li(v,g)),C.setAttribute("faceIndex",new li(y,d)),e.push(C),r>Cs&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Um(t,e,n){const i=new Wr(t,e,n);return i.texture.mapping=wc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function rl(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function xT(t,e,n){const i=new Float32Array(br),r=new L(0,1,0);return new jr({name:"SphericalGaussianBlur",defines:{n:br,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:sr,depthTest:!1,depthWrite:!1})}function Om(){return new jr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:sr,depthTest:!1,depthWrite:!1})}function Fm(){return new jr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:sr,depthTest:!1,depthWrite:!1})}function rh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function yT(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Yf||l===$f,u=l===$s||l===qs;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return n===null&&(n=new Im(t)),f=c?n.fromEquirectangular(a,f):n.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(c&&f&&f.height>0||u&&f&&r(f)){n===null&&(n=new Im(t));const h=c?n.fromEquirectangular(a):n.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function ST(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function MT(t,e,n,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const m in h.attributes)e.remove(h.attributes[m]);for(const m in h.morphAttributes){const x=h.morphAttributes[m];for(let g=0,d=x.length;g<d;g++)e.remove(x[g])}h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function l(f){const h=f.attributes;for(const m in h)e.update(h[m],t.ARRAY_BUFFER);const p=f.morphAttributes;for(const m in p){const x=p[m];for(let g=0,d=x.length;g<d;g++)e.update(x[g],t.ARRAY_BUFFER)}}function c(f){const h=[],p=f.index,m=f.attributes.position;let x=0;if(p!==null){const _=p.array;x=p.version;for(let v=0,y=_.length;v<y;v+=3){const C=_[v+0],T=_[v+1],A=_[v+2];h.push(C,T,T,A,A,C)}}else if(m!==void 0){const _=m.array;x=m.version;for(let v=0,y=_.length/3-1;v<y;v+=3){const C=v+0,T=v+1,A=v+2;h.push(C,T,T,A,A,C)}}else return;const g=new(u_(h)?g_:m_)(h,1);g.version=x;const d=s.get(f);d&&e.remove(d),s.set(f,g)}function u(f){const h=s.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function ET(t,e,n,i){const r=i.isWebGL2;let s;function o(p){s=p}let a,l;function c(p){a=p.type,l=p.bytesPerElement}function u(p,m){t.drawElements(s,m,a,p*l),n.update(m,s,1)}function f(p,m,x){if(x===0)return;let g,d;if(r)g=t,d="drawElementsInstanced";else if(g=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",g===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[d](s,m,a,p*l,x),n.update(m,s,x)}function h(p,m,x){if(x===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let d=0;d<x;d++)this.render(p[d]/l,m[d]);else{g.multiDrawElementsWEBGL(s,m,0,a,p,0,x);let d=0;for(let _=0;_<x;_++)d+=m[_];n.update(d,s,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=f,this.renderMultiDraw=h}function wT(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function TT(t,e){return t[0]-e[0]}function AT(t,e){return Math.abs(e[1])-Math.abs(t[1])}function bT(t,e,n){const i={},r=new Float32Array(8),s=new WeakMap,o=new Bt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,f){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const m=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,x=m!==void 0?m.length:0;let g=s.get(u);if(g===void 0||g.count!==x){let U=function(){N.dispose(),s.delete(u),u.removeEventListener("dispose",U)};var p=U;g!==void 0&&g.texture.dispose();const v=u.morphAttributes.position!==void 0,y=u.morphAttributes.normal!==void 0,C=u.morphAttributes.color!==void 0,T=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],D=u.morphAttributes.color||[];let M=0;v===!0&&(M=1),y===!0&&(M=2),C===!0&&(M=3);let w=u.attributes.position.count*M,z=1;w>e.maxTextureSize&&(z=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const V=new Float32Array(w*z*4*x),N=new h_(V,w,z,x);N.type=qi,N.needsUpdate=!0;const R=M*4;for(let H=0;H<x;H++){const W=T[H],O=A[H],F=D[H],G=w*z*4*H;for(let q=0;q<W.count;q++){const X=q*R;v===!0&&(o.fromBufferAttribute(W,q),V[G+X+0]=o.x,V[G+X+1]=o.y,V[G+X+2]=o.z,V[G+X+3]=0),y===!0&&(o.fromBufferAttribute(O,q),V[G+X+4]=o.x,V[G+X+5]=o.y,V[G+X+6]=o.z,V[G+X+7]=0),C===!0&&(o.fromBufferAttribute(F,q),V[G+X+8]=o.x,V[G+X+9]=o.y,V[G+X+10]=o.z,V[G+X+11]=F.itemSize===4?o.w:1)}}g={count:x,texture:N,size:new ce(w,z)},s.set(u,g),u.addEventListener("dispose",U)}let d=0;for(let v=0;v<h.length;v++)d+=h[v];const _=u.morphTargetsRelative?1:1-d;f.getUniforms().setValue(t,"morphTargetBaseInfluence",_),f.getUniforms().setValue(t,"morphTargetInfluences",h),f.getUniforms().setValue(t,"morphTargetsTexture",g.texture,n),f.getUniforms().setValue(t,"morphTargetsTextureSize",g.size)}else{const m=h===void 0?0:h.length;let x=i[u.id];if(x===void 0||x.length!==m){x=[];for(let y=0;y<m;y++)x[y]=[y,0];i[u.id]=x}for(let y=0;y<m;y++){const C=x[y];C[0]=y,C[1]=h[y]}x.sort(AT);for(let y=0;y<8;y++)y<m&&x[y][1]?(a[y][0]=x[y][0],a[y][1]=x[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(TT);const g=u.morphAttributes.position,d=u.morphAttributes.normal;let _=0;for(let y=0;y<8;y++){const C=a[y],T=C[0],A=C[1];T!==Number.MAX_SAFE_INTEGER&&A?(g&&u.getAttribute("morphTarget"+y)!==g[T]&&u.setAttribute("morphTarget"+y,g[T]),d&&u.getAttribute("morphNormal"+y)!==d[T]&&u.setAttribute("morphNormal"+y,d[T]),r[y]=A,_+=A):(g&&u.hasAttribute("morphTarget"+y)===!0&&u.deleteAttribute("morphTarget"+y),d&&u.hasAttribute("morphNormal"+y)===!0&&u.deleteAttribute("morphNormal"+y),r[y]=0)}const v=u.morphTargetsRelative?1:1-_;f.getUniforms().setValue(t,"morphTargetBaseInfluence",v),f.getUniforms().setValue(t,"morphTargetInfluences",r)}}return{update:l}}function CT(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class M_ extends Tn{constructor(e,n,i,r,s,o,a,l,c,u){if(u=u!==void 0?u:Or,u!==Or&&u!==Zs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Or&&(i=$i),i===void 0&&u===Zs&&(i=Ur),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:ln,this.minFilter=l!==void 0?l:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const E_=new Tn,w_=new M_(1,1);w_.compareFunction=c_;const T_=new h_,A_=new dE,b_=new x_,zm=[],km=[],Bm=new Float32Array(16),Hm=new Float32Array(9),Gm=new Float32Array(4);function ro(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=zm[r];if(s===void 0&&(s=new Float32Array(r),zm[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Dt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function It(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Cc(t,e){let n=km[e];n===void 0&&(n=new Int32Array(e),km[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function RT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function PT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Dt(n,e))return;t.uniform2fv(this.addr,e),It(n,e)}}function LT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Dt(n,e))return;t.uniform3fv(this.addr,e),It(n,e)}}function NT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Dt(n,e))return;t.uniform4fv(this.addr,e),It(n,e)}}function DT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Dt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),It(n,e)}else{if(Dt(n,i))return;Gm.set(i),t.uniformMatrix2fv(this.addr,!1,Gm),It(n,i)}}function IT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Dt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),It(n,e)}else{if(Dt(n,i))return;Hm.set(i),t.uniformMatrix3fv(this.addr,!1,Hm),It(n,i)}}function UT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Dt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),It(n,e)}else{if(Dt(n,i))return;Bm.set(i),t.uniformMatrix4fv(this.addr,!1,Bm),It(n,i)}}function OT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function FT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Dt(n,e))return;t.uniform2iv(this.addr,e),It(n,e)}}function zT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Dt(n,e))return;t.uniform3iv(this.addr,e),It(n,e)}}function kT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Dt(n,e))return;t.uniform4iv(this.addr,e),It(n,e)}}function BT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function HT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Dt(n,e))return;t.uniform2uiv(this.addr,e),It(n,e)}}function GT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Dt(n,e))return;t.uniform3uiv(this.addr,e),It(n,e)}}function VT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Dt(n,e))return;t.uniform4uiv(this.addr,e),It(n,e)}}function WT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?w_:E_;n.setTexture2D(e||s,r)}function jT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||A_,r)}function XT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||b_,r)}function YT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||T_,r)}function $T(t){switch(t){case 5126:return RT;case 35664:return PT;case 35665:return LT;case 35666:return NT;case 35674:return DT;case 35675:return IT;case 35676:return UT;case 5124:case 35670:return OT;case 35667:case 35671:return FT;case 35668:case 35672:return zT;case 35669:case 35673:return kT;case 5125:return BT;case 36294:return HT;case 36295:return GT;case 36296:return VT;case 35678:case 36198:case 36298:case 36306:case 35682:return WT;case 35679:case 36299:case 36307:return jT;case 35680:case 36300:case 36308:case 36293:return XT;case 36289:case 36303:case 36311:case 36292:return YT}}function qT(t,e){t.uniform1fv(this.addr,e)}function ZT(t,e){const n=ro(e,this.size,2);t.uniform2fv(this.addr,n)}function KT(t,e){const n=ro(e,this.size,3);t.uniform3fv(this.addr,n)}function QT(t,e){const n=ro(e,this.size,4);t.uniform4fv(this.addr,n)}function JT(t,e){const n=ro(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function eA(t,e){const n=ro(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function tA(t,e){const n=ro(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function nA(t,e){t.uniform1iv(this.addr,e)}function iA(t,e){t.uniform2iv(this.addr,e)}function rA(t,e){t.uniform3iv(this.addr,e)}function sA(t,e){t.uniform4iv(this.addr,e)}function oA(t,e){t.uniform1uiv(this.addr,e)}function aA(t,e){t.uniform2uiv(this.addr,e)}function lA(t,e){t.uniform3uiv(this.addr,e)}function cA(t,e){t.uniform4uiv(this.addr,e)}function uA(t,e,n){const i=this.cache,r=e.length,s=Cc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||E_,s[o])}function fA(t,e,n){const i=this.cache,r=e.length,s=Cc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||A_,s[o])}function dA(t,e,n){const i=this.cache,r=e.length,s=Cc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||b_,s[o])}function hA(t,e,n){const i=this.cache,r=e.length,s=Cc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||T_,s[o])}function pA(t){switch(t){case 5126:return qT;case 35664:return ZT;case 35665:return KT;case 35666:return QT;case 35674:return JT;case 35675:return eA;case 35676:return tA;case 5124:case 35670:return nA;case 35667:case 35671:return iA;case 35668:case 35672:return rA;case 35669:case 35673:return sA;case 5125:return oA;case 36294:return aA;case 36295:return lA;case 36296:return cA;case 35678:case 36198:case 36298:case 36306:case 35682:return uA;case 35679:case 36299:case 36307:return fA;case 35680:case 36300:case 36308:case 36293:return dA;case 36289:case 36303:case 36311:case 36292:return hA}}class mA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=$T(n.type)}}class gA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=pA(n.type)}}class vA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const zu=/(\w+)(\])?(\[|\.)?/g;function Vm(t,e){t.seq.push(e),t.map[e.id]=e}function _A(t,e,n){const i=t.name,r=i.length;for(zu.lastIndex=0;;){const s=zu.exec(i),o=zu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Vm(n,c===void 0?new mA(a,t,e):new gA(a,t,e));break}else{let f=n.map[a];f===void 0&&(f=new vA(a),Vm(n,f)),n=f}}}class Cl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);_A(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function Wm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const xA=37297;let yA=0;function SA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function MA(t){const e=st.getPrimaries(st.workingColorSpace),n=st.getPrimaries(t);let i;switch(e===n?i="":e===ic&&n===nc?i="LinearDisplayP3ToLinearSRGB":e===nc&&n===ic&&(i="LinearSRGBToLinearDisplayP3"),t){case Pi:case Tc:return[i,"LinearTransferOETF"];case Wt:case th:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function jm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+SA(t.getShaderSource(e),o)}else return r}function EA(t,e){const n=MA(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function wA(t,e){let n;switch(e){case IM:n="Linear";break;case UM:n="Reinhard";break;case OM:n="OptimizedCineon";break;case FM:n="ACESFilmic";break;case kM:n="AgX";break;case zM:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function TA(t){return[t.extensionDerivatives||t.envMapCubeUVHeight||t.bumpMap||t.normalMapTangentSpace||t.clearcoatNormalMap||t.flatShading||t.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(t.extensionFragDepth||t.logarithmicDepthBuffer)&&t.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",t.extensionDrawBuffers&&t.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(t.extensionShaderTextureLOD||t.envMap||t.transmission)&&t.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Rs).join(`
`)}function AA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Rs).join(`
`)}function bA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function CA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function Rs(t){return t!==""}function Xm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ym(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const RA=/^[ \t]*#include +<([\w\d./]+)>/gm;function ed(t){return t.replace(RA,LA)}const PA=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function LA(t,e){let n=Ve[e];if(n===void 0){const i=PA.get(e);if(i!==void 0)n=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return ed(n)}const NA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $m(t){return t.replace(NA,DA)}function DA(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function qm(t){let e="precision "+t.precision+` float;
precision `+t.precision+" int;";return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function IA(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Kv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===lM?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===gi&&(e="SHADOWMAP_TYPE_VSM"),e}function UA(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case $s:case qs:e="ENVMAP_TYPE_CUBE";break;case wc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function OA(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case qs:e="ENVMAP_MODE_REFRACTION";break}return e}function FA(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Qv:e="ENVMAP_BLENDING_MULTIPLY";break;case NM:e="ENVMAP_BLENDING_MIX";break;case DM:e="ENVMAP_BLENDING_ADD";break}return e}function zA(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function kA(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=IA(n),c=UA(n),u=OA(n),f=FA(n),h=zA(n),p=n.isWebGL2?"":TA(n),m=AA(n),x=bA(s),g=r.createProgram();let d,_,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(Rs).join(`
`),d.length>0&&(d+=`
`),_=[p,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(Rs).join(`
`),_.length>0&&(_+=`
`)):(d=[qm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rs).join(`
`),_=[p,qm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==or?"#define TONE_MAPPING":"",n.toneMapping!==or?Ve.tonemapping_pars_fragment:"",n.toneMapping!==or?wA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,EA("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Rs).join(`
`)),o=ed(o),o=Xm(o,n),o=Ym(o,n),a=ed(a),a=Xm(a,n),a=Ym(a,n),o=$m(o),a=$m(a),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,d=[m,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,_=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===hm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===hm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const y=v+d+o,C=v+_+a,T=Wm(r,r.VERTEX_SHADER,y),A=Wm(r,r.FRAGMENT_SHADER,C);r.attachShader(g,T),r.attachShader(g,A),n.index0AttributeName!==void 0?r.bindAttribLocation(g,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function D(V){if(t.debug.checkShaderErrors){const N=r.getProgramInfoLog(g).trim(),R=r.getShaderInfoLog(T).trim(),U=r.getShaderInfoLog(A).trim();let H=!0,W=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(H=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,g,T,A);else{const O=jm(r,T,"vertex"),F=jm(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Program Info Log: `+N+`
`+O+`
`+F)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(R===""||U==="")&&(W=!1);W&&(V.diagnostics={runnable:H,programLog:N,vertexShader:{log:R,prefix:d},fragmentShader:{log:U,prefix:_}})}r.deleteShader(T),r.deleteShader(A),M=new Cl(r,g),w=CA(r,g)}let M;this.getUniforms=function(){return M===void 0&&D(this),M};let w;this.getAttributes=function(){return w===void 0&&D(this),w};let z=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=r.getProgramParameter(g,xA)),z},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=yA++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=T,this.fragmentShader=A,this}let BA=0;class HA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new GA(e),n.set(e,i)),i}}class GA{constructor(e){this.id=BA++,this.code=e,this.usedTimes=0}}function VA(t,e,n,i,r,s,o){const a=new nh,l=new HA,c=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return M===0?"uv":`uv${M}`}function g(M,w,z,V,N){const R=V.fog,U=N.geometry,H=M.isMeshStandardMaterial?V.environment:null,W=(M.isMeshStandardMaterial?n:e).get(M.envMap||H),O=W&&W.mapping===wc?W.image.height:null,F=m[M.type];M.precision!==null&&(p=r.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const G=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,q=G!==void 0?G.length:0;let X=0;U.morphAttributes.position!==void 0&&(X=1),U.morphAttributes.normal!==void 0&&(X=2),U.morphAttributes.color!==void 0&&(X=3);let j,K,fe,Me;if(F){const rn=ri[F];j=rn.vertexShader,K=rn.fragmentShader}else j=M.vertexShader,K=M.fragmentShader,l.update(M),fe=l.getVertexShaderID(M),Me=l.getFragmentShaderID(M);const ye=t.getRenderTarget(),Ne=N.isInstancedMesh===!0,Fe=N.isBatchedMesh===!0,Ae=!!M.map,ze=!!M.matcap,k=!!W,de=!!M.aoMap,ee=!!M.lightMap,le=!!M.bumpMap,te=!!M.normalMap,Ce=!!M.displacementMap,Se=!!M.emissiveMap,b=!!M.metalnessMap,E=!!M.roughnessMap,$=M.anisotropy>0,oe=M.clearcoat>0,ie=M.iridescence>0,ne=M.sheen>0,be=M.transmission>0,xe=$&&!!M.anisotropyMap,Ee=oe&&!!M.clearcoatMap,De=oe&&!!M.clearcoatNormalMap,Be=oe&&!!M.clearcoatRoughnessMap,re=ie&&!!M.iridescenceMap,Xe=ie&&!!M.iridescenceThicknessMap,I=ne&&!!M.sheenColorMap,se=ne&&!!M.sheenRoughnessMap,ve=!!M.specularMap,ue=!!M.specularColorMap,Re=!!M.specularIntensityMap,Ye=be&&!!M.transmissionMap,Qe=be&&!!M.thicknessMap,We=!!M.gradientMap,me=!!M.alphaMap,B=M.alphaTest>0,he=!!M.alphaHash,pe=!!M.extensions,Ie=!!U.attributes.uv1,Pe=!!U.attributes.uv2,et=!!U.attributes.uv3;let tt=or;return M.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(tt=t.toneMapping),{isWebGL2:u,shaderID:F,shaderType:M.type,shaderName:M.name,vertexShader:j,fragmentShader:K,defines:M.defines,customVertexShaderID:fe,customFragmentShaderID:Me,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Fe,instancing:Ne,instancingColor:Ne&&N.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:ye===null?t.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:Pi,map:Ae,matcap:ze,envMap:k,envMapMode:k&&W.mapping,envMapCubeUVHeight:O,aoMap:de,lightMap:ee,bumpMap:le,normalMap:te,displacementMap:h&&Ce,emissiveMap:Se,normalMapObjectSpace:te&&M.normalMapType===KM,normalMapTangentSpace:te&&M.normalMapType===l_,metalnessMap:b,roughnessMap:E,anisotropy:$,anisotropyMap:xe,clearcoat:oe,clearcoatMap:Ee,clearcoatNormalMap:De,clearcoatRoughnessMap:Be,iridescence:ie,iridescenceMap:re,iridescenceThicknessMap:Xe,sheen:ne,sheenColorMap:I,sheenRoughnessMap:se,specularMap:ve,specularColorMap:ue,specularIntensityMap:Re,transmission:be,transmissionMap:Ye,thicknessMap:Qe,gradientMap:We,opaque:M.transparent===!1&&M.blending===zs,alphaMap:me,alphaTest:B,alphaHash:he,combine:M.combine,mapUv:Ae&&x(M.map.channel),aoMapUv:de&&x(M.aoMap.channel),lightMapUv:ee&&x(M.lightMap.channel),bumpMapUv:le&&x(M.bumpMap.channel),normalMapUv:te&&x(M.normalMap.channel),displacementMapUv:Ce&&x(M.displacementMap.channel),emissiveMapUv:Se&&x(M.emissiveMap.channel),metalnessMapUv:b&&x(M.metalnessMap.channel),roughnessMapUv:E&&x(M.roughnessMap.channel),anisotropyMapUv:xe&&x(M.anisotropyMap.channel),clearcoatMapUv:Ee&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:De&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:re&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:Xe&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:I&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:se&&x(M.sheenRoughnessMap.channel),specularMapUv:ve&&x(M.specularMap.channel),specularColorMapUv:ue&&x(M.specularColorMap.channel),specularIntensityMapUv:Re&&x(M.specularIntensityMap.channel),transmissionMapUv:Ye&&x(M.transmissionMap.channel),thicknessMapUv:Qe&&x(M.thicknessMap.channel),alphaMapUv:me&&x(M.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(te||$),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:Ie,vertexUv2s:Pe,vertexUv3s:et,pointsUvs:N.isPoints===!0&&!!U.attributes.uv&&(Ae||me),fog:!!R,useFog:M.fog===!0,fogExp2:R&&R.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:N.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:X,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:t.shadowMap.enabled&&z.length>0,shadowMapType:t.shadowMap.type,toneMapping:tt,useLegacyLights:t._useLegacyLights,decodeVideoTexture:Ae&&M.map.isVideoTexture===!0&&st.getTransfer(M.map.colorSpace)===ft,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===On,flipSided:M.side===_n,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:pe&&M.extensions.derivatives===!0,extensionFragDepth:pe&&M.extensions.fragDepth===!0,extensionDrawBuffers:pe&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:pe&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:pe&&M.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function d(M){const w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(const z in M.defines)w.push(z),w.push(M.defines[z]);return M.isRawShaderMaterial===!1&&(_(w,M),v(w,M),w.push(t.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function _(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function v(M,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),M.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function y(M){const w=m[M.type];let z;if(w){const V=ri[w];z=TE.clone(V.uniforms)}else z=M.uniforms;return z}function C(M,w){let z;for(let V=0,N=c.length;V<N;V++){const R=c[V];if(R.cacheKey===w){z=R,++z.usedTimes;break}}return z===void 0&&(z=new kA(t,w,M,s),c.push(z)),z}function T(M){if(--M.usedTimes===0){const w=c.indexOf(M);c[w]=c[c.length-1],c.pop(),M.destroy()}}function A(M){l.remove(M)}function D(){l.dispose()}return{getParameters:g,getProgramCacheKey:d,getUniforms:y,acquireProgram:C,releaseProgram:T,releaseShaderCache:A,programs:c,dispose:D}}function WA(){let t=new WeakMap;function e(s){let o=t.get(s);return o===void 0&&(o={},t.set(s,o)),o}function n(s){t.delete(s)}function i(s,o,a){t.get(s)[o]=a}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function jA(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Zm(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Km(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(f,h,p,m,x,g){let d=t[e];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:m,renderOrder:f.renderOrder,z:x,group:g},t[e]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=m,d.renderOrder=f.renderOrder,d.z=x,d.group=g),e++,d}function a(f,h,p,m,x,g){const d=o(f,h,p,m,x,g);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):n.push(d)}function l(f,h,p,m,x,g){const d=o(f,h,p,m,x,g);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):n.unshift(d)}function c(f,h){n.length>1&&n.sort(f||jA),i.length>1&&i.sort(h||Zm),r.length>1&&r.sort(h||Zm)}function u(){for(let f=e,h=t.length;f<h;f++){const p=t[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function XA(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new Km,t.set(i,[o])):r>=s.length?(o=new Km,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function YA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new L,color:new Ke};break;case"SpotLight":n={position:new L,direction:new L,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new L,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":n={direction:new L,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":n={color:new Ke,position:new L,halfWidth:new L,halfHeight:new L};break}return t[e.id]=n,n}}}function $A(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let qA=0;function ZA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function KA(t,e){const n=new YA,i=$A(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new L);const s=new L,o=new pt,a=new pt;function l(u,f){let h=0,p=0,m=0;for(let V=0;V<9;V++)r.probe[V].set(0,0,0);let x=0,g=0,d=0,_=0,v=0,y=0,C=0,T=0,A=0,D=0,M=0;u.sort(ZA);const w=f===!0?Math.PI:1;for(let V=0,N=u.length;V<N;V++){const R=u[V],U=R.color,H=R.intensity,W=R.distance,O=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=U.r*H*w,p+=U.g*H*w,m+=U.b*H*w;else if(R.isLightProbe){for(let F=0;F<9;F++)r.probe[F].addScaledVector(R.sh.coefficients[F],H);M++}else if(R.isDirectionalLight){const F=n.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity*w),R.castShadow){const G=R.shadow,q=i.get(R);q.shadowBias=G.bias,q.shadowNormalBias=G.normalBias,q.shadowRadius=G.radius,q.shadowMapSize=G.mapSize,r.directionalShadow[x]=q,r.directionalShadowMap[x]=O,r.directionalShadowMatrix[x]=R.shadow.matrix,y++}r.directional[x]=F,x++}else if(R.isSpotLight){const F=n.get(R);F.position.setFromMatrixPosition(R.matrixWorld),F.color.copy(U).multiplyScalar(H*w),F.distance=W,F.coneCos=Math.cos(R.angle),F.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),F.decay=R.decay,r.spot[d]=F;const G=R.shadow;if(R.map&&(r.spotLightMap[A]=R.map,A++,G.updateMatrices(R),R.castShadow&&D++),r.spotLightMatrix[d]=G.matrix,R.castShadow){const q=i.get(R);q.shadowBias=G.bias,q.shadowNormalBias=G.normalBias,q.shadowRadius=G.radius,q.shadowMapSize=G.mapSize,r.spotShadow[d]=q,r.spotShadowMap[d]=O,T++}d++}else if(R.isRectAreaLight){const F=n.get(R);F.color.copy(U).multiplyScalar(H),F.halfWidth.set(R.width*.5,0,0),F.halfHeight.set(0,R.height*.5,0),r.rectArea[_]=F,_++}else if(R.isPointLight){const F=n.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity*w),F.distance=R.distance,F.decay=R.decay,R.castShadow){const G=R.shadow,q=i.get(R);q.shadowBias=G.bias,q.shadowNormalBias=G.normalBias,q.shadowRadius=G.radius,q.shadowMapSize=G.mapSize,q.shadowCameraNear=G.camera.near,q.shadowCameraFar=G.camera.far,r.pointShadow[g]=q,r.pointShadowMap[g]=O,r.pointShadowMatrix[g]=R.shadow.matrix,C++}r.point[g]=F,g++}else if(R.isHemisphereLight){const F=n.get(R);F.skyColor.copy(R.color).multiplyScalar(H*w),F.groundColor.copy(R.groundColor).multiplyScalar(H*w),r.hemi[v]=F,v++}}_>0&&(e.isWebGL2?t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=_e.LTC_FLOAT_1,r.rectAreaLTC2=_e.LTC_FLOAT_2):(r.rectAreaLTC1=_e.LTC_HALF_1,r.rectAreaLTC2=_e.LTC_HALF_2):t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=_e.LTC_FLOAT_1,r.rectAreaLTC2=_e.LTC_FLOAT_2):t.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=_e.LTC_HALF_1,r.rectAreaLTC2=_e.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=p,r.ambient[2]=m;const z=r.hash;(z.directionalLength!==x||z.pointLength!==g||z.spotLength!==d||z.rectAreaLength!==_||z.hemiLength!==v||z.numDirectionalShadows!==y||z.numPointShadows!==C||z.numSpotShadows!==T||z.numSpotMaps!==A||z.numLightProbes!==M)&&(r.directional.length=x,r.spot.length=d,r.rectArea.length=_,r.point.length=g,r.hemi.length=v,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=T+A-D,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=D,r.numLightProbes=M,z.directionalLength=x,z.pointLength=g,z.spotLength=d,z.rectAreaLength=_,z.hemiLength=v,z.numDirectionalShadows=y,z.numPointShadows=C,z.numSpotShadows=T,z.numSpotMaps=A,z.numLightProbes=M,r.version=qA++)}function c(u,f){let h=0,p=0,m=0,x=0,g=0;const d=f.matrixWorldInverse;for(let _=0,v=u.length;_<v;_++){const y=u[_];if(y.isDirectionalLight){const C=r.directional[h];C.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(d),h++}else if(y.isSpotLight){const C=r.spot[m];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(d),C.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(d),m++}else if(y.isRectAreaLight){const C=r.rectArea[x];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(d),a.identity(),o.copy(y.matrixWorld),o.premultiply(d),a.extractRotation(o),C.halfWidth.set(y.width*.5,0,0),C.halfHeight.set(0,y.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){const C=r.point[p];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(d),p++}else if(y.isHemisphereLight){const C=r.hemi[g];C.direction.setFromMatrixPosition(y.matrixWorld),C.direction.transformDirection(d),g++}}}return{setup:l,setupView:c,state:r}}function Qm(t,e){const n=new KA(t,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(f){i.push(f)}function a(f){r.push(f)}function l(f){n.setup(i,f)}function c(f){n.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function QA(t,e){let n=new WeakMap;function i(s,o=0){const a=n.get(s);let l;return a===void 0?(l=new Qm(t,e),n.set(s,[l])):o>=a.length?(l=new Qm(t,e),a.push(l)):l=a[o],l}function r(){n=new WeakMap}return{get:i,dispose:r}}class JA extends io{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class eb extends io{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const tb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ib(t,e,n){let i=new ih;const r=new ce,s=new ce,o=new Bt,a=new JA({depthPacking:ZM}),l=new eb,c={},u=n.maxTextureSize,f={[ur]:_n,[_n]:ur,[On]:On},h=new jr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:tb,fragmentShader:nb}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const m=new Gt;m.setAttribute("position",new li(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ge(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kv;let d=this.type;this.render=function(T,A,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const M=t.getRenderTarget(),w=t.getActiveCubeFace(),z=t.getActiveMipmapLevel(),V=t.state;V.setBlending(sr),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const N=d!==gi&&this.type===gi,R=d===gi&&this.type!==gi;for(let U=0,H=T.length;U<H;U++){const W=T[U],O=W.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;r.copy(O.mapSize);const F=O.getFrameExtents();if(r.multiply(F),s.copy(O.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/F.x),r.x=s.x*F.x,O.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/F.y),r.y=s.y*F.y,O.mapSize.y=s.y)),O.map===null||N===!0||R===!0){const q=this.type!==gi?{minFilter:ln,magFilter:ln}:{};O.map!==null&&O.map.dispose(),O.map=new Wr(r.x,r.y,q),O.map.texture.name=W.name+".shadowMap",O.camera.updateProjectionMatrix()}t.setRenderTarget(O.map),t.clear();const G=O.getViewportCount();for(let q=0;q<G;q++){const X=O.getViewport(q);o.set(s.x*X.x,s.y*X.y,s.x*X.z,s.y*X.w),V.viewport(o),O.updateMatrices(W,q),i=O.getFrustum(),y(A,D,O.camera,W,this.type)}O.isPointLightShadow!==!0&&this.type===gi&&_(O,D),O.needsUpdate=!1}d=this.type,g.needsUpdate=!1,t.setRenderTarget(M,w,z)};function _(T,A){const D=e.update(x);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Wr(r.x,r.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,t.setRenderTarget(T.mapPass),t.clear(),t.renderBufferDirect(A,null,D,h,x,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,t.setRenderTarget(T.map),t.clear(),t.renderBufferDirect(A,null,D,p,x,null)}function v(T,A,D,M){let w=null;const z=D.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(z!==void 0)w=z;else if(w=D.isPointLight===!0?l:a,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const V=w.uuid,N=A.uuid;let R=c[V];R===void 0&&(R={},c[V]=R);let U=R[N];U===void 0&&(U=w.clone(),R[N]=U,A.addEventListener("dispose",C)),w=U}if(w.visible=A.visible,w.wireframe=A.wireframe,M===gi?w.side=A.shadowSide!==null?A.shadowSide:A.side:w.side=A.shadowSide!==null?A.shadowSide:f[A.side],w.alphaMap=A.alphaMap,w.alphaTest=A.alphaTest,w.map=A.map,w.clipShadows=A.clipShadows,w.clippingPlanes=A.clippingPlanes,w.clipIntersection=A.clipIntersection,w.displacementMap=A.displacementMap,w.displacementScale=A.displacementScale,w.displacementBias=A.displacementBias,w.wireframeLinewidth=A.wireframeLinewidth,w.linewidth=A.linewidth,D.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const V=t.properties.get(w);V.light=D}return w}function y(T,A,D,M,w){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===gi)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,T.matrixWorld);const N=e.update(T),R=T.material;if(Array.isArray(R)){const U=N.groups;for(let H=0,W=U.length;H<W;H++){const O=U[H],F=R[O.materialIndex];if(F&&F.visible){const G=v(T,F,M,w);T.onBeforeShadow(t,T,A,D,N,G,O),t.renderBufferDirect(D,null,N,G,T,O),T.onAfterShadow(t,T,A,D,N,G,O)}}}else if(R.visible){const U=v(T,R,M,w);T.onBeforeShadow(t,T,A,D,N,U,null),t.renderBufferDirect(D,null,N,U,T,null),T.onAfterShadow(t,T,A,D,N,U,null)}}const V=T.children;for(let N=0,R=V.length;N<R;N++)y(V[N],A,D,M,w)}function C(T){T.target.removeEventListener("dispose",C);for(const D in c){const M=c[D],w=T.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}function rb(t,e,n){const i=n.isWebGL2;function r(){let B=!1;const he=new Bt;let pe=null;const Ie=new Bt(0,0,0,0);return{setMask:function(Pe){pe!==Pe&&!B&&(t.colorMask(Pe,Pe,Pe,Pe),pe=Pe)},setLocked:function(Pe){B=Pe},setClear:function(Pe,et,tt,Ut,rn){rn===!0&&(Pe*=Ut,et*=Ut,tt*=Ut),he.set(Pe,et,tt,Ut),Ie.equals(he)===!1&&(t.clearColor(Pe,et,tt,Ut),Ie.copy(he))},reset:function(){B=!1,pe=null,Ie.set(-1,0,0,0)}}}function s(){let B=!1,he=null,pe=null,Ie=null;return{setTest:function(Pe){Pe?Fe(t.DEPTH_TEST):Ae(t.DEPTH_TEST)},setMask:function(Pe){he!==Pe&&!B&&(t.depthMask(Pe),he=Pe)},setFunc:function(Pe){if(pe!==Pe){switch(Pe){case TM:t.depthFunc(t.NEVER);break;case AM:t.depthFunc(t.ALWAYS);break;case bM:t.depthFunc(t.LESS);break;case ec:t.depthFunc(t.LEQUAL);break;case CM:t.depthFunc(t.EQUAL);break;case RM:t.depthFunc(t.GEQUAL);break;case PM:t.depthFunc(t.GREATER);break;case LM:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}pe=Pe}},setLocked:function(Pe){B=Pe},setClear:function(Pe){Ie!==Pe&&(t.clearDepth(Pe),Ie=Pe)},reset:function(){B=!1,he=null,pe=null,Ie=null}}}function o(){let B=!1,he=null,pe=null,Ie=null,Pe=null,et=null,tt=null,Ut=null,rn=null;return{setTest:function(at){B||(at?Fe(t.STENCIL_TEST):Ae(t.STENCIL_TEST))},setMask:function(at){he!==at&&!B&&(t.stencilMask(at),he=at)},setFunc:function(at,sn,ei){(pe!==at||Ie!==sn||Pe!==ei)&&(t.stencilFunc(at,sn,ei),pe=at,Ie=sn,Pe=ei)},setOp:function(at,sn,ei){(et!==at||tt!==sn||Ut!==ei)&&(t.stencilOp(at,sn,ei),et=at,tt=sn,Ut=ei)},setLocked:function(at){B=at},setClear:function(at){rn!==at&&(t.clearStencil(at),rn=at)},reset:function(){B=!1,he=null,pe=null,Ie=null,Pe=null,et=null,tt=null,Ut=null,rn=null}}}const a=new r,l=new s,c=new o,u=new WeakMap,f=new WeakMap;let h={},p={},m=new WeakMap,x=[],g=null,d=!1,_=null,v=null,y=null,C=null,T=null,A=null,D=null,M=new Ke(0,0,0),w=0,z=!1,V=null,N=null,R=null,U=null,H=null;const W=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,F=0;const G=t.getParameter(t.VERSION);G.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(G)[1]),O=F>=1):G.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),O=F>=2);let q=null,X={};const j=t.getParameter(t.SCISSOR_BOX),K=t.getParameter(t.VIEWPORT),fe=new Bt().fromArray(j),Me=new Bt().fromArray(K);function ye(B,he,pe,Ie){const Pe=new Uint8Array(4),et=t.createTexture();t.bindTexture(B,et),t.texParameteri(B,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(B,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let tt=0;tt<pe;tt++)i&&(B===t.TEXTURE_3D||B===t.TEXTURE_2D_ARRAY)?t.texImage3D(he,0,t.RGBA,1,1,Ie,0,t.RGBA,t.UNSIGNED_BYTE,Pe):t.texImage2D(he+tt,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Pe);return et}const Ne={};Ne[t.TEXTURE_2D]=ye(t.TEXTURE_2D,t.TEXTURE_2D,1),Ne[t.TEXTURE_CUBE_MAP]=ye(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ne[t.TEXTURE_2D_ARRAY]=ye(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Ne[t.TEXTURE_3D]=ye(t.TEXTURE_3D,t.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Fe(t.DEPTH_TEST),l.setFunc(ec),Se(!1),b(Dp),Fe(t.CULL_FACE),te(sr);function Fe(B){h[B]!==!0&&(t.enable(B),h[B]=!0)}function Ae(B){h[B]!==!1&&(t.disable(B),h[B]=!1)}function ze(B,he){return p[B]!==he?(t.bindFramebuffer(B,he),p[B]=he,i&&(B===t.DRAW_FRAMEBUFFER&&(p[t.FRAMEBUFFER]=he),B===t.FRAMEBUFFER&&(p[t.DRAW_FRAMEBUFFER]=he)),!0):!1}function k(B,he){let pe=x,Ie=!1;if(B)if(pe=m.get(he),pe===void 0&&(pe=[],m.set(he,pe)),B.isWebGLMultipleRenderTargets){const Pe=B.texture;if(pe.length!==Pe.length||pe[0]!==t.COLOR_ATTACHMENT0){for(let et=0,tt=Pe.length;et<tt;et++)pe[et]=t.COLOR_ATTACHMENT0+et;pe.length=Pe.length,Ie=!0}}else pe[0]!==t.COLOR_ATTACHMENT0&&(pe[0]=t.COLOR_ATTACHMENT0,Ie=!0);else pe[0]!==t.BACK&&(pe[0]=t.BACK,Ie=!0);Ie&&(n.isWebGL2?t.drawBuffers(pe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(pe))}function de(B){return g!==B?(t.useProgram(B),g=B,!0):!1}const ee={[Ar]:t.FUNC_ADD,[uM]:t.FUNC_SUBTRACT,[fM]:t.FUNC_REVERSE_SUBTRACT};if(i)ee[Fp]=t.MIN,ee[zp]=t.MAX;else{const B=e.get("EXT_blend_minmax");B!==null&&(ee[Fp]=B.MIN_EXT,ee[zp]=B.MAX_EXT)}const le={[dM]:t.ZERO,[hM]:t.ONE,[pM]:t.SRC_COLOR,[jf]:t.SRC_ALPHA,[yM]:t.SRC_ALPHA_SATURATE,[_M]:t.DST_COLOR,[gM]:t.DST_ALPHA,[mM]:t.ONE_MINUS_SRC_COLOR,[Xf]:t.ONE_MINUS_SRC_ALPHA,[xM]:t.ONE_MINUS_DST_COLOR,[vM]:t.ONE_MINUS_DST_ALPHA,[SM]:t.CONSTANT_COLOR,[MM]:t.ONE_MINUS_CONSTANT_COLOR,[EM]:t.CONSTANT_ALPHA,[wM]:t.ONE_MINUS_CONSTANT_ALPHA};function te(B,he,pe,Ie,Pe,et,tt,Ut,rn,at){if(B===sr){d===!0&&(Ae(t.BLEND),d=!1);return}if(d===!1&&(Fe(t.BLEND),d=!0),B!==cM){if(B!==_||at!==z){if((v!==Ar||T!==Ar)&&(t.blendEquation(t.FUNC_ADD),v=Ar,T=Ar),at)switch(B){case zs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Ip:t.blendFunc(t.ONE,t.ONE);break;case Up:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Op:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case zs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Ip:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Up:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Op:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}y=null,C=null,A=null,D=null,M.set(0,0,0),w=0,_=B,z=at}return}Pe=Pe||he,et=et||pe,tt=tt||Ie,(he!==v||Pe!==T)&&(t.blendEquationSeparate(ee[he],ee[Pe]),v=he,T=Pe),(pe!==y||Ie!==C||et!==A||tt!==D)&&(t.blendFuncSeparate(le[pe],le[Ie],le[et],le[tt]),y=pe,C=Ie,A=et,D=tt),(Ut.equals(M)===!1||rn!==w)&&(t.blendColor(Ut.r,Ut.g,Ut.b,rn),M.copy(Ut),w=rn),_=B,z=!1}function Ce(B,he){B.side===On?Ae(t.CULL_FACE):Fe(t.CULL_FACE);let pe=B.side===_n;he&&(pe=!pe),Se(pe),B.blending===zs&&B.transparent===!1?te(sr):te(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),l.setFunc(B.depthFunc),l.setTest(B.depthTest),l.setMask(B.depthWrite),a.setMask(B.colorWrite);const Ie=B.stencilWrite;c.setTest(Ie),Ie&&(c.setMask(B.stencilWriteMask),c.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),c.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),$(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?Fe(t.SAMPLE_ALPHA_TO_COVERAGE):Ae(t.SAMPLE_ALPHA_TO_COVERAGE)}function Se(B){V!==B&&(B?t.frontFace(t.CW):t.frontFace(t.CCW),V=B)}function b(B){B!==oM?(Fe(t.CULL_FACE),B!==N&&(B===Dp?t.cullFace(t.BACK):B===aM?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Ae(t.CULL_FACE),N=B}function E(B){B!==R&&(O&&t.lineWidth(B),R=B)}function $(B,he,pe){B?(Fe(t.POLYGON_OFFSET_FILL),(U!==he||H!==pe)&&(t.polygonOffset(he,pe),U=he,H=pe)):Ae(t.POLYGON_OFFSET_FILL)}function oe(B){B?Fe(t.SCISSOR_TEST):Ae(t.SCISSOR_TEST)}function ie(B){B===void 0&&(B=t.TEXTURE0+W-1),q!==B&&(t.activeTexture(B),q=B)}function ne(B,he,pe){pe===void 0&&(q===null?pe=t.TEXTURE0+W-1:pe=q);let Ie=X[pe];Ie===void 0&&(Ie={type:void 0,texture:void 0},X[pe]=Ie),(Ie.type!==B||Ie.texture!==he)&&(q!==pe&&(t.activeTexture(pe),q=pe),t.bindTexture(B,he||Ne[B]),Ie.type=B,Ie.texture=he)}function be(){const B=X[q];B!==void 0&&B.type!==void 0&&(t.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function xe(){try{t.compressedTexImage2D.apply(t,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ee(){try{t.compressedTexImage3D.apply(t,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function De(){try{t.texSubImage2D.apply(t,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Be(){try{t.texSubImage3D.apply(t,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function re(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Xe(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function I(){try{t.texStorage2D.apply(t,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function se(){try{t.texStorage3D.apply(t,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ve(){try{t.texImage2D.apply(t,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ue(){try{t.texImage3D.apply(t,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Re(B){fe.equals(B)===!1&&(t.scissor(B.x,B.y,B.z,B.w),fe.copy(B))}function Ye(B){Me.equals(B)===!1&&(t.viewport(B.x,B.y,B.z,B.w),Me.copy(B))}function Qe(B,he){let pe=f.get(he);pe===void 0&&(pe=new WeakMap,f.set(he,pe));let Ie=pe.get(B);Ie===void 0&&(Ie=t.getUniformBlockIndex(he,B.name),pe.set(B,Ie))}function We(B,he){const Ie=f.get(he).get(B);u.get(he)!==Ie&&(t.uniformBlockBinding(he,Ie,B.__bindingPointIndex),u.set(he,Ie))}function me(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),i===!0&&(t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},q=null,X={},p={},m=new WeakMap,x=[],g=null,d=!1,_=null,v=null,y=null,C=null,T=null,A=null,D=null,M=new Ke(0,0,0),w=0,z=!1,V=null,N=null,R=null,U=null,H=null,fe.set(0,0,t.canvas.width,t.canvas.height),Me.set(0,0,t.canvas.width,t.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Fe,disable:Ae,bindFramebuffer:ze,drawBuffers:k,useProgram:de,setBlending:te,setMaterial:Ce,setFlipSided:Se,setCullFace:b,setLineWidth:E,setPolygonOffset:$,setScissorTest:oe,activeTexture:ie,bindTexture:ne,unbindTexture:be,compressedTexImage2D:xe,compressedTexImage3D:Ee,texImage2D:ve,texImage3D:ue,updateUBOMapping:Qe,uniformBlockBinding:We,texStorage2D:I,texStorage3D:se,texSubImage2D:De,texSubImage3D:Be,compressedTexSubImage2D:re,compressedTexSubImage3D:Xe,scissor:Re,viewport:Ye,reset:me}}function sb(t,e,n,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(b,E){return p?new OffscreenCanvas(b,E):sc("canvas")}function x(b,E,$,oe){let ie=1;if((b.width>oe||b.height>oe)&&(ie=oe/Math.max(b.width,b.height)),ie<1||E===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const ne=E?Jf:Math.floor,be=ne(ie*b.width),xe=ne(ie*b.height);f===void 0&&(f=m(be,xe));const Ee=$?m(be,xe):f;return Ee.width=be,Ee.height=xe,Ee.getContext("2d").drawImage(b,0,0,be,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+be+"x"+xe+")."),Ee}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function g(b){return pm(b.width)&&pm(b.height)}function d(b){return a?!1:b.wrapS!==qn||b.wrapT!==qn||b.minFilter!==ln&&b.minFilter!==Dn}function _(b,E){return b.generateMipmaps&&E&&b.minFilter!==ln&&b.minFilter!==Dn}function v(b){t.generateMipmap(b)}function y(b,E,$,oe,ie=!1){if(a===!1)return E;if(b!==null){if(t[b]!==void 0)return t[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ne=E;if(E===t.RED&&($===t.FLOAT&&(ne=t.R32F),$===t.HALF_FLOAT&&(ne=t.R16F),$===t.UNSIGNED_BYTE&&(ne=t.R8)),E===t.RED_INTEGER&&($===t.UNSIGNED_BYTE&&(ne=t.R8UI),$===t.UNSIGNED_SHORT&&(ne=t.R16UI),$===t.UNSIGNED_INT&&(ne=t.R32UI),$===t.BYTE&&(ne=t.R8I),$===t.SHORT&&(ne=t.R16I),$===t.INT&&(ne=t.R32I)),E===t.RG&&($===t.FLOAT&&(ne=t.RG32F),$===t.HALF_FLOAT&&(ne=t.RG16F),$===t.UNSIGNED_BYTE&&(ne=t.RG8)),E===t.RGBA){const be=ie?tc:st.getTransfer(oe);$===t.FLOAT&&(ne=t.RGBA32F),$===t.HALF_FLOAT&&(ne=t.RGBA16F),$===t.UNSIGNED_BYTE&&(ne=be===ft?t.SRGB8_ALPHA8:t.RGBA8),$===t.UNSIGNED_SHORT_4_4_4_4&&(ne=t.RGBA4),$===t.UNSIGNED_SHORT_5_5_5_1&&(ne=t.RGB5_A1)}return(ne===t.R16F||ne===t.R32F||ne===t.RG16F||ne===t.RG32F||ne===t.RGBA16F||ne===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function C(b,E,$){return _(b,$)===!0||b.isFramebufferTexture&&b.minFilter!==ln&&b.minFilter!==Dn?Math.log2(Math.max(E.width,E.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?E.mipmaps.length:1}function T(b){return b===ln||b===kp||b===uu?t.NEAREST:t.LINEAR}function A(b){const E=b.target;E.removeEventListener("dispose",A),M(E),E.isVideoTexture&&u.delete(E)}function D(b){const E=b.target;E.removeEventListener("dispose",D),z(E)}function M(b){const E=i.get(b);if(E.__webglInit===void 0)return;const $=b.source,oe=h.get($);if(oe){const ie=oe[E.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&w(b),Object.keys(oe).length===0&&h.delete($)}i.remove(b)}function w(b){const E=i.get(b);t.deleteTexture(E.__webglTexture);const $=b.source,oe=h.get($);delete oe[E.__cacheKey],o.memory.textures--}function z(b){const E=b.texture,$=i.get(b),oe=i.get(E);if(oe.__webglTexture!==void 0&&(t.deleteTexture(oe.__webglTexture),o.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray($.__webglFramebuffer[ie]))for(let ne=0;ne<$.__webglFramebuffer[ie].length;ne++)t.deleteFramebuffer($.__webglFramebuffer[ie][ne]);else t.deleteFramebuffer($.__webglFramebuffer[ie]);$.__webglDepthbuffer&&t.deleteRenderbuffer($.__webglDepthbuffer[ie])}else{if(Array.isArray($.__webglFramebuffer))for(let ie=0;ie<$.__webglFramebuffer.length;ie++)t.deleteFramebuffer($.__webglFramebuffer[ie]);else t.deleteFramebuffer($.__webglFramebuffer);if($.__webglDepthbuffer&&t.deleteRenderbuffer($.__webglDepthbuffer),$.__webglMultisampledFramebuffer&&t.deleteFramebuffer($.__webglMultisampledFramebuffer),$.__webglColorRenderbuffer)for(let ie=0;ie<$.__webglColorRenderbuffer.length;ie++)$.__webglColorRenderbuffer[ie]&&t.deleteRenderbuffer($.__webglColorRenderbuffer[ie]);$.__webglDepthRenderbuffer&&t.deleteRenderbuffer($.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let ie=0,ne=E.length;ie<ne;ie++){const be=i.get(E[ie]);be.__webglTexture&&(t.deleteTexture(be.__webglTexture),o.memory.textures--),i.remove(E[ie])}i.remove(E),i.remove(b)}let V=0;function N(){V=0}function R(){const b=V;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),V+=1,b}function U(b){const E=[];return E.push(b.wrapS),E.push(b.wrapT),E.push(b.wrapR||0),E.push(b.magFilter),E.push(b.minFilter),E.push(b.anisotropy),E.push(b.internalFormat),E.push(b.format),E.push(b.type),E.push(b.generateMipmaps),E.push(b.premultiplyAlpha),E.push(b.flipY),E.push(b.unpackAlignment),E.push(b.colorSpace),E.join()}function H(b,E){const $=i.get(b);if(b.isVideoTexture&&Ce(b),b.isRenderTargetTexture===!1&&b.version>0&&$.__version!==b.version){const oe=b.image;if(oe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{fe($,b,E);return}}n.bindTexture(t.TEXTURE_2D,$.__webglTexture,t.TEXTURE0+E)}function W(b,E){const $=i.get(b);if(b.version>0&&$.__version!==b.version){fe($,b,E);return}n.bindTexture(t.TEXTURE_2D_ARRAY,$.__webglTexture,t.TEXTURE0+E)}function O(b,E){const $=i.get(b);if(b.version>0&&$.__version!==b.version){fe($,b,E);return}n.bindTexture(t.TEXTURE_3D,$.__webglTexture,t.TEXTURE0+E)}function F(b,E){const $=i.get(b);if(b.version>0&&$.__version!==b.version){Me($,b,E);return}n.bindTexture(t.TEXTURE_CUBE_MAP,$.__webglTexture,t.TEXTURE0+E)}const G={[qf]:t.REPEAT,[qn]:t.CLAMP_TO_EDGE,[Zf]:t.MIRRORED_REPEAT},q={[ln]:t.NEAREST,[kp]:t.NEAREST_MIPMAP_NEAREST,[uu]:t.NEAREST_MIPMAP_LINEAR,[Dn]:t.LINEAR,[BM]:t.LINEAR_MIPMAP_NEAREST,[oa]:t.LINEAR_MIPMAP_LINEAR},X={[QM]:t.NEVER,[rE]:t.ALWAYS,[JM]:t.LESS,[c_]:t.LEQUAL,[eE]:t.EQUAL,[iE]:t.GEQUAL,[tE]:t.GREATER,[nE]:t.NOTEQUAL};function j(b,E,$){if($?(t.texParameteri(b,t.TEXTURE_WRAP_S,G[E.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,G[E.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,G[E.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,q[E.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,q[E.minFilter])):(t.texParameteri(b,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(b,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE),(E.wrapS!==qn||E.wrapT!==qn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(b,t.TEXTURE_MAG_FILTER,T(E.magFilter)),t.texParameteri(b,t.TEXTURE_MIN_FILTER,T(E.minFilter)),E.minFilter!==ln&&E.minFilter!==Dn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,X[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const oe=e.get("EXT_texture_filter_anisotropic");if(E.magFilter===ln||E.minFilter!==uu&&E.minFilter!==oa||E.type===qi&&e.has("OES_texture_float_linear")===!1||a===!1&&E.type===aa&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||i.get(E).__currentAnisotropy)&&(t.texParameterf(b,oe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy)}}function K(b,E){let $=!1;b.__webglInit===void 0&&(b.__webglInit=!0,E.addEventListener("dispose",A));const oe=E.source;let ie=h.get(oe);ie===void 0&&(ie={},h.set(oe,ie));const ne=U(E);if(ne!==b.__cacheKey){ie[ne]===void 0&&(ie[ne]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,$=!0),ie[ne].usedTimes++;const be=ie[b.__cacheKey];be!==void 0&&(ie[b.__cacheKey].usedTimes--,be.usedTimes===0&&w(E)),b.__cacheKey=ne,b.__webglTexture=ie[ne].texture}return $}function fe(b,E,$){let oe=t.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(oe=t.TEXTURE_2D_ARRAY),E.isData3DTexture&&(oe=t.TEXTURE_3D);const ie=K(b,E),ne=E.source;n.bindTexture(oe,b.__webglTexture,t.TEXTURE0+$);const be=i.get(ne);if(ne.version!==be.__version||ie===!0){n.activeTexture(t.TEXTURE0+$);const xe=st.getPrimaries(st.workingColorSpace),Ee=E.colorSpace===Fn?null:st.getPrimaries(E.colorSpace),De=E.colorSpace===Fn||xe===Ee?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);const Be=d(E)&&g(E.image)===!1;let re=x(E.image,Be,!1,r.maxTextureSize);re=Se(E,re);const Xe=g(re)||a,I=s.convert(E.format,E.colorSpace);let se=s.convert(E.type),ve=y(E.internalFormat,I,se,E.colorSpace,E.isVideoTexture);j(oe,E,Xe);let ue;const Re=E.mipmaps,Ye=a&&E.isVideoTexture!==!0&&ve!==o_,Qe=be.__version===void 0||ie===!0,We=C(E,re,Xe);if(E.isDepthTexture)ve=t.DEPTH_COMPONENT,a?E.type===qi?ve=t.DEPTH_COMPONENT32F:E.type===$i?ve=t.DEPTH_COMPONENT24:E.type===Ur?ve=t.DEPTH24_STENCIL8:ve=t.DEPTH_COMPONENT16:E.type===qi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===Or&&ve===t.DEPTH_COMPONENT&&E.type!==eh&&E.type!==$i&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=$i,se=s.convert(E.type)),E.format===Zs&&ve===t.DEPTH_COMPONENT&&(ve=t.DEPTH_STENCIL,E.type!==Ur&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=Ur,se=s.convert(E.type))),Qe&&(Ye?n.texStorage2D(t.TEXTURE_2D,1,ve,re.width,re.height):n.texImage2D(t.TEXTURE_2D,0,ve,re.width,re.height,0,I,se,null));else if(E.isDataTexture)if(Re.length>0&&Xe){Ye&&Qe&&n.texStorage2D(t.TEXTURE_2D,We,ve,Re[0].width,Re[0].height);for(let me=0,B=Re.length;me<B;me++)ue=Re[me],Ye?n.texSubImage2D(t.TEXTURE_2D,me,0,0,ue.width,ue.height,I,se,ue.data):n.texImage2D(t.TEXTURE_2D,me,ve,ue.width,ue.height,0,I,se,ue.data);E.generateMipmaps=!1}else Ye?(Qe&&n.texStorage2D(t.TEXTURE_2D,We,ve,re.width,re.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,re.width,re.height,I,se,re.data)):n.texImage2D(t.TEXTURE_2D,0,ve,re.width,re.height,0,I,se,re.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ye&&Qe&&n.texStorage3D(t.TEXTURE_2D_ARRAY,We,ve,Re[0].width,Re[0].height,re.depth);for(let me=0,B=Re.length;me<B;me++)ue=Re[me],E.format!==Zn?I!==null?Ye?n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,me,0,0,0,ue.width,ue.height,re.depth,I,ue.data,0,0):n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,me,ve,ue.width,ue.height,re.depth,0,ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?n.texSubImage3D(t.TEXTURE_2D_ARRAY,me,0,0,0,ue.width,ue.height,re.depth,I,se,ue.data):n.texImage3D(t.TEXTURE_2D_ARRAY,me,ve,ue.width,ue.height,re.depth,0,I,se,ue.data)}else{Ye&&Qe&&n.texStorage2D(t.TEXTURE_2D,We,ve,Re[0].width,Re[0].height);for(let me=0,B=Re.length;me<B;me++)ue=Re[me],E.format!==Zn?I!==null?Ye?n.compressedTexSubImage2D(t.TEXTURE_2D,me,0,0,ue.width,ue.height,I,ue.data):n.compressedTexImage2D(t.TEXTURE_2D,me,ve,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?n.texSubImage2D(t.TEXTURE_2D,me,0,0,ue.width,ue.height,I,se,ue.data):n.texImage2D(t.TEXTURE_2D,me,ve,ue.width,ue.height,0,I,se,ue.data)}else if(E.isDataArrayTexture)Ye?(Qe&&n.texStorage3D(t.TEXTURE_2D_ARRAY,We,ve,re.width,re.height,re.depth),n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,I,se,re.data)):n.texImage3D(t.TEXTURE_2D_ARRAY,0,ve,re.width,re.height,re.depth,0,I,se,re.data);else if(E.isData3DTexture)Ye?(Qe&&n.texStorage3D(t.TEXTURE_3D,We,ve,re.width,re.height,re.depth),n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,I,se,re.data)):n.texImage3D(t.TEXTURE_3D,0,ve,re.width,re.height,re.depth,0,I,se,re.data);else if(E.isFramebufferTexture){if(Qe)if(Ye)n.texStorage2D(t.TEXTURE_2D,We,ve,re.width,re.height);else{let me=re.width,B=re.height;for(let he=0;he<We;he++)n.texImage2D(t.TEXTURE_2D,he,ve,me,B,0,I,se,null),me>>=1,B>>=1}}else if(Re.length>0&&Xe){Ye&&Qe&&n.texStorage2D(t.TEXTURE_2D,We,ve,Re[0].width,Re[0].height);for(let me=0,B=Re.length;me<B;me++)ue=Re[me],Ye?n.texSubImage2D(t.TEXTURE_2D,me,0,0,I,se,ue):n.texImage2D(t.TEXTURE_2D,me,ve,I,se,ue);E.generateMipmaps=!1}else Ye?(Qe&&n.texStorage2D(t.TEXTURE_2D,We,ve,re.width,re.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,I,se,re)):n.texImage2D(t.TEXTURE_2D,0,ve,I,se,re);_(E,Xe)&&v(oe),be.__version=ne.version,E.onUpdate&&E.onUpdate(E)}b.__version=E.version}function Me(b,E,$){if(E.image.length!==6)return;const oe=K(b,E),ie=E.source;n.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+$);const ne=i.get(ie);if(ie.version!==ne.__version||oe===!0){n.activeTexture(t.TEXTURE0+$);const be=st.getPrimaries(st.workingColorSpace),xe=E.colorSpace===Fn?null:st.getPrimaries(E.colorSpace),Ee=E.colorSpace===Fn||be===xe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const De=E.isCompressedTexture||E.image[0].isCompressedTexture,Be=E.image[0]&&E.image[0].isDataTexture,re=[];for(let me=0;me<6;me++)!De&&!Be?re[me]=x(E.image[me],!1,!0,r.maxCubemapSize):re[me]=Be?E.image[me].image:E.image[me],re[me]=Se(E,re[me]);const Xe=re[0],I=g(Xe)||a,se=s.convert(E.format,E.colorSpace),ve=s.convert(E.type),ue=y(E.internalFormat,se,ve,E.colorSpace),Re=a&&E.isVideoTexture!==!0,Ye=ne.__version===void 0||oe===!0;let Qe=C(E,Xe,I);j(t.TEXTURE_CUBE_MAP,E,I);let We;if(De){Re&&Ye&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Qe,ue,Xe.width,Xe.height);for(let me=0;me<6;me++){We=re[me].mipmaps;for(let B=0;B<We.length;B++){const he=We[B];E.format!==Zn?se!==null?Re?n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,B,0,0,he.width,he.height,se,he.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,B,ue,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Re?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,B,0,0,he.width,he.height,se,ve,he.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,B,ue,he.width,he.height,0,se,ve,he.data)}}}else{We=E.mipmaps,Re&&Ye&&(We.length>0&&Qe++,n.texStorage2D(t.TEXTURE_CUBE_MAP,Qe,ue,re[0].width,re[0].height));for(let me=0;me<6;me++)if(Be){Re?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,re[me].width,re[me].height,se,ve,re[me].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ue,re[me].width,re[me].height,0,se,ve,re[me].data);for(let B=0;B<We.length;B++){const pe=We[B].image[me].image;Re?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,B+1,0,0,pe.width,pe.height,se,ve,pe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,B+1,ue,pe.width,pe.height,0,se,ve,pe.data)}}else{Re?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,se,ve,re[me]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ue,se,ve,re[me]);for(let B=0;B<We.length;B++){const he=We[B];Re?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,B+1,0,0,se,ve,he.image[me]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,B+1,ue,se,ve,he.image[me])}}}_(E,I)&&v(t.TEXTURE_CUBE_MAP),ne.__version=ie.version,E.onUpdate&&E.onUpdate(E)}b.__version=E.version}function ye(b,E,$,oe,ie,ne){const be=s.convert($.format,$.colorSpace),xe=s.convert($.type),Ee=y($.internalFormat,be,xe,$.colorSpace);if(!i.get(E).__hasExternalTextures){const Be=Math.max(1,E.width>>ne),re=Math.max(1,E.height>>ne);ie===t.TEXTURE_3D||ie===t.TEXTURE_2D_ARRAY?n.texImage3D(ie,ne,Ee,Be,re,E.depth,0,be,xe,null):n.texImage2D(ie,ne,Ee,Be,re,0,be,xe,null)}n.bindFramebuffer(t.FRAMEBUFFER,b),te(E)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,oe,ie,i.get($).__webglTexture,0,le(E)):(ie===t.TEXTURE_2D||ie>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,oe,ie,i.get($).__webglTexture,ne),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ne(b,E,$){if(t.bindRenderbuffer(t.RENDERBUFFER,b),E.depthBuffer&&!E.stencilBuffer){let oe=a===!0?t.DEPTH_COMPONENT24:t.DEPTH_COMPONENT16;if($||te(E)){const ie=E.depthTexture;ie&&ie.isDepthTexture&&(ie.type===qi?oe=t.DEPTH_COMPONENT32F:ie.type===$i&&(oe=t.DEPTH_COMPONENT24));const ne=le(E);te(E)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ne,oe,E.width,E.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,ne,oe,E.width,E.height)}else t.renderbufferStorage(t.RENDERBUFFER,oe,E.width,E.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,b)}else if(E.depthBuffer&&E.stencilBuffer){const oe=le(E);$&&te(E)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,oe,t.DEPTH24_STENCIL8,E.width,E.height):te(E)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,oe,t.DEPTH24_STENCIL8,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,b)}else{const oe=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let ie=0;ie<oe.length;ie++){const ne=oe[ie],be=s.convert(ne.format,ne.colorSpace),xe=s.convert(ne.type),Ee=y(ne.internalFormat,be,xe,ne.colorSpace),De=le(E);$&&te(E)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,De,Ee,E.width,E.height):te(E)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,De,Ee,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,Ee,E.width,E.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Fe(b,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,b),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),H(E.depthTexture,0);const oe=i.get(E.depthTexture).__webglTexture,ie=le(E);if(E.depthTexture.format===Or)te(E)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,oe,0,ie):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,oe,0);else if(E.depthTexture.format===Zs)te(E)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,oe,0,ie):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,oe,0);else throw new Error("Unknown depthTexture format")}function Ae(b){const E=i.get(b),$=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!E.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");Fe(E.__webglFramebuffer,b)}else if($){E.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[oe]),E.__webglDepthbuffer[oe]=t.createRenderbuffer(),Ne(E.__webglDepthbuffer[oe],b,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=t.createRenderbuffer(),Ne(E.__webglDepthbuffer,b,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function ze(b,E,$){const oe=i.get(b);E!==void 0&&ye(oe.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),$!==void 0&&Ae(b)}function k(b){const E=b.texture,$=i.get(b),oe=i.get(E);b.addEventListener("dispose",D),b.isWebGLMultipleRenderTargets!==!0&&(oe.__webglTexture===void 0&&(oe.__webglTexture=t.createTexture()),oe.__version=E.version,o.memory.textures++);const ie=b.isWebGLCubeRenderTarget===!0,ne=b.isWebGLMultipleRenderTargets===!0,be=g(b)||a;if(ie){$.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(a&&E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer[xe]=[];for(let Ee=0;Ee<E.mipmaps.length;Ee++)$.__webglFramebuffer[xe][Ee]=t.createFramebuffer()}else $.__webglFramebuffer[xe]=t.createFramebuffer()}else{if(a&&E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer=[];for(let xe=0;xe<E.mipmaps.length;xe++)$.__webglFramebuffer[xe]=t.createFramebuffer()}else $.__webglFramebuffer=t.createFramebuffer();if(ne)if(r.drawBuffers){const xe=b.texture;for(let Ee=0,De=xe.length;Ee<De;Ee++){const Be=i.get(xe[Ee]);Be.__webglTexture===void 0&&(Be.__webglTexture=t.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&b.samples>0&&te(b)===!1){const xe=ne?E:[E];$.__webglMultisampledFramebuffer=t.createFramebuffer(),$.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let Ee=0;Ee<xe.length;Ee++){const De=xe[Ee];$.__webglColorRenderbuffer[Ee]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,$.__webglColorRenderbuffer[Ee]);const Be=s.convert(De.format,De.colorSpace),re=s.convert(De.type),Xe=y(De.internalFormat,Be,re,De.colorSpace,b.isXRRenderTarget===!0),I=le(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,I,Xe,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ee,t.RENDERBUFFER,$.__webglColorRenderbuffer[Ee])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&($.__webglDepthRenderbuffer=t.createRenderbuffer(),Ne($.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ie){n.bindTexture(t.TEXTURE_CUBE_MAP,oe.__webglTexture),j(t.TEXTURE_CUBE_MAP,E,be);for(let xe=0;xe<6;xe++)if(a&&E.mipmaps&&E.mipmaps.length>0)for(let Ee=0;Ee<E.mipmaps.length;Ee++)ye($.__webglFramebuffer[xe][Ee],b,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ee);else ye($.__webglFramebuffer[xe],b,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);_(E,be)&&v(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ne){const xe=b.texture;for(let Ee=0,De=xe.length;Ee<De;Ee++){const Be=xe[Ee],re=i.get(Be);n.bindTexture(t.TEXTURE_2D,re.__webglTexture),j(t.TEXTURE_2D,Be,be),ye($.__webglFramebuffer,b,Be,t.COLOR_ATTACHMENT0+Ee,t.TEXTURE_2D,0),_(Be,be)&&v(t.TEXTURE_2D)}n.unbindTexture()}else{let xe=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(a?xe=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(xe,oe.__webglTexture),j(xe,E,be),a&&E.mipmaps&&E.mipmaps.length>0)for(let Ee=0;Ee<E.mipmaps.length;Ee++)ye($.__webglFramebuffer[Ee],b,E,t.COLOR_ATTACHMENT0,xe,Ee);else ye($.__webglFramebuffer,b,E,t.COLOR_ATTACHMENT0,xe,0);_(E,be)&&v(xe),n.unbindTexture()}b.depthBuffer&&Ae(b)}function de(b){const E=g(b)||a,$=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let oe=0,ie=$.length;oe<ie;oe++){const ne=$[oe];if(_(ne,E)){const be=b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,xe=i.get(ne).__webglTexture;n.bindTexture(be,xe),v(be),n.unbindTexture()}}}function ee(b){if(a&&b.samples>0&&te(b)===!1){const E=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],$=b.width,oe=b.height;let ie=t.COLOR_BUFFER_BIT;const ne=[],be=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,xe=i.get(b),Ee=b.isWebGLMultipleRenderTargets===!0;if(Ee)for(let De=0;De<E.length;De++)n.bindFramebuffer(t.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,xe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let De=0;De<E.length;De++){ne.push(t.COLOR_ATTACHMENT0+De),b.depthBuffer&&ne.push(be);const Be=xe.__ignoreDepthValues!==void 0?xe.__ignoreDepthValues:!1;if(Be===!1&&(b.depthBuffer&&(ie|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&(ie|=t.STENCIL_BUFFER_BIT)),Ee&&t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,xe.__webglColorRenderbuffer[De]),Be===!0&&(t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[be]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[be])),Ee){const re=i.get(E[De]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,re,0)}t.blitFramebuffer(0,0,$,oe,0,0,$,oe,ie,t.NEAREST),c&&t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ne)}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),Ee)for(let De=0;De<E.length;De++){n.bindFramebuffer(t.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.RENDERBUFFER,xe.__webglColorRenderbuffer[De]);const Be=i.get(E[De]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,xe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.TEXTURE_2D,Be,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}}function le(b){return Math.min(r.maxSamples,b.samples)}function te(b){const E=i.get(b);return a&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ce(b){const E=o.render.frame;u.get(b)!==E&&(u.set(b,E),b.update())}function Se(b,E){const $=b.colorSpace,oe=b.format,ie=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===Kf||$!==Pi&&$!==Fn&&(st.getTransfer($)===ft?a===!1?e.has("EXT_sRGB")===!0&&oe===Zn?(b.format=Kf,b.minFilter=Dn,b.generateMipmaps=!1):E=f_.sRGBToLinear(E):(oe!==Zn||ie!==ar)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),E}this.allocateTextureUnit=R,this.resetTextureUnits=N,this.setTexture2D=H,this.setTexture2DArray=W,this.setTexture3D=O,this.setTextureCube=F,this.rebindTextures=ze,this.setupRenderTarget=k,this.updateRenderTargetMipmap=de,this.updateMultisampleRenderTarget=ee,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=te}function ob(t,e,n){const i=n.isWebGL2;function r(s,o=Fn){let a;const l=st.getTransfer(o);if(s===ar)return t.UNSIGNED_BYTE;if(s===t_)return t.UNSIGNED_SHORT_4_4_4_4;if(s===n_)return t.UNSIGNED_SHORT_5_5_5_1;if(s===HM)return t.BYTE;if(s===GM)return t.SHORT;if(s===eh)return t.UNSIGNED_SHORT;if(s===e_)return t.INT;if(s===$i)return t.UNSIGNED_INT;if(s===qi)return t.FLOAT;if(s===aa)return i?t.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===VM)return t.ALPHA;if(s===Zn)return t.RGBA;if(s===WM)return t.LUMINANCE;if(s===jM)return t.LUMINANCE_ALPHA;if(s===Or)return t.DEPTH_COMPONENT;if(s===Zs)return t.DEPTH_STENCIL;if(s===Kf)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===XM)return t.RED;if(s===i_)return t.RED_INTEGER;if(s===YM)return t.RG;if(s===r_)return t.RG_INTEGER;if(s===s_)return t.RGBA_INTEGER;if(s===fu||s===du||s===hu||s===pu)if(l===ft)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===fu)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===du)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===hu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===pu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===fu)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===du)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===hu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===pu)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Bp||s===Hp||s===Gp||s===Vp)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Bp)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Hp)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Gp)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Vp)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===o_)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Wp||s===jp)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Wp)return l===ft?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===jp)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Xp||s===Yp||s===$p||s===qp||s===Zp||s===Kp||s===Qp||s===Jp||s===em||s===tm||s===nm||s===im||s===rm||s===sm)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Xp)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Yp)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===$p)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===qp)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Zp)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Kp)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Qp)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Jp)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===em)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===tm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===nm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===im)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===rm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===sm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===mu||s===om||s===am)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===mu)return l===ft?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===om)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===am)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===$M||s===lm||s===cm||s===um)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===mu)return a.COMPRESSED_RED_RGTC1_EXT;if(s===lm)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===cm)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===um)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ur?i?t.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):t[s]!==void 0?t[s]:null}return{convert:r}}class ab extends Un{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class yi extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const lb={type:"move"};class ku{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const g=n.getJointPose(x,i),d=this._getHandJoint(c,x);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,m=.005;c.inputState.pinching&&h>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(lb)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new yi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class cb extends qr{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,m=null;const x=n.getContextAttributes();let g=null,d=null;const _=[],v=[],y=new ce;let C=null;const T=new Un;T.layers.enable(1),T.viewport=new Bt;const A=new Un;A.layers.enable(2),A.viewport=new Bt;const D=[T,A],M=new ab;M.layers.enable(1),M.layers.enable(2);let w=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let K=_[j];return K===void 0&&(K=new ku,_[j]=K),K.getTargetRaySpace()},this.getControllerGrip=function(j){let K=_[j];return K===void 0&&(K=new ku,_[j]=K),K.getGripSpace()},this.getHand=function(j){let K=_[j];return K===void 0&&(K=new ku,_[j]=K),K.getHandSpace()};function V(j){const K=v.indexOf(j.inputSource);if(K===-1)return;const fe=_[K];fe!==void 0&&(fe.update(j.inputSource,j.frame,c||o),fe.dispatchEvent({type:j.type,data:j.inputSource}))}function N(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",N),r.removeEventListener("inputsourceschange",R);for(let j=0;j<_.length;j++){const K=v[j];K!==null&&(v[j]=null,_[j].disconnect(K))}w=null,z=null,e.setRenderTarget(g),p=null,h=null,f=null,r=null,d=null,X.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(y.width,y.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(g=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",N),r.addEventListener("inputsourceschange",R),x.xrCompatible!==!0&&await n.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(y),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,K),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),d=new Wr(p.framebufferWidth,p.framebufferHeight,{format:Zn,type:ar,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let K=null,fe=null,Me=null;x.depth&&(Me=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,K=x.stencil?Zs:Or,fe=x.stencil?Ur:$i);const ye={colorFormat:n.RGBA8,depthFormat:Me,scaleFactor:s};f=new XRWebGLBinding(r,n),h=f.createProjectionLayer(ye),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),d=new Wr(h.textureWidth,h.textureHeight,{format:Zn,type:ar,depthTexture:new M_(h.textureWidth,h.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const Ne=e.properties.get(d);Ne.__ignoreDepthValues=h.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),X.setContext(r),X.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function R(j){for(let K=0;K<j.removed.length;K++){const fe=j.removed[K],Me=v.indexOf(fe);Me>=0&&(v[Me]=null,_[Me].disconnect(fe))}for(let K=0;K<j.added.length;K++){const fe=j.added[K];let Me=v.indexOf(fe);if(Me===-1){for(let Ne=0;Ne<_.length;Ne++)if(Ne>=v.length){v.push(fe),Me=Ne;break}else if(v[Ne]===null){v[Ne]=fe,Me=Ne;break}if(Me===-1)break}const ye=_[Me];ye&&ye.connect(fe)}}const U=new L,H=new L;function W(j,K,fe){U.setFromMatrixPosition(K.matrixWorld),H.setFromMatrixPosition(fe.matrixWorld);const Me=U.distanceTo(H),ye=K.projectionMatrix.elements,Ne=fe.projectionMatrix.elements,Fe=ye[14]/(ye[10]-1),Ae=ye[14]/(ye[10]+1),ze=(ye[9]+1)/ye[5],k=(ye[9]-1)/ye[5],de=(ye[8]-1)/ye[0],ee=(Ne[8]+1)/Ne[0],le=Fe*de,te=Fe*ee,Ce=Me/(-de+ee),Se=Ce*-de;K.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Se),j.translateZ(Ce),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();const b=Fe+Ce,E=Ae+Ce,$=le-Se,oe=te+(Me-Se),ie=ze*Ae/E*b,ne=k*Ae/E*b;j.projectionMatrix.makePerspective($,oe,ie,ne,b,E),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function O(j,K){K===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(K.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;M.near=A.near=T.near=j.near,M.far=A.far=T.far=j.far,(w!==M.near||z!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),w=M.near,z=M.far);const K=j.parent,fe=M.cameras;O(M,K);for(let Me=0;Me<fe.length;Me++)O(fe[Me],K);fe.length===2?W(M,T,A):M.projectionMatrix.copy(T.projectionMatrix),F(j,M,K)};function F(j,K,fe){fe===null?j.matrix.copy(K.matrixWorld):(j.matrix.copy(fe.matrixWorld),j.matrix.invert(),j.matrix.multiply(K.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(K.projectionMatrix),j.projectionMatrixInverse.copy(K.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Qf*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(j){l=j,h!==null&&(h.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)};let G=null;function q(j,K){if(u=K.getViewerPose(c||o),m=K,u!==null){const fe=u.views;p!==null&&(e.setRenderTargetFramebuffer(d,p.framebuffer),e.setRenderTarget(d));let Me=!1;fe.length!==M.cameras.length&&(M.cameras.length=0,Me=!0);for(let ye=0;ye<fe.length;ye++){const Ne=fe[ye];let Fe=null;if(p!==null)Fe=p.getViewport(Ne);else{const ze=f.getViewSubImage(h,Ne);Fe=ze.viewport,ye===0&&(e.setRenderTargetTextures(d,ze.colorTexture,h.ignoreDepthValues?void 0:ze.depthStencilTexture),e.setRenderTarget(d))}let Ae=D[ye];Ae===void 0&&(Ae=new Un,Ae.layers.enable(ye),Ae.viewport=new Bt,D[ye]=Ae),Ae.matrix.fromArray(Ne.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(Ne.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),ye===0&&(M.matrix.copy(Ae.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),Me===!0&&M.cameras.push(Ae)}}for(let fe=0;fe<_.length;fe++){const Me=v[fe],ye=_[fe];Me!==null&&ye!==void 0&&ye.update(Me,K,c||o)}G&&G(j,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),m=null}const X=new y_;X.setAnimationLoop(q),this.setAnimationLoop=function(j){G=j},this.dispose=function(){}}}function ub(t,e){function n(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function i(g,d){d.color.getRGB(g.fogColor.value,v_(t)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function r(g,d,_,v,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(g,d):d.isMeshToonMaterial?(s(g,d),f(g,d)):d.isMeshPhongMaterial?(s(g,d),u(g,d)):d.isMeshStandardMaterial?(s(g,d),h(g,d),d.isMeshPhysicalMaterial&&p(g,d,y)):d.isMeshMatcapMaterial?(s(g,d),m(g,d)):d.isMeshDepthMaterial?s(g,d):d.isMeshDistanceMaterial?(s(g,d),x(g,d)):d.isMeshNormalMaterial?s(g,d):d.isLineBasicMaterial?(o(g,d),d.isLineDashedMaterial&&a(g,d)):d.isPointsMaterial?l(g,d,_,v):d.isSpriteMaterial?c(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,n(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===_n&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,n(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===_n&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,n(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,n(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const _=e.get(d).envMap;if(_&&(g.envMap.value=_,g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap){g.lightMap.value=d.lightMap;const v=t._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=d.lightMapIntensity*v,n(d.lightMap,g.lightMapTransform)}d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,g.aoMapTransform))}function o(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform))}function a(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function l(g,d,_,v){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*_,g.scale.value=v*.5,d.map&&(g.map.value=d.map,n(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function c(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function u(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function f(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function h(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,g.roughnessMapTransform)),e.get(d).envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function p(g,d,_){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===_n&&g.clearcoatNormalScale.value.negate())),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,d){d.matcap&&(g.matcap.value=d.matcap)}function x(g,d){const _=e.get(d).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function fb(t,e,n,i){let r={},s={},o=[];const a=n.isWebGL2?t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(_,v){const y=v.program;i.uniformBlockBinding(_,y)}function c(_,v){let y=r[_.id];y===void 0&&(m(_),y=u(_),r[_.id]=y,_.addEventListener("dispose",g));const C=v.program;i.updateUBOMapping(_,C);const T=e.render.frame;s[_.id]!==T&&(h(_),s[_.id]=T)}function u(_){const v=f();_.__bindingPointIndex=v;const y=t.createBuffer(),C=_.__size,T=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,C,T),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,v,y),y}function f(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const v=r[_.id],y=_.uniforms,C=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,v);for(let T=0,A=y.length;T<A;T++){const D=Array.isArray(y[T])?y[T]:[y[T]];for(let M=0,w=D.length;M<w;M++){const z=D[M];if(p(z,T,M,C)===!0){const V=z.__offset,N=Array.isArray(z.value)?z.value:[z.value];let R=0;for(let U=0;U<N.length;U++){const H=N[U],W=x(H);typeof H=="number"||typeof H=="boolean"?(z.__data[0]=H,t.bufferSubData(t.UNIFORM_BUFFER,V+R,z.__data)):H.isMatrix3?(z.__data[0]=H.elements[0],z.__data[1]=H.elements[1],z.__data[2]=H.elements[2],z.__data[3]=0,z.__data[4]=H.elements[3],z.__data[5]=H.elements[4],z.__data[6]=H.elements[5],z.__data[7]=0,z.__data[8]=H.elements[6],z.__data[9]=H.elements[7],z.__data[10]=H.elements[8],z.__data[11]=0):(H.toArray(z.__data,R),R+=W.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,V,z.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,v,y,C){const T=_.value,A=v+"_"+y;if(C[A]===void 0)return typeof T=="number"||typeof T=="boolean"?C[A]=T:C[A]=T.clone(),!0;{const D=C[A];if(typeof T=="number"||typeof T=="boolean"){if(D!==T)return C[A]=T,!0}else if(D.equals(T)===!1)return D.copy(T),!0}return!1}function m(_){const v=_.uniforms;let y=0;const C=16;for(let A=0,D=v.length;A<D;A++){const M=Array.isArray(v[A])?v[A]:[v[A]];for(let w=0,z=M.length;w<z;w++){const V=M[w],N=Array.isArray(V.value)?V.value:[V.value];for(let R=0,U=N.length;R<U;R++){const H=N[R],W=x(H),O=y%C;O!==0&&C-O<W.boundary&&(y+=C-O),V.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=y,y+=W.storage}}}const T=y%C;return T>0&&(y+=C-T),_.__size=y,_.__cache={},this}function x(_){const v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function g(_){const v=_.target;v.removeEventListener("dispose",g);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),t.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function d(){for(const _ in r)t.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}class C_{constructor(e={}){const{canvas:n=aE(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=o;const p=new Uint32Array(4),m=new Int32Array(4);let x=null,g=null;const d=[],_=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Wt,this._useLegacyLights=!1,this.toneMapping=or,this.toneMappingExposure=1;const v=this;let y=!1,C=0,T=0,A=null,D=-1,M=null;const w=new Bt,z=new Bt;let V=null;const N=new Ke(0);let R=0,U=n.width,H=n.height,W=1,O=null,F=null;const G=new Bt(0,0,U,H),q=new Bt(0,0,U,H);let X=!1;const j=new ih;let K=!1,fe=!1,Me=null;const ye=new pt,Ne=new ce,Fe=new L,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ze(){return A===null?W:1}let k=i;function de(P,Y){for(let Q=0;Q<P.length;Q++){const J=P[Q],Z=n.getContext(J,Y);if(Z!==null)return Z}return null}try{const P={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Jd}`),n.addEventListener("webglcontextlost",me,!1),n.addEventListener("webglcontextrestored",B,!1),n.addEventListener("webglcontextcreationerror",he,!1),k===null){const Y=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&Y.shift(),k=de(Y,P),k===null)throw de(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&k instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),k.getShaderPrecisionFormat===void 0&&(k.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let ee,le,te,Ce,Se,b,E,$,oe,ie,ne,be,xe,Ee,De,Be,re,Xe,I,se,ve,ue,Re,Ye;function Qe(){ee=new ST(k),le=new mT(k,ee,e),ee.init(le),ue=new ob(k,ee,le),te=new rb(k,ee,le),Ce=new wT(k),Se=new WA,b=new sb(k,ee,te,Se,le,ue,Ce),E=new vT(v),$=new yT(v),oe=new NE(k,le),Re=new hT(k,ee,oe,le),ie=new MT(k,oe,Ce,Re),ne=new CT(k,ie,oe,Ce),I=new bT(k,le,b),Be=new gT(Se),be=new VA(v,E,$,ee,le,Re,Be),xe=new ub(v,Se),Ee=new XA,De=new QA(ee,le),Xe=new dT(v,E,$,te,ne,h,l),re=new ib(v,ne,le),Ye=new fb(k,Ce,le,te),se=new pT(k,ee,Ce,le),ve=new ET(k,ee,Ce,le),Ce.programs=be.programs,v.capabilities=le,v.extensions=ee,v.properties=Se,v.renderLists=Ee,v.shadowMap=re,v.state=te,v.info=Ce}Qe();const We=new cb(v,k);this.xr=We,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const P=ee.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=ee.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(P){P!==void 0&&(W=P,this.setSize(U,H,!1))},this.getSize=function(P){return P.set(U,H)},this.setSize=function(P,Y,Q=!0){if(We.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=P,H=Y,n.width=Math.floor(P*W),n.height=Math.floor(Y*W),Q===!0&&(n.style.width=P+"px",n.style.height=Y+"px"),this.setViewport(0,0,P,Y)},this.getDrawingBufferSize=function(P){return P.set(U*W,H*W).floor()},this.setDrawingBufferSize=function(P,Y,Q){U=P,H=Y,W=Q,n.width=Math.floor(P*Q),n.height=Math.floor(Y*Q),this.setViewport(0,0,P,Y)},this.getCurrentViewport=function(P){return P.copy(w)},this.getViewport=function(P){return P.copy(G)},this.setViewport=function(P,Y,Q,J){P.isVector4?G.set(P.x,P.y,P.z,P.w):G.set(P,Y,Q,J),te.viewport(w.copy(G).multiplyScalar(W).floor())},this.getScissor=function(P){return P.copy(q)},this.setScissor=function(P,Y,Q,J){P.isVector4?q.set(P.x,P.y,P.z,P.w):q.set(P,Y,Q,J),te.scissor(z.copy(q).multiplyScalar(W).floor())},this.getScissorTest=function(){return X},this.setScissorTest=function(P){te.setScissorTest(X=P)},this.setOpaqueSort=function(P){O=P},this.setTransparentSort=function(P){F=P},this.getClearColor=function(P){return P.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor.apply(Xe,arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha.apply(Xe,arguments)},this.clear=function(P=!0,Y=!0,Q=!0){let J=0;if(P){let Z=!1;if(A!==null){const we=A.texture.format;Z=we===s_||we===r_||we===i_}if(Z){const we=A.texture.type,Le=we===ar||we===$i||we===eh||we===Ur||we===t_||we===n_,Ue=Xe.getClearColor(),ke=Xe.getClearAlpha(),je=Ue.r,He=Ue.g,Ge=Ue.b;Le?(p[0]=je,p[1]=He,p[2]=Ge,p[3]=ke,k.clearBufferuiv(k.COLOR,0,p)):(m[0]=je,m[1]=He,m[2]=Ge,m[3]=ke,k.clearBufferiv(k.COLOR,0,m))}else J|=k.COLOR_BUFFER_BIT}Y&&(J|=k.DEPTH_BUFFER_BIT),Q&&(J|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",me,!1),n.removeEventListener("webglcontextrestored",B,!1),n.removeEventListener("webglcontextcreationerror",he,!1),Ee.dispose(),De.dispose(),Se.dispose(),E.dispose(),$.dispose(),ne.dispose(),Re.dispose(),Ye.dispose(),be.dispose(),We.dispose(),We.removeEventListener("sessionstart",rn),We.removeEventListener("sessionend",at),Me&&(Me.dispose(),Me=null),sn.stop()};function me(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function B(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const P=Ce.autoReset,Y=re.enabled,Q=re.autoUpdate,J=re.needsUpdate,Z=re.type;Qe(),Ce.autoReset=P,re.enabled=Y,re.autoUpdate=Q,re.needsUpdate=J,re.type=Z}function he(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function pe(P){const Y=P.target;Y.removeEventListener("dispose",pe),Ie(Y)}function Ie(P){Pe(P),Se.remove(P)}function Pe(P){const Y=Se.get(P).programs;Y!==void 0&&(Y.forEach(function(Q){be.releaseProgram(Q)}),P.isShaderMaterial&&be.releaseShaderCache(P))}this.renderBufferDirect=function(P,Y,Q,J,Z,we){Y===null&&(Y=Ae);const Le=Z.isMesh&&Z.matrixWorld.determinant()<0,Ue=X_(P,Y,Q,J,Z);te.setMaterial(J,Le);let ke=Q.index,je=1;if(J.wireframe===!0){if(ke=ie.getWireframeAttribute(Q),ke===void 0)return;je=2}const He=Q.drawRange,Ge=Q.attributes.position;let Tt=He.start*je,xn=(He.start+He.count)*je;we!==null&&(Tt=Math.max(Tt,we.start*je),xn=Math.min(xn,(we.start+we.count)*je)),ke!==null?(Tt=Math.max(Tt,0),xn=Math.min(xn,ke.count)):Ge!=null&&(Tt=Math.max(Tt,0),xn=Math.min(xn,Ge.count));const Ot=xn-Tt;if(Ot<0||Ot===1/0)return;Re.setup(Z,J,Ue,Q,ke);let ui,vt=se;if(ke!==null&&(ui=oe.get(ke),vt=ve,vt.setIndex(ui)),Z.isMesh)J.wireframe===!0?(te.setLineWidth(J.wireframeLinewidth*ze()),vt.setMode(k.LINES)):vt.setMode(k.TRIANGLES);else if(Z.isLine){let $e=J.linewidth;$e===void 0&&($e=1),te.setLineWidth($e*ze()),Z.isLineSegments?vt.setMode(k.LINES):Z.isLineLoop?vt.setMode(k.LINE_LOOP):vt.setMode(k.LINE_STRIP)}else Z.isPoints?vt.setMode(k.POINTS):Z.isSprite&&vt.setMode(k.TRIANGLES);if(Z.isBatchedMesh)vt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else if(Z.isInstancedMesh)vt.renderInstances(Tt,Ot,Z.count);else if(Q.isInstancedBufferGeometry){const $e=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Nc=Math.min(Q.instanceCount,$e);vt.renderInstances(Tt,Ot,Nc)}else vt.render(Tt,Ot)};function et(P,Y,Q){P.transparent===!0&&P.side===On&&P.forceSinglePass===!1?(P.side=_n,P.needsUpdate=!0,xa(P,Y,Q),P.side=ur,P.needsUpdate=!0,xa(P,Y,Q),P.side=On):xa(P,Y,Q)}this.compile=function(P,Y,Q=null){Q===null&&(Q=P),g=De.get(Q),g.init(),_.push(g),Q.traverseVisible(function(Z){Z.isLight&&Z.layers.test(Y.layers)&&(g.pushLight(Z),Z.castShadow&&g.pushShadow(Z))}),P!==Q&&P.traverseVisible(function(Z){Z.isLight&&Z.layers.test(Y.layers)&&(g.pushLight(Z),Z.castShadow&&g.pushShadow(Z))}),g.setupLights(v._useLegacyLights);const J=new Set;return P.traverse(function(Z){const we=Z.material;if(we)if(Array.isArray(we))for(let Le=0;Le<we.length;Le++){const Ue=we[Le];et(Ue,Q,Z),J.add(Ue)}else et(we,Q,Z),J.add(we)}),_.pop(),g=null,J},this.compileAsync=function(P,Y,Q=null){const J=this.compile(P,Y,Q);return new Promise(Z=>{function we(){if(J.forEach(function(Le){Se.get(Le).currentProgram.isReady()&&J.delete(Le)}),J.size===0){Z(P);return}setTimeout(we,10)}ee.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let tt=null;function Ut(P){tt&&tt(P)}function rn(){sn.stop()}function at(){sn.start()}const sn=new y_;sn.setAnimationLoop(Ut),typeof self<"u"&&sn.setContext(self),this.setAnimationLoop=function(P){tt=P,We.setAnimationLoop(P),P===null?sn.stop():sn.start()},We.addEventListener("sessionstart",rn),We.addEventListener("sessionend",at),this.render=function(P,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(We.cameraAutoUpdate===!0&&We.updateCamera(Y),Y=We.getCamera()),P.isScene===!0&&P.onBeforeRender(v,P,Y,A),g=De.get(P,_.length),g.init(),_.push(g),ye.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),j.setFromProjectionMatrix(ye),fe=this.localClippingEnabled,K=Be.init(this.clippingPlanes,fe),x=Ee.get(P,d.length),x.init(),d.push(x),ei(P,Y,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(O,F),this.info.render.frame++,K===!0&&Be.beginShadows();const Q=g.state.shadowsArray;if(re.render(Q,P,Y),K===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),Xe.render(x,P),g.setupLights(v._useLegacyLights),Y.isArrayCamera){const J=Y.cameras;for(let Z=0,we=J.length;Z<we;Z++){const Le=J[Z];uh(x,P,Le,Le.viewport)}}else uh(x,P,Y);A!==null&&(b.updateMultisampleRenderTarget(A),b.updateRenderTargetMipmap(A)),P.isScene===!0&&P.onAfterRender(v,P,Y),Re.resetDefaultState(),D=-1,M=null,_.pop(),_.length>0?g=_[_.length-1]:g=null,d.pop(),d.length>0?x=d[d.length-1]:x=null};function ei(P,Y,Q,J){if(P.visible===!1)return;if(P.layers.test(Y.layers)){if(P.isGroup)Q=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(Y);else if(P.isLight)g.pushLight(P),P.castShadow&&g.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||j.intersectsSprite(P)){J&&Fe.setFromMatrixPosition(P.matrixWorld).applyMatrix4(ye);const Le=ne.update(P),Ue=P.material;Ue.visible&&x.push(P,Le,Ue,Q,Fe.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||j.intersectsObject(P))){const Le=ne.update(P),Ue=P.material;if(J&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),Fe.copy(P.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),Fe.copy(Le.boundingSphere.center)),Fe.applyMatrix4(P.matrixWorld).applyMatrix4(ye)),Array.isArray(Ue)){const ke=Le.groups;for(let je=0,He=ke.length;je<He;je++){const Ge=ke[je],Tt=Ue[Ge.materialIndex];Tt&&Tt.visible&&x.push(P,Le,Tt,Q,Fe.z,Ge)}}else Ue.visible&&x.push(P,Le,Ue,Q,Fe.z,null)}}const we=P.children;for(let Le=0,Ue=we.length;Le<Ue;Le++)ei(we[Le],Y,Q,J)}function uh(P,Y,Q,J){const Z=P.opaque,we=P.transmissive,Le=P.transparent;g.setupLightsView(Q),K===!0&&Be.setGlobalState(v.clippingPlanes,Q),we.length>0&&j_(Z,we,Y,Q),J&&te.viewport(w.copy(J)),Z.length>0&&_a(Z,Y,Q),we.length>0&&_a(we,Y,Q),Le.length>0&&_a(Le,Y,Q),te.buffers.depth.setTest(!0),te.buffers.depth.setMask(!0),te.buffers.color.setMask(!0),te.setPolygonOffset(!1)}function j_(P,Y,Q,J){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;const we=le.isWebGL2;Me===null&&(Me=new Wr(1,1,{generateMipmaps:!0,type:ee.has("EXT_color_buffer_half_float")?aa:ar,minFilter:oa,samples:we?4:0})),v.getDrawingBufferSize(Ne),we?Me.setSize(Ne.x,Ne.y):Me.setSize(Jf(Ne.x),Jf(Ne.y));const Le=v.getRenderTarget();v.setRenderTarget(Me),v.getClearColor(N),R=v.getClearAlpha(),R<1&&v.setClearColor(16777215,.5),v.clear();const Ue=v.toneMapping;v.toneMapping=or,_a(P,Q,J),b.updateMultisampleRenderTarget(Me),b.updateRenderTargetMipmap(Me);let ke=!1;for(let je=0,He=Y.length;je<He;je++){const Ge=Y[je],Tt=Ge.object,xn=Ge.geometry,Ot=Ge.material,ui=Ge.group;if(Ot.side===On&&Tt.layers.test(J.layers)){const vt=Ot.side;Ot.side=_n,Ot.needsUpdate=!0,fh(Tt,Q,J,xn,Ot,ui),Ot.side=vt,Ot.needsUpdate=!0,ke=!0}}ke===!0&&(b.updateMultisampleRenderTarget(Me),b.updateRenderTargetMipmap(Me)),v.setRenderTarget(Le),v.setClearColor(N,R),v.toneMapping=Ue}function _a(P,Y,Q){const J=Y.isScene===!0?Y.overrideMaterial:null;for(let Z=0,we=P.length;Z<we;Z++){const Le=P[Z],Ue=Le.object,ke=Le.geometry,je=J===null?Le.material:J,He=Le.group;Ue.layers.test(Q.layers)&&fh(Ue,Y,Q,ke,je,He)}}function fh(P,Y,Q,J,Z,we){P.onBeforeRender(v,Y,Q,J,Z,we),P.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),Z.onBeforeRender(v,Y,Q,J,P,we),Z.transparent===!0&&Z.side===On&&Z.forceSinglePass===!1?(Z.side=_n,Z.needsUpdate=!0,v.renderBufferDirect(Q,Y,J,Z,P,we),Z.side=ur,Z.needsUpdate=!0,v.renderBufferDirect(Q,Y,J,Z,P,we),Z.side=On):v.renderBufferDirect(Q,Y,J,Z,P,we),P.onAfterRender(v,Y,Q,J,Z,we)}function xa(P,Y,Q){Y.isScene!==!0&&(Y=Ae);const J=Se.get(P),Z=g.state.lights,we=g.state.shadowsArray,Le=Z.state.version,Ue=be.getParameters(P,Z.state,we,Y,Q),ke=be.getProgramCacheKey(Ue);let je=J.programs;J.environment=P.isMeshStandardMaterial?Y.environment:null,J.fog=Y.fog,J.envMap=(P.isMeshStandardMaterial?$:E).get(P.envMap||J.environment),je===void 0&&(P.addEventListener("dispose",pe),je=new Map,J.programs=je);let He=je.get(ke);if(He!==void 0){if(J.currentProgram===He&&J.lightsStateVersion===Le)return hh(P,Ue),He}else Ue.uniforms=be.getUniforms(P),P.onBuild(Q,Ue,v),P.onBeforeCompile(Ue,v),He=be.acquireProgram(Ue,ke),je.set(ke,He),J.uniforms=Ue.uniforms;const Ge=J.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Ge.clippingPlanes=Be.uniform),hh(P,Ue),J.needsLights=$_(P),J.lightsStateVersion=Le,J.needsLights&&(Ge.ambientLightColor.value=Z.state.ambient,Ge.lightProbe.value=Z.state.probe,Ge.directionalLights.value=Z.state.directional,Ge.directionalLightShadows.value=Z.state.directionalShadow,Ge.spotLights.value=Z.state.spot,Ge.spotLightShadows.value=Z.state.spotShadow,Ge.rectAreaLights.value=Z.state.rectArea,Ge.ltc_1.value=Z.state.rectAreaLTC1,Ge.ltc_2.value=Z.state.rectAreaLTC2,Ge.pointLights.value=Z.state.point,Ge.pointLightShadows.value=Z.state.pointShadow,Ge.hemisphereLights.value=Z.state.hemi,Ge.directionalShadowMap.value=Z.state.directionalShadowMap,Ge.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ge.spotShadowMap.value=Z.state.spotShadowMap,Ge.spotLightMatrix.value=Z.state.spotLightMatrix,Ge.spotLightMap.value=Z.state.spotLightMap,Ge.pointShadowMap.value=Z.state.pointShadowMap,Ge.pointShadowMatrix.value=Z.state.pointShadowMatrix),J.currentProgram=He,J.uniformsList=null,He}function dh(P){if(P.uniformsList===null){const Y=P.currentProgram.getUniforms();P.uniformsList=Cl.seqWithValue(Y.seq,P.uniforms)}return P.uniformsList}function hh(P,Y){const Q=Se.get(P);Q.outputColorSpace=Y.outputColorSpace,Q.batching=Y.batching,Q.instancing=Y.instancing,Q.instancingColor=Y.instancingColor,Q.skinning=Y.skinning,Q.morphTargets=Y.morphTargets,Q.morphNormals=Y.morphNormals,Q.morphColors=Y.morphColors,Q.morphTargetsCount=Y.morphTargetsCount,Q.numClippingPlanes=Y.numClippingPlanes,Q.numIntersection=Y.numClipIntersection,Q.vertexAlphas=Y.vertexAlphas,Q.vertexTangents=Y.vertexTangents,Q.toneMapping=Y.toneMapping}function X_(P,Y,Q,J,Z){Y.isScene!==!0&&(Y=Ae),b.resetTextureUnits();const we=Y.fog,Le=J.isMeshStandardMaterial?Y.environment:null,Ue=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Pi,ke=(J.isMeshStandardMaterial?$:E).get(J.envMap||Le),je=J.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,He=!!Q.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ge=!!Q.morphAttributes.position,Tt=!!Q.morphAttributes.normal,xn=!!Q.morphAttributes.color;let Ot=or;J.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Ot=v.toneMapping);const ui=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,vt=ui!==void 0?ui.length:0,$e=Se.get(J),Nc=g.state.lights;if(K===!0&&(fe===!0||P!==M)){const Rn=P===M&&J.id===D;Be.setState(J,P,Rn)}let Mt=!1;J.version===$e.__version?($e.needsLights&&$e.lightsStateVersion!==Nc.state.version||$e.outputColorSpace!==Ue||Z.isBatchedMesh&&$e.batching===!1||!Z.isBatchedMesh&&$e.batching===!0||Z.isInstancedMesh&&$e.instancing===!1||!Z.isInstancedMesh&&$e.instancing===!0||Z.isSkinnedMesh&&$e.skinning===!1||!Z.isSkinnedMesh&&$e.skinning===!0||Z.isInstancedMesh&&$e.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&$e.instancingColor===!1&&Z.instanceColor!==null||$e.envMap!==ke||J.fog===!0&&$e.fog!==we||$e.numClippingPlanes!==void 0&&($e.numClippingPlanes!==Be.numPlanes||$e.numIntersection!==Be.numIntersection)||$e.vertexAlphas!==je||$e.vertexTangents!==He||$e.morphTargets!==Ge||$e.morphNormals!==Tt||$e.morphColors!==xn||$e.toneMapping!==Ot||le.isWebGL2===!0&&$e.morphTargetsCount!==vt)&&(Mt=!0):(Mt=!0,$e.__version=J.version);let mr=$e.currentProgram;Mt===!0&&(mr=xa(J,Y,Z));let ph=!1,so=!1,Dc=!1;const qt=mr.getUniforms(),gr=$e.uniforms;if(te.useProgram(mr.program)&&(ph=!0,so=!0,Dc=!0),J.id!==D&&(D=J.id,so=!0),ph||M!==P){qt.setValue(k,"projectionMatrix",P.projectionMatrix),qt.setValue(k,"viewMatrix",P.matrixWorldInverse);const Rn=qt.map.cameraPosition;Rn!==void 0&&Rn.setValue(k,Fe.setFromMatrixPosition(P.matrixWorld)),le.logarithmicDepthBuffer&&qt.setValue(k,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&qt.setValue(k,"isOrthographic",P.isOrthographicCamera===!0),M!==P&&(M=P,so=!0,Dc=!0)}if(Z.isSkinnedMesh){qt.setOptional(k,Z,"bindMatrix"),qt.setOptional(k,Z,"bindMatrixInverse");const Rn=Z.skeleton;Rn&&(le.floatVertexTextures?(Rn.boneTexture===null&&Rn.computeBoneTexture(),qt.setValue(k,"boneTexture",Rn.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Z.isBatchedMesh&&(qt.setOptional(k,Z,"batchingTexture"),qt.setValue(k,"batchingTexture",Z._matricesTexture,b));const Ic=Q.morphAttributes;if((Ic.position!==void 0||Ic.normal!==void 0||Ic.color!==void 0&&le.isWebGL2===!0)&&I.update(Z,Q,mr),(so||$e.receiveShadow!==Z.receiveShadow)&&($e.receiveShadow=Z.receiveShadow,qt.setValue(k,"receiveShadow",Z.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(gr.envMap.value=ke,gr.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),so&&(qt.setValue(k,"toneMappingExposure",v.toneMappingExposure),$e.needsLights&&Y_(gr,Dc),we&&J.fog===!0&&xe.refreshFogUniforms(gr,we),xe.refreshMaterialUniforms(gr,J,W,H,Me),Cl.upload(k,dh($e),gr,b)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Cl.upload(k,dh($e),gr,b),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&qt.setValue(k,"center",Z.center),qt.setValue(k,"modelViewMatrix",Z.modelViewMatrix),qt.setValue(k,"normalMatrix",Z.normalMatrix),qt.setValue(k,"modelMatrix",Z.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Rn=J.uniformsGroups;for(let Uc=0,q_=Rn.length;Uc<q_;Uc++)if(le.isWebGL2){const mh=Rn[Uc];Ye.update(mh,mr),Ye.bind(mh,mr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return mr}function Y_(P,Y){P.ambientLightColor.needsUpdate=Y,P.lightProbe.needsUpdate=Y,P.directionalLights.needsUpdate=Y,P.directionalLightShadows.needsUpdate=Y,P.pointLights.needsUpdate=Y,P.pointLightShadows.needsUpdate=Y,P.spotLights.needsUpdate=Y,P.spotLightShadows.needsUpdate=Y,P.rectAreaLights.needsUpdate=Y,P.hemisphereLights.needsUpdate=Y}function $_(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(P,Y,Q){Se.get(P.texture).__webglTexture=Y,Se.get(P.depthTexture).__webglTexture=Q;const J=Se.get(P);J.__hasExternalTextures=!0,J.__hasExternalTextures&&(J.__autoAllocateDepthBuffer=Q===void 0,J.__autoAllocateDepthBuffer||ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(P,Y){const Q=Se.get(P);Q.__webglFramebuffer=Y,Q.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(P,Y=0,Q=0){A=P,C=Y,T=Q;let J=!0,Z=null,we=!1,Le=!1;if(P){const ke=Se.get(P);ke.__useDefaultFramebuffer!==void 0?(te.bindFramebuffer(k.FRAMEBUFFER,null),J=!1):ke.__webglFramebuffer===void 0?b.setupRenderTarget(P):ke.__hasExternalTextures&&b.rebindTextures(P,Se.get(P.texture).__webglTexture,Se.get(P.depthTexture).__webglTexture);const je=P.texture;(je.isData3DTexture||je.isDataArrayTexture||je.isCompressedArrayTexture)&&(Le=!0);const He=Se.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(He[Y])?Z=He[Y][Q]:Z=He[Y],we=!0):le.isWebGL2&&P.samples>0&&b.useMultisampledRTT(P)===!1?Z=Se.get(P).__webglMultisampledFramebuffer:Array.isArray(He)?Z=He[Q]:Z=He,w.copy(P.viewport),z.copy(P.scissor),V=P.scissorTest}else w.copy(G).multiplyScalar(W).floor(),z.copy(q).multiplyScalar(W).floor(),V=X;if(te.bindFramebuffer(k.FRAMEBUFFER,Z)&&le.drawBuffers&&J&&te.drawBuffers(P,Z),te.viewport(w),te.scissor(z),te.setScissorTest(V),we){const ke=Se.get(P.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ke.__webglTexture,Q)}else if(Le){const ke=Se.get(P.texture),je=Y||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,ke.__webglTexture,Q||0,je)}D=-1},this.readRenderTargetPixels=function(P,Y,Q,J,Z,we,Le){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=Se.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Le!==void 0&&(Ue=Ue[Le]),Ue){te.bindFramebuffer(k.FRAMEBUFFER,Ue);try{const ke=P.texture,je=ke.format,He=ke.type;if(je!==Zn&&ue.convert(je)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ge=He===aa&&(ee.has("EXT_color_buffer_half_float")||le.isWebGL2&&ee.has("EXT_color_buffer_float"));if(He!==ar&&ue.convert(He)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_TYPE)&&!(He===qi&&(le.isWebGL2||ee.has("OES_texture_float")||ee.has("WEBGL_color_buffer_float")))&&!Ge){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=P.width-J&&Q>=0&&Q<=P.height-Z&&k.readPixels(Y,Q,J,Z,ue.convert(je),ue.convert(He),we)}finally{const ke=A!==null?Se.get(A).__webglFramebuffer:null;te.bindFramebuffer(k.FRAMEBUFFER,ke)}}},this.copyFramebufferToTexture=function(P,Y,Q=0){const J=Math.pow(2,-Q),Z=Math.floor(Y.image.width*J),we=Math.floor(Y.image.height*J);b.setTexture2D(Y,0),k.copyTexSubImage2D(k.TEXTURE_2D,Q,0,0,P.x,P.y,Z,we),te.unbindTexture()},this.copyTextureToTexture=function(P,Y,Q,J=0){const Z=Y.image.width,we=Y.image.height,Le=ue.convert(Q.format),Ue=ue.convert(Q.type);b.setTexture2D(Q,0),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,Q.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,Q.unpackAlignment),Y.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,J,P.x,P.y,Z,we,Le,Ue,Y.image.data):Y.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,J,P.x,P.y,Y.mipmaps[0].width,Y.mipmaps[0].height,Le,Y.mipmaps[0].data):k.texSubImage2D(k.TEXTURE_2D,J,P.x,P.y,Le,Ue,Y.image),J===0&&Q.generateMipmaps&&k.generateMipmap(k.TEXTURE_2D),te.unbindTexture()},this.copyTextureToTexture3D=function(P,Y,Q,J,Z=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const we=P.max.x-P.min.x+1,Le=P.max.y-P.min.y+1,Ue=P.max.z-P.min.z+1,ke=ue.convert(J.format),je=ue.convert(J.type);let He;if(J.isData3DTexture)b.setTexture3D(J,0),He=k.TEXTURE_3D;else if(J.isDataArrayTexture||J.isCompressedArrayTexture)b.setTexture2DArray(J,0),He=k.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,J.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,J.unpackAlignment);const Ge=k.getParameter(k.UNPACK_ROW_LENGTH),Tt=k.getParameter(k.UNPACK_IMAGE_HEIGHT),xn=k.getParameter(k.UNPACK_SKIP_PIXELS),Ot=k.getParameter(k.UNPACK_SKIP_ROWS),ui=k.getParameter(k.UNPACK_SKIP_IMAGES),vt=Q.isCompressedTexture?Q.mipmaps[Z]:Q.image;k.pixelStorei(k.UNPACK_ROW_LENGTH,vt.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,vt.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,P.min.x),k.pixelStorei(k.UNPACK_SKIP_ROWS,P.min.y),k.pixelStorei(k.UNPACK_SKIP_IMAGES,P.min.z),Q.isDataTexture||Q.isData3DTexture?k.texSubImage3D(He,Z,Y.x,Y.y,Y.z,we,Le,Ue,ke,je,vt.data):Q.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),k.compressedTexSubImage3D(He,Z,Y.x,Y.y,Y.z,we,Le,Ue,ke,vt.data)):k.texSubImage3D(He,Z,Y.x,Y.y,Y.z,we,Le,Ue,ke,je,vt),k.pixelStorei(k.UNPACK_ROW_LENGTH,Ge),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Tt),k.pixelStorei(k.UNPACK_SKIP_PIXELS,xn),k.pixelStorei(k.UNPACK_SKIP_ROWS,Ot),k.pixelStorei(k.UNPACK_SKIP_IMAGES,ui),Z===0&&J.generateMipmaps&&k.generateMipmap(He),te.unbindTexture()},this.initTexture=function(P){P.isCubeTexture?b.setTextureCube(P,0):P.isData3DTexture?b.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?b.setTexture2DArray(P,0):b.setTexture2D(P,0),te.unbindTexture()},this.resetState=function(){C=0,T=0,A=null,te.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===th?"display-p3":"srgb",n.unpackColorSpace=st.workingColorSpace===Tc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Wt?Fr:a_}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Fr?Wt:Pi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class db extends C_{}db.prototype.isWebGL1Renderer=!0;class hb extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}}class Rc extends io{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Jm=new L,eg=new L,tg=new pt,Bu=new bc,sl=new Ac;class vi extends wt{constructor(e=new Gt,n=new Rc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Jm.fromBufferAttribute(n,r-1),eg.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Jm.distanceTo(eg);e.setAttribute("lineDistance",new it(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),sl.copy(i.boundingSphere),sl.applyMatrix4(r),sl.radius+=s,e.ray.intersectsSphere(sl)===!1)return;tg.copy(r).invert(),Bu.copy(e.ray).applyMatrix4(tg);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new L,u=new L,f=new L,h=new L,p=this.isLineSegments?2:1,m=i.index,g=i.attributes.position;if(m!==null){const d=Math.max(0,o.start),_=Math.min(m.count,o.start+o.count);for(let v=d,y=_-1;v<y;v+=p){const C=m.getX(v),T=m.getX(v+1);if(c.fromBufferAttribute(g,C),u.fromBufferAttribute(g,T),Bu.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const D=e.ray.origin.distanceTo(h);D<e.near||D>e.far||n.push({distance:D,point:f.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,o.start),_=Math.min(g.count,o.start+o.count);for(let v=d,y=_-1;v<y;v+=p){if(c.fromBufferAttribute(g,v),u.fromBufferAttribute(g,v+1),Bu.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const T=e.ray.origin.distanceTo(h);T<e.near||T>e.far||n.push({distance:T,point:f.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const ng=new L,ig=new L;class R_ extends vi{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)ng.fromBufferAttribute(n,r),ig.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+ng.distanceTo(ig);e.setAttribute("lineDistance",new it(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ci{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const u=i[r],h=i[r+1]-u,p=(o-u)/h;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new ce:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n){const i=new L,r=[],s=[],o=[],a=new L,l=new pt;for(let p=0;p<=e;p++){const m=p/e;r[p]=this.getTangentAt(m,new L)}s[0]=new L,o[0]=new L;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Xt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,m))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(Xt(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],p*m)),o[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class sh extends ci{constructor(e=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,n){const i=n||new ce,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,p=c-this.aY;l=h*u-p*f+this.aX,c=h*f+p*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class pb extends sh{constructor(e,n,i,r,s,o){super(e,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function oh(){let t=0,e=0,n=0,i=0;function r(s,o,a,l){t=s,e=a,n=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,f){let h=(o-s)/c-(a-s)/(c+u)+(a-o)/u,p=(a-o)/u-(l-o)/(u+f)+(l-a)/f;h*=u,p*=u,r(o,a,h,p)},calc:function(s){const o=s*s,a=o*s;return t+e*s+n*o+i*a}}}const ol=new L,Hu=new oh,Gu=new oh,Vu=new oh;class P_ extends ci{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new L){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(ol.subVectors(r[0],r[1]).add(r[0]),c=ol);const f=r[a%s],h=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(ol.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=ol),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(f),p),x=Math.pow(f.distanceToSquared(h),p),g=Math.pow(h.distanceToSquared(u),p);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Hu.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,m,x,g),Gu.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,m,x,g),Vu.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,m,x,g)}else this.curveType==="catmullrom"&&(Hu.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),Gu.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),Vu.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return i.set(Hu.calc(l),Gu.calc(l),Vu.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new L().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function rg(t,e,n,i,r){const s=(i-e)*.5,o=(r-n)*.5,a=t*t,l=t*a;return(2*n-2*i+s+o)*l+(-3*n+3*i-2*s-o)*a+s*t+n}function mb(t,e){const n=1-t;return n*n*e}function gb(t,e){return 2*(1-t)*t*e}function vb(t,e){return t*t*e}function Bo(t,e,n,i){return mb(t,e)+gb(t,n)+vb(t,i)}function _b(t,e){const n=1-t;return n*n*n*e}function xb(t,e){const n=1-t;return 3*n*n*t*e}function yb(t,e){return 3*(1-t)*t*t*e}function Sb(t,e){return t*t*t*e}function Ho(t,e,n,i,r){return _b(t,e)+xb(t,n)+yb(t,i)+Sb(t,r)}class L_ extends ci{constructor(e=new ce,n=new ce,i=new ce,r=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new ce){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Ho(e,r.x,s.x,o.x,a.x),Ho(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Mb extends ci{constructor(e=new L,n=new L,i=new L,r=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new L){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Ho(e,r.x,s.x,o.x,a.x),Ho(e,r.y,s.y,o.y,a.y),Ho(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class N_ extends ci{constructor(e=new ce,n=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new ce){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new ce){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Eb extends ci{constructor(e=new L,n=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new L){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new L){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class D_ extends ci{constructor(e=new ce,n=new ce,i=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new ce){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Bo(e,r.x,s.x,o.x),Bo(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class I_ extends ci{constructor(e=new L,n=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new L){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Bo(e,r.x,s.x,o.x),Bo(e,r.y,s.y,o.y),Bo(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class U_ extends ci{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new ce){const i=n,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],f=r[o>r.length-3?r.length-1:o+2];return i.set(rg(a,l.x,c.x,u.x,f.x),rg(a,l.y,c.y,u.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new ce().fromArray(r))}return this}}var oc=Object.freeze({__proto__:null,ArcCurve:pb,CatmullRomCurve3:P_,CubicBezierCurve:L_,CubicBezierCurve3:Mb,EllipseCurve:sh,LineCurve:N_,LineCurve3:Eb,QuadraticBezierCurve:D_,QuadraticBezierCurve3:I_,SplineCurve:U_});class wb extends ci{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new oc[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(n.push(u),i=u)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new oc[r.type]().fromJSON(r))}return this}}class sg extends wb{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new N_(this.currentPoint.clone(),new ce(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){const s=new D_(this.currentPoint.clone(),new ce(e,n),new ce(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,o){const a=new L_(this.currentPoint.clone(),new ce(e,n),new ce(i,r),new ce(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new U_(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,n+l,i,r,s,o),this}absarc(e,n,i,r,s,o){return this.absellipse(e,n,i,i,r,s,o),this}ellipse(e,n,i,r,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,n+u,i,r,s,o,a,l),this}absellipse(e,n,i,r,s,o,a,l){const c=new sh(e,n,i,r,s,o,a,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ct extends Gt{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],h=[],p=[];let m=0;const x=[],g=i/2;let d=0;_(),o===!1&&(e>0&&v(!0),n>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new it(f,3)),this.setAttribute("normal",new it(h,3)),this.setAttribute("uv",new it(p,2));function _(){const y=new L,C=new L;let T=0;const A=(n-e)/i;for(let D=0;D<=s;D++){const M=[],w=D/s,z=w*(n-e)+e;for(let V=0;V<=r;V++){const N=V/r,R=N*l+a,U=Math.sin(R),H=Math.cos(R);C.x=z*U,C.y=-w*i+g,C.z=z*H,f.push(C.x,C.y,C.z),y.set(U,A,H).normalize(),h.push(y.x,y.y,y.z),p.push(N,1-w),M.push(m++)}x.push(M)}for(let D=0;D<r;D++)for(let M=0;M<s;M++){const w=x[M][D],z=x[M+1][D],V=x[M+1][D+1],N=x[M][D+1];u.push(w,z,N),u.push(z,V,N),T+=6}c.addGroup(d,T,0),d+=T}function v(y){const C=m,T=new ce,A=new L;let D=0;const M=y===!0?e:n,w=y===!0?1:-1;for(let V=1;V<=r;V++)f.push(0,g*w,0),h.push(0,w,0),p.push(.5,.5),m++;const z=m;for(let V=0;V<=r;V++){const R=V/r*l+a,U=Math.cos(R),H=Math.sin(R);A.x=M*H,A.y=g*w,A.z=M*U,f.push(A.x,A.y,A.z),h.push(0,w,0),T.x=U*.5+.5,T.y=H*.5*w+.5,p.push(T.x,T.y),m++}for(let V=0;V<r;V++){const N=C+V,R=z+V;y===!0?u.push(R,R+1,N):u.push(R+1,R,N),D+=3}c.addGroup(d,D,y===!0?1:2),d+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ct(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ah extends Gt{constructor(e=[],n=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:n,radius:i,detail:r};const s=[],o=[];a(r),c(i),u(),this.setAttribute("position",new it(s,3)),this.setAttribute("normal",new it(s.slice(),3)),this.setAttribute("uv",new it(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(_){const v=new L,y=new L,C=new L;for(let T=0;T<n.length;T+=3)p(n[T+0],v),p(n[T+1],y),p(n[T+2],C),l(v,y,C,_)}function l(_,v,y,C){const T=C+1,A=[];for(let D=0;D<=T;D++){A[D]=[];const M=_.clone().lerp(y,D/T),w=v.clone().lerp(y,D/T),z=T-D;for(let V=0;V<=z;V++)V===0&&D===T?A[D][V]=M:A[D][V]=M.clone().lerp(w,V/z)}for(let D=0;D<T;D++)for(let M=0;M<2*(T-D)-1;M++){const w=Math.floor(M/2);M%2===0?(h(A[D][w+1]),h(A[D+1][w]),h(A[D][w])):(h(A[D][w+1]),h(A[D+1][w+1]),h(A[D+1][w]))}}function c(_){const v=new L;for(let y=0;y<s.length;y+=3)v.x=s[y+0],v.y=s[y+1],v.z=s[y+2],v.normalize().multiplyScalar(_),s[y+0]=v.x,s[y+1]=v.y,s[y+2]=v.z}function u(){const _=new L;for(let v=0;v<s.length;v+=3){_.x=s[v+0],_.y=s[v+1],_.z=s[v+2];const y=g(_)/2/Math.PI+.5,C=d(_)/Math.PI+.5;o.push(y,1-C)}m(),f()}function f(){for(let _=0;_<o.length;_+=6){const v=o[_+0],y=o[_+2],C=o[_+4],T=Math.max(v,y,C),A=Math.min(v,y,C);T>.9&&A<.1&&(v<.2&&(o[_+0]+=1),y<.2&&(o[_+2]+=1),C<.2&&(o[_+4]+=1))}}function h(_){s.push(_.x,_.y,_.z)}function p(_,v){const y=_*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function m(){const _=new L,v=new L,y=new L,C=new L,T=new ce,A=new ce,D=new ce;for(let M=0,w=0;M<s.length;M+=9,w+=6){_.set(s[M+0],s[M+1],s[M+2]),v.set(s[M+3],s[M+4],s[M+5]),y.set(s[M+6],s[M+7],s[M+8]),T.set(o[w+0],o[w+1]),A.set(o[w+2],o[w+3]),D.set(o[w+4],o[w+5]),C.copy(_).add(v).add(y).divideScalar(3);const z=g(C);x(T,w+0,_,z),x(A,w+2,v,z),x(D,w+4,y,z)}}function x(_,v,y,C){C<0&&_.x===1&&(o[v]=_.x-1),y.x===0&&y.z===0&&(o[v]=C/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function d(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ah(e.vertices,e.indices,e.radius,e.details)}}const al=new L,ll=new L,Wu=new L,cl=new In;class Tb extends Gt{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const r=Math.pow(10,4),s=Math.cos(zo*n),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],f=new Array(3),h={},p=[];for(let m=0;m<l;m+=3){o?(c[0]=o.getX(m),c[1]=o.getX(m+1),c[2]=o.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:x,b:g,c:d}=cl;if(x.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),d.fromBufferAttribute(a,c[2]),cl.getNormal(Wu),f[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,f[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,f[2]=`${Math.round(d.x*r)},${Math.round(d.y*r)},${Math.round(d.z*r)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let _=0;_<3;_++){const v=(_+1)%3,y=f[_],C=f[v],T=cl[u[_]],A=cl[u[v]],D=`${y}_${C}`,M=`${C}_${y}`;M in h&&h[M]?(Wu.dot(h[M].normal)<=s&&(p.push(T.x,T.y,T.z),p.push(A.x,A.y,A.z)),h[M]=null):D in h||(h[D]={index0:c[_],index1:c[v],normal:Wu.clone()})}}for(const m in h)if(h[m]){const{index0:x,index1:g}=h[m];al.fromBufferAttribute(a,x),ll.fromBufferAttribute(a,g),p.push(al.x,al.y,al.z),p.push(ll.x,ll.y,ll.z)}this.setAttribute("position",new it(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class O_ extends sg{constructor(e){super(e),this.uuid=no(),this.type="Shape",this.holes=[]}getPointsHoles(e){const n=[];for(let i=0,r=this.holes.length;i<r;i++)n[i]=this.holes[i].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const r=this.holes[n];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(new sg().fromJSON(r))}return this}}const Ab={triangulate:function(t,e,n=2){const i=e&&e.length,r=i?e[0]*n:t.length;let s=F_(t,0,r,n,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,u,f,h,p;if(i&&(s=Lb(t,e,s,n)),t.length>80*n){a=c=t[0],l=u=t[1];for(let m=n;m<r;m+=n)f=t[m],h=t[m+1],f<a&&(a=f),h<l&&(l=h),f>c&&(c=f),h>u&&(u=h);p=Math.max(c-a,u-l),p=p!==0?32767/p:0}return la(s,o,n,a,l,p,0),o}};function F_(t,e,n,i,r){let s,o;if(r===Gb(t,e,n,i)>0)for(s=e;s<n;s+=i)o=og(s,t[s],t[s+1],o);else for(s=n-i;s>=e;s-=i)o=og(s,t[s],t[s+1],o);return o&&Pc(o,o.next)&&(ua(o),o=o.next),o}function Xr(t,e){if(!t)return t;e||(e=t);let n=t,i;do if(i=!1,!n.steiner&&(Pc(n,n.next)||xt(n.prev,n,n.next)===0)){if(ua(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function la(t,e,n,i,r,s,o){if(!t)return;!o&&s&&Ob(t,i,r,s);let a=t,l,c;for(;t.prev!==t.next;){if(l=t.prev,c=t.next,s?Cb(t,i,r,s):bb(t)){e.push(l.i/n|0),e.push(t.i/n|0),e.push(c.i/n|0),ua(t),t=c.next,a=c.next;continue}if(t=c,t===a){o?o===1?(t=Rb(Xr(t),e,n),la(t,e,n,i,r,s,2)):o===2&&Pb(t,e,n,i,r,s):la(Xr(t),e,n,i,r,s,1);break}}}function bb(t){const e=t.prev,n=t,i=t.next;if(xt(e,n,i)>=0)return!1;const r=e.x,s=n.x,o=i.x,a=e.y,l=n.y,c=i.y,u=r<s?r<o?r:o:s<o?s:o,f=a<l?a<c?a:c:l<c?l:c,h=r>s?r>o?r:o:s>o?s:o,p=a>l?a>c?a:c:l>c?l:c;let m=i.next;for(;m!==e;){if(m.x>=u&&m.x<=h&&m.y>=f&&m.y<=p&&Ps(r,a,s,l,o,c,m.x,m.y)&&xt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Cb(t,e,n,i){const r=t.prev,s=t,o=t.next;if(xt(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,u=r.y,f=s.y,h=o.y,p=a<l?a<c?a:c:l<c?l:c,m=u<f?u<h?u:h:f<h?f:h,x=a>l?a>c?a:c:l>c?l:c,g=u>f?u>h?u:h:f>h?f:h,d=td(p,m,e,n,i),_=td(x,g,e,n,i);let v=t.prevZ,y=t.nextZ;for(;v&&v.z>=d&&y&&y.z<=_;){if(v.x>=p&&v.x<=x&&v.y>=m&&v.y<=g&&v!==r&&v!==o&&Ps(a,u,l,f,c,h,v.x,v.y)&&xt(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=p&&y.x<=x&&y.y>=m&&y.y<=g&&y!==r&&y!==o&&Ps(a,u,l,f,c,h,y.x,y.y)&&xt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=d;){if(v.x>=p&&v.x<=x&&v.y>=m&&v.y<=g&&v!==r&&v!==o&&Ps(a,u,l,f,c,h,v.x,v.y)&&xt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=_;){if(y.x>=p&&y.x<=x&&y.y>=m&&y.y<=g&&y!==r&&y!==o&&Ps(a,u,l,f,c,h,y.x,y.y)&&xt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Rb(t,e,n){let i=t;do{const r=i.prev,s=i.next.next;!Pc(r,s)&&z_(r,i,i.next,s)&&ca(r,s)&&ca(s,r)&&(e.push(r.i/n|0),e.push(i.i/n|0),e.push(s.i/n|0),ua(i),ua(i.next),i=t=s),i=i.next}while(i!==t);return Xr(i)}function Pb(t,e,n,i,r,s){let o=t;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&kb(o,a)){let l=k_(o,a);o=Xr(o,o.next),l=Xr(l,l.next),la(o,e,n,i,r,s,0),la(l,e,n,i,r,s,0);return}a=a.next}o=o.next}while(o!==t)}function Lb(t,e,n,i){const r=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*i,l=s<o-1?e[s+1]*i:t.length,c=F_(t,a,l,i,!1),c===c.next&&(c.steiner=!0),r.push(zb(c));for(r.sort(Nb),s=0;s<r.length;s++)n=Db(r[s],n);return n}function Nb(t,e){return t.x-e.x}function Db(t,e){const n=Ib(t,e);if(!n)return e;const i=k_(n,t);return Xr(i,i.next),Xr(n,n.next)}function Ib(t,e){let n=e,i=-1/0,r;const s=t.x,o=t.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const h=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(h<=s&&h>i&&(i=h,r=n.x<n.next.x?n:n.next,h===s))return r}n=n.next}while(n!==e);if(!r)return null;const a=r,l=r.x,c=r.y;let u=1/0,f;n=r;do s>=n.x&&n.x>=l&&s!==n.x&&Ps(o<c?s:i,o,l,c,o<c?i:s,o,n.x,n.y)&&(f=Math.abs(o-n.y)/(s-n.x),ca(n,t)&&(f<u||f===u&&(n.x>r.x||n.x===r.x&&Ub(r,n)))&&(r=n,u=f)),n=n.next;while(n!==a);return r}function Ub(t,e){return xt(t.prev,t,e.prev)<0&&xt(e.next,t,t.next)<0}function Ob(t,e,n,i){let r=t;do r.z===0&&(r.z=td(r.x,r.y,e,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,Fb(r)}function Fb(t){let e,n,i,r,s,o,a,l,c=1;do{for(n=t,t=null,s=null,o=0;n;){for(o++,i=n,a=0,e=0;e<c&&(a++,i=i.nextZ,!!i);e++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||n.z<=i.z)?(r=n,n=n.nextZ,a--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:t=r,r.prevZ=s,s=r;n=i}s.nextZ=null,c*=2}while(o>1);return t}function td(t,e,n,i,r){return t=(t-n)*r|0,e=(e-i)*r|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function zb(t){let e=t,n=t;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==t);return n}function Ps(t,e,n,i,r,s,o,a){return(r-o)*(e-a)>=(t-o)*(s-a)&&(t-o)*(i-a)>=(n-o)*(e-a)&&(n-o)*(s-a)>=(r-o)*(i-a)}function kb(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!Bb(t,e)&&(ca(t,e)&&ca(e,t)&&Hb(t,e)&&(xt(t.prev,t,e.prev)||xt(t,e.prev,e))||Pc(t,e)&&xt(t.prev,t,t.next)>0&&xt(e.prev,e,e.next)>0)}function xt(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function Pc(t,e){return t.x===e.x&&t.y===e.y}function z_(t,e,n,i){const r=fl(xt(t,e,n)),s=fl(xt(t,e,i)),o=fl(xt(n,i,t)),a=fl(xt(n,i,e));return!!(r!==s&&o!==a||r===0&&ul(t,n,e)||s===0&&ul(t,i,e)||o===0&&ul(n,t,i)||a===0&&ul(n,e,i))}function ul(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function fl(t){return t>0?1:t<0?-1:0}function Bb(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&z_(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function ca(t,e){return xt(t.prev,t,t.next)<0?xt(t,e,t.next)>=0&&xt(t,t.prev,e)>=0:xt(t,e,t.prev)<0||xt(t,t.next,e)<0}function Hb(t,e){let n=t,i=!1;const r=(t.x+e.x)/2,s=(t.y+e.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==t);return i}function k_(t,e){const n=new nd(t.i,t.x,t.y),i=new nd(e.i,e.x,e.y),r=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function og(t,e,n,i){const r=new nd(t,e,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function ua(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function nd(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Gb(t,e,n,i){let r=0;for(let s=e,o=n-i;s<n;s+=i)r+=(t[o]-t[s])*(t[s+1]+t[o+1]),o=s;return r}class Go{static area(e){const n=e.length;let i=0;for(let r=n-1,s=0;s<n;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Go.area(e)<0}static triangulateShape(e,n){const i=[],r=[],s=[];ag(e),lg(i,e);let o=e.length;n.forEach(ag);for(let l=0;l<n.length;l++)r.push(o),o+=n[l].length,lg(i,n[l]);const a=Ab.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function ag(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function lg(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class lh extends Gt{constructor(e=new O_([new ce(.5,.5),new ce(-.5,.5),new ce(-.5,-.5),new ce(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:n},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new it(r,3)),this.setAttribute("uv",new it(s,2)),this.computeVertexNormals();function o(a){const l=[],c=n.curveSegments!==void 0?n.curveSegments:12,u=n.steps!==void 0?n.steps:1,f=n.depth!==void 0?n.depth:1;let h=n.bevelEnabled!==void 0?n.bevelEnabled:!0,p=n.bevelThickness!==void 0?n.bevelThickness:.2,m=n.bevelSize!==void 0?n.bevelSize:p-.1,x=n.bevelOffset!==void 0?n.bevelOffset:0,g=n.bevelSegments!==void 0?n.bevelSegments:3;const d=n.extrudePath,_=n.UVGenerator!==void 0?n.UVGenerator:Vb;let v,y=!1,C,T,A,D;d&&(v=d.getSpacedPoints(u),y=!0,h=!1,C=d.computeFrenetFrames(u,!1),T=new L,A=new L,D=new L),h||(g=0,p=0,m=0,x=0);const M=a.extractPoints(c);let w=M.shape;const z=M.holes;if(!Go.isClockWise(w)){w=w.reverse();for(let k=0,de=z.length;k<de;k++){const ee=z[k];Go.isClockWise(ee)&&(z[k]=ee.reverse())}}const N=Go.triangulateShape(w,z),R=w;for(let k=0,de=z.length;k<de;k++){const ee=z[k];w=w.concat(ee)}function U(k,de,ee){return de||console.error("THREE.ExtrudeGeometry: vec does not exist"),k.clone().addScaledVector(de,ee)}const H=w.length,W=N.length;function O(k,de,ee){let le,te,Ce;const Se=k.x-de.x,b=k.y-de.y,E=ee.x-k.x,$=ee.y-k.y,oe=Se*Se+b*b,ie=Se*$-b*E;if(Math.abs(ie)>Number.EPSILON){const ne=Math.sqrt(oe),be=Math.sqrt(E*E+$*$),xe=de.x-b/ne,Ee=de.y+Se/ne,De=ee.x-$/be,Be=ee.y+E/be,re=((De-xe)*$-(Be-Ee)*E)/(Se*$-b*E);le=xe+Se*re-k.x,te=Ee+b*re-k.y;const Xe=le*le+te*te;if(Xe<=2)return new ce(le,te);Ce=Math.sqrt(Xe/2)}else{let ne=!1;Se>Number.EPSILON?E>Number.EPSILON&&(ne=!0):Se<-Number.EPSILON?E<-Number.EPSILON&&(ne=!0):Math.sign(b)===Math.sign($)&&(ne=!0),ne?(le=-b,te=Se,Ce=Math.sqrt(oe)):(le=Se,te=b,Ce=Math.sqrt(oe/2))}return new ce(le/Ce,te/Ce)}const F=[];for(let k=0,de=R.length,ee=de-1,le=k+1;k<de;k++,ee++,le++)ee===de&&(ee=0),le===de&&(le=0),F[k]=O(R[k],R[ee],R[le]);const G=[];let q,X=F.concat();for(let k=0,de=z.length;k<de;k++){const ee=z[k];q=[];for(let le=0,te=ee.length,Ce=te-1,Se=le+1;le<te;le++,Ce++,Se++)Ce===te&&(Ce=0),Se===te&&(Se=0),q[le]=O(ee[le],ee[Ce],ee[Se]);G.push(q),X=X.concat(q)}for(let k=0;k<g;k++){const de=k/g,ee=p*Math.cos(de*Math.PI/2),le=m*Math.sin(de*Math.PI/2)+x;for(let te=0,Ce=R.length;te<Ce;te++){const Se=U(R[te],F[te],le);ye(Se.x,Se.y,-ee)}for(let te=0,Ce=z.length;te<Ce;te++){const Se=z[te];q=G[te];for(let b=0,E=Se.length;b<E;b++){const $=U(Se[b],q[b],le);ye($.x,$.y,-ee)}}}const j=m+x;for(let k=0;k<H;k++){const de=h?U(w[k],X[k],j):w[k];y?(A.copy(C.normals[0]).multiplyScalar(de.x),T.copy(C.binormals[0]).multiplyScalar(de.y),D.copy(v[0]).add(A).add(T),ye(D.x,D.y,D.z)):ye(de.x,de.y,0)}for(let k=1;k<=u;k++)for(let de=0;de<H;de++){const ee=h?U(w[de],X[de],j):w[de];y?(A.copy(C.normals[k]).multiplyScalar(ee.x),T.copy(C.binormals[k]).multiplyScalar(ee.y),D.copy(v[k]).add(A).add(T),ye(D.x,D.y,D.z)):ye(ee.x,ee.y,f/u*k)}for(let k=g-1;k>=0;k--){const de=k/g,ee=p*Math.cos(de*Math.PI/2),le=m*Math.sin(de*Math.PI/2)+x;for(let te=0,Ce=R.length;te<Ce;te++){const Se=U(R[te],F[te],le);ye(Se.x,Se.y,f+ee)}for(let te=0,Ce=z.length;te<Ce;te++){const Se=z[te];q=G[te];for(let b=0,E=Se.length;b<E;b++){const $=U(Se[b],q[b],le);y?ye($.x,$.y+v[u-1].y,v[u-1].x+ee):ye($.x,$.y,f+ee)}}}K(),fe();function K(){const k=r.length/3;if(h){let de=0,ee=H*de;for(let le=0;le<W;le++){const te=N[le];Ne(te[2]+ee,te[1]+ee,te[0]+ee)}de=u+g*2,ee=H*de;for(let le=0;le<W;le++){const te=N[le];Ne(te[0]+ee,te[1]+ee,te[2]+ee)}}else{for(let de=0;de<W;de++){const ee=N[de];Ne(ee[2],ee[1],ee[0])}for(let de=0;de<W;de++){const ee=N[de];Ne(ee[0]+H*u,ee[1]+H*u,ee[2]+H*u)}}i.addGroup(k,r.length/3-k,0)}function fe(){const k=r.length/3;let de=0;Me(R,de),de+=R.length;for(let ee=0,le=z.length;ee<le;ee++){const te=z[ee];Me(te,de),de+=te.length}i.addGroup(k,r.length/3-k,1)}function Me(k,de){let ee=k.length;for(;--ee>=0;){const le=ee;let te=ee-1;te<0&&(te=k.length-1);for(let Ce=0,Se=u+g*2;Ce<Se;Ce++){const b=H*Ce,E=H*(Ce+1),$=de+le+b,oe=de+te+b,ie=de+te+E,ne=de+le+E;Fe($,oe,ie,ne)}}}function ye(k,de,ee){l.push(k),l.push(de),l.push(ee)}function Ne(k,de,ee){Ae(k),Ae(de),Ae(ee);const le=r.length/3,te=_.generateTopUV(i,r,le-3,le-2,le-1);ze(te[0]),ze(te[1]),ze(te[2])}function Fe(k,de,ee,le){Ae(k),Ae(de),Ae(le),Ae(de),Ae(ee),Ae(le);const te=r.length/3,Ce=_.generateSideWallUV(i,r,te-6,te-3,te-2,te-1);ze(Ce[0]),ze(Ce[1]),ze(Ce[3]),ze(Ce[1]),ze(Ce[2]),ze(Ce[3])}function Ae(k){r.push(l[k*3+0]),r.push(l[k*3+1]),r.push(l[k*3+2])}function ze(k){s.push(k.x),s.push(k.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return Wb(n,i,e)}static fromJSON(e,n){const i=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=n[e.shapes[s]];i.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new oc[r.type]().fromJSON(r)),new lh(i,e.options)}}const Vb={generateTopUV:function(t,e,n,i,r){const s=e[n*3],o=e[n*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new ce(s,o),new ce(a,l),new ce(c,u)]},generateSideWallUV:function(t,e,n,i,r,s){const o=e[n*3],a=e[n*3+1],l=e[n*3+2],c=e[i*3],u=e[i*3+1],f=e[i*3+2],h=e[r*3],p=e[r*3+1],m=e[r*3+2],x=e[s*3],g=e[s*3+1],d=e[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new ce(o,1-l),new ce(c,1-f),new ce(h,1-m),new ce(x,1-d)]:[new ce(a,1-l),new ce(u,1-f),new ce(p,1-m),new ce(g,1-d)]}};function Wb(t,e,n){if(n.shapes=[],Array.isArray(t))for(let i=0,r=t.length;i<r;i++){const s=t[i];n.shapes.push(s.uuid)}else n.shapes.push(t.uuid);return n.options=Object.assign({},e),e.extrudePath!==void 0&&(n.options.extrudePath=e.extrudePath.toJSON()),n}class Ls extends ah{constructor(e=1,n=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,n),this.type="OctahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new Ls(e.radius,e.detail)}}class Lc extends Gt{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new L,h=new L,p=[],m=[],x=[],g=[];for(let d=0;d<=i;d++){const _=[],v=d/i;let y=0;d===0&&o===0?y=.5/n:d===i&&l===Math.PI&&(y=-.5/n);for(let C=0;C<=n;C++){const T=C/n;f.x=-e*Math.cos(r+T*s)*Math.sin(o+v*a),f.y=e*Math.cos(o+v*a),f.z=e*Math.sin(r+T*s)*Math.sin(o+v*a),m.push(f.x,f.y,f.z),h.copy(f).normalize(),x.push(h.x,h.y,h.z),g.push(T+y,1-v),_.push(c++)}u.push(_)}for(let d=0;d<i;d++)for(let _=0;_<n;_++){const v=u[d][_+1],y=u[d][_],C=u[d+1][_],T=u[d+1][_+1];(d!==0||o>0)&&p.push(v,y,T),(d!==i-1||l<Math.PI)&&p.push(y,C,T)}this.setIndex(p),this.setAttribute("position",new it(m,3)),this.setAttribute("normal",new it(x,3)),this.setAttribute("uv",new it(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Cr extends Gt{constructor(e=1,n=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new L,f=new L,h=new L;for(let p=0;p<=i;p++)for(let m=0;m<=r;m++){const x=m/r*s,g=p/i*Math.PI*2;f.x=(e+n*Math.cos(g))*Math.cos(x),f.y=(e+n*Math.cos(g))*Math.sin(x),f.z=n*Math.sin(g),a.push(f.x,f.y,f.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),h.subVectors(f,u).normalize(),l.push(h.x,h.y,h.z),c.push(m/r),c.push(p/i)}for(let p=1;p<=i;p++)for(let m=1;m<=r;m++){const x=(r+1)*p+m-1,g=(r+1)*(p-1)+m-1,d=(r+1)*(p-1)+m,_=(r+1)*p+m;o.push(x,g,_),o.push(g,d,_)}this.setIndex(o),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(l,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ch extends Gt{constructor(e=new I_(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),n=64,i=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:n,radius:i,radialSegments:r,closed:s};const o=e.computeFrenetFrames(n,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,l=new L,c=new ce;let u=new L;const f=[],h=[],p=[],m=[];x(),this.setIndex(m),this.setAttribute("position",new it(f,3)),this.setAttribute("normal",new it(h,3)),this.setAttribute("uv",new it(p,2));function x(){for(let v=0;v<n;v++)g(v);g(s===!1?n:0),_(),d()}function g(v){u=e.getPointAt(v/n,u);const y=o.normals[v],C=o.binormals[v];for(let T=0;T<=r;T++){const A=T/r*Math.PI*2,D=Math.sin(A),M=-Math.cos(A);l.x=M*y.x+D*C.x,l.y=M*y.y+D*C.y,l.z=M*y.z+D*C.z,l.normalize(),h.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,f.push(a.x,a.y,a.z)}}function d(){for(let v=1;v<=n;v++)for(let y=1;y<=r;y++){const C=(r+1)*(v-1)+(y-1),T=(r+1)*v+(y-1),A=(r+1)*v+y,D=(r+1)*(v-1)+y;m.push(C,T,D),m.push(T,A,D)}}function _(){for(let v=0;v<=n;v++)for(let y=0;y<=r;y++)c.x=v/n,c.y=y/r,p.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ch(new oc[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class zi extends io{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=l_,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class B_ extends wt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}class jb extends B_{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ke(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const ju=new pt,cg=new L,ug=new L;class Xb{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ih,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new Bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;cg.setFromMatrixPosition(e.matrixWorld),n.position.copy(cg),ug.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(ug),n.updateMatrixWorld(),ju.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ju),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ju)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Yb extends Xb{constructor(){super(new S_(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $b extends B_{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new Yb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class H_{constructor(e,n,i=0,r=1/0){this.ray=new bc(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new nh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}intersectObject(e,n=!0,i=[]){return id(e,this,i,n),i.sort(fg),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)id(e[r],this,i,n);return i.sort(fg),i}}function fg(t,e){return t.distance-e.distance}function id(t,e,n,i){if(t.layers.test(e.layers)&&t.raycast(e,n),i===!0){const r=t.children;for(let s=0,o=r.length;s<o;s++)id(r[s],e,n,!0)}}class dg{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Xt(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class qb extends R_{constructor(e=10,n=10,i=4473924,r=8947848){i=new Ke(i),r=new Ke(r);const s=n/2,o=e/n,a=e/2,l=[],c=[];for(let h=0,p=0,m=-a;h<=n;h++,m+=o){l.push(-a,0,m,a,0,m),l.push(m,0,-a,m,0,a);const x=h===s?i:r;x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3}const u=new Gt;u.setAttribute("position",new it(l,3)),u.setAttribute("color",new it(c,3));const f=new Rc({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jd);const hg={type:"change"},Xu={type:"start"},pg={type:"end"},dl=new bc,mg=new Vi,Zb=Math.cos(70*oE.DEG2RAD);class Kb extends qr{constructor(e,n){super(),this.object=e,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qr.ROTATE,MIDDLE:Qr.DOLLY,RIGHT:Qr.PAN},this.touches={ONE:Jr.ROTATE,TWO:Jr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(I){I.addEventListener("keydown",ne),this._domElementKeyEvents=I},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",ne),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(hg),i.update(),s=r.NONE},this.update=function(){const I=new L,se=new kt().setFromUnitVectors(e.up,new L(0,1,0)),ve=se.clone().invert(),ue=new L,Re=new kt,Ye=new L,Qe=2*Math.PI;return function(me=null){const B=i.object.position;I.copy(B).sub(i.target),I.applyQuaternion(se),a.setFromVector3(I),i.autoRotate&&s===r.NONE&&z(M(me)),i.enableDamping?(a.theta+=l.theta*i.dampingFactor,a.phi+=l.phi*i.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let he=i.minAzimuthAngle,pe=i.maxAzimuthAngle;isFinite(he)&&isFinite(pe)&&(he<-Math.PI?he+=Qe:he>Math.PI&&(he-=Qe),pe<-Math.PI?pe+=Qe:pe>Math.PI&&(pe-=Qe),he<=pe?a.theta=Math.max(he,Math.min(pe,a.theta)):a.theta=a.theta>(he+pe)/2?Math.max(he,a.theta):Math.min(pe,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&T||i.object.isOrthographicCamera?a.radius=F(a.radius):a.radius=F(a.radius*c),I.setFromSpherical(a),I.applyQuaternion(ve),B.copy(i.target).add(I),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let Ie=!1;if(i.zoomToCursor&&T){let Pe=null;if(i.object.isPerspectiveCamera){const et=I.length();Pe=F(et*c);const tt=et-Pe;i.object.position.addScaledVector(y,tt),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const et=new L(C.x,C.y,0);et.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),Ie=!0;const tt=new L(C.x,C.y,0);tt.unproject(i.object),i.object.position.sub(tt).add(et),i.object.updateMatrixWorld(),Pe=I.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;Pe!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(Pe).add(i.object.position):(dl.origin.copy(i.object.position),dl.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(dl.direction))<Zb?e.lookAt(i.target):(mg.setFromNormalAndCoplanarPoint(i.object.up,i.target),dl.intersectPlane(mg,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),Ie=!0);return c=1,T=!1,Ie||ue.distanceToSquared(i.object.position)>o||8*(1-Re.dot(i.object.quaternion))>o||Ye.distanceToSquared(i.target)>0?(i.dispatchEvent(hg),ue.copy(i.object.position),Re.copy(i.object.quaternion),Ye.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",Ee),i.domElement.removeEventListener("pointerdown",Se),i.domElement.removeEventListener("pointercancel",E),i.domElement.removeEventListener("wheel",ie),i.domElement.removeEventListener("pointermove",b),i.domElement.removeEventListener("pointerup",E),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",ne),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const o=1e-6,a=new dg,l=new dg;let c=1;const u=new L,f=new ce,h=new ce,p=new ce,m=new ce,x=new ce,g=new ce,d=new ce,_=new ce,v=new ce,y=new L,C=new ce;let T=!1;const A=[],D={};function M(I){return I!==null?2*Math.PI/60*i.autoRotateSpeed*I:2*Math.PI/60/60*i.autoRotateSpeed}function w(I){const se=Math.abs(I)/(100*(window.devicePixelRatio|0));return Math.pow(.95,i.zoomSpeed*se)}function z(I){l.theta-=I}function V(I){l.phi-=I}const N=function(){const I=new L;return function(ve,ue){I.setFromMatrixColumn(ue,0),I.multiplyScalar(-ve),u.add(I)}}(),R=function(){const I=new L;return function(ve,ue){i.screenSpacePanning===!0?I.setFromMatrixColumn(ue,1):(I.setFromMatrixColumn(ue,0),I.crossVectors(i.object.up,I)),I.multiplyScalar(ve),u.add(I)}}(),U=function(){const I=new L;return function(ve,ue){const Re=i.domElement;if(i.object.isPerspectiveCamera){const Ye=i.object.position;I.copy(Ye).sub(i.target);let Qe=I.length();Qe*=Math.tan(i.object.fov/2*Math.PI/180),N(2*ve*Qe/Re.clientHeight,i.object.matrix),R(2*ue*Qe/Re.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(N(ve*(i.object.right-i.object.left)/i.object.zoom/Re.clientWidth,i.object.matrix),R(ue*(i.object.top-i.object.bottom)/i.object.zoom/Re.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function H(I){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function W(I){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function O(I,se){if(!i.zoomToCursor)return;T=!0;const ve=i.domElement.getBoundingClientRect(),ue=I-ve.left,Re=se-ve.top,Ye=ve.width,Qe=ve.height;C.x=ue/Ye*2-1,C.y=-(Re/Qe)*2+1,y.set(C.x,C.y,1).unproject(i.object).sub(i.object.position).normalize()}function F(I){return Math.max(i.minDistance,Math.min(i.maxDistance,I))}function G(I){f.set(I.clientX,I.clientY)}function q(I){O(I.clientX,I.clientX),d.set(I.clientX,I.clientY)}function X(I){m.set(I.clientX,I.clientY)}function j(I){h.set(I.clientX,I.clientY),p.subVectors(h,f).multiplyScalar(i.rotateSpeed);const se=i.domElement;z(2*Math.PI*p.x/se.clientHeight),V(2*Math.PI*p.y/se.clientHeight),f.copy(h),i.update()}function K(I){_.set(I.clientX,I.clientY),v.subVectors(_,d),v.y>0?H(w(v.y)):v.y<0&&W(w(v.y)),d.copy(_),i.update()}function fe(I){x.set(I.clientX,I.clientY),g.subVectors(x,m).multiplyScalar(i.panSpeed),U(g.x,g.y),m.copy(x),i.update()}function Me(I){O(I.clientX,I.clientY),I.deltaY<0?W(w(I.deltaY)):I.deltaY>0&&H(w(I.deltaY)),i.update()}function ye(I){let se=!1;switch(I.code){case i.keys.UP:I.ctrlKey||I.metaKey||I.shiftKey?V(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):U(0,i.keyPanSpeed),se=!0;break;case i.keys.BOTTOM:I.ctrlKey||I.metaKey||I.shiftKey?V(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):U(0,-i.keyPanSpeed),se=!0;break;case i.keys.LEFT:I.ctrlKey||I.metaKey||I.shiftKey?z(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):U(i.keyPanSpeed,0),se=!0;break;case i.keys.RIGHT:I.ctrlKey||I.metaKey||I.shiftKey?z(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):U(-i.keyPanSpeed,0),se=!0;break}se&&(I.preventDefault(),i.update())}function Ne(I){if(A.length===1)f.set(I.pageX,I.pageY);else{const se=Xe(I),ve=.5*(I.pageX+se.x),ue=.5*(I.pageY+se.y);f.set(ve,ue)}}function Fe(I){if(A.length===1)m.set(I.pageX,I.pageY);else{const se=Xe(I),ve=.5*(I.pageX+se.x),ue=.5*(I.pageY+se.y);m.set(ve,ue)}}function Ae(I){const se=Xe(I),ve=I.pageX-se.x,ue=I.pageY-se.y,Re=Math.sqrt(ve*ve+ue*ue);d.set(0,Re)}function ze(I){i.enableZoom&&Ae(I),i.enablePan&&Fe(I)}function k(I){i.enableZoom&&Ae(I),i.enableRotate&&Ne(I)}function de(I){if(A.length==1)h.set(I.pageX,I.pageY);else{const ve=Xe(I),ue=.5*(I.pageX+ve.x),Re=.5*(I.pageY+ve.y);h.set(ue,Re)}p.subVectors(h,f).multiplyScalar(i.rotateSpeed);const se=i.domElement;z(2*Math.PI*p.x/se.clientHeight),V(2*Math.PI*p.y/se.clientHeight),f.copy(h)}function ee(I){if(A.length===1)x.set(I.pageX,I.pageY);else{const se=Xe(I),ve=.5*(I.pageX+se.x),ue=.5*(I.pageY+se.y);x.set(ve,ue)}g.subVectors(x,m).multiplyScalar(i.panSpeed),U(g.x,g.y),m.copy(x)}function le(I){const se=Xe(I),ve=I.pageX-se.x,ue=I.pageY-se.y,Re=Math.sqrt(ve*ve+ue*ue);_.set(0,Re),v.set(0,Math.pow(_.y/d.y,i.zoomSpeed)),H(v.y),d.copy(_);const Ye=(I.pageX+se.x)*.5,Qe=(I.pageY+se.y)*.5;O(Ye,Qe)}function te(I){i.enableZoom&&le(I),i.enablePan&&ee(I)}function Ce(I){i.enableZoom&&le(I),i.enableRotate&&de(I)}function Se(I){i.enabled!==!1&&(A.length===0&&(i.domElement.setPointerCapture(I.pointerId),i.domElement.addEventListener("pointermove",b),i.domElement.addEventListener("pointerup",E)),De(I),I.pointerType==="touch"?be(I):$(I))}function b(I){i.enabled!==!1&&(I.pointerType==="touch"?xe(I):oe(I))}function E(I){Be(I),A.length===0&&(i.domElement.releasePointerCapture(I.pointerId),i.domElement.removeEventListener("pointermove",b),i.domElement.removeEventListener("pointerup",E)),i.dispatchEvent(pg),s=r.NONE}function $(I){let se;switch(I.button){case 0:se=i.mouseButtons.LEFT;break;case 1:se=i.mouseButtons.MIDDLE;break;case 2:se=i.mouseButtons.RIGHT;break;default:se=-1}switch(se){case Qr.DOLLY:if(i.enableZoom===!1)return;q(I),s=r.DOLLY;break;case Qr.ROTATE:if(I.ctrlKey||I.metaKey||I.shiftKey){if(i.enablePan===!1)return;X(I),s=r.PAN}else{if(i.enableRotate===!1)return;G(I),s=r.ROTATE}break;case Qr.PAN:if(I.ctrlKey||I.metaKey||I.shiftKey){if(i.enableRotate===!1)return;G(I),s=r.ROTATE}else{if(i.enablePan===!1)return;X(I),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Xu)}function oe(I){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;j(I);break;case r.DOLLY:if(i.enableZoom===!1)return;K(I);break;case r.PAN:if(i.enablePan===!1)return;fe(I);break}}function ie(I){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(I.preventDefault(),i.dispatchEvent(Xu),Me(I),i.dispatchEvent(pg))}function ne(I){i.enabled===!1||i.enablePan===!1||ye(I)}function be(I){switch(re(I),A.length){case 1:switch(i.touches.ONE){case Jr.ROTATE:if(i.enableRotate===!1)return;Ne(I),s=r.TOUCH_ROTATE;break;case Jr.PAN:if(i.enablePan===!1)return;Fe(I),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case Jr.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;ze(I),s=r.TOUCH_DOLLY_PAN;break;case Jr.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;k(I),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Xu)}function xe(I){switch(re(I),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;de(I),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;ee(I),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;te(I),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Ce(I),i.update();break;default:s=r.NONE}}function Ee(I){i.enabled!==!1&&I.preventDefault()}function De(I){A.push(I.pointerId)}function Be(I){delete D[I.pointerId];for(let se=0;se<A.length;se++)if(A[se]==I.pointerId){A.splice(se,1);return}}function re(I){let se=D[I.pointerId];se===void 0&&(se=new ce,D[I.pointerId]=se),se.set(I.pageX,I.pageY)}function Xe(I){const se=I.pointerId===A[0]?A[1]:A[0];return D[se]}i.domElement.addEventListener("contextmenu",Ee),i.domElement.addEventListener("pointerdown",Se),i.domElement.addEventListener("pointercancel",E),i.domElement.addEventListener("wheel",ie,{passive:!1}),this.update()}}const Sr=new H_,en=new L,ki=new L,mt=new kt,gg={X:new L(1,0,0),Y:new L(0,1,0),Z:new L(0,0,1)},Yu={type:"change"},vg={type:"mouseDown"},_g={type:"mouseUp",mode:null},xg={type:"objectChange"};class Qb extends wt{constructor(e,n){super(),n===void 0&&(console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'),n=document),this.isTransformControls=!0,this.visible=!1,this.domElement=n,this.domElement.style.touchAction="none";const i=new rC;this._gizmo=i,this.add(i);const r=new sC;this._plane=r,this.add(r);const s=this;function o(_,v){let y=v;Object.defineProperty(s,_,{get:function(){return y!==void 0?y:v},set:function(C){y!==C&&(y=C,r[_]=C,i[_]=C,s.dispatchEvent({type:_+"-changed",value:C}),s.dispatchEvent(Yu))}}),s[_]=v,r[_]=v,i[_]=v}o("camera",e),o("object",void 0),o("enabled",!0),o("axis",null),o("mode","translate"),o("translationSnap",null),o("rotationSnap",null),o("scaleSnap",null),o("space","world"),o("size",1),o("dragging",!1),o("showX",!0),o("showY",!0),o("showZ",!0);const a=new L,l=new L,c=new kt,u=new kt,f=new L,h=new kt,p=new L,m=new L,x=new L,g=0,d=new L;o("worldPosition",a),o("worldPositionStart",l),o("worldQuaternion",c),o("worldQuaternionStart",u),o("cameraPosition",f),o("cameraQuaternion",h),o("pointStart",p),o("pointEnd",m),o("rotationAxis",x),o("rotationAngle",g),o("eye",d),this._offset=new L,this._startNorm=new L,this._endNorm=new L,this._cameraScale=new L,this._parentPosition=new L,this._parentQuaternion=new kt,this._parentQuaternionInv=new kt,this._parentScale=new L,this._worldScaleStart=new L,this._worldQuaternionInv=new kt,this._worldScale=new L,this._positionStart=new L,this._quaternionStart=new kt,this._scaleStart=new L,this._getPointer=Jb.bind(this),this._onPointerDown=tC.bind(this),this._onPointerHover=eC.bind(this),this._onPointerMove=nC.bind(this),this._onPointerUp=iC.bind(this),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp)}updateMatrixWorld(){this.object!==void 0&&(this.object.updateMatrixWorld(),this.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):this.object.parent.matrixWorld.decompose(this._parentPosition,this._parentQuaternion,this._parentScale),this.object.matrixWorld.decompose(this.worldPosition,this.worldQuaternion,this._worldScale),this._parentQuaternionInv.copy(this._parentQuaternion).invert(),this._worldQuaternionInv.copy(this.worldQuaternion).invert()),this.camera.updateMatrixWorld(),this.camera.matrixWorld.decompose(this.cameraPosition,this.cameraQuaternion,this._cameraScale),this.camera.isOrthographicCamera?this.camera.getWorldDirection(this.eye).negate():this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(),super.updateMatrixWorld(this)}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;Sr.setFromCamera(e,this.camera);const n=$u(this._gizmo.picker[this.mode],Sr);n?this.axis=n.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e.button!==0)&&this.axis!==null){Sr.setFromCamera(e,this.camera);const n=$u(this._plane,Sr,!0);n&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(n.point).sub(this.worldPositionStart)),this.dragging=!0,vg.mode=this.mode,this.dispatchEvent(vg)}}pointerMove(e){const n=this.axis,i=this.mode,r=this.object;let s=this.space;if(i==="scale"?s="local":(n==="E"||n==="XYZE"||n==="XYZ")&&(s="world"),r===void 0||n===null||this.dragging===!1||e.button!==-1)return;Sr.setFromCamera(e,this.camera);const o=$u(this._plane,Sr,!0);if(o){if(this.pointEnd.copy(o.point).sub(this.worldPositionStart),i==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),s==="local"&&n!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),n.indexOf("X")===-1&&(this._offset.x=0),n.indexOf("Y")===-1&&(this._offset.y=0),n.indexOf("Z")===-1&&(this._offset.z=0),s==="local"&&n!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),r.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(s==="local"&&(r.position.applyQuaternion(mt.copy(this._quaternionStart).invert()),n.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),n.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),n.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.position.applyQuaternion(this._quaternionStart)),s==="world"&&(r.parent&&r.position.add(en.setFromMatrixPosition(r.parent.matrixWorld)),n.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),n.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),n.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.parent&&r.position.sub(en.setFromMatrixPosition(r.parent.matrixWorld))));else if(i==="scale"){if(n.search("XYZ")!==-1){let a=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(a*=-1),ki.set(a,a,a)}else en.copy(this.pointStart),ki.copy(this.pointEnd),en.applyQuaternion(this._worldQuaternionInv),ki.applyQuaternion(this._worldQuaternionInv),ki.divide(en),n.search("X")===-1&&(ki.x=1),n.search("Y")===-1&&(ki.y=1),n.search("Z")===-1&&(ki.z=1);r.scale.copy(this._scaleStart).multiply(ki),this.scaleSnap&&(n.search("X")!==-1&&(r.scale.x=Math.round(r.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),n.search("Y")!==-1&&(r.scale.y=Math.round(r.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),n.search("Z")!==-1&&(r.scale.z=Math.round(r.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(i==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const a=20/this.worldPosition.distanceTo(en.setFromMatrixPosition(this.camera.matrixWorld));let l=!1;n==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(en.copy(this.rotationAxis).cross(this.eye))*a):(n==="X"||n==="Y"||n==="Z")&&(this.rotationAxis.copy(gg[n]),en.copy(gg[n]),s==="local"&&en.applyQuaternion(this.worldQuaternion),en.cross(this.eye),en.length()===0?l=!0:this.rotationAngle=this._offset.dot(en.normalize())*a),(n==="E"||l)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),s==="local"&&n!=="E"&&n!=="XYZE"?(r.quaternion.copy(this._quaternionStart),r.quaternion.multiply(mt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),r.quaternion.copy(mt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),r.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(Yu),this.dispatchEvent(xg)}}pointerUp(e){e.button===0&&(this.dragging&&this.axis!==null&&(_g.mode=this.mode,this.dispatchEvent(_g)),this.dragging=!1,this.axis=null)}dispose(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}attach(e){return this.object=e,this.visible=!0,this}detach(){return this.object=void 0,this.visible=!1,this.axis=null,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(Yu),this.dispatchEvent(xg),this.pointStart.copy(this.pointEnd))}getRaycaster(){return Sr}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}}function Jb(t){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:t.button};{const e=this.domElement.getBoundingClientRect();return{x:(t.clientX-e.left)/e.width*2-1,y:-(t.clientY-e.top)/e.height*2+1,button:t.button}}}function eC(t){if(this.enabled)switch(t.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(t));break}}function tC(t){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(t)),this.pointerDown(this._getPointer(t)))}function nC(t){this.enabled&&this.pointerMove(this._getPointer(t))}function iC(t){this.enabled&&(this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(t)))}function $u(t,e,n){const i=e.intersectObject(t,!0);for(let r=0;r<i.length;r++)if(i[r].object.visible||n)return i[r];return!1}const hl=new Zr,ot=new L(0,1,0),yg=new L(0,0,0),Sg=new pt,pl=new kt,Rl=new kt,ni=new L,Mg=new pt,Ao=new L(1,0,0),Tr=new L(0,1,0),bo=new L(0,0,1),ml=new L,yo=new L,So=new L;class rC extends wt{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new Ks({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=new Rc({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),i=e.clone();i.opacity=.15;const r=n.clone();r.opacity=.5;const s=e.clone();s.color.setHex(16711680);const o=e.clone();o.color.setHex(65280);const a=e.clone();a.color.setHex(255);const l=e.clone();l.color.setHex(16711680),l.opacity=.5;const c=e.clone();c.color.setHex(65280),c.opacity=.5;const u=e.clone();u.color.setHex(255),u.opacity=.5;const f=e.clone();f.opacity=.25;const h=e.clone();h.color.setHex(16776960),h.opacity=.25,e.clone().color.setHex(16776960);const m=e.clone();m.color.setHex(7895160);const x=new Ct(0,.04,.1,12);x.translate(0,.05,0);const g=new lt(.08,.08,.08);g.translate(0,.04,0);const d=new Gt;d.setAttribute("position",new it([0,0,0,1,0,0],3));const _=new Ct(.0075,.0075,.5,3);_.translate(0,.25,0);function v(U,H){const W=new Cr(U,.0075,3,64,H*Math.PI*2);return W.rotateY(Math.PI/2),W.rotateX(Math.PI/2),W}function y(){const U=new Gt;return U.setAttribute("position",new it([0,0,0,1,1,1],3)),U}const C={X:[[new ge(x,s),[.5,0,0],[0,0,-Math.PI/2]],[new ge(x,s),[-.5,0,0],[0,0,Math.PI/2]],[new ge(_,s),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new ge(x,o),[0,.5,0]],[new ge(x,o),[0,-.5,0],[Math.PI,0,0]],[new ge(_,o)]],Z:[[new ge(x,a),[0,0,.5],[Math.PI/2,0,0]],[new ge(x,a),[0,0,-.5],[-Math.PI/2,0,0]],[new ge(_,a),null,[Math.PI/2,0,0]]],XYZ:[[new ge(new Ls(.1,0),f.clone()),[0,0,0]]],XY:[[new ge(new lt(.15,.15,.01),u.clone()),[.15,.15,0]]],YZ:[[new ge(new lt(.15,.15,.01),l.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ge(new lt(.15,.15,.01),c.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},T={X:[[new ge(new Ct(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new ge(new Ct(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new ge(new Ct(.2,0,.6,4),i),[0,.3,0]],[new ge(new Ct(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new ge(new Ct(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new ge(new Ct(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new ge(new Ls(.2,0),i)]],XY:[[new ge(new lt(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new ge(new lt(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ge(new lt(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]]},A={START:[[new ge(new Ls(.01,2),r),null,null,null,"helper"]],END:[[new ge(new Ls(.01,2),r),null,null,null,"helper"]],DELTA:[[new vi(y(),r),null,null,null,"helper"]],X:[[new vi(d,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new vi(d,r.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new vi(d,r.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},D={XYZE:[[new ge(v(.5,1),m),null,[0,Math.PI/2,0]]],X:[[new ge(v(.5,.5),s)]],Y:[[new ge(v(.5,.5),o),null,[0,0,-Math.PI/2]]],Z:[[new ge(v(.5,.5),a),null,[0,Math.PI/2,0]]],E:[[new ge(v(.75,1),h),null,[0,Math.PI/2,0]]]},M={AXIS:[[new vi(d,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},w={XYZE:[[new ge(new Lc(.25,10,8),i)]],X:[[new ge(new Cr(.5,.1,4,24),i),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new ge(new Cr(.5,.1,4,24),i),[0,0,0],[Math.PI/2,0,0]]],Z:[[new ge(new Cr(.5,.1,4,24),i),[0,0,0],[0,0,-Math.PI/2]]],E:[[new ge(new Cr(.75,.1,2,24),i)]]},z={X:[[new ge(g,s),[.5,0,0],[0,0,-Math.PI/2]],[new ge(_,s),[0,0,0],[0,0,-Math.PI/2]],[new ge(g,s),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new ge(g,o),[0,.5,0]],[new ge(_,o)],[new ge(g,o),[0,-.5,0],[0,0,Math.PI]]],Z:[[new ge(g,a),[0,0,.5],[Math.PI/2,0,0]],[new ge(_,a),[0,0,0],[Math.PI/2,0,0]],[new ge(g,a),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new ge(new lt(.15,.15,.01),u),[.15,.15,0]]],YZ:[[new ge(new lt(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ge(new lt(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new ge(new lt(.1,.1,.1),f.clone())]]},V={X:[[new ge(new Ct(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new ge(new Ct(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new ge(new Ct(.2,0,.6,4),i),[0,.3,0]],[new ge(new Ct(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new ge(new Ct(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new ge(new Ct(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new ge(new lt(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new ge(new lt(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ge(new lt(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new ge(new lt(.2,.2,.2),i),[0,0,0]]]},N={X:[[new vi(d,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new vi(d,r.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new vi(d,r.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function R(U){const H=new wt;for(const W in U)for(let O=U[W].length;O--;){const F=U[W][O][0].clone(),G=U[W][O][1],q=U[W][O][2],X=U[W][O][3],j=U[W][O][4];F.name=W,F.tag=j,G&&F.position.set(G[0],G[1],G[2]),q&&F.rotation.set(q[0],q[1],q[2]),X&&F.scale.set(X[0],X[1],X[2]),F.updateMatrix();const K=F.geometry.clone();K.applyMatrix4(F.matrix),F.geometry=K,F.renderOrder=1/0,F.position.set(0,0,0),F.rotation.set(0,0,0),F.scale.set(1,1,1),H.add(F)}return H}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=R(C)),this.add(this.gizmo.rotate=R(D)),this.add(this.gizmo.scale=R(z)),this.add(this.picker.translate=R(T)),this.add(this.picker.rotate=R(w)),this.add(this.picker.scale=R(V)),this.add(this.helper.translate=R(A)),this.add(this.helper.rotate=R(M)),this.add(this.helper.scale=R(N)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const i=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:Rl;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let r=[];r=r.concat(this.picker[this.mode].children),r=r.concat(this.gizmo[this.mode].children),r=r.concat(this.helper[this.mode].children);for(let s=0;s<r.length;s++){const o=r[s];o.visible=!0,o.rotation.set(0,0,0),o.position.copy(this.worldPosition);let a;if(this.camera.isOrthographicCamera?a=(this.camera.top-this.camera.bottom)/this.camera.zoom:a=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),o.scale.set(1,1,1).multiplyScalar(a*this.size/4),o.tag==="helper"){o.visible=!1,o.name==="AXIS"?(o.visible=!!this.axis,this.axis==="X"&&(mt.setFromEuler(hl.set(0,0,0)),o.quaternion.copy(i).multiply(mt),Math.abs(ot.copy(Ao).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Y"&&(mt.setFromEuler(hl.set(0,0,Math.PI/2)),o.quaternion.copy(i).multiply(mt),Math.abs(ot.copy(Tr).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Z"&&(mt.setFromEuler(hl.set(0,Math.PI/2,0)),o.quaternion.copy(i).multiply(mt),Math.abs(ot.copy(bo).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="XYZE"&&(mt.setFromEuler(hl.set(0,Math.PI/2,0)),ot.copy(this.rotationAxis),o.quaternion.setFromRotationMatrix(Sg.lookAt(yg,ot,Tr)),o.quaternion.multiply(mt),o.visible=this.dragging),this.axis==="E"&&(o.visible=!1)):o.name==="START"?(o.position.copy(this.worldPositionStart),o.visible=this.dragging):o.name==="END"?(o.position.copy(this.worldPosition),o.visible=this.dragging):o.name==="DELTA"?(o.position.copy(this.worldPositionStart),o.quaternion.copy(this.worldQuaternionStart),en.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),en.applyQuaternion(this.worldQuaternionStart.clone().invert()),o.scale.copy(en),o.visible=this.dragging):(o.quaternion.copy(i),this.dragging?o.position.copy(this.worldPositionStart):o.position.copy(this.worldPosition),this.axis&&(o.visible=this.axis.search(o.name)!==-1));continue}o.quaternion.copy(i),this.mode==="translate"||this.mode==="scale"?(o.name==="X"&&Math.abs(ot.copy(Ao).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Y"&&Math.abs(ot.copy(Tr).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Z"&&Math.abs(ot.copy(bo).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XY"&&Math.abs(ot.copy(bo).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="YZ"&&Math.abs(ot.copy(Ao).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XZ"&&Math.abs(ot.copy(Tr).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1)):this.mode==="rotate"&&(pl.copy(i),ot.copy(this.eye).applyQuaternion(mt.copy(i).invert()),o.name.search("E")!==-1&&o.quaternion.setFromRotationMatrix(Sg.lookAt(this.eye,yg,Tr)),o.name==="X"&&(mt.setFromAxisAngle(Ao,Math.atan2(-ot.y,ot.z)),mt.multiplyQuaternions(pl,mt),o.quaternion.copy(mt)),o.name==="Y"&&(mt.setFromAxisAngle(Tr,Math.atan2(ot.x,ot.z)),mt.multiplyQuaternions(pl,mt),o.quaternion.copy(mt)),o.name==="Z"&&(mt.setFromAxisAngle(bo,Math.atan2(ot.y,ot.x)),mt.multiplyQuaternions(pl,mt),o.quaternion.copy(mt))),o.visible=o.visible&&(o.name.indexOf("X")===-1||this.showX),o.visible=o.visible&&(o.name.indexOf("Y")===-1||this.showY),o.visible=o.visible&&(o.name.indexOf("Z")===-1||this.showZ),o.visible=o.visible&&(o.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),o.material._color=o.material._color||o.material.color.clone(),o.material._opacity=o.material._opacity||o.material.opacity,o.material.color.copy(o.material._color),o.material.opacity=o.material._opacity,this.enabled&&this.axis&&(o.name===this.axis||this.axis.split("").some(function(l){return o.name===l}))&&(o.material.color.setHex(16776960),o.material.opacity=1)}super.updateMatrixWorld(e)}}class sC extends ge{constructor(){super(new va(1e5,1e5,2,2),new Ks({visible:!1,wireframe:!0,side:On,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let n=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(n="local"),ml.copy(Ao).applyQuaternion(n==="local"?this.worldQuaternion:Rl),yo.copy(Tr).applyQuaternion(n==="local"?this.worldQuaternion:Rl),So.copy(bo).applyQuaternion(n==="local"?this.worldQuaternion:Rl),ot.copy(yo),this.mode){case"translate":case"scale":switch(this.axis){case"X":ot.copy(this.eye).cross(ml),ni.copy(ml).cross(ot);break;case"Y":ot.copy(this.eye).cross(yo),ni.copy(yo).cross(ot);break;case"Z":ot.copy(this.eye).cross(So),ni.copy(So).cross(ot);break;case"XY":ni.copy(So);break;case"YZ":ni.copy(ml);break;case"XZ":ot.copy(So),ni.copy(yo);break;case"XYZ":case"E":ni.set(0,0,0);break}break;case"rotate":default:ni.set(0,0,0)}ni.length()===0?this.quaternion.copy(this.cameraQuaternion):(Mg.lookAt(en.set(0,0,0),ni,ot),this.quaternion.setFromRotationMatrix(Mg)),super.updateMatrixWorld(e)}}const qu=Math.PI/180;function G_(t){const e=new pt;return e.compose(new L(...t.pose.p),new kt().setFromEuler(new Zr(t.pose.r[0]*qu,t.pose.r[1]*qu,t.pose.r[2]*qu,"ZYX")),new L(1,1,1)),e}function V_(t,e){const n=t.pins.find(i=>i.id===e);return n?new L(n.x,n.y,t.size[2]/2):null}function Zi(t,e,n,i){const r=t.parts.find(a=>a.id===n);if(!r)return null;const s=e[r.lib];if(!s)return null;const o=V_(s,i);return o?(o.applyMatrix4(G_(r)),[o.x,o.y,o.z]):null}function oC(t,e){return new fr(new L(-e.size[0]/2,-e.size[1]/2,-e.size[2]/2),new L(e.size[0]/2,e.size[1]/2,e.size[2]/2)).applyMatrix4(G_(t))}function W_(t,e,n){const i=Zi(t,e,n.a.part,n.a.pin),r=Zi(t,e,n.b.part,n.b.pin);if(!i||!r)return null;const s=(i[2]+r[2])/2,o=[i,...n.pts.map(l=>[l[0],l[1],s]),r];let a=0;for(let l=1;l<o.length;l++)a+=Math.hypot(o[l][0]-o[l-1][0],o[l][1]-o[l-1][1],o[l][2]-o[l-1][2]);return a}function Eg(t,e){if(!t.length)return 0;if(e<=t[0][0])return t[0][1];for(let n=1;n<t.length;n++)if(e<=t[n][0]){const[i,r]=t[n-1],[s,o]=t[n],a=(e-i)/(s-i||1);return r+(o-r)*a}return t[t.length-1][1]}const aC={gnd:4473924,power_src:15026253,power_in:15026253,power_out:15026253,gpio:16111882,motor_out:16747326,motor_in:16747326},Bi=Math.PI/180;function lC({showShell:t}){const e=Oe.useRef(null),n=Oe.useRef({});return Oe.useEffect(()=>{var w;const i=e.current,r=new C_({antialias:!0});r.setPixelRatio(Math.min(2,devicePixelRatio)),i.appendChild(r.domElement);const s=new hb;s.background=new Ke(723725),wt.DEFAULT_UP.set(0,0,1);const o=new Un(40,1,1,5e3);o.up.set(0,0,1),o.position.set(160,-220,180);const a=new Kb(o,r.domElement);a.target.set(0,0,10),a.enableDamping=!0;const l=new Qb(o,r.domElement);l.setTranslationSnap(.5),l.setRotationSnap(15*Bi),l.setSize(.8),s.add(l),s.add(new jb(16777215,2236979,1.1));const c=new $b(16777215,1.4);c.position.set(80,-120,200),s.add(c);const u=new qb(400,40,3355443,1842204);u.rotation.x=Math.PI/2,s.add(u);const f=new yi;s.add(f);const h=new yi;s.add(h);const p=new Map,m=new H_;l.addEventListener("dragging-changed",z=>{a.enabled=!z.value}),l.addEventListener("objectChange",()=>{const z=l.object;if(!z)return;const V=z.userData.id,N=new Zr().setFromQuaternion(z.quaternion,"ZYX"),R=U=>Math.round(U*2)/2;dt(U=>{const H=U.parts.find(W=>W.id===V);H&&(H.pose.p=[R(z.position.x),R(z.position.y),R(z.position.z)],H.pose.r=[Math.round(N.x/Bi),Math.round(N.y/Bi),Math.round(N.z/Bi)])},{merge:"3d"+V})});let x=null;r.domElement.addEventListener("pointerdown",z=>{x=[z.clientX,z.clientY]}),r.domElement.addEventListener("pointerup",z=>{if(!x||Math.hypot(z.clientX-x[0],z.clientY-x[1])>4||l.dragging)return;const V=r.domElement.getBoundingClientRect();m.setFromCamera(new ce((z.clientX-V.left)/V.width*2-1,-((z.clientY-V.top)/V.height)*2+1),o);const R=m.intersectObjects([...p.values()].map(H=>H.g),!0).find(H=>{let W=H.object;for(;W&&!W.userData.id;)W=W.parent;return!!W});let U=R?R.object:null;for(;U&&!U.userData.id;)U=U.parent;nt.getState().set({sel:U?{kind:"part",id:U.userData.id}:null})});function g(z,V){const N=new yi;N.userData.id=z.id;const R=new yi,U=new yi;N.add(R),R.add(U);const H=new zi({color:V.color,roughness:.6,metalness:V.kind==="motor"?.6:.1}),W=[H],[O,F,G]=V.size;let q;if(V.shape==="cyl"){const X=new Ct(Math.min(O,F)/2,Math.min(O,F)/2,G,24);X.rotateX(Math.PI/2),q=new ge(X,H)}else if(V.shape==="wheel"){const X=new Ct(F/2,F/2,O,32);X.rotateZ(Math.PI/2),q=new ge(X,H);const j=new zi({color:12303291,metalness:.8,roughness:.3});W.push(j);const K=new ge(new lt(O+.4,F*.5,F*.12),j);q.add(K)}else if(V.shape==="motor"){const X=Math.min(O,G)/2,j=new Ct(X,X,F*.6,24);q=new ge(j,H),q.position.y=-F*.15;const K=new ge(new lt(O,F*.32,G),new zi({color:13934615,metalness:.7,roughness:.35}));K.position.y=F*.3,q.add(K);const fe=new ge(new Ct(1.5,1.5,9,12),new zi({color:14540253,metalness:.9}));fe.position.y=F*.62,q.add(fe)}else if(q=new ge(new lt(O,F,G),H),V.kind==="mcu"){const X=new ge(new lt(9,7,3.2),new zi({color:13421772,metalness:.9,roughness:.2}));X.position.set(0,F/2-2.5,G/2+1.2),q.add(X)}U.add(q);for(const X of V.pins){const j=V_(V,X.id),K=new ge(new Lc(.7,8,6),new Ks({color:aC[X.type]??8947967}));K.position.copy(j),N.add(K)}return{g:N,yaw:R,spin:U,lib:z.lib,mats:W}}function d(z,V,N,R){var q;const U=new Set;for(const X of z.parts){const j=V[X.lib];if(!j)continue;U.add(X.id);let K=p.get(X.id);(!K||K.lib!==X.lib)&&(K&&s.remove(K.g),K=g(X,j),p.set(X.id,K),s.add(K.g)),(!l.dragging||l.object!==K.g)&&(K.g.position.set(...X.pose.p),K.g.rotation.set(X.pose.r[0]*Bi,X.pose.r[1]*Bi,X.pose.r[2]*Bi,"ZYX"));const fe=(N==null?void 0:N.kind)==="part"&&N.id===X.id;K.mats[0].emissive.setHex(fe?5583616:R.includes(X.id)?6684672:0)}for(const[X,j]of p)U.has(X)||(s.remove(j.g),p.delete(X));const H=(N==null?void 0:N.kind)==="part"?(q=p.get(N.id))==null?void 0:q.g:void 0;H?l.object!==H&&l.attach(H):l.detach(),h.clear();for(const X of z.wires){const j=Zi(z,V,X.a.part,X.a.pin),K=Zi(z,V,X.b.part,X.b.pin);if(!j||!K)continue;const fe=Math.max(j[2],K[2])+2,Me=[new L(...j),new L(j[0],j[1],fe),...X.pts.map(Ae=>new L(Ae[0],Ae[1],fe)),new L(K[0],K[1],fe),new L(...K)],ye=new P_(Me,!1,"centripetal",.2),Ne=(N==null?void 0:N.kind)==="wire"&&N.id===X.id,Fe=new ge(new ch(ye,Math.max(8,Me.length*8),Ne?.7:.45,6),new zi({color:X.color==="#222222"?3815994:X.color,emissive:Ne?4473924:0}));h.add(Fe)}f.clear();const W=z.enclosure,O=new ge(new lt(...W.size)),F=new R_(new Tb(O.geometry),new Rc({color:16726832,transparent:!0,opacity:.5}));F.position.set(0,0,W.size[2]/2),f.add(F);const G=new ge(new va(W.size[0],W.size[1]),new zi({color:2236966,transparent:!0,opacity:.6,side:On}));if(G.position.z=W.floor,f.add(G),n.current.showShell){const X=new ge(cC(W.size),new zi({color:12632264,transparent:!0,opacity:.16,depthWrite:!1,side:On,metalness:.5,roughness:.3}));f.add(X)}for(const X of W.keepOut){const j=new ge(new lt(...X.s),new Ks({color:16726832,transparent:!0,opacity:.12,depthWrite:!1}));j.position.set(...X.c),f.add(j)}}let _=performance.now();const v=new Map;function y(z){const V=Math.min(.05,(z-_)/1e3);_=z;const N=nt.getState();if(N.doc){let R=N.t;N.playing&&(R=(R+V)%(N.doc.anim.duration||8),N.set({t:R}));const U=N.live||{steer:Eg(N.doc.anim.channels.steer,R),throttle:Eg(N.doc.anim.channels.throttle,R)};for(const H of N.doc.rig.joints){const W=p.get(H.part);if(!W)continue;const O=U[H.channel];if(H.kind==="yaw")W.yaw.rotation.z=-O*N.doc.rig.steerMaxDeg*Bi;else if(H.kind==="spin"){const F=(v.get(H.id)||0)+O*V*25;v.set(H.id,F),W.spin.rotation.x=F}}}a.update(),r.render(s,o),C=requestAnimationFrame(y)}let C=requestAnimationFrame(y);const T=new ResizeObserver(()=>{const z=i.getBoundingClientRect();r.setSize(z.width,z.height),o.aspect=z.width/Math.max(1,z.height),o.updateProjectionMatrix()});T.observe(i),n.current={sync:d,tc:l,cam:o,orbit:a,showShell:t};const A=nt.subscribe((z,V)=>{if(z.doc!==V.doc||z.sel!==V.sel||z.highlight!==V.highlight||z.lib!==V.lib){const N=nt.getState();N.doc&&d(N.doc,N.lib,N.sel,N.highlight)}z.gizmo!==V.gizmo&&l.setMode(z.gizmo)}),D=nt.getState();D.doc&&d(D.doc,D.lib,D.sel,D.highlight);const M=(w=D.doc)==null?void 0:w.enclosure.size;if(M){const z=Math.max(M[0],M[1])*1.3;o.position.set(z*.7,-z,z*.8)}return()=>{cancelAnimationFrame(C),T.disconnect(),A(),l.dispose(),a.dispose(),r.dispose(),i.removeChild(r.domElement)}},[]),Oe.useEffect(()=>{n.current.showShell=t;const i=nt.getState();i.doc&&n.current.sync&&n.current.sync(i.doc,i.lib,i.sel,i.highlight)},[t]),S.jsx("div",{className:"v3d",ref:e})}function cC(t){const[e,n,i]=t,r=-n/2,s=new O_,o=[[0,.12],[.02,.4],[.18,.5],[.38,.62],[.48,.98],[.72,1],[.9,.72],[1,.58],[1,.12],[.88,.04],[.12,.04]];s.moveTo(r+o[0][0]*n,o[0][1]*i);for(const[c,u]of o.slice(1))s.lineTo(r+c*n,u*i);const a=new lh(s,{depth:e,bevelEnabled:!0,bevelSize:Math.min(4,e*.08),bevelThickness:Math.min(4,e*.08),bevelSegments:3});a.translate(0,0,-e/2);const l=new pt().set(0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1);return a.applyMatrix4(l),a}function fa(t,e){var c;const n=new Map,i=u=>{let f=u;for(;n.get(f)!==f;)f=n.get(f);let h=u;for(;n.get(h)!==f;){const p=n.get(h);n.set(h,f),h=p}return f},r=u=>{n.has(u)||n.set(u,u)};for(const u of t.wires){const f=`${u.a.part}.${u.a.pin}`,h=`${u.b.part}.${u.b.pin}`;r(f),r(h);const p=i(f),m=i(h);p!==m&&n.set(p,m)}for(const u of t.parts)if(u.lib==="switch"){const f=`${u.id}.IN`,h=`${u.id}.OUT`;if(n.has(f)&&n.has(h)){const p=i(f),m=i(h);p!==m&&n.set(p,m)}}const s=new Map;for(const u of n.keys()){const[f,h]=u.split("."),p=t.parts.find(g=>g.id===f),m=p&&((c=e[p.lib])==null?void 0:c.pins.find(g=>g.id===h));if(!p||!m)continue;const x=i(u);s.has(x)||s.set(x,[]),s.get(x).push({part:f,pin:h,def:m,label:`${p.label}.${h}`})}const o=[],a=new Map;let l=0;for(const u of s.values()){const f=++l,h=u.some(g=>g.def.type==="gnd")?"gnd":u.some(g=>/power|cap_pos/.test(g.def.type))?"power":u.some(g=>/motor/.test(g.def.type))?"motor":"signal",p=u.find(g=>g.def.type==="power_src")||u.find(g=>g.def.type==="power_out"),m=u.find(g=>g.def.gpio!=null),x=h==="gnd"?"GND":p?`${p.label}`:m?`GPIO${m.def.gpio}`:u[0].label;o.push({id:f,pins:u,name:x,kind:h});for(const g of u)a.set(`${g.part}.${g.pin}`,f)}return{nets:o,netOf:a}}function uC(t,e){var l;const n=[],{nets:i}=fa(t,e),r=c=>[...new Set(c.pins.map(u=>u.part))];for(const c of i){const u=c.pins.filter(p=>p.def.type==="power_src"||p.def.type==="power_out"),f=c.pins.some(p=>p.def.type==="gnd");if(f&&u.length&&n.push({level:"err",text:`短路！${u.map(p=>p.label).join("、")} 接到了 GND`,parts:r(c)}),u.length>1&&n.push({level:"err",text:`两个电源接在一起：${u.map(p=>p.label).join(" + ")}`,parts:r(c)}),u.length&&!f){const p=u[0].def.v||[0,0];for(const m of c.pins)m===u[0]||!m.def.v||m.def.type==="gnd"||(p[1]>m.def.v[1]+.05?n.push({level:"err",text:`${m.label} 最高 ${m.def.v[1]}V，但 ${u[0].label} 最高 ${p[1]}V → 会烧`,parts:[m.part,u[0].part]}):m.def.type==="power_in"&&p[0]<m.def.v[0]-.05&&n.push({level:"warn",text:`${m.label} 至少要 ${m.def.v[0]}V，${u[0].label} 低电时只有 ${p[0]}V（会断电/重启）`,parts:[m.part,u[0].part]}))}const h=c.pins.filter(p=>p.def.gpio!=null);h.length>1&&n.push({level:"err",text:`两个 GPIO 接在一起：${h.map(p=>p.label).join("、")}`,parts:r(c)});for(const p of h){for(const m of c.pins)if(m!==p){/power|gnd|motor/.test(m.def.type)&&n.push({level:"err",text:`${p.label} 直接接到 ${m.label}（${m.def.type==="gnd"?"地":/motor/.test(m.def.type)?"电机":"电源"}）→ GPIO 会烧`,parts:[p.part,m.part]});for(const x of m.def.need||[])(p.def.caps||[]).includes(x)||n.push({level:"err",text:`${m.label} 需要 ${x.toUpperCase()}，${p.label} 没有这个功能`,parts:[p.part,m.part]});(p.def.caps||[]).length===2&&p.def.caps.includes("in")&&/logic_in|logic_io/.test(m.def.type)&&n.push({level:"err",text:`${p.label} 只能输入，不能驱动 ${m.label}`,parts:[p.part,m.part]}),m.def.v&&m.def.type==="logic_out"&&m.def.v[1]>3.6&&n.push({level:"err",text:`${m.label} 输出 ${m.def.v[1]}V，ESP32 只能 3.3V`,parts:[p.part,m.part]})}p.def.strap&&c.pins.length>1&&n.push({level:"warn",text:`${p.label}：${p.def.strap}`,parts:[p.part]}),(l=p.def.note)!=null&&l.includes("别用")&&n.push({level:"warn",text:`${p.label}：${p.def.note}`,parts:[p.part]})}c.kind==="motor"&&c.pins.filter(p=>p.def.type==="motor_out").length>1&&new Set(c.pins.filter(m=>m.def.type==="motor_out").map(m=>m.part+m.def.ch+m.pin)).size>1&&n.push({level:"err",text:`驱动的两个输出接在一起：${c.pins.filter(m=>m.def.type==="motor_out").map(m=>m.label).join("、")}`,parts:r(c)})}const{netOf:s}=fa(t,e);for(const c of t.parts){const u=e[c.lib];if(!u){n.push({level:"err",text:`零件库里没有 ${c.lib}`,parts:[c.id]});continue}if(!u.pins.length)continue;if(!u.pins.filter(m=>s.has(`${c.id}.${m.id}`)).length){["wheel"].includes(u.kind)||n.push({level:"info",text:`${c.label} 还没接线`,parts:[c.id]});continue}const h=u.pins.filter(m=>m.type==="power_in");h.length&&!h.some(m=>s.has(`${c.id}.${m.id}`))&&u.kind!=="motor"&&n.push({level:"warn",text:`${c.label} 没接电源`,parts:[c.id]});const p=u.pins.filter(m=>m.type==="gnd");p.length&&u.kind!=="motor"&&!p.some(m=>s.has(`${c.id}.${m.id}`))&&n.push({level:"warn",text:`${c.label} 没接 GND`,parts:[c.id]})}for(const c of i){const u=c.pins.find(h=>h.def.type==="power_out"&&h.def.maxmA);if(!u)continue;const f=[...new Set(c.pins.filter(h=>h.def.type==="power_in").map(h=>h.part))].reduce((h,p)=>h+(e[t.parts.find(m=>m.id===p).lib].drawmA||0),0);f>u.def.maxmA&&n.push({level:"err",text:`${u.label} 最多 ${u.def.maxmA}mA，接的东西约 ${f}mA`,parts:[u.part]})}const o={err:0,warn:1,info:2},a=new Set;return n.filter(c=>!a.has(c.text)&&a.add(c.text)).sort((c,u)=>o[c.level]-o[u.level])}function fC(t,e,n){const{nets:i}=fa(t,e),r=new Map,s=[];let o;for(const u of t.parts){const f=e[u.lib];if(f){f.driver&&(o=f.driver);for(const h of f.pins){if(!h.fw)continue;const p=i.find(x=>x.pins.some(g=>g.part===u.id&&g.pin===h.id)),m=p==null?void 0:p.pins.find(x=>x.part===n.mcu&&x.def.gpio!=null);m?r.set(h.fw,m.def.gpio):s.push(`${u.label}.${h.id}（${h.fw}）`)}}}const a=["// 由 RC Studio 从接线图生成，别手改（改接线图再生成）",`// 项目：${t.name}  目标：${n.target}`,"#pragma once"];o&&a.push(`#define RC_DRIVER ${o}`);const l=["ENA","IN1","IN2","ENB","IN3","IN4","SERVO","SDA","SCL","BUZ","BATT"];for(const u of[...r.keys()].sort((f,h)=>l.indexOf(f)-l.indexOf(h)))a.push(`#define RC_PIN_${u} ${r.get(u)}`);const c=[["IN1","IN2"],["SDA","SCL"],["ENB","IN3","IN4"]];for(const u of c){const f=u.filter(h=>r.has(h));f.length&&f.length<u.length&&s.push(`${u.join("/")} 要一起接`)}return{text:a.join(`
`)+`
`,missing:s}}function dC(t,e){const n=new Map;for(const i of t.parts)n.set(i.lib,(n.get(i.lib)||0)+1);return[...n.entries()].map(([i,r])=>{var s,o,a;return{id:i,n:r,name:((s=e[i])==null?void 0:s.name)||i,price:((o=e[i])==null?void 0:o.price)||"",verified:(a=e[i])==null?void 0:a.verified}})}function hC(){var V;const{doc:t,lib:e,sel:n,tool:i,pending:r,highlight:s,set:o}=nt(),a=Oe.useRef(null),[l,c]=Oe.useState({s:4,ox:300,oy:340}),[u,f]=Oe.useState(null),[h,p]=Oe.useState(null),m=Oe.useRef(null),x=Oe.useMemo(()=>t?fa(t,e):null,[t,e]);if(Oe.useEffect(()=>{const N=a.current;if(!N||!t)return;const R=N.getBoundingClientRect(),U=t.enclosure.size,H=Math.min(R.width/(U[0]+40),R.height/(U[1]+40));c({s:H,ox:R.width/2,oy:R.height/2})},[t==null?void 0:t.name]),!t)return null;const g=(N,R)=>{const U=a.current.getBoundingClientRect();return[(N-U.left-l.ox)/l.s,-(R-U.top-l.oy)/l.s]},d=N=>N*l.s+l.ox,_=N=>-N*l.s+l.oy,v=(N,R)=>R.altKey?Math.round(N*10)/10:Math.round(N*2)/2,y=(N,R,U,H)=>{var O,F;if(N.button===2)return;N.stopPropagation(),(F=(O=N.target).setPointerCapture)==null||F.call(O,N.pointerId);const W=R==="part"?t.parts.find(G=>G.id===U).pose.p:null;m.current={kind:R,id:U,idx:H,sx:N.clientX,sy:N.clientY,v0:l,p0:W?[W[0],W[1]]:void 0},R==="part"&&i!=="wire"&&o({sel:{kind:"part",id:U}}),R==="pan"&&i==="select"&&o({sel:null}),R==="pan"&&i==="wire"&&r&&o({pending:null})},C=N=>{f(g(N.clientX,N.clientY));const R=m.current;if(!R)return;const U=N.clientX-R.sx,H=N.clientY-R.sy;if(R.kind==="pan")c({...R.v0,ox:R.v0.ox+U,oy:R.v0.oy+H});else if(R.kind==="part"&&R.p0){if(R.wire){if(Math.hypot(U,H)<4)return;o({sel:{kind:"part",id:R.id}}),R.wire=null}dt(W=>{const O=W.parts.find(F=>F.id===R.id);O.pose.p[0]=v(R.p0[0]+U/l.s,N),O.pose.p[1]=v(R.p0[1]-H/l.s,N)},{merge:"mv"+R.id})}else if(R.kind==="pt"){const W=g(N.clientX,N.clientY);dt(O=>{const F=O.wires.find(G=>G.id===R.id);F.pts[R.idx]=[v(W[0],N),v(W[1],N)]},{merge:"pt"+R.id+R.idx})}},T=()=>{const N=m.current;N&&N.wire&&o({sel:{kind:"wire",id:N.wire}}),m.current=null},A=N=>{const R=a.current.getBoundingClientRect(),U=N.clientX-R.left,H=N.clientY-R.top,W=Math.exp(-N.deltaY*.0015),O=Math.max(.5,Math.min(60,l.s*W)),F=O/l.s;c({s:O,ox:U-(U-l.ox)*F,oy:H-(H-l.oy)*F})},D=t.enclosure,M=l.s>9,w=[...t.parts].sort((N,R)=>N.pose.p[2]-R.pose.p[2]),z=h!=null?new Set((V=x.nets.find(N=>N.id===h))==null?void 0:V.pins.map(N=>`${N.part}.${N.pin}`)):null;return S.jsxs("div",{className:"wiring",onDragOver:N=>N.preventDefault(),onDrop:N=>{const R=N.dataTransfer.getData("text/rc-part");R&&Zv(R,g(N.clientX,N.clientY))},children:[S.jsxs("svg",{ref:a,className:"wsvg tool-"+i,onPointerDown:N=>y(N,"pan"),onPointerMove:C,onPointerUp:T,onWheel:A,onContextMenu:N=>N.preventDefault(),children:[S.jsxs("defs",{children:[S.jsx("pattern",{id:"hatch",width:"6",height:"6",patternUnits:"userSpaceOnUse",patternTransform:"rotate(45)",children:S.jsx("line",{x1:"0",y1:"0",x2:"0",y2:"6",stroke:"#ff3b3055",strokeWidth:"2"})}),S.jsx("pattern",{id:"grid",width:10*l.s,height:10*l.s,patternUnits:"userSpaceOnUse",x:l.ox,y:l.oy,children:S.jsx("path",{d:`M ${10*l.s} 0 L 0 0 0 ${10*l.s}`,fill:"none",stroke:"#ffffff0d"})})]}),S.jsx("rect",{width:"100%",height:"100%",fill:"url(#grid)"}),S.jsx("rect",{x:d(-D.size[0]/2),y:_(D.size[1]/2),width:D.size[0]*l.s,height:D.size[1]*l.s,rx:8*l.s,className:"encl"}),S.jsxs("text",{x:d(0),y:_(D.size[1]/2)-6,className:"dimtxt",textAnchor:"middle",children:["车头 ↑  ",D.size[0],"×",D.size[1],"×",D.size[2],"mm"]}),D.keepOut.map((N,R)=>S.jsx("g",{children:S.jsx("rect",{x:d(N.c[0]-N.s[0]/2),y:_(N.c[1]+N.s[1]/2),width:N.s[0]*l.s,height:N.s[1]*l.s,fill:"url(#hatch)",stroke:"#ff3b3066"})},R)),w.map(N=>{const R=e[N.lib];if(!R)return null;const U=(n==null?void 0:n.kind)==="part"&&n.id===N.id,H=s.includes(N.id),[W,O]=[R.size[0]*l.s,R.size[1]*l.s],F=R.shape==="cyl"?Math.min(W,O)/2:R.shape==="wheel"?2*l.s:1.2*l.s;return S.jsx("g",{className:"wpart"+(U?" on":"")+(H?" hl":"")+(R.kind==="wheel"?" wheel":""),onPointerDown:G=>y(G,"part",N.id),children:S.jsxs("g",{transform:`translate(${d(N.pose.p[0])},${_(N.pose.p[1])}) rotate(${-N.pose.r[2]})`,children:[S.jsx("rect",{x:-W/2,y:-O/2,width:W,height:O,rx:F,fill:R.color}),l.s>3&&S.jsx("text",{y:R.size[1]*l.s/2-4,className:"plabel",textAnchor:"middle",children:N.label})]})},N.id)}),t.wires.map(N=>{const R=Zi(t,e,N.a.part,N.a.pin),U=Zi(t,e,N.b.part,N.b.pin);if(!R||!U)return null;const H=[[R[0],R[1]],...N.pts,[U[0],U[1]]],W="M"+H.map(F=>`${d(F[0])},${_(F[1])}`).join(" L"),O=(n==null?void 0:n.kind)==="wire"&&n.id===N.id;return S.jsxs("g",{className:"wire"+(O?" on":""),children:[S.jsx("path",{d:W,className:"whit",onPointerDown:F=>{var q,X;if(F.stopPropagation(),i==="cut"){dt(j=>{j.wires=j.wires.filter(K=>K.id!==N.id)}),o({sel:null});return}const G=pC(t,e,g(F.clientX,F.clientY));if(G&&i==="select"){(X=(q=F.target).setPointerCapture)==null||X.call(q,F.pointerId);const j=t.parts.find(K=>K.id===G).pose.p;m.current={kind:"part",id:G,sx:F.clientX,sy:F.clientY,v0:l,p0:[j[0],j[1]],wire:N.id}}else o({sel:{kind:"wire",id:N.id}})},onDoubleClick:F=>{const G=g(F.clientX,F.clientY);dt(q=>{q.wires.find(j=>j.id===N.id).pts.splice(mC(H,G),0,[Math.round(G[0]*2)/2,Math.round(G[1]*2)/2])})}}),S.jsx("path",{d:W,className:"wline",stroke:N.color==="#222222"?"#5a5a5a":N.color,strokeWidth:Math.max(1.5,.9*l.s)}),O&&N.pts.map((F,G)=>S.jsx("circle",{cx:d(F[0]),cy:_(F[1]),r:5,className:"bend",onPointerDown:q=>y(q,"pt",N.id,G),onDoubleClick:q=>{q.stopPropagation(),dt(X=>{X.wires.find(j=>j.id===N.id).pts.splice(G,1)})}},G))]},N.id)}),w.map(N=>{const R=e[N.lib];return R?R.pins.map(U=>{const H=Zi(t,e,N.id,U.id),W=`${N.id}.${U.id}`,O=x.netOf.get(W),F=r&&r.part===N.id&&r.pin===U.id,G="pin t-"+U.type+(O?" used":"")+(F?" pend":"")+(z!=null&&z.has(W)?" net":"");return S.jsxs("g",{className:G,onPointerDown:q=>{q.stopPropagation(),sM({part:N.id,pin:U.id})},onPointerEnter:()=>p(O??null),onPointerLeave:()=>p(null),children:[S.jsx("circle",{cx:d(H[0]),cy:_(H[1]),r:Math.max(2.5,.75*l.s)}),M&&S.jsx("text",{x:d(H[0]),y:_(H[1])-.75*l.s-2,className:"pinlabel",textAnchor:"middle",children:U.id}),S.jsxs("title",{children:[N.label,".",U.id," · ",U.type,U.v?` · ${U.v[0]}–${U.v[1]}V`:"",U.strap?" · ⚠ "+U.strap:"",U.note?" · "+U.note:""]})]},W)}):null}),r&&u&&(()=>{const N=Zi(t,e,r.part,r.pin);return N&&S.jsx("line",{x1:d(N[0]),y1:_(N[1]),x2:d(u[0]),y2:_(u[1]),className:"pendline"})})()]}),S.jsxs("div",{className:"wbar mono dim small",children:[u?`x ${u[0].toFixed(1)}  y ${u[1].toFixed(1)} mm`:""," · 滚轮缩放 · 拖空白平移 · 拖零件移动（Alt 精细） · 双击导线加拐点"]})]})}function pC(t,e,n){var r;return((r=t.parts.filter(s=>{const o=e[s.lib];if(!o||o.kind==="wheel")return!1;const a=-s.pose.r[2]*Math.PI/180,l=n[0]-s.pose.p[0],c=n[1]-s.pose.p[1],u=l*Math.cos(a)-c*Math.sin(a),f=l*Math.sin(a)+c*Math.cos(a);return Math.abs(u)<=o.size[0]/2&&Math.abs(f)<=o.size[1]/2}).sort((s,o)=>o.pose.p[2]-s.pose.p[2])[0])==null?void 0:r.id)??null}function mC(t,e){let n=0,i=1/0;for(let r=1;r<t.length;r++){const s=gC(t[r-1],t[r],e);s<i&&(i=s,n=r-1)}return n}function gC(t,e,n){const i=e[0]-t[0],r=e[1]-t[1],s=Math.max(0,Math.min(1,((n[0]-t[0])*i+(n[1]-t[1])*r)/(i*i+r*r||1)));return Math.hypot(t[0]+s*i-n[0],t[1]+s*r-n[1])}const wg=[{id:"throttle",label:"油门",color:"#ff8b3e"},{id:"steer",label:"转向",color:"#3e9bff"}];function vC(){const{doc:t,t:e,playing:n,live:i,set:r}=nt(),s=Oe.useRef(null),o=Oe.useRef(null);if(!t)return null;const a=t.anim.duration||8,l=1e3,c=46,u=70,f=m=>u+m/a*(l-u-10),h=(m,x)=>m*c+c/2-x*(c/2-5),p=(m,x)=>{const g=s.current.getBoundingClientRect(),d=(m.clientX-g.left)*(l/g.width),_=(m.clientY-g.top)*((c*2+18)/g.height),v=Math.max(0,Math.min(a,(d-u)/(l-u-10)*a)),y=Math.max(-1,Math.min(1,-(_-(x*c+c/2))/(c/2-5)));return[Math.round(v*20)/20,Math.round(y*20)/20]};return S.jsxs("div",{className:"timeline",children:[S.jsxs("div",{className:"tl-ctl",children:[S.jsx("button",{className:n?"":"primary",onClick:()=>r({playing:!n,live:null}),children:n?"暂停":"▶ 播放"}),S.jsxs("span",{className:"mono",children:[e.toFixed(2),"s / "]}),S.jsx("input",{className:"mono tiny",type:"number",min:1,max:120,value:a,onChange:m=>dt(x=>{x.anim.duration=Math.max(1,Number(m.target.value))})}),"s",i&&S.jsx("span",{className:"tag running",children:"真车数据"}),S.jsx("span",{className:"dim small",children:"点空白加关键帧 · 拖动调整 · 右键删除"})]}),S.jsxs("svg",{ref:s,viewBox:`0 0 ${l} ${c*2+18}`,className:"tl-svg",preserveAspectRatio:"none",onPointerMove:m=>{const x=o.current;if(!x)return;const g=wg.findIndex(v=>v.id===x.ch),[d,_]=p(m,g);dt(v=>{const y=v.anim.channels[x.ch];y[x.i]=[d,_],y.sort((C,T)=>C[0]-T[0]),x.i=y.findIndex(C=>C[0]===d&&C[1]===_)},{merge:"key"+x.ch+x.i})},onPointerUp:()=>{o.current=null},children:[wg.map((m,x)=>{const g=t.anim.channels[m.id]||[],d=g.length?[[0,g[0][1]],...g,[a,g[g.length-1][1]]]:[[0,0],[a,0]];return S.jsxs("g",{children:[S.jsx("rect",{x:u,y:x*c+2,width:l-u-10,height:c-4,className:"lane",onPointerDown:_=>{const[v,y]=p(_,x);dt(C=>{const T=C.anim.channels[m.id]=C.anim.channels[m.id]||[];T.push([v,y]),T.sort((A,D)=>A[0]-D[0])}),r({t:v,playing:!1})}}),S.jsx("line",{x1:u,x2:l-10,y1:h(x,0),y2:h(x,0),className:"zero"}),S.jsx("text",{x:8,y:x*c+c/2+4,className:"lanelabel",fill:m.color,children:m.label}),S.jsx("polyline",{points:d.map(_=>`${f(_[0])},${h(x,_[1])}`).join(" "),fill:"none",stroke:m.color,strokeWidth:2}),g.map((_,v)=>S.jsx("circle",{cx:f(_[0]),cy:h(x,_[1]),r:5,fill:m.color,className:"key",onPointerDown:y=>{y.stopPropagation(),y.target.setPointerCapture(y.pointerId),o.current={ch:m.id,i:v}},onContextMenu:y=>{y.preventDefault(),dt(C=>{C.anim.channels[m.id].splice(v,1)})},children:S.jsxs("title",{children:[_[0],"s  ",_[1]]})},v))]},m.id)}),S.jsx("g",{onPointerDown:m=>m.stopPropagation(),children:S.jsx("line",{x1:f(e),x2:f(e),y1:0,y2:c*2,className:"playhead"})}),S.jsx("rect",{x:u,y:c*2,width:l-u-10,height:16,className:"scrub",onPointerDown:m=>{const[x]=p(m,0);r({t:x,playing:!1,live:null}),m.target.setPointerCapture(m.pointerId)},onPointerMove:m=>{if(m.buttons){const[x]=p(m,0);r({t:x})}}}),Array.from({length:Math.floor(a)+1},(m,x)=>S.jsxs("text",{x:f(x),y:c*2+13,className:"tick",textAnchor:"middle",children:[x,"s"]},x))]})]})}function _C(t,e){const n=[],i=t.parts.filter(o=>e[o.lib]).map(o=>({p:o,b:oC(o,e[o.lib]).expandByScalar(-.25),k:e[o.lib].kind}));for(let o=0;o<i.length;o++)for(let a=o+1;a<i.length;a++){const l=i[o],c=i[a];l.b.intersectsBox(c.b)&&n.push({level:"warn",text:`${l.p.label} 和 ${c.p.label} 撞在一起（3D）`,parts:[l.p.id,c.p.id]})}const r=t.enclosure,s=new fr(new L(-r.size[0]/2,-r.size[1]/2,0),new L(r.size[0]/2,r.size[1]/2,r.size[2]));for(const{p:o,b:a,k:l}of i)if(l!=="wheel"){s.containsBox(a)||n.push({level:"warn",text:`${o.label} 超出车壳`,parts:[o.id]}),a.min.z<r.floor-.3&&n.push({level:"warn",text:`${o.label} 低过底盘（离地 ${r.floor}mm）`,parts:[o.id]});for(const c of r.keepOut)new fr().setFromCenterAndSize(new L(...c.c),new L(...c.s)).intersectsBox(a)&&n.push({level:"warn",text:`${o.label} 挡到「${c.name}」`,parts:[o.id]})}return n}const xC=["选中","检查","剪线单","pins.h","零件库","清单"];function yC(){const{doc:t,lib:e}=nt(),[n,i]=Oe.useState("检查"),r=Oe.useMemo(()=>t?[...uC(t,e),..._C(t,e)]:[],[t,e]),s=nt(l=>l.sel);if(Oe.useEffect(()=>{s&&i("选中")},[s==null?void 0:s.id]),!t)return null;const o=r.filter(l=>l.level==="err").length,a=r.filter(l=>l.level==="warn").length;return S.jsxs("aside",{className:"insp",children:[S.jsx("div",{className:"itabs",children:xC.map(l=>S.jsxs("button",{className:n===l?"on":"",onClick:()=>i(l),children:[l,l==="检查"&&(o||a)?S.jsx("i",{className:o?"b err":"b warn",children:o||a}):null]},l))}),S.jsxs("div",{className:"ibody",children:[n==="选中"&&S.jsx(SC,{}),n==="检查"&&S.jsx(MC,{issues:r}),n==="剪线单"&&S.jsx(EC,{}),n==="pins.h"&&S.jsx(wC,{}),n==="零件库"&&S.jsx(TC,{}),n==="清单"&&S.jsx(AC,{})]})]})}function Tg({v:t,on:e,step:n=.5}){return S.jsx("input",{type:"number",className:"mono tiny",step:n,value:t,onChange:i=>e(Number(i.target.value))})}function SC(){const{doc:t,lib:e,sel:n}=nt();if(!t||!n)return S.jsxs("div",{className:"dim small",children:["在 3D 或接线图里点一个零件/导线。",S.jsx("br",{}),S.jsx("br",{}),"快捷键：",S.jsx("b",{children:"W"})," 移动 · ",S.jsx("b",{children:"E"})," 旋转 · ",S.jsx("b",{children:"R"})," 转 90° · ",S.jsx("b",{children:"Del"})," 删除 · ",S.jsx("b",{children:"⌘Z"})," 撤销 · ",S.jsx("b",{children:"L"})," 拉线 · ",S.jsx("b",{children:"X"})," 剪刀 · ",S.jsx("b",{children:"Esc"})," 取消"]});if(n.kind==="wire"){const c=t.wires.find(p=>p.id===n.id);if(!c)return null;const u=t.parts.find(p=>p.id===c.a.part),f=t.parts.find(p=>p.id===c.b.part),h=W_(t,e,c);return S.jsxs("div",{className:"stack",children:[S.jsxs("h3",{children:["导线 ",c.id]}),S.jsxs("div",{children:[u==null?void 0:u.label,".",S.jsx("b",{children:c.a.pin})," → ",f==null?void 0:f.label,".",S.jsx("b",{children:c.b.pin})]}),S.jsxs("div",{children:["长度约 ",S.jsxs("b",{className:"mono",children:[h?Math.ceil(h*1.15+6):"–"," mm"]})," ",S.jsxs("span",{className:"dim small",children:["（直线 ",h==null?void 0:h.toFixed(0),"mm + 15% + 两头各 3mm 剥线）"]})]}),S.jsxs("label",{className:"row",children:["颜色 ",["#e5484d","#222222","#f5d90a","#3e9bff","#ff8b3e","#30a46c","#ffffff"].map(p=>S.jsx("button",{className:"sw"+(c.color===p?" on":""),style:{background:p},onClick:()=>dt(m=>{m.wires.find(x=>x.id===c.id).color=p})},p))]}),S.jsxs("div",{className:"dim small",children:["拐点 ",c.pts.length," 个：双击导线加，双击拐点删。"]}),S.jsx("button",{className:"danger",onClick:Wf,children:"剪掉这条线"})]})}const i=t.parts.find(c=>c.id===n.id);if(!i)return null;const r=e[i.lib],{netOf:s,nets:o}=fa(t,e),a=(c,u)=>dt(f=>{f.parts.find(h=>h.id===i.id).pose.p[c]=u},{merge:"num"+i.id+c}),l=(c,u)=>dt(f=>{f.parts.find(h=>h.id===i.id).pose.r[c]=u},{merge:"rot"+i.id+c});return S.jsxs("div",{className:"stack",children:[S.jsx("input",{className:"h3in",value:i.label,onChange:c=>dt(u=>{u.parts.find(f=>f.id===i.id).label=c.target.value},{merge:"lbl"+i.id})}),S.jsxs("div",{className:"dim small",children:[r==null?void 0:r.name," · ",S.jsx("span",{className:"mono",children:i.id})," ",r&&!r.verified&&S.jsx("span",{className:"tag warn",children:"尺寸未量"})]}),(r==null?void 0:r.note)&&S.jsx("div",{className:"note small",children:r.note}),S.jsxs("div",{className:"grid3",children:[S.jsx("span",{children:"位置 mm"}),[0,1,2].map(c=>S.jsx(Tg,{v:i.pose.p[c],on:u=>a(c,u)},c))]}),S.jsxs("div",{className:"grid3",children:[S.jsx("span",{children:"旋转 °"}),[0,1,2].map(c=>S.jsx(Tg,{v:i.pose.r[c],step:15,on:u=>l(c,u)},c))]}),r&&S.jsxs("div",{className:"dim small mono",children:["尺寸 ",r.size.join(" × ")," mm"]}),r&&r.pins.length>0&&S.jsxs("table",{className:"tbl small",children:[S.jsx("thead",{children:S.jsxs("tr",{children:[S.jsx("th",{children:"脚"}),S.jsx("th",{children:"类型"}),S.jsx("th",{children:"接到"})]})}),S.jsx("tbody",{children:r.pins.map(c=>{const u=o.find(f=>f.id===s.get(`${i.id}.${c.id}`));return S.jsxs("tr",{title:c.strap||c.note||"",children:[S.jsxs("td",{className:"mono",children:[c.id,c.strap?" ⚠":""]}),S.jsxs("td",{className:"dim",children:[c.type,c.fw?` · ${c.fw}`:""]}),S.jsx("td",{className:"small",children:u?u.pins.filter(f=>!(f.part===i.id&&f.pin===c.id)).map(f=>f.label).join("、"):S.jsx("span",{className:"dim",children:"–"})})]},c.id)})})]}),S.jsxs("div",{className:"row",children:[S.jsx("button",{className:"ghost",onClick:()=>dt(c=>{const u=c.parts.find(f=>f.id===i.id);u.pose.r[2]=(u.pose.r[2]+90)%360}),children:"转 90°"}),S.jsx("button",{className:"ghost",onClick:()=>{const c=i.id+"c";dt(u=>{const f=JSON.parse(JSON.stringify(i));f.id=c,f.pose.p[0]+=5,f.pose.p[1]+=5,u.parts.push(f)})},children:"复制"}),S.jsx("button",{className:"danger",onClick:Wf,children:"删除"})]})]})}function MC({issues:t}){const e=nt(n=>n.set);return t.length?S.jsx("ul",{className:"issues",children:t.map((n,i)=>S.jsxs("li",{className:n.level,onMouseEnter:()=>e({highlight:n.parts}),onMouseLeave:()=>e({highlight:[]}),onClick:()=>e({sel:{kind:"part",id:n.parts[0]}}),children:[S.jsx("b",{children:{err:"错误",warn:"注意",info:"提示"}[n.level]})," ",n.text]},i))}):S.jsx("div",{className:"ok-big",children:"✓ 没发现问题"})}function EC(){const{doc:t,lib:e}=nt();if(!t)return null;const n=t.wires.map(s=>({w:s,L:W_(t,e,s)})).sort((s,o)=>s.w.color.localeCompare(o.w.color)),i=s=>{var o;return`${(o=t.parts.find(a=>a.id===s.part))==null?void 0:o.label}.${s.pin}`},r=n.reduce((s,o)=>s+(o.L?Math.ceil(o.L*1.15+6):0),0);return S.jsxs("div",{className:"stack",children:[S.jsxs("div",{className:"dim small",children:["照这个剪线：长度 = 3D 里的路径 × 1.15 + 6mm 剥线。总共约 ",S.jsxs("b",{children:[(r/1e3).toFixed(2)," m"]}),"。"]}),S.jsxs("table",{className:"tbl small",children:[S.jsx("thead",{children:S.jsxs("tr",{children:[S.jsx("th",{}),S.jsx("th",{children:"从"}),S.jsx("th",{children:"到"}),S.jsx("th",{children:"mm"})]})}),S.jsx("tbody",{children:n.map(({w:s,L:o})=>S.jsxs("tr",{children:[S.jsx("td",{children:S.jsx("i",{className:"swatch",style:{background:s.color}})}),S.jsx("td",{children:i(s.a)}),S.jsx("td",{children:i(s.b)}),S.jsx("td",{className:"mono",children:o?Math.ceil(o*1.15+6):"–"})]},s.id))})]})]})}function wC(){var l;const{doc:t,lib:e}=nt(),[n,i]=Oe.useState(null),r=t==null?void 0:t.firmware.targets[0];if(Oe.useEffect(()=>{r&&Vr("pinsFile",{target:r.target}).then(c=>i(c.text)).catch(()=>{})},[r==null?void 0:r.target]),!t)return null;if(!r)return S.jsxs("div",{className:"dim small",children:["这个项目还没选 MCU。加一个 ESP32 零件后在这里设置。",S.jsx("br",{}),t.parts.filter(c=>{var u;return((u=e[c.lib])==null?void 0:u.kind)==="mcu"}).map(c=>S.jsxs("button",{className:"ghost",onClick:()=>dt(u=>{u.firmware.targets=[{target:e[c.lib].target,mcu:c.id}]}),children:["用 ",c.label]},c.id))]});const{text:s,missing:o}=fC(t,e,r),a=n===s;return S.jsxs("div",{className:"stack",children:[S.jsxs("div",{className:"small",children:["目标 ",S.jsx("b",{className:"mono",children:r.target})," · MCU ",S.jsx("b",{children:(l=t.parts.find(c=>c.id===r.mcu))==null?void 0:l.label})]}),o.length>0&&S.jsxs("div",{className:"warn small",children:["没接到 MCU：",o.join("、"),"（这些用固件默认脚位）"]}),S.jsx("pre",{className:"code",children:s}),S.jsxs("div",{className:"row",children:[S.jsx("button",{className:"primary",disabled:a,onClick:async()=>{const c=await jt("savePins",{target:r.target,text:s});c&&(i(s),Ri(`写好了：${c.file}。去「固件」重新编译`))},children:a?"已经是这个":`写进 firmware/pins/${r.target}.h`}),n&&S.jsx("button",{className:"ghost",onClick:async()=>{await jt("removePins",{target:r.target}),i(null)},children:"删掉（用默认脚位）"})]}),S.jsxs("div",{className:"dim small",children:["编译时会把这个文件放进固件，覆盖 rc_car.ino 里的默认脚位。",n==null?"现在没有，用默认脚位。":a?"":"和现在的文件不一样（接线改过）。"]})]})}function TC(){const t=nt(r=>r.lib),[e,n]=Oe.useState(""),i=Object.values(t).filter(r=>!e||(r.name+r.id+r.kind).toLowerCase().includes(e.toLowerCase()));return S.jsxs("div",{className:"stack",children:[S.jsx("input",{placeholder:"搜零件…",value:e,onChange:r=>n(r.target.value)}),S.jsx("div",{className:"dim small",children:"拖到接线图里，或点「加」。"}),S.jsx("ul",{className:"libl",children:i.map(r=>S.jsxs("li",{draggable:!0,onDragStart:s=>s.dataTransfer.setData("text/rc-part",r.id),children:[S.jsx("i",{className:"swatch",style:{background:r.color}}),S.jsxs("div",{children:[S.jsx("b",{children:r.name}),S.jsxs("div",{className:"dim small mono",children:[r.size.join("×"),"mm · ",r.pins.length," 脚",r.verified?"":" · 未量"]})]}),S.jsx("button",{className:"ghost xs",onClick:()=>Zv(r.id),children:"加"})]},r.id))})]})}function AC(){const{doc:t,lib:e}=nt();return t?S.jsxs("table",{className:"tbl small",children:[S.jsx("thead",{children:S.jsxs("tr",{children:[S.jsx("th",{children:"零件"}),S.jsx("th",{children:"数量"}),S.jsx("th",{children:"价格"})]})}),S.jsx("tbody",{children:dC(t,e).map(n=>S.jsxs("tr",{children:[S.jsxs("td",{children:[n.name,!n.verified&&S.jsx("span",{className:"dim",children:" · 未量"})]}),S.jsx("td",{className:"mono",children:n.n}),S.jsx("td",{className:"dim",children:n.price})]},n.id))})]}):null}function bC(){const t=Nt(m=>m.st.projects),{id:e,doc:n,tool:i,gizmo:r,dirty:s,past:o,future:a,set:l}=nt(),[c,u]=Oe.useState(!0),[f,h]=Oe.useState("both");Oe.useEffect(()=>{if(e)return;let m="";try{m=localStorage.getItem("rc.project")||""}catch{}const x=t.find(g=>g.id===m)||t[0];x&&cu(x.id)},[t.length]),Oe.useEffect(()=>{const m=x=>{if(x.target.closest("input,textarea,select"))return;const g=x.key.toLowerCase();if((x.metaKey||x.ctrlKey)&&g==="z")x.preventDefault(),x.shiftKey?Pp():Rp();else if((x.metaKey||x.ctrlKey)&&g==="s")x.preventDefault(),Fo();else if(g==="delete"||g==="backspace")Wf();else if(g==="escape")l({tool:"select",pending:null,sel:null});else if(g==="w")l({gizmo:"translate"});else if(g==="e")l({gizmo:"rotate"});else if(g==="l")l({tool:"wire"});else if(g==="x")l({tool:"cut"});else if(g==="v")l({tool:"select"});else if(g===" ")x.preventDefault(),l({playing:!nt.getState().playing});else if(g==="r"){const d=nt.getState().sel;(d==null?void 0:d.kind)==="part"&&dt(_=>{const v=_.parts.find(y=>y.id===d.id);v.pose.r[2]=(v.pose.r[2]+90)%360})}};return addEventListener("keydown",m),()=>removeEventListener("keydown",m)},[]),Oe.useEffect(()=>{const m=()=>{Fo()};return addEventListener("beforeunload",m),()=>{removeEventListener("beforeunload",m),Fo()}},[]);const p=async()=>{const m=prompt("项目名字（例如：保时捷二号）");if(!m)return;const x=(m.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"p")+"-"+Date.now().toString(36).slice(-4),g=confirm("复制现在这个项目当起点？（取消 = 空白项目）")?e:null;await jt("projectCreate",{id:x,name:m,from:g})&&(await jt("status").then(()=>{}),Nt.getState().set({st:{...Nt.getState().st,projects:[...t,{id:x,name:m,parts:0,wires:0,updated:Date.now()}]}}),cu(x))};return t.length?S.jsxs("div",{className:"proj",children:[S.jsxs("div",{className:"ptool",children:[S.jsx("select",{value:e||"",onChange:m=>cu(m.target.value),children:t.map(m=>S.jsx("option",{value:m.id,children:m.name},m.id))}),S.jsx("button",{className:"ghost xs",onClick:p,children:"新建"}),S.jsx("span",{className:"sep"}),S.jsx("div",{className:"seg",children:[["select","选择 V"],["wire","拉线 L"],["cut","剪刀 X"]].map(([m,x])=>S.jsx("button",{className:i===m?"on":"",onClick:()=>l({tool:m,pending:null}),children:x},m))}),S.jsx("div",{className:"seg",children:[["translate","移动 W"],["rotate","旋转 E"]].map(([m,x])=>S.jsx("button",{className:r===m?"on":"",onClick:()=>l({gizmo:m}),children:x},m))}),S.jsx("button",{className:"ghost xs",disabled:!o.length,onClick:Rp,children:"撤销"}),S.jsx("button",{className:"ghost xs",disabled:!a.length,onClick:Pp,children:"重做"}),S.jsx("span",{className:"sep"}),S.jsx("div",{className:"seg",children:[["both","3D + 接线"],["3d","3D"],["2d","接线"]].map(([m,x])=>S.jsx("button",{className:f===m?"on":"",onClick:()=>h(m),children:x},m))}),S.jsxs("label",{className:"check small",children:[S.jsx("input",{type:"checkbox",checked:c,onChange:m=>u(m.target.checked)}),"车壳"]}),S.jsx("span",{className:"grow"}),S.jsx("span",{className:"mono small "+(s?"dim":"okc"),children:s?"未保存…":"已保存"})]}),n?S.jsxs("div",{className:"pbody",children:[S.jsxs("div",{className:"views "+f,children:[f!=="2d"&&S.jsxs("div",{className:"pane",children:[S.jsx("div",{className:"pane-t",children:"3D 布局"}),S.jsx(lC,{showShell:c})]}),f!=="3d"&&S.jsxs("div",{className:"pane",children:[S.jsx("div",{className:"pane-t",children:"接线图（俯视 · 真实尺寸）"}),S.jsx(hC,{})]})]}),S.jsx(yC,{}),S.jsx(vC,{})]}):S.jsx("div",{className:"empty",children:"加载中…"})]}):S.jsxs("div",{className:"empty",children:["没有项目。",S.jsx("button",{className:"primary",onClick:p,children:"新建项目"})]})}const Ag=[{id:"devices",label:"设备",sub:"车 · USB · 刷机"},{id:"firmware",label:"固件",sub:"编译 · 版本"},{id:"project",label:"项目",sub:"3D · 接线 · 动画"},{id:"settings",label:"设置",sub:"WiFi · 手机"}];function CC(){const[t,e]=Oe.useState(()=>location.hash.slice(1)||"devices");Oe.useEffect(()=>{location.hash=t},[t]),Oe.useEffect(()=>{const a=()=>{const l=location.hash.slice(1);Ag.some(c=>c.id===l)&&e(l)};return addEventListener("hashchange",a),()=>removeEventListener("hashchange",a)},[]);const{connected:n,st:i,toast:r}=Nt(),s=(i==null?void 0:i.cars.filter(a=>a.online).length)??0,o=(i==null?void 0:i.jobs.filter(a=>a.state==="running").length)??0;return S.jsxs("div",{className:"shell",children:[S.jsxs("nav",{className:"side",children:[S.jsxs("div",{className:"brand",children:[S.jsx("span",{className:"dot"}),"RC STUDIO"]}),Ag.map(a=>S.jsxs("button",{className:"tab"+(t===a.id?" on":""),onClick:()=>e(a.id),children:[S.jsx("b",{children:a.label}),S.jsx("small",{children:a.sub})]},a.id)),S.jsxs("div",{className:"side-foot",children:[S.jsx("div",{className:"pill "+(n?"ok":"bad"),children:n?"服务器在线":"连不上服务器"}),S.jsxs("div",{className:"mono dim",children:["车在线 ",s," · 任务 ",o]}),S.jsxs("div",{className:"mono dim",children:["固件源码 ",(i==null?void 0:i.version)??"–"]})]})]}),S.jsx("main",{className:"main"+(t==="project"?" full":""),children:i?t==="devices"?S.jsx(JS,{}):t==="firmware"?S.jsx(nM,{}):t==="project"?S.jsx(bC,{}):S.jsx(iM,{}):S.jsx("div",{className:"empty",children:n?"加载中…":"等服务器… 在 rc-car 文件夹跑 bash start.sh"})}),r&&S.jsx("div",{className:"toast"+(r.bad?" bad":""),children:r.text})]})}Yv();Bv(document.getElementById("root")).render(S.jsx(CC,{}));
