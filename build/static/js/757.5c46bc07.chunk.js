"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[757],{9757:(e,s,t)=>{t.r(s),t.d(s,{default:()=>w});var r=t(2791),n=t(9434),a=t(7689),l=t(1585),i=t(1535),d=t(71),o=t(184);const c=e=>{let{reportedPost:s}=e;const t=(0,a.s0)(),{post:r,reportedBy:n,reportReason:l,reportDate:i}=s,{communityName:c}=(0,a.UO)(),m=null===r||void 0===r?void 0:r._id;return(0,o.jsx)("div",{className:"flex items-center gap-4 cursor-pointer p-3",onClick:()=>{t("/community/".concat(c,"/reported-post"),{state:{postId:m}})},children:(0,o.jsxs)("div",{className:"flex flex-col",children:[(0,o.jsxs)("div",{className:"flex",children:[n.slice(0,3).map((e=>(0,o.jsx)("img",{className:"w-8 rounded-full border-2 border-white flex-shrink-0",src:e.avatar,alt:"user avatar"},e._id))),n.length>3&&(0,o.jsx)("div",{className:"w-4 h-4 rounded-full border-2 border-white flex items-center justify-center bg-gray-300",children:(0,o.jsxs)("span",{className:"text-xs font-bold text-gray-800",children:["+",n.length-3]})}),(0,o.jsxs)("div",{className:"ml-4",children:[(0,o.jsxs)("span",{className:"text-sm",children:[n[0].name," "]}),n.length>1&&(0,o.jsxs)("span",{className:"text-xs text-gray-600",children:["and ",n.length-1," others reported this"]}),(0,o.jsxs)("span",{className:"text-xs flex items-center gap-1 text-gray-600",children:[(0,o.jsx)(d.ufm,{}),i]})]})]}),(0,o.jsxs)("div",{className:"text-sm text-red-500 font-semibold mt-2",children:[(0,o.jsx)("span",{className:"font-semibold",children:"Reason:"})," ",l]})]})})},m=()=>{const e=(0,n.I0)(),{communityName:s}=(0,a.UO)();(0,r.useEffect)((()=>{e((0,i.Yb)(s))}),[e,s]);const t=(0,n.v9)((e=>{var s;return null===(s=e.community)||void 0===s?void 0:s.reportedPosts}));return t?(0,o.jsx)("div",{className:"border border-slate-200 rounded mt-1",children:0===t.length?(0,o.jsx)("p",{className:"text-center",children:"No posts to show"}):t.map((e=>(0,o.jsx)(c,{reportedPost:e},e._id)))}):(0,o.jsx)(l.Z,{})};var x=t(1087),h=t(2675);const u=e=>{let{show:s,onClose:t,userId:a,communityName:l}=e;const[d,c]=(0,r.useState)(!1),m=(0,n.I0)();return(0,o.jsx)("div",{className:"fixed z-10 inset-0 overflow-y-auto ".concat(s?"":"hidden"),children:(0,o.jsxs)("div",{className:"flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",children:[(0,o.jsx)("div",{className:"fixed inset-0 transition-opacity ".concat(s?"":"hidden"),"aria-hidden":"true",onClick:t,children:(0,o.jsx)("div",{className:"absolute inset-0 bg-gray-500 opacity-75"})}),(0,o.jsx)("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true",children:"\u200b"}),(0,o.jsxs)("div",{className:"inline-block align-bottom bg-white rounded-md px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full",role:"dialog","aria-modal":"true","aria-labelledby":"modal-headline",children:[(0,o.jsx)("div",{children:(0,o.jsxs)("div",{className:"mt-3 text-center sm:mt-5",children:[(0,o.jsx)("h3",{className:"text-lg leading-6 font-medium text-gray-900",id:"modal-headline",children:"Ban User"}),(0,o.jsx)("div",{className:"mt-2",children:(0,o.jsx)("p",{className:"text-sm text-gray-500",children:"The user will be banned from this community and will be listed in the banned users list. The user will not be able to join the community again unless the ban is lifted. Are you sure you want to ban this user?"})})]})}),(0,o.jsxs)("div",{className:"mt-5 sm:mt-6 flex justify-center space-x-2",children:[(0,o.jsx)("button",{disabled:d,onClick:t,className:"w-1/2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm",children:"Cancel"}),(0,o.jsx)("button",{disabled:d,onClick:async()=>{c(!0),await m((0,i.Th)(l,a)),await m((0,i.G7)(l)),c(!1),t()},className:"w-1/2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm",children:d?(0,o.jsx)(h.Z,{loadingText:"banning..."}):(0,o.jsx)("span",{children:"Ban User"})})]})]})]})})};var f=t(458);const b=()=>{const e=(0,n.I0)(),s=(0,a.TH)().pathname.split("/")[2]||"",[t,l]=(0,r.useState)({}),c=(e,s)=>{l((t=>({...t,[e]:s})))};(0,r.useEffect)((()=>{e((0,i.G7)(s))}),[e,s]);const m=(0,n.v9)((e=>{var s;return null===(s=e.moderation)||void 0===s?void 0:s.communityMembers}));return(0,o.jsx)("div",{className:"flex flex-col",children:(0,o.jsxs)("div",{className:"flex flex-col",children:[m&&0===m.length&&(0,o.jsx)("p",{className:"text-center text-gray-500 font-semibold",children:"No members to show"}),m&&m.map((e=>{const r=t[e._id]||!1;return(0,o.jsxs)("div",{className:"flex flex-col border border-gray-200  px-6 py-3 my-3 rounded-lg ",children:[(0,o.jsxs)("div",{className:"flex justify-between items-center",children:[(0,o.jsxs)("div",{className:"flex",children:[(0,o.jsx)("img",{src:e.avatar,alt:"profile",className:"w-16 h-16 rounded-full"}),(0,o.jsxs)("div",{className:"flex flex-col",children:[(0,o.jsx)(x.rU,{to:"/user/".concat(e._id),className:"ml-2 font-bold",children:e.name}),(0,o.jsxs)("p",{className:"ml-2 text-xs flex gap-1 items-center",children:[(0,o.jsx)(f.v2c,{}),e.location]}),(0,o.jsxs)("p",{className:"ml-2 flex gap-1 items-center text-xs",children:[(0,o.jsx)(d.ufm,{}),new Date(e.createdAt).toDateString()]})]})]}),(0,o.jsx)("button",{onClick:()=>{c(e._id,!0)},className:" bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg px-4 py-2 h-9 flex justify-center items-center text-sm",children:"Ban user"})]}),r&&(0,o.jsx)(u,{show:r,onClose:()=>{c(e._id,!1)},userId:e._id,communityName:s},e._id)]},e._id)}))]})})},p=(0,r.memo)(b),j=e=>{let{show:s,onClose:t,userId:a,communityName:l}=e;const[d,c]=(0,r.useState)(!1),m=(0,n.I0)();return(0,o.jsx)("div",{className:"fixed z-50 inset-0 overflow-y-auto ".concat(s?"":"hidden"),children:(0,o.jsxs)("div",{className:"flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",children:[(0,o.jsx)("div",{className:"fixed inset-0 transition-opacity ".concat(s?"":"hidden"),"aria-hidden":"true",onClick:t,children:(0,o.jsx)("div",{className:"absolute inset-0 bg-gray-500 opacity-75"})}),(0,o.jsx)("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true",children:"\u200b"}),(0,o.jsxs)("div",{className:"inline-block align-bottom bg-white rounded-md px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full",role:"dialog","aria-modal":"true","aria-labelledby":"modal-headline",children:[(0,o.jsx)("div",{children:(0,o.jsxs)("div",{className:"mt-3 text-center sm:mt-5",children:[(0,o.jsx)("h3",{className:"text-lg leading-6 font-medium text-gray-900",id:"modal-headline",children:"Unban User"}),(0,o.jsx)("div",{className:"mt-2",children:(0,o.jsx)("p",{className:"text-sm text-gray-500",children:"The user will be unbanned from this community and will be able to join again. Are you sure you want to unban this user?"})})]})}),(0,o.jsxs)("div",{className:"mt-5 sm:mt-6 flex justify-center space-x-2",children:[(0,o.jsx)("button",{disabled:d,onClick:t,className:"w-1/2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm",children:"Cancel"}),(0,o.jsx)("button",{disabled:d,onClick:async()=>{c(!0),await m((0,i.Fw)(l,a)),await m((0,i.G7)(l)),c(!1),t()},className:"w-1/2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm",children:d?(0,o.jsx)(h.Z,{loadingText:"unbanning..."}):(0,o.jsx)("span",{children:"Unban User"})})]})]})]})})},g=()=>{const e=(0,n.I0)(),s=(0,a.TH)().pathname.split("/")[2]||"",[t,l]=(0,r.useState)({}),c=(e,s)=>{l((t=>({...t,[e]:s})))};(0,r.useEffect)((()=>{e((0,i.G7)(s))}),[e,s]);const m=(0,n.v9)((e=>e.moderation.bannedUsers))||[];return(0,o.jsx)("div",{className:"flex flex-col",children:(0,o.jsxs)("div",{className:"flex flex-col",children:[m&&0===m.length&&(0,o.jsx)("p",{className:"text-center text-gray-500 font-semibold",children:"No banned users to show"}),m&&m.map((e=>(0,o.jsxs)("div",{className:"flex flex-col border border-gray-200  px-6 py-3 my-3 rounded-lg ",children:[(0,o.jsxs)("div",{className:"flex justify-between items-center",children:[(0,o.jsxs)("div",{className:"flex",children:[(0,o.jsx)("img",{src:e.avatar,alt:"profile",className:"w-16 h-16 rounded-full"}),(0,o.jsxs)("div",{className:"flex flex-col",children:[(0,o.jsx)(x.rU,{to:"/user/".concat(e._id),className:"ml-2 font-bold",children:e.name}),(0,o.jsxs)("p",{className:"ml-2 text-xs flex gap-1 items-center",children:[(0,o.jsx)(f.v2c,{}),e.location]}),(0,o.jsxs)("p",{className:"ml-2 text-xs flex gap-1 items-center",children:[(0,o.jsx)(d.ufm,{}),new Date(e.createdAt).toDateString()]})]})]}),(0,o.jsx)("button",{onClick:()=>{c(e._id,!0)},className:"ml-2 bg-primary hover:bg-sky-700 text-white font-bold rounded-lg px-4 py-2 h-9 flex justify-center items-center text-sm",children:"Unban user"})]}),(0,o.jsx)(j,{show:t[e._id]||!1,onClose:()=>{c(e._id,!1)},userId:e._id,communityName:s},e._id)]},e._id)))]})})},v=(0,r.memo)(g),N=()=>{const[e,s]=(0,r.useState)("Reported Posts");return(0,o.jsxs)("div",{className:"flex flex-col p-3",children:[(0,o.jsxs)("ul",{className:"flex flex-col md:flex-row border-b",children:[(0,o.jsx)("li",{className:"".concat("Reported Posts"===e?"border-blue-500 bg-primary rounded text-white":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"," flex-1 cursor-pointer text-center p-1 border-b-2 font-medium"),onClick:()=>s("Reported Posts"),children:"Reported Posts"}),(0,o.jsx)("li",{className:"".concat("Members"===e?"border-blue-500 bg-primary rounded text-white":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"," flex-1 cursor-pointer text-center p-1 border-b-2 font-medium"),onClick:()=>s("Members"),children:"Members"}),(0,o.jsx)("li",{className:"".concat("Banned Users"===e?"border-blue-500 bg-primary rounded text-white":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"," flex-1 cursor-pointer text-center p-1 border-b-2 font-medium"),onClick:()=>s("Banned Users"),children:"Banned Users"})]}),(0,o.jsxs)("div",{className:"mt-4 flex flex-col gap-4",children:["Reported Posts"===e&&(0,o.jsx)(m,{}),"Members"===e&&(0,o.jsx)(p,{}),"Banned Users"===e&&(0,o.jsx)(v,{})]})]})},y=()=>{const e=(0,n.I0)(),s=(0,a.TH)().pathname.split("/")[2];(0,r.useEffect)((()=>{e((0,i.Sh)(s))}),[e,s]);const t=(0,n.v9)((e=>{var s;return null===(s=e.moderation)||void 0===s?void 0:s.communityMods}));return(0,o.jsxs)("div",{className:"flex flex-col",children:[(0,o.jsx)("h3",{className:"text-xl font-bold",children:"Moderators"}),(0,o.jsx)("div",{className:"flex flex-col",children:t&&t.map((e=>(0,o.jsx)("div",{className:"flex items-center border border-slate-200 rounded-md my-2 px-4 py-3",children:(0,o.jsxs)(x.rU,{to:"/user/".concat(e._id),className:"flex",children:[(0,o.jsx)("img",{src:e.avatar,alt:"profile",className:"w-16 h-16 rounded-full"}),(0,o.jsxs)("div",{className:"flex flex-col",children:[(0,o.jsx)("p",{className:"ml-2 font-bold line-clamp-1",children:e.name}),(0,o.jsxs)("p",{className:"ml-2 text-xs flex gap-1 items-center",children:[(0,o.jsx)(f.v2c,{}),e.location]}),(0,o.jsxs)("p",{className:"ml-2 text-xs flex gap-1 items-center",children:[(0,o.jsx)(d.ufm,{}),new Date(e.createdAt).toDateString()]})]})]})},e._id)))})]})},w=()=>{const e=(0,a.s0)(),s=(0,n.v9)((e=>{var s,t;return null===(s=e.auth)||void 0===s||null===(t=s.userData)||void 0===t?void 0:t.role}));return(0,r.useEffect)((()=>{"moderator"!==s&&e("/access-denied")}),[s,e]),"moderator"!==s?(0,o.jsx)("div",{className:"col-span-3 flex h-screen items-center justify-center",children:(0,o.jsx)(l.Z,{})}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:"main-section rounded border bg-white",children:(0,o.jsx)(N,{})}),(0,o.jsx)("div",{className:"h-screen-20 sticky top-20 col-span-1 rounded border bg-white p-5",children:(0,o.jsx)(y,{})})]})}}}]);
//# sourceMappingURL=757.5c46bc07.chunk.js.map