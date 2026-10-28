"use strict";
(() => {
 const tools=[{"name":"Java","category":"core","description":"Programming language for object-oriented software, sorting projects and DSA.","status":"Core learning","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg","url":"https://www.java.com"},{"name":"Python","category":"core","description":"Scripting, local command-line applications, monitoring and automation.","status":"Working toolkit","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg","url":"https://www.python.org"},{"name":"Git","category":"core","description":"Version control, changes and incremental development.","status":"Working toolkit","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg","url":"https://git-scm.com"},{"name":"GitHub","category":"core","description":"Source control, pull requests, portfolio publishing and GitHub Actions.","status":"Working toolkit","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg","url":"https://github.com"},{"name":"VS Code","category":"core","description":"Editor for programming and development workflows.","status":"Working toolkit","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg","url":"https://code.visualstudio.com"},{"name":"IntelliJ IDEA","category":"core","description":"Java development and code navigation.","status":"Working toolkit","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg","url":"https://www.jetbrains.com/idea/"},{"name":"Cursor","category":"coding","description":"AI-assisted editor for prototyping and development workflows.","status":"In toolkit","logo":"https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/cursor.svg","url":"https://cursor.com"},{"name":"GitHub Copilot","category":"coding","description":"Contextual code suggestions during development.","status":"In toolkit","logo":"https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/githubcopilot.svg","url":"https://github.com/features/copilot"},{"name":"Claude Code","category":"coding","description":"AI coding assistant for exploring and refining software.","status":"In toolkit","logo":"https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/claude.svg","url":"https://www.anthropic.com/claude-code"},{"name":"Google Antigravity","category":"coding","description":"AI-assisted development environment and experimentation.","status":"Exploring","logo":"https://www.google.com/s2/favicons?domain=antigravity.google&sz=128","url":"https://antigravity.google"},{"name":"LangGraph","category":"agents","description":"Graph-based stateful agent orchestration concepts.","status":"Exploring","logo":"https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/langgraph.svg","url":"https://www.langchain.com/langgraph"},{"name":"Google ADK","category":"agents","description":"Google Agent Development Kit for agent workflows.","status":"Exploring","logo":"https://www.google.com/s2/favicons?domain=google.com&sz=128","url":"https://google.github.io/adk-docs/"},{"name":"LiveKit Agents","category":"agents","description":"Voice and real-time agent development framework.","status":"Exploring","logo":"https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/livekit.svg","url":"https://livekit.io"},{"name":"Browser Use","category":"agents","description":"Browser interaction and automation for agents.","status":"Exploring","logo":"https://www.google.com/s2/favicons?domain=browser-use.com&sz=128","url":"https://browser-use.com"},{"name":"Composio","category":"agents","description":"Tool and app integrations for agent workflows.","status":"Exploring","logo":"https://www.google.com/s2/favicons?domain=composio.dev&sz=128","url":"https://composio.dev"},{"name":"Paperclip","category":"agents","description":"Agent and workflow experimentation.","status":"Exploring","logo":"https://www.google.com/s2/favicons?domain=paperclip.ing&sz=128","url":"https://paperclip.ing"},{"name":"Hugging Face","category":"infra","description":"Models, datasets and tools in the open machine learning ecosystem.","status":"Exploring","logo":"https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/huggingface.svg","url":"https://huggingface.co"},{"name":"Ollama","category":"infra","description":"Run and experiment with local models.","status":"Exploring","logo":"https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/ollama.svg","url":"https://ollama.com"},{"name":"Supabase AI","category":"infra","description":"AI-related workflows and application infrastructure.","status":"Exploring","logo":"https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/supabase.svg","url":"https://supabase.com"},{"name":"E2B","category":"infra","description":"Sandboxed runtime environments for AI code execution.","status":"Exploring","logo":"https://www.google.com/s2/favicons?domain=e2b.dev&sz=128","url":"https://e2b.dev"},{"name":"CodeRabbit","category":"quality","description":"AI-assisted pull request reviews and code quality suggestions.","status":"In toolkit","logo":"https://www.google.com/s2/favicons?domain=coderabbit.ai&sz=128","url":"https://www.coderabbit.ai"},{"name":"LangSmith","category":"quality","description":"Tracing and evaluation for LLM/agent workflows.","status":"Exploring","logo":"https://www.google.com/s2/favicons?domain=smith.langchain.com&sz=128","url":"https://smith.langchain.com"},{"name":"Sentry Seer","category":"quality","description":"AI-assisted issue and error investigation.","status":"Exploring","logo":"https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/sentry.svg","url":"https://sentry.io"},{"name":"Figma","category":"creative","description":"Interface design, visual exploration and prototyping.","status":"In toolkit","logo":"https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/figma.svg","url":"https://www.figma.com"},{"name":"Notion","category":"creative","description":"Project organization and knowledge capture.","status":"In toolkit","logo":"https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/notion.svg","url":"https://www.notion.so"},{"name":"NotebookLM","category":"creative","description":"Research, lecture notes and source-grounded study.","status":"In toolkit","logo":"https://www.google.com/s2/favicons?domain=notebooklm.google.com&sz=128","url":"https://notebooklm.google.com"},{"name":"Perplexity","category":"creative","description":"Search-assisted discovery and exploratory research.","status":"In toolkit","logo":"https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/perplexity.svg","url":"https://www.perplexity.ai"},{"name":"LeetCode","category":"practice","description":"Programming exercises and problem-solving practice.","status":"Practice","logo":"https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/icons/leetcode.svg","url":"https://leetcode.com"},{"name":"NeetCode","category":"practice","description":"Structured interview preparation and algorithm patterns.","status":"Practice","logo":"https://www.google.com/s2/favicons?domain=neetcode.io&sz=128","url":"https://neetcode.io"}];
 const groups=[
  ["core","01","PROGRAMMING / DEVELOPMENT","#9b85fa","▰","Foundations","Java · Python · Git · Source control"],
  ["coding","02","AI-ASSISTED CODING","#5ea6ff","ϟ","Assisted Development","Faster iteration, solid foundations first"],
  ["agents","03","AGENTS / AUTOMATION","#4fd5ac","✧","Workflow Engineering","Agents · Orchestration · Integrations"],
  ["infra","04","MODELS / INFRASTRUCTURE","#ffb84e","◉","Models & Sandboxes","Local models · Cloud APIs · Runtimes"],
  ["quality","05","QUALITY / OBSERVABILITY","#f57690","◈","Reliability & Observability","Testing · Monitoring · Error analysis"],
  ["creative","06","DESIGN / RESEARCH","#f17fad","✳","Design & Research","Prototyping · Notes · Productivity"],
  ["practice","07","CODING PRACTICE","#a38aff","▥","Learn / Test / Refine","Review · Trace · Solve · Repeat"],
  ["stack","08","STACK ARCHITECT","#4dd4ce","▱","System Architecture","From frontend to deployment"],
  ["pipeline","09","DEVELOPMENT PIPELINE","#839aff","▶","Development Pipeline","Code → Build → Test → Deploy → Ship"]
 ];
 const $=id=>document.getElementById(id),grid=$("dashboard-grid"),search=$("tool-filter");
 if(!grid||!search)return;
 const motion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const fine=window.matchMedia("(pointer:fine)").matches;
 const make=(tag,cls,txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(txt!==undefined)el.textContent=txt;return el;};
 const visible=new Map(),dialog=$("tool-dialog");let prior=null;
 const category=Object.fromEntries(groups.map(g=>[g[0],g]));
 const heading=g=>{
   const header=make("div","category-header");
   const right=make("div");
   right.append(make("h3","category-title",g[2]),make("div","category-rule"));
   header.append(make("span","number-ball",g[1]),right);return header;
 };
 const footer=g=>{
   const bar=make("div","category-footer"),txt=make("div","footer-copy");
   txt.append(make("strong","",g[5]),make("small","",g[6]));
   bar.append(make("div","footer-glyph",g[4]),txt);return bar;
 };
 function inspect(tool){
   if(!dialog||typeof dialog.showModal!=="function"){location.href=tool.url;return;}
   prior=document.activeElement;
   const wrap=$("dialog-image"),img=make("img");img.src=tool.logo;img.alt=tool.name+" logo";
   img.addEventListener("error",()=>img.replaceWith(make("strong","",tool.name)),{once:true});
   wrap.replaceChildren(img);
   $("dialog-category").textContent=category[tool.category][2]+" / "+tool.status;
   $("dialog-title").textContent=tool.name;
   $("dialog-text").textContent=tool.description+" — Listed as a tool I work with, study, or explore at different levels.";
   $("dialog-visit").href=tool.url;
   dialog.showModal();$("dialog-close").focus();
 }
 $("dialog-close")?.addEventListener("click",()=>dialog.close());
 dialog?.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
 dialog?.addEventListener("close",()=>prior?.focus?.());
 for(const g of groups){
   const card=make("article","category-card");card.id="category-"+g[0];card.style.setProperty("--accent",g[3]);card.append(heading(g));
   const area=make("div","category-contents");
   if(g[0]==="stack"){
     area.classList.add("stack-contents");
     for(const [name,icon] of [["Frontend","▣"],["Backend","≡"],["Data","◉"],["AI / ML","✧"],["Infra","☁"],["Deploy","◆"]]){
       const a=make("a","stack-node");a.href="index.html#stack-lab";a.setAttribute("aria-label","Open stack architect: "+name);
       a.append(make("i","",icon),make("span","",name));area.append(a);
     }
   }else if(g[0]==="pipeline"){
     card.classList.add("pipeline-card");
     const nodes=make("div","pipeline-nodes");
     for(const [name,icon] of [["Code","</>"],["Build","⚙"],["Test","✓"],["Deploy","↗"],["Ship","◆"]]){
       const tile=make("div","pipeline-node");tile.append(make("b","",icon),make("span","",name));nodes.append(tile);
     }
     area.append(nodes);
   }else{
     const list=make("div","logo-grid");
     for(const t of tools.filter(q=>q.category===g[0])){
       const btn=make("button","tool-icon");btn.type="button";btn.title="Inspect "+t.name;
       const iconBox=make("span","logo-surface"),img=make("img");
       img.src=t.logo;img.alt="";img.loading="lazy";img.decoding="async";
       img.addEventListener("error",()=>img.replaceWith(make("strong","",t.name.slice(0,2))),{once:true});
       iconBox.append(img);btn.append(iconBox,make("span","tool-name",t.name));
       btn.addEventListener("click",()=>inspect(t));
       list.append(btn);visible.set(t.name,{btn,card});
     }
     area.append(list);
   }
   card.append(area,footer(g));grid.append(card);
 }
 function filter(){
   const q=search.value.trim().toLowerCase();let n=0;
   for(const t of tools){const match=!q||t.name.toLowerCase().includes(q)||t.description.toLowerCase().includes(q);
     visible.get(t.name).btn.hidden=!match;if(match)n++;}
   for(const g of groups){const card=$("category-"+g[0]);
     card.hidden=!!q&&(g[0]==="stack"||g[0]==="pipeline"||!tools.some(t=>t.category===g[0]&&!visible.get(t.name).btn.hidden));}
   $("search-result").textContent=q?n+" TOOLS FOUND":"ALL 29 DISPLAYED";
 }
 search.addEventListener("input",filter);
 $("reset-view")?.addEventListener("click",()=>{search.value="";filter();search.focus();});
 if(!motion&&fine){
   grid.querySelectorAll(".category-card").forEach(card=>{
     card.addEventListener("pointermove",e=>{
       const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
       card.style.setProperty("--ry",(x*5).toFixed(2)+"deg");
       card.style.setProperty("--rx",(-y*5).toFixed(2)+"deg");
     });
     card.addEventListener("pointerleave",()=>{
       card.style.setProperty("--ry","0deg");card.style.setProperty("--rx","0deg");
     });
   });
   const hero=$("hero-tilt"),wrap=hero?.parentElement;
   if(hero&&wrap){
     wrap.addEventListener("pointermove",e=>{
       const r=wrap.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
       hero.style.transform="rotateX("+(11-y*12)+"deg) rotateY("+(-14+x*19)+"deg)";
     });
     wrap.addEventListener("pointerleave",()=>hero.style.transform="rotateX(11deg) rotateY(-14deg)");
   }
 }
 const hash=decodeURIComponent(location.hash.replace("#",""));
 if(hash&&$("category-"+hash))$("category-"+hash).scrollIntoView({behavior:motion?"auto":"smooth",block:"start"});
})();
