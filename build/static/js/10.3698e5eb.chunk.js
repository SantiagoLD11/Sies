(this["webpackJsonpwieldy-hook"]=this["webpackJsonpwieldy-hook"]||[]).push([[10],{943:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var o=n(175);function r(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=Object(o.a)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,i=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){l=!0,c=e},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw c}}}}},952:function(e,t,n){"use strict";var o=n(943),r=n(2),a=n(4),c=n(6),i=n(11),l=n(5),s=n(352),u=n(145),d=n(926),b=n(80),m=n(160),p=n(507),v=n(0),j=n(63),f=n(19),O=n(1);t.a=function(e){var t=e.open,n=e.setOpen,x=(e.numero_doc,e.dataIntegrarProfesional),h=e.getDatagrid,g=(e.setDataIntegrarProfesional,e.cargando),k=s.a.useNotification(),_=Object(l.a)(k,2),y=_[0],w=_[1],C=function(){return n(!1)},I=Object(v.useState)([]),S=Object(l.a)(I,2),F=S[0],N=S[1],D=Object(v.useState)(!1),P=Object(l.a)(D,2),T=P[0],B=P[1],q=Object(j.g)(),A=Object(v.useState)({tipo_documento:"",numero_documento:""}),E=Object(l.a)(A,2),V=E[0],z=E[1],R=u.a.useForm(),L=Object(l.a)(R,1)[0],G=function(){var e=Object(i.a)(Object(c.a)().mark((function e(t){var n,o;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return B(!0),e.prev=1,e.next=4,Object(f.y)(t);case 4:return e.next=6,y.open({type:"success",description:"Profesional integrado correctamente"});case 6:q.push({pathname:"/detail-professional/".concat(null===t||void 0===t?void 0:t.numero_documento),state:{type:"numero_document"}}),C(),e.next=14;break;case 10:return e.prev=10,e.t0=e.catch(1),e.next=14,y.open({type:"error",description:null===(n=e.t0.response)||void 0===n||null===(o=n.data)||void 0===o?void 0:o.message});case 14:B(!1);case 15:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}(),H=function(){var e=Object(i.a)(Object(c.a)().mark((function e(){var t;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(f.Ac)();case 2:t=e.sent,N(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(v.useEffect)((function(){H()}),[]),Object(v.useEffect)(Object(i.a)(Object(c.a)().mark((function e(){var t,n,r,a,i,l,s;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!x.Integrar){e.next=33;break}n=Object(o.a)(F),e.prev=2,n.s();case 4:if((r=n.n()).done){e.next=11;break}if((a=r.value).label!==(null===x||void 0===x?void 0:x.Tipo_Documento)){e.next=9;break}return t=a.value,e.abrupt("break",11);case 9:e.next=4;break;case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(2),n.e(e.t0);case 16:return e.prev=16,n.f(),e.finish(16);case 19:return i={tipo_documento:t,numero_documento:null===x||void 0===x?void 0:x.Numero_Documento},e.prev=20,e.next=23,Object(f.y)(i);case 23:return e.next=25,y.open({type:"success",description:"Profesional integrado correctamente"});case 25:h(null===x||void 0===x?void 0:x.filtros),e.next=33;break;case 28:return e.prev=28,e.t1=e.catch(20),e.next=32,y.open({type:"error",description:null===(l=e.t1.response)||void 0===l||null===(s=l.data)||void 0===s?void 0:s.message});case 32:g(!1);case 33:case"end":return e.stop()}}),e,null,[[2,13,16,19],[20,28]])}))),[x]),Object(O.jsxs)(O.Fragment,{children:[w,Object(O.jsx)(d.a,{title:"Crear Profesional",open:t,onCancel:C,footer:[Object(O.jsx)(b.a,{onClick:C,children:"Cancelar"},"button-cancel"),Object(O.jsx)(b.a,{loading:T,onClick:function(){return L.submit()},children:"Integrar"},"button-integrar")],children:Object(O.jsx)(u.a,{name:"wrap",layout:"vertical",colon:!1,onFinish:G,form:L,autoComplete:"off",children:Object(O.jsxs)("div",{className:"row align-items-center",children:[Object(O.jsx)("div",{className:"col-12 col-md-6 col-lg-6",children:Object(O.jsx)(u.a.Item,{label:"Tipo de documento",name:"tipo_documento",rules:[{required:!0,message:"Campo obligatorio"}],children:Object(O.jsx)(m.a,{className:"w-100",showSearch:!0,placeholder:"Selecciona tipo de documento",optionFilterProp:"children",filterOption:function(e,t){var n;return(null!==(n=null===t||void 0===t?void 0:t.label)&&void 0!==n?n:"").toLowerCase().includes(e.toLowerCase())},options:F})})}),Object(O.jsx)("div",{className:"col-12 col-md-6 col-lg-6",children:Object(O.jsx)(u.a.Item,{label:"N\xfamero de documento",name:"numero_documento",rules:[{required:!0,message:"Campo obligatorio"}],children:Object(O.jsx)(p.a,{onChange:function(e){var t=e.target;console.log("target",t),z(Object(a.a)(Object(a.a)({},V),{},Object(r.a)({},t.name,t.value)))},name:"numero_documento"})})})]})})})]})}},970:function(e,t,n){"use strict";n.r(t);var o=n(943),r=n(6),a=n(11),c=n(5),i=n(145),l=n(508),s=n(154),u=n(80),d=n(399),b=n(936),m=n(507),p=n(509),v=n(160),j=n(934),f=n(0),O=n(19),x=n(72),h=n.n(x),g=n(952),k=n(63),_=(n(514),n(516),n(511)),y=n(1);t.default=function(){var e=Object(f.useState)(!1),t=Object(c.a)(e,2),n=t[0],x=t[1],w=Object(f.useState)(!1),C=Object(c.a)(w,2),I=C[0],S=C[1],F=Object(f.useState)(void 0),N=Object(c.a)(F,2),D=N[0],P=N[1],T=Object(f.useState)(""),B=Object(c.a)(T,2),q=B[0],A=B[1],E=Object(f.useState)(""),V=Object(c.a)(E,2),z=V[0],R=V[1],L=Object(f.useState)(!0),G=Object(c.a)(L,2),H=G[0],M=G[1],W=Object(f.useState)([]),J=Object(c.a)(W,2),$=J[0],K=J[1],Q=i.a.useForm(),U=Object(c.a)(Q,1)[0],X=Object(f.useState)(!1),Y=Object(c.a)(X,2),Z=Y[0],ee=Y[1],te=Object(k.g)(),ne=l.b.useMessage(),oe=Object(c.a)(ne,2),re=oe[0],ae=oe[1],ce=Object(f.useState)([]),ie=Object(c.a)(ce,2),le=ie[0],se=ie[1],ue=Object(f.useState)({Integrar:!1,Tipo_Documento:null,Numero_Documento:null,filtros:null}),de=Object(c.a)(ue,2),be=de[0],me=de[1],pe=function(){var e=Object(a.a)(Object(r.a)().mark((function e(){var t;return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(O.yc)();case 2:t=e.sent,se(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(f.useEffect)((function(){pe()}),[]);var ve=function(){var e=Object(a.a)(Object(r.a)().mark((function e(t){var n,o,a,c,i;return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("Valores: ".concat(q,", ").concat(z,", ").concat(D,', "valor: ",').concat(null===t||void 0===t?void 0:t.nombre)),t.tipo_doc||0!=(null===t||void 0===t||null===(n=t.nombre)||void 0===n?void 0:n.length)){e.next=4;break}return h.a.fire({icon:"error",title:"Oops...",text:"El campo tipo de documento es requerido"}),e.abrupt("return");case 4:if(t.numero_doc||0!=(null===t||void 0===t||null===(o=t.nombre)||void 0===o?void 0:o.length)){e.next=7;break}return h.a.fire({icon:"error",title:"Oops...",text:"El campo n\xfamero de documento es requerido"}),e.abrupt("return");case 7:if(!((null===t||void 0===t||null===(a=t.nombre)||void 0===a?void 0:a.length)>=3)||D){e.next=22;break}return S(!0),e.next=11,Object(O.Cc)(D,t);case 11:if(0!==(c=e.sent).length){e.next=17;break}return e.next=15,je(t);case 15:e.next=19;break;case 17:S(!1),K(c);case 19:me({Integrar:!1,Tipo_Documento:null,Numero_Documento:null,filtros:null}),e.next=35;break;case 22:if(void 0===D||""!==q){e.next=35;break}return S(!0),e.next=26,Object(O.Cc)(D,t);case 26:if(0!==(i=e.sent).length){e.next=32;break}return e.next=30,je(t);case 30:e.next=34;break;case 32:S(!1),K(i);case 34:me({Integrar:!1,Tipo_Documento:null,Numero_Documento:null,filtros:null});case 35:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),je=function(){var e=Object(a.a)(Object(r.a)().mark((function e(t){var n,a,c,i;return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==(null===t||void 0===t?void 0:t.nombre)&&""!==(null===t||void 0===t?void 0:t.nombre)&&null!==(null===t||void 0===t?void 0:t.nombre)){e.next=22;break}a=Object(o.a)(le),e.prev=2,a.s();case 4:if((c=a.n()).done){e.next=11;break}if((i=c.value).value!==t.tipo_doc){e.next=9;break}return n=i.label,e.abrupt("break",11);case 9:e.next=4;break;case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(2),a.e(e.t0);case 16:return e.prev=16,a.f(),e.finish(16);case 19:me({Integrar:!0,Tipo_Documento:n,Numero_Documento:D,filtros:t}),e.next=26;break;case 22:return e.next=24,h.a.fire({title:"No existen registros",text:"\xbfDesea integrar un profesional?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:"No",confirmButtonText:"Si, integrar"});case 24:e.sent.isConfirmed?(ee(!0),S(!1),Object(O.jc)()):(S(!1),Object(O.jc)());case 26:case"end":return e.stop()}}),e,null,[[2,13,16,19]])})));return function(t){return e.apply(this,arguments)}}(),fe=function(e){var t=e.target;if(M(!1),void 0!==(null===t||void 0===t?void 0:t.value)&&""!==(null===t||void 0===t?void 0:t.value)){if("numero_doc"===t.name){var n=t.value;P(n),A("")}if("nombre"===t.name){var o=t.value;ve({nombre:o}),A(o),P(""),R("")}if("tipo_doc"===t.name){t.value;R(U.getFieldValue("tipo_doc")),A(""),P(U.getFieldValue("numero_doc"))}x({name:t.name}),M(!(""!==z&&void 0!==D&&""===q||""===z&&void 0===D&&""!==q))}else P(""),x(!1),M(!0)},Oe=[{title:"Nombres",dataIndex:"nombres",key:"nombres",render:function(e){return Object(y.jsx)("strong",{children:e})}},{title:"Apellidos",dataIndex:"apellidos",key:"apellidos",render:function(e){return Object(y.jsx)("strong",{children:e})}},{title:"Tipo de documento",dataIndex:"tipo_documento",key:"tipo_documento"},{title:"N\xfamero de documento",dataIndex:"numero_documento",key:"numero_documento",render:function(e){return Object(y.jsx)("strong",{children:e})}},{title:"Profesi\xf3n",dataIndex:"profesion",key:"profesion"},{title:"Visualizar",key:"action",align:"center",fixed:"right",render:function(e){try{var t=function(){var t=Object(a.a)(Object(r.a)().mark((function t(){var n,o,c,i,l,s,u,d,b;return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return S(!0),Object(O.Hc)(),t.next=4,Object(O.Rc)(null===e||void 0===e?void 0:e.id);case 4:return t.next=6,Object(O.cc)(null===e||void 0===e?void 0:e.id_professional);case 6:return n=t.sent,S(!1),Object(O.jc)(),o=!1,t.next=12,h.a.fire({title:"Importacion Cupos",text:"Por favor indicar que tipo de importacion desea realizar,si es para una unica sede aplicar filtro!",icon:"question",showCancelButton:!0,allowOutsideClick:!1,input:"select",inputPlaceholder:"Seleccione una Sede(Opcional)",inputOptions:n.reduce((function(e,t){return e[t.value]=t.label,e}),{}),confirmButtonColor:"#038fde",cancelButtonColor:"#d33",confirmButtonText:"Importar",cancelButtonText:"Cancelar"}).then(function(){var e=Object(a.a)(Object(r.a)().mark((function e(t){return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.isConfirmed){e.next=6;break}return o=!0,console.log("Es confirmado "+t.value),e.abrupt("return",t.value);case 6:h.a.close();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 12:if(!(c=t.sent)||!o){t.next=52;break}return i=n.find((function(e){return e.value===c})),console.log("ID seleccionado:",i.value),console.log("Nombre seleccionado:",i.label),t.prev=17,S(!0),Object(O.Hc)(),t.prev=20,t.next=23,Object(O.Wc)(null===e||void 0===e?void 0:e.id_professional,i.value);case 23:return t.next=25,Object(O.Fc)(null===e||void 0===e?void 0:e.id_professional);case 25:return re.open({type:"success",content:"Actualizado correctamente"}),t.next=28,Object(O.G)(null===e||void 0===e?void 0:e.numero_documento);case 28:l=t.sent,S(!1),Object(O.jc)(),te.push({pathname:"/detail-professional/".concat(null===e||void 0===e?void 0:e.id_professional),state:{detail:l}}),t.next=45;break;case 34:return t.prev=34,t.t0=t.catch(20),console.log("error: ",t.t0),t.next=39,re.open({type:"error",content:(null===(s=t.t0.response)||void 0===s||null===(u=s.data)||void 0===u?void 0:u.message)||"Error: Actualizaci\xf3n Fallida Revise Numero de Documento"});case 39:return t.next=41,Object(O.G)(null===e||void 0===e?void 0:e.numero_documento);case 41:d=t.sent,S(!1),Object(O.jc)(),te.push({pathname:"/detail-professional/".concat(null===e||void 0===e?void 0:e.id_professional),state:{detail:d}});case 45:t.next=50;break;case 47:t.prev=47,t.t1=t.catch(17),h.a.showValidationMessage("\n                    Request failed: ".concat(t.t1,"\n                  "));case 50:t.next=72;break;case 52:if(!o){t.next=72;break}return t.prev=53,S(!0),Object(O.Hc)(),t.next=58,Object(O.Wc)(null===e||void 0===e?void 0:e.id_professional,"");case 58:return t.next=60,Object(O.Fc)(null===e||void 0===e?void 0:e.id_professional);case 60:return re.open({type:"success",content:"Actualizado correctamente"}),t.next=63,Object(O.G)(null===e||void 0===e?void 0:e.numero_documento);case 63:b=t.sent,S(!1),Object(O.jc)(),te.push({pathname:"/detail-professional/".concat(null===e||void 0===e?void 0:e.id_professional),state:{detail:b}}),t.next=72;break;case 69:t.prev=69,t.t2=t.catch(53),h.a.showValidationMessage("\n                Request failed: ".concat(t.t2,"\n              "));case 72:case"end":return t.stop()}}),t,null,[[17,47],[20,34],[53,69]])})));return function(){return t.apply(this,arguments)}}();return Object(y.jsx)(s.a,{title:"Ver",children:Object(y.jsx)(u.a,{onClick:t,children:Object(y.jsx)(_.a,{})})})}catch(c){var n,o;console.log("error: ",c),re.open({type:"error",content:(null===(n=c.response)||void 0===n||null===(o=n.data)||void 0===o?void 0:o.message)||"Error: Actualizaci\xf3n Fallida Revise Numero de Documento"}),S(!1),Object(O.jc)(),te.push("/detail-professional/".concat(null===e||void 0===e?void 0:e.id_professional))}}}],xe=function(e){var t=e.clipboardData.getData("text");setTimeout((function(){null==t&&""==t&&void 0==t||M(!1)}),0)};return Object(y.jsx)(y.Fragment,{children:Object(y.jsxs)(d.a,{spinning:I,children:[ae,Object(y.jsx)(g.a,{open:Z,setOpen:ee,numero_doc:D,getDatagrid:ve,dataIntegrarProfesional:be,setDataIntegrarProfesional:me,cargando:S}),Object(y.jsx)(b.a,{headStyle:{background:"#184F9D"},style:{boxShadow:"1px 4px 8px 0 rgba(0,0,0,0.2)"},title:Object(y.jsx)("span",{style:{fontWeight:"bold",fontSize:"18px",color:"#FFF"},children:"Buscar Profesional"}),actions:[Object(y.jsx)(u.a,{onClick:function(){U.resetFields(),x(!1),P(null),K([]),M(!0),R("")},children:"Limpiar Filtros"},"Limpiar"),Object(y.jsx)(u.a,{style:{backgroundColor:"#00ABC8",color:"#FFF"},htmlType:"submit",onClick:function(){return U.submit()},disabled:H,loading:I,children:"Consultar"},"Consultar")],children:Object(y.jsx)(i.a,{name:"wrap",layout:"vertical",colon:!1,onFinish:ve,form:U,autoComplete:"off",children:Object(y.jsxs)("div",{className:"row align-items-center",children:[Object(y.jsx)("div",{className:"col-12 col-md-6 col-lg-6",children:Object(y.jsx)(i.a.Item,{label:"Nombre completo",name:"nombre",children:Object(y.jsx)(m.a,{onChange:fe,name:"nombre",disabled:"numero_doc"===(null===n||void 0===n?void 0:n.name),onPaste:function(e){xe(e)}})})}),Object(y.jsx)("div",{className:"col-12 col-md-6 col-lg-6",children:Object(y.jsxs)(p.b.Compact,{block:!0,children:[Object(y.jsx)(i.a.Item,{label:"Tipo",name:"tipo_doc",style:{width:"15%"},rules:[{required:!U.getFieldValue("numero_doc"),message:"\xa1Por favor, selecciona el tipo de documento!"}],children:Object(y.jsx)(v.a,{onChange:function(e){fe({target:{name:"tipo_doc",value:e}})},name:"tipo_doc",disabled:"nombre"===(null===n||void 0===n?void 0:n.name),options:le,value:z})}),Object(y.jsxs)(i.a.Item,{label:"N\xfamero de documento",name:"numero_doc",style:{width:"85%"},rules:[{required:!U.getFieldValue("tipo_doc"),message:"\xa1Por favor, ingresa el n\xfamero de documento!"}],children:[Object(y.jsx)(m.a,{onChange:function(e){/^[0-9]{0,20}$|^$/.test(e.target.value)&&fe(e)},name:"numero_doc",disabled:"nombre"===(null===n||void 0===n?void 0:n.name),value:D,onPaste:function(e){xe(e)}}),Object(y.jsx)("input",{hidden:!0,name:"numero_doc",value:D})]})]})})]})})}),$.length>0&&Object(y.jsx)(b.a,{children:Object(y.jsx)(j.a,{columns:Oe,loading:I,dataSource:$,scroll:{x:1300}})})]})})}}}]);
//# sourceMappingURL=10.3698e5eb.chunk.js.map