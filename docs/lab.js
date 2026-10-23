"use strict";
const $ = id => document.getElementById(id);
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Live algorithm walkthrough: actual sorting steps are computed locally in JavaScript.
let values=[],sortToken=0;
const rnd=()=>Math.floor(12+Math.random()*88);
function shuffle(){
  sortToken++;
  values=Array.from({length:16},rnd);
  $("sort-comparisons").textContent="0"; $("sort-swaps").textContent="0";
  $("sort-size").textContent=String(values.length);
  $("sort-progress").textContent="READY TO RUN";
  $("sort-start").disabled=false;
  renderBars(values,[],false);
}
function renderBars(array,active,completed){
  const root=$("sort-bars");
  root.replaceChildren();
  array.forEach((n,i)=>{
    const bar=document.createElement("div");bar.className="bar"+(completed?" finished":active.includes(i)?" comparing":"");
    bar.style.height=n+"%";
    bar.title="Value "+n;
    root.appendChild(bar);
  });
}
function makeSortSteps(source,type){
  const arr=[...source],steps=[];let compares=0,writes=0;
  const snap=(active=[])=>steps.push({arr:[...arr],active:[...active],compares,writes});
  const check=(i,j)=>{compares++;snap([i,j]);};
  const write=(i,v,j)=>{arr[i]=v;writes++;snap([i,...(j==null?[]:[j])]);};
  if(type==="bubble"){
    for(let i=0;i<arr.length-1;i++)for(let j=0;j<arr.length-i-1;j++){check(j,j+1);if(arr[j]>arr[j+1]){const x=arr[j];write(j,arr[j+1],j+1);write(j+1,x,j);}}
  }else if(type==="selection"){
    for(let i=0;i<arr.length-1;i++){let min=i;for(let j=i+1;j<arr.length;j++){check(min,j);if(arr[j]<arr[min])min=j;}if(min!==i){const x=arr[i];write(i,arr[min],min);write(min,x,i);}}
  }else{
    for(let i=1;i<arr.length;i++){const v=arr[i];let j=i-1;while(j>=0){check(j,j+1);if(arr[j]<=v)break;write(j+1,arr[j],j);j--;}write(j+1,v);}
  }
  snap();
  return steps;
}
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function runSort(){
  const token=++sortToken;
  $("sort-start").disabled=true;
  $("sort-shuffle").disabled=false;
  const steps=makeSortSteps(values,$("sort-algorithm").value);
  const ms=({1:110,2:40,3:12})[$("sort-speed").value]||40;
  $("sort-progress").textContent="SORTING...";
  for(let i=0;i<steps.length;i++){
    if(token!==sortToken)return;
    const step=steps[i];renderBars(step.arr,step.active,false);
    $("sort-comparisons").textContent=String(step.compares);
    $("sort-swaps").textContent=String(step.writes);
    if(!reduced)await sleep(ms);
    else if(i<steps.length-1)continue;
  }
  if(token!==sortToken)return;
  values=[...steps[steps.length-1].arr];
  renderBars(values,[],true);
  $("sort-progress").textContent="SORT COMPLETE ✓";
  $("sort-start").disabled=false;
}
$("sort-start").addEventListener("click",runSort);
$("sort-shuffle").addEventListener("click",shuffle);
$("sort-algorithm").addEventListener("change",()=>{sortToken++;$("sort-start").disabled=false;$("sort-progress").textContent="ALGORITHM CHANGED";});
$("sort-speed").addEventListener("input",()=>{$("speed-value").textContent=({1:"Slow",2:"Medium",3:"Fast"})[$("sort-speed").value];});
shuffle();

// Synthetic documentation-only login data. No network calls, no user data.
let events=[];
const docIPs=["192.0.2.11","192.0.2.28","198.51.100.42","203.0.113.17"];
function newEvents(){
  const first=docIPs[Math.floor(Math.random()*docIPs.length)];
  events=[
    {time:"09:21:03",ip:first,state:"FAIL"},
    {time:"09:21:27",ip:docIPs[1],state:"SUCCESS"},
    {time:"09:22:14",ip:first,state:"FAIL"},
    {time:"09:23:41",ip:docIPs[2],state:"FAIL"},
    {time:"09:24:20",ip:first,state:"FAIL"},
    {time:"09:25:39",ip:docIPs[3],state:"SUCCESS"},
    {time:"09:26:03",ip:docIPs[2],state:"FAIL"},
    {time:"09:27:16",ip:docIPs[1],state:"FAIL"}
  ];
  const root=$("event-stream");root.replaceChildren();
  events.forEach(e=>{
    const row=document.createElement("div");row.className="event-row "+(e.state==="FAIL"?"fail":"success");
    const t=document.createElement("span");t.textContent=e.time;
    const ip=document.createElement("span");ip.textContent=e.ip;
    const st=document.createElement("span");st.className="event-status";st.textContent=e.state==="FAIL"?"✕ LOGIN FAILED":"✓ SUCCESS";
    row.append(t,ip,st);root.appendChild(row);
  });
  $("events-valid").textContent="—";$("events-alerts").textContent="—";
  $("alerts-list").textContent="RUN ANALYSIS TO SEE RESULTS";
}
function analyze(){
 const counts=new Map();
 for(const e of events)if(e.state==="FAIL")counts.set(e.ip,(counts.get(e.ip)||0)+1);
 const threshold=Number($("alert-threshold").value);
 const flagged=[...counts].filter(([_,n])=>n>=threshold);
 $("events-valid").textContent=String(events.length);
 $("events-alerts").textContent=String(flagged.length);
 const root=$("alerts-list");root.replaceChildren();
 if(!flagged.length){const p=document.createElement("div");p.className="clean";p.textContent="✓ No IPs crossed the selected threshold.";root.appendChild(p);}
 else for(const [ip,count] of flagged){const row=document.createElement("div");row.className="alert";row.textContent="⚠ "+ip+" / "+count+" failed attempts";root.appendChild(row);}
}
$("logs-analyze").addEventListener("click",analyze);
$("logs-regenerate").addEventListener("click",()=>{newEvents();});
$("alert-threshold").addEventListener("change",()=>{if($("events-valid").textContent!=="—")analyze();});
newEvents();

// Sample budgeting dashboard (no persistence, network, or personal financial data).
const budgetIds=["budget-limit","budget-housing","budget-food","budget-other"];
function currency(n){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);}
function nonnegative(id){const n=Number($(id).value);return Number.isFinite(n)?Math.min(Math.max(n,0),1e6):0;}
function updateBudget(){
  const limit=nonnegative("budget-limit");
  const parts=[["HOUSING",nonnegative("budget-housing"),"#dbff69"],["FOOD",nonnegative("budget-food"),"#ffa46f"],["OTHER",nonnegative("budget-other"),"#a9a0ff"]];
  const spent=parts.reduce((sum,x)=>sum+x[1],0),left=limit-spent;
  $("budget-remaining").textContent=currency(left);
  $("budget-remaining").classList.toggle("negative",left<0);
  $("budget-state").textContent=left<0?"EXCEEDS THE SAMPLE BUDGET":"WITHIN THE SAMPLE BUDGET";
  $("budget-total").textContent=currency(spent);
  $("budget-budget-label").textContent=currency(limit);
  const fill=$("budget-meter-fill");fill.style.width=(limit>0?Math.min(100,(spent/limit)*100):(spent>0?100:0))+"%";fill.classList.toggle("over",spent>limit);
  const root=$("budget-breakdown");root.replaceChildren();
  for(const [name,value,color] of parts){
    const line=document.createElement("div");line.className="budget-category";
    const label=document.createElement("span"),mark=document.createElement("i");mark.style.background=color;label.append(mark,document.createTextNode(name));
    const amount=document.createElement("b");amount.textContent=currency(value);
    line.append(label,amount);root.appendChild(line);
  }
}
for(const id of budgetIds)$(id).addEventListener("input",updateBudget);
$("budget-reset").addEventListener("click",()=>{
 const defaults={"budget-limit":1200,"budget-housing":450,"budget-food":240,"budget-other":160};
 for(const id of budgetIds)$(id).value=defaults[id];
 updateBudget();
});
updateBudget();

// Network Monitor: local, synthetic connectivity state machine. No socket or fetch API used.
let netRunToken=0;
const scenarios={
  healthy:[{name:"API",up:true,ms:24},{name:"DB",up:true,ms:42},{name:"EDGE",up:true,ms:31},{name:"WEB",up:true,ms:28}],
  degraded:[{name:"API",up:true,ms:157},{name:"DB",up:true,ms:480},{name:"EDGE",up:true,ms:230},{name:"WEB",up:true,ms:315}],
  partial:[{name:"API",up:true,ms:58},{name:"DB",up:false,ms:null},{name:"EDGE",up:false,ms:null},{name:"WEB",up:true,ms:73}]
};
const netDevices=[...document.querySelectorAll(".sim-device")];
function resetNetwork(){
  netRunToken++;
  netDevices.forEach(el=>{el.classList.remove("up","down","checking");el.querySelector("strong").textContent="?";});
  $("net-status").textContent="STANDING BY";
  $("net-up").textContent="—";$("net-down").textContent="—";$("net-latency").textContent="—";
  $("net-readout").textContent="Choose a scenario and run a local simulation.";
  $("net-run").disabled=false;
}
async function runNetwork(){
  const token=++netRunToken;
  const data=scenarios[$("net-scenario").value]||scenarios.healthy;
  resetNetwork();
  // reset increments the cancellation token: capture it again to keep this run authoritative.
  const current=++netRunToken;
  $("net-run").disabled=true;
  $("net-status").textContent="SIMULATING...";
  const results=[];
  for(let i=0;i<data.length;i++){
    if(current!==netRunToken)return;
    const el=netDevices[i],item=data[i];
    el.classList.add("checking");el.querySelector("strong").textContent="…";
    if(!reduced)await sleep(380);
    if(current!==netRunToken)return;
    el.classList.remove("checking");el.classList.add(item.up?"up":"down");
    el.querySelector("strong").textContent=item.up?"UP":"DOWN";
    results.push(item);
  }
  const up=results.filter(x=>x.up);
  const down=results.length-up.length;
  const avg=up.length?Math.round(up.reduce((s,x)=>s+x.ms,0)/up.length):null;
  $("net-up").textContent=String(up.length);
  $("net-down").textContent=String(down);
  $("net-latency").textContent=avg===null?"N/A":avg+" ms";
  $("net-status").textContent=down?"DEGRADED / SIMULATED":"ALL SYSTEMS UP / SIMULATED";
  const lines=results.map(x=>x.name+" : "+(x.up?"UP ("+x.ms+" ms)":"DOWN (simulated blocked / unreachable)"));
  $("net-readout").textContent=lines.join("\n");
  $("net-run").disabled=false;
}
$("net-run").addEventListener("click",runNetwork);
$("net-reset").addEventListener("click",resetNetwork);
$("net-scenario").addEventListener("change",resetNetwork);
resetNetwork();
