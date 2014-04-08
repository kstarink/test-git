montageDefine("bfce399","index",{dependencies:["domelementtype"],factory:function(e,t,n){function i(e){return e.children}function r(e){return e.parent}function a(e){var t=r(e);return t?i(t):[e]}function s(e,t){return e.attribs&&e.attribs[t]}function o(e,t){return hasOwnProperty.call(e.attribs,t)}function l(e){return e.name}function c(e,t,n,r){for(var a,s=[],o=0,l=t.length;l>o&&!(e(t[o])&&(s.push(t[o]),0>=--r))&&(a=i(t[o]),!(n&&a&&a.length>0&&(a=c(e,a,n,r),s=s.concat(a),r-=a.length,0>=r)));o++);return s}function u(e,t){for(var n=0,i=t.length;i>n;n++)if(e(t[n]))return t[n];return null}function h(e,t){for(var n=null,i=0,r=t.length;r>i&&!n;i++)e(t[i])?n=t[i]:t[i].children&&t[i].children.length>0&&(n=h(e,t[i].children));return n}function d(e,t){for(var n=[],r=0,a=t.length;a>r;r++){e(t[r])&&n.push(t[r]);var s=i(t[r]);s&&s.length&&(n=n.concat(d(e,s)))}return n}function p(e,t,n,i){return Array.isArray(t)||(t=[t]),"number"==typeof i&&isFinite(i)?1===i?(t=n===!1?u(e,t):h(e,t),t?[t]:[]):c(e,t,n!==!1,i):n===!1?t.filter(e):d(e,t)}function m(e,t){return"function"==typeof t?function(n){return n.attribs&&t(n.attribs[e])}:function(n){return n.attribs&&n.attribs[e]===t}}var f=e("domelementtype"),g=n.exports,v=g.isTag=f.isTag;g.getChildren=i,g.getParent=r,g.getAttributeValue=s,g.hasAttrib=o,g.getName=l,g.getSiblings=a,g.findOne=h,g.findAll=d,g.filter=p,g.testElement=function(e,t){for(var n in e)if(e.hasOwnProperty(n)){if("tag_name"===n){if(!v(t)||!e.tag_name(t.name))return!1}else if("tag_type"===n){if(!e.tag_type(t.type))return!1}else if("tag_contains"===n){if(v(t)||!e.tag_contains(t.data))return!1}else if(!t.attribs||!e[n](t.attribs[n]))return!1}else;return!0};var _={tag_name:function(e){return"function"==typeof e?function(t){return v(t)&&e(t.name)}:"*"===e?v:function(t){return v(t)&&t.name===e}},tag_type:function(e){return"function"==typeof e?function(t){return e(t.type)}:function(t){return t.type===e}},tag_contains:function(e){return"function"==typeof type?function(t){return!v(t)&&e(t.data)}:function(t){return!v(t)&&t.data===e}}};g.getElements=function(e,t,n,i){var r=[];for(var a in e)e.hasOwnProperty(a)&&(a in _?r.push(_[a](e[a])):r.push(m(a,e[a])));return 0===r.length?[]:1===r.length?p(r[0],t,n,i):p(function(e){return r.some(function(t){return t(e)})},t,n,i)},g.getElementById=function(e,t,n){return Array.isArray(t)||(t=[t]),h(m("id",e),t,n!==!1)},g.getElementsByTagName=function(e,t,n,i){return p(_.tag_name(e),t,n,i)},g.getElementsByTagType=function(e,t,n,i){return p(_.tag_type(e),t,n,i)},g.removeElement=function(e){if(e.prev&&(e.prev.next=e.next),e.next&&(e.next.prev=e.prev),e.parent){var t=e.parent.children;t.splice(t.lastIndexOf(e),1)}},g.replaceElement=function(e,t){if(e.prev&&(e.prev.next=t,t.prev=e.prev),e.next&&(e.next.prev=t,t.next=e.next),e.parent){var n=e.parent.children;n.splice(n.lastIndexOf(e),1,t),t.parent=e.parent}},g.getInnerHTML=function(e){if(!e.children)return"";for(var t=e.children,n=t.length,i="",r=0;n>r;r++)i+=g.getOuterHTML(t[r]);return i};var b={__proto__:null,async:!0,autofocus:!0,autoplay:!0,checked:!0,controls:!0,defer:!0,disabled:!0,hidden:!0,loop:!0,multiple:!0,open:!0,readonly:!0,required:!0,scoped:!0,selected:!0,"/":!0},y={__proto__:null,area:!0,base:!0,basefont:!0,br:!0,col:!0,frame:!0,hr:!0,img:!0,input:!0,isindex:!0,link:!0,meta:!0,param:!0,embed:!0};g.getOuterHTML=function(e){var t=e.type;if(t===f.Text)return e.data;if(t===f.Comment)return"<!--"+e.data+"-->";if(t===f.Directive)return"<"+e.data+">";if(t===f.CDATA)return"<!CDATA "+g.getInnerHTML(e)+"]]>";var n="<"+e.name;if("attribs"in e)for(var i in e.attribs)if(e.attribs.hasOwnProperty(i)){n+=" "+i;var r=e.attribs[i];r?n+='="'+r+'"':i in b||(n+='=""')}return e.name in y&&0===e.children.length?n+" />":n+">"+g.getInnerHTML(e)+"</"+e.name+">"},g.getText=function C(e){return Array.isArray(e)?e.map(C).join(""):v(e)||e.type===f.CDATA?C(e.children):e.type===f.Text?e.data:""}}});