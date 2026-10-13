import {lazy,Suspense} from 'react'
import {HashRouter,NavLink,Navigate,Route,Routes} from 'react-router-dom'
import OverviewPage from './pages/OverviewPage'
import DinosaursPage from './pages/DinosaursPage'
import HabitatsPage from './pages/HabitatsPage'
const ParkPage=lazy(()=>import('./pages/ParkPage'))
const nav=[['overview','Overview'],['park','Park Explorer'],['dinosaurs','Dinosaurs'],['habitats','Habitats']]
export default function App(){return <HashRouter><div className="shell">
<nav className="side" aria-label="Main"><div className="brand">DinoVerse 3D</div>{nav.map(([p,l])=><NavLink key={p} to={`/${p}`} className="navlink">{l}</NavLink>)}<div className="status tiny">● Park operational (simulated)</div></nav>
<main><Suspense fallback={<div className="p-4">Loading…</div>}><Routes><Route path="/overview" element={<OverviewPage/>}/><Route path="/park" element={<ParkPage/>}/><Route path="/dinosaurs" element={<DinosaursPage/>}/><Route path="/habitats" element={<HabitatsPage/>}/><Route path="*" element={<Navigate to="/overview" replace/>}/></Routes></Suspense></main></div></HashRouter>}
