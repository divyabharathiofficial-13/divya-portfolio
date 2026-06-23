import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  Code2, Database, Cloud, Brain, Sparkles, ArrowUpRight, Mail,
  MapPin, Award, GraduationCap, Briefcase, Rocket, Cpu,
  ScanLine, LineChart, Phone, ChevronDown, ExternalLink, Link2,
} from "lucide-react";

/* ═══ PALETTE ════════════════════════════════════════════════ */
const G = { background: "linear-gradient(135deg,#c4b5fd,#f472b6)", WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const };
const INK    = "#f0eeff";
const MUTED  = "#9d8fc4";
const VIOLET = "#8b5cf6";
const ROSE   = "#f472b6";
const CREAM  = "#06040f";

/* ═══ DATA ═══════════════════════════════════════════════════ */
const skills = [
  { icon: Code2,    label: "Languages",  items: ["JavaScript","Python","Java","SQL","HTML5","CSS3"] },
  { icon: Sparkles, label: "Frameworks", items: ["React.js","Node.js","Express.js","Bootstrap"] },
  { icon: Database, label: "Databases",  items: ["MongoDB","MySQL","SQL Server"] },
  { icon: Cloud,    label: "Cloud",      items: ["AWS Fundamentals","Git","REST APIs","Postman"] },
  { icon: Brain,    label: "AI / ML",    items: ["NLP","OCR","Forecasting","Pandas","NumPy"] },
  { icon: Cpu,      label: "Other",      items: ["Agile/Scrum","Data Viz","Photoshop","MS Office"] },
];
const experience = [
  { role:"MERN Stack Developer Intern", company:"Smark Solutions", period:"2026 · 3 Months",
    points:["Developed and deployed 2 live MERN stack applications end-to-end.",
            "Built a Smart Home Management app with dynamic UI and real-time data.",
            "Integrated REST APIs and crafted responsive React components."] },
  { role:"Node.js Backend Developer Intern", company:"Marcello Tech", period:"2024 · 25 Days",
    points:["Designed RESTful endpoints with Node.js and Express.",
            "Managed structured data handling and workflow automation pipelines.",
            "Documented requirements and tracked milestones for on-time delivery."] },
  { role:"Data Science Intern", company:"Srishti Innovative", period:"2023 · 25 Days",
    points:["Analysed large datasets with Pandas and NumPy.",
            "Produced reports and visualisations with Matplotlib & Seaborn."] },
];
const projects = [
  { title:"Smart Home Needs", tag:"AI Household Planner", year:"2025",
    stack:["MERN","NLP","OCR","Forecasting"], icon:Brain,
    body:"An AI-driven household expense tracker that understands natural-language queries, scans receipts via OCR, and forecasts future spend.",
    highlights:[{icon:Sparkles,label:"NLP budget queries"},{icon:ScanLine,label:"Receipt OCR"},{icon:LineChart,label:"Expense forecasting"}] },
  { title:"Career Connect", tag:"Career Guidance Platform", year:"2023",
    stack:["Java","SQL","HTML","CSS","Bootstrap"], icon:Rocket,
    body:"A full-stack career guidance web app — relational schema, dynamic front-end, delivered end-to-end from planning to deployment.",
    highlights:[{icon:Database,label:"Relational schema"},{icon:Code2,label:"Dynamic front-end"},{icon:Briefcase,label:"End-to-end delivery"}] },
];
const education = [
  { degree:"MCA — Master of Computer Applications", school:"Rohini College of Engineering & Technology", period:"2024 – 2026",
    notes:["1st Prize — College Hackathon","AWS Cloud Fundamentals Certified","Led dept. magazine content"] },
  { degree:"B.Sc. Computer Science", school:"Holy Cross College", period:"2022 – 2024",
    notes:["1st Prize — Paper Presentation","Certified in AI & Python","Maintained a live website for 6 months"] },
];
const certifications = ["AWS — Cloud Fundamentals","MongoDB — Database Management","Artificial Intelligence","Python Programming","Adobe Photoshop"];
const psWorks = [
  { title:"Naira — Movie Poster", category:"Poster Design", description:"Cinematic movie poster with dramatic lion compositing, duotone colour grading and bold typography.", src:"/ps/Ab.jpg" },
  { title:"Divya Bharathi — Portrait Art", category:"Photo Manipulation", description:"Fantasy portrait edit with enchanted forest background and silk fabric compositing.", src:"/ps/db.jpg" },
  { title:"Divine Composition", category:"Digital Art", description:"High-resolution devotional digital artwork with atmospheric lighting and layered compositing.", src:"/ps/god-Recovered-1.jpg" },
  { title:"Wedding Memories", category:"Photo Edit", description:"Vibrant wedding photo collage with multi-layer compositing and cinematic atmosphere.", src:"/ps/omg.jpg" },
];
const bgParticles = Array.from({length:10},(_,i)=>({
  id:i, x:Math.random()*100, y:Math.random()*100,
  size:Math.random()*2.5+1, dur:(Math.random()*5+4).toFixed(1)+"s",
  delay:(Math.random()*6).toFixed(1)+"s",
  color:["#A78BFA","#F472B6","#FBCFE8","#DDD6FE"][Math.floor(Math.random()*4)],
}));

/* ═══ BUTTERFLY ══════════════════════════════════════════════ */
function useButterflyScroll() {
  const [bf,setBf]=useState({y:-80,x:0,visible:false});
  useEffect(()=>{
    let tick=false;
    const fn=()=>{
      if(tick)return; tick=true;
      requestAnimationFrame(()=>{
        const sy=window.scrollY,vh=window.innerHeight;
        const docH=document.documentElement.scrollHeight-vh;
        const p=Math.min(sy/Math.max(docH,1),1);
        setBf({y:p*(vh*0.82)-80, x:Math.sin(p*Math.PI*3)*120, visible:sy>30});
        tick=false;
      });
    };
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);
  return bf;
}

function FairyDust({x,y}:{x:number;y:number}) {
  const [sparks,setSparks]=useState<{id:number;dx:number;dy:number;color:string;size:number}[]>([]);
  const ref=useRef(0);
  useEffect(()=>{
    const colors=["#A78BFA","#F472B6","#FBCFE8","#DDD6FE","#C084FC"];
    const id=ref.current++;
    setSparks(p=>[...p.slice(-10),{id,dx:(Math.random()-.5)*36,dy:-(Math.random()*28+8),color:colors[id%5],size:Math.random()*4+2}]);
  },[Math.round(x/10),Math.round(y/10)]);
  return <>{sparks.map(s=><div key={s.id} className="fairy-dust" style={{left:x+s.dx+window.innerWidth/2-30,top:y+s.dy+40,width:s.size,height:s.size,background:s.color}}/>)}</>;
}

/* ═══ HELPERS ════════════════════════════════════════════════ */
function Reveal({children,delay=0,className=""}:{children:React.ReactNode;delay?:number;className?:string}) {
  return (
    <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,margin:"-50px"}} transition={{duration:0.6,delay,ease:[0.22,1,0.36,1]}}
      className={className}>
      {children}
    </motion.div>
  );
}

function SectionHead({kicker,title,sub}:{kicker:string;title:React.ReactNode;sub?:string}) {
  return (
    <Reveal>
      <div style={{marginBottom:48}}>
        <p style={{fontSize:11,textTransform:"uppercase" as const,letterSpacing:"0.24em",color:"rgba(196,181,253,0.5)",marginBottom:12}}>{kicker}</p>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,4vw,2.8rem)",fontWeight:400,lineHeight:1.15,color:INK}}>{title}</h2>
        {sub && <p style={{marginTop:12,color:MUTED,fontSize:15,lineHeight:1.7,maxWidth:"36rem"}}>{sub}</p>}
        <div style={{width:40,height:2,borderRadius:999,marginTop:20,background:"linear-gradient(90deg,#c4b5fd,#f472b6)"}}/>
      </div>
    </Reveal>
  );
}

/* ═══ APP ════════════════════════════════════════════════════ */
export default function App() {
  const bf = useButterflyScroll();
  return (
    <div style={{background:CREAM,color:INK,overflowX:"hidden",minHeight:"100vh",position:"relative"}}>
      {/* fixed bg blobs */}
      <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
        <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"rgba(139,92,246,0.18)",filter:"blur(120px)",top:-80,left:-120}}/>
        <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",background:"rgba(244,114,182,0.12)",filter:"blur(120px)",top:"35%",right:-100}}/>
        <div style={{position:"absolute",width:350,height:350,borderRadius:"50%",background:"rgba(109,40,217,0.14)",filter:"blur(100px)",bottom:"10%",left:"20%"}}/>
      </div>

      {bf.visible && (
        <>
          <FairyDust x={bf.x} y={bf.y}/>
          <div className="butterfly-wrap" style={{top:bf.y,left:`calc(50% + ${bf.x}px)`}}>
            <div className="butterfly">
              <div className="antennae"/>
              <div className="wing wing-left"/>
              <div className="wing wing-right"/>
              <div className="body-center"/>
            </div>
          </div>
        </>
      )}

      <Nav/>
      <Hero/>

      <div style={{position:"relative",zIndex:1,background:"#06040f"}}>
        <About/>
        <Skills/>
        <Experience/>
        <Projects/>
        <PSDesigns/>
        <EducationSection/>
        <CertBanner/>
        <Contact/>
        <Footer/>
      </div>
    </div>
  );
}

/* ═══ NAV ════════════════════════════════════════════════════ */
function Nav() {
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>24);
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);
  return (
    <motion.header initial={{y:-50,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.7}}
      style={{position:"fixed",inset:"0 0 auto 0",zIndex:50,display:"flex",alignItems:"center",
        justifyContent:"space-between",padding:"14px 28px"}}>
      <a href="#top" style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none"}}>
        <span style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#7C3AED,#E8417A)",display:"grid",placeItems:"center",color:"#fff",fontSize:13,fontWeight:700,boxShadow:"0 4px 14px rgba(124,58,237,0.35)"}}>D</span>
        <span style={{fontSize:14,fontWeight:600,color:INK}}>Divya</span>
      </a>

      {/* Nav pill — properly sized and spaced */}
      <nav style={{display:"flex",alignItems:"center",gap:4,padding:"8px 12px",borderRadius:999,transition:"all 0.4s",
        background:scrolled?"rgba(15,11,30,0.85)":"transparent",
        border:scrolled?"1px solid rgba(167,139,250,0.15)":"1px solid transparent",
        backdropFilter:scrolled?"blur(24px)":"none",
        boxShadow:scrolled?"0 2px 20px rgba(0,0,0,0.4)":"none"}} className="hidden md:flex">
        {[["About","#about"],["Skills","#skills"],["Work","#experience"],["Projects","#projects"],["Design","#design"],["Contact","#contact"]].map(([l,h])=>(
          <a key={h} href={h} className="nav-link"
            onMouseEnter={e=>{(e.target as HTMLElement).style.color="#fff";(e.target as HTMLElement).style.borderColor="rgba(196,181,253,0.4)";(e.target as HTMLElement).style.background="rgba(139,92,246,0.12)"}}
            onMouseLeave={e=>{(e.target as HTMLElement).style.color="rgba(240,238,255,0.6)";(e.target as HTMLElement).style.borderColor="rgba(167,139,250,0.14)";(e.target as HTMLElement).style.background="transparent"}}>
            {l}
          </a>
        ))}
      </nav>

      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <a href="https://linkedin.com/in/divyabharathiofficial" target="_blank" rel="noopener noreferrer" style={{color:"rgba(196,181,253,0.4)",lineHeight:0,transition:"color 0.2s"}} className="hidden sm:block"><Link2 size={16}/></a>
        <a href="mailto:divyabharathi.official13@gmail.com" style={{color:"rgba(196,181,253,0.4)",lineHeight:0,transition:"color 0.2s"}} className="hidden sm:block"><Mail size={16}/></a>
        <a href="#contact" className="nav-cta">Hire me</a>
      </div>
    </motion.header>
  );
}

/* ═══ HERO ════════════════════════════════════════════════════ */
function Hero() {
  const panelsRef=useRef<HTMLDivElement>(null);
  const textRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const fn=()=>{
      const sy=window.scrollY;
      if(panelsRef.current) panelsRef.current.style.transform=`translateX(-50%) translateY(${-sy*0.5}px)`;
      if(textRef.current){
        textRef.current.style.transform=`translateY(${-sy*0.2}px)`;
        textRef.current.style.opacity=String(Math.max(0,1-sy/400));
      }
    };
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  return (
    <section id="top" style={{position:"relative",height:"100vh",minHeight:700,display:"flex",flexDirection:"column",
      alignItems:"center",overflow:"hidden",background:CREAM}}>
      {bgParticles.map(p=>(
        <div key={p.id} className="particle" style={{left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,background:p.color,["--dur" as any]:p.dur,animationDelay:p.delay}}/>
      ))}

      {/* Hero text — positioned to NOT overlap scene or address strip */}
      <div ref={textRef} style={{
        position:"relative",zIndex:10,textAlign:"center",
        paddingTop:"clamp(90px,14vh,140px)",
        paddingLeft:24,paddingRight:24,
        maxWidth:820,width:"100%",margin:"0 auto",
        display:"flex",flexDirection:"column",alignItems:"center",gap:18,
        willChange:"transform"
      }}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}}
          style={{display:"inline-flex",alignItems:"center",gap:8,borderRadius:999,
            border:"1px solid rgba(167,139,250,0.20)",background:"rgba(139,92,246,0.10)",
            padding:"6px 16px",fontSize:11,letterSpacing:"0.22em",textTransform:"uppercase" as const,color:VIOLET,
            backdropFilter:"blur(8px)"}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:VIOLET,animation:"pulse 2s infinite"}}/>
          Available for software roles
        </motion.div>

        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.9,ease:[0.22,1,0.36,1]}}
          style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.6rem,6.5vw,5rem)",fontWeight:400,lineHeight:1.05,letterSpacing:"-0.02em",margin:0}}>
          <span style={{color:INK}}>The Developer</span><br/>
          <em style={{fontStyle:"normal",...G}}>for Modern Web</em>
        </motion.h1>

        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.45,duration:0.8}}
          style={{color:MUTED,fontSize:"clamp(0.95rem,2vw,1.1rem)",lineHeight:1.75,maxWidth:460,margin:0}}>
          Divya Bharathi — MERN Stack Developer crafting AI-powered,<br/>data-driven experiences with a touch of magic.
        </motion.p>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.6,duration:0.8}}
          style={{display:"flex",flexWrap:"wrap" as const,gap:12,justifyContent:"center"}}>
          <a href="#projects" style={{display:"inline-flex",alignItems:"center",gap:8,
            background:"linear-gradient(135deg,#8b5cf6,#ec4899)",color:"#fff",
            borderRadius:999,padding:"12px 26px",fontSize:14,fontWeight:600,textDecoration:"none",
            transition:"all 0.2s",boxShadow:"0 8px 28px rgba(139,92,246,0.40)"}}>
            View my work <ArrowUpRight size={16}/>
          </a>
          <a href="#contact" style={{display:"inline-flex",alignItems:"center",gap:8,borderRadius:999,
            padding:"12px 24px",fontSize:14,color:"rgba(196,181,253,0.9)",
            border:"1px solid rgba(167,139,250,0.22)",background:"rgba(139,92,246,0.08)",
            textDecoration:"none",transition:"all 0.2s",backdropFilter:"blur(8px)"}}>
            Get in touch
          </a>
        </motion.div>

        {/* Address strip — absolutely positioned BELOW buttons, above scene, no overlap */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.85,duration:1}}
          style={{display:"flex",flexWrap:"wrap" as const,justifyContent:"center",
            gap:20,fontSize:11,letterSpacing:"0.16em",textTransform:"uppercase" as const,
            color:"rgba(122,102,144,0.65)",marginTop:8}}>
          <span style={{display:"flex",alignItems:"center",gap:6}}><MapPin size={13}/>Nagercoil, India</span>
          <span style={{width:1,height:16,background:"rgba(167,139,250,0.20)",alignSelf:"center"}}/>
          <span>MERN · Python · AI/ML</span>
          <span style={{width:1,height:16,background:"rgba(167,139,250,0.20)",alignSelf:"center"}}/>
          <span>3+ Internships · 5+ Certs</span>
        </motion.div>
      </div>

      {/* 3D Panel Scene */}
      <div className="hero-scene-wrap">
        <div className="hero-scene">
          <div className="hero-scene-fade"/>
          <div className="panels-row" ref={panelsRef}>
            <div className="panel p0"><div className="panel-front"/></div>
            <div className="panel p1"><div className="panel-front"/><div className="panel-glow"/></div>
            <div className="panel p2"><div className="panel-front"/><div className="panel-glow"/></div>
            <div className="panel p3"><div className="panel-front"/><div className="panel-glow"/></div>
            <div className="panel p4"><div className="panel-front"/><div className="panel-glow"/></div>
            <div className="panel p5"><div className="panel-front"/><div className="panel-glow"/></div>
            <div className="panel p6"><div className="panel-front"/></div>
          </div>
          <div className="hero-floor-glow"/>
          <div className="hero-floor-grid"/>
        </div>
      </div>

      <motion.a href="#about" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4,duration:0.8}}
        className="scroll-btn" style={{position:"absolute",bottom:32,left:"50%",zIndex:20}}>
        <ChevronDown size={16} style={{color:VIOLET}}/>SCROLL
      </motion.a>
    </section>
  );
}

/* ═══ SECTION WRAPPER ════════════════════════════════════════ */
function Section({id,children,bg}:{id?:string;children:React.ReactNode;bg?:string}) {
  return (
    <section id={id} style={{padding:"96px 0",background:bg||"transparent"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 clamp(20px,5vw,48px)"}}>
        {children}
      </div>
    </section>
  );
}

/* ═══ ABOUT ══════════════════════════════════════════════════ */
function About() {
  const stats=[{k:"3+",v:"Internships"},{k:"5+",v:"Certifications"},{k:"2",v:"Live MERN Apps"},{k:"1st",v:"Hackathon Win"}];
  return (
    <Section id="about">
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:48,alignItems:"start"}}>
        <div>
          <SectionHead kicker="About me" title={<>Building <em style={{fontStyle:"normal",...G}}>scalable</em> software with craft.</>}/>
          <Reveal delay={0.1}>
            <p style={{color:MUTED,fontSize:15,lineHeight:1.9,marginBottom:16}}>I'm a Full Stack Developer with hands-on MERN experience, REST API integration, and data-driven web applications. I've shipped live MERN apps, designed RESTful backends, and analysed large datasets in Python.</p>
            <p style={{color:MUTED,fontSize:15,lineHeight:1.9}}>My current focus is weaving NLP, OCR and forecasting into everyday products — starting with my AI household planner, Smart Home Needs.</p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {stats.map(s=>(
              <div key={s.v} className="light-card" style={{padding:24}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:400,...G}}>{s.k}</div>
                <div style={{marginTop:8,fontSize:11,textTransform:"uppercase" as const,letterSpacing:"0.18em",color:"rgba(122,102,144,0.6)"}}>{s.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ═══ SKILLS ═════════════════════════════════════════════════ */
function Skills() {
  return (
    <Section id="skills" bg="rgba(139,92,246,0.04)">
      <SectionHead kicker="Toolbox" title={<>The stack I <em style={{fontStyle:"normal",...G}}>build</em> with.</>} sub="Comfortable across languages and layers — picking the right tool for the job."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
        {skills.map((s,i)=>(
          <Reveal key={s.label} delay={i*0.05}>
            <div className="light-card" style={{padding:28,height:"100%"}}>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
                <div className="icon-orb" style={{width:52,height:52,flexShrink:0}}><s.icon size={20} color={VIOLET}/></div>
                <span style={{color:INK,fontWeight:600,fontSize:14,letterSpacing:"0.02em"}}>{s.label}</span>
              </div>
              <div style={{display:"flex",flexWrap:"wrap" as const,gap:8}}>
                {s.items.map(it=><span key={it} className="tag">{it}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ═══ EXPERIENCE ═════════════════════════════════════════════ */
function Experience() {
  return (
    <Section id="experience">
      <SectionHead kicker="Experience" title={<>Where I've <em style={{fontStyle:"normal",...G}}>shipped</em>.</>}/>
      <div style={{display:"flex",flexDirection:"column" as const,gap:20}}>
        {experience.map((e,i)=>(
          <Reveal key={e.role} delay={i*0.08}>
            <div className="light-card" style={{padding:32}}>
              <div style={{marginBottom:20}}>
                <span style={{fontSize:11,textTransform:"uppercase" as const,letterSpacing:"0.18em",color:ROSE,fontWeight:500}}>{e.period}</span>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:400,color:INK,margin:"6px 0 4px"}}>{e.role}</h3>
                <span style={{fontSize:12,color:MUTED,textTransform:"uppercase" as const,letterSpacing:"0.12em"}}>{e.company}</span>
              </div>
              <ul style={{display:"flex",flexDirection:"column" as const,gap:10,margin:0,padding:0}}>
                {e.points.map(p=>(
                  <li key={p} style={{display:"flex",gap:12,fontSize:14,color:MUTED,lineHeight:1.75,listStyle:"none"}}>
                    <span style={{width:7,height:7,borderRadius:"50%",background:"linear-gradient(135deg,#8b5cf6,#ec4899)",flexShrink:0,marginTop:7}}/>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ═══ PROJECTS ════════════════════════════════════════════════ */
function Projects() {
  return (
    <Section id="projects" bg="rgba(236,72,153,0.04)">
      <SectionHead kicker="Selected projects" title={<>Things I've <em style={{fontStyle:"normal",...G}}>built</em>.</>}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20}}>
        {projects.map((p,i)=>(
          <Reveal key={p.title} delay={i*0.1}>
            <article className="light-card" style={{padding:32,height:"100%",display:"flex",flexDirection:"column" as const,gap:20}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div className="icon-orb" style={{width:52,height:52}}><p.icon size={20} color={VIOLET}/></div>
                <span className="tag" style={{fontSize:10}}>{p.year}</span>
              </div>
              <div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:400,color:INK,margin:"0 0 4px"}}>{p.title}</h3>
                <p style={{fontSize:11,textTransform:"uppercase" as const,letterSpacing:"0.18em",color:ROSE,margin:0,fontWeight:500}}>{p.tag}</p>
              </div>
              <p style={{color:MUTED,fontSize:14,lineHeight:1.8,flex:1,margin:0}}>{p.body}</p>
              <div style={{display:"flex",flexDirection:"column" as const,gap:10}}>
                {p.highlights.map(h=>(
                  <div key={h.label} style={{display:"flex",alignItems:"center",gap:10,fontSize:13,color:MUTED}}>
                    <h.icon size={15} color={VIOLET} style={{flexShrink:0}}/>{h.label}
                  </div>
                ))}
              </div>
              <div style={{display:"flex",flexWrap:"wrap" as const,gap:8,paddingTop:16,borderTop:"1px solid rgba(167,139,250,0.10)"}}>
                {p.stack.map(s=><span key={s} className="tag" style={{fontSize:10}}>{s}</span>)}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ═══ PS DESIGNS ══════════════════════════════════════════════ */
function PSDesigns() {
  return (
    <Section id="design">
      <SectionHead kicker="Creative works" title={<>Photoshop <em style={{fontStyle:"normal",...G}}>designs</em>.</>} sub="Photo manipulation, poster design and digital compositing work."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
        {psWorks.map((w,i)=>(
          <Reveal key={w.title} delay={i*0.07}>
            <div className="canva-card" style={{height:"100%",display:"flex",flexDirection:"column" as const}}>
              <div className="canva-img-wrap">
                <img src={w.src} alt={w.title} loading="lazy"/>
                <div className="hover-overlay">
                  <ExternalLink size={22} color="#fff"/>
                </div>
              </div>
              <div style={{padding:16,display:"flex",flexDirection:"column" as const,gap:8,flex:1}}>
                <span className="tag" style={{fontSize:10,alignSelf:"flex-start"}}>{w.category}</span>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:500,color:INK,margin:0,lineHeight:1.4}}>{w.title}</h3>
                <p style={{fontSize:12,color:MUTED,margin:0,lineHeight:1.65}}>{w.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ═══ EDUCATION ══════════════════════════════════════════════ */
function EducationSection() {
  return (
    <Section id="education" bg="rgba(139,92,246,0.04)">
      <SectionHead kicker="Education" title={<>Foundations &amp; <em style={{fontStyle:"normal",...G}}>wins</em>.</>}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
        {education.map((ed,i)=>(
          <Reveal key={ed.degree} delay={i*0.1}>
            <div className="light-card" style={{padding:32,height:"100%"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                <GraduationCap size={16} color={VIOLET}/>
                <span style={{fontSize:11,textTransform:"uppercase" as const,letterSpacing:"0.18em",color:ROSE,fontWeight:500}}>{ed.period}</span>
              </div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:400,color:INK,margin:"0 0 6px"}}>{ed.degree}</h3>
              <p style={{fontSize:12,color:MUTED,textTransform:"uppercase" as const,letterSpacing:"0.1em",marginBottom:20}}>{ed.school}</p>
              <ul style={{display:"flex",flexDirection:"column" as const,gap:12,margin:0,padding:0}}>
                {ed.notes.map(n=>(
                  <li key={n} style={{display:"flex",alignItems:"flex-start",gap:10,fontSize:13,color:MUTED,listStyle:"none"}}>
                    <Award size={14} color={ROSE} style={{flexShrink:0,marginTop:2}}/>{n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ═══ CERT BANNER ════════════════════════════════════════════ */
function CertBanner() {
  const loop=[...certifications,...certifications,...certifications];
  return (
    <div style={{borderTop:"1px solid rgba(167,139,250,0.08)",borderBottom:"1px solid rgba(167,139,250,0.08)",
      padding:"18px 0",overflow:"hidden",background:"rgba(139,92,246,0.04)"}}>
      <div className="marquee-track">
        {loop.map((c,i)=>(
          <span key={i} style={{display:"inline-flex",alignItems:"center",gap:12,fontSize:13,
            color:MUTED,fontWeight:500,letterSpacing:"0.04em",whiteSpace:"nowrap"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"linear-gradient(135deg,#8b5cf6,#ec4899)",flexShrink:0}}/>{c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══ CONTACT ════════════════════════════════════════════════ */
function Contact() {
  return (
    <Section id="contact">
      <Reveal>
        <div style={{position:"relative",overflow:"hidden",borderRadius:28,padding:"clamp(40px,6vw,72px) clamp(28px,5vw,56px)",
          background:"linear-gradient(135deg,rgba(30,15,60,0.9),rgba(20,8,40,0.95))",
          border:"1px solid rgba(167,139,250,0.14)",boxShadow:"0 8px 60px rgba(0,0,0,0.5)"}}>
          <div style={{position:"absolute",top:-80,right:-80,width:256,height:256,borderRadius:"50%",
            background:"radial-gradient(circle,rgba(139,92,246,0.25),transparent 65%)",filter:"blur(40px)",pointerEvents:"none"}}/>
          <div style={{position:"absolute",bottom:-60,left:-60,width:224,height:224,borderRadius:"50%",
            background:"radial-gradient(circle,rgba(236,72,153,0.20),transparent 65%)",filter:"blur(40px)",pointerEvents:"none"}}/>
          <p style={{fontSize:11,letterSpacing:"0.24em",textTransform:"uppercase" as const,color:VIOLET,marginBottom:12,fontWeight:500}}>Let's build</p>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:400,lineHeight:1.2,margin:"0 0 20px",color:INK}}>
            Have a product<br/>worth <em style={{fontStyle:"normal",...G}}>shipping?</em>
          </h2>
          <p style={{color:MUTED,maxWidth:480,lineHeight:1.8,marginBottom:32,fontSize:15}}>Open to software development roles and freelance collaborations — especially anything that blends full-stack web with a touch of AI/ML magic.</p>
          <div style={{display:"flex",flexWrap:"wrap" as const,gap:12}}>
            <a href="mailto:divyabharathi.official13@gmail.com" style={{display:"inline-flex",alignItems:"center",gap:8,
              background:"linear-gradient(135deg,#8b5cf6,#ec4899)",color:"#fff",
              borderRadius:999,padding:"12px 22px",fontSize:13,fontWeight:600,textDecoration:"none",
              transition:"all 0.2s",boxShadow:"0 6px 28px rgba(139,92,246,0.40)"}}>
              <Mail size={15}/>divyabharathi.official13@gmail.com<ArrowUpRight size={14}/>
            </a>
            <a href="tel:+919342217355" style={{display:"inline-flex",alignItems:"center",gap:8,borderRadius:999,
              padding:"12px 22px",fontSize:13,color:"rgba(196,181,253,0.9)",border:"1px solid rgba(167,139,250,0.22)",
              background:"rgba(139,92,246,0.08)",textDecoration:"none",transition:"all 0.2s"}}>
              <Phone size={15}/>+91 93422 17355
            </a>
            <a href="https://linkedin.com/in/divyabharathiofficial" target="_blank" rel="noopener noreferrer"
              style={{display:"inline-flex",alignItems:"center",gap:8,borderRadius:999,
                padding:"12px 22px",fontSize:13,color:"rgba(196,181,253,0.9)",border:"1px solid rgba(167,139,250,0.22)",
                background:"rgba(139,92,246,0.08)",textDecoration:"none",transition:"all 0.2s"}}>
              <Link2 size={15}/>LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ═══ FOOTER ═════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{borderTop:"1px solid rgba(167,139,250,0.08)",padding:"48px clamp(20px,5vw,48px)",background:"rgba(10,7,22,0.8)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",flexWrap:"wrap" as const,justifyContent:"space-between",gap:32}}>
        <div>
          <p style={{fontSize:11,letterSpacing:"0.24em",textTransform:"uppercase" as const,color:VIOLET,marginBottom:16,fontWeight:500}}>Connect</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 40px"}}>
            {[["LinkedIn","https://linkedin.com/in/divyabharathiofficial"],["GitHub","https://github.com/divyabharathiofficial-13"],["Email","mailto:divyabharathi.official13@gmail.com"],["Resume","#"]].map(([l,h])=>(
              <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{fontSize:14,color:MUTED,textDecoration:"none",transition:"color 0.2s"}}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{textAlign:"right" as const}}>
          <p style={{fontSize:11,letterSpacing:"0.24em",textTransform:"uppercase" as const,color:VIOLET,marginBottom:16,fontWeight:500}}>Contact</p>
          <p style={{fontSize:13,color:MUTED,margin:"0 0 4px"}}>divyabharathi.official13@gmail.com</p>
          <p style={{fontSize:13,color:MUTED,margin:"0 0 4px"}}>+91 93422 17355</p>
          <p style={{fontSize:13,color:MUTED,margin:0}}>Nagercoil, Tamil Nadu, India</p>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"32px auto 0",paddingTop:24,borderTop:"1px solid rgba(167,139,250,0.07)",
        display:"flex",flexWrap:"wrap" as const,justifyContent:"space-between",alignItems:"center",
        gap:8,fontSize:12,color:"rgba(167,139,250,0.25)"}}>
        <span>© {new Date().getFullYear()} Divya Bharathi B. All rights reserved.</span>
        <span style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>Designed &amp; coded with magic ✦</span>
      </div>
    </footer>
  );
}