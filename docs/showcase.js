"use strict";
/* Z✳F Project Theater: local, accessible, keyboard-friendly project gallery.
   It only presents source code that already exists in the public repository. */
(() => {
  const dialog=document.getElementById("project-theater");
  const launch=document.getElementById("open-theater");
  if(!dialog||!launch||typeof dialog.showModal!=="function")return;
  const $=id=>document.getElementById(id);
  const base="https://github.com/zuhayer03/programming-journey/tree/main/projects/";
  const projects=[
    {key:"network",title:"NETWORK\nMONITOR",type:"01 / PYTHON · SYSTEMS",status:"WORKING STUDENT PROJECT",
      description:"A lightweight Python connectivity checker that records TCP host/port status and connection times. Reports can be exported as CSV and JSON.",
      detail:"TCP connections / CSV & JSON export",url:base+"network-monitor"},
    {key:"finance",title:"FINANCE\nTRACKER",type:"02 / PYTHON · UTILITIES",status:"WORKING STUDENT PROJECT",
      description:"A local finance CLI for sample expense data, category summaries, budgeting and generated SVG charts. No bank connection or forecasting claims.",
      detail:"Expense grouping / Budgets / SVG",url:base+"finance-tracker"},
    {key:"algo",title:"ALGO\nARENA",type:"03 / JAVA · ALGORITHMS",status:"IN DEVELOPMENT",
      description:"A Java console experiment comparing Bubble, Selection and Insertion Sort on repeatable inputs, with correctness checks and educational timing.",
      detail:"Sorting / Verification / Benchmark",url:base+"algoarena"},
    {key:"threat",title:"THREAT\nTRACE",type:"04 / JAVA · SECURITY",status:"FUNCTIONAL PROTOTYPE",
      description:"A rule-based Java security-log analyzer operating on synthetic CSV login events. Counts repeated failed authentication attempts by IP.",
      detail:"Synthetic auth logs / Threshold alerts",url:base+"threattrace"}
  ];
  let active=0,previousFocus=null;
  const dots=$("theater-dots");
  const make=(tag,className,text)=>{
    const n=document.createElement(tag);if(className)n.className=className;if(text!==undefined)n.textContent=text;return n;
  };
  projects.forEach((p,i)=>{
    const b=make("button","theater-dot");
    b.type="button";b.title=p.title.replace("\n"," ");
    b.setAttribute("aria-label","View "+p.title.replace("\n"," "));
    b.addEventListener("click",()=>render(i));dots.appendChild(b);
  });
  function buildArt(which){
    const root=$("theater-art");root.replaceChildren();
    const stage=make("div","cinema-art "+which);
    if(which==="network"){
      const orbit=make("div","cinema-network-orbit");
      orbit.appendChild(make("div","cinema-network-core","UP"));
      for(let i=0;i<4;i++)orbit.appendChild(make("i","cinema-network-dot n"+i));
      stage.appendChild(orbit);
    } else if(which==="finance"||which==="algo"){
      const bars=make("div",which==="finance"?"cinema-finance-bars":"cinema-algo-bars");
      const heights=which==="finance"?[43,59,38,83,68,92,57]:[52,85,26,72,48,95,32,77,63];
      heights.forEach((height,i)=>{const b=make("i","cinema-data-bar");b.style.height=height+"%";b.style.setProperty("--index",i);bars.appendChild(b);});
      stage.appendChild(bars);
      stage.appendChild(make("span","cinema-art-label",which==="algo"?"SORT / COMPARE / TEST":"SPEND / SUMMARIZE / PLOT"));
    } else {
      const shield=make("div","cinema-shield","!");
      stage.appendChild(shield);
      stage.appendChild(make("div","cinema-art-label","AUTH EVENTS / SAMPLE DATA"));
    }
    root.appendChild(stage);
  }
  function render(index){
    active=(index+projects.length)%projects.length;
    const p=projects[active];
    $("theater-number").textContent=String(active+1).padStart(2,"0")+" / 04";
    $("theater-type").textContent=p.type;
    $("theater-title").textContent=p.title;
    $("theater-description").textContent=p.description;
    $("theater-status").textContent=p.status;
    $("theater-detail").textContent=p.detail;
    $("theater-source").href=p.url;
    $("theater-main").dataset.project=p.key;
    [...dots.children].forEach((b,i)=>{
      const current=i===active;b.classList.toggle("active",current);
      b.setAttribute("aria-current",current?"true":"false");
    });
    buildArt(p.key);
  }
  function open(){
    previousFocus=document.activeElement;render(active);dialog.showModal();$("theater-close").focus();
  }
  launch.addEventListener("click",open);
  $("theater-close").addEventListener("click",()=>dialog.close());
  $("theater-prev").addEventListener("click",()=>render(active-1));
  $("theater-next").addEventListener("click",()=>render(active+1));
  dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener("keydown",e=>{
    if(e.key==="ArrowRight"){e.preventDefault();render(active+1);}
    if(e.key==="ArrowLeft"){e.preventDefault();render(active-1);}
  });
  dialog.addEventListener("close",()=>previousFocus?.focus?.());
})();
