var servicioUrl=global_settings.urlCORS+"api/servicioapi/";registrationModule.factory("servicioRepository",function(r){return{getServicios:function(){return r.get(servicioUrl+"0-0")},getProductos:function(){return r.get(servicioUrl+"1-0")},getAutocomplete:function(){return r.get(servicioUrl+"2-0")},getServicioEmpty:function(){return r.get(servicioUrl+"3-0")},add:function(e){return r.post(servicioUrl,e)},"delete":function(e){return r["delete"](servicioUrl+e)},update:function(e){return r.put(servicioUrl,e)}}});