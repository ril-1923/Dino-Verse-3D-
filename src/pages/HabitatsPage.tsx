import {useState} from 'react'
import {HABITATS,DINOS,STATUSES} from '../data'
import {useStore} from '../store'
export default function HabitatsPage(){
const {hab,setHab,resetHab}=useStore(),[f,setF]=useState('All'),[msg,setMsg]=useState(''),[err,setErr]=useState<Record<string,string>>({})
const eff=HABITATS.map(h=>({...h,temp:hab[h.id]?.temp??h.temp,status:hab[h.id]?.status??h.status}))
const save=(id:string,v:string)=>{const n=Number(v);if(v===''||!Number.isFinite(n)||n<10||n>45){setErr({...err,[id]:'Enter a temperature from 10 to 45 °C.'});return}
setErr({...err,[id]:''});setHab(id,{temp:n});setMsg('Simulated setting saved.')}
return <div><p className="small text-muted-2">These controls change simulated demo values only. They do not control real environments.</p>
<div className="d-flex flex-wrap gap-2 mb-3">{['All',...STATUSES].map(s=><button key={s} className={`btn btn-sm ${f===s?'btn-success':'btn-outline-light'}`} onClick={()=>setF(s)}>{s}</button>)}
<button className="btn btn-sm btn-outline-danger ms-auto" onClick={()=>{if(window.confirm('Reset all habitat settings to defaults?')){resetHab();setMsg('Habitat settings reset.')}}}>Reset habitats</button></div>
{msg&&<div className="alert alert-success py-2" role="status">{msg}</div>}
<div className="row g-3">{eff.filter(h=>f==='All'||h.status===f).map(h=><div key={h.id} className="col-12 col-md-6 col-xl-4"><article className="glass p-3 h-100">
<h2 className="h6">{h.name}</h2><p className="small mb-2">Population {DINOS.filter(d=>d.habitat===h.id).length}/{h.cap} · {h.temp} °C · Water: {h.water?'Available':'None'} · Vegetation: {h.veg}</p>
<span className={`badge ${h.status==='Operational'?'text-bg-success':h.status==='Needs attention'?'text-bg-warning':'text-bg-secondary'}`}>{h.status==='Operational'?'✓':h.status==='Needs attention'?'!':'⚙'} {h.status}</span>
<div className="row g-2 mt-2"><div className="col-6"><label className="tiny" htmlFor={`t${h.id}`}>Target temperature (°C)</label><input id={`t${h.id}`} type="number" className={`form-control form-control-sm ${err[h.id]?'is-invalid':''}`} defaultValue={h.temp} onBlur={e=>save(h.id,e.target.value)}/><div className="invalid-feedback">{err[h.id]}</div></div>
<div className="col-6"><label className="tiny" htmlFor={`s${h.id}`}>Status</label><select id={`s${h.id}`} className="form-select form-select-sm" value={h.status} onChange={e=>{setHab(h.id,{status:e.target.value});setMsg('Simulated setting saved.')}}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></div></div></article></div>)}</div></div>}
