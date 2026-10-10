"use strict";
document.getElementById("year").textContent = String(new Date().getFullYear());
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (ctx && !reduced) {
  let width=0,height=0,points=[],frame=0;
  const resize=()=>{
    const dpr=Math.min(window.devicePixelRatio||1,2);
    width=window.innerWidth;height=window.innerHeight;
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    points=Array.from({length:Math.min(75,Math.floor(width/18))},()=>({
      x:Math.random()*width,y:Math.random()*height,
      vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.3+.4
    }));
  };
  const animate=()=>{
    ctx.clearRect(0,0,width,height);
    for(const p of points){
      p.x=(p.x+p.vx+width)%width;p.y=(p.y+p.vy+height)%height;
      ctx.fillStyle="rgba(105,226,219,.42)";ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
    }
    for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){
      const a=points[i],b=points[j],d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<115){ctx.strokeStyle="rgba(111,171,255,"+((1-d/115)*.10)+")";ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
    }
    frame=requestAnimationFrame(animate);
  };
  resize();window.addEventListener("resize",resize,{passive:true});
  document.addEventListener("visibilitychange",()=>{if(document.hidden){cancelAnimationFrame(frame)}else{cancelAnimationFrame(frame);animate()}});
  animate();
}