/**
 * @license AngularJS v1.2.24
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
!function(n,t,a){"use strict";t.module("ngAnimate",["ng"]).directive("ngAnimateChildren",function(){var n="$$ngAnimateChildren";return function(a,e,i){var r=i.ngAnimateChildren;t.isString(r)&&0===r.length?e.data(n,!0):a.$watch(r,function(t){e.data(n,!!t)})}}).factory("$$animateReflow",["$$rAF","$document",function(n,t){var a=t[0].body;return function(t){return n(function(){var n=a.offsetWidth+1;t()})}}]).config(["$provide","$animateProvider",function(e,i){function r(n){for(var t=0;t<n.length;t++){var a=n[t];if(a.nodeType==v)return a}}function o(n){return n&&t.element(n)}function s(n){return t.element(r(n))}function u(n,t){return r(n)==r(t)}var l=t.noop,f=t.forEach,c=i.$$selectors,v=1,d="$$ngAnimateState",m="$$ngAnimateChildren",g="ng-animate",C={running:!0};e.decorator("$animate",["$delegate","$injector","$sniffer","$rootElement","$$asyncCallback","$rootScope","$document",function(n,a,e,v,p,y,h){function D(n){var t=n.data(d)||{};t.running=!0,n.data(d,t)}function b(n){if(n){var t=[],i={},r=n.substr(1).split(".");(e.transitions||e.animations)&&t.push(a.get(c[""]));for(var o=0;o<r.length;o++){var s=r[o],u=c[s];u&&!i[s]&&(t.push(a.get(u)),i[s]=!0)}return t}}function A(n,a,e){function i(n,t){var a=n[t],e=n["before"+t.charAt(0).toUpperCase()+t.substr(1)];return a||e?("leave"==t&&(e=a,a=null),D.push({event:t,fn:a}),p.push({event:t,fn:e}),!0):void 0}function r(t,a,i){function r(n){if(a){if((a[n]||l)(),++s<o.length)return;a=null}i()}var o=[];f(t,function(n){n.fn&&o.push(n)});var s=0;f(o,function(t,i){var o=function(){r(i)};switch(t.event){case"setClass":a.push(t.fn(n,c,v,o));break;case"addClass":a.push(t.fn(n,c||e,o));break;case"removeClass":a.push(t.fn(n,v||e,o));break;default:a.push(t.fn(n,o))}}),a&&0===a.length&&i()}var o=n[0];if(o){var s="setClass"==a,u=s||"addClass"==a||"removeClass"==a,c,v;t.isArray(e)&&(c=e[0],v=e[1],e=c+" "+v);var d=n.attr("class"),m=d+" "+e;if(M(m)){var g=l,C=[],p=[],y=l,h=[],D=[],A=(" "+m).replace(/\s+/g,".");return f(b(A),function(n){var t=i(n,a);!t&&s&&(i(n,"addClass"),i(n,"removeClass"))}),{node:o,event:a,className:e,isClassBased:u,isSetClassOperation:s,before:function(n){g=n,r(p,C,function(){g=l,n()})},after:function(n){y=n,r(D,h,function(){y=l,n()})},cancel:function(){C&&(f(C,function(n){(n||l)(!0)}),g(!0)),h&&(f(h,function(n){(n||l)(!0)}),y(!0))}}}}}function w(n,a,e,i,r,o,s){function u(t){var i="$animate:"+t;h&&h[i]&&h[i].length>0&&p(function(){e.triggerHandler(i,{event:n,className:a})})}function l(){u("before")}function c(){u("after")}function v(){u("close"),s&&p(function(){s()})}function m(){m.hasBeenRun||(m.hasBeenRun=!0,o())}function C(){if(!C.hasBeenRun){C.hasBeenRun=!0;var t=e.data(d);t&&(y&&y.isClassBased?k(e,a):(p(function(){var t=e.data(d)||{};P==t.index&&k(e,a,n)}),e.data(d,t))),v()}}var y=A(e,n,a);if(!y)return m(),l(),c(),void C();a=y.className;var h=t.element._data(y.node);h=h&&h.events,i||(i=r?r.parent():e.parent());var D=e.data(d)||{},b=D.active||{},w=D.totalActive||0,S=D.last,F;if(y.isClassBased&&(F=D.running||D.disabled||S&&!S.isClassBased),F||x(e,i))return m(),l(),c(),void C();var M=!1;if(w>0){var E=[];if(y.isClassBased){if("setClass"==S.event)E.push(S),k(e,a);else if(b[a]){var R=b[a];R.event==n?M=!0:(E.push(R),k(e,a))}}else if("leave"==n&&b["ng-leave"])M=!0;else{for(var N in b)E.push(b[N]),k(e,N);b={},w=0}E.length>0&&f(E,function(n){n.cancel()})}if(!y.isClassBased||y.isSetClassOperation||M||(M="addClass"==n==e.hasClass(a)),M)return m(),l(),c(),void v();"leave"==n&&e.one("$destroy",function(n){var a=t.element(this),e=a.data(d);if(e){var i=e.active["ng-leave"];i&&(i.cancel(),k(a,"ng-leave"))}}),e.addClass(g);var P=B++;w++,b[a]=y,e.data(d,{last:y,active:b,index:P,totalActive:w}),l(),y.before(function(t){var i=e.data(d);t=t||!i||!i.active[a]||y.isClassBased&&i.active[a].event!=n,m(),t===!0?C():(c(),y.after(C))})}function S(n){var a=r(n);if(a){var e=t.isFunction(a.getElementsByClassName)?a.getElementsByClassName(g):a.querySelectorAll("."+g);f(e,function(n){n=t.element(n);var a=n.data(d);a&&a.active&&f(a.active,function(n){n.cancel()})})}}function k(n,t){if(u(n,v))C.disabled||(C.running=!1,C.structural=!1);else if(t){var a=n.data(d)||{},e=t===!0;!e&&a.active&&a.active[t]&&(a.totalActive--,delete a.active[t]),(e||!a.totalActive)&&(n.removeClass(g),n.removeData(d))}}function x(n,a){if(C.disabled)return!0;if(u(n,v))return C.running;var e,i,r;do{if(0===a.length)break;var o=u(a,v),s=o?C:a.data(d)||{};if(s.disabled)return!0;if(o&&(r=!0),e!==!1){var l=a.data(m);t.isDefined(l)&&(e=l)}i=i||s.running||s.last&&!s.last.isClassBased}while(a=a.parent());return!r||!e&&i}var B=0;v.data(d,C),y.$$postDigest(function(){y.$$postDigest(function(){C.running=!1})});var F=i.classNameFilter(),M=F?function(n){return F.test(n)}:function(){return!0};return{enter:function(a,e,i,r){a=t.element(a),e=o(e),i=o(i),D(a),n.enter(a,e,i),y.$$postDigest(function(){a=s(a),w("enter","ng-enter",a,e,i,l,r)})},leave:function(a,e){a=t.element(a),S(a),D(a),y.$$postDigest(function(){w("leave","ng-leave",s(a),null,null,function(){n.leave(a)},e)})},move:function(a,e,i,r){a=t.element(a),e=o(e),i=o(i),S(a),D(a),n.move(a,e,i),y.$$postDigest(function(){a=s(a),w("move","ng-move",a,e,i,l,r)})},addClass:function(a,e,i){a=t.element(a),a=s(a),w("addClass",e,a,null,null,function(){n.addClass(a,e)},i)},removeClass:function(a,e,i){a=t.element(a),a=s(a),w("removeClass",e,a,null,null,function(){n.removeClass(a,e)},i)},setClass:function(a,e,i,r){a=t.element(a),a=s(a),w("setClass",[e,i],a,null,null,function(){n.setClass(a,e,i)},r)},enabled:function(n,t){switch(arguments.length){case 2:if(n)k(t);else{var a=t.data(d)||{};a.disabled=!0,t.data(d,a)}break;case 1:C.disabled=!n;break;default:n=!C.disabled}return!!n}}}]),i.register("",["$window","$sniffer","$timeout","$$animateReflow",function(e,i,o,s){function u(n,t){Q&&Q(),L.push(t),Q=s(function(){f(L,function(n){n()}),L=[],Q=null,G={}})}function c(n,a){var e=r(n);n=t.element(e),Y.push(n);var i=Date.now()+a;X>=i||(o.cancel(V),X=i,V=o(function(){d(Y),Y=[]},a,!1))}function d(n){f(n,function(n){var t=n.data(H);t&&(t.closeAnimationFn||l)()})}function m(n,t){var a=t?G[t]:null;if(!a){var i=0,r=0,o=0,s=0,u,l,c,d;f(n,function(n){if(n.nodeType==v){var t=e.getComputedStyle(n)||{};c=t[R+I],i=Math.max(g(c),i),d=t[R+O],u=t[R+W],r=Math.max(g(u),r),l=t[P+W],s=Math.max(g(l),s);var a=g(t[P+I]);a>0&&(a*=parseInt(t[P+j],10)||1),o=Math.max(a,o)}}),a={total:0,transitionPropertyStyle:d,transitionDurationStyle:c,transitionDelayStyle:u,transitionDelay:r,transitionDuration:i,animationDelayStyle:l,animationDelay:s,animationDuration:o},t&&(G[t]=a)}return a}function g(n){var a=0,e=t.isString(n)?n.split(/\s*,\s*/):[];return f(e,function(n){a=Math.max(parseFloat(n)||0,a)}),a}function C(n){var t=n.parent(),a=t.data(q);return a||(t.data(q,++J),a=J),a+"-"+r(n).getAttribute("class")}function p(n,t,a,e){var i=C(t),r=i+" "+a,o=G[r]?++G[r].total:0,s={};if(o>0){var u=a+"-stagger",f=i+" "+u,c=!G[f];c&&t.addClass(u),s=m(t,f),c&&t.removeClass(u)}e=e||function(n){return n()},t.addClass(a);var v=t.data(H)||{},d=e(function(){return m(t,r)}),g=d.transitionDuration,p=d.animationDuration;if(0===g&&0===p)return t.removeClass(a),!1;t.data(H,{running:v.running||0,itemIndex:o,stagger:s,timings:d,closeAnimationFn:l});var y=v.running>0||"setClass"==n;return g>0&&h(t,a,y),p>0&&s.animationDelay>0&&0===s.animationDuration&&D(t),!0}function y(n){return"ng-enter"==n||"ng-move"==n||"ng-leave"==n}function h(n,t,a){y(t)||!a?r(n).style[R+O]="none":n.addClass(K)}function D(n){r(n).style[P]="none 0s"}function b(n,t){var a=R+O,e=r(n);e.style[a]&&e.style[a].length>0&&(e.style[a]=""),n.removeClass(K)}function A(n){var t=P,a=r(n);a.style[t]&&a.style[t].length>0&&(a.style[t]="")}function w(n,t,a,e){function i(n){t.off(h,o),t.removeClass(l),F(t,a);var e=r(t);for(var i in b)e.style.removeProperty(b[i])}function o(n){n.stopPropagation();var t=n.originalEvent||n,a=t.$manualTimeStamp||t.timeStamp||Date.now(),i=parseFloat(t.elapsedTime.toFixed(U));Math.max(a-y,0)>=p&&i>=g&&e()}var s=r(t),u=t.data(H);if(-1==s.getAttribute("class").indexOf(a)||!u)return void e();var l="";f(a.split(" "),function(n,t){l+=(t>0?" ":"")+n+"-active"});var v=u.stagger,d=u.timings,m=u.itemIndex,g=Math.max(d.transitionDuration,d.animationDuration),C=Math.max(d.transitionDelay,d.animationDelay),p=C*z,y=Date.now(),h=T+" "+N,D="",b=[];if(d.transitionDuration>0){var A=d.transitionPropertyStyle;-1==A.indexOf("all")&&(D+=E+"transition-property: "+A+";",D+=E+"transition-duration: "+d.transitionDurationStyle+";",b.push(E+"transition-property"),b.push(E+"transition-duration"))}if(m>0){if(v.transitionDelay>0&&0===v.transitionDuration){var w=d.transitionDelayStyle;D+=E+"transition-delay: "+S(w,v.transitionDelay,m)+"; ",b.push(E+"transition-delay")}v.animationDelay>0&&0===v.animationDuration&&(D+=E+"animation-delay: "+S(d.animationDelayStyle,v.animationDelay,m)+"; ",b.push(E+"animation-delay"))}if(b.length>0){var k=s.getAttribute("style")||"";s.setAttribute("style",k+"; "+D)}t.on(h,o),t.addClass(l),u.closeAnimationFn=function(){i(),e()};var x=m*(Math.max(v.animationDelay,v.transitionDelay)||0),B=(C+g)*_,M=(x+B)*z;return u.running++,c(t,M),i}function S(n,t,a){var e="";return f(n.split(","),function(n,i){e+=(i>0?",":"")+(a*t+parseInt(n,10))+"s"}),e}function k(n,t,a,e){return p(n,t,a,e)?function(n){n&&F(t,a)}:void 0}function x(n,t,a,e){return t.data(H)?w(n,t,a,e):(F(t,a),void e())}function B(n,t,a,e){var i=k(n,t,a);if(!i)return void e();var r=i;return u(t,function(){b(t,a),A(t),r=x(n,t,a,e)}),function(n){(r||l)(n)}}function F(n,t){n.removeClass(t);var a=n.data(H);a&&(a.running&&a.running--,a.running&&0!==a.running||n.removeData(H))}function M(n,a){var e="";return n=t.isArray(n)?n:n.split(/\s+/),f(n,function(n,t){n&&n.length>0&&(e+=(t>0?" ":"")+n+a)}),e}var E="",R,N,P,T;n.ontransitionend===a&&n.onwebkittransitionend!==a?(E="-webkit-",R="WebkitTransition",N="webkitTransitionEnd transitionend"):(R="transition",N="transitionend"),n.onanimationend===a&&n.onwebkitanimationend!==a?(E="-webkit-",P="WebkitAnimation",T="webkitAnimationEnd animationend"):(P="animation",T="animationend");var I="Duration",O="Property",W="Delay",j="IterationCount",q="$$ngAnimateKey",H="$$ngAnimateCSS3Data",K="ng-animate-block-transitions",U=3,_=1.5,z=1e3,G={},J=0,L=[],Q,V=null,X=0,Y=[];return{enter:function(n,t){return B("enter",n,"ng-enter",t)},leave:function(n,t){return B("leave",n,"ng-leave",t)},move:function(n,t){return B("move",n,"ng-move",t)},beforeSetClass:function(n,t,a,e){var i=M(a,"-remove")+" "+M(t,"-add"),r=k("setClass",n,i,function(e){var i=n.attr("class");n.removeClass(a),n.addClass(t);var r=e();return n.attr("class",i),r});return r?(u(n,function(){b(n,i),A(n),e()}),r):void e()},beforeAddClass:function(n,t,a){var e=k("addClass",n,M(t,"-add"),function(a){n.addClass(t);var e=a();return n.removeClass(t),e});return e?(u(n,function(){b(n,t),A(n),a()}),e):void a()},setClass:function(n,t,a,e){a=M(a,"-remove"),t=M(t,"-add");var i=a+" "+t;return x("setClass",n,i,e)},addClass:function(n,t,a){return x("addClass",n,M(t,"-add"),a)},beforeRemoveClass:function(n,t,a){var e=k("removeClass",n,M(t,"-remove"),function(a){var e=n.attr("class");n.removeClass(t);var i=a();return n.attr("class",e),i});return e?(u(n,function(){b(n,t),A(n),a()}),e):void a()},removeClass:function(n,t,a){return x("removeClass",n,M(t,"-remove"),a)}}}])}])}(window,window.angular);