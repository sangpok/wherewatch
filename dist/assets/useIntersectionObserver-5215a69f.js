import{t as r}from"./index-6a1d5655.js";function b(t){const s=r.useRef(new IntersectionObserver(e=>{e.forEach(c=>{c.isIntersecting&&t()})},{threshold:.1})),n=r.useCallback(e=>{s.current.observe(e)},[]),o=r.useCallback(e=>{s.current.unobserve(e)},[]);return[n,o]}export{b as u};