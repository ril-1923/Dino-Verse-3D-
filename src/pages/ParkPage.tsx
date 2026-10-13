import {useEffect,useState} from 'react'
import ParkScene,{hasWebGL} from '../scene/ParkScene'
import {DINOS,SPECIES,HABITATS} from '../data'
import {useStore,reg} from '../store'
function Detail(){
const id=useStore(s=>s.selected),select=useStore(s=>s.select),run=useStore(s=>s.run),[act,setAct]=useState('')
useEffect(()=>{if(!id)return;const t=setInterval(()=>setAct(reg[id]?.act??''),600);return()=>clearInterval(t)},[id])
const d=DINOS.find(x=>x.id===id);if(!d)return null
const sp=SPECIES.find(s=>s.id===d.sp)!,h=HABITATS.find(x=>x.id===d.habitat)!
return <aside className="detail glass" aria-label="Dinosaur details"><button className="btn-close btn-close-white float-end" aria-label="Close details" onClick={()=>select(null)}/>
<h2 className="h5">{d.name}</h2><p className="text-muted-2 mb-2">{sp.name}</p>
<dl className="small mb-2">{([['Habitat',h.name],['Diet',sp.diet],['Period',sp.period],['Length',`≈ ${sp.length} m`],['Weight',`≈ ${sp.weight}`],['Health',`${d.health==='Healthy'?'✓':'●'} ${d.health}`],['Activity',act||'Resting']] as string[][]).map(([k,v])=><div key={k} className="d-flex justify-content-between"><dt>{k}</dt><dd className="mb-0">{v}</dd></div>)}</dl>
<div className="d-flex gap-2"><button className="btn btn-success btn-sm" onClick={()=>run('focus')}>Focus camera</button><button className="btn btn-outline-light btn-sm" onClick={()=>{select(null);run('reset')}}>Full park view</button></div>
<p className="tiny mt-2 mb-0">Illustrative educational data.</p></aside>}
export default function ParkPage(){
const s=useStore(),run=s.run
if(!hasWebGL())return <div className="glass p-4"><h2 className="h5">WebGL is unavailable</h2><p className="mb-0">The 3D park needs WebGL. Enable hardware acceleration or try a different browser.</p></div>
const B=({k,l}:{k:string;l:string})=><button className="btn btn-sm btn-outline-light" onClick={()=>run(k)}>{l}</button>
const T=({k,l}:{k:'grid'|'labels'|'trees'|'dinos'|'night';l:string})=><button className={`btn btn-sm ${s[k]?'btn-success':'btn-outline-light'}`} aria-pressed={s[k]} onClick={()=>s.toggle(k)}>{l}</button>
return <div className="park"><ParkScene/>
<div className="toolbar glass"><B k="reset" l="Reset"/><B k="top" l="Top"/><B k="iso" l="Isometric"/><B k="in" l="Zoom +"/><B k="out" l="Zoom −"/><B k="focus" l="Focus selected"/>
<T k="grid" l="Grid"/><T k="labels" l="Labels"/><T k="trees" l="Vegetation"/><T k="dinos" l="Dinosaurs"/><T k="night" l="Night"/></div>
<div className="legend tiny glass">Drag: orbit · Wheel/pinch: zoom · Right-drag: pan · Click a dinosaur</div><Detail/></div>}
