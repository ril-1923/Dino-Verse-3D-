import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {SPECIES,DINOS,HABITATS} from '../data'
import {useStore} from '../store'
export default function DinosaursPage(){
const [q,setQ]=useState(''),[diet,setDiet]=useState(''),[hab,setHab]=useState(''),[per,setPer]=useState(''),[sort,setSort]=useState('name'),[list,setList]=useState(false)
const nav=useNavigate(),{select,run}=useStore()
const rows=SPECIES.filter(s=>s.name.toLowerCase().includes(q.toLowerCase())&&(!diet||s.diet===diet)&&(!hab||s.habitat===hab)&&(!per||s.period===per)).sort((a,b)=>sort==='name'?a.name.localeCompare(b.name):b.length-a.length)
const locate=(id:string)=>{const d=DINOS.find(x=>x.sp===id);if(!d)return;select(d.id);nav('/park');setTimeout(()=>run('focus'),900)}
const periods=[...new Set(SPECIES.map(s=>s.period))]
return <div><div className="row g-2 mb-3">
<div className="col-12 col-md"><label className="visually-hidden" htmlFor="q">Search</label><input id="q" className="form-control" placeholder="Search dinosaurs" value={q} onChange={e=>setQ(e.target.value)}/></div>
<div className="col-6 col-md-2"><select aria-label="Diet" className="form-select" value={diet} onChange={e=>setDiet(e.target.value)}><option value="">All diets</option><option>Carnivore</option><option>Herbivore</option></select></div>
<div className="col-6 col-md-2"><select aria-label="Habitat" className="form-select" value={hab} onChange={e=>setHab(e.target.value)}><option value="">All habitats</option>{HABITATS.map(h=><option key={h.id} value={h.id}>{h.name}</option>)}</select></div>
<div className="col-6 col-md-2"><select aria-label="Period" className="form-select" value={per} onChange={e=>setPer(e.target.value)}><option value="">All periods</option>{periods.map(p=><option key={p}>{p}</option>)}</select></div>
<div className="col-6 col-md-2"><select aria-label="Sort" className="form-select" value={sort} onChange={e=>setSort(e.target.value)}><option value="name">A–Z</option><option value="size">Largest first</option></select></div>
<div className="col-auto"><button className="btn btn-outline-light" onClick={()=>setList(!list)}>{list?'Grid view':'List view'}</button></div></div>
{rows.length===0&&<div className="glass p-4 text-center">No dinosaurs match these filters. Clear a filter to see more.</div>}
<div className="row g-3">{rows.map(s=><div key={s.id} className={list?'col-12':'col-12 col-sm-6 col-xl-3'}><article className="glass p-3 h-100">
<div className="swatch" style={{background:s.color}} aria-hidden/><h2 className="h6 mt-2 mb-0">{s.name}</h2><p className="tiny fst-italic">{s.sci}</p>
<p className="small mb-2">{s.desc}</p><p className="tiny mb-2">{s.diet} · {s.period} · ≈{s.length} m · {HABITATS.find(h=>h.id===s.habitat)?.name}</p>
<span className="badge text-bg-success me-2">✓ {DINOS.filter(d=>d.sp===s.id).length} in park</span>
<button className="btn btn-sm btn-outline-success mt-1" onClick={()=>locate(s.id)}>Locate in park</button></article></div>)}</div></div>}
