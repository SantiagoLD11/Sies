(this["webpackJsonpwieldy-hook"]=this["webpackJsonpwieldy-hook"]||[]).push([[12],{967:function(e,t,c){"use strict";c.r(t);var a=c(6),n=c(12),o=c(5),r=c(507),l=c(935),s=c(143),i=c(506),u=c(159),d=c(78),m=c(0),j=c(63),b=c(22),p=c(1);t.default=function(){var e=Object(j.i)().id,t=Object(j.g)(),c=Object(m.useState)([]),O=Object(o.a)(c,2),v=O[0],h=O[1],f=r.b.useMessage(),x=Object(o.a)(f,2),w=x[0],g=x[1],y=Object(m.useState)(!1),N=Object(o.a)(y,2),k=N[0],C=N[1],_=Object(m.useState)({nombre:"",apellido:"",tipo_documento:"",numero_documento:"",celular:""}),I=Object(o.a)(_,2),S=I[0],q=I[1],E=function(){var c=Object(n.a)(Object(a.a)().mark((function c(n){var o;return Object(a.a)().wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return C(!0),c.next=3,Object(b.Gc)(null===S||void 0===S?void 0:S.id,n);case 3:if("fail"!==(o=c.sent).status){c.next=7;break}return c.next=7,w.open({type:"error",content:(null===o||void 0===o?void 0:o.message)||"error"});case 7:if("ok"!==o.status){c.next=10;break}return c.next=10,w.open({type:"success",content:"Se ha editado correctamente el profesional"});case 10:t.push("/detail-professional/".concat(e)),C(!1);case 12:case"end":return c.stop()}}),c)})));return function(e){return c.apply(this,arguments)}}(),F=function(){var e=Object(n.a)(Object(a.a)().mark((function e(){var t;return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.mc)();case 2:t=e.sent,h(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var t=Object(n.a)(Object(a.a)().mark((function t(){var c;return Object(a.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(b.Vb)(e);case 2:c=t.sent,q(c);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(m.useEffect)((function(){F()}),[]),Object(m.useEffect)((function(){e&&T()}),[e]),Object(p.jsxs)(p.Fragment,{children:[g,Object(p.jsx)(l.a,{title:"Editar Profesional",children:Object(p.jsxs)(s.a,{name:"basic",onFinish:E,autoComplete:"off",layout:"vertical",fields:[{name:["nombres"],value:(null===S||void 0===S?void 0:S.nombre)||""},{name:["apellidos"],value:(null===S||void 0===S?void 0:S.apellido)||""},{name:["tipo_documento"],value:(null===S||void 0===S?void 0:S.tipo_documento)||""},{name:["numero_documento"],value:(null===S||void 0===S?void 0:S.numero_documento)||""},{name:["celular"],value:(null===S||void 0===S?void 0:S.celular)||""}],children:[Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("div",{className:"col-12 col-md-6",children:Object(p.jsx)(s.a.Item,{label:"Nombres",name:"nombres",rules:[{required:!0,message:"Campo obligatorio"}],children:Object(p.jsx)(i.a,{})})}),Object(p.jsx)("div",{className:"col-12 col-md-6",children:Object(p.jsx)(s.a.Item,{label:"Apellidos",name:"apellidos",rules:[{required:!0,message:"Campo obligatorio"}],children:Object(p.jsx)(i.a,{})})}),Object(p.jsx)("div",{className:"col-12 col-md-6",children:Object(p.jsx)(s.a.Item,{label:"Tipo de documento",name:"tipo_documento",rules:[{required:!0,message:"Campo obligatorio"}],children:Object(p.jsx)(u.a,{className:"w-100",showSearch:!0,placeholder:"Selecciona tipo de documento",optionFilterProp:"children",filterOption:function(e,t){var c;return(null!==(c=null===t||void 0===t?void 0:t.label)&&void 0!==c?c:"").toLowerCase().includes(e.toLowerCase())},options:v})})}),Object(p.jsx)("div",{className:"col-12 col-md-6",children:Object(p.jsx)(s.a.Item,{label:"N\xfamero de documento",name:"numero_documento",rules:[{required:!0,message:"Campo obligatorio"}],children:Object(p.jsx)(i.a,{})})}),Object(p.jsx)("div",{className:"col-12 col-md-6",children:Object(p.jsx)(s.a.Item,{label:"N\xfamero de celular",name:"celular",children:Object(p.jsx)(i.a,{})})}),Object(p.jsx)("div",{className:"col-12 col-md-6",children:Object(p.jsx)(s.a.Item,{label:"Email",name:"email",children:Object(p.jsx)(i.a,{})})})]}),Object(p.jsxs)("div",{className:"d-flex justify-content-end",children:[Object(p.jsx)(d.a,{htmlType:"button",onClick:function(){return t.push("/detail-professional/".concat(e))},children:"Regresar"}),Object(p.jsx)(d.a,{type:"primary",htmlType:"submit",loading:k,children:"Actualizar"})]})]})})]})}}}]);
//# sourceMappingURL=12.824dc7bf.chunk.js.map