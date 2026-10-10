"use strict";
const log=document.getElementById("log"),input=document.getElementById("command");
const count=document.getElementById("operations");let operations=0;
function line(text,style="dim"){const p=document.createElement("p");p.className=style;p.textContent=text;log.appendChild(p);log.scrollTop=log.scrollHeight}
function arithmetic(expression){
  if(expression.length>180||!/^[\d\s.+\-*/()%]+$/.test(expression))throw Error("Only bounded arithmetic is allowed");
  const tokens=expression.match(/\d+(?:\.\d+)?|[()+\-*/%]/g)||[];let i=0;
  function factor(depth=0){if(depth>20)throw Error("Expression too deep");const t=tokens[i++];if(t==="+")return factor(depth+1);if(t==="-")return -factor(depth+1);if(t==="("){const v=expr(depth+1);if(tokens[i++]!==")")throw Error("Missing closing parenthesis");return v}if(t===undefined||!/^\d/.test(t))throw Error("Invalid expression");const n=Number(t);if(!Number.isFinite(n)||Math.abs(n)>1e12)throw Error("Number too large");return n}
  function term(depth){let v=factor(depth);while(["*","/","%"].includes(tokens[i])){const op=tokens[i++],r=factor(depth);if((op==="/"||op==="%")&&r===0)throw Error("Division by zero");v=op==="*"?v*r:op==="/"?v/r:v%r;if(!Number.isFinite(v)||Math.abs(v)>1e15)throw Error("Result too large")}return v}
  function expr(depth=0){let v=term(depth);while(["+","-"].includes(tokens[i])){const op=tokens[i++],r=term(depth);v=op==="+"?v+r:v-r}return v}
  const v=expr();if(i!==tokens.length)throw Error("Invalid trailing input");return v;
}
function run(command){operations++;count.textContent=String(operations).padStart(3,"0");line("> "+command,"user");let tool="help",output;
  try{
    const match=command.match(/^\s*(calc|calculate|math|stats|word count|count words|tasks|extract tasks)\s*:\s*([\s\S]*)$/i);
    if(!match){output="Use: calc: (14 + 6) / 2 | stats: some words | tasks: TODO: Write tests";}
    else{const prefix=match[1].toLowerCase(),payload=match[2];
      if(["calc","calculate","math"].includes(prefix)){tool="calculator";output=arithmetic(payload)}
      else if(["stats","word count","count words"].includes(prefix)){tool="word_stats";const words=payload.match(/\b[\w'-]+\b/g)||[];output={words:words.length,characters:payload.length,unique_words:new Set(words.map(w=>w.toLowerCase())).size}}
      else{tool="task_extractor";output=payload.split(/\r?\n/).map(s=>s.match(/^\s*(?:[-*]\s*)?(?:\[ \]\s*)?(?:TODO\s*:?\s*|TASK\s*:?\s*)(.+)$/i)).filter(Boolean).map(m=>m[1].trim())}
    }
    line("[ROUTER] "+tool,"dim");line("[RESULT] "+JSON.stringify(output),"good");
  }catch(e){line("[ERROR] "+e.message,"bad")}
}
document.getElementById("command-form").addEventListener("submit",e=>{e.preventDefault();if(input.value.trim())run(input.value.trim());input.value="";input.focus()});
document.querySelectorAll("[data-command]").forEach(b=>b.addEventListener("click",()=>{run(b.dataset.command);input.focus()}));
document.getElementById("clear").addEventListener("click",()=>{log.textContent="";line("[READY] Log cleared. Awaiting instruction.","good")});
