!function($){function a(a,e,n){a.rules[e]=n,a.message&&(a.messages[e]=a.message)}function e(a){return a.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/g)}function n(a){return a.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g,"\\$1")}function t(a){return a.substr(0,a.lastIndexOf(".")+1)}function r(a,e){return 0===a.indexOf("*.")&&(a=a.replace("*.",e)),a}function i(a,e){var t=$(this).find("[data-valmsg-for='"+n(e[0].name)+"']"),r=t.attr("data-valmsg-replace"),i=r?$.parseJSON(r)!==!1:null;t.removeClass("field-validation-valid").addClass("field-validation-error"),a.data("unobtrusiveContainer",t),i?(t.empty(),a.removeClass("input-validation-error").appendTo(t)):a.hide()}function d(a,e){var n=$(this).find("[data-valmsg-summary=true]"),t=n.find("ul");t&&t.length&&e.errorList.length&&(t.empty(),n.addClass("validation-summary-errors").removeClass("validation-summary-valid"),$.each(e.errorList,function(){$("<li />").html(this.message).appendTo(t)}))}function o(a){var e=a.data("unobtrusiveContainer"),n=e.attr("data-valmsg-replace"),t=n?$.parseJSON(n):null;e&&(e.addClass("field-validation-valid").removeClass("field-validation-error"),a.removeData("unobtrusiveContainer"),t&&e.empty())}function s(a){var e=$(this);e.data("validator").resetForm(),e.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors"),e.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")}function l(a){var e=$(a),n=e.data(p),t=$.proxy(s,a);return n||(n={options:{errorClass:"input-validation-error",errorElement:"span",errorPlacement:$.proxy(i,a),invalidHandler:$.proxy(d,a),messages:{},rules:{},success:$.proxy(o,a)},attachValidation:function(){e.unbind("reset."+p,t).bind("reset."+p,t).validate(this.options)},validate:function(){return e.validate(),e.valid()}},e.data(p,n)),n}var m=$.validator,u,p="unobtrusiveValidation";m.unobtrusive={adapters:[],parseElement:function(a,e){var n=$(a),t=n.parents("form")[0],r,i,d;t&&(r=l(t),r.options.rules[a.name]=i={},r.options.messages[a.name]=d={},$.each(this.adapters,function(){var e="data-val-"+this.name,r=n.attr(e),o={};void 0!==r&&(e+="-",$.each(this.params,function(){o[this]=n.attr(e+this)}),this.adapt({element:a,form:t,message:r,params:o,rules:i,messages:d}))}),$.extend(i,{__dummy__:!0}),e||r.attachValidation())},parse:function(a){var e=$(a).parents("form").andSelf().add($(a).find("form")).filter("form");$(a).find(":input").filter("[data-val=true]").each(function(){m.unobtrusive.parseElement(this,!0)}),e.each(function(){var a=l(this);a&&a.attachValidation()})}},u=m.unobtrusive.adapters,u.add=function(a,e,n){return n||(n=e,e=[]),this.push({name:a,params:e,adapt:n}),this},u.addBool=function(e,n){return this.add(e,function(t){a(t,n||e,!0)})},u.addMinMax=function(e,n,t,r,i,d){return this.add(e,[i||"min",d||"max"],function(e){var i=e.params.min,d=e.params.max;i&&d?a(e,r,[i,d]):i?a(e,n,i):d&&a(e,t,d)})},u.addSingleVal=function(e,n,t){return this.add(e,[n||"val"],function(r){a(r,t||e,r.params[n])})},m.addMethod("__dummy__",function(a,e,n){return!0}),m.addMethod("regex",function(a,e,n){var t;return this.optional(e)?!0:(t=new RegExp(n).exec(a),t&&0===t.index&&t[0].length===a.length)}),m.addMethod("nonalphamin",function(a,e,n){var t;return n&&(t=a.match(/\W/g),t=t&&t.length>=n),t}),m.methods.extension?(u.addSingleVal("accept","mimtype"),u.addSingleVal("extension","extension")):u.addSingleVal("extension","extension","accept"),u.addSingleVal("regex","pattern"),u.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url"),u.addMinMax("length","minlength","maxlength","rangelength").addMinMax("range","min","max","range"),u.add("equalto",["other"],function(e){var i=t(e.element.name),d=e.params.other,o=r(d,i),s=$(e.form).find(":input").filter("[name='"+n(o)+"']")[0];a(e,"equalTo",s)}),u.add("required",function(e){("INPUT"!==e.element.tagName.toUpperCase()||"CHECKBOX"!==e.element.type.toUpperCase())&&a(e,"required",!0)}),u.add("remote",["url","type","additionalfields"],function(i){var d={url:i.params.url,type:i.params.type||"GET",data:{}},o=t(i.element.name);$.each(e(i.params.additionalfields||i.element.name),function(a,e){var t=r(e,o);d.data[t]=function(){return $(i.form).find(":input").filter("[name='"+n(t)+"']").val()}}),a(i,"remote",d)}),u.add("password",["min","nonalphamin","regex"],function(e){e.params.min&&a(e,"minlength",e.params.min),e.params.nonalphamin&&a(e,"nonalphamin",e.params.nonalphamin),e.params.regex&&a(e,"regex",e.params.regex)}),$(function(){m.unobtrusive.parse(document)})}(jQuery);