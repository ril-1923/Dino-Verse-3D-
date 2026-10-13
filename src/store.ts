import {create} from 'zustand'
import {persist} from 'zustand/middleware'
type Cmd={k:string;n:number}|null
type Tog='grid'|'labels'|'trees'|'dinos'|'night'
type S={selected:string|null;cmd:Cmd;grid:boolean;labels:boolean;trees:boolean;dinos:boolean;night:boolean;hab:Record<string,{temp?:number;status?:string}>
select:(id:string|null)=>void;toggle:(k:Tog)=>void;run:(k:string)=>void;setHab:(id:string,p:{temp?:number;status?:string})=>void;resetHab:()=>void}
export const reg:Record<string,{x:number;z:number;act:string}>={}
const storage={getItem:(n:string)=>{try{return JSON.parse(localStorage.getItem(n)||'null')}catch{return null}},setItem:(n:string,v:unknown)=>{try{localStorage.setItem(n,JSON.stringify(v))}catch{/* ignore */}},removeItem:(n:string)=>{try{localStorage.removeItem(n)}catch{/* ignore */}}}
export const useStore=create<S>()(persist((set)=>({selected:null,cmd:null,grid:false,labels:true,trees:true,dinos:true,night:false,hab:{},
select:id=>set({selected:id}),toggle:k=>set(s=>({[k]:!s[k]} as Partial<S>)),run:k=>set({cmd:{k,n:Date.now()}}),
setHab:(id,p)=>set(s=>({hab:{...s.hab,[id]:{...s.hab[id],...p}}})),resetHab:()=>set({hab:{}})}),
{name:'dinoverse-prefs',storage:storage as never,partialize:s=>({grid:s.grid,labels:s.labels,trees:s.trees,dinos:s.dinos,night:s.night,hab:s.hab})}))
