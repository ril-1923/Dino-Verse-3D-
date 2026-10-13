import {useEffect,useLayoutEffect,useMemo,useRef,useState} from 'react'
import {Canvas,useThree} from '@react-three/fiber'
import {OrbitControls,Html,Stars} from '@react-three/drei'
import * as THREE from 'three'
import {DINOS,HABITATS,SPECIES,type Habitat} from '../data'
import {useStore,reg} from '../store'
import {Dino} from './Dino'
const Plane=({w,d,x=0,z=0,c}:{w:number;d:number;x?:number;z?:number;c:string})=><mesh rotation-x={-Math.PI/2} position={[x,.03,z]}><planeGeometry args={[w,d]}/><meshStandardMaterial color={c}/></mesh>
function Zone({h}:{h:Habitat}){
const labels=useStore(s=>s.labels)
const rocks=h.id==='fossil'||h.id==='valley'||h.id==='wetlands'?[]:[[11,-4,1.2],[-12,6,1.6],[5,13,1],[-6,-12,1.4]]
return <group position={[h.pos[0],0,h.pos[1]]}>
<mesh rotation-x={-Math.PI/2} position-y={.02}><circleGeometry args={[15,48]}/><meshStandardMaterial color={h.color}/></mesh>
{h.water&&<mesh rotation-x={-Math.PI/2} position={[10,.06,10]}><circleGeometry args={[h.id==='river'?5:3.4,24]}/><meshStandardMaterial color={h.water} transparent opacity={.85}/></mesh>}
{h.id==='raptor'&&[.6,1.3].map(y=><mesh key={y} rotation-x={-Math.PI/2} position-y={y}><torusGeometry args={[14.6,.08,6,64]}/><meshStandardMaterial color="#c9b27a"/></mesh>)}
{rocks.map((r,i)=><mesh key={i} position={[r[0],r[2]*.5,r[1]]}><dodecahedronGeometry args={[r[2],0]}/><meshStandardMaterial color="#777" flatShading/></mesh>)}
{h.id==='fossil'&&<>{[[-6,-6],[6,-6]].map((p,i)=><mesh key={i} position={[p[0],2,p[1]]}><boxGeometry args={[5,4,4]}/><meshStandardMaterial color="#c8c2b0"/></mesh>)}
{[-3,-1.5,0,1.5,3].map(x=><mesh key={x} position={[x,0,5]}><torusGeometry args={[1.4,.14,6,12,Math.PI]}/><meshStandardMaterial color="#efe6cf"/></mesh>)}
<mesh position={[0,1,9]}><boxGeometry args={[3,1.2,.2]}/><meshStandardMaterial color="#D9B56D"/></mesh></>}
{labels&&<Html position={[0,7,0]} center distanceFactor={45}><div className="zone-label">{h.name}</div></Html>}</group>}
function Trees(){
const tr=useRef<THREE.InstancedMesh>(null),cr=useRef<THREE.InstancedMesh>(null)
const list=useMemo(()=>{const a:{x:number;z:number;s:number}[]=[];let seed=7;const r=()=>(seed=(seed*16807)%2147483647)/2147483647
HABITATS.forEach(h=>{for(let i=0;i<h.trees;i++){const an=r()*6.28,rad=6+r()*8.5;a.push({x:h.pos[0]+Math.cos(an)*rad,z:h.pos[1]+Math.sin(an)*rad,s:.8+r()*.9})}});return a},[])
useLayoutEffect(()=>{const m=new THREE.Matrix4(),q=new THREE.Quaternion()
list.forEach((t,i)=>{const sc=new THREE.Vector3(t.s,t.s,t.s)
m.compose(new THREE.Vector3(t.x,1.2*t.s,t.z),q,sc);tr.current?.setMatrixAt(i,m)
m.compose(new THREE.Vector3(t.x,3.6*t.s,t.z),q,sc);cr.current?.setMatrixAt(i,m)})
if(tr.current)tr.current.instanceMatrix.needsUpdate=true;if(cr.current)cr.current.instanceMatrix.needsUpdate=true},[list])
return <><instancedMesh ref={tr} args={[undefined,undefined,list.length]}><cylinderGeometry args={[.25,.35,2.4,6]}/><meshStandardMaterial color="#5b3f28"/></instancedMesh>
<instancedMesh ref={cr} args={[undefined,undefined,list.length]}><coneGeometry args={[1.5,3.6,7]}/><meshStandardMaterial color="#2f7a3c" flatShading/></instancedMesh></>}
function Rig(){
const {camera}=useThree(),ctl=useRef<any>(null),cmd=useStore(s=>s.cmd)
useEffect(()=>{const c=ctl.current;if(!cmd||!c)return;const t=c.target as THREE.Vector3
const set=(p:number[],g=[0,0,0])=>{camera.position.set(p[0],p[1],p[2]);t.set(g[0],g[1],g[2]);c.update()}
if(cmd.k==='reset')set([0,38,78]);else if(cmd.k==='top')set([0,110,.1]);else if(cmd.k==='iso')set([70,60,70])
else if(cmd.k==='focus'){const id=useStore.getState().selected,r=id?reg[id]:null;if(r)set([r.x+10,8,r.z+10],[r.x,1.5,r.z])}
else if(cmd.k==='in'){camera.position.lerp(t,.25);c.update()}
else if(cmd.k==='out'){camera.position.sub(t).multiplyScalar(1.3).add(t);c.update()}},[cmd,camera])
return <OrbitControls ref={ctl} makeDefault minDistance={6} maxDistance={160} maxPolarAngle={Math.PI/2.05}/>}
export function hasWebGL(){try{const c=document.createElement('canvas');return !!(c.getContext('webgl2')||c.getContext('webgl'))}catch{return false}}
export default function ParkScene(){
const {grid,trees,dinos,night}=useStore(),[ready,setReady]=useState(false)
return <div className="canvas-wrap">{!ready&&<div className="loading"><div className="spinner-border text-success"/><span>Growing the park…</span></div>}
<Canvas camera={{position:[0,38,78],fov:50}} dpr={[1,1.75]} onCreated={()=>setReady(true)} onPointerMissed={()=>useStore.getState().select(null)}>
<color attach="background" args={[night?'#0a1220':'#9cc4b4']}/><fog attach="fog" args={[night?'#0a1220':'#9cc4b4',60,190]}/>
<ambientLight intensity={night?.35:.75} color={night?'#6f84b8':'#ffffff'}/><directionalLight position={[40,60,20]} intensity={night?.35:1.3}/>
{night&&<Stars radius={150} depth={40} count={1500} factor={5} fade/>}
<mesh rotation-x={-Math.PI/2}><planeGeometry args={[260,260]}/><meshStandardMaterial color={night?'#16241b':'#2a4a30'}/></mesh>
<Plane w={110} d={3} c="#8a7350"/><Plane w={3} d={70} x={-34} c="#8a7350"/><Plane w={3} d={70} x={0} c="#8a7350"/><Plane w={3} d={70} x={34} c="#8a7350"/>
{grid&&<gridHelper args={[120,60,'#65D889','#244B32']}/>}
{HABITATS.map(h=><Zone key={h.id} h={h}/>)}{trees&&<Trees/>}
{dinos&&DINOS.map(d=>{const sp=SPECIES.find(s=>s.id===d.sp)!,h=HABITATS.find(x=>x.id===d.habitat)!;return <Dino key={d.id} d={d} sp={sp} h={h}/>})}
<Rig/></Canvas></div>}
