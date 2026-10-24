"use strict";
// Decorative 53x7 pixel-art editor. This NEVER alters GitHub activity.
(() => {
  const canvas=document.getElementById("art-canvas");
  const ctx=canvas?.getContext("2d");
  if(!ctx)return;
  const cols=53,rows=7,step=20,cell=16;
  const palette=["#19291f","#295a47","#428d70","#9cebd2","#d9ff65"];
  const pixels=new Uint8Array(cols*rows);
  const $=id=>document.getElementById(id);
  let color=4,preset="zf",cursor={x:0,y:0},pointerDown=false;
  const index=(x,y)=>y*cols+x;
  const set=(x,y,v)=>{if(x>=0&&y>=0&&x<cols&&y<rows)pixels[index(x,y)]=v;};
  const glyphZ=["11111","00010","00100","01000","10000","11111","00000"];
  const glyphF=["11111","10000","11110","10000","10000","10000","00000"];
  function glyph(pattern,offset,level=4){
    for(let y=0;y<pattern.length;y++)for(let x=0;x<pattern[y].length;x++){
      if(pattern[y][x]==="1")set(x+offset,y,level);
    }
  }
  function applyPreset(which){
    preset=which;pixels.fill(0);
    if(which==="zf"){glyph(glyphZ,18);glyph(glyphF,29);}
    else if(which==="heart"){
      const heart=["01100110","11111111","11111111","01111110","00111100","00011000","00000000"];
      glyph(heart,23);
    }
    else if(which==="wave"){
      for(let x=0;x<cols;x++){
        const center=Math.round(3+2*Math.sin(x*.35));
        for(let y=0;y<rows;y++)if(Math.abs(y-center)<=0)set(x,y,(x%6===0)?3:4);
      }
    }
    document.querySelectorAll(".preset").forEach(b=>{
      const current=b.dataset.preset===which;b.classList.toggle("active",current);
      b.setAttribute("aria-pressed",String(current));
    });
    $("paint-status").textContent=which==="blank"?"BLANK CANVAS":which.toUpperCase()+" PRESET";
    draw();
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#101c14";ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
      const v=pixels[index(x,y)];
      ctx.fillStyle=palette[v];
      ctx.beginPath();ctx.roundRect(x*step+2,y*step+2,cell,cell,3);ctx.fill();
    }
    if(document.activeElement===canvas){
      ctx.strokeStyle="#ffffff";ctx.lineWidth=2;
      ctx.strokeRect(cursor.x*step+1,cursor.y*step+1,cell+2,cell+2);
    }
  }
  function cellFromEvent(e){
    const r=canvas.getBoundingClientRect();
    return {x:Math.min(cols-1,Math.max(0,Math.floor((e.clientX-r.left)/r.width*cols))),
      y:Math.min(rows-1,Math.max(0,Math.floor((e.clientY-r.top)/r.height*rows)))};
  }
  function paint(x,y){
    set(x,y,color);
    $("paint-status").textContent="DRAWING / ARTWORK ONLY";
    draw();
  }
  canvas.addEventListener("pointerdown",e=>{
    pointerDown=true;canvas.setPointerCapture?.(e.pointerId);
    const pt=cellFromEvent(e);cursor=pt;paint(pt.x,pt.y);
  });
  canvas.addEventListener("pointermove",e=>{
    if(!pointerDown)return;
    const pt=cellFromEvent(e);cursor=pt;paint(pt.x,pt.y);
  });
  const endPointer=()=>{pointerDown=false;};
  canvas.addEventListener("pointerup",endPointer);
  canvas.addEventListener("pointercancel",endPointer);
  canvas.addEventListener("blur",draw);
  canvas.addEventListener("focus",draw);
  canvas.addEventListener("keydown",e=>{
    const moves={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
    if(moves[e.key]){
      e.preventDefault();cursor.x=Math.max(0,Math.min(cols-1,cursor.x+moves[e.key][0]));
      cursor.y=Math.max(0,Math.min(rows-1,cursor.y+moves[e.key][1]));
      draw();
    }else if(e.key===" "||e.key==="Enter"){e.preventDefault();paint(cursor.x,cursor.y);}
  });
  document.querySelectorAll(".preset").forEach(b=>b.addEventListener("click",()=>applyPreset(b.dataset.preset)));
  document.querySelectorAll(".swatch").forEach(b=>b.addEventListener("click",()=>{
    color=Number(b.dataset.color);
    document.querySelectorAll(".swatch").forEach(s=>{
      const current=s===b;s.classList.toggle("selected",current);
      s.setAttribute("aria-pressed",String(current));
    });
  }));
  $("reset-preset").addEventListener("click",()=>applyPreset(preset));
  $("export-svg").addEventListener("click",()=>{
    const squares=[];
    for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
      squares.push('<rect x="'+(x*20+4)+'" y="'+(y*20+50)+'" width="16" height="16" rx="3" fill="'+palette[pixels[index(x,y)]]+'"/>');
    }
    const svg='<svg xmlns="http://www.w3.org/2000/svg" width="1068" height="241" viewBox="0 0 1068 241">'+
      '<rect width="1068" height="241" rx="13" fill="#101c14"/>'+
      '<text x="20" y="31" font-family="monospace" font-size="17" fill="#d9ff65">CONTRIBUTION-INSPIRED PIXEL ART</text>'+
      squares.join("")+
      '<text x="20" y="229" font-family="monospace" font-size="13" fill="#a0bca1">DECORATIVE ART, NOT GITHUB ACTIVITY OR COMMITS</text>'+
      '</svg>';
    const blob=new Blob([svg],{type:"image/svg+xml;charset=utf-8"});
    const url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download="zf-contribution-pixel-art.svg";
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1500);
    $("paint-status").textContent="SVG EXPORTED / NO COMMITS CHANGED";
  });
  applyPreset("zf");
})();
