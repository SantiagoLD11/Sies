(this["webpackJsonpwieldy-hook"]=this["webpackJsonpwieldy-hook"]||[]).push([[9],{943:function(e,n,t){"use strict";t.d(n,"a",(function(){return r}));var o=t(175);function r(e,n){var t="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=Object(o.a)(e))||n&&e&&"number"===typeof e.length){t&&(e=t);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,i=!0,l=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return i=e.done,e},e:function(e){l=!0,c=e},f:function(){try{i||null==t.return||t.return()}finally{if(l)throw c}}}}},951:function(e,n,t){"use strict";var o=t(943),r=t(2),a=t(4),c=t(6),i=t(11),l=t(5),s=t(352),u=t(145),d=t(926),m=t(79),p=t(160),b=t(506),f=t(0),j=t(63),v=t(19),O=t(1);n.a=function(e){var n=e.open,t=e.setOpen,x=(e.numero_doc,e.dataIntegrarProfesional),h=e.getDatagrid,g=(e.setDataIntegrarProfesional,e.cargando),y=s.a.useNotification(),C=Object(l.a)(y,2),k=C[0],w=C[1],N=function(){return t(!1)},_=Object(f.useState)([]),E=Object(l.a)(_,2),S=E[0],I=E[1],P=Object(f.useState)(!1),T=Object(l.a)(P,2),B=T[0],F=T[1],A=Object(j.g)(),D=Object(f.useState)({tipo_documento:"",numero_documento:""}),V=Object(l.a)(D,2),z=V[0],L=V[1],q=u.a.useForm(),K=Object(l.a)(q,1)[0],J=function(){var e=Object(i.a)(Object(c.a)().mark((function e(n){var t,o;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return F(!0),e.prev=1,e.next=4,Object(v.y)(n);case 4:return e.next=6,k.open({type:"success",description:"Profesional integrado correctamente"});case 6:A.push({pathname:"/detail-professional/".concat(null===n||void 0===n?void 0:n.numero_documento),state:{type:"numero_document"}}),N(),e.next=14;break;case 10:return e.prev=10,e.t0=e.catch(1),e.next=14,k.open({type:"error",description:null===(t=e.t0.response)||void 0===t||null===(o=t.data)||void 0===o?void 0:o.message});case 14:F(!1);case 15:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(n){return e.apply(this,arguments)}}(),R=function(){var e=Object(i.a)(Object(c.a)().mark((function e(){var n;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(v.Ac)();case 2:n=e.sent,I(n);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(f.useEffect)((function(){R()}),[]),Object(f.useEffect)(Object(i.a)(Object(c.a)().mark((function e(){var n,t,r,a,i,l,s;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!x.Integrar){e.next=33;break}t=Object(o.a)(S),e.prev=2,t.s();case 4:if((r=t.n()).done){e.next=11;break}if((a=r.value).label!==(null===x||void 0===x?void 0:x.Tipo_Documento)){e.next=9;break}return n=a.value,e.abrupt("break",11);case 9:e.next=4;break;case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(2),t.e(e.t0);case 16:return e.prev=16,t.f(),e.finish(16);case 19:return i={tipo_documento:n,numero_documento:null===x||void 0===x?void 0:x.Numero_Documento},e.prev=20,e.next=23,Object(v.y)(i);case 23:return e.next=25,k.open({type:"success",description:"Profesional integrado correctamente"});case 25:h(null===x||void 0===x?void 0:x.filtros),e.next=33;break;case 28:return e.prev=28,e.t1=e.catch(20),e.next=32,k.open({type:"error",description:null===(l=e.t1.response)||void 0===l||null===(s=l.data)||void 0===s?void 0:s.message});case 32:g(!1);case 33:case"end":return e.stop()}}),e,null,[[2,13,16,19],[20,28]])}))),[x]),Object(O.jsxs)(O.Fragment,{children:[w,Object(O.jsx)(d.a,{title:"Crear Profesional",open:n,onCancel:N,footer:[Object(O.jsx)(m.a,{onClick:N,children:"Cancelar"},"button-cancel"),Object(O.jsx)(m.a,{loading:B,onClick:function(){return K.submit()},children:"Integrar"},"button-integrar")],children:Object(O.jsx)(u.a,{name:"wrap",layout:"vertical",colon:!1,onFinish:J,form:K,autoComplete:"off",children:Object(O.jsxs)("div",{className:"row align-items-center",children:[Object(O.jsx)("div",{className:"col-12 col-md-6 col-lg-6",children:Object(O.jsx)(u.a.Item,{label:"Tipo de documento",name:"tipo_documento",rules:[{required:!0,message:"Campo obligatorio"}],children:Object(O.jsx)(p.a,{className:"w-100",showSearch:!0,placeholder:"Selecciona tipo de documento",optionFilterProp:"children",filterOption:function(e,n){var t;return(null!==(t=null===n||void 0===n?void 0:n.label)&&void 0!==t?t:"").toLowerCase().includes(e.toLowerCase())},options:S})})}),Object(O.jsx)("div",{className:"col-12 col-md-6 col-lg-6",children:Object(O.jsx)(u.a.Item,{label:"N\xfamero de documento",name:"numero_documento",rules:[{required:!0,message:"Campo obligatorio"}],children:Object(O.jsx)(b.a,{onChange:function(e){var n=e.target;console.log("target",n),L(Object(a.a)(Object(a.a)({},z),{},Object(r.a)({},n.name,n.value)))},name:"numero_documento"})})})]})})})]})}},982:function(e,n,t){"use strict";t.r(n);var o=t(6),r=t(11),a=t(5),c=t(145),i=t(507),l=t(3),s=t(269),u=t(7),d=t.n(u),m=t(129),p=t(236),b=t(0),f=t(77),j=t(378),v=t(37),O=t(79),x=t(190),h=t(347),g=t(90),y=t(107),C=t(346),k=function(e){var n=e.prefixCls,t=e.okButtonProps,o=e.cancelButtonProps,r=e.title,a=e.cancelText,c=e.okText,i=e.okType,s=e.icon,u=e.showCancel,d=void 0===u||u,m=e.close,p=e.onConfirm,j=e.onCancel,v=b.useContext(f.b).getPrefixCls;return b.createElement(g.a,{componentName:"Popconfirm",defaultLocale:y.a.Popconfirm},(function(e){return b.createElement("div",{className:"".concat(n,"-inner-content")},b.createElement("div",{className:"".concat(n,"-message")},s&&b.createElement("span",{className:"".concat(n,"-message-icon")},s),b.createElement("div",{className:"".concat(n,"-message-title")},Object(C.a)(r))),b.createElement("div",{className:"".concat(n,"-buttons")},d&&b.createElement(O.a,Object(l.a)({onClick:j,size:"small"},o),null!==a&&void 0!==a?a:e.cancelText),b.createElement(h.a,{buttonProps:Object(l.a)(Object(l.a)({size:"small"},Object(x.a)(i)),t),actionFn:p,close:m,prefixCls:v("btn"),quitOnNullishReturnValue:!0,emitEvent:!0},null!==c&&void 0!==c?c:e.okText)))}))},w=void 0,N=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)n.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(t[o[r]]=e[o[r]])}return t},_=b.forwardRef((function(e,n){var t=e.prefixCls,o=e.placement,r=void 0===o?"top":o,c=e.trigger,i=void 0===c?"click":c,u=e.okType,O=void 0===u?"primary":u,x=e.icon,h=void 0===x?b.createElement(s.a,null):x,g=e.children,y=e.overlayClassName,C=e.onOpenChange,_=e.onVisibleChange,E=N(e,["prefixCls","placement","trigger","okType","icon","children","overlayClassName","onOpenChange","onVisibleChange"]),S=b.useContext(f.b).getPrefixCls,I=Object(m.a)(!1,{value:void 0!==e.open?e.open:e.visible,defaultValue:void 0!==e.defaultOpen?e.defaultOpen:e.defaultVisible}),P=Object(a.a)(I,2),T=P[0],B=P[1],F=function(e,n){B(e,!0),null===_||void 0===_||_(e,n),null===C||void 0===C||C(e,n)},A=S("popover",t),D=S("popconfirm",t),V=d()(D,y);return b.createElement(j.a,Object(l.a)({},E,{trigger:i,prefixCls:A,placement:r,onOpenChange:function(n){var t=e.disabled;void 0!==t&&t||F(n)},open:T,ref:n,overlayClassName:V,_overlay:b.createElement(k,Object(l.a)({okType:O,icon:h},e,{prefixCls:A,close:function(e){F(!1,e)},onConfirm:function(n){var t;return null===(t=e.onConfirm)||void 0===t?void 0:t.call(w,n)},onCancel:function(n){var t;F(!1,n),null===(t=e.onCancel)||void 0===t||t.call(w,n)}}))}),Object(v.a)(g,{onKeyDown:function(e){var n,t;b.isValidElement(g)&&(null===(t=null===g||void 0===g?void 0:(n=g.props).onKeyDown)||void 0===t||t.call(n,e)),function(e){e.keyCode===p.a.ESC&&T&&F(!1,e)}(e)}}))})),E=t(936),S=t(506),I=t(934),P=t(63),T=t(71),B=t.n(T),F=t(19),A=t(951),D=t(1);n.default=function(){var e=Object(b.useState)(!1),n=Object(a.a)(e,2),t=n[0],l=n[1],s=Object(b.useState)(!1),u=Object(a.a)(s,2),d=u[0],m=u[1],p=Object(b.useState)(""),f=Object(a.a)(p,2),j=f[0],v=f[1],x=Object(b.useState)([]),h=Object(a.a)(x,2),g=h[0],y=h[1],C=c.a.useForm(),k=Object(a.a)(C,1)[0],w=Object(b.useState)(!1),N=Object(a.a)(w,2),T=N[0],V=N[1],z=Object(P.g)(),L=i.b.useMessage(),q=Object(a.a)(L,2),K=q[0];q[1];Object(b.useEffect)((function(){M({numero_doc:"",nombre:""})}),[]);var J=function(){B.a.fire({title:"Cargando...",text:"Por favor, espera un momento..",icon:"info",allowOutsideClick:!1,allowEscapeKey:!1,focusConfirm:!1,showConfirmButton:!1,showCloseButton:!1,didOpen:function(){B.a.showLoading()}})},R=function(){B.a.close()},M=function(){var e=Object(r.a)(Object(o.a)().mark((function e(n){var r;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return J(),m(!0),e.next=4,Object(F.Cc)(t.name,n);case 4:if(0!==(r=e.sent).length){e.next=10;break}return e.next=8,B.a.fire({title:"No existen registros",text:"\xbfDesea integrar un profesional?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:"No",confirmButtonText:"Si, crear"});case 8:e.sent.isConfirmed&&V(!0);case 10:m(!1),y(r),R();case 13:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),G=function(e){var n=e.target;n.value?("numero_doc"===n.name&&v(n.value),l({name:n.name})):l(!1)},H=[{title:"Nombres",dataIndex:"nombres",key:"nombres",render:function(e){return Object(D.jsx)("strong",{children:e})}},{title:"Apellidos",dataIndex:"apellidos",key:"apellidos",render:function(e){return Object(D.jsx)("strong",{children:e})}},{title:"Tipo de documento",dataIndex:"tipo_documento",key:"tipo_documento"},{title:"N\xfamero de documento",dataIndex:"numero_documento",key:"numero_documento",render:function(e){return Object(D.jsx)("strong",{children:e})}},{title:"Profesi\xf3n",dataIndex:"profesion",key:"profesion"},{title:"Acciones",key:"action",align:"center",children:[{title:"Ver",key:"ver",render:function(e){var n=function(){var n=Object(r.a)(Object(o.a)().mark((function n(){var t,r;return Object(o.a)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,J(),n.next=4,Object(F.j)(null===e||void 0===e?void 0:e.numero_documento);case 4:K.open({type:"success",content:"Actualizado correctamente"}),z.push("/detail-professional/".concat(null===e||void 0===e?void 0:e.id_professional)),R(),n.next=13;break;case 9:n.prev=9,n.t0=n.catch(0),R(),K.open({type:"error",content:(null===(t=n.t0.response)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.message)||"error"});case 13:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(){return n.apply(this,arguments)}}();return Object(D.jsx)(_,{title:"\xbfActualizar profesional? ",onConfirm:n,onCancel:function(){z.push("/detail-professional/".concat(null===e||void 0===e?void 0:e.id_professional))},okText:"Si, actualizar",cancelText:"No",children:Object(D.jsx)("i",{style:{cursor:"pointer"},className:"icon icon-view"})})}},{title:"Editar",key:"editar",dataIndex:"id_professional",render:function(e){return Object(D.jsx)("i",{style:{cursor:"pointer"},className:"icon icon-edit",onClick:function(){z.push("/edit-professional/".concat(e))}})}}]}];return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(A.a,{open:T,setOpen:V,numero_doc:j}),Object(D.jsx)(E.a,{title:"Buscar profesional",extra:Object(D.jsx)("span",{style:{cursor:"pointer",color:"#038fde"},onClick:function(){return V(!0)},children:"Integrar"}),actions:[Object(D.jsxs)("div",{className:"d-flex justify-content-end me-4",children:[Object(D.jsx)(O.a,{type:"primary",htmlType:"submit",onClick:function(){k.resetFields(),l(!1),M({numero_doc:"",nombre:""})},children:"Limpiar Filtros"}),Object(D.jsx)(O.a,{type:"primary",htmlType:"submit",onClick:function(){return k.submit()},disabled:!t,loading:d,children:"Consultar"})]},"button-actions")],children:Object(D.jsx)(c.a,{name:"wrap",layout:"vertical",colon:!1,onFinish:M,form:k,autoComplete:"off",children:Object(D.jsxs)("div",{className:"row align-items-center",children:[Object(D.jsx)("div",{className:"col-12 col-md-6 col-lg-6",children:Object(D.jsx)(c.a.Item,{label:"Nombre",name:"nombre",children:Object(D.jsx)(S.a,{onChange:G,name:"nombre",disabled:"numero_doc"===(null===t||void 0===t?void 0:t.name)})})}),Object(D.jsx)("div",{className:"col-12 col-md-6 col-lg-6",children:Object(D.jsx)(c.a.Item,{label:"N\xfamero de documento",name:"numero_doc",children:Object(D.jsx)(S.a,{onChange:G,name:"numero_doc",disabled:"nombre"===(null===t||void 0===t?void 0:t.name)})})})]})})}),Object(D.jsx)(E.a,{children:Object(D.jsx)(I.a,{columns:H,loading:d,dataSource:g,scroll:{x:1300}})})]})}}}]);
//# sourceMappingURL=9.ab407554.chunk.js.map