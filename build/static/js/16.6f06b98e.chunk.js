(this["webpackJsonpwieldy-hook"]=this["webpackJsonpwieldy-hook"]||[]).push([[16],{976:function(e,t,n){"use strict";n.r(t);var r=n(6),a=n(11),o=n(5),c=n(79),s=n(936),l=n(934),d=n(0),i=n(1002),f=n(1003),u=n(948),j=n(947),b=n(19),x=n(82),p=n.n(x),h=n(1);n(946);t.default=function(){var e=Object(d.useState)([]),t=Object(o.a)(e,2),n=t[0],x=t[1],y=Object(d.useState)(!1),O=Object(o.a)(y,2),k=O[0],g=O[1],m=function(){var e=Object(a.a)(Object(r.a)().mark((function e(){var t;return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g(!0),e.prev=1,e.next=4,Object(b.Xb)();case 4:t=e.sent,console.log("Respuesta de getReport:",t),x(t),g(!1),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),console.error("Error al obtener los datos:",e.t0),g(!1);case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}();Object(d.useEffect)((function(){var e=function(){var e=Object(a.a)(Object(r.a)().mark((function e(){var t;return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g(!0),e.prev=1,e.next=4,Object(b.Xb)();case 4:t=e.sent,console.log("Respuesta de getReport:",t),x(t),g(!1),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),console.error("Error al obtener los datos:",e.t0),g(!1);case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}();e()}),[]);var D=function(e){var t="";switch(e){case 1:t="Disponible";break;case 2:t="Bloqueado";break;case 3:t="Asignado Cita";break;default:t="Desconocido"}return t},C=function(e){return null===e||void 0===e||""===e?Object(h.jsx)("strong",{children:"Sin Cita"}):Object(h.jsx)("strong",{children:e})},F=function(e,t){var n=p()(e);return p()(t).diff(n,"days")},v=[{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Documento Profesional"}),dataIndex:"numDocProf",key:"numDocProf",render:function(e){return Object(h.jsx)("strong",{children:e})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Nombre Profesional"}),dataIndex:"nameProf",key:"nameProf",render:function(e){return Object(h.jsx)("strong",{children:e})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Tipo Examen"}),dataIndex:"nameExam",key:"nameExam"},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Sede"}),dataIndex:"sedeSies",key:"sedeSies"},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Fecha Creacion"}),dataIndex:"createdAt",key:"createdAt",render:function(e){return Object(h.jsx)("strong",{children:p()(e).format("DD/MM/YYYY")})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Hora Creacion"}),dataIndex:"createdAt",key:"createdAt",render:function(e){return Object(h.jsx)("strong",{children:p()(e).format("HH:mm a")})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Fecha Disponibilidad"}),dataIndex:"fechaHora",key:"fechaHora",render:function(e){return Object(h.jsx)("strong",{children:p()(e).format("DD/MM/YYYY")})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Hora Disponibilidad"}),dataIndex:"fechaHora",key:"fechaHora",render:function(e){return Object(h.jsx)("strong",{children:p()(e).format("HH:mm a")})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Creado Por"}),dataIndex:"createdBy",key:"createdBy"},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Estado"}),dataIndex:"state",key:"state",render:function(e){return Object(h.jsx)("strong",{children:D(e)})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Duraci\xf3n"}),dataIndex:"duration",key:"duration",render:function(e){return e+" Min"}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Motivo de Bloqueo"}),dataIndex:"motBloc",key:"motBloc",render:function(e){return C(e)}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Documento Paciente"}),dataIndex:"numDocPac",key:"numDocPac",render:function(e){return C(e)}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Nombre Paciente"}),dataIndex:"namePac",key:"namePac",render:function(e){return C(e)}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Estado Cita"}),dataIndex:"stateCita",key:"stateCita",render:function(e){return C(e)}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Fecha Cancelaci\xf3n"}),dataIndex:"dateCancel",key:"dateCancel",render:function(e){return e&&p()(e).isValid()?Object(h.jsx)("strong",{children:p()(e).format("DD/MM/YYYY HH:mm a")}):Object(h.jsx)("strong",{children:"Sin Cita"})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Motivo Cancelaci\xf3n"}),dataIndex:"motCancel",key:"motCancel",render:function(e){return C(e)}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Franja"}),dataIndex:"franja",key:"franja",render:function(e){return C(e)}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Oportunidad Habilitaci\xf3n"}),dataIndex:"createdAt",key:"differenceInDays",render:function(e,t){var n=F(t.createdAt,t.fechaHora);return Object(h.jsx)("strong",{children:"Dias : "+n})}},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Especialidad"}),dataIndex:"especialidad",key:"especialidad"},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Programa"}),dataIndex:"programa",key:"programa"},{title:Object(h.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Oportunidad Cancelacion"}),dataIndex:"dateCancel",key:"differenceInDays",render:function(e,t){var n=F(t.dateCancel,t.fechaHora);return Object(h.jsx)("strong",{children:"Dias : "+n})}}];return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("div",{className:"gx-profile-banner",style:{display:"flex",justifyContent:"space-between",padding:"32px 32px 70px"},children:Object(h.jsx)("div",{className:"gx-profile-container",children:Object(h.jsxs)("div",{className:"gx-profile-banner-top",style:{justifyContent:"space-between",marginBottom:"10px"},children:[Object(h.jsxs)(c.a,{onClick:function(){var e={Sheets:{data:u.a.json_to_sheet(n)},SheetNames:["data"]},t=u.b(e,{bookType:"xlsx",type:"array"}),r=new Date,a=r.getDay()+"/"+(r.getMonth()+1)+"/"+r.getFullYear(),o=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});Object(j.saveAs)(o,"Aprovechamiento Agenda-".concat(a)+".xlsx")},style:{backgroundColor:"#484d55",color:"#FFF"},children:[Object(h.jsx)(i.a,{}),"Descargar Excel"]}),Object(h.jsxs)(c.a,{onClick:m,children:[Object(h.jsx)(f.a,{}),"Actualizar"]})]})})}),Object(h.jsx)(s.a,{style:{zIndex:2},children:Object(h.jsx)(l.a,{columns:v,loading:k,dataSource:n,scroll:{x:1300}})})]})}}}]);
//# sourceMappingURL=16.6f06b98e.chunk.js.map