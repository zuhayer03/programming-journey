"use strict";
// Z✳F — intentionally framework-free interactions. Site content works without JS.
const $ = id => document.getElementById(id);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ($("year")) $("year").textContent = String(new Date().getFullYear());

// Theme switch: an editorial light mode by default, dark mode on request.
const themeToggle = $("theme-toggle");
function setTheme(isDark){
 document.body.classList.toggle("dark",isDark);
 themeToggle.setAttribute("aria-pressed",String(isDark));
 themeToggle.setAttribute("aria-label",isDark?"Switch to light theme":"Switch to dark theme");
 themeToggle.title=isDark?"Switch to light theme":"Switch to dark theme";
}
let savedTheme=null;
try {savedTheme=localStorage.getItem("zf-theme");}catch(_){}
setTheme(savedTheme==="dark");
themeToggle.addEventListener("click",()=>{
 const next=!document.body.classList.contains("dark");setTheme(next);
 try{localStorage.setItem("zf-theme",next?"dark":"light");}catch(_){}
});

// Functional project filters — ALL / PYTHON / JAVA.
const buttons=[...document.querySelectorAll(".filter")];
const projects=[...document.querySelectorAll(".project-card")];
buttons.forEach(button=>button.addEventListener("click",()=>{
 const filter=button.dataset.filter;
 buttons.forEach(b=>{const current=b===button;b.classList.toggle("active",current);b.setAttribute("aria-pressed",String(current));});
 projects.forEach(card=>{card.hidden=filter!=="all"&&card.dataset.lang!==filter;});
}));

// Command palette — Ctrl / Cmd + K, slash, arrows, enter, escape.
const palette=$("command-palette"),input=$("command-input"),list=$("command-list");
let priorFocus=null,selected=0,matches=[];
const commands=[
 {label:"Home",detail:"01 / Landing",href:"#home"},
 {label:"Selected Work",detail:"02 / Four projects",href:"#work"},
 {label:"Creative Lab",detail:"03 / Interactive experiments",href:"lab.html"},
 {label:"Playable Arcade",detail:"Bonus / Pellet Run game",href:"arcade.html"},
 {label:"Contribution Pixel Studio",detail:"Art only / no fake commits",href:"constellation.html"},
 {label:"About",detail:"04 / Backstory",href:"#about"},
 {label:"Tool Universe",detail:"04 / 29 tools + 3D orbit",href:"#tools"},
 {label:"Current Focus",detail:"05 / Learning and co-op",href:"#focus"},
 {label:"Timeline",detail:"05 / Experience",href:"#now"},
 {label:"Connect",detail:"06 / Co-op opportunities",href:"#contact"},
 {label:"GitHub",detail:"External / Source code",href:"https://github.com/zuhayer03"},
 {label:"LinkedIn",detail:"External / Professional profile",href:"https://www.linkedin.com/in/zuhayer-alam-faiyaz-8bb1a3442/"}
];
function paint(){
 const q=input.value.trim().toLowerCase();matches=commands.filter(c=>(c.label+" "+c.detail).toLowerCase().includes(q));
 selected=Math.max(0,Math.min(selected,matches.length-1));
 list.replaceChildren();
 if(!matches.length){const row=document.createElement("p");row.textContent="No matching destination.";row.style.cssText="padding:15px;color:#586558";list.appendChild(row);return;}
 matches.forEach((c,i)=>{
  const b=document.createElement("button");b.type="button";b.className="palette-item"+(i===selected?" selected":"");b.setAttribute("role","option");b.setAttribute("aria-selected",String(i===selected));
  const title=document.createElement("span");title.textContent=c.label;
  const meta=document.createElement("small");meta.textContent=c.detail;
  b.append(title,meta);b.addEventListener("click",()=>navigate(c));
  b.addEventListener("mouseenter",()=>{selected=i;[...list.children].forEach((child,j)=>{child.classList.toggle("selected",j===selected);child.setAttribute("aria-selected",String(j===selected));});});
  list.appendChild(b);
 });
}
function show(){priorFocus=document.activeElement;palette.hidden=false;document.body.style.overflow="hidden";input.value="";selected=0;paint();input.focus();}
function hide(){palette.hidden=true;document.body.style.overflow="";if(priorFocus?.focus)priorFocus.focus();}
function navigate(c){
 hide();if(!c)return;
 if(c.href.startsWith("#")){document.querySelector(c.href)?.scrollIntoView({behavior:reduceMotion?"auto":"smooth"});}
 else if(c.href.startsWith("https:"))window.open(c.href,"_blank","noopener,noreferrer");
 else window.location.href=c.href;
}
$("command-launch").addEventListener("click",show);
$("command-close").addEventListener("click",hide);
palette.addEventListener("click",event=>{if(event.target===palette)hide();});
input.addEventListener("input",()=>{selected=0;paint();});
document.addEventListener("keydown",event=>{
 const target=event.target;
 const typing=target instanceof HTMLElement&&Boolean(target.closest("input,textarea,[contenteditable=true]"));
 if(!palette.hidden){
  if(event.key==="Escape"){event.preventDefault();hide();}
  else if(event.key==="ArrowDown"){event.preventDefault();selected=(selected+1)%Math.max(1,matches.length);paint();}
  else if(event.key==="ArrowUp"){event.preventDefault();selected=(selected-1+Math.max(1,matches.length))%Math.max(1,matches.length);paint();}
  else if(event.key==="Enter"){event.preventDefault();navigate(matches[selected]);}
  else if(event.key==="Tab"){event.preventDefault();input.focus();}
  return;
 }
 if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"){event.preventDefault();show();}
 else if(event.key==="/"&&!typing&&!event.ctrlKey&&!event.metaKey){event.preventDefault();show();}
});

// Gently move the hero illustration with the pointer. Motion opt-out respected.
const art=document.querySelector(".art-stage");
if(art&&!reduceMotion&&window.matchMedia("(hover:hover)").matches){
 const surface=document.querySelector(".bento-art");
 let raf=0;
 surface.addEventListener("pointermove",event=>{
  const rect=surface.getBoundingClientRect();
  const x=(event.clientX-rect.left)/rect.width-.5;
  const y=(event.clientY-rect.top)/rect.height-.5;
  if(raf)cancelAnimationFrame(raf);
  raf=requestAnimationFrame(()=>{art.style.transform="translate("+(-x*15)+"px,"+(-y*15)+"px)";});
 });
 surface.addEventListener("pointerleave",()=>{if(raf)cancelAnimationFrame(raf);art.style.transform="";});
}


// Interactive 3D hover for actual project cards — navigation still works normally.
if(!reduceMotion && window.matchMedia("(hover:hover) and (pointer:fine)").matches){
 document.querySelectorAll(".project-card").forEach(card=>{
   let frame=0;
   card.addEventListener("pointermove",e=>{
     const r=card.getBoundingClientRect();
     const px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
     if(frame)cancelAnimationFrame(frame);
     frame=requestAnimationFrame(()=>{
       card.style.setProperty("--tilt-y",((px-.5)*11).toFixed(2)+"deg");
       card.style.setProperty("--tilt-x",((.5-py)*11).toFixed(2)+"deg");
       card.style.setProperty("--shine-x",(px*100).toFixed(0)+"%");
       card.style.setProperty("--shine-y",(py*100).toFixed(0)+"%");
     });
   },{passive:true});
   card.addEventListener("pointerleave",()=>{
     if(frame)cancelAnimationFrame(frame);
     card.style.setProperty("--tilt-x","0deg");card.style.setProperty("--tilt-y","0deg");
   },{passive:true});
 });
}

// Experience accordion — grounded, short summaries that complement the resume.
const timelineDescriptions=[
 "Current undergraduate study in computer science, with a focus on Java, data structures, algorithms and practical engineering.",
 "Campus media, reporting, photography, event coverage, and supporting digital and organizational operations.",
 "IT systems support, troubleshooting and network-support workflows.",
 "Network infrastructure and operations experience supporting cable-network services.",
 "Early hands-on exposure to IT support and network operations."
];
document.querySelectorAll(".timeline-row").forEach((row,index)=>{
 const content=row.querySelector("div");
 const title=content?.querySelector("h3");
 if(!content||!title)return;
 const button=document.createElement("button");
 button.className="timeline-toggle";button.type="button";
 button.setAttribute("aria-expanded","false");
 button.setAttribute("aria-label","More about "+title.textContent);
 const plus=document.createElement("span");plus.className="plus";plus.textContent="+";
 button.append(title,plus);content.insertBefore(button,content.firstChild);
 const detail=document.createElement("div");
 detail.className="timeline-detail";detail.hidden=true;
 detail.textContent=timelineDescriptions[index]||"Part of my journey into computer science.";
 row.appendChild(detail);
 button.addEventListener("click",()=>{
   const open=button.getAttribute("aria-expanded")==="true";
   button.setAttribute("aria-expanded",String(!open));plus.textContent=open?"+":"−";
   detail.hidden=open;
 });
});

// Scroll reveal: progressive enhancement; reduced-motion users see everything immediately.
if(!reduceMotion && "IntersectionObserver" in window){
 const targets=document.querySelectorAll(".section-head,.project-card,.tool-workspace,.story-main,.mini-card,.focus-copy,.timeline-row");
 const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}});
 },{rootMargin:"0px 0px 35px 0px",threshold:0.04});
 targets.forEach(el=>{el.classList.add("reveal");observer.observe(el);});
}
