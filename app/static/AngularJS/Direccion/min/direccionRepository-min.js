var direccionUrl=global_settings.urlCORS+"api/direccionapi/";registrationModule.factory("direccionRepository",function(r){return{get:function(){return r.get(direccionUrl+"0")},getEmpty:function(){return r.get(direccionUrl+"1")},add:function(i){return r.post(direccionUrl,i)},"delete":function(i){return r.get(direccionUrl+"2-"+i)},update:function(i){return r.put(direccionUrl,i)}}});