(this["webpackJsonpwieldy-hook"]=this["webpackJsonpwieldy-hook"]||[]).push([[14],{973:function(e,t,a){"use strict";a.r(t);var n=a(6),o=a(12),c=a(5),r=a(78),s=a(939),l=a(937),i=a(0),d=a(998),u=a(999),f=a(960),b=a(959),j=a(22),x=(a(81),a(1));a(514);t.default=function(){var e=Object(i.useState)([]),t=Object(c.a)(e,2),a=t[0],p=t[1],h=Object(i.useState)(!1),g=Object(c.a)(h,2),y=g[0],O=g[1],k=Object(i.useState)([]),m=Object(c.a)(k,2),v=m[0],C=m[1],F=function(){var e=Object(o.a)(Object(n.a)().mark((function e(){var t;return Object(n.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O(!0),e.next=3,Object(j.Tb)();case 3:t=e.sent,I(),O(!1),p(t);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(i.useEffect)((function(){F()}),[]);var I=function(){for(var e=a.tResultados.split(","),t=[],n=0;n<e.length;n+=2){var o=e[n].split("-"),c={mesYear:o[0],servicio:o[1],resultado:e[n+1]};t.push(c)}C(t)},D=[{title:Object(x.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Documento"}),dataIndex:"secuen",key:"secuen",render:function(e){return Object(x.jsx)("strong",{children:e})}},{title:Object(x.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Programa"}),dataIndex:"programa",key:"programa"},{title:Object(x.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Fecha Registro"}),dataIndex:"fechaHoraRegistro",key:"fechaHoraRegistro"},{title:Object(x.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Responsable"}),dataIndex:"createdBy",key:"createdBy"},{title:Object(x.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Etiqueta Administrativa"}),dataIndex:"etAdmin",key:"etAdmin"},{title:Object(x.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Observacion Etiqueta Administrativa"}),dataIndex:"noteChange",key:"noteChange"},{title:Object(x.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Etiqueta Seguimiento"}),dataIndex:"etSeguimiento",key:"etSeguimiento"},{title:Object(x.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Observacion Seguimiento"}),dataIndex:"observacion_Seguimiento",key:"observacion_Seguimiento"},{title:Object(x.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Motivo Inasistencia"}),dataIndex:"motInasis",key:"motInasis"}];v.forEach((function(e,t){D.push({title:Object(x.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Mes/A\xf1o Plan Mensual #".concat(t+1)}),dataIndex:"mesYear_".concat(t),key:"mesYear_".concat(t)},{title:Object(x.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Servicio/Plan Mensual #".concat(t+1)}),dataIndex:"servicio_".concat(t),key:"servicio_".concat(t)},{title:Object(x.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Resultado de Contacto #".concat(t+1)}),dataIndex:"resultado_".concat(t),key:"resultado_".concat(t),render:function(e){return e}})})),console.log(D);return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("div",{className:"gx-profile-banner",style:{display:"flex",justifyContent:"space-between",padding:"32px 32px 70px"},children:Object(x.jsx)("div",{className:"gx-profile-container",children:Object(x.jsxs)("div",{className:"gx-profile-banner-top",style:{justifyContent:"space-between",marginBottom:"10px"},children:[Object(x.jsxs)(r.a,{onClick:function(){var e={Sheets:{data:f.a.json_to_sheet(a)},SheetNames:["data"]},t=f.b(e,{bookType:"xlsx",type:"array"}),n=new Date,o=n.getDay()+"/"+(n.getMonth()+1)+"/"+n.getFullYear(),c=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});Object(b.saveAs)(c,"Informe Pacientes-".concat(o)+".xlsx")},style:{backgroundColor:"#484d55",color:"#FFF"},children:[Object(x.jsx)(d.a,{}),"Descargar Excel"]}),Object(x.jsxs)(r.a,{onClick:F,children:[Object(x.jsx)(u.a,{}),"Actualizar"]})]})})}),Object(x.jsx)(s.a,{style:{zIndex:2},children:Object(x.jsx)(l.a,{columns:D,loading:y,dataSource:a,scroll:{x:1300}})})]})}}}]);
//# sourceMappingURL=14.52399159.chunk.js.map