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
      const symbol=document.createElement("span");symbol.className="tool-symbol";symbol.textContent=initials(t.name);
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
})();
