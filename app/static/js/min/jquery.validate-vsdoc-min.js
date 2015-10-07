!function($){$.extend($.fn,{validate:function(t){if(!this.length)return void(t&&t.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing"));var e=$.data(this[0],"validator");return e?e:(e=new $.validator(t,this[0]),$.data(this[0],"validator",e),e.settings.onsubmit&&(this.find("input, button").filter(".cancel").click(function(){e.cancelSubmit=!0}),e.settings.submitHandler&&this.find("input, button").filter(":submit").click(function(){e.submitButton=this}),this.submit(function(t){function i(){if(e.settings.submitHandler){if(e.submitButton)var t=$("<input type='hidden'/>").attr("name",e.submitButton.name).val(e.submitButton.value).appendTo(e.currentForm);return e.settings.submitHandler.call(e,e.currentForm),e.submitButton&&t.remove(),!1}return!0}return e.settings.debug&&t.preventDefault(),e.cancelSubmit?(e.cancelSubmit=!1,i()):e.form()?e.pendingRequest?(e.formSubmitted=!0,!1):i():(e.focusInvalid(),!1)})),e)},valid:function(){if($(this[0]).is("form"))return this.validate().form();var t=!0,e=$(this[0].form).validate();return this.each(function(){t&=e.element(this)}),t},removeAttrs:function(t){var e={},i=this;return $.each(t.split(/\s/),function(t,s){e[s]=i.attr(s),i.removeAttr(s)}),e},rules:function(t,e){var i=this[0];if(t){var s=$.data(i.form,"validator").settings,n=s.rules,r=$.validator.staticRules(i);switch(t){case"add":$.extend(r,$.validator.normalizeRule(e)),n[i.name]=r,e.messages&&(s.messages[i.name]=$.extend(s.messages[i.name],e.messages));break;case"remove":if(!e)return delete n[i.name],r;var a={};return $.each(e.split(/\s/),function(t,e){a[e]=r[e],delete r[e]}),a}}var u=$.validator.normalizeRules($.extend({},$.validator.metadataRules(i),$.validator.classRules(i),$.validator.attributeRules(i),$.validator.staticRules(i)),i);if(u.required){var o=u.required;delete u.required,u=$.extend({required:o},u)}return u}}),$.extend($.expr[":"],{blank:function(t){return!$.trim(""+t.value)},filled:function(t){return!!$.trim(""+t.value)},unchecked:function(t){return!t.checked}}),$.validator=function(t,e){this.settings=$.extend(!0,{},$.validator.defaults,t),this.currentForm=e,this.init()},$.validator.format=function(t,e){return 1==arguments.length?function(){var e=$.makeArray(arguments);return e.unshift(t),$.validator.format.apply(this,e)}:(arguments.length>2&&e.constructor!=Array&&(e=$.makeArray(arguments).slice(1)),e.constructor!=Array&&(e=[e]),$.each(e,function(e,i){t=t.replace(new RegExp("\\{"+e+"\\}","g"),i)}),t)},$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:!0,ignore:[],ignoreTitle:!1,onfocusin:function(t){this.lastActive=t,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(t)).hide())},onfocusout:function(t){this.checkable(t)||!(t.name in this.submitted)&&this.optional(t)||this.element(t)},onkeyup:function(t){(t.name in this.submitted||t==this.lastElement)&&this.element(t)},onclick:function(t){t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode)},highlight:function(t,e,i){$(t).addClass(e).removeClass(i)},unhighlight:function(t,e,i){$(t).removeClass(e).addClass(i)}},setDefaults:function(t){$.extend($.validator.defaults,t)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function t(t){var e=$.data(this[0].form,"validator"),i="on"+t.type.replace(/^validate/,"");e.settings[i]&&e.settings[i].call(e,this[0])}this.labelContainer=$(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm),this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var e=this.groups={};$.each(this.settings.groups,function(t,i){$.each(i.split(/\s/),function(i,s){e[s]=t})});var i=this.settings.rules;$.each(i,function(t,e){i[t]=$.validator.normalizeRule(e)}),$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",t).validateDelegate(":radio, :checkbox, select, option","click",t),this.settings.invalidHandler&&$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),$.extend(this.submitted,this.errorMap),this.invalid=$.extend({},this.errorMap),this.valid()||$(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);return this.valid()},element:function(t){t=this.clean(t),this.lastElement=t,this.prepareElement(t),this.currentElements=$(t);var e=this.check(t);return e?delete this.invalid[t.name]:this.invalid[t.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(t){if(t){$.extend(this.errorMap,t),this.errorList=[];for(var e in t)this.errorList.push({message:t[e],element:this.findByName(e)[0]});this.successList=$.grep(this.successList,function(e){return!(e.name in t)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){$.fn.resetForm&&$(this.currentForm).resetForm(),this.submitted={},this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(t){var e=0;for(var i in t)e++;return e},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0==this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(t){}},findLastActive:function(){var t=this.lastActive;return t&&1==$.grep(this.errorList,function(e){return e.element.name==t.name}).length&&t},elements:function(){var t=this,e={};return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&t.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in e||!t.objectLength($(this).rules())?!1:(e[this.name]=!0,!0)})},clean:function(t){return $(t)[0]},errors:function(){return $(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=$([]),this.toHide=$([]),this.currentElements=$([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(t){this.reset(),this.toHide=this.errorsFor(t)},check:function(t){t=this.clean(t),this.checkable(t)&&(t=this.findByName(t.name).not(this.settings.ignore)[0]);var e=$(t).rules(),i=!1;for(var s in e){var n={method:s,parameters:e[s]};try{var r=$.validator.methods[s].call(this,t.value.replace(/\r/g,""),t,n.parameters);if("dependency-mismatch"==r){i=!0;continue}if(i=!1,"pending"==r)return void(this.toHide=this.toHide.not(this.errorsFor(t)));if(!r)return this.formatAndAdd(t,n),!1}catch(a){throw this.settings.debug&&window.console&&console.log("exception occured when checking element "+t.id+", check the '"+n.method+"' method",a),a}}return i?void 0:(this.objectLength(e)&&this.successList.push(t),!0)},customMetaMessage:function(t,e){if($.metadata){var i=this.settings.meta?$(t).metadata()[this.settings.meta]:$(t).metadata();return i&&i.messages&&i.messages[e]}},customMessage:function(t,e){var i=this.settings.messages[t];return i&&(i.constructor==String?i:i[e])},findDefined:function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t];return void 0},defaultMessage:function(t,e){return this.findDefined(this.customMessage(t.name,e),this.customMetaMessage(t,e),!this.settings.ignoreTitle&&t.title||void 0,$.validator.messages[e],"<strong>Warning: No message defined for "+t.name+"</strong>")},formatAndAdd:function(t,e){var i=this.defaultMessage(t,e.method),s=/\$?\{(\d+)\}/g;"function"==typeof i?i=i.call(this,e.parameters,t):s.test(i)&&(i=jQuery.format(i.replace(s,"{$1}"),e.parameters)),this.errorList.push({message:i,element:t}),this.errorMap[t.name]=i,this.submitted[t.name]=i},addWrapper:function(t){return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t},defaultShowErrors:function(){for(var t=0;this.errorList[t];t++){var e=this.errorList[t];this.settings.highlight&&this.settings.highlight.call(this,e.element,this.settings.errorClass,this.settings.validClass),this.showLabel(e.element,e.message)}if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(var t=0;this.successList[t];t++)this.showLabel(this.successList[t]);if(this.settings.unhighlight)for(var t=0,i=this.validElements();i[t];t++)this.settings.unhighlight.call(this,i[t],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return $(this.errorList).map(function(){return this.element})},showLabel:function(t,e){var i=this.errorsFor(t);i.length?(i.removeClass().addClass(this.settings.errorClass),i.attr("generated")&&i.html(e)):(i=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(t),generated:!0}).addClass(this.settings.errorClass).html(e||""),this.settings.wrapper&&(i=i.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(i).length||(this.settings.errorPlacement?this.settings.errorPlacement(i,$(t)):i.insertAfter(t))),!e&&this.settings.success&&(i.text(""),"string"==typeof this.settings.success?i.addClass(this.settings.success):this.settings.success(i)),this.toShow=this.toShow.add(i)},errorsFor:function(t){var e=this.idOrName(t);return this.errors().filter(function(){return $(this).attr("for")==e})},idOrName:function(t){return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name)},checkable:function(t){return/radio|checkbox/i.test(t.type)},findByName:function(t){var e=this.currentForm;return $(document.getElementsByName(t)).map(function(i,s){return s.form==e&&s.name==t&&s||null})},getLength:function(t,e){switch(e.nodeName.toLowerCase()){case"select":return $("option:selected",e).length;case"input":if(this.checkable(e))return this.findByName(e.name).filter(":checked").length}return t.length},depend:function(t,e){return this.dependTypes[typeof t]?this.dependTypes[typeof t](t,e):!0},dependTypes:{"boolean":function(t,e){return t},string:function(t,e){return!!$(t,e.form).length},"function":function(t,e){return t(e)}},optional:function(t){return!$.validator.methods.required.call(this,$.trim(t.value),t)&&"dependency-mismatch"},startRequest:function(t){this.pending[t.name]||(this.pendingRequest++,this.pending[t.name]=!0)},stopRequest:function(t,e){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[t.name],e&&0==this.pendingRequest&&this.formSubmitted&&this.form()?($(this.currentForm).submit(),this.formSubmitted=!1):!e&&0==this.pendingRequest&&this.formSubmitted&&($(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(t){return $.data(t,"previousValue")||$.data(t,"previousValue",{old:null,valid:!0,message:this.defaultMessage(t,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},dateDE:{dateDE:!0},number:{number:!0},numberDE:{numberDE:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(t,e){t.constructor==String?this.classRuleSettings[t]=e:$.extend(this.classRuleSettings,t)},classRules:function(t){var e={},i=$(t).attr("class");return i&&$.each(i.split(" "),function(){this in $.validator.classRuleSettings&&$.extend(e,$.validator.classRuleSettings[this])}),e},attributeRules:function(t){var e={},i=$(t);for(var s in $.validator.methods){var n=i.attr(s);n&&(e[s]=n)}return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},metadataRules:function(t){if(!$.metadata)return{};var e=$.data(t.form,"validator").settings.meta;return e?$(t).metadata()[e]:$(t).metadata()},staticRules:function(t){var e={},i=$.data(t.form,"validator");return i.settings.rules&&(e=$.validator.normalizeRule(i.settings.rules[t.name])||{}),e},normalizeRules:function(t,e){return $.each(t,function(i,s){if(s===!1)return void delete t[i];if(s.param||s.depends){var n=!0;switch(typeof s.depends){case"string":n=!!$(s.depends,e.form).length;break;case"function":n=s.depends.call(e,e)}n?t[i]=void 0!==s.param?s.param:!0:delete t[i]}}),$.each(t,function(i,s){t[i]=$.isFunction(s)?s(e):s}),$.each(["minlength","maxlength","min","max"],function(){t[this]&&(t[this]=Number(t[this]))}),$.each(["rangelength","range"],function(){t[this]&&(t[this]=[Number(t[this][0]),Number(t[this][1])])}),$.validator.autoCreateRanges&&(t.min&&t.max&&(t.range=[t.min,t.max],delete t.min,delete t.max),t.minlength&&t.maxlength&&(t.rangelength=[t.minlength,t.maxlength],delete t.minlength,delete t.maxlength)),t.messages&&delete t.messages,t},normalizeRule:function(t){if("string"==typeof t){var e={};$.each(t.split(/\s/),function(){e[this]=!0}),t=e}return t},addMethod:function(t,e,i){$.validator.methods[t]=e,$.validator.messages[t]=void 0!=i?i:$.validator.messages[t],e.length<3&&$.validator.addClassRules(t,$.validator.normalizeRule(t))},methods:{required:function(t,e,i){if(!this.depend(i,e))return"dependency-mismatch";switch(e.nodeName.toLowerCase()){case"select":var s=$(e).val();return s&&s.length>0;case"input":if(this.checkable(e))return this.getLength(t,e)>0;default:return $.trim(t).length>0}},remote:function(t,e,i){if(this.optional(e))return"dependency-mismatch";var s=this.previousValue(e);if(this.settings.messages[e.name]||(this.settings.messages[e.name]={}),s.originalMessage=this.settings.messages[e.name].remote,this.settings.messages[e.name].remote=s.message,i="string"==typeof i&&{url:i}||i,this.pending[e.name])return"pending";if(s.old===t)return s.valid;s.old=t;var n=this;this.startRequest(e);var r={};return r[e.name]=t,$.ajax($.extend(!0,{url:i,mode:"abort",port:"validate"+e.name,dataType:"json",data:r,success:function(i){n.settings.messages[e.name].remote=s.originalMessage;var r=i===!0;if(r){var a=n.formSubmitted;n.prepareElement(e),n.formSubmitted=a,n.successList.push(e),n.showErrors()}else{var u={},o=i||n.defaultMessage(e,"remote");u[e.name]=s.message=$.isFunction(o)?o(t):o,n.showErrors(u)}s.valid=r,n.stopRequest(e,r)}},i)),"pending"},minlength:function(t,e,i){return this.optional(e)||this.getLength($.trim(t),e)>=i},maxlength:function(t,e,i){return this.optional(e)||this.getLength($.trim(t),e)<=i},rangelength:function(t,e,i){var s=this.getLength($.trim(t),e);return this.optional(e)||s>=i[0]&&s<=i[1]},min:function(t,e,i){return this.optional(e)||t>=i},max:function(t,e,i){return this.optional(e)||i>=t},range:function(t,e,i){return this.optional(e)||t>=i[0]&&t<=i[1]},email:function(t,e){return this.optional(e)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(t)},url:function(t,e){return this.optional(e)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)},date:function(t,e){return this.optional(e)||!/Invalid|NaN/.test(new Date(t))},dateISO:function(t,e){return this.optional(e)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(t)},number:function(t,e){return this.optional(e)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(t)},digits:function(t,e){return this.optional(e)||/^\d+$/.test(t)},creditcard:function(t,e){if(this.optional(e))return"dependency-mismatch";if(/[^0-9-]+/.test(t))return!1;var i=0,s=0,n=!1;t=t.replace(/\D/g,"");for(var r=t.length-1;r>=0;r--){var a=t.charAt(r),s=parseInt(a,10);n&&(s*=2)>9&&(s-=9),i+=s,n=!n}return i%10==0},accept:function(t,e,i){return i="string"==typeof i?i.replace(/,/g,"|"):"png|jpe?g|gif",this.optional(e)||t.match(new RegExp(".("+i+")$","i"))},equalTo:function(t,e,i){var s=$(i).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(e).valid()});return t==s.val()}}}),$.format=$.validator.format}(jQuery),function($){var t={};if($.ajaxPrefilter)$.ajaxPrefilter(function(e,i,s){var n=e.port;"abort"==e.mode&&(t[n]&&t[n].abort(),t[n]=s)});else{var e=$.ajax;$.ajax=function(i){var s=("mode"in i?i:$.ajaxSettings).mode,n=("port"in i?i:$.ajaxSettings).port;return"abort"==s?(t[n]&&t[n].abort(),t[n]=e.apply(this,arguments)):e.apply(this,arguments)}}}(jQuery),function($){jQuery.event.special.focusin||jQuery.event.special.focusout||!document.addEventListener||$.each({focus:"focusin",blur:"focusout"},function(t,e){function i(t){return t=$.event.fix(t),t.type=e,$.event.handle.call(this,t)}$.event.special[e]={setup:function(){this.addEventListener(t,i,!0)},teardown:function(){this.removeEventListener(t,i,!0)},handler:function(t){return arguments[0]=$.event.fix(t),arguments[0].type=e,$.event.handle.apply(this,arguments)}}}),$.extend($.fn,{validateDelegate:function(t,e,i){return this.bind(e,function(e){var s=$(e.target);return s.is(t)?i.apply(s,arguments):void 0})}})}(jQuery);