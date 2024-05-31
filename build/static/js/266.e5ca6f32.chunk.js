"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[266],{3266:(a,e,r)=>{r.r(e),r.d(e,{default:()=>y});var t=r(7689),n=r(1087),s=r(2791),c=r(2675),o=r(4373),i=r(5868),l=r(9434),d=r(184);const y=()=>{const a=(0,l.I0)(),e=(0,t.s0)(),[r,y]=(0,s.useState)(""),[u,m]=(0,s.useState)(""),[p,h]=(0,s.useState)(!1),w=(0,l.v9)((a=>{var e;return null===(e=a.admin)||void 0===e?void 0:e.signInError}));return(0,d.jsx)("div",{className:"flex justify-center items-center h-screen",children:(0,d.jsx)("div",{className:"w-full max-w-sm mx-auto overflow-hidden bg-white rounded-md shadow-md",children:(0,d.jsxs)("div",{className:"px-6 py-4",children:[(0,d.jsx)("div",{className:"flex justify-center mx-auto"}),(0,d.jsx)("p",{className:"mt-1 text-center text-gray-500",children:"Sign in as admin"}),(0,d.jsxs)("form",{children:[(0,d.jsx)("div",{className:"w-full mt-4",children:(0,d.jsx)("input",{onChange:a=>{y(a.target.value)},className:"block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md  focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300",type:"text",placeholder:"Username","aria-label":"Username"})}),(0,d.jsx)("div",{className:"w-full mt-4",children:(0,d.jsx)("input",{onChange:a=>{m(a.target.value)},className:"block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md  focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300",type:"password",placeholder:"Password","aria-label":"Password"})}),w&&(0,d.jsx)("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mt-4 flex items-center justify-between",children:(0,d.jsx)("span",{className:"block sm:inline",children:w})}),(0,d.jsxs)("div",{className:"flex items-center justify-between mt-4",children:[(0,d.jsxs)(n.rU,{to:"/",children:[(0,d.jsx)(o.PjY,{className:"inline-block w-4 h-4 mr-2"}),"Back to home"]}),(0,d.jsx)("button",{disabled:p,type:"submit",onClick:t=>(t=>{h(!0),t.preventDefault();const n={username:r,password:u};a((0,i.vT)(n)).then((()=>{h(!1),e("/admin")}))})(t),className:"px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50",children:p?(0,d.jsx)(c.Z,{loadingText:"Signing in..."}):"Sign in"})]})]})]})})})}},5868:(a,e,r)=>{r.d(e,{_d:()=>p,Kl:()=>i,q1:()=>y,wD:()=>u,HQ:()=>o,Ch:()=>m,Zh:()=>l,Cd:()=>c,nB:()=>h,vT:()=>s,Ej:()=>d});var t=r(7630);var n=r(3679);const s=a=>async e=>{try{const{error:r,data:s}=await(async a=>{try{return{error:null,data:(await t.c2.post("/signin",a)).data}}catch(r){return(0,t.zG)(r)}})(a);if(r)throw new Error(r);localStorage.setItem("admin",JSON.stringify(s)),e({type:n.x6})}catch(r){e({type:n.X4,payload:r.message})}},c=()=>async a=>{try{localStorage.removeItem("admin"),a({type:n.$x})}catch(e){}},o=()=>async a=>{try{const{error:e,data:r}=await(async()=>{try{return{error:null,data:(await t.c2.get("/logs")).data}}catch(e){return(0,t.zG)(e)}})();if(e)throw new Error(e);a({type:n.Ao,payload:r})}catch(e){a({type:n.zJ,payload:e.message})}},i=()=>async a=>{try{const{error:e}=await(async()=>{try{await t.c2.delete("/logs")}catch(e){return(0,t.zG)(e)}})();if(e)throw new Error(e);a({type:n.vL})}catch(e){a({type:n.pl,payload:e.message})}},l=()=>async a=>{try{const{error:e,data:r}=await(async()=>{try{return{error:null,data:(await t.c2.get("/preferences")).data}}catch(e){return(0,t.zG)(e)}})();if(e)throw new Error(e);a({type:n.uf,payload:r})}catch(e){a({type:n.wO,payload:e.message})}},d=a=>async e=>{try{const{error:r}=await(async a=>{try{await t.c2.put("/preferences",a)}catch(r){return(0,t.zG)(r)}})(a);if(r)throw new Error(r);e({type:n.Gj})}catch(r){e({type:n.n0,payload:r.message})}},y=()=>async a=>{try{const{error:e,data:r}=await(async()=>{try{return{error:null,data:(await t.c2.get("/communities")).data}}catch(e){return(0,t.zG)(e)}})();if(e)throw new Error(e);a({type:n.U_,payload:r})}catch(e){a({type:n.VO,payload:e.message})}},u=a=>async e=>{try{const{error:r,data:s}=await(async a=>{try{return{error:null,data:(await t.c2.get("/community/".concat(a))).data}}catch(r){return(0,t.zG)(r)}})(a);if(r)throw new Error(r);e({type:n.n3,payload:s})}catch(r){e({type:n.F7,payload:r.message})}},m=()=>async a=>{try{const{error:e,data:r}=await(async()=>{try{return{error:null,data:(await t.c2.get("/moderators")).data}}catch(e){return(0,t.zG)(e)}})();if(e)throw new Error(e);a({type:n.j8,payload:r})}catch(e){a({type:n.rf,payload:e.message})}},p=(a,e)=>async r=>{try{const{error:s}=await(async(a,e)=>{try{await t.c2.patch("/add-moderators",null,{params:{communityId:a,moderatorId:e}})}catch(s){return(0,t.zG)(s)}})(a,e);if(s)throw new Error(s);r({type:n.oK})}catch(s){r({type:n.vS,payload:s.message})}},h=(a,e)=>async r=>{try{const{error:s}=await(async(a,e)=>{try{await t.c2.patch("/remove-moderators",null,{params:{communityId:a,moderatorId:e}})}catch(s){return(0,t.zG)(s)}})(a,e);if(s)throw new Error(s);r({type:n.rC})}catch(s){r({type:n.L$,payload:s.message})}}}}]);
//# sourceMappingURL=266.e5ca6f32.chunk.js.map