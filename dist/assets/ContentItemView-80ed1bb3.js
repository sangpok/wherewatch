import{R as w,t as F,o as e,N as P,M as $,w as V,x as E,y as S,q as R,z as _,E as k,B as O,I as W,F as Y}from"./index-92835960.js";import{u as G,_ as U,a as q,B as z,C as Q,P as i}from"./ContentItemView.styled-e49dd5a5.js";import{g as H,a as J,b as X}from"./tmdb-4d70d306.js";const Z=s=>({flatrate:"요금제",rent:"대여",buy:"구매",free:"무료"})[s],ee=({tabs:s,contents:n})=>{const[c,o]=F.useState(0);return e.jsxs("div",{className:"flex w-full flex-col",children:[e.jsx("div",{className:"flex w-fit select-none flex-row rounded-[1.11vw] border-[0.27vw]  border-[#F5F5F5]",children:s.map((l,r)=>e.jsx("div",{className:`px-[4.44vw] py-[3.33vw] text-[4.44vw] ${r===c?"bg-[#F5F5F5] font-semibold":"font-medium"}`,onClick:()=>o(r),children:Z(l)},r))}),e.jsx("div",{className:"flex w-full flex-col rounded-[1.11vw] border-[0.27vw] border-[#F5F5F5] p-[4.44vw]",children:n.length!==0&&n[c].map(({icon:l,name:r},d)=>e.jsxs("div",{className:"flex flex-row items-center gap-[3.33vw] py-[1.11vw] ",children:[e.jsx("img",{className:"rounded-full",src:`http://image.tmdb.org/t/p/w45${l}`}),e.jsx("p",{className:" font-medium",children:r})]},d))})]})},te=w.memo(ee),L=W,se=w.memo(({smallType:s,onClick:n})=>e.jsx(P,{to:"/",onClick:n,children:e.jsx($,{smallType:s,fill:"white"})}),(s,n)=>s.smallType===n.smallType),ae=({type:s})=>{const n=V(),c=G(),{id:o}=E(),{isLoading:l,data:r}=S(["detail",o],()=>Y(s,o)),d=F.useCallback(()=>n("/"),[]);if(l)return e.jsx(R.div,{..._,className:"mt-[4.44vw] flex w-full items-center justify-center",children:e.jsx(U,{})});if(!r)return;const{backdrop_path:f,poster_path:h,title:I,name:M,release_dates:g,content_ratings:j,overview:b,tagline:N,credits:T,videos:A}=r,{cast:m,crew:u}=T,B=(()=>{if(s==="movie"){if(!g)return"ALL";const t=g.results.find(({iso_3166_1:a})=>a==="KR");return t?t.release_dates[0].certification:"ALL"}if(s==="tv"){if(!j)return"ALL";const t=j.results.find(({iso_3166_1:a})=>a==="KR");return t?t.rating:"ALL"}})(),D=(()=>f?L+f:h?L+h:null)(),p=(()=>A.results.find(({iso_3166_1:a,site:v})=>a==="KR"&&v==="YouTube"))(),x=(()=>H(r))(),K=(()=>{if(s==="tv")return J(r);if(s==="movie")return X(r)})(),y=(t,a,v)=>{const{id:C}=a;return e.jsx(O,{mediaType:"person",contentDetail:a,onTap:()=>n(`/person/${C}`),cardType:"small"},`${t}-${C}-${v}`)};return e.jsxs(R.div,{..._,className:"mb-[8.88vw]",children:[e.jsx(q,{src:D,children:e.jsxs("div",{className:"absolute left-[3.33vw] top-[6.66vw] flex flex-row place-content-center place-items-center gap-[1.11vw] ",children:[e.jsx(z,{onClick:c}),e.jsx(se,{smallType:!1,onClick:d})]})}),e.jsxs("div",{className:"mx-[2.22vw]  translate-y-[-4.16vw] space-y-[8.88vw]",children:[e.jsx(Q,{title:I||M,watchingRate:B,descriptions:K}),e.jsx(i,{title:"제공하는 플랫폼",children:x.length===0?e.jsx("p",{className:"text-[4.44vw]",children:"한국에 제공하는 플랫폼이 존재하지 않습니다😢"}):e.jsx(te,{tabs:x.map(({type:t})=>t),contents:x.map(({providers:t})=>t)})}),e.jsx(i,{title:"작품 정보",children:e.jsxs("p",{className:"text-[4.44vw]",children:[b===""&&"작품 정보가 존재하지 않습니다😢",b]})}),N&&e.jsx(i,{title:"태그 라인",children:e.jsx("p",{className:"text-[4.44vw]",children:N})}),p&&e.jsx(i,{title:"동영상",children:e.jsx("iframe",{className:" aspect-video w-full rounded-[1.11vw]",src:`https://www.youtube.com/embed/${p.key}`,title:p.name,allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"})}),e.jsxs(i,{title:"출연진",children:[m.length===0&&e.jsx("p",{className:"text-[4.44vw]",children:"출연진 정보가 존재하지 않습니다😢"}),m.length!==0&&e.jsx(k,{gapType:"large",children:m.map((t,a)=>y("cast",t,a))})]}),e.jsxs(i,{title:"제작진",children:[u.length===0&&e.jsx("p",{className:"text-[4.44vw]",children:"제작진 정보가 존재하지 않습니다😢"}),u.length!==0&&e.jsx(k,{gapType:"large",children:u.map((t,a)=>y("crew",t,a))})]})]})]})},le=w.memo(ae);export{le as default};