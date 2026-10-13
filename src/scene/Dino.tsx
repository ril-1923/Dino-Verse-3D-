import {memo,useMemo,useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'
import type {DinoInst,Species,Habitat} from '../data'
import {useStore,reg} from '../store'
const rnd=(a:number)=>(Math.random()-.5)*a
export const Dino=memo(function Dino({d,sp,h}:{d:DinoInst;sp:Species;h:Habitat}){
const root=useRef<THREE.Group>(null),tail=useRef<THREE.Group>(null),head=useRef<THREE.Group>(null),body=useRef<THREE.Group>(null)
const legs=useRef<THREE.Group[]>([])
const sel=useStore(s=>s.selected===d.id),select=useStore(s=>s.select)
const mat=useMemo(()=>new THREE.MeshStandardMaterial({color:sp.color,flatShading:true,roughness:.9}),[sp.color])
const dark=useMemo(()=>new THREE.MeshStandardMaterial({color:'#111'}),[])
const x0=h.pos[0]+d.ox,z0=h.pos[1]+d.oz
const st=useRef({x:x0,z:z0,tx:x0,tz:z0,wait:1+Math.random()*3,t:Math.random()*9,ry:Math.random()*6,act:'Resting'})
const ang=sp.neck>2?.4:1.1,legH=.9,by=legH+.6,hm=sp.id==='trex'?1.4:sp.id==='velociraptor'?.7:1
const lp:number[][]=sp.biped?[[-.35,0],[.35,0]]:[[-.4,.7],[.4,.7],[-.4,-.7],[.4,-.7]]
useFrame((_,dt0)=>{const g=root.current;if(!g)return
const dt=Math.min(dt0,.05),s=st.current;s.t+=dt;let mv=0
if(s.wait>0){s.wait-=dt;s.act=sp.diet==='Herbivore'?'Grazing':'Resting'
if(s.wait<=0){s.tx=h.pos[0]+rnd(18);s.tz=h.pos[1]+rnd(18)}}
else{const dx=s.tx-s.x,dz=s.tz-s.z,dist=Math.hypot(dx,dz)
if(dist<.4)s.wait=2+Math.random()*5
else{const v=sp.speed*dt;s.x+=dx/dist*v;s.z+=dz/dist*v;mv=1;s.act='Walking'
let da=Math.atan2(dx,dz)-s.ry;da=Math.atan2(Math.sin(da),Math.cos(da));s.ry+=da*Math.min(1,dt*3)}}
g.position.set(s.x,0,s.z);g.rotation.y=s.ry
const sw=Math.sin(s.t*2*sp.speed)*.5*mv
legs.current.forEach((l,i)=>{if(l)l.rotation.x=i%2?-sw:sw})
if(body.current)body.current.position.y=Math.abs(sw)*.1
if(tail.current)tail.current.rotation.y=Math.sin(s.t*2)*.3
if(head.current)head.current.rotation.set(-ang*.9,Math.sin(s.t*.8)*.25,0)
reg[d.id]={x:s.x,z:s.z,act:s.act}})
return <group ref={root} onClick={e=>{e.stopPropagation();select(d.id)}}>
<mesh rotation-x={-Math.PI/2} position-y={.06} visible={sel}><ringGeometry args={[sp.scale*1.7,sp.scale*2,32]}/><meshBasicMaterial color="#65D889"/></mesh>
<group scale={sp.scale}><group ref={body}>
<mesh material={mat} position={[0,by,0]} scale={[.7,.65,1.2]}><sphereGeometry args={[1,10,8]}/></mesh>
{lp.map((p,i)=><group key={i} ref={el=>{if(el)legs.current[i]=el}} position={[p[0],legH,p[1]]}>
<mesh material={mat} position-y={-legH/2}><cylinderGeometry args={[sp.biped?.2:.17,.13,legH,6]}/></mesh>
{sp.feat==='claws'&&<mesh material={dark} position={[0,-legH,.15]} rotation-x={Math.PI/2}><coneGeometry args={[.05,.3,4]}/></mesh>}</group>)}
{sp.feat==='plates'&&[-.8,-.5,-.2,.1,.4,.7].map((z,i)=><mesh key={i} material={mat} position={[0,by+.7,z]} rotation-y={.8}><boxGeometry args={[.1,.55,.4]}/></mesh>)}
{sp.feat==='sail'&&[-.6,-.3,0,.3,.6].map((z,i)=><mesh key={i} material={mat} position={[0,by+.8,z]}><boxGeometry args={[.08,.9,.3]}/></mesh>)}
<group position={[0,by+.2,.9]} rotation-x={ang}>
<mesh material={mat} position-y={sp.neck/2}><cylinderGeometry args={[.22,.34,sp.neck,6]}/></mesh>
<group ref={head} position-y={sp.neck}>
<mesh material={mat} position-z={.3} scale={[.5*hm,.45*hm,.9*hm]}><boxGeometry args={[1,1,1]}/></mesh>
{[-1,1].map(s=><mesh key={s} material={dark} position={[s*.26*hm,.15,.4*hm]}><sphereGeometry args={[.07,6,6]}/></mesh>)}
{sp.feat==='horns'&&<>{[[-.18,.25,.55],[.18,.25,.55],[0,.05,.95]].map((p,i)=><mesh key={i} material={dark} position={p as [number,number,number]} rotation-x={Math.PI/2}><coneGeometry args={[.06,.5,6]}/></mesh>)}
<mesh material={mat} position={[0,.3,-.2]} rotation-x={Math.PI/2}><cylinderGeometry args={[.7,.7,.08,12]}/></mesh></>}
{sp.feat==='crest'&&<mesh material={mat} position={[0,.4,-.3]} rotation-x={-.9}><cylinderGeometry args={[.07,.07,.9,6]}/></mesh>}
</group></group>
<group ref={tail} position={[0,by,-1.1]}>
<mesh material={mat} rotation-x={-Math.PI/2} position-z={-sp.tail/2}><coneGeometry args={[.4,sp.tail,6]}/></mesh>
{sp.feat==='club'&&<mesh material={mat} position-z={-sp.tail}><sphereGeometry args={[.45,8,8]}/></mesh>}</group>
</group></group></group>})
