"use strict";
/* Z✳F / TRUE 3D
   Self-contained WebGL torus-knot mesh with lighting, depth testing,
   user-controlled rotation and motion/performance fallbacks. No CDN or 3D library.
*/
(() => {
  const canvas=document.getElementById("hero-webgl");
  const parent=document.querySelector(".bento-art");
  if(!canvas||!parent)return;
  const gl=canvas.getContext("webgl",{alpha:true,antialias:true,premultipliedAlpha:false,preserveDrawingBuffer:false,powerPreference:"low-power"});
  if(!gl){canvas.hidden=true;return;}
  const vertex=`
  attribute vec3 aPosition;
  attribute vec3 aNormal;
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main(){
    float ax=uPointer.y*0.5+0.25+sin(uTime*.28)*0.18;
    float ay=uTime*.21+uPointer.x*.7;
    mat3 rx=mat3(1.,0.,0., 0.,cos(ax),-sin(ax), 0.,sin(ax),cos(ax));
    mat3 ry=mat3(cos(ay),0.,sin(ay), 0.,1.,0., -sin(ay),0.,cos(ay));
    mat3 transform=ry*rx;
    vec3 p=transform*aPosition;
    vPosition=p;
    vNormal=normalize(transform*aNormal);
    float depth=5.65-p.z;
    gl_Position=vec4(p.xy*2.35,p.z*.38,depth);
  }`;
  const fragment=`
  precision mediump float;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main(){
    vec3 n=normalize(vNormal);
    vec3 light=normalize(vec3(-.45,.9,1.25));
    float diffuse=max(dot(n,light),0.);
    vec3 view=normalize(vec3(0.,0.,1.));
    float rim=pow(1.-max(dot(n,view),0.),2.2);
    float spec=pow(max(dot(reflect(-light,n),view),0.),30.);
    vec3 jade=vec3(.05,.30,.24);
    vec3 lime=vec3(.77,1.,.35);
    vec3 color=mix(jade,lime,.27+diffuse*.73);
    color+=vec3(.78,1.,.44)*rim*.38;
    color+=vec3(1.)*spec*.37;
    gl_FragColor=vec4(color,.96);
  }`;
  function shader(type,source){
    const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);return null;}
    return s;
  }
  const vs=shader(gl.VERTEX_SHADER,vertex),fs=shader(gl.FRAGMENT_SHADER,fragment);
  if(!vs||!fs){canvas.hidden=true;return;}
  const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
  gl.deleteShader(vs);gl.deleteShader(fs);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){canvas.hidden=true;return;}
  gl.useProgram(program);
  // Tube around a (2,3) torus knot. Triangles and interpolated normals create actual 3D geometry.
  const rings=240,sides=14,positions=[],normals=[],indices=[];
  const knot=t=>{
    const a=2*t,b=3*t;
    const r=1.18+.44*Math.cos(b);
    return [r*Math.cos(a),r*Math.sin(a),.65*Math.sin(b)];
  };
  const sub=(a,b)=>a.map((x,i)=>x-b[i]);
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const norm=a=>{const d=Math.hypot(...a)||1;return a.map(x=>x/d);};
  for(let i=0;i<=rings;i++){
    const t=i*Math.PI*2/rings,p=knot(t),tangent=norm(sub(knot(t+.001),knot(t-.001)));
    const guide=Math.abs(tangent[2])>.9?[1,0,0]:[0,0,1];
    const n=norm(cross(tangent,guide)),b=norm(cross(tangent,n));
    for(let j=0;j<=sides;j++){
      const theta=2*Math.PI*j/sides;
      const normal=norm(n.map((v,k)=>v*Math.cos(theta)+b[k]*Math.sin(theta)));
      const radius=.215;
      positions.push(...p.map((v,k)=>v+normal[k]*radius));
      normals.push(...normal);
      if(i<rings&&j<sides){
        const a=i*(sides+1)+j,c=a+sides+1;
        indices.push(a,c,a+1,a+1,c,c+1);
      }
    }
  }
  const upload=(key,data)=>{
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
    const location=gl.getAttribLocation(program,key);gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location,3,gl.FLOAT,false,0,0);
    return buffer;
  };
  const pb=upload("aPosition",positions),nb=upload("aNormal",normals);
  const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);
  gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);
  gl.disable(gl.CULL_FACE);
  const uTime=gl.getUniformLocation(program,"uTime"),uPointer=gl.getUniformLocation(program,"uPointer");
  let x=0,y=0,targetX=0,targetY=0,frames=0,raf=0,visible=true,stopped=false;
  let last=0;const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
  const resize=()=>{
    const bounds=canvas.getBoundingClientRect();
    const dpr=Math.min(window.devicePixelRatio||1,1.5);
    const w=Math.max(1,Math.round(bounds.width*dpr));
    const h=Math.max(1,Math.round(bounds.height*dpr));
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
    gl.viewport(0,0,w,h);
  };
  const draw=(time)=>{
    if(stopped||!visible||document.hidden)return;
    resize();gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    x+=(targetX-x)*.065;y+=(targetY-y)*.065;
    gl.uniform1f(uTime,reduce.matches?0:time*.001);
    gl.uniform2f(uPointer,x,y);
    gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);
    if(!reduce.matches)raf=requestAnimationFrame(draw);
  };
  const start=()=>{cancelAnimationFrame(raf);if(!stopped&&visible&&!document.hidden)raf=requestAnimationFrame(draw);};
  parent.addEventListener("pointermove",e=>{
    if(reduce.matches)return;
    const r=parent.getBoundingClientRect();
    targetX=((e.clientX-r.left)/r.width-.5)*1.6;
    targetY=((e.clientY-r.top)/r.height-.5)*1.3;
  },{passive:true});
  parent.addEventListener("pointerleave",()=>{targetX=0;targetY=0;},{passive:true});
  const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false;if(visible)start();else cancelAnimationFrame(raf);},{threshold:.03});
  observer.observe(parent);
  document.addEventListener("visibilitychange",start);
  reduce.addEventListener?.("change",start);
  canvas.addEventListener("webglcontextlost",e=>{e.preventDefault();stopped=true;cancelAnimationFrame(raf);canvas.hidden=true;},{once:true});
  window.addEventListener("resize",start,{passive:true});
  start();
})();
