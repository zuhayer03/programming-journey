"use strict";
/* Z✳F TOOL UNIVERSE — searchable, keyboard-accessible, locally rendered.
   Categories describe an evolving toolkit, not claims of expert mastery. */
(() => {
  const tools = [
    ["Java","core","Programming language for object-oriented software, sorting projects and DSA.","Core learning"],
    ["Python","core","Scripting, local command-line applications, monitoring and automation.","Working toolkit"],
    ["Git","core","Version control, changes and incremental development.","Working toolkit"],
    ["GitHub","core","Source control, pull requests, portfolio publishing and GitHub Actions.","Working toolkit"],
    ["VS Code","core","Editor for programming and development workflows.","Working toolkit"],
    ["IntelliJ IDEA","core","Java development and code navigation.","Working toolkit"],

    ["Cursor","coding","AI-assisted editor for prototyping and development workflows.","In toolkit"],
    ["GitHub Copilot","coding","Contextual code suggestions during development.","In toolkit"],
    ["Claude Code","coding","AI coding assistant for exploring and refining software.","In toolkit"],
    ["Google Antigravity","coding","AI-assisted development environment and experimentation.","Exploring"],

    ["LangGraph","agents","Graph-based stateful agent orchestration concepts.","Exploring"],
    ["Google ADK","agents","Google Agent Development Kit for agent workflows.","Exploring"],
    ["LiveKit Agents","agents","Voice and real-time agent development framework.","Exploring"],
    ["Browser Use","agents","Browser interaction and automation for agents.","Exploring"],
    ["Composio","agents","Tool and app integrations for agent workflows.","Exploring"],
    ["Paperclip","agents","Agent and workflow experimentation.","Exploring"],

    ["Hugging Face","infra","Models, datasets and tools in the open machine learning ecosystem.","Exploring"],
    ["Ollama","infra","Run and experiment with local models.","Exploring"],
    ["Supabase AI","infra","AI-related workflows and application infrastructure.","Exploring"],
    ["E2B","infra","Sandboxed runtime environments for AI code execution.","Exploring"],

    ["CodeRabbit","quality","AI-assisted pull request reviews and code quality suggestions.","In toolkit"],
    ["LangSmith","quality","Tracing and evaluation for LLM/agent workflows.","Exploring"],
    ["Sentry Seer","quality","AI-assisted issue and error investigation.","Exploring"],

    ["Figma","creative","Interface design, visual exploration and prototyping.","In toolkit"],
    ["Notion","creative","Project organization and knowledge capture.","In toolkit"],
    ["NotebookLM","creative","Research, lecture notes and source-grounded study.","In toolkit"],
    ["Perplexity","creative","Search-assisted discovery and exploratory research.","In toolkit"],

    ["LeetCode","practice","Programming exercises and problem-solving practice.","Practice"],
    ["NeetCode","practice","Structured interview preparation and algorithm patterns.","Practice"]
  ].map(([name,category,description,status]) => ({name,category,description,status}));

  const labels={core:"PROGRAMMING / FOUNDATIONS",coding:"AI-ASSISTED CODING",agents:"AGENT / AUTOMATION",infra:"MODELS / INFRASTRUCTURE",quality:"REVIEW / OBSERVABILITY",creative:"DESIGN / RESEARCH / WORKFLOW",practice:"PRACTICE / PROBLEM SOLVING"};
  const list=document.getElementById("tool-list");
  const input=document.getElementById("tool-search");
  const filters=[...document.querySelectorAll(".tool-filter")];
  const inspectorName=document.getElementById("inspector-name");
  const inspectorDescription=document.getElementById("inspector-description");
  const inspectorCategory=document.getElementById("inspector-category");
  const inspectorTag=document.querySelector(".inspector-tag");
  const inspector=document.getElementById("tool-inspector");
  if(!list||!input)return;
  let category="all",selected="Java",renderCount=0;
  const initials=(n)=>n.split(/[\s-]+/).map(x=>x[0]).slice(0,2).join("").toUpperCase();
  const logoSources={
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  "IntelliJ IDEA": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg",
  "Cursor": "https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/cursor.svg",
  "GitHub Copilot": "https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/githubcopilot.svg",
  "Claude Code": "https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/claude.svg",
  "Google Antigravity": "https://www.google.com/s2/favicons?domain=antigravity.google&sz=128",
  "LangGraph": "https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/langgraph.svg",
  "Google ADK": "https://www.google.com/s2/favicons?domain=google.com&sz=128",
  "LiveKit Agents": "https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/livekit.svg",
  "Browser Use": "https://www.google.com/s2/favicons?domain=browser-use.com&sz=128",
  "Composio": "https://www.google.com/s2/favicons?domain=composio.dev&sz=128",
  "Paperclip": "https://www.google.com/s2/favicons?domain=paperclip.ing&sz=128",
  "Hugging Face": "https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/huggingface.svg",
  "Ollama": "https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/ollama.svg",
  "Supabase AI": "https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/supabase.svg",
  "E2B": "https://www.google.com/s2/favicons?domain=e2b.dev&sz=128",
  "CodeRabbit": "https://www.google.com/s2/favicons?domain=coderabbit.ai&sz=128",
  "LangSmith": "https://www.google.com/s2/favicons?domain=smith.langchain.com&sz=128",
  "Sentry Seer": "https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/sentry.svg",
  "Figma": "https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/figma.svg",
  "Notion": "https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/notion.svg",
  "NotebookLM": "https://www.google.com/s2/favicons?domain=notebooklm.google.com&sz=128",
  "Perplexity": "https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/perplexity.svg",
  "LeetCode": "https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/leetcode.svg",
  "NeetCode": "https://www.google.com/s2/favicons?domain=neetcode.io&sz=128"
};
  function createLogo(name){
    const icon=document.createElement("img");
    icon.className="tool-logo";
    icon.src=logoSources[name];icon.alt="";icon.loading="lazy";icon.decoding="async";
    icon.width=30;icon.height=30;
    return icon;
  }
  function selectTool(name){
    const item=tools.find(t=>t.name===name);
    if(!item)return;
    selected=item.name;inspectorName.textContent=item.name;
    inspectorDescription.textContent=item.description;
    inspectorCategory.textContent=labels[item.category];
    inspectorTag.textContent=item.status.toUpperCase()+" / "+String(tools.indexOf(item)+1).padStart(2,"0");
    document.querySelectorAll("[data-tool]").forEach(el=>{
      const active=el.dataset.tool===name;
      el.classList.toggle("is-selected",active);
      if(el.matches("button"))el.setAttribute("aria-pressed",String(active));
    });
    inspector.classList.remove("inspector-flash");
    void inspector.offsetWidth;
    inspector.classList.add("inspector-flash");
  }
  function draw(){
    const query=input.value.trim().toLowerCase();
    const results=tools.filter(t=>(category==="all"||t.category===category)&&
      (t.name.toLowerCase().includes(query)||t.description.toLowerCase().includes(query)||labels[t.category].toLowerCase().includes(query)));
    const fragment=document.createDocumentFragment();
    for(const t of results){
      const button=document.createElement("button");
      button.type="button";button.className="tool-chip"+(t.name===selected?" is-selected":"");
      button.dataset.tool=t.name;button.setAttribute("aria-pressed",String(t.name===selected));
      button.title=t.description;
      const symbol=document.createElement("span");symbol.className="tool-symbol";
      const icon=createLogo(t.name);
      icon.addEventListener("error",()=>{icon.remove();symbol.textContent=initials(t.name);},{once:true});
      symbol.appendChild(icon);
      const meta=document.createElement("span");meta.className="tool-chip-meta";
      const strong=document.createElement("strong");strong.textContent=t.name;
      const small=document.createElement("small");small.textContent=t.status;
      meta.append(strong,small);
      const arrow=document.createElement("span");arrow.className="tool-chip-arrow";arrow.textContent="↗";arrow.setAttribute("aria-hidden","true");
      button.append(symbol,meta,arrow);
      button.addEventListener("click",()=>selectTool(t.name));
      fragment.appendChild(button);
    }
    list.replaceChildren(fragment);
    if(!results.length){const empty=document.createElement("div");empty.className="tools-empty";empty.textContent="No matching tool. Try another search or category.";list.appendChild(empty);}
    document.getElementById("tool-results").textContent=results.length+" / "+tools.length+" TOOLS";
    document.getElementById("tool-count").textContent=tools.length+" TOOLS & PLATFORMS";
    renderCount++;
  }
  filters.forEach(button=>button.addEventListener("click",()=>{
    category=button.dataset.category;
    filters.forEach(b=>{const active=b===button;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});
    draw();
  }));
  input.addEventListener("input",draw);
  document.querySelectorAll(".orbit-node").forEach(button=>{
    const fallback=button.textContent;
    const image=createLogo(button.dataset.tool);
    image.classList.add("orbit-logo");
    image.addEventListener("error",()=>{image.remove();button.textContent=fallback;},{once:true});
    button.replaceChildren(image);
  });
  document.querySelectorAll(".orbit-node").forEach(button=>button.addEventListener("click",()=>{
    selectTool(button.dataset.tool);
    if(window.matchMedia("(max-width:900px)").matches)inspector.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth",block:"nearest"});
  }));
  selectTool(selected);draw();

  // CSS 3D orbit: pointer motion changes only the presentation, never selection.
  const scene=document.getElementById("tool-scene");
  if(scene && !window.matchMedia("(prefers-reduced-motion:reduce)").matches && window.matchMedia("(hover:hover)").matches){
    let last=0;
    scene.addEventListener("pointermove",(e)=>{
      const r=scene.getBoundingClientRect();
      const x=((e.clientX-r.left)/r.width-.5)*15;
      const y=((e.clientY-r.top)/r.height-.5)*-12;
      if(last)cancelAnimationFrame(last);
      last=requestAnimationFrame(()=>{
        scene.style.setProperty("--scene-x",y+"deg");
        scene.style.setProperty("--scene-y",x+"deg");
      });
    });
    scene.addEventListener("pointerleave",()=>{scene.style.setProperty("--scene-x","0deg");scene.style.setProperty("--scene-y","0deg");});
  }

  // STACK ARCHITECT — users build a local selection. Never implies those tools
  // are all part of a completed or deployed engineering project.
  const stackList=[];
  const presets={
    java:["Java","Git","GitHub","IntelliJ IDEA","LeetCode"],
    agents:["Python","Cursor","LangGraph","Hugging Face","E2B","LangSmith"],
    product:["Figma","Notion","Python","GitHub","Supabase AI"]
  };
  const stackMax=7;
  const stackVisual=document.getElementById("stack-visual");
  const stackFeedback=document.getElementById("stack-feedback");
  const stackCount=document.getElementById("stack-count");
  const stackLabel=document.getElementById("stack-label");
  const addButton=document.getElementById("stack-add");
  let activePreset="";
  const setFeedback=(message)=>{stackFeedback.textContent=message;};
  const setPresetActive=()=>{
    document.querySelectorAll(".stack-preset").forEach(button=>{
      const active=button.dataset.stackPreset===activePreset;
      button.classList.toggle("active",active);
      button.setAttribute("aria-pressed",String(active));
    });
  };
  function renderStack(){
    stackVisual.replaceChildren();
    stackCount.textContent=stackList.length+" / "+stackMax;
    stackLabel.textContent=activePreset?({java:"JAVA / DSA",agents:"AGENT PROTOTYPE",product:"PRODUCT WORKFLOW"})[activePreset]:"CUSTOM";
    if(!stackList.length){
      const p=document.createElement("p");p.className="stack-empty";
      p.textContent="Select a mission or add tools above to construct your stack.";
      stackVisual.appendChild(p);
    }
    stackList.forEach((name,i)=>{
      const block=document.createElement("div");block.className="stack-step";
      const count=document.createElement("span");count.className="stack-step-number";count.textContent=String(i+1).padStart(2,"0");
      const logo=createLogo(name);logo.classList.add("stack-step-logo");
      logo.addEventListener("error",()=>{logo.replaceWith(document.createTextNode(initials(name)));},{once:true});
      const label=document.createElement("strong");label.textContent=name;
      const remove=document.createElement("button");remove.type="button";remove.textContent="×";
      remove.className="stack-step-remove";remove.setAttribute("aria-label","Remove "+name+" from stack");
      remove.addEventListener("click",()=>{
        stackList.splice(i,1);activePreset="";setPresetActive();renderStack();setFeedback(name+" removed.");
      });
      block.append(count,logo,label,remove);stackVisual.appendChild(block);
      if(i<stackList.length-1){const arrow=document.createElement("span");arrow.className="stack-flow-arrow";arrow.textContent="→";stackVisual.appendChild(arrow);}
    });
    if(addButton){
      const inStack=stackList.includes(selected);
      addButton.disabled=inStack||stackList.length>=stackMax;
      addButton.textContent=inStack?"✓ ALREADY INCLUDED":stackList.length>=stackMax?"MAXIMUM 7 TOOLS":"＋ ADD TO STACK";
    }
  }
  if(addButton) addButton.addEventListener("click",()=>{
    if(stackList.includes(selected)){setFeedback("This tool is already in your stack.");return;}
    if(stackList.length>=stackMax){setFeedback("Maximum 7 tools. Remove one first.");return;}
    stackList.push(selected);activePreset="";setPresetActive();renderStack();setFeedback(selected+" added.");
  });
  // Keep the add control synced with the currently inspected tool.
  const originalSelectTool=selectTool;
  // Existing selectTool is a declared function and isn't reassigned; update
  // the add button with event delegation after tool selection settles.
  document.querySelectorAll(".orbit-node").forEach(button=>
    button.addEventListener("click",renderStack));
  list.addEventListener("click",(e)=>{
    if(e.target instanceof Element&&e.target.closest(".tool-chip"))renderStack();
  });
  document.querySelectorAll(".stack-preset").forEach(button=>button.addEventListener("click",()=>{
    const type=button.dataset.stackPreset;
    stackList.splice(0,stackList.length,...presets[type]);
    activePreset=type;setPresetActive();renderStack();
    setFeedback("Preset loaded. Add or remove tools to customize.");
  }));
  document.getElementById("stack-clear")?.addEventListener("click",()=>{
    stackList.splice(0);activePreset="";setPresetActive();renderStack();setFeedback("Workflow cleared.");
  });
  const stackText=()=>stackList.length?"Z✳F Tool Workflow: "+stackList.join(" → "):"";
  async function copyStack(){
    const message=stackText();
    if(!message){setFeedback("Select at least one tool.");return;}
    try{
      if(!navigator.clipboard?.writeText)throw Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(message);
      setFeedback("Stack copied! Paste it into your notes or README.");
    }catch(_){
      const t=document.createElement("textarea");t.value=message;t.style.cssText="position:fixed;top:-1000px;opacity:0";
      document.body.appendChild(t);t.focus();t.select();
      const ok=document.execCommand("copy");t.remove();
      setFeedback(ok?"Stack copied!":"Copy blocked by your browser. Tool sequence: "+stackList.join(" → "));
    }
  }
  document.getElementById("stack-copy")?.addEventListener("click",copyStack);
  const esc=(s)=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  document.getElementById("stack-svg")?.addEventListener("click",()=>{
    if(!stackList.length){setFeedback("Select tools before exporting.");return;}
    const width=1160,height=340;
    let cards="";
    const perRow=4,w=260,h=80,gap=22;
    stackList.forEach((name,i)=>{
      const col=i%perRow,row=Math.floor(i/perRow);
      const x=28+col*(w+gap),y=94+row*(h+35);
      const kind=tools.find(t=>t.name===name)?.category||"core";
      const accent=({core:"#D9FF65",coding:"#BDA6FF",agents:"#94EACC",infra:"#82CBDD",quality:"#F5A7C7",creative:"#F8B78E",practice:"#A0D989"})[kind];
      cards+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="12" fill="#213129" stroke="'+accent+'" stroke-width="2"/>';
      cards+='<text x="'+(x+15)+'" y="'+(y+26)+'" font-size="14" font-family="monospace" fill="'+accent+'">'+String(i+1).padStart(2,"0")+' / '+esc(kind.toUpperCase())+'</text>';
      cards+='<text x="'+(x+15)+'" y="'+(y+58)+'" font-size="21" font-weight="700" font-family="Arial,sans-serif" fill="#F6FBEF">'+esc(name)+'</text>';
    });
    const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'" viewBox="0 0 '+width+' '+height+'">'+
      '<rect width="'+width+'" height="'+height+'" rx="18" fill="#111C17"/>'+
      '<text x="28" y="45" font-size="27" font-weight="700" font-family="Arial,sans-serif" fill="#D9FF65">Z✳F / STACK ARCHITECT</text>'+
      '<text x="1105" y="45" text-anchor="end" font-size="14" font-family="monospace" fill="#C1D7C2">'+stackList.length+' TOOLS</text>'+
      cards+'<text x="28" y="317" font-family="monospace" font-size="12" fill="#9DB5A4">INTERACTIVE DESIGN / NOT A CLAIM OF IMPLEMENTATION OR EXPERTISE</text>'+
      '</svg>';
    const blob=new Blob([svg],{type:"image/svg+xml;charset=utf-8"});
    const url=URL.createObjectURL(blob);const anchor=document.createElement("a");
    anchor.href=url;anchor.download="zf-custom-tool-stack.svg";
    document.body.appendChild(anchor);anchor.click();anchor.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1500);
    setFeedback("SVG exported to your downloads.");
  });
  setPresetActive();renderStack();

})();
