(this["webpackJsonpwieldy-hook"]=this["webpackJsonpwieldy-hook"]||[]).push([[18],{949:function(e,t,n){"use strict";var a=n(4),c=n(0),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"}}]},name:"reload",theme:"outlined"},o=n(20),s=function(e,t){return c.createElement(o.a,Object(a.a)(Object(a.a)({},e),{},{ref:t,icon:r}))};s.displayName="ReloadOutlined";t.a=c.forwardRef(s)},976:function(e,t,n){"use strict";n.r(t);var a=n(6),c=n(11),r=n(5),o=n(80),s=n(936),l=n(934),d=n(0),i=n(990),u=n(949),b=n(947),f=n(946),j=n(19),p=(n(68),n(1));n(948);t.default=function(){var e=Object(d.useState)([]),t=Object(r.a)(e,2),n=t[0],x=t[1],y=Object(d.useState)(!1),h=Object(r.a)(y,2),O=h[0],g=h[1],k=function(){var e=Object(c.a)(Object(a.a)().mark((function e(){var t;return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g(!0),e.next=3,Object(j.h)();case 3:return e.next=5,Object(j.bc)();case 5:t=e.sent,x(t),g(!1);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(d.useEffect)((function(){k()}),[]);var C=[{title:Object(p.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Sede"}),dataIndex:"sede",key:"sede",render:function(e){return Object(p.jsx)("strong",{children:e})}},{title:Object(p.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Programa"}),dataIndex:"programa",key:"programa"},{title:Object(p.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Sub Programa"}),dataIndex:"subPrograma",key:"subPrograma",render:function(e){return Object(p.jsx)("strong",{children:e})}},{title:Object(p.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Especialidad"}),dataIndex:"especialidad",key:"especialidad",render:function(e){return Object(p.jsx)("strong",{children:e})}},{title:Object(p.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Canal de Atencion"}),dataIndex:"cnlAtencion",key:"cnlAtencion"},{title:Object(p.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Mes Calendario"}),dataIndex:"mesCal",key:"mesCal",render:function(e){return Object(p.jsx)("strong",{children:e})}},{title:Object(p.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Cupos Requeridos Netos"}),dataIndex:"cupsReqNetos",key:"cupsReqNetos"},{title:Object(p.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Cupos Requeridos Pendientes"}),dataIndex:"cupsReqPend",key:"cupsReqPend"},{title:Object(p.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Cupos Habilitados Netos"}),dataIndex:"cupsHabNetos",key:"cupsHabNetos"},{title:Object(p.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Cupos Habilitados Pendientes"}),dataIndex:"cupsHabPendientes",key:"cupsHabPendientes"},{title:Object(p.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Proyeccion Neta"}),dataIndex:"proyecNeta",key:"proyecNeta"},{title:Object(p.jsx)("span",{style:{backgroundColor:"#184F9D",color:"#fff"},children:"Proyeccion Pendiente"}),dataIndex:"proyectPendiente",key:"proyectPendiente"}];return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("div",{className:"gx-profile-banner",style:{display:"flex",justifyContent:"space-between",padding:"32px 32px 70px"},children:Object(p.jsx)("div",{className:"gx-profile-container",children:Object(p.jsxs)("div",{className:"gx-profile-banner-top",style:{justifyContent:"space-between",marginBottom:"10px"},children:[Object(p.jsxs)(o.a,{onClick:function(){var e={Sheets:{data:b.a.json_to_sheet(n)},SheetNames:["data"]},t=b.b(e,{bookType:"xlsx",type:"array"}),a=new Date,c=a.getDay()+"/"+(a.getMonth()+1)+"/"+a.getFullYear(),r=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});Object(f.saveAs)(r,"Proyeccion Instalada-".concat(c)+".xlsx")},style:{backgroundColor:"#484d55",color:"#FFF"},children:[Object(p.jsx)(i.a,{}),"Descargar Excel"]}),Object(p.jsxs)(o.a,{onClick:k,children:[Object(p.jsx)(u.a,{}),"Actualizar"]})]})})}),Object(p.jsx)(s.a,{style:{zIndex:2},children:Object(p.jsx)(l.a,{columns:C,loading:O,dataSource:n,scroll:{x:1300}})})]})}}}]);
//# sourceMappingURL=18.561fe79c.chunk.js.map