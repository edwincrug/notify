var loginUrl=global_settings.urlCORS+"api/loginapi/";registrationModule.factory("loginRepository",function(n){return{get:function(t,r){return n.get(loginUrl+t+"/"+r+"/")},add:function(t){return n.post(loginUrl,t)},"delete":function(t){return n["delete"](loginUrl+t.idLogin)},update:function(t){return n.put(loginUrl,t)}}});