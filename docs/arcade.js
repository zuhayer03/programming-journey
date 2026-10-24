"use strict";
/* Z✳F PELLET RUN — original Pac-Man-inspired browser mini game.
 * Keyboard + touch. Client-side state only; no analytics/network.
 */
(() => {
 const canvas=document.getElementById("maze"),ctx=canvas?.getContext("2d");
 if(!ctx)return;
 const W=21,H=15,T=32;
 const START={x:1,y:1},GHOST_START=[{x:19,y:1},{x:19,y:13},{x:1,y:13}];
 const D={up:{x:0,y:-1,a:-Math.PI/2},down:{x:0,y:1,a:Math.PI/2},left:{x:-1,y:0,a:Math.PI},right:{x:1,y:0,a:0}};
 const $=id=>document.getElementById(id);
 let walls=new Set(),dots=new Set(),powers=new Set(),ghosts=[],player={...START},score=0,best=0,lives=3;
 let state="ready",direction="right",queued="right",tickNo=0,invulnerable=0,powerUntil=0,loopId=null;
 const code=(x,y)=>y*W+x;
 const wall=(x,y)=>x<0||y<0||x>=W||y>=H||walls.has(code(x,y));
 const passable=(x,y)=>!wall(x,y);
 function buildMaze(){
   walls=new Set();dots=new Set();powers=new Set();
   for(let y=0;y<H;y++)for(let x=0;x<W;x++){
     let solid=x===0||y===0||x===W-1||y===H-1;
     if((y===3||y===11)&&((x>=3&&x<=7)||(x>=13&&x<=17)))solid=true;
     if((y===6||y===8)&&((x>=4&&x<=7)||(x>=13&&x<=16)))solid=true;
     if(x===10&&((y>=2&&y<=4)||(y>=10&&y<=12)))solid=true;
     if((x===3||x===17)&&(y===5||y===9))solid=true;
     if(solid)walls.add(code(x,y));
     else dots.add(code(x,y));
   }
   dots.delete(code(START.x,START.y));
   for(const start of GHOST_START)dots.delete(code(start.x,start.y));
   for(const [x,y] of [[1,13],[19,1],[19,13],[1,1]]){
     if(passable(x,y)){powers.add(code(x,y));dots.delete(code(x,y));}
   }
 }
 function resetActors(){
   player={...START};direction="right";queued="right";invulnerable=7;
   ghosts=GHOST_START.map((v,i)=>({...v,index:i,direction:"left"}));
 }
 function updateHud(){
   $("score").textContent=String(score).padStart(4,"0");
   $("best-score").textContent=String(best).padStart(4,"0");
   $("lives").textContent=Array.from({length:3},(_,i)=>i<lives?"♥":"♡").join(" ");
   $("pellets").textContent=String(dots.size+powers.size);
 }
 function overlay(title,subtitle,button){
   $("overlay-title").textContent=title;
   $("overlay-sub").textContent=subtitle;
   $("play-button").textContent=button;
   $("game-overlay").hidden=false;
 }
 function announce(text){$("game-state").textContent=text;}
 function newGame(){
   buildMaze();score=0;lives=3;tickNo=0;powerUntil=0;resetActors();
   state="playing";$("game-overlay").hidden=true;announce("PLAYING / COLLECT THEM ALL");
   updateHud();draw();
 }
 function finish(won){
   state=won?"won":"over";stopLoop();
   best=Math.max(best,score);updateHud();announce(won?"YOU CLEARED THE MAZE":"GAME OVER");
   overlay(won?"YOU DID IT! ✳":"GAME OVER","Score: "+score+". "+(won?"You cleared every pellet.":"The ghosts caught you."),"PLAY AGAIN ↗");
   draw();
 }
 function pause(){
   if(state==="playing"){state="paused";announce("PAUSED");overlay("GAME PAUSED","Resume whenever you're ready.","RESUME GAME ↗");}
   else if(state==="paused"){state="playing";announce("PLAYING / COLLECT THEM ALL");$("game-overlay").hidden=true;}
 }
 function stopLoop(){if(loopId!==null){clearInterval(loopId);loopId=null;}}
 function ensureLoop(){if(loopId===null)loopId=setInterval(step,150);}
 function start(){
   if(state==="paused"){pause();return;}
   newGame();ensureLoop();
 }
 function move(pos,dir){const d=D[dir];return {x:pos.x+d.x,y:pos.y+d.y};}
 function eat(){
   const id=code(player.x,player.y);
   if(dots.delete(id)){score+=10;}
   if(powers.delete(id)){score+=50;powerUntil=tickNo+38;announce("POWER MODE! GO GET THOSE GHOSTS");}
   best=Math.max(best,score);
 }
 function collision(){
   const ghost=ghosts.find(g=>g.x===player.x&&g.y===player.y);
   if(!ghost||invulnerable>0)return false;
   if(tickNo<powerUntil){
     score+=200;const i=ghost.index;ghost.x=GHOST_START[i].x;ghost.y=GHOST_START[i].y;
     invulnerable=2;best=Math.max(score,best);return false;
   }
   lives--;
   if(lives<=0){finish(false);return true;}
   announce("GHOST HIT / "+lives+" LIVES LEFT");
   resetActors();return true;
 }
 function ghostStep(ghost){
   const options=Object.entries(D).filter(([name,d])=>passable(ghost.x+d.x,ghost.y+d.y));
   if(!options.length)return;
   const chase=tickNo>=powerUntil;
   const sorted=options.map(([name,d])=>{
     const nx=ghost.x+d.x,ny=ghost.y+d.y;
     return {name,nx,ny,distance:Math.abs(nx-player.x)+Math.abs(ny-player.y)};
   }).sort((a,b)=>chase?a.distance-b.distance:b.distance-a.distance);
   const deterministic=(tickNo*7+ghost.index*13)%10;
   const selected=deterministic<6?sorted[0]:sorted[(tickNo+ghost.index)%sorted.length];
   ghost.x=selected.nx;ghost.y=selected.ny;ghost.direction=selected.name;
 }
 function step(){
   if(state!=="playing")return;
   tickNo++;
   if(invulnerable>0)invulnerable--;
   const queuedNext=move(player,queued);
   if(passable(queuedNext.x,queuedNext.y))direction=queued;
   const next=move(player,direction);
   if(passable(next.x,next.y))player={x:next.x,y:next.y};
   eat();
   if(collision())return;
   if(tickNo%2===0){
     ghosts.forEach(ghostStep);
     if(collision())return;
   }
   if(dots.size===0&&powers.size===0){finish(true);return;}
   if(tickNo>=powerUntil&&$("game-state").textContent.startsWith("POWER MODE"))announce("PLAYING / COLLECT THEM ALL");
   updateHud();draw();
 }
 function draw(){
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.fillStyle="#0d1517";ctx.fillRect(0,0,W*T,H*T);
   // Board lines are subdued and work as visual depth rather than obstacles.
   ctx.strokeStyle="#18322a";ctx.lineWidth=.6;
   for(let x=0;x<=W;x++){ctx.beginPath();ctx.moveTo(x*T,0);ctx.lineTo(x*T,H*T);ctx.stroke();}
   for(let y=0;y<=H;y++){ctx.beginPath();ctx.moveTo(0,y*T);ctx.lineTo(W*T,y*T);ctx.stroke();}
   for(const id of walls){
     const x=id%W,y=Math.floor(id/W),px=x*T,py=y*T;
     ctx.fillStyle="#264a3e";ctx.fillRect(px+2,py+2,T-4,T-4);
     ctx.fillStyle="#457861";ctx.fillRect(px+4,py+4,T-8,3);
     ctx.fillStyle="#182a24";ctx.fillRect(px+4,py+T-9,T-8,4);
   }
   for(const id of dots){const x=id%W,y=Math.floor(id/W);ctx.fillStyle="#b8db91";ctx.beginPath();ctx.arc(x*T+T/2,y*T+T/2,3.4,0,Math.PI*2);ctx.fill();}
   for(const id of powers){const x=id%W,y=Math.floor(id/W);ctx.fillStyle="#d9ff65";ctx.beginPath();ctx.arc(x*T+T/2,y*T+T/2,7.5+Math.sin(tickNo*.35)*1.3,0,Math.PI*2);ctx.fill();}
   ghosts.forEach(g=>{
     const px=g.x*T+T/2,py=g.y*T+T/2;
     const scared=tickNo<powerUntil;
     ctx.fillStyle=scared?"#7387ea":["#fa92ab","#78dbc4","#f7c58a"][g.index];
     ctx.beginPath();ctx.arc(px,py-4,11,Math.PI,0);
     ctx.lineTo(px+11,py+11);ctx.lineTo(px+5,py+7);ctx.lineTo(px,py+11);ctx.lineTo(px-5,py+7);ctx.lineTo(px-11,py+11);ctx.closePath();ctx.fill();
     ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(px-4,py-3,3.5,0,Math.PI*2);ctx.arc(px+4,py-3,3.5,0,Math.PI*2);ctx.fill();
     ctx.fillStyle="#172320";ctx.beginPath();ctx.arc(px-3,py-2,1.6,0,Math.PI*2);ctx.arc(px+5,py-2,1.6,0,Math.PI*2);ctx.fill();
   });
   if(invulnerable===0||tickNo%4<2){
     const cx=player.x*T+T/2,cy=player.y*T+T/2,a=D[direction].a;
     const mouth=.17+((tickNo%4)/4)*.43;
     ctx.fillStyle="#d9ff65";ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,13,a+mouth,a+Math.PI*2-mouth);ctx.closePath();ctx.fill();
   }
 }
 function input(dir){
   queued=dir;if(state==="ready")start();
   if(state==="paused")pause();
 }
 const keys={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",w:"up",s:"down",a:"left",d:"right",W:"up",S:"down",A:"left",D:"right"};
 document.addEventListener("keydown",event=>{
   if(keys[event.key]){event.preventDefault();input(keys[event.key]);}
   else if(event.code==="Space"){event.preventDefault();if(state==="ready"||state==="won"||state==="over")start();else pause();}
 });
 document.querySelectorAll("[data-direction]").forEach(button=>button.addEventListener("click",()=>input(button.dataset.direction)));
 $("play-button").addEventListener("click",start);
 $("pause-button").addEventListener("click",()=>{if(state==="ready"||state==="over"||state==="won")start();else pause();});
 $("restart-button").addEventListener("click",start);
 buildMaze();resetActors();updateHud();draw();
})();
