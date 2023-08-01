import{R as o,t as p,o as e,q as m,L as b,N as y,A as S,w as T,z as F}from"./index-92835960.js";import{u as I}from"./useIntersectionObserver-cb1ae34f.js";import{c as f,d as h,e as j,f as g,h as M}from"./tmdb-4d70d306.js";const $=({allowsSavingKeyword:t,history:s,recommendItems:c,onSubmit:l,onToggleSaving:n})=>{const d=t&&s.length!==0,x=t&&s.length===0,v=p.useCallback(r=>`${(new Date(r).getUTCMonth()+1).toString().padStart(2,"0")}. ${new Date(r).getUTCDate().toString().padStart(2,"0")}.`,[]);return e.jsxs(m.div,{children:[d&&e.jsxs("div",{children:[e.jsx("p",{className:"text-[3.33vw]",children:"최근 검색한 키워드"}),e.jsx("ul",{children:s.map(({keyword:r,date:a},w)=>e.jsxs(m.li,{whileTap:{scale:.9},className:"flex flex-row place-content-center place-items-center gap-[2.22vw] px-[4.44vw] py-[3.33vw]",onClick:()=>l(r),children:[e.jsx(b,{width:"4.88",height:"4.88"}),e.jsx("p",{className:"flex-1 text-[4.44vw] font-medium",children:r}),e.jsx("p",{className:"text-[3.33vw]",children:v(a)})]},w))})]}),!d&&e.jsxs("div",{className:"flex h-[41.66vw] w-full flex-col place-content-center place-items-center rounded-[1.11vw] border border-[#F5F5F5]",children:[e.jsxs("p",{className:" text-[3.88vw] font-light text-[#999]",children:[x&&"최근 검색한 내역이 없습니다.",!t&&"검색어 저장 기능이 꺼져 있습니다."]}),e.jsxs("div",{className:" text-[3.33vw] font-light text-[#999]",children:[e.jsx("span",{children:"추천 키워드: "}),c.map((r,a)=>e.jsxs(o.Fragment,{children:[!!a&&", ",e.jsx(y,{className:"text-[#51AFE3] underline",to:`/${r.type}/${r.id}`,children:r.name})]},a))]})]}),e.jsx("p",{onClick:()=>n(),children:t?"자동저장 끄기":"자동저장 켜기"})]})},C=o.memo($),D=({src:t})=>{const s=p.useRef(null),[c,l]=I(p.useCallback(()=>{d(!0),l(s.current)},[])),[n,d]=p.useState(!1);return p.useEffect(()=>{c(s.current)},[]),e.jsx("div",{ref:s,children:n&&e.jsx("img",{src:t,loading:"lazy"})})},E=o.memo(D),O=o.memo(({children:t})=>e.jsx("mark",{className:"bg-transparent text-[#939600]",children:t})),R=({thumbnail:t,title:s,descriptions:c,additionalElement:l=null,highlightKeyword:n=""})=>e.jsxs("div",{className:" flex w-full flex-row items-center space-x-[2.77vw]",children:[e.jsx("div",{className:"aspect-square w-[8.88vw] overflow-hidden rounded-full bg-gray-500 object-cover",children:t&&e.jsx(E,{src:t})}),e.jsxs("div",{className:"flex-1 space-y-[1.11vw]",children:[e.jsx("p",{className:"line-clamp-1 text-[4.44vw] font-medium leading-none",children:n?e.jsx(e.Fragment,{children:s.indexOf(n)>=0?e.jsxs(e.Fragment,{children:[s.substring(0,s.indexOf(n)),e.jsx(O,{children:n}),s.substring(s.indexOf(n)+n.length)]}):s}):s}),e.jsx(S,{textList:c})]}),l]}),u=o.memo(R,(t,s)=>t.title===s.title&&t.highlightKeyword===s.highlightKeyword),k=o.memo(({type:t="default",contentType:s,id:c,thumbnail:l,title:n,descriptions:d,additionalElement:x,highlightKeyword:v="",groupChildren:r})=>{const a=T(),w=e.jsx(m.div,{"data-item-id":c,whileTap:{scale:.9},className:"rounded-[1.11vw] border-[0.27vw] border-[#F5F5F5] p-[3.33vw]",onTap:()=>a(`/${s}/${c}`),children:e.jsx(u,{thumbnail:l,title:n,highlightKeyword:v,descriptions:d,additionalElement:x})}),N=e.jsxs(m.div,{className:" rounded-[1.11vw] border-[0.27vw] border-[#F5F5F5] py-[3.33vw]",children:[e.jsx(m.div,{"data-item-id":c,whileTap:{scale:.9},className:" mx-[3.33vw] mb-[2.77vw] flex flex-row items-center space-x-[2.77vw]",onTap:()=>a(`/person/${c}`),children:e.jsx(u,{thumbnail:l,title:n,highlightKeyword:v,descriptions:d,additionalElement:x})}),e.jsx("div",{className:" bg-[#f5f5f5] py-[2.22vw]",children:r&&r.map(i=>e.jsx(m.div,{"data-item-id":i.id,whileTap:{scale:.9},className:" mx-[3.33vw] flex flex-row items-center space-x-[2.77vw] py-[2.22vw]",onTap:()=>a(`/${i.media_type}/${i.id}`),children:e.jsx(u,{thumbnail:f(i),title:h(i),descriptions:j(i),additionalElement:g(i)})},i.id))})]});return t==="default"?w:N}),H=o.memo(k,(t,s)=>t.id===s.id&&t.highlightKeyword===s.highlightKeyword),L=({suggestions:t,keyword:s,allowsSavingKeyword:c,keywordHisory:l,isSuccess:n,onSubmit:d,onToggleSaving:x})=>{const v=s===""&&t.length===0,r=n&&s!==""&&t.length===0;return e.jsxs(m.div,{...F,className:"mt-[3.33vw] select-none space-y-[3.33vw]",children:[v&&e.jsx(C,{allowsSavingKeyword:c,history:l,recommendItems:[{type:"tv",id:123,name:"허허"},{type:"tv",id:123,name:"허허"}],onSubmit:d,onToggleSaving:x},"savedkeywordcard"),r&&e.jsxs("span",{children:[e.jsx("strong",{children:s}),"에 대한 검색결과가 존재하지 않아요😢"]}),t.map(a=>e.jsx(H,{id:a.id,type:M(a),contentType:a.media_type,thumbnail:f(a),title:h(a),highlightKeyword:s,descriptions:j(a),additionalElement:g(a),groupChildren:a.known_for},a.id))]})},_=o.memo(L);export{_ as default};
