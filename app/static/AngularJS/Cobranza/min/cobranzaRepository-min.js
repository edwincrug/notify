var cobranzaUrl=global_settings.urlCORS+"api/cobranzaapi/";registrationModule.factory("cobranzaRepository",function(r){return{getDatos:function(t){return r.get(cobranzaUrl+"0-"+t)},getFacturas:function(t){return r.get(cobranzaUrl+"1-"+t)},getFacturasByCliente:function(t){return r.get(cobranzaUrl+"2-"+t)},getFacturasByFolio:function(t){return r.get(cobranzaUrl+"3-"+t)},getPromocion:function(){return r.get(cobranzaUrl+"4-0")},Pagar:function(t,n,a,o,e){return r.post(cobranzaUrl+"0-"+t+"-"+n+"-"+a+"-"+o+"-"+(e?1:0)+"- ")},"delete":function(t){return r["delete"](cobranzaUrl+t)},update:function(t){return r.put(cobranzaUrl,t)}}});