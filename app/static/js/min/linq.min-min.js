Enumerable=function(){var t="Single:sequence contains more than one element.",n=!0,e=null,r=!1,i=function(t){this.GetEnumerator=t};i.Choice=function(){var t=arguments[0]instanceof Array?arguments[0]:arguments;return new i(function(){return new f(u.Blank,function(){return this.Yield(t[Math.floor(Math.random()*t.length)])},u.Blank)})},i.Cycle=function(){var t=arguments[0]instanceof Array?arguments[0]:arguments;return new i(function(){var n=0;return new f(u.Blank,function(){return n>=t.length&&(n=0),this.Yield(t[n++])},u.Blank)})},i.Empty=function(){return new i(function(){return new f(u.Blank,function(){return r},u.Blank)})},i.From=function(t){if(t==e)return i.Empty();if(t instanceof i)return t;if(typeof t==o.Number||typeof t==o.Boolean)return i.Repeat(t,1);if(typeof t==o.String)return new i(function(){var n=0;return new f(u.Blank,function(){return n<t.length?this.Yield(t.charAt(n++)):r},u.Blank)});if(typeof t!=o.Function){if(typeof t.length==o.Number)return new v(t);if(!(t instanceof Object)&&a.IsIEnumerable(t))return new i(function(){var e=n,i;return new f(function(){i=new Enumerator(t)},function(){return e?e=r:i.moveNext(),i.atEnd()?r:this.Yield(i.item())},u.Blank)})}return new i(function(){var n=[],e=0;return new f(function(){for(var e in t)!(t[e]instanceof Function)&&n.push({Key:e,Value:t[e]})},function(){return e<n.length?this.Yield(n[e++]):r},u.Blank)})},i.Return=function(t){return i.Repeat(t,1)},i.Matches=function(t,n,o){return o==e&&(o=""),n instanceof RegExp&&(o+=n.ignoreCase?"i":"",o+=n.multiline?"m":"",n=n.source),-1===o.indexOf("g")&&(o+="g"),new i(function(){var e;return new f(function(){e=new RegExp(n,o)},function(){var n=e.exec(t);return n?this.Yield(n):r},u.Blank)})},i.Range=function(t,n,r){return r==e&&(r=1),i.ToInfinity(t,r).Take(n)},i.RangeDown=function(t,n,r){return r==e&&(r=1),i.ToNegativeInfinity(t,r).Take(n)},i.RangeTo=function(t,n,r){return r==e&&(r=1),n>t?i.ToInfinity(t,r).TakeWhile(function(t){return n>=t}):i.ToNegativeInfinity(t,r).TakeWhile(function(t){return t>=n})},i.Repeat=function(t,n){return n!=e?i.Repeat(t).Take(n):new i(function(){return new f(u.Blank,function(){return this.Yield(t)},u.Blank)})},i.RepeatWithFinalize=function(t,n){return t=a.CreateLambda(t),n=a.CreateLambda(n),new i(function(){var r;return new f(function(){r=t()},function(){return this.Yield(r)},function(){r!=e&&(n(r),r=e)})})},i.Generate=function(t,n){return n!=e?i.Generate(t).Take(n):(t=a.CreateLambda(t),new i(function(){return new f(u.Blank,function(){return this.Yield(t())},u.Blank)}))},i.ToInfinity=function(t,n){return t==e&&(t=0),n==e&&(n=1),new i(function(){var e;return new f(function(){e=t-n},function(){return this.Yield(e+=n)},u.Blank)})},i.ToNegativeInfinity=function(t,n){return t==e&&(t=0),n==e&&(n=1),new i(function(){var e;return new f(function(){e=t+n},function(){return this.Yield(e-=n)},u.Blank)})},i.Unfold=function(t,e){return e=a.CreateLambda(e),new i(function(){var i=n,o;return new f(u.Blank,function(){return i?(i=r,o=t,this.Yield(o)):(o=e(o),this.Yield(o))},u.Blank)})},i.prototype={CascadeBreadthFirst:function(t,e){var u=this;return t=a.CreateLambda(t),e=a.CreateLambda(e),new i(function(){var o,c=0,s=[];return new f(function(){o=u.GetEnumerator()},function(){for(;n;){if(o.MoveNext())return s.push(o.Current()),this.Yield(e(o.Current(),c));var u=i.From(s).SelectMany(function(n){return t(n)});if(!u.Any())return r;c++,s=[],a.Dispose(o),o=u.GetEnumerator()}},function(){a.Dispose(o)})})},CascadeDepthFirst:function(t,e){var u=this;return t=a.CreateLambda(t),e=a.CreateLambda(e),new i(function(){var o=[],c;return new f(function(){c=u.GetEnumerator()},function(){for(;n;){if(c.MoveNext()){var u=e(c.Current(),o.length);return o.push(c),c=i.From(t(c.Current())).GetEnumerator(),this.Yield(u)}if(o.length<=0)return r;a.Dispose(c),c=o.pop()}},function(){try{a.Dispose(c)}finally{i.From(o).ForEach(function(t){t.Dispose()})}})})},Flatten:function(){var t=this;return new i(function(){var o,c=e;return new f(function(){o=t.GetEnumerator()},function(){for(;n;){if(c!=e){if(c.MoveNext())return this.Yield(c.Current());c=e}if(o.MoveNext()){if(o.Current()instanceof Array){a.Dispose(c),c=i.From(o.Current()).SelectMany(u.Identity).Flatten().GetEnumerator();continue}return this.Yield(o.Current())}return r}},function(){try{a.Dispose(o)}finally{a.Dispose(c)}})})},Pairwise:function(t){var n=this;return t=a.CreateLambda(t),new i(function(){var e;return new f(function(){e=n.GetEnumerator(),e.MoveNext()},function(){var n=e.Current();return e.MoveNext()?this.Yield(t(n,e.Current())):r},function(){a.Dispose(e)})})},Scan:function(t,u,o){if(o!=e)return this.Scan(t,u).Select(o);var c;u==e?(u=a.CreateLambda(t),c=r):(u=a.CreateLambda(u),c=n);var s=this;return new i(function(){var e,i,o=n;return new f(function(){e=s.GetEnumerator()},function(){if(o){if(o=r,c)return this.Yield(i=t);if(e.MoveNext())return this.Yield(i=e.Current())}return e.MoveNext()?this.Yield(i=u(i,e.Current())):r},function(){a.Dispose(e)})})},Select:function(t){var n=this;return t=a.CreateLambda(t),new i(function(){var e,i=0;return new f(function(){e=n.GetEnumerator()},function(){return e.MoveNext()?this.Yield(t(e.Current(),i++)):r},function(){a.Dispose(e)})})},SelectMany:function(t,n){var u=this;return t=a.CreateLambda(t),n==e&&(n=function(t,n){return n}),n=a.CreateLambda(n),new i(function(){var o,c=void 0,s=0;return new f(function(){o=u.GetEnumerator()},function(){if(void 0===c&&!o.MoveNext())return r;do{if(c==e){var u=t(o.Current(),s++);c=i.From(u).GetEnumerator()}if(c.MoveNext())return this.Yield(n(o.Current(),c.Current()));a.Dispose(c),c=e}while(o.MoveNext());return r},function(){try{a.Dispose(o)}finally{a.Dispose(c)}})})},Where:function(t){t=a.CreateLambda(t);var n=this;return new i(function(){var e,i=0;return new f(function(){e=n.GetEnumerator()},function(){for(;e.MoveNext();)if(t(e.Current(),i++))return this.Yield(e.Current());return r},function(){a.Dispose(e)})})},OfType:function(t){var n;switch(t){case Number:n=o.Number;break;case String:n=o.String;break;case Boolean:n=o.Boolean;break;case Function:n=o.Function;break;default:n=e}return this.Where(n===e?function(n){return n instanceof t}:function(t){return typeof t===n})},Zip:function(t,n){n=a.CreateLambda(n);var e=this;return new i(function(){var u,o,c=0;return new f(function(){u=e.GetEnumerator(),o=i.From(t).GetEnumerator()},function(){return u.MoveNext()&&o.MoveNext()?this.Yield(n(u.Current(),o.Current(),c++)):r},function(){try{a.Dispose(u)}finally{a.Dispose(o)}})})},Join:function(t,o,c,s,h){o=a.CreateLambda(o),c=a.CreateLambda(c),s=a.CreateLambda(s),h=a.CreateLambda(h);var l=this;return new i(function(){var v,p,d=e,m=0;return new f(function(){v=l.GetEnumerator(),p=i.From(t).ToLookup(c,u.Identity,h)},function(){for(;n;){if(d!=e){var t=d[m++];if(void 0!==t)return this.Yield(s(v.Current(),t));t=e,m=0}if(!v.MoveNext())return r;var i=o(v.Current());d=p.Get(i).ToArray()}},function(){a.Dispose(v)})})},GroupJoin:function(t,n,o,c,s){n=a.CreateLambda(n),o=a.CreateLambda(o),c=a.CreateLambda(c),s=a.CreateLambda(s);var h=this;return new i(function(){var l=h.GetEnumerator(),v=e;return new f(function(){l=h.GetEnumerator(),v=i.From(t).ToLookup(o,u.Identity,s)},function(){if(l.MoveNext()){var t=v.Get(n(l.Current()));return this.Yield(c(l.Current(),t))}return r},function(){a.Dispose(l)})})},All:function(t){t=a.CreateLambda(t);var e=n;return this.ForEach(function(n){return t(n)?void 0:(e=r,r)}),e},Any:function(t){t=a.CreateLambda(t);var e=this.GetEnumerator();try{if(0==arguments.length)return e.MoveNext();for(;e.MoveNext();)if(t(e.Current()))return n;return r}finally{a.Dispose(e)}},Concat:function(t){var n=this;return new i(function(){var u,o;return new f(function(){u=n.GetEnumerator()},function(){if(o==e){if(u.MoveNext())return this.Yield(u.Current());o=i.From(t).GetEnumerator()}return o.MoveNext()?this.Yield(o.Current()):r},function(){try{a.Dispose(u)}finally{a.Dispose(o)}})})},Insert:function(t,e){var u=this;return new i(function(){var o,c,s=0,h=r;return new f(function(){o=u.GetEnumerator(),c=i.From(e).GetEnumerator()},function(){return s==t&&c.MoveNext()?(h=n,this.Yield(c.Current())):o.MoveNext()?(s++,this.Yield(o.Current())):!h&&c.MoveNext()?this.Yield(c.Current()):r},function(){try{a.Dispose(o)}finally{a.Dispose(c)}})})},Alternate:function(t){return t=i.Return(t),this.SelectMany(function(n){return i.Return(n).Concat(t)}).TakeExceptLast()},Contains:function(t,e){e=a.CreateLambda(e);var i=this.GetEnumerator();try{for(;i.MoveNext();)if(e(i.Current())===t)return n;return r}finally{a.Dispose(i)}},DefaultIfEmpty:function(t){var e=this;return new i(function(){var i,u=n;return new f(function(){i=e.GetEnumerator()},function(){return i.MoveNext()?(u=r,this.Yield(i.Current())):u?(u=r,this.Yield(t)):r},function(){a.Dispose(i)})})},Distinct:function(t){return this.Except(i.Empty(),t)},Except:function(t,n){n=a.CreateLambda(n);var e=this;return new i(function(){var u,o;return new f(function(){u=e.GetEnumerator(),o=new p(n),i.From(t).ForEach(function(t){o.Add(t)})},function(){for(;u.MoveNext();){var t=u.Current();if(!o.Contains(t))return o.Add(t),this.Yield(t)}return r},function(){a.Dispose(u)})})},Intersect:function(t,n){n=a.CreateLambda(n);var e=this;return new i(function(){var u,o,c;return new f(function(){u=e.GetEnumerator(),o=new p(n),i.From(t).ForEach(function(t){o.Add(t)}),c=new p(n)},function(){for(;u.MoveNext();){var t=u.Current();if(!c.Contains(t)&&o.Contains(t))return c.Add(t),this.Yield(t)}return r},function(){a.Dispose(u)})})},SequenceEqual:function(t,e){e=a.CreateLambda(e);var u=this.GetEnumerator();try{var o=i.From(t).GetEnumerator();try{for(;u.MoveNext();)if(!o.MoveNext()||e(u.Current())!==e(o.Current()))return r;return o.MoveNext()?r:n}finally{a.Dispose(o)}}finally{a.Dispose(u)}},Union:function(t,n){n=a.CreateLambda(n);var e=this;return new i(function(){var u,o,c;return new f(function(){u=e.GetEnumerator(),c=new p(n)},function(){var n;if(void 0===o){for(;u.MoveNext();)if(n=u.Current(),!c.Contains(n))return c.Add(n),this.Yield(n);o=i.From(t).GetEnumerator()}for(;o.MoveNext();)if(n=o.Current(),!c.Contains(n))return c.Add(n),this.Yield(n);return r},function(){try{a.Dispose(u)}finally{a.Dispose(o)}})})},OrderBy:function(t){return new h(this,t,r)},OrderByDescending:function(t){return new h(this,t,n)},Reverse:function(){var t=this;return new i(function(){var n,e;return new f(function(){n=t.ToArray(),e=n.length},function(){return e>0?this.Yield(n[--e]):r},u.Blank)})},Shuffle:function(){var t=this;return new i(function(){var n;return new f(function(){n=t.ToArray()},function(){if(n.length>0){var t=Math.floor(Math.random()*n.length);return this.Yield(n.splice(t,1)[0])}return r},u.Blank)})},GroupBy:function(t,n,u,o){var c=this;return t=a.CreateLambda(t),n=a.CreateLambda(n),u!=e&&(u=a.CreateLambda(u)),o=a.CreateLambda(o),new i(function(){var i;return new f(function(){i=c.ToLookup(t,n,o).ToEnumerable().GetEnumerator()},function(){for(;i.MoveNext();)return this.Yield(u==e?i.Current():u(i.Current().Key(),i.Current()));return r},function(){a.Dispose(i)})})},PartitionBy:function(t,u,o,c){var s=this;t=a.CreateLambda(t),u=a.CreateLambda(u),c=a.CreateLambda(c);var h;return o==e?(h=r,o=function(t,n){return new m(t,n)}):(h=n,o=a.CreateLambda(o)),new i(function(){var e,l,v,p=[];return new f(function(){e=s.GetEnumerator(),e.MoveNext()&&(l=t(e.Current()),v=c(l),p.push(u(e.Current())))},function(){for(var a;(a=e.MoveNext())==n&&v===c(t(e.Current()));)p.push(u(e.Current()));if(p.length>0){var f=h?o(l,i.From(p)):o(l,p);return a?(l=t(e.Current()),v=c(l),p=[u(e.Current())]):p=[],this.Yield(f)}return r},function(){a.Dispose(e)})})},BufferWithCount:function(t){var n=this;return new i(function(){var e;return new f(function(){e=n.GetEnumerator()},function(){for(var n=[],i=0;e.MoveNext();)if(n.push(e.Current()),++i>=t)return this.Yield(n);return n.length>0?this.Yield(n):r},function(){a.Dispose(e)})})},Aggregate:function(t,n,e){return this.Scan(t,n,e).Last()},Average:function(t){t=a.CreateLambda(t);var n=0,e=0;return this.ForEach(function(r){n+=t(r),++e}),n/e},Count:function(t){t=t==e?u.True:a.CreateLambda(t);var n=0;return this.ForEach(function(e,r){t(e,r)&&++n}),n},Max:function(t){return t==e&&(t=u.Identity),this.Select(t).Aggregate(function(t,n){return t>n?t:n})},Min:function(t){return t==e&&(t=u.Identity),this.Select(t).Aggregate(function(t,n){return n>t?t:n})},MaxBy:function(t){return t=a.CreateLambda(t),this.Aggregate(function(n,e){return t(n)>t(e)?n:e})},MinBy:function(t){return t=a.CreateLambda(t),this.Aggregate(function(n,e){return t(n)<t(e)?n:e})},Sum:function(t){return t==e&&(t=u.Identity),this.Select(t).Aggregate(0,function(t,n){return t+n})},ElementAt:function(t){var e,i=r;if(this.ForEach(function(u,o){return o==t?(e=u,i=n,r):void 0}),!i)throw new Error("index is less than 0 or greater than or equal to the number of elements in source.");return e},ElementAtOrDefault:function(t,e){var i,u=r;return this.ForEach(function(e,o){return o==t?(i=e,u=n,r):void 0}),u?i:e},First:function(t){if(t!=e)return this.Where(t).First();var i,u=r;if(this.ForEach(function(t){return i=t,u=n,r}),!u)throw new Error("First:No element satisfies the condition.");return i},FirstOrDefault:function(t,i){if(i!=e)return this.Where(i).FirstOrDefault(t);var u,o=r;return this.ForEach(function(t){return u=t,o=n,r}),o?u:t},Last:function(t){if(t!=e)return this.Where(t).Last();var i,u=r;if(this.ForEach(function(t){u=n,i=t}),!u)throw new Error("Last:No element satisfies the condition.");return i},LastOrDefault:function(t,i){if(i!=e)return this.Where(i).LastOrDefault(t);var u,o=r;return this.ForEach(function(t){o=n,u=t}),o?u:t},Single:function(i){if(i!=e)return this.Where(i).Single();var u,o=r;if(this.ForEach(function(e){if(o)throw new Error(t);o=n,u=e}),!o)throw new Error("Single:No element satisfies the condition.");return u},SingleOrDefault:function(i,u){if(u!=e)return this.Where(u).SingleOrDefault(i);var o,a=r;return this.ForEach(function(e){if(a)throw new Error(t);a=n,o=e}),a?o:i},Skip:function(t){var n=this;return new i(function(){var e,i=0;return new f(function(){for(e=n.GetEnumerator();i++<t&&e.MoveNext(););},function(){return e.MoveNext()?this.Yield(e.Current()):r},function(){a.Dispose(e)})})},SkipWhile:function(t){t=a.CreateLambda(t);var e=this;return new i(function(){var i,u=0,o=r;return new f(function(){i=e.GetEnumerator()},function(){for(;!o;){if(i.MoveNext()){if(!t(i.Current(),u++))return o=n,this.Yield(i.Current());continue}return r}return i.MoveNext()?this.Yield(i.Current()):r},function(){a.Dispose(i)})})},Take:function(t){var n=this;return new i(function(){var e,i=0;return new f(function(){e=n.GetEnumerator()},function(){return i++<t&&e.MoveNext()?this.Yield(e.Current()):r},function(){a.Dispose(e)})})},TakeWhile:function(t){t=a.CreateLambda(t);var n=this;return new i(function(){var e,i=0;return new f(function(){e=n.GetEnumerator()},function(){return e.MoveNext()&&t(e.Current(),i++)?this.Yield(e.Current()):r},function(){a.Dispose(e)})})},TakeExceptLast:function(t){t==e&&(t=1);var n=this;return new i(function(){if(0>=t)return n.GetEnumerator();var e,i=[];return new f(function(){e=n.GetEnumerator()},function(){for(;e.MoveNext();){if(i.length==t)return i.push(e.Current()),this.Yield(i.shift());i.push(e.Current())}return r},function(){a.Dispose(e)})})},TakeFromLast:function(t){if(0>=t||t==e)return i.Empty();var n=this;return new i(function(){var u,o,c=[];return new f(function(){u=n.GetEnumerator()},function(){for(;u.MoveNext();)c.length==t&&c.shift(),c.push(u.Current());return o==e&&(o=i.From(c).GetEnumerator()),o.MoveNext()?this.Yield(o.Current()):r},function(){a.Dispose(o)})})},IndexOf:function(t){var r=e;return this.ForEach(function(e,i){return e===t?(r=i,n):void 0}),r!==e?r:-1},LastIndexOf:function(t){var n=-1;return this.ForEach(function(e,r){e===t&&(n=r)}),n},ToArray:function(){var t=[];return this.ForEach(function(n){t.push(n)}),t},ToLookup:function(t,n,e){t=a.CreateLambda(t),n=a.CreateLambda(n),e=a.CreateLambda(e);var r=new p(e);return this.ForEach(function(e){var i=t(e),u=n(e),o=r.Get(i);void 0!==o?o.push(u):r.Add(i,[u])}),new d(r)},ToObject:function(t,n){t=a.CreateLambda(t),n=a.CreateLambda(n);var e={};return this.ForEach(function(r){e[t(r)]=n(r)}),e},ToDictionary:function(t,n,e){t=a.CreateLambda(t),n=a.CreateLambda(n),e=a.CreateLambda(e);var r=new p(e);return this.ForEach(function(e){r.Add(t(e),n(e))}),r},ToJSON:function(t,n){return JSON.stringify(this.ToArray(),t,n)},ToString:function(t,n){return t==e&&(t=""),n==e&&(n=u.Identity),this.Select(n).ToArray().join(t)},Do:function(t){var n=this;return t=a.CreateLambda(t),new i(function(){var e,i=0;return new f(function(){e=n.GetEnumerator()},function(){return e.MoveNext()?(t(e.Current(),i++),this.Yield(e.Current())):r},function(){a.Dispose(e)})})},ForEach:function(t){t=a.CreateLambda(t);var n=0,e=this.GetEnumerator();try{for(;e.MoveNext()&&t(e.Current(),n++)!==r;);}finally{a.Dispose(e)}},Write:function(t,i){t==e&&(t=""),i=a.CreateLambda(i);var u=n;this.ForEach(function(n){u?u=r:document.write(t),document.write(i(n))})},WriteLine:function(t){t=a.CreateLambda(t),this.ForEach(function(n){document.write(t(n)),document.write("<br />")})},Force:function(){var t=this.GetEnumerator();try{for(;t.MoveNext(););}finally{a.Dispose(t)}},Let:function(t){t=a.CreateLambda(t);var n=this;return new i(function(){var e;return new f(function(){e=i.From(t(n)).GetEnumerator()},function(){return e.MoveNext()?this.Yield(e.Current()):r},function(){a.Dispose(e)})})},Share:function(){var t=this,n;return new i(function(){return new f(function(){n==e&&(n=t.GetEnumerator())},function(){return n.MoveNext()?this.Yield(n.Current()):r},u.Blank)})},MemoizeAll:function(){var t=this,n,o;return new i(function(){var i=-1;return new f(function(){o==e&&(o=t.GetEnumerator(),n=[])},function(){return i++,n.length<=i?o.MoveNext()?this.Yield(n[i]=o.Current()):r:this.Yield(n[i])},u.Blank)})},Catch:function(t){t=a.CreateLambda(t);var n=this;return new i(function(){var e;return new f(function(){e=n.GetEnumerator()},function(){try{return e.MoveNext()?this.Yield(e.Current()):r}catch(n){return t(n),r}},function(){a.Dispose(e)})})},Finally:function(t){t=a.CreateLambda(t);var n=this;return new i(function(){var e;return new f(function(){e=n.GetEnumerator()},function(){return e.MoveNext()?this.Yield(e.Current()):r},function(){try{a.Dispose(e)}finally{t()}})})},Trace:function(t,n){return t==e&&(t="Trace"),n=a.CreateLambda(n),this.Do(function(e){console.log(t,":",n(e))})}};var u={Identity:function(t){return t},True:function(){return n},Blank:function(){}},o={Boolean:typeof n,Number:"number",String:"string",Object:typeof{},Undefined:"undefined",Function:"function"},a={CreateLambda:function(t){if(t==e)return u.Identity;if(typeof t==o.String){if(""==t)return u.Identity;if(-1==t.indexOf("=>"))return new Function("$,$$,$$$,$$$$","return "+t);var n=t.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);return new Function(n[1],"return "+n[2])}return t},IsIEnumerable:function(t){if(typeof Enumerator!=o.Undefined)try{return new Enumerator(t),n}catch(e){}return r},Compare:function(t,n){return t===n?0:t>n?1:-1},Dispose:function(t){t!=e&&t.Dispose()}},c={Before:0,Running:1,After:2},f=function(t,e,i){var u=new s,o=c.Before;this.Current=u.Current,this.MoveNext=function(){try{switch(o){case c.Before:o=c.Running,t();case c.Running:return e.apply(u)?n:(this.Dispose(),r);case c.After:return r}}catch(i){throw this.Dispose(),i}},this.Dispose=function(){if(o==c.Running)try{i()}finally{o=c.After}}},s=function(){var t=e;this.Current=function(){return t},this.Yield=function(e){return t=e,n}},h=function(t,n,e,r){var i=this;i.source=t,i.keySelector=a.CreateLambda(n),i.descending=e,i.parent=r};h.prototype=new i,h.prototype.CreateOrderedEnumerable=function(t,n){return new h(this.source,t,n,this)},h.prototype.ThenBy=function(t){return this.CreateOrderedEnumerable(t,r)},h.prototype.ThenByDescending=function(t){return this.CreateOrderedEnumerable(t,n)},h.prototype.GetEnumerator=function(){var t=this,n,i,o=0;return new f(function(){n=[],i=[],t.source.ForEach(function(t,e){n.push(t),i.push(e)});var r=l.Create(t,e);r.GenerateKeys(n),i.sort(function(t,n){return r.Compare(t,n)})},function(){return o<i.length?this.Yield(n[i[o++]]):r},u.Blank)};var l=function(t,n,r){var i=this;i.keySelector=t,i.descending=n,i.child=r,i.keys=e};l.Create=function(t,n){var r=new l(t.keySelector,t.descending,n);return t.parent!=e?l.Create(t.parent,r):r},l.prototype.GenerateKeys=function(t){for(var n=this,r=t.length,i=n.keySelector,u=new Array(r),o=0;r>o;o++)u[o]=i(t[o]);n.keys=u,n.child!=e&&n.child.GenerateKeys(t)},l.prototype.Compare=function(t,n){var r=this,i=a.Compare(r.keys[t],r.keys[n]);if(0==i){if(r.child!=e)return r.child.Compare(t,n);i=a.Compare(t,n)}return r.descending?-i:i};var v=function(t){this.source=t};v.prototype=new i,v.prototype.Any=function(t){return t==e?this.source.length>0:i.prototype.Any.apply(this,arguments)},v.prototype.Count=function(t){return t==e?this.source.length:i.prototype.Count.apply(this,arguments)},v.prototype.ElementAt=function(t){return t>=0&&t<this.source.length?this.source[t]:i.prototype.ElementAt.apply(this,arguments)},v.prototype.ElementAtOrDefault=function(t,n){return t>=0&&t<this.source.length?this.source[t]:n},v.prototype.First=function(t){return t==e&&this.source.length>0?this.source[0]:i.prototype.First.apply(this,arguments)},v.prototype.FirstOrDefault=function(t,n){return n!=e?i.prototype.FirstOrDefault.apply(this,arguments):this.source.length>0?this.source[0]:t},v.prototype.Last=function(t){var n=this;return t==e&&n.source.length>0?n.source[n.source.length-1]:i.prototype.Last.apply(n,arguments)},v.prototype.LastOrDefault=function(t,n){var r=this;return n!=e?i.prototype.LastOrDefault.apply(r,arguments):r.source.length>0?r.source[r.source.length-1]:t},v.prototype.Skip=function(t){var n=this.source;return new i(function(){var e;return new f(function(){e=0>t?0:t},function(){return e<n.length?this.Yield(n[e++]):r},u.Blank)})},v.prototype.TakeExceptLast=function(t){return t==e&&(t=1),this.Take(this.source.length-t)},v.prototype.TakeFromLast=function(t){return this.Skip(this.source.length-t)},v.prototype.Reverse=function(){var t=this.source;return new i(function(){var n;return new f(function(){n=t.length},function(){return n>0?this.Yield(t[--n]):r},u.Blank)})},v.prototype.SequenceEqual=function(t,n){return(t instanceof v||t instanceof Array)&&n==e&&i.From(t).Count()!=this.Count()?r:i.prototype.SequenceEqual.apply(this,arguments)},v.prototype.ToString=function(t,n){return n==e&&this.source instanceof Array?(t==e&&(t=""),this.source.join(t)):i.prototype.ToString.apply(this,arguments)},v.prototype.GetEnumerator=function(){var t=this.source,n=0;return new f(u.Blank,function(){return n<t.length?this.Yield(t[n++]):r},u.Blank)};var p=function(){var t=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},a=function(t){return t===e?"null":void 0===t?"undefined":typeof t.toString===o.Function?t.toString():Object.prototype.toString.call(t)},c=function(t,n){var r=this;r.Key=t,r.Value=n,r.Prev=e,r.Next=e},s=function(){this.First=e,this.Last=e};s.prototype={AddLast:function(t){var n=this;n.Last!=e?(n.Last.Next=t,t.Prev=n.Last,n.Last=t):n.First=n.Last=t},Replace:function(t,n){t.Prev!=e?(t.Prev.Next=n,n.Prev=t.Prev):this.First=n,t.Next!=e?(t.Next.Prev=n,n.Next=t.Next):this.Last=n},Remove:function(t){t.Prev!=e?t.Prev.Next=t.Next:this.First=t.Next,t.Next!=e?t.Next.Prev=t.Prev:this.Last=t.Prev}};var h=function(t){var n=this;n.count=0,n.entryList=new s,n.buckets={},n.compareSelector=t==e?u.Identity:t};return h.prototype={Add:function(n,e){var r=this,i=r.compareSelector(n),u=a(i),o=new c(n,e);if(t(r.buckets,u)){for(var f=r.buckets[u],s=0;s<f.length;s++)if(r.compareSelector(f[s].Key)===i)return r.entryList.Replace(f[s],o),void(f[s]=o);f.push(o)}else r.buckets[u]=[o];r.count++,r.entryList.AddLast(o)},Get:function(n){var e=this,r=e.compareSelector(n),i=a(r);if(!t(e.buckets,i))return void 0;for(var u=e.buckets[i],o=0;o<u.length;o++){var c=u[o];if(e.compareSelector(c.Key)===r)return c.Value}return void 0},Set:function(e,i){var u=this,o=u.compareSelector(e),f=a(o);if(t(u.buckets,f))for(var s=u.buckets[f],h=0;h<s.length;h++)if(u.compareSelector(s[h].Key)===o){var l=new c(e,i);return u.entryList.Replace(s[h],l),s[h]=l,n}return r},Contains:function(e){var i=this,u=i.compareSelector(e),o=a(u);if(!t(i.buckets,o))return r;for(var c=i.buckets[o],f=0;f<c.length;f++)if(i.compareSelector(c[f].Key)===u)return n;return r},Clear:function(){this.count=0,this.buckets={},this.entryList=new s},Remove:function(n){var e=this,r=e.compareSelector(n),i=a(r);if(t(e.buckets,i))for(var u=e.buckets[i],o=0;o<u.length;o++)if(e.compareSelector(u[o].Key)===r)return e.entryList.Remove(u[o]),u.splice(o,1),0==u.length&&delete e.buckets[i],void e.count--},Count:function(){return this.count},ToEnumerable:function(){var t=this;return new i(function(){var n;return new f(function(){n=t.entryList.First},function(){if(n!=e){var t={Key:n.Key,Value:n.Value};return n=n.Next,this.Yield(t)}return r},u.Blank)})}},h}(),d=function(t){var n=this;n.Count=function(){return t.Count()},n.Get=function(n){return i.From(t.Get(n))},n.Contains=function(n){return t.Contains(n)},n.ToEnumerable=function(){return t.ToEnumerable().Select(function(t){return new m(t.Key,t.Value)})}},m=function(t,n){this.Key=function(){return t},v.call(this,n)};return m.prototype=new v,i}();