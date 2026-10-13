import {Bar,BarChart,CartesianGrid,ResponsiveContainer,Tooltip,XAxis,YAxis} from 'recharts'
import {HABITATS,DINOS,SPECIES} from '../data'
const wk=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i)=>({d,visitors:[920,1010,980,1120,1284,1760,1590][i]}))
const pop=HABITATS.map(h=>({n:h.name.split(' ')[1]??h.name,dinos:DINOS.filter(d=>d.habitat===h.id).length}))
const stats=[['Dinosaurs',String(DINOS.length)],['Species',String(SPECIES.length)],['Active habitats',String(HABITATS.length)],['Visitors today','1,284'],['Safari tours','12'],['Park safety','Operational']]
export default function OverviewPage(){return <div>
<p className="small text-muted-2">All figures are simulated demonstration data.</p>
<div className="row g-3 mb-3">{stats.map(([k,v])=><div key={k} className="col-6 col-lg-2"><div className="glass p-3 h-100"><div className="tiny">{k}</div><div className="h4 mb-0">{v}</div></div></div>)}</div>
<div className="row g-3"><div className="col-12 col-lg-7"><div className="glass p-3"><h2 className="h6">Visitors this week</h2><div style={{height:260}}><ResponsiveContainer><BarChart data={wk}><CartesianGrid stroke="#244B32"/><XAxis dataKey="d" stroke="#A9B5A9"/><YAxis stroke="#A9B5A9"/><Tooltip contentStyle={{background:'#18251D',border:'1px solid #244B32'}}/><Bar dataKey="visitors" fill="#65D889"/></BarChart></ResponsiveContainer></div></div></div>
<div className="col-12 col-lg-5"><div className="glass p-3"><h2 className="h6">Dinosaurs per habitat</h2><div style={{height:260}}><ResponsiveContainer><BarChart data={pop}><CartesianGrid stroke="#244B32"/><XAxis dataKey="n" stroke="#A9B5A9"/><YAxis allowDecimals={false} stroke="#A9B5A9"/><Tooltip contentStyle={{background:'#18251D',border:'1px solid #244B32'}}/><Bar dataKey="dinos" fill="#D9B56D"/></BarChart></ResponsiveContainer></div></div></div></div></div>}
