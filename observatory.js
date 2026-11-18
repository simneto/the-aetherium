(() => {
'use strict';
const $ = id => document.getElementById(id);
const canvas=$('sky'),ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
let layer='real', zoom=1, offsetX=0, offsetY=0, selected=null, pointer=null, moved=false;
const stars=Array.from({length:145},(_,i)=>({x:(Math.sin(i*127.13)*43758.5453%1+1)%1,y:(Math.sin(i*79.7+5)*9238.19%1+1)%1,r:i%9===0?1.7:.8}));
const all=CELESTIAL_OBJECTS;
function active(){return all.filter(o=>o.kind===layer)}
function transform(o){return {x:W/2+(o.x*W-W/2)*zoom+offsetX,y:H/2+(o.y*H-H/2)*zoom+offsetY}}
function clampZoom(z){return Math.max(.65,Math.min(3.5,z))}
function draw(){
 ctx.fillStyle='#07121f';ctx.fillRect(0,0,W,H);
 ctx.strokeStyle='#1a3548';ctx.lineWidth=1;
 for(let x=0;x<=W;x+=75){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}
 for(let y=0;y<=H;y+=75){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
 for(const s of stars){let x=(s.x*W*zoom+offsetX*.25)%W,y=(s.y*H*zoom+offsetY*.25)%H;x=(x+W)%W;y=(y+H)%H;ctx.beginPath();ctx.arc(x,y,s.r,0,Math.PI*2);ctx.fillStyle='#7895b4';ctx.globalAlpha=.3+(s.r/2)*.3;ctx.fill()}ctx.globalAlpha=1;
 const items=active();
 if(layer==='fiction'){
  const ids=['nacre','thren','echo','veil','relay'];
  ctx.strokeStyle='rgba(131,206,209,.22)';ctx.setLineDash([8,9]);ctx.lineWidth=2;
  ctx.beginPath();ids.forEach((id,i)=>{const a=items.find(o=>o.id===id);if(!a)return;const q=transform(a);if(i===0)ctx.moveTo(q.x,q.y);else ctx.lineTo(q.x,q.y)});ctx.stroke();ctx.setLineDash([]);
 }
 for(const o of items){
  const p=transform(o);if(p.x< -90||p.x>W+90||p.y< -90||p.y>H+90)continue;
  const r=o.size*Math.max(.85,Math.min(zoom,1.7));
  if(selected===o.id){ctx.beginPath();ctx.arc(p.x,p.y,r+12,0,Math.PI*2);ctx.strokeStyle='#e0bf85';ctx.lineWidth=2;ctx.stroke()}
  const glow=ctx.createRadialGradient(p.x,p.y,1,p.x,p.y,r*4);glow.addColorStop(0,o.color+'aa');glow.addColorStop(1,'#07121f00');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(p.x,p.y,r*4,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fillStyle=o.color;ctx.fill();
  ctx.fillStyle='#e8eef2';ctx.font='15px system-ui';ctx.textAlign='center';ctx.fillText(o.name,p.x,p.y+r+22);
 }
 ctx.textAlign='left';ctx.font='13px monospace';ctx.fillStyle='#8ca5b9';ctx.fillText(layer==='real'?'SCHEMATIC / REAL OBJECTS':'FICTIONAL CANON / EXPANSE',20,30);ctx.fillText('ZOOM '+zoom.toFixed(2)+'×',W-125,30);
}
function select(id,center=false){
 const o=active().find(x=>x.id===id);if(!o)return;selected=id;
 $('profileName').textContent=o.name;$('profileType').textContent=(layer==='real'?'ESTABLISHED ASTRONOMY':'AETHERIUM FICTION')+' · '+o.type;
 $('profileFacts').textContent=o.facts;$('profileDistance').textContent=o.distance;$('profileNote').textContent=o.note;
 $('profileLinks').replaceChildren();const a=document.createElement('a');a.href='archives.html#'+o.link;a.textContent='Related archive / '+o.link+' ↗';$('profileLinks').append(a);
 if(center){const p=transform(o);offsetX+=W/2-p.x;offsetY+=H/2-p.y}
 renderList();draw();
}
function renderList(){
 const q=$('search').value.trim().toLowerCase();const list=$('objectList');list.replaceChildren();
 for(const o of active().filter(x=>(x.name+' '+x.type+' '+x.facts).toLowerCase().includes(q))){
  const b=document.createElement('button');b.type='button';b.textContent=o.name+' · '+o.type;b.setAttribute('aria-current',String(selected===o.id));b.addEventListener('click',()=>select(o.id,true));list.append(b);
 }
 if(!list.children.length){const p=document.createElement('p');p.className='small';p.textContent='No matching celestial records.';list.append(p)}
}
function changeLayer(next){
 layer=next;selected=null;zoom=1;offsetX=offsetY=0;$('search').value='';
 $('realTab').setAttribute('aria-pressed',String(layer==='real'));$('fictionTab').setAttribute('aria-pressed',String(layer==='fiction'));
 $('layerStatus').textContent=(layer==='real'?'KNOWN COSMOS':'AETHERIUM EXPANSE')+' · '+active().length+' OBJECTS';
 select(active()[0].id);
}
$('realTab').addEventListener('click',()=>changeLayer('real'));
$('fictionTab').addEventListener('click',()=>changeLayer('fiction'));
$('search').addEventListener('input',renderList);
$('zoomIn').addEventListener('click',()=>{zoom=clampZoom(zoom*1.2);draw()});
$('zoomOut').addEventListener('click',()=>{zoom=clampZoom(zoom/1.2);draw()});
$('reset').addEventListener('click',()=>{zoom=1;offsetX=offsetY=0;draw()});
function coords(e){const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}}
canvas.addEventListener('pointerdown',e=>{pointer={...coords(e),ox:offsetX,oy:offsetY,id:e.pointerId};moved=false;canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener('pointermove',e=>{if(!pointer||pointer.id!==e.pointerId)return;const p=coords(e);if(Math.hypot(p.x-pointer.x,p.y-pointer.y)>7)moved=true;if(moved){offsetX=pointer.ox+p.x-pointer.x;offsetY=pointer.oy+p.y-pointer.y;draw()}});
canvas.addEventListener('pointerup',e=>{if(!pointer||pointer.id!==e.pointerId)return;const p=coords(e);if(!moved){let nearest=null,dist=30;for(const o of active()){const v=transform(o),d=Math.hypot(v.x-p.x,v.y-p.y);if(d<dist){dist=d;nearest=o}}if(nearest)select(nearest.id)}pointer=null});
canvas.addEventListener('pointercancel',()=>{pointer=null});
canvas.addEventListener('wheel',e=>{e.preventDefault();const p=coords(e),z=clampZoom(zoom*(e.deltaY<0?1.12:1/1.12));const ratio=z/zoom;offsetX=p.x-W/2-(p.x-W/2-offsetX)*ratio;offsetY=p.y-H/2-(p.y-H/2-offsetY)*ratio;zoom=z;draw()},{passive:false});
canvas.addEventListener('keydown',e=>{let used=true;switch(e.key){case 'ArrowLeft':offsetX+=30;break;case 'ArrowRight':offsetX-=30;break;case 'ArrowUp':offsetY+=30;break;case 'ArrowDown':offsetY-=30;break;case '+':case '=':zoom=clampZoom(zoom*1.15);break;case '-':zoom=clampZoom(zoom/1.15);break;default:used=false}if(used){e.preventDefault();draw()}});
const params=new URLSearchParams(location.search);
const requestedLayer=params.get('layer')==='fiction'?'fiction':'real';changeLayer(requestedLayer);
const requestedObject=params.get('object');if(requestedObject && active().some(o=>o.id===requestedObject))select(requestedObject,true);
})();