(this["webpackJsonpwieldy-hook"]=this["webpackJsonpwieldy-hook"]||[]).push([[14],{949:function(e,t,n){"use strict";var r=n(4),a=n(0),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"}}]},name:"reload",theme:"outlined"},o=n(20),l=function(e,t){return a.createElement(o.a,Object(r.a)(Object(r.a)({},e),{},{ref:t,icon:c}))};l.displayName="ReloadOutlined";t.a=a.forwardRef(l)},977:function(e,t,n){"use strict";n.r(t);var r=n(6),a=n(11),c=n(5),o=n(80),l=n(936),s=n(934),d=n(0),i=n(990),f=n(949),u=n(947),j=n(946),b=n(19),x=n(68),p=n.n(x),h=n(1);n(948);t.default=function(){var e=Object(d.useState)([]),t=Object(c.a)(e,2),n=t[0],x=t[1],y=Object(d.useState)(!1),O=Object(c.a)(y,2),g=O[0],k=O[1],m=function(){var e=Object(a.a)(Object(r.a)().mark((function e(){var t;return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k(!0),e.prev=1,e.next=4,Object(b.Xb)();case 4:t=e.sent,console.log("Respuesta de getReport:",t),x(t),k(!1),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),console.error("Error al obtener los datos:",e.t0),k(!1);case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}();Object(d.useEffect)((function(){var e=function(){var e=Object(a.a)(Object(r.a)().mark((function e(){var t;return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k(!0),e.prev=1,e.next=4,Object(b.Xb)();case 4:t=e.sent,console.log("Respuesta de getReport:",t),x(t),k(!1),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),console.error("Error al obtener los datos:",e.t0),k(!1);case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}();e()}),[]);var C=function(e){var t="";switch(e){case 1:t="Disponible";break;case 2:t="Bloqueado";break;case 3:t="Asignado Cita";break;default:t="Desconocido"}return t},D=function(e){return null===e||void 0===e||""===e?Object(h.jsx)("strong",{children:"Sin Cita"}):Object(h.jsx)("strong",{children:e})},F=function(e,t){var n=p()(e);return p()(t).diff(n,"days")},v=[{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Documento Profesional"}),dataIndex:"numDocProf",key:"numDocProf",render:function(e){return Object(h.jsx)("strong",{children:e})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Nombre Profesional"}),dataIndex:"nameProf",key:"nameProf",render:function(e){return Object(h.jsx)("strong",{children:e})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Tipo Examen"}),dataIndex:"nameExam",key:"nameExam"},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Sede"}),dataIndex:"sedeSies",key:"sedeSies"},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Fecha Creacion"}),dataIndex:"createdAt",key:"createdAt",render:function(e){return Object(h.jsx)("strong",{children:p()(e).format("DD/MM/YYYY")})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Hora Creacion"}),dataIndex:"createdAt",key:"createdAt",render:function(e){return Object(h.jsx)("strong",{children:p()(e).format("HH:mm a")})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Fecha Disponibilidad"}),dataIndex:"fechaHora",key:"fechaHora",render:function(e){return Object(h.jsx)("strong",{children:p()(e).format("DD/MM/YYYY")})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Hora Disponibilidad"}),dataIndex:"fechaHora",key:"fechaHora",render:function(e){return Object(h.jsx)("strong",{children:p()(e).format("HH:mm a")})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Creado Por"}),dataIndex:"createdBy",key:"createdBy"},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Estado"}),dataIndex:"state",key:"state",render:function(e){return Object(h.jsx)("strong",{children:C(e)})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Duraci\xf3n"}),dataIndex:"duration",key:"duration",render:function(e){return e+" Min"}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Motivo de Bloqueo"}),dataIndex:"motBloc",key:"motBloc",render:function(e){return D(e)}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Documento Paciente"}),dataIndex:"numDocPac",key:"numDocPac",render:function(e){return D(e)}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Nombre Paciente"}),dataIndex:"namePac",key:"namePac",render:function(e){return D(e)}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Estado Cita"}),dataIndex:"stateCita",key:"stateCita",render:function(e){return D(e)}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Fecha Cancelaci\xf3n"}),dataIndex:"dateCancel",key:"dateCancel",render:function(e){return e&&p()(e).isValid()?Object(h.jsx)("strong",{children:p()(e).format("DD/MM/YYYY HH:mm a")}):Object(h.jsx)("strong",{children:"No Aplica"})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Motivo Cancelaci\xf3n"}),dataIndex:"motCancel",key:"motCancel",render:function(e){return e?Object(h.jsx)("strong",{children:e}):Object(h.jsx)("strong",{children:"No Aplica"})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Franja"}),dataIndex:"franja",key:"franja",render:function(e){return D(e)}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Oportunidad Habilitaci\xf3n"}),dataIndex:"createdAt",key:"differenceInDays",render:function(e,t){var n=F(t.createdAt,t.fechaHora);return Object(h.jsx)("strong",{children:n})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Especialidad"}),dataIndex:"especialidad",key:"especialidad"},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Programa"}),dataIndex:"programa",key:"programa"},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Oportunidad Cancelacion"}),dataIndex:"dateCancel",key:"differenceInDays",render:function(e,t){var n=F(t.dateCancel,t.fechaHora);return Object(h.jsx)("strong",{children:n||"No Aplica"})}}];return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("div",{className:"gx-profile-banner",style:{display:"flex",justifyContent:"space-between",padding:"32px 32px 70px"},children:Object(h.jsx)("div",{className:"gx-profile-container",children:Object(h.jsxs)("div",{className:"gx-profile-banner-top",style:{justifyContent:"space-between",marginBottom:"10px"},children:[Object(h.jsxs)(o.a,{onClick:function(){var e={Sheets:{data:u.a.json_to_sheet(n)},SheetNames:["data"]},t=u.b(e,{bookType:"xlsx",type:"array"}),r=new Date,a=r.getDay()+"/"+(r.getMonth()+1)+"/"+r.getFullYear(),c=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});Object(j.saveAs)(c,"Aprovechamiento Agenda-".concat(a)+".xlsx")},style:{backgroundColor:"#484d55",color:"#FFF"},children:[Object(h.jsx)(i.a,{}),"Descargar Excel"]}),Object(h.jsxs)(o.a,{onClick:m,children:[Object(h.jsx)(f.a,{}),"Actualizar"]})]})})}),Object(h.jsx)(l.a,{style:{zIndex:2},children:Object(h.jsx)(s.a,{columns:v,loading:g,dataSource:n,scroll:{x:1300}})})]})}}}]);
//# sourceMappingURL=14.d6946673.chunk.js.map