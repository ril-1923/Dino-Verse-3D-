export type Species={id:string;name:string;sci:string;diet:'Carnivore'|'Herbivore';period:string;length:number;weight:string;habitat:string;color:string;biped:boolean;neck:number;tail:number;scale:number;feat:string;speed:number;count:number;desc:string}
export type Habitat={id:string;name:string;pos:[number,number];color:string;water:string|null;cap:number;temp:number;status:string;trees:number;veg:string}
export type DinoInst={id:string;name:string;sp:string;habitat:string;ox:number;oz:number;health:string}
export const STATUSES=['Operational','Needs attention','Under maintenance']
export const HABITATS:Habitat[]=[
{id:'jungle',name:'Jurassic Jungle',pos:[-34,-20],color:'#1b4228',water:'#3a8fc9',cap:6,temp:29,status:'Operational',trees:40,veg:'Dense'},
{id:'valley',name:'Herbivore Valley',pos:[0,-20],color:'#3f7a3a',water:'#3a8fc9',cap:14,temp:26,status:'Operational',trees:12,veg:'Grassland'},
{id:'raptor',name:'Raptor Territory',pos:[34,-20],color:'#5a4f40',water:null,cap:6,temp:31,status:'Needs attention',trees:25,veg:'Dense'},
{id:'river',name:'River Sanctuary',pos:[-34,20],color:'#2f5a55',water:'#3a8fc9',cap:8,temp:27,status:'Operational',trees:14,veg:'Riverbank'},
{id:'wetlands',name:'Ancient Wetlands',pos:[0,20],color:'#35563a',water:'#4d7f6a',cap:6,temp:30,status:'Operational',trees:22,veg:'Tall reeds'},
{id:'fossil',name:'Fossil Research Zone',pos:[34,20],color:'#6a5a45',water:null,cap:0,temp:24,status:'Under maintenance',trees:4,veg:'Sparse'}]
export const SPECIES:Species[]=[
{id:'trex',name:'Tyrannosaurus Rex',sci:'Tyrannosaurus rex',diet:'Carnivore',period:'Late Cretaceous',length:12,weight:'8,000 kg',habitat:'jungle',color:'#8a6a3c',biped:true,neck:.5,tail:3.2,scale:1.3,feat:'none',speed:2.2,count:3,desc:'Apex predator with a massive skull and tiny forearms.'},
{id:'triceratops',name:'Triceratops',sci:'Triceratops horridus',diet:'Herbivore',period:'Late Cretaceous',length:9,weight:'6,000 kg',habitat:'valley',color:'#9a8a5a',biped:false,neck:.4,tail:1.6,scale:1.1,feat:'horns',speed:1.6,count:4,desc:'Three-horned herbivore with a bony neck frill.'},
{id:'velociraptor',name:'Velociraptor',sci:'Velociraptor mongoliensis',diet:'Carnivore',period:'Late Cretaceous',length:2,weight:'15 kg',habitat:'raptor',color:'#b0703a',biped:true,neck:.5,tail:2.2,scale:.55,feat:'claws',speed:3.6,count:4,desc:'Small, fast pack hunter with sickle claws.'},
{id:'stegosaurus',name:'Stegosaurus',sci:'Stegosaurus stenops',diet:'Herbivore',period:'Late Jurassic',length:9,weight:'5,000 kg',habitat:'valley',color:'#6f8f4a',biped:false,neck:.5,tail:2,scale:1.1,feat:'plates',speed:1.4,count:3,desc:'Plated herbivore with a spiked tail.'},
{id:'brachiosaurus',name:'Brachiosaurus',sci:'Brachiosaurus altithorax',diet:'Herbivore',period:'Late Jurassic',length:22,weight:'40,000 kg',habitat:'river',color:'#7d9a8a',biped:false,neck:3.2,tail:2.2,scale:1.8,feat:'none',speed:1.1,count:3,desc:'Towering long-necked sauropod.'},
{id:'ankylosaurus',name:'Ankylosaurus',sci:'Ankylosaurus magniventris',diet:'Herbivore',period:'Late Cretaceous',length:6,weight:'6,000 kg',habitat:'valley',color:'#6a5a4a',biped:false,neck:.3,tail:1.8,scale:.9,feat:'club',speed:1.2,count:3,desc:'Armoured herbivore with a tail club.'},
{id:'spinosaurus',name:'Spinosaurus',sci:'Spinosaurus aegyptiacus',diet:'Carnivore',period:'Mid Cretaceous',length:14,weight:'7,400 kg',habitat:'wetlands',color:'#4f7f8f',biped:true,neck:.6,tail:3,scale:1.4,feat:'sail',speed:1.9,count:2,desc:'Sail-backed fish hunter of rivers and swamps.'},
{id:'parasaurolophus',name:'Parasaurolophus',sci:'Parasaurolophus walkeri',diet:'Herbivore',period:'Late Cretaceous',length:10,weight:'3,500 kg',habitat:'river',color:'#a06a8a',biped:false,neck:.8,tail:2,scale:1,feat:'crest',speed:1.7,count:2,desc:'Duck-billed herbivore with a hollow crest.'}]
const NM=['Rex Alpha','Titan','Ember','Moss','Fern','Atlas','Juno','Basalt','Willow','Sable','Onyx','Pebble']
const HL=['Healthy','Healthy','Healthy','Under observation']
export const DINOS:DinoInst[]=SPECIES.flatMap((s,k)=>Array.from({length:s.count},(_,i)=>({id:`${s.id}-${i}`,name:NM[(k*3+i)%NM.length]+(i>0?` ${i+1}`:''),sp:s.id,habitat:s.habitat,ox:((i*5+k*3)%9)-4,oz:((i*7+k*2)%9)-4,health:HL[(i+k)%4]})))
