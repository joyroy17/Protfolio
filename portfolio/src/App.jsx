// App.jsx — Portfolio for Joy Roy (Junior Backend Developer)
// Setup: npm i three  |  Put in /public:  profile.jpg (your photo)  and  cv.pdf
// Theme uses CSS variables, so no Tailwind darkMode config is needed.
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ============================ EDIT YOUR CONTENT ============================ */
const PROFILE = {
  name: "Joy Roy",
  roles: [
    "Junior Backend Developer",
    "FastAPI REST API builder",
    "PostgreSQL database designer",
    "Python Developer",
  ],
  tagline:
    "I build robust, scalable REST APIs with Python, FastAPI and PostgreSQL. I'm looking for my first backend developer job.",
  email: "jr7470008@gmail.com",
  location: "Bangladesh",
  photo: "/joy.png",
  cv: "/cv.pdf",
};

const SOCIALS = [
  { id: "github", label: "GitHub", href: "https://github.com/joyroy17" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/feed/" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/joy.roy.778985" },
];

const ABOUT = [
  "My name is Joy Roy, and I am a Junior Backend Developer from Bangladesh. I completed my Diploma in Computer Science and Technology (CST) from Image Polytechnic Institute, Rangpur (2022–2026).",
  "I specialize in Python, FastAPI, REST API Development, PostgreSQL, Pydantic, and SQLAlchemy, with knowledge of HTML5 and Tailwind CSS. My career goal is to become a skilled Backend Developer and build secure, efficient, scalable, and user-friendly web applications.",
];

const SERVICES = [
  { t: "REST API development", d: "Clean endpoints, validation, error handling and auto-generated Swagger docs." },
  { t: "Database design", d: "PostgreSQL schemas, relations, migrations, indexes and optimized queries." },
  { t: "Auth and security", d: "JWT login, password hashing, role-based access and protected routes." },
  { t: "Frontend integration", d: "Connecting backend APIs seamlessly with frontend web clients." },
];

const SKILLS = {
  Backend: ["Python", "FastAPI", "REST API", "JWT Auth", "Pydantic", "Uvicorn"],
  Database: ["PostgreSQL", "SQLAlchemy", "Alembic", "SQL Joins", "Indexes"],
  Frontend: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
  Tools: ["Git & GitHub", "Postman", "Swagger / OpenAPI", "Linux basics", "Docker (learning)"],
};

// Replace with your real projects. Keep the structure.
const PROJECTS = [
  {
    title: "Blog REST API",
    desc: "A complete blog backend with user accounts, posts, comments and pagination.",
    features: ["JWT login and signup", "CRUD for posts and comments", "Pagination and search", "Swagger docs"],
    endpoints: ["POST /auth/login", "GET /posts?page=1", "POST /posts/{id}/comments"],
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "JWT"],
    code: "https://github.com/your-username/blog-api",
    live: "https://your-demo.com/docs",
  },
  {
    title: "E-commerce API",
    desc: "Products, cart and orders with stock checks and an admin role.",
    features: ["Product catalog with filters", "Cart and order flow", "Admin-only routes", "Alembic migrations"],
    endpoints: ["GET /products?category=", "POST /cart/items", "POST /orders"],
    stack: ["FastAPI", "PostgreSQL", "Alembic", "Pydantic"],
    code: "https://github.com/your-username/ecommerce-api",
  },
  {
    title: "Task Manager API",
    desc: "Full-featured task management backend with FastAPI, PostgreSQL, and full CRUD operations.",
    features: ["Create, filter and complete tasks", "Per-user task lists", "Status filtering and search", "Swagger docs"],
    endpoints: ["GET /tasks?status=open", "PATCH /tasks/{id}", "DELETE /tasks/{id}"],
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Python"],
    code: "https://github.com/your-username/task-manager",
    live: "https://your-task-app.com",
  },
  {
    title: "URL Shortener",
    desc: "Short links with redirect, click counter and expiry dates.",
    features: ["Unique short codes", "Click analytics", "Link expiry", "Rate limiting"],
    endpoints: ["POST /links", "GET /{code}", "GET /links/{code}/stats"],
    stack: ["FastAPI", "PostgreSQL", "Python"],
    code: "https://github.com/your-username/url-shortener",
  },
];

const JOURNEY = [
  { when: "Now", what: "Open to junior backend roles & freelance", sub: "Building production-grade APIs with FastAPI and practicing daily." },
  { when: "2022–2026", what: "Diploma in Computer Science & Technology (CST)", sub: "Image Polytechnic Institute, Rangpur" },
  { when: "Goal", what: "Skilled Backend Developer", sub: "Building secure, efficient, scalable, and user-friendly web applications." },
];
/* ========================================================================== */

const SNIPPET = `@router.post("/posts", response_model=PostOut, status_code=201)
def create_post(data: PostIn, db: Session = Depends(get_db),
                user: User = Depends(current_user)):
    post = Post(**data.model_dump(), author_id=user.id)
    db.add(post); db.commit(); db.refresh(post)
    return post`;

const STYLES = `
:root{--bg:#eceeff;--surface:rgba(255,255,255,.82);--line:#c9cef3;--text:#12123a;--muted:#4c5088;--accent:#2f4bff;--accent2:#0077a8;--onacc:#fff;--code:#0b0d22;--btn:#161c85;--btntext:#fff;--btnline:#3b4190}
.dark{--bg:#05070f;--surface:rgba(12,17,40,.75);--line:#1d2552;--text:#eaf0ff;--muted:#8e9ad0;--accent:#7b9bff;--accent2:#19e6ff;--onacc:#05070f;--code:#070a18;--btn:#f3f6ff;--btntext:#05070f;--btnline:rgba(234,240,255,.5)}
html{scroll-behavior:smooth}
html,body{overflow-x:hidden;max-width:100vw;width:100%}
.page{background:var(--bg);color:var(--text);transition:background .3s,color .3s;font-family:'Plus Jakarta Sans',system-ui,sans-serif;overflow-x:hidden;max-width:100vw;width:100%}
.mono{font-family:'JetBrains Mono',ui-monospace,monospace}
.muted{color:var(--muted)} .acc{color:var(--accent)} .acc2{color:var(--accent2)}
.surface{background:var(--surface);border:1px solid var(--line);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.bggrid{position:fixed;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:56px 56px;opacity:.35;-webkit-mask-image:radial-gradient(ellipse at 50% 30%,#000 15%,transparent 75%);mask-image:radial-gradient(ellipse at 50% 30%,#000 15%,transparent 75%);animation:gridmove 10s linear infinite}
.blob{position:fixed;border-radius:9999px;filter:blur(100px);opacity:.28;animation:floaty 14s ease-in-out infinite}
.lineb{border:1px solid var(--line)}
.btn{display:inline-block;border-radius:8px;padding:.6rem 1.2rem;font-size:.875rem;font-weight:700;transition:transform .15s,opacity .15s,box-shadow .15s}
.btn:hover{transform:translateY(-2px)} .btn:active{transform:translateY(0)} .btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.btn-main{background:var(--btn);color:var(--btntext)}.btn-main:hover{box-shadow:0 0 0 2px var(--accent2),0 0 22px color-mix(in srgb,var(--accent2) 60%,transparent)}
.btn-line{border:1px solid var(--btnline)} .btn-line:hover{border-color:var(--accent2);color:var(--accent2);box-shadow:0 0 14px color-mix(in srgb,var(--accent2) 40%,transparent)}
.ring{position:relative;padding:4px;border-radius:9999px;overflow:hidden}
.ring::before{content:'';position:absolute;inset:-50%;background:conic-gradient(var(--accent),var(--accent2),var(--accent));animation:spin 4s linear infinite}
.ring>div{position:relative;border-radius:9999px;overflow:hidden;background:var(--surface)}
.caret::after{content:'▌';margin-left:2px;color:var(--accent);animation:blink 1s steps(1) infinite}
.pf{position:relative;width:9.5rem;height:12.5rem;perspective:900px;max-width:100%}
@media(min-width:380px){.pf{width:11rem;height:14rem}}
@media(min-width:480px){.pf{width:13rem;height:16.5rem}}
@media(min-width:640px){.pf{width:15rem;height:19rem}}
.pf-blob{position:absolute;inset:-10%;background:conic-gradient(from 0deg,var(--accent),var(--accent2),var(--accent));filter:blur(34px);opacity:.5;border-radius:42% 58% 63% 37%/41% 44% 56% 59%;animation:morph 9s ease-in-out infinite,spin 16s linear infinite}
@keyframes morph{50%{border-radius:60% 40% 35% 65%/58% 62% 38% 42%}}
.pf-frame{position:absolute;inset:0;border-radius:1.5rem;overflow:hidden;background:var(--surface);border:1px solid color-mix(in srgb,var(--accent2) 60%,var(--line));box-shadow:0 22px 44px -14px color-mix(in srgb,var(--accent) 60%,transparent);transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .25s ease-out}
.pf-scan{position:absolute;left:0;right:0;height:36%;top:-40%;background:linear-gradient(to bottom,transparent,color-mix(in srgb,var(--accent2) 40%,transparent));border-bottom:1.5px solid var(--accent2);box-shadow:0 2px 14px var(--accent2);pointer-events:none;animation:pfscan 4.6s ease-in-out infinite}
@keyframes pfscan{0%{top:-40%}65%,100%{top:105%}}
.pf-glare{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at var(--gx,50%) var(--gy,25%),rgba(255,255,255,.3),transparent 55%)}
.pf-c{position:absolute;width:20px;height:20px;border:2.5px solid var(--accent2);pointer-events:none}
.pf-c.tl{top:10px;left:10px;border-right:0;border-bottom:0;border-top-left-radius:8px}
.pf-c.tr{top:10px;right:10px;border-left:0;border-bottom:0;border-top-right-radius:8px}
.pf-c.bl{bottom:10px;left:10px;border-right:0;border-top:0;border-bottom-left-radius:8px}
.pf-c.br{bottom:10px;right:10px;border-left:0;border-top:0;border-bottom-right-radius:8px}
.pf-chip{position:absolute;z-index:2;padding:.15rem .5rem;border-radius:9999px;font-size:.65rem;font-weight:700;background:var(--surface);border:1px solid var(--accent2);color:var(--accent2);backdrop-filter:blur(8px);box-shadow:0 0 14px color-mix(in srgb,var(--accent2) 35%,transparent);animation:floaty 5s ease-in-out infinite}
.pf-chip.c1{top:6%;right:0%}.pf-chip.c2{top:48%;left:-2%}.pf-chip.c3{bottom:-2%;right:2%}
@media(min-width:480px){
  .pf-chip{padding:.2rem .65rem;font-size:.7rem}
  .pf-chip.c1{top:8%;right:-6%}.pf-chip.c2{top:48%;left:-8%;animation-delay:1.2s}.pf-chip.c3{bottom:-3%;right:-4%;animation-delay:2.4s}
}
@media(min-width:640px){.pf-chip.c1{right:-12%}.pf-chip.c2{left:-14%}.pf-chip.c3{right:-6%}}
@media(prefers-reduced-motion:reduce){.pf-blob,.pf-scan,.pf-chip{animation:none}}
.float{animation:floaty 6s ease-in-out infinite}
.marquee{display:flex;width:max-content;animation:marquee 32s linear infinite}
.chip{border:1px solid var(--line);border-radius:9999px;padding:.25rem .75rem;font-size:.875rem;transition:border-color .2s,color .2s}
.chip:hover{border-color:var(--accent);color:var(--accent)}
.field{width:100%;border-radius:8px;border:1px solid var(--line);background:var(--surface);padding:.6rem .75rem;font-size:.875rem;color:var(--text);transition:border-color .2s}
.field:focus{outline:2px solid var(--accent)}
.reveal{opacity:0;transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);will-change:transform,opacity}
.reveal.up{transform:translateY(40px)}.reveal.left{transform:translateX(-48px)}.reveal.right{transform:translateX(48px)}.reveal.zoom{transform:scale(.92)}
.reveal.in{opacity:1;transform:none}
@media(max-width:640px){
  .reveal.left,.reveal.right,.reveal.up{transform:translateY(16px)}
}
.reveal .bar{transform:scaleX(0);transform-origin:left;transition:transform .9s .35s cubic-bezier(.2,.7,.2,1)}
.reveal.in .bar{transform:scaleX(1)}
.has-cursor,.has-cursor *{cursor:none!important}
.has-cursor input,.has-cursor textarea{cursor:text!important}
.cur-dot{position:fixed;left:0;top:0;width:17px;height:17px;z-index:2147483001;pointer-events:none;filter:drop-shadow(0 0 4px var(--accent2))}
.cur-dot svg{display:block;width:100%;height:100%;overflow:visible;transform-origin:3px 2px;transition:transform .15s}
.cur-dot.hov svg{transform:scale(1.25)}
.cur-dot.down svg{transform:scale(.8)}
.cur-glow{position:fixed;left:-260px;top:-260px;width:520px;height:520px;border-radius:50%;pointer-events:none;z-index:1;background:radial-gradient(circle,color-mix(in srgb,var(--accent) 22%,transparent),transparent 65%)}
.trail{position:fixed;pointer-events:none;z-index:99;font-size:12px;color:var(--accent2);animation:trail .9s ease-out forwards}
.ripple{position:fixed;pointer-events:none;z-index:99;width:10px;height:10px;margin:-5px;border-radius:50%;border:2px solid var(--accent);animation:ripple .6s ease-out forwards}
@keyframes trail{from{opacity:.9;transform:translate(0,0)}to{opacity:0;transform:translate(var(--dx),34px) scale(.6)}}
@keyframes ripple{to{transform:scale(8);opacity:0}}
.zap:hover{border-color:var(--accent2);box-shadow:0 0 0 1px var(--accent2),0 0 28px color-mix(in srgb,var(--accent2) 30%,transparent)}
.bar{position:relative}.bar::after{content:"";position:absolute;right:-2px;top:-3px;width:10px;height:10px;border-radius:50%;background:#fff;box-shadow:0 0 12px 4px var(--accent2)}
.flicker{animation:flicker 5s infinite}
@keyframes flicker{0%,17%,21%,60%,63%,100%{opacity:1}19%,61%{opacity:.35}20%{opacity:.8}}
@keyframes gridmove{to{background-position:0 56px,0 0}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes blink{50%{opacity:0}}
@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes marquee{to{transform:translateX(-50%)}}

/* ==================== AI AGENT UNIQUE LIVELY & EYE-CATCHING ANIMATIONS ==================== */
@keyframes aiLivelyFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-8px) rotate(2deg) scale(1.02); }
  50% { transform: translateY(-3px) rotate(-1.5deg) scale(1.01); }
  75% { transform: translateY(-10px) rotate(1.5deg) scale(1.03); }
}
@keyframes aiWiggleNudge {
  0%, 80%, 100% { transform: rotate(0deg) scale(1); }
  82% { transform: rotate(-9deg) scale(1.08); }
  85% { transform: rotate(9deg) scale(1.08); }
  88% { transform: rotate(-6deg) scale(1.05); }
  91% { transform: rotate(6deg) scale(1.04); }
  94% { transform: rotate(-2deg) scale(1.02); }
}
@keyframes aiSonarWave {
  0% { transform: scale(0.9); opacity: 0.85; border: 2px solid var(--accent2); }
  50% { opacity: 0.4; border: 2px solid var(--accent); }
  100% { transform: scale(1.4, 1.65); opacity: 0; border: 1px solid var(--accent2); }
}
@keyframes aiSonarWave2 {
  0% { transform: scale(0.9); opacity: 0; }
  25% { opacity: 0.7; border: 2px solid var(--accent); }
  100% { transform: scale(1.55, 1.9); opacity: 0; border: 1px solid transparent; }
}
@keyframes aiBorderBeam {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes aiAttentionGlow {
  0%, 100% {
    filter: drop-shadow(0 0 10px color-mix(in srgb, var(--accent2) 60%, transparent)) drop-shadow(0 0 20px color-mix(in srgb, var(--accent) 35%, transparent));
  }
  50% {
    filter: drop-shadow(0 0 22px color-mix(in srgb, var(--accent2) 90%, transparent)) drop-shadow(0 0 42px color-mix(in srgb, var(--accent) 60%, transparent));
  }
}
@keyframes aiWaveHand {
  0%, 100% { transform: rotate(0deg); }
  20%, 60% { transform: rotate(18deg); }
  40%, 80% { transform: rotate(-18deg); }
}
@keyframes aiOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes aiOrbitRev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
@keyframes aiPulseCore {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px var(--accent2)); opacity: .9; }
  50% { transform: scale(1.12); filter: drop-shadow(0 0 18px var(--accent2)); opacity: 1; }
}
@keyframes aiEq1 { 0%, 100% { height: 4px; } 50% { height: 14px; } }
@keyframes aiEq2 { 0%, 100% { height: 13px; } 50% { height: 5px; } }
@keyframes aiEq3 { 0%, 100% { height: 6px; } 50% { height: 16px; } }
@keyframes aiEq4 { 0%, 100% { height: 15px; } 50% { height: 7px; } }
@keyframes aiEyeBlink {
  0%, 88%, 100% { transform: scaleY(1); }
  94% { transform: scaleY(.1); }
}
@keyframes aiWindowEnter {
  0% { opacity: 0; transform: scale(.92) translateY(22px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes aiMsgEnter {
  0% { opacity: 0; transform: translateY(12px) scale(.97); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes aiBubblePop {
  0% { opacity: 0; transform: translateY(10px) scale(.9); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.ai-lively-float { animation: aiLivelyFloat 4.2s ease-in-out infinite, aiWiggleNudge 6.5s ease-in-out infinite; }
.ai-sonar-wave { animation: aiSonarWave 2.2s cubic-bezier(0, 0.2, 0.8, 1) infinite; }
.ai-sonar-wave-2 { animation: aiSonarWave2 2.2s 1.1s cubic-bezier(0, 0.2, 0.8, 1) infinite; }
.ai-border-beam {
  background: conic-gradient(from 0deg, transparent 0deg, var(--accent) 90deg, var(--accent2) 180deg, #19e6ff 270deg, transparent 360deg);
  animation: aiBorderBeam 3.6s linear infinite;
}
.ai-attention-glow { animation: aiAttentionGlow 2.8s ease-in-out infinite; }
.ai-wave-hand { display: inline-block; transform-origin: 70% 70%; animation: aiWaveHand 2s ease-in-out infinite; }
.ai-orbit { animation: aiOrbit 8s linear infinite; }
.ai-orbit-rev { animation: aiOrbitRev 6s linear infinite; }
.ai-pulse-core { animation: aiPulseCore 2.2s ease-in-out infinite; }
.ai-window-anim { animation: aiWindowEnter .32s cubic-bezier(.16,1,.3,1) forwards; transform-origin: bottom right; }
.ai-msg-anim { animation: aiMsgEnter .28s cubic-bezier(.16,1,.3,1) forwards; }
.ai-bubble-anim { animation: aiBubblePop .35s cubic-bezier(.16,1,.3,1) forwards; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
@media (prefers-reduced-motion:reduce){*{animation:none!important;scroll-behavior:auto!important}.reveal{opacity:1!important;transform:none!important;transition:none!important}.ai-lively-float,.ai-sonar-wave,.ai-sonar-wave-2,.ai-border-beam,.ai-attention-glow,.ai-wave-hand,.ai-orbit,.ai-orbit-rev,.ai-pulse-core,.ai-window-anim,.ai-msg-anim,.ai-bubble-anim{animation:none!important}}
`;

/* ---------------- hooks ---------------- */
function useTheme() {
  const [dark, setDark] = useState(() => {
    try { const s = localStorage.getItem("theme"); if (s) return s === "dark"; } catch {}
    return true; // dark by default
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);
  return [dark, () => setDark((d) => !d)];
}

function useTyper(words) {
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0, j = 0, del = false, t;
    const tick = () => {
      const w = words[i];
      if (!del) {
        j++; setText(w.slice(0, j));
        if (j === w.length) { del = true; t = setTimeout(tick, 1500); return; }
      } else {
        j--; setText(w.slice(0, j));
        if (j === 0) { del = false; i = (i + 1) % words.length; }
      }
      t = setTimeout(tick, del ? 35 : 70);
    };
    tick();
    return () => clearTimeout(t);
  }, []);
  return text;
}

function useLines(total) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((c) => (c > total + 6 ? 0 : c + 1)), 480);
    return () => clearInterval(t);
  }, [total]);
  return Math.min(n, total);
}

function useActive(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const n = document.getElementById(id); n && io.observe(n); });
    return () => io.disconnect();
  }, []);
  return active;
}

function useScrollPct() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      h.style.setProperty("--sy", h.scrollTop);
      setP((h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100);
    };
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return p;
}

/* ---------------- 3D: wireframe core + data network + request packets ---------------- */
function Scene3D({ dark }) {
  const mount = useRef(null);
  useEffect(() => {
    const el = mount.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c1 = dark ? 0x7b9bff : 0x2f4bff;
    const c2 = dark ? 0x19e6ff : 0x0077a8;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 8;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const group = new THREE.Group();
    scene.add(group);

    // core = the API server
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.3, 1),
      new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.7 })
    );
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.6, 0),
      new THREE.MeshBasicMaterial({ color: c2, wireframe: true })
    );
    group.add(core, inner);

    // network shell
    const N = 80, pts = [];
    for (let i = 0; i < N; i++) {
      const d = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      pts.push(d.multiplyScalar(2.4 + Math.random() * 1.1));
    }
    const edges = [], coords = [];
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++)
        if (pts[i].distanceTo(pts[j]) < 1.6) { edges.push([i, j]); coords.push(...pts[i].toArray(), ...pts[j].toArray()); }
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(coords, 3));
    group.add(
      new THREE.Points(nodeGeo, new THREE.PointsMaterial({ color: c1, size: 0.1 })),
      new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.3 }))
    );

    // request packets
    const P = 28;
    const packets = Array.from({ length: P }, () => ({ e: Math.floor(Math.random() * edges.length), t: Math.random(), s: 0.006 + Math.random() * 0.01 }));
    const pos = new Float32Array(P * 3);
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    group.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: c2, size: 0.18 })));

    // electric arcs from the core to random nodes (tesla-coil effect)
    const ARCS = 4, SEG = 7;
    const arcPos = new Float32Array(ARCS * SEG * 6);
    const arcGeo = new THREE.BufferGeometry();
    arcGeo.setAttribute("position", new THREE.BufferAttribute(arcPos, 3));
    group.add(new THREE.LineSegments(arcGeo, new THREE.LineBasicMaterial({ color: dark ? 0xffffff : c2, transparent: true, opacity: 0.9 })));
    let tick = 0;
    const zap = () => {
      let k = 0;
      for (let a = 0; a < ARCS; a++) {
        const target = pts[(Math.random() * N) | 0];
        let prev = new THREE.Vector3();
        for (let s = 1; s <= SEG; s++) {
          const cur = target.clone().multiplyScalar(s / SEG);
          if (s < SEG) cur.add(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(0.55));
          prev.toArray(arcPos, k); cur.toArray(arcPos, k + 3); k += 6; prev = cur;
        }
      }
      arcGeo.attributes.position.needsUpdate = true;
    };

    // orbit rings
    const rings = [2.1, 3.2].map((r, i) => {
      const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 8, 160), new THREE.MeshBasicMaterial({ color: c1, transparent: true, opacity: 0.5 }));
      m.rotation.x = Math.PI / 2.4 + i * 0.7; m.rotation.y = i * 0.9;
      group.add(m);
      return m;
    });
    const sats = [0, 1, 2].map((i) => {
      const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.2), new THREE.MeshBasicMaterial({ color: c2, wireframe: true }));
      group.add(m);
      return { m, r: 2.1 + (i % 2) * 1.1, a: (i * Math.PI * 2) / 3, s: 0.008 + i * 0.003, tilt: 0.5 + i * 0.5 };
    });

    const resize = () => {
      if (!el) return;
      const w = el.clientWidth || 300;
      const h = el.clientHeight || 300;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);
    const mouse = { x: 0, y: 0 };
    const onMove = (e) => { mouse.x = (e.clientX / innerWidth - 0.5) * 2; mouse.y = (e.clientY / innerHeight - 0.5) * 2; };
    window.addEventListener("pointermove", onMove);

    let raf;
    const frame = () => {
      group.rotation.y += 0.0025;
      group.rotation.x += (mouse.y * 0.35 - group.rotation.x) * 0.04;
      group.rotation.z += (-mouse.x * 0.15 - group.rotation.z) * 0.04;
      core.rotation.y -= 0.008; core.rotation.x += 0.004;
      if (tick++ % 5 === 0) zap();
      inner.rotation.y += 0.02; inner.rotation.z += 0.012;
      rings[0].rotation.z += 0.004; rings[1].rotation.z -= 0.003;
      sats.forEach((s) => {
        s.a += s.s;
        s.m.position.set(Math.cos(s.a) * s.r, Math.sin(s.a) * s.r * Math.sin(s.tilt), Math.sin(s.a) * s.r * Math.cos(s.tilt));
        s.m.rotation.x += 0.02; s.m.rotation.y += 0.02;
      });
      packets.forEach((p, i) => {
        p.t += p.s;
        if (p.t > 1) { p.t = 0; p.e = Math.floor(Math.random() * edges.length); }
        const [a, b] = edges[p.e];
        new THREE.Vector3().lerpVectors(pts[a], pts[b], p.t).toArray(pos, i * 3);
      });
      pg.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    const loop = () => { frame(); raf = requestAnimationFrame(loop); };
    reduce ? frame() : loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); });
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [dark]);
  return <div ref={mount} className="absolute inset-0" aria-hidden="true" />;
}

/* ---------------- motion graphic: Client -> FastAPI -> PostgreSQL ---------------- */
function Dot({ x1, x2, y, s, color }) {
  const f = (n) => n.toFixed(2);
  return (
    <circle r="5" cy={y} fill={color}>
      <animate attributeName="cx" values={`${x1};${x1};${x2};${x2}`} keyTimes={`0;${f(s)};${f(s + 0.2)};1`} dur="4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;1;0;0" keyTimes={`0;${f(s)};${f(s + 0.2)};${f(s + 0.21)};1`} dur="4s" repeatCount="indefinite" />
    </circle>
  );
}

function RequestFlow({ reduce }) {
  const nodes = [["Client", 10], ["FastAPI", 220], ["PostgreSQL", 430]];
  return (
    <svg viewBox="0 0 580 130" className="w-full h-auto block min-w-[320px] sm:min-w-0" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Request flow: client to FastAPI to PostgreSQL and back">
      {nodes.map(([label, x]) => (
        <g key={label}>
          <rect x={x} y="35" width="140" height="56" rx="10" fill="var(--surface)" stroke="var(--line)" />
          <text x={x + 70} y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text)" className="mono">{label}</text>
        </g>
      ))}
      {[[150, 220], [360, 430]].map(([a, b]) => (
        <g key={a} stroke="var(--line)" strokeDasharray="4 4">
          <line x1={a} y1="55" x2={b} y2="55" /><line x1={a} y1="75" x2={b} y2="75" />
        </g>
      ))}
      {!reduce && (
        <>
          <Dot x1={150} x2={220} y={55} s={0.03} color="var(--accent)" />
          <Dot x1={360} x2={430} y={55} s={0.28} color="var(--accent)" />
          <Dot x1={430} x2={360} y={75} s={0.53} color="var(--accent2)" />
          <Dot x1={220} x2={150} y={75} s={0.78} color="var(--accent2)" />
        </>
      )}
      <text x="10" y="118" fontSize="11" fill="var(--muted)" className="mono">request</text>
      <circle cx="68" cy="114" r="4" fill="var(--accent)" />
      <text x="90" y="118" fontSize="11" fill="var(--muted)" className="mono">response</text>
      <circle cx="158" cy="114" r="4" fill="var(--accent2)" />
    </svg>
  );
}


/* ---------------- page background: grid + glow + code rain + 3D shapes ---------------- */
function CodeRain({ dark }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = ref.current, ctx = c.getContext("2d");
    const chars = "01{}[]<>/=;()$#SELECTdefJWT".split("");
    const size = 16;
    let w, h, drops, raf, last = 0;
    const init = () => {
      w = c.width = innerWidth; h = c.height = innerHeight;
      drops = Array.from({ length: Math.floor(w / size) }, () => Math.random() * (h / size));
    };
    init();
    addEventListener("resize", init);
    const draw = (ts) => {
      raf = requestAnimationFrame(draw);
      if (ts - last < 60) return;
      last = ts;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = dark ? "rgba(25,230,255,0.9)" : "rgba(47,75,255,0.9)";
      ctx.font = size + "px monospace";
      drops.forEach((y, i) => {
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * size, y * size);
        drops[i] = y * size > h && Math.random() > 0.975 ? 0 : y + 1;
      });
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", init); };
  }, [dark]);
  return <canvas ref={ref} className="fixed inset-0 h-full w-full" style={{ opacity: dark ? 0.22 : 0.1 }} aria-hidden="true" />;
}

function ThreeBg({ dark }) {
  const mount = useRef(null);
  useEffect(() => {
    const el = mount.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c1 = dark ? 0x7b9bff : 0x2f4bff, c2 = dark ? 0x19e6ff : 0x0077a8;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 10;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    el.appendChild(renderer.domElement);

    // floating particles spread down the whole page
    const COUNT = 380, arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = 5 - Math.random() * 40;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: c1, size: 0.07, transparent: true, opacity: 0.8 })));
    const pp = [];
    for (let i = 0; i < COUNT; i++) pp.push(new THREE.Vector3(arr[i * 3], arr[i * 3 + 1], arr[i * 3 + 2]));
    const bedges = [], bc = [];
    for (let i = 0; i < COUNT && bedges.length < 520; i++)
      for (let j = i + 1; j < COUNT && bedges.length < 520; j++)
        if (pp[i].distanceTo(pp[j]) < 3.4) { bedges.push([i, j]); bc.push(...pp[i].toArray(), ...pp[j].toArray()); }
    const bg = new THREE.BufferGeometry();
    bg.setAttribute("position", new THREE.Float32BufferAttribute(bc, 3));
    scene.add(new THREE.LineSegments(bg, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.16 })));
    const PK = 46;
    const pk = Array.from({ length: PK }, () => ({ e: Math.floor(Math.random() * Math.max(1, bedges.length)), t: Math.random(), s: 0.01 + Math.random() * 0.02 }));
    const pkArr = new Float32Array(PK * 3);
    const pkg = new THREE.BufferGeometry();
    pkg.setAttribute("position", new THREE.BufferAttribute(pkArr, 3));
    scene.add(new THREE.Points(pkg, new THREE.PointsMaterial({ color: c2, size: 0.16 })));

    // big wireframe shapes the page scrolls past
    const geos = [
      new THREE.TorusKnotGeometry(1.1, 0.32, 90, 12), new THREE.IcosahedronGeometry(1.5, 0),
      new THREE.OctahedronGeometry(1.3, 0), new THREE.BoxGeometry(1.6, 2.6, 1.3, 2, 5, 2), new THREE.TorusGeometry(1.4, 0.35, 12, 40),
    ];
    const shapes = geos.map((g, i) => {
      const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: i % 2 ? c2 : c1, wireframe: true, transparent: true, opacity: 0.28 }));
      m.userData = { y: -4 - i * 7.5, side: i % 2 ? 1 : -1, rx: 0.003 + i * 0.001 };
      scene.add(m);
      return m;
    });

    let vw = 16;
    const resize = () => {
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      vw = 2 * Math.tan((25 * Math.PI) / 180) * 10 * camera.aspect;
      shapes.forEach((m) => m.position.set(m.userData.side * vw * 0.4, m.userData.y, 0));
    };
    resize();
    addEventListener("resize", resize);
    const mouse = { x: 0, y: 0 };
    const onMove = (e) => { mouse.x = (e.clientX / innerWidth - 0.5) * 2; mouse.y = (e.clientY / innerHeight - 0.5) * 2; };
    addEventListener("pointermove", onMove);

    let raf;
    const frame = () => {
      const d = document.documentElement;
      const sp = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight);
      camera.position.y += (-sp * 32 - mouse.y * 0.4 - camera.position.y) * 0.08;
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.05;
      shapes.forEach((m) => { m.rotation.x += m.userData.rx; m.rotation.y += 0.005; });
      if (bedges.length) {
        pk.forEach((p, i) => {
          p.t += p.s;
          if (p.t > 1) { p.t = 0; p.e = Math.floor(Math.random() * bedges.length); }
          const [a, b] = bedges[p.e];
          new THREE.Vector3().lerpVectors(pp[a], pp[b], p.t).toArray(pkArr, i * 3);
        });
        pkg.attributes.position.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };
    const loop = () => { frame(); raf = requestAnimationFrame(loop); };
    reduce ? frame() : loop();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); });
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [dark]);
  return <div ref={mount} className="fixed inset-0" aria-hidden="true" />;
}

function Background({ dark }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <ThreeBg dark={dark} />
      <div className="bggrid" />
      <div className="blob" style={{ left: "-8rem", top: "-6rem", width: "30rem", height: "30rem", background: "var(--accent)" }} />
      <div className="blob" style={{ right: "-8rem", bottom: "-6rem", width: "28rem", height: "28rem", background: "var(--accent2)", animationDelay: "4s" }} />
      <Lightning dark={dark} />
      <CodeRain dark={dark} />
    </div>
  );
}

/* ---------------- syntax-highlighted code with line numbers ---------------- */
const TOK = /(@\w+|"[^"]*"|\b(?:def|return|from|import|async|await|class)\b|\b[a-z_]\w*(?=\())/g;
function Code({ text }) {
  return text.split("\n").map((ln, i) => (
    <div key={i} className="flex">
      <span className="mr-4 w-4 select-none text-right opacity-40">{i + 1}</span>
      <span className="whitespace-pre">
        {ln.split(TOK).map((p, k) => {
          let c;
          if (k % 2 === 1) {
            if (p[0] === "@") c = "#ffb86b";
            else if (p[0] === '"') c = "#7ee787";
            else if (/^(def|return|from|import|async|await|class)$/.test(p)) c = "#c792ff";
            else c = "#82aaff";
          }
          return <span key={k} style={c ? { color: c } : undefined}>{p}</span>;
        })}
      </span>
    </div>
  ));
}


/* ---------------- scroll reveal + custom mouse cursor ---------------- */
function Reveal({ children, delay = 0, from = "up", className = "" }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${from} ${on ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Lightning({ dark }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = ref.current, ctx = c.getContext("2d");
    let w, h, raf, timer;
    const bolts = [];
    const size = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    size();
    addEventListener("resize", size);
    const path = (x, y, steps, dx) => {
      const p = [[x, y]];
      for (let i = 0; i < steps; i++) { x += (Math.random() - 0.5) * 2 * dx; y += 16 + Math.random() * 20; p.push([x, y]); }
      return p;
    };
    const spawn = () => {
      const main = path(Math.random() * w, 0, Math.floor((h * (0.3 + Math.random() * 0.5)) / 26), 28);
      const branches = [];
      main.forEach(([bx, by], i) => { if (i > 2 && Math.random() < 0.14) branches.push(path(bx, by, 3 + ((Math.random() * 4) | 0), 36)); });
      bolts.push({ main, branches, born: performance.now(), life: 520 });
      timer = setTimeout(spawn, 2200 + Math.random() * 4200);
    };
    timer = setTimeout(spawn, 1200);
    const stroke = (p, col, wd, blur) => {
      ctx.beginPath();
      p.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.shadowBlur = blur; ctx.shadowColor = col;
      ctx.stroke();
    };
    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i], age = (now - b.born) / b.life;
        if (age >= 1) { bolts.splice(i, 1); continue; }
        ctx.globalAlpha = (1 - age) * (Math.random() > 0.3 ? 1 : 0.35);
        const col = dark ? "#19e6ff" : "#2f4bff";
        [b.main, ...b.branches].forEach((p, k) => stroke(p, col, k ? 1 : 2.2, 16));
        stroke(b.main, "#ffffff", 1, 0);
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); removeEventListener("resize", size); };
  }, [dark]);
  return <canvas ref={ref} className="fixed inset-0 h-full w-full" style={{ opacity: dark ? 0.7 : 0.4 }} aria-hidden="true" />;
}

function Cursor() {
  const dot = useRef(null), glow = useRef(null), cv = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("has-cursor");
    const ctx = cv.current.getContext("2d");
    let w, h;
    const size = () => { w = cv.current.width = innerWidth; h = cv.current.height = innerHeight; };
    size();
    addEventListener("resize", size);
    dot.current.style.transform = `translate(${innerWidth / 2}px,${innerHeight / 2}px)`;
    let mx = innerWidth / 2, my = innerHeight / 2, gx = mx, gy = my, raf, hov = false;
    const trail = [], sparks = [];
    // jagged lightning polyline between two points
    const jag = (x1, y1, x2, y2, amp) => {
      const d = Math.hypot(x2 - x1, y2 - y1) || 1, n = Math.max(2, Math.floor(d / 9));
      const nx = -(y2 - y1) / d, ny = (x2 - x1) / d, p = [[x1, y1]];
      for (let i = 1; i < n; i++) { const t = i / n, o = (Math.random() - 0.5) * amp; p.push([x1 + (x2 - x1) * t + nx * o, y1 + (y2 - y1) * t + ny * o]); }
      p.push([x2, y2]);
      return p;
    };
    const stroke = (p, col, wd, blur) => {
      ctx.beginPath();
      p.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.shadowBlur = blur; ctx.shadowColor = col;
      ctx.stroke();
    };
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.current.style.transform = `translate(${mx}px,${my}px)`;
      hov = !!e.target.closest?.("a,button,input,textarea");
      dot.current.classList.toggle("hov", hov);
      if (reduce) return;
      const now = performance.now();
      trail.push({ x: mx, y: my, t: now });
      if (trail.length > 12) trail.shift();
      if (Math.random() < 0.35) sparks.push({ x: mx, y: my, a: Math.random() * 6.28, len: 18 + Math.random() * 30, born: now, life: 160 });
    };
    const down = () => {
      dot.current.classList.add("down");
      if (reduce) return;
      const now = performance.now();
      for (let i = 0; i < 10; i++) sparks.push({ x: mx, y: my, a: (i / 10) * 6.28 + Math.random() * 0.4, len: 60 + Math.random() * 70, born: now, life: 340 });
      const r = document.createElement("span");
      r.className = "ripple"; r.style.left = mx + "px"; r.style.top = my + "px";
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 700);
    };
    const up = () => dot.current.classList.remove("down");
    addEventListener("pointermove", move);
    addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      gx += (mx - gx) * 0.07; gy += (my - gy) * 0.07;
      glow.current.style.transform = `translate(${gx}px,${gy}px)`;
      ctx.clearRect(0, 0, w, h);
      if (reduce) return;
      const dark = document.documentElement.classList.contains("dark");
      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      const col = dark ? "#19e6ff" : "#2f4bff";
      while (trail.length && now - trail[0].t > 240) trail.shift();
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1], b = trail[i];
        ctx.globalAlpha = Math.max(0, 1 - (now - b.t) / 240);
        const pth = jag(a.x, a.y, b.x, b.y, 10);
        stroke(pth, col, 2.4, 14); stroke(pth, "#ffffff", 1, 0);
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i], age = (now - sp.born) / sp.life;
        if (age >= 1) { sparks.splice(i, 1); continue; }
        ctx.globalAlpha = 1 - age;
        const L = sp.len * (0.5 + 0.5 * age);
        const pth = jag(sp.x, sp.y, sp.x + Math.cos(sp.a) * L, sp.y + Math.sin(sp.a) * L, 12);
        stroke(pth, col, 1.6, 12); stroke(pth, "#ffffff", 0.8, 0);
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size);
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);
  return (
    <>
      <div ref={glow} className="cur-glow" aria-hidden="true" />
      <canvas ref={cv} className="pointer-events-none fixed inset-0 z-[2147482999] h-full w-full" aria-hidden="true" />
      <div ref={dot} className="cur-dot" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M3 2 L3 19.5 L7.6 15.4 L10.6 22 L13.6 20.7 L10.6 14.2 L16.8 13.8 Z" style={{ fill: "var(--accent2)" }} stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>
      </div>
    </>
  );
}

/* ---------------- UI pieces ---------------- */
const ICONS = {
  github: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
  linkedin: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  facebook: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z",
};

function SocialLink({ s, big }) {
  return (
    <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="btn btn-line inline-flex items-center gap-2 !px-3 !py-2 font-medium">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d={ICONS[s.id]} /></svg>
      {big && <span>{s.label}</span>}
    </a>
  );
}

function Avatar() {
  const [ok, setOk] = useState(true);
  const box = useRef(null);
  const initials = PROFILE.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  const tilt = (e) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 12}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };
  const reset = () => {
    const el = box.current;
    if (!el) return;
    ["--rx", "--ry", "--gx", "--gy"].forEach((k) => el.style.removeProperty(k));
  };
  return (
    <div ref={box} className="pf shrink-0 mx-auto sm:mx-0" onPointerMove={tilt} onPointerLeave={reset}>
      <div className="pf-blob" aria-hidden="true" />
      <div className="pf-frame">
        {ok ? (
          <img src={PROFILE.photo} alt={PROFILE.name} onError={() => setOk(false)} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center text-5xl sm:text-6xl font-extrabold acc">{initials}</div>
        )}
        <span className="pf-scan" aria-hidden="true" />
        <span className="pf-glare" aria-hidden="true" />
        <i className="pf-c tl" /><i className="pf-c tr" /><i className="pf-c bl" /><i className="pf-c br" />
      </div>
      <span className="pf-chip c1 mono" aria-hidden="true">Python</span>
      <span className="pf-chip c2 mono" aria-hidden="true">FastAPI</span>
      <span className="pf-chip c3 mono" aria-hidden="true">PostgreSQL</span>
    </div>
  );
}

function ResponseCard() {
  const rows = [
    ["acc", "GET /api/developers/joy"],
    ["acc2", "HTTP/1.1 200 OK"],
    ["", "{"],
    ["", `  "name": "${PROFILE.name}",`],
    ["", '  "role": "Junior Backend Developer",'],
    ["", '  "stack": ["FastAPI", "PostgreSQL"],'],
    ["acc2", '  "open_to_work": true'],
    ["", "}"],
  ];
  const n = useLines(rows.length);
  return (
    <div className="surface mono w-full max-w-[275px] sm:max-w-[310px] md:max-w-xs rounded-xl p-3 text-[10px] sm:text-xs leading-relaxed shadow-xl overflow-hidden min-w-0">
      <div className="mb-2 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-400" /><span className="h-2 w-2 rounded-full bg-yellow-400" /><span className="h-2 w-2 rounded-full bg-green-400" />
      </div>
      <div className="min-h-[7.5rem] sm:min-h-[8.5rem] whitespace-pre-wrap">
        {rows.slice(0, n).map(([c, t], i) => <div key={i} className={c}>{t}</div>)}
      </div>
    </div>
  );
}

function Section({ id, title, route, intro, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-16 px-3.5 sm:px-6 py-12 sm:py-20 overflow-hidden w-full max-w-full">
      <Reveal>
        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h2>
          <span className="mono text-xs sm:text-sm muted">{route}</span>
        </div>
        <div className="bar mt-2.5 sm:mt-3 h-1 w-16 rounded" style={{ background: "linear-gradient(90deg,var(--accent),var(--accent2))" }} />
        {intro && <p className="muted mt-3 max-w-xl text-xs sm:text-base leading-relaxed">{intro}</p>}
      </Reveal>
      <div className="mt-7 sm:mt-10 min-w-0 w-full max-w-full">{children}</div>
    </section>
  );
}

/* ---------------- AI Assistant / Chatbot (JoyBot) with Unique Smooth Animation ---------------- */
function AIAgentAvatar({ isTyping = false, size = "md" }) {
  const dim = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-10 h-10";
  return (
    <div className={`relative ${dim} flex items-center justify-center shrink-0`}>
      {/* Outer Holographic Orbital Ring */}
      <div
        className="ai-orbit absolute inset-0 rounded-full border border-dashed border-[var(--accent2)] opacity-80"
        style={{ animationDuration: isTyping ? "3s" : "8s" }}
      />
      {/* Inner Rotating Ring */}
      <div
        className="ai-orbit-rev absolute inset-[2px] rounded-full border border-dotted border-[var(--accent)] opacity-60"
        style={{ animationDuration: isTyping ? "2s" : "6s" }}
      />
      {/* Pulsing Core Sphere */}
      <div className="ai-pulse-core relative flex items-center justify-center w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] shadow-[0_0_12px_color-mix(in_srgb,var(--accent2)_60%,transparent)]">
        {/* Hologram robot face with blinking eyes */}
        <svg viewBox="0 0 24 24" className="w-[65%] h-[65%] fill-white" aria-hidden="true">
          {/* Antenna */}
          <circle cx="12" cy="3" r="1.5" />
          <path d="M12 4.5v2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          {/* Head */}
          <rect x="4" y="6.5" width="16" height="12" rx="3.5" />
          {/* Eyes with blink animation */}
          <g style={{ transformOrigin: "12px 11px", animation: "aiEyeBlink 4s ease-in-out infinite" }}>
            <rect x="7" y="10" width="3" height="3" rx="1" fill="#19e6ff" />
            <rect x="14" y="10" width="3" height="3" rx="1" fill="#19e6ff" />
          </g>
          {/* Mouth / Speaker bar */}
          <path d="M8.5 15h7" stroke="#19e6ff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function SoundWaveBars({ isTyping = false }) {
  return (
    <div className="flex items-center gap-[2.5px] h-4" title={isTyping ? "JoyBot is generating..." : "Neural audio active"}>
      <span
        className="w-[2.5px] rounded-full bg-[var(--accent2)]"
        style={{ animation: `aiEq1 ${isTyping ? "0.45s" : "1.2s"} ease-in-out infinite` }}
      />
      <span
        className="w-[2.5px] rounded-full bg-[var(--accent)]"
        style={{ animation: `aiEq2 ${isTyping ? "0.4s" : "1s"} ease-in-out infinite` }}
      />
      <span
        className="w-[2.5px] rounded-full bg-cyan-400"
        style={{ animation: `aiEq3 ${isTyping ? "0.5s" : "1.4s"} ease-in-out infinite` }}
      />
      <span
        className="w-[2.5px] rounded-full bg-[var(--accent2)]"
        style={{ animation: `aiEq4 ${isTyping ? "0.38s" : "1.1s"} ease-in-out infinite` }}
      />
    </div>
  );
}

function JoyBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm Joy's AI Assistant.\n\n🇧🇩 বাংলা ও 🇬🇧 English উভয় ভাষায় জয়ের স্কিল, প্রজেক্ট, সিভি বা হায়ার করার বিষয়ে যেকোনো প্রশ্ন করতে পারেন!",
      time: "Just now",
    },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open, typing]);

  // Auto-dismiss the initial hook bubble after 25s
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(false), 25000);
    return () => clearTimeout(timer);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const copyText = (txt, idx) => {
    try {
      navigator.clipboard.writeText(txt);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1800);
    } catch {}
  };

  const quickPrompts = [
    { label: "👤 Who are you?", q: "Who are you?" },
    { label: "🛠️ Technical Skills", q: "What skills do you have?" },
    { label: "⚡ Do you know FastAPI?", q: "Do you know FastAPI?" },
    { label: "🚀 Show your projects", q: "Show your projects" },
    { label: "🎓 Educational Background", q: "What is your educational background?" },
    { label: "💼 Available for work?", q: "Are you available for work?" },
    { label: "🎯 Career Goal", q: "What is your career goal?" },
    { label: "🤝 Freelance & Collab", q: "Are you open to freelance projects or collaboration?" },
    { label: "📄 Download CV", q: "How can I download your CV?" },
    { label: "📬 Contact Information", q: "How can I contact you?" },
  ];

  const generateBotReply = (query) => {
    const q = query.toLowerCase().trim();

    const replyBoth = (bnText, enText) => {
      return `🇧🇩 বাংলা:\n${bnText}\n\n─────────────────────\n\n🇬🇧 English:\n${enText}`;
    };

    // 1. Greetings
    if (
      /^(hi|hello|hey|yo|greetings|hola|assalamu|salam|namaste|good\s*(morning|afternoon|evening))/i.test(q) ||
      /(কেমন|হাই|হ্যালো|সালাম|নমস্কার|আদাব|kemon|ki khobor)/i.test(q)
    ) {
      return replyBoth(
        "হ্যালো! 👋 আমি জয় রয়ের এআই অ্যাসিস্ট্যান্ট। জয় রয় একজন জুনিয়র ব্যাকএন্ড ডেভেলপার (Python, FastAPI, PostgreSQL)। আপনি তার পরিচয়, শিক্ষাগত যোগ্যতা (Diploma in CST), স্কিল, প্রজেক্ট, সিভি বা হায়ার করার বিষয়ে যেকোনো প্রশ্ন করতে পারেন!",
        "Hello! 👋 I am Joy's AI Assistant. Joy Roy is a Junior Backend Developer from Bangladesh specializing in Python, FastAPI, and PostgreSQL. Feel free to ask about his background, education (Diploma in CST), technical skills, projects, CV, or hiring availability!"
      );
    }

    // 2. Who are you? / Identity / Background / তোমার পরিচয়
    if (
      /(who are you|who is joy|about joy|about|bio|background|tell me about|joy roy|joy k|porichoy|পরিচয়|সম্পর্কে|কে তুমি|তুমি কে)/i.test(q)
    ) {
      return replyBoth(
        "👨‍💻 **জয় রয়ের পরিচয়:**\nআমার নাম জয় রয় (Joy Roy)। আমি বাংলাদেশ থেকে একজন জুনিয়র ব্যাকএন্ড ডেভেলপার (Junior Backend Developer)। আমি রংপুর এর Image Polytechnic Institute থেকে Computer Science and Technology (CST)-তে ডিপ্লোমা সম্পন্ন করেছি (সেশন: ২০২২–২০২৬)।\n\nআমি মূলত Python, FastAPI, REST API Development, PostgreSQL, Pydantic এবং SQLAlchemy দিয়ে হাই-পারফরম্যান্স ও সিকিউর ওয়েব অ্যাপ্লিকেশন তৈরিতে স্পেশালাইজড। এছাড়াও ফ্রন্টএন্ডে HTML5 ও Tailwind CSS সম্পর্কে আমার ভালো ধারণা রয়েছে।",
        "👨‍💻 **About Joy Roy:**\nMy name is Joy Roy, and I am a Junior Backend Developer from Bangladesh. I completed my Diploma in Computer Science and Technology (CST) from Image Polytechnic Institute, Rangpur (2022–2026).\n\nI specialize in Python, FastAPI, REST API Development, PostgreSQL, Pydantic, and SQLAlchemy, with knowledge of HTML5 and Tailwind CSS. My technical interests include backend engineering, database management, API architecture, and building scalable web applications."
      );
    }

    // 3. Educational Qualifications / Background / পড়াশোনা / কোথায় পড়েছো
    if (
      /(education|educational|study|degree|diploma|polytechnic|institute|college|varsity|cst|rangpur|শিক্ষাগত যোগ্যতা|পড়াশোনা|শিক্ষা|কোথায় পড়েছো|ডিপ্লোমা)/i.test(q)
    ) {
      return replyBoth(
        "🎓 **শিক্ষাগত যোগ্যতা (Educational Qualifications):**\n• **ডিগ্রি:** Diploma in Computer Science and Technology (CST)\n• **প্রতিষ্ঠান:** Image Polytechnic Institute, Rangpur\n• **সেশন / সময়কাল:** ২০২২ – ২০২৬\n\nডিপ্লোমা চলাকালীন সময়ে আমি কম্পিউটার সায়েন্সের ফান্ডামেন্টালস, রিলেশনাল ডেটাবেজ ম্যানেজমেন্ট, সফটওয়্যার ডেভেলপমেন্ট ও নেটওয়ার্কিংয়ের মৌলিক নীতিগুলো দক্ষতার সাথে সম্পন্ন করেছি।",
        "🎓 **Educational Background:**\n• **Degree:** Diploma in Computer Science and Technology (CST)\n• **Institute:** Image Polytechnic Institute, Rangpur\n• **Session / Duration:** 2022 – 2026\n\nThroughout my diploma, I built solid technical foundations in computer science core principles, database management, backend software engineering, and system design."
      );
    }

    // 4. What skills do you have? / Technical Skills / তোমার স্কিল কী কী
    if (
      /(what skills do you have|skill|skills|tech stack|technologies|what can you do|স্কিল|দক্ষতা|কী কী পারো|কী কাজ পারো|স্ট্যাক|টুলস)/i.test(q)
    ) {
      return replyBoth(
        "🛠️ **জয়ের টেকনিক্যাল স্কিলসমূহ (Technical Skills):**\n• **Backend Core:** Python 3.11+, FastAPI, REST API Development, Pydantic, Starlette, Uvicorn\n• **Database & ORM:** PostgreSQL, SQLAlchemy ORM, Alembic Migrations, SQL Query Optimization\n• **Security & Auth:** JWT Authentication, Bcrypt Password Hashing, RBAC (Role-Based Access Control)\n• **Frontend Knowledge:** HTML5, CSS3, Tailwind CSS, JavaScript (এপিআই ইন্টিগ্রেশন ও কনজাম্পশনের জন্য)\n• **Tools & Systems:** Git, GitHub, Postman, Swagger/OpenAPI, Linux CLI, Docker (Basics)\n• **Technical Interests:** Backend Development, Database Management, Scalable Web Applications.",
        "🛠️ **Joy's Technical Skills:**\n• **Backend & Core:** Python 3.11+, FastAPI, REST API Development, Pydantic, Starlette, Uvicorn\n• **Databases & ORM:** PostgreSQL, SQLAlchemy ORM, Alembic Migrations, SQL Query Optimization\n• **Security & Auth:** JWT Authentication, Bcrypt Password Hashing, RBAC\n• **Frontend Knowledge:** HTML5, CSS3, Tailwind CSS, JavaScript (for API integration)\n• **Developer Tools:** Git, GitHub, Postman, Swagger/OpenAPI, Linux CLI, Docker (Basics)\n• **Technical Focus:** Backend Engineering, Database Management, and Scalable Web Applications."
      );
    }

    // 5. Do you know FastAPI? / FastAPI অভিজ্ঞতা
    if (/(fastapi|do you know fastapi|ফাস্টএপিআই|fastapi পারো)/i.test(q)) {
      return replyBoth(
        "⚡ **FastAPI সম্পর্কে জয়ের অভিজ্ঞতা:**\nহ্যাঁ! জয় FastAPI ফ্রেমওয়ার্কে অত্যন্ত দক্ষ। সে FastAPI ব্যবহার করে:\n• হাই-পারফরম্যান্স অ্যাসিনক্রোনাস (Async) RESTful API তৈরি করে।\n• Pydantic schemas দিয়ে কঠোর ডেটা ভ্যালিডেশন ও সিরিয়ালাইজেশন নিশ্চিত করে।\n• ডিপেন্ডেন্সি ইনজেকশন (Depends) দিয়ে ডেটাবেজ সেশন ও অথেনটিকেশন হ্যান্ডেল করে।\n• স্বয়ংক্রিয় সোয়াগার ডকুমেন্টেশন (Interactive Swagger / OpenAPI docs) তৈরি করে।",
        "⚡ **Joy's Expertise in FastAPI:**\nYes! Joy specializes in FastAPI. With FastAPI, he:\n• Builds high-throughput, asynchronous RESTful APIs.\n• Enforces strict data validation and serialization using Pydantic schemas.\n• Utilizes FastAPI's Dependency Injection (`Depends`) for clean DB sessions and JWT auth.\n• Generates automated, interactive Swagger UI & OpenAPI documentation."
      );
    }

    // 6. Show your projects / তোমার প্রজেক্টগুলো দেখাও
    if (
      /(show your projects|show projects|project|projects|portfolio|apis built|কাজ|প্রজেক্ট|প্রজেক্টগুলো দেখাও|কী কী কাজ করেছো)/i.test(q)
    ) {
      return replyBoth(
        "🚀 **জয়ের প্রধান ব্যাকএন্ড প্রজেক্টসমূহ (Featured Projects):**\n১. **Blog REST API** — ফুল ব্লগ ব্যাকএন্ড: ইউজার অ্যাকাউন্ট, পোস্ট ও কমেন্ট CRUD, পেজিনেশন এবং JWT সিকিউরিটি (FastAPI + PostgreSQL + SQLAlchemy)।\n২. **E-commerce API** — ক্যাটাগরি ফিল্টার, কার্ট ও চেকআউট ফ্লো, স্টক চেক এবং অ্যাডমিন রোল (FastAPI + PostgreSQL + Alembic)।\n৩. **Task Manager API** — সম্পূর্ণ টাস্ক ম্যানেজমেন্ট, ইউজার আইসোলেশন, স্ট্যাটাস ফিল্টারিং ও সার্চ।\n৪. **URL Shortener API** — দ্রুত শর্ট লিংক তৈরি, রিডাইরেক্ট, ক্লিক অ্যানালিটিক্স ও রেট লিমিটিং।\n\n👉 পেজের **Projects** সেকশনে গিয়ে প্রতিটি প্রজেক্টের সোর্স কোড সরাসরি GitHub-এ দেখতে পারেন!",
        "🚀 **Joy's Featured Backend Projects:**\n1. **Blog REST API** — User accounts, post & comment CRUD, pagination, and JWT auth (FastAPI + PostgreSQL + SQLAlchemy).\n2. **E-commerce API** — Product catalog filters, shopping cart flow, orders & admin RBAC (FastAPI + PostgreSQL + Alembic).\n3. **Task Manager API** — Task CRUD, status filters, and per-user isolation.\n4. **URL Shortener API** — Unique short links, redirect analytics & rate limiting.\n\n👉 Check out the **Projects** section on this page to view live GitHub repositories!"
      );
    }

    // 7. Are you available for work? / Availability / কাজের সুযোগ
    if (
      /(available for work|are you available|available|hire|job|work|opportunity|remote|full time|part time|joining|চাকরি|হায়ার|জব|অ্যাভেইলেবল|কবে জয়েন|কবে কাজ)/i.test(q)
    ) {
      return replyBoth(
        "🎉 **হ্যাঁ! জয় বর্তমানে সম্পূর্ণ প্রস্তুত এবং জবের জন্য অ্যাভেইলেবল (Open to Work)!**\nসে ফুল-টাইম, রিমোট অথবা হাইব্রিড জুনিয়র ব্যাকএন্ড ডেভেলপার (Junior Backend Developer) রোলে অবিলম্বে জয়েন করতে পারে। সে টিমে দ্রুত নতুন প্রযুক্তি শিখতে, নির্ভরযোগ্য কোড লিখতে এবং প্রোডাকশনে অবদান রাখতে প্রস্তুত।\n\nসরাসরি তাকে ইমেইল করতে পারেন: **jr7470008@gmail.com** অথবা নিচের কন্টাক্ট ফর্ম পূরণ করুন!",
        "🎉 **Yes! Joy is actively OPEN TO WORK!**\nHe is seeking a Junior Backend Developer role (Full-time, Remote, or Hybrid) and is ready to start immediately. He is passionate about learning, writing clean code, and contributing to engineering teams.\n\nEmail him directly at **jr7470008@gmail.com** or send a message via the Contact Form below!"
      );
    }

    // 8. Career Goal / Professional Goals / ক্যারিয়ার লক্ষ্য
    if (
      /(career goal|goal|goals|future|dream|professional goal|aim|লক্ষ্য|ক্যারিয়ার লক্ষ্য|ভবিষ্যৎ পরিকল্পনা|উদ্দেশ্য)/i.test(q)
    ) {
      return replyBoth(
        "🎯 **জয়ের ক্যারিয়ার লক্ষ্য (Career Goal):**\nজয়ের প্রধান ক্যারিয়ার লক্ষ্য হলো একজন দক্ষ ও অভিজ্ঞ ব্যাকএন্ড ডেভেলপার (Skilled Backend Developer) হওয়া। সে সিকিউর, এফিশিয়েন্ট, স্কেলেবল এবং ইউজার-ফ্রেন্ডলি ওয়েব অ্যাপ্লিকেশন ও মাইক্রোসার্ভিসেস তৈরি করতে চায় যা লাখ লাখ ব্যবহারকারীর চাপ নির্বিঘ্নে সামলাতে পারে।",
        "🎯 **Joy's Career Goal:**\nJoy's professional goal is to become a skilled Backend Developer and build secure, efficient, scalable, and user-friendly web applications capable of handling production-scale workloads with high reliability."
      );
    }

    // 9. Freelance & Collaboration / কোলাবোরেশন ও ফ্রিল্যান্স
    if (
      /(freelance|collaboration|collaborate|project together|hire for project|ফ্রিল্যান্স|কোলাবোরেশন|একসাথে কাজ)/i.test(q)
    ) {
      return replyBoth(
        "🤝 **ফ্রিল্যান্স ও কোলাবোরেশন (Freelance & Collaboration):**\nহ্যাঁ! জয় ফ্রিল্যান্স ব্যাকএন্ড প্রজেক্ট, কাস্টম এপিআই ডেভেলপমেন্ট, ডেটাবেজ ডিজাইন এবং ওপেন-সোর্স কোলাবোরেশনের জন্য সম্পূর্ণ উন্মুক্ত।\n\nআপনি নতুন কোনো প্রজেক্ট বা যৌথ আইডিয়া নিয়ে আলোচনা করতে চাইলে সরাসরি তাকে ইমেইল করতে পারেন: **jr7470008@gmail.com**",
        "🤝 **Freelance Projects & Collaboration:**\nYes! Joy is open to freelance backend projects, API integrations, database modeling, and technical collaborations.\n\nReach out to him directly at **jr7470008@gmail.com** to discuss your project ideas and opportunities!"
      );
    }

    // 10. Database / PostgreSQL & SQLAlchemy
    if (/(database|postgres|postgresql|sql|sqlalchemy|alembic|ডেটাবেজ|ডাটাবেজ|পোস্টগ্রেস)/i.test(q)) {
      return replyBoth(
        "🗄️ **ডেটাবেজ অভিজ্ঞতা (PostgreSQL & SQLAlchemy):**\nজয় মূলত PostgreSQL নিয়ে কাজ করে। সে SQLAlchemy ORM দিয়ে মডেল রিলেশনশিপস (One-to-Many, Many-to-Many), ফরেন কি কনস্ট্রেইন্টস এবং Alembic দিয়ে অটোমেটেড ডেটাবেজ মাইগ্রেশন পরিচালনা করে। পারফরম্যান্স বৃদ্ধির জন্য সে B-Tree ইনডেক্সিং এবং অপ্টিমাইজড কুয়েরি তৈরি করতে পারে।",
        "🗄️ **Database Capabilities (PostgreSQL & SQLAlchemy):**\nJoy specializes in PostgreSQL relational database design. Using SQLAlchemy ORM and Alembic, he designs normalized schemas, foreign key relationships, handles schema migrations, and optimizes performance using indexing and efficient queries."
      );
    }

    // 11. Can you build REST APIs? / এপিআই ডেভেলপমেন্ট
    if (/(rest api|api development|build api|what can you build|এপিআই|কী বানাতে পারো)/i.test(q)) {
      return replyBoth(
        "🌐 **REST API ডেভেলপমেন্টে দক্ষতা:**\nজয় প্রোডাকশন-রেডি RESTful API আর্কিটেকচার তৈরি করতে পারে। তার এপিআইতে থাকে:\n• স্বয়ংক্রিয় Swagger/OpenAPI ইন্টারঅ্যাক্টিভ ডক্স।\n• Pydantic ইনপুট ভ্যালিডেশন এবং টাইপ সেফটি।\n• JWT টোকেন অথেনটিকেশন ও পাসওয়ার্ড হ্যাশিং।\n• এরর হ্যান্ডলিং ও স্ট্যান্ডার্ড HTTP স্ট্যাটাস কোডস।",
        "🌐 **REST API Development Expertise:**\nJoy develops production-ready RESTful APIs featuring:\n• Automatic interactive Swagger UI and OpenAPI documentation.\n• Robust Pydantic request validation and response schemas.\n• Secure JWT bearer authentication and bcrypt password hashing.\n• Consistent error handling and standard HTTP response status codes."
      );
    }

    // 12. How can I contact you? / Contact Information / যোগাযোগের উপায়
    if (
      /(how can i contact you|contact|email|reach|message|social|linkedin|github|facebook|যোগাযোগ|ইমেইল|কীভাবে যোগাযোগ করব|মেসেজ|ঠিকানা)/i.test(q)
    ) {
      return replyBoth(
        "📬 **জয়ের সাথে যোগাযোগের উপায় (Contact Information):**\n• **Email:** jr7470008@gmail.com\n• **GitHub:** https://github.com/joyroy17\n• **LinkedIn:** https://www.linkedin.com/feed/\n• **Facebook:** https://www.facebook.com/joy.roy.778985\n\n👉 এছাড়াও নিচের **Contact Form** দিয়ে সরাসরি মেসেজ পাঠালে তা সরাসরি জয়ের জিমেইলে চলে যাবে!",
        "📬 **How to Contact Joy:**\n• **Email:** jr7470008@gmail.com\n• **GitHub:** https://github.com/joyroy17\n• **LinkedIn:** https://www.linkedin.com/feed/\n• **Facebook:** https://www.facebook.com/joy.roy.778985\n\n👉 You can also send a direct email using the **Contact Form** at the bottom of this page!"
      );
    }

    // 13. Download CV / Resume / সিভি ডাউনলোড
    if (/(cv|resume|biodata|download cv|সিভি|রিজিউম|সিভি দাও)/i.test(q)) {
      return replyBoth(
        "📄 **জয়ের আপডেটেড সিভি ডাউনলোড করুন:**\n👉 [Download Joy's CV](/cv.pdf)\n\nঅথবা পেজের একদম উপরে মেনুবারে থাকা 'CV' বাটনে ক্লিক করলেই ডাউনলোড হয়ে যাবে!",
        "📄 **Download Joy's Latest Resume / CV:**\n👉 [Download Joy's CV](/cv.pdf)\n\nOr click the 'CV' button located in the top navigation bar to download directly!"
      );
    }

    // 14. Thanks / Gratitude
    if (/(thank|thanks|dhonnobad|ধন্যবাদ|shukriya|great|awesome|good|থ্যাংকস)/i.test(q)) {
      return replyBoth(
        "আপনাকে অনেক ধন্যবাদ! 😊 জয় রয়ের সম্পর্কে আরও কিছু জানতে চাইলে নিঃসঙ্কোচে প্রশ্ন করতে পারেন।",
        "You're very welcome! 😊 Feel free to ask if there's anything else you'd like to explore about Joy."
      );
    }

    // 15. Default Fallback
    return replyBoth(
      "ধন্যবাদ আপনার বার্তার জন্য! আমি জয় রয়ের ব্যাকগ্রাউন্ড, ডিপ্লোমা শিক্ষা (Image Polytechnic Institute, Rangpur), টেকনিক্যাল স্কিলস (Python, FastAPI, PostgreSQL), প্রজেক্ট, সিভি বা জবের সুযোগ সম্পর্কে যেকোনো তথ্য দিতে পারি। উপরের বাটনগুলোতে ক্লিক করতে পারেন অথবা বিস্তারিত লিখে প্রশ্ন করুন!",
      "Thanks for your question! I can provide full details about Joy's background, CST Diploma education (Image Polytechnic Institute, Rangpur), technical skills (Python, FastAPI, PostgreSQL), projects, CV, or job opportunities. Click any prompt above or type your question!"
    );
  };

  const formatText = (text) => {
    const parts = text.split(/(\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+|\*\*[^*]+\*\*|─────────────────────)/g);
    return parts.map((part, i) => {
      if (part === "─────────────────────") {
        return <hr key={i} className="my-2.5 border-t border-[var(--line)] opacity-70" />;
      }
      const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
      if (boldMatch) {
        return <strong key={i} className="font-bold text-[var(--accent2)]">{boldMatch[1]}</strong>;
      }
      const mdMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (mdMatch) {
        return (
          <a
            key={i}
            href={mdMatch[2]}
            download
            className="text-cyan-400 font-bold underline hover:text-cyan-300"
          >
            {mdMatch[1]}
          </a>
        );
      }
      if (/^https?:\/\//.test(part)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 font-bold underline hover:text-cyan-300 break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Chat Trigger Button with Attention-Grabbing Lively Motion & Sonar Beacon */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
        {/* Eye-catching Floating Thought Bubble */}
        {showBubble && !open && (
          <div
            onClick={() => {
              setOpen(true);
              setShowBubble(false);
            }}
            className="ai-bubble-anim mb-3.5 flex items-center gap-2.5 max-w-[270px] sm:max-w-xs rounded-2xl px-3.5 py-2.5 surface border border-[var(--accent2)] shadow-[0_10px_35px_color-mix(in_srgb,var(--accent2)_35%,transparent)] backdrop-blur-2xl text-xs cursor-pointer group hover:scale-105 active:scale-95 transition-all select-none"
          >
            <span className="text-xl ai-wave-hand">👋</span>
            <div className="flex-1 leading-snug">
              <p className="font-extrabold text-[var(--accent2)] flex items-center gap-1.5">
                <span>Ask JoyBot AI</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-400 font-mono border border-cyan-400/30">
                  NEW
                </span>
              </p>
              <p className="text-[11px] muted group-hover:text-[var(--text)] transition-colors mt-0.5">
                Click here to explore Joy's skills & CV!
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              className="text-xs muted hover:text-[var(--text)] p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        )}

        {/* Outer Container with Lively Multi-Axis Floating & Periodic Playful Nudge */}
        <div className="ai-lively-float relative flex items-center justify-center">
          {/* Sonar Beacon Radar Waves Radiating Outward */}
          <span className="ai-sonar-wave absolute inset-0 rounded-full pointer-events-none" />
          <span className="ai-sonar-wave-2 absolute inset-0 rounded-full pointer-events-none" />

          {/* The Interactive High-Tech Pill Button */}
          <button
            onClick={() => {
              setOpen(!open);
              setShowBubble(false);
            }}
            title={open ? "Close JoyBot AI" : "Chat with JoyBot (AI Assistant)"}
            aria-label="Toggle JoyBot AI Assistant"
            className="ai-attention-glow group relative flex items-center gap-2.5 sm:gap-3 rounded-full p-2 pr-4 sm:p-2.5 sm:pr-5 bg-[var(--surface)] backdrop-blur-2xl border border-[var(--accent2)] shadow-[0_0_30px_color-mix(in_srgb,var(--accent2)_55%,transparent)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer overflow-hidden"
          >
            {/* Spinning Rainbow / Cyan Border Beam */}
            <span className="ai-border-beam absolute inset-[-150%] rounded-full opacity-65 pointer-events-none" />
            {/* Inner surface overlay to keep background clean & readable */}
            <span className="absolute inset-[1.5px] rounded-full bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] backdrop-blur-xl pointer-events-none" />

            {/* Avatar with Live Blinking Hologram and Orbit Rings */}
            <div className="relative z-10">
              <AIAgentAvatar isTyping={typing} size="sm" />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </span>
            </div>

            {/* Text Info + AI Pill */}
            <div className="relative z-10 flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-extrabold tracking-tight text-[var(--text)] group-hover:text-[var(--accent2)] transition-colors">
                  JoyBot
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-white shadow-[0_0_10px_var(--accent2)] animate-pulse">
                  AI
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] mono text-emerald-400 font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Online
                </span>
                <span className="text-[9px] mono muted hidden xs:inline">· Ready</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Chat Window Modal */}
      {open && (
        <div className="ai-window-anim fixed bottom-18 sm:bottom-22 right-3 left-3 sm:left-auto sm:right-6 z-50 w-auto sm:w-[410px] h-[520px] max-h-[82vh] rounded-2xl surface backdrop-blur-2xl border border-[var(--line)] shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_92%,black)]">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <AIAgentAvatar isTyping={typing} size="sm" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm leading-tight text-[var(--text)]">JoyBot</h4>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    AI AGENT
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[11px] mono muted">Python & FastAPI · বাংলা / EN</p>
                  <SoundWaveBars isTyping={typing} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setMessages([
                    {
                      sender: "bot",
                      text: "👋 Hi! I'm Joy's AI Assistant. How can I help you today? আপনি বাংলা বা English যেকোনো ভাষায় প্রশ্ন করতে পারেন!",
                      time: "Just now",
                    },
                  ])
                }
                title="Reset conversation"
                className="p-1.5 rounded-lg hover:bg-white/10 text-xs muted hover:text-[var(--text)] transition cursor-pointer"
              >
                🔄
              </button>
              <button
                onClick={() => setOpen(false)}
                title="Close JoyBot"
                className="p-1.5 rounded-lg hover:bg-white/10 text-sm muted hover:text-[var(--text)] transition cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
            {/* AI Welcome Notification Card */}
            <div className="p-3 rounded-xl surface border border-[var(--line)] bg-gradient-to-r from-[color-mix(in_srgb,var(--accent)_8%,transparent)] to-[color-mix(in_srgb,var(--accent2)_8%,transparent)] text-xs space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-[var(--accent2)]">
                <span>⚡</span> Interactive Portfolio AI Agent
              </p>
              <p className="muted text-[11px] leading-relaxed">
                Trained on Joy's backend stack (FastAPI, PostgreSQL), CST Diploma, projects, and career background. Click prompts below or type your inquiry!
              </p>
            </div>

            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`ai-msg-anim flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div className="flex items-end gap-1.5 max-w-[92%] sm:max-w-[85%]">
                  {m.sender === "bot" && (
                    <span className="text-base mb-1 select-none">🤖</span>
                  )}
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 whitespace-pre-wrap leading-relaxed ${
                      m.sender === "user"
                        ? "bg-gradient-to-r from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_80%,var(--accent2))] text-white rounded-br-xs shadow-md"
                        : "surface border border-[var(--line)] text-[var(--text)] rounded-bl-xs shadow-sm"
                    }`}
                  >
                    {m.sender === "bot" ? formatText(m.text) : m.text}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-[10px] mono muted">{m.time}</span>
                  {m.sender === "bot" && (
                    <button
                      onClick={() => copyText(m.text, idx)}
                      className="text-[10px] mono muted hover:text-[var(--accent2)] cursor-pointer"
                      title="Copy response"
                    >
                      {copiedIndex === idx ? "Copied ✓" : "Copy"}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Neural Typing Indicator */}
            {typing && (
              <div className="ai-msg-anim flex items-center gap-2 surface border border-[var(--line)] px-3 py-2 rounded-2xl rounded-bl-xs w-fit">
                <AIAgentAvatar isTyping={true} size="sm" />
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent2)] animate-bounce [animation-delay:0.3s]" />
                </div>
                <span className="text-[11px] mono muted ml-1">JoyBot is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 border-t border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_50%,transparent)] flex gap-1.5 overflow-x-auto text-xs no-scrollbar">
            {quickPrompts.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setInput("");
                  const reply = generateBotReply(p.q);
                  setMessages((prev) => [
                    ...prev,
                    {
                      sender: "user",
                      text: p.q,
                      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    },
                    {
                      sender: "bot",
                      text: reply,
                      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    },
                  ]);
                }}
                className="whitespace-nowrap px-2.5 py-1 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[11px] muted hover:text-[var(--accent2)] hover:border-[var(--accent2)] transition-all hover:scale-102 active:scale-98 cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const query = input.trim();
              if (!query) return;
              setInput("");
              const userTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              setMessages((prev) => [...prev, { sender: "user", text: query, time: userTime }]);
              setTyping(true);
              setTimeout(() => {
                const reply = generateBotReply(query);
                const botTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                setMessages((prev) => [...prev, { sender: "bot", text: reply, time: botTime }]);
                setTyping(false);
              }, 400);
            }}
            className="p-2.5 border-t border-[var(--line)] flex items-center gap-2 bg-[var(--surface)]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask in বাংলা or English..."
              className="flex-1 px-3 py-2 rounded-xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] text-base sm:text-xs text-[var(--text)] outline-none focus:border-[var(--accent)] transition"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="btn btn-main !py-2 !px-3.5 !text-xs rounded-xl flex items-center justify-center disabled:opacity-40 cursor-pointer shadow-md"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}

const TOKENS = [
  ["{ }", "6%", "8%"], ["</>", "48%", "4%"], ["SELECT *", "88%", "14%"], ["async def", "4%", "70%"],
  ["JWT", "52%", "88%"], ["pip install", "80%", "76%"], ["POST /", "30%", "40%"],
];

export default function App() {
  const [dark, toggle] = useTheme();
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const links = ["about", "skills", "projects", "contact"];
  const active = useActive(["home", ...links]);
  const pct = useScrollPct();
  const role = useTyper(PROFILE.roles);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=JetBrains+Mono:wght@400;600&display=swap";
    document.head.appendChild(l);
  }, []);

  const copyMail = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };
  const send = async (e) => {
    if (e) e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setStatusMsg("Please fill in your name, email, and message.");
      return;
    }

    setStatus("submitting");
    setStatusMsg("");

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${PROFILE.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New Portfolio Message from ${form.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setStatusMsg("Thank you! Your message has been sent successfully.");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch {
      setStatus("error");
      setStatusMsg("Failed to send message. Please contact me directly via email.");
    }
  };
  const themeBtn = (
    <button onClick={toggle} aria-label="Toggle dark mode" className="btn btn-line !px-3 !py-1.5">{dark ? "Light" : "Dark"}</button>
  );
  const marquee = [...SKILLS.Backend, ...SKILLS.Database, ...SKILLS.Frontend];

  return (
    <div className="page relative min-h-screen w-full overflow-x-hidden">
      <style>{STYLES}</style>
      <Background dark={dark} />
      <Cursor />
      <JoyBot />

      <div className="relative z-10 w-full overflow-x-hidden">
        <div className="fixed left-0 top-0 z-50 h-1" style={{ boxShadow: "0 0 12px var(--accent2)", width: `${pct}%`, background: "linear-gradient(90deg,var(--accent),var(--accent2))" }} />

        {/* Navbar */}
        <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: "color-mix(in srgb, var(--bg) 85%, transparent)", borderBottom: "1px solid var(--line)" }}>
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3">
            <a href="#home" className="mono font-bold text-base sm:text-lg flex items-center gap-1.5">
              <span>joy</span><span className="acc flicker">.dev</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--line)] muted hidden sm:inline">FastAPI</span>
            </a>
            <div className="hidden items-center gap-5 lg:gap-6 text-sm md:flex">
              {links.map((l) => (
                <a key={l} href={`#${l}`} className={`capitalize transition-colors hover:text-[var(--accent2)] ${active === l ? "acc font-bold" : "muted"}`}>{l}</a>
              ))}
              <a href={PROFILE.cv} download className="btn btn-line !py-1.5 !px-3">CV</a>
              {themeBtn}
            </div>
            <div className="flex items-center gap-2 md:hidden">
              {themeBtn}
              <button
                onClick={() => setMenu(!menu)}
                aria-label="Toggle navigation menu"
                className="btn btn-line !px-3 !py-1.5 flex items-center gap-1.5 font-mono text-xs cursor-pointer"
              >
                <span>{menu ? "✕" : "☰"}</span>
                <span>{menu ? "Close" : "Menu"}</span>
              </button>
            </div>
          </nav>
          {menu && (
            <div className="flex flex-col gap-2.5 px-6 py-4 text-sm md:hidden surface border-b border-[var(--line)] shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
              {links.map((l) => (
                <a
                  key={l}
                  href={`#${l}`}
                  onClick={() => setMenu(false)}
                  className={`capitalize py-2 px-2.5 rounded-lg transition-colors flex items-center justify-between ${active === l ? "acc font-bold bg-white/5" : "muted"}`}
                >
                  <span>{l}</span>
                  <span className="text-xs opacity-50">→</span>
                </a>
              ))}
              <div className="pt-2 border-t border-[var(--line)] flex gap-2">
                <a
                  href={PROFILE.cv}
                  download
                  onClick={() => setMenu(false)}
                  className="btn btn-main flex-1 text-center !py-2"
                >
                  Download CV
                </a>
              </div>
            </div>
          )}
        </header>

        {/* Hero: photo + name together, 3D scene beside */}
        <div id="home" className="relative overflow-hidden w-full">
          {TOKENS.map(([t, l, tp], i) => (
            <span key={t} className="float mono muted pointer-events-none absolute hidden text-xs opacity-40 lg:block" style={{ left: l, top: tp, animationDelay: `${i * 0.7}s` }}>{t}</span>
          ))}
          <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:gap-10 px-4 sm:px-6 py-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
            <div>
              <p className="mono muted mb-3 text-xs sm:text-sm"><span className="acc2 flicker">joy@dev</span>:<span className="acc">~/portfolio</span>$ whoami</p>

              {/* Live Server & Backend Health Indicator Bar */}
              <div className="mb-6 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs mono">
                <div className="lineb flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 bg-[var(--surface)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-bold text-emerald-400">FastAPI</span>: <span className="opacity-90">Online</span>
                </div>
                <div className="lineb flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 bg-[var(--surface)]">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span className="font-bold text-cyan-400">PostgreSQL</span>: <span className="opacity-90">Connected</span>
                </div>
                <div className="lineb flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 bg-[var(--surface)]">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Latency: <span className="acc font-bold">14ms</span></span>
                </div>
                <div className="lineb flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 bg-[var(--surface)] text-amber-300">
                  <span>🚀 Ready to Hire</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex flex-col items-center sm:items-start md:flex-row md:items-center gap-4 sm:gap-6 text-center sm:text-left min-w-0 w-full">
                <Avatar />
                <div className="min-w-0 max-w-full">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight break-words">{PROFILE.name}</h1>
                  <p className="mono acc caret mt-1.5 sm:mt-2 min-h-[1.5rem] sm:min-h-[1.75rem] text-xs font-semibold sm:text-lg break-words">{role}</p>
                </div>
              </div>
              <p className="muted mt-4 sm:mt-6 max-w-lg text-xs sm:text-base mx-auto sm:mx-0 text-center sm:text-left leading-relaxed break-words">{PROFILE.tagline}</p>
              <div className="mt-5 sm:mt-7 flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                <a href={PROFILE.cv} download className="btn btn-main !text-xs sm:!text-sm">Download CV</a>
                <a href="#projects" className="btn btn-line !text-xs sm:!text-sm">View projects</a>
                <a href="#contact" className="btn btn-line !text-xs sm:!text-sm">Contact me</a>
              </div>
              <div className="mt-4 sm:mt-6 flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">{SOCIALS.map((s) => <SocialLink key={s.id} s={s} />)}</div>
            </div>

            {/* 3D Scene + ResponseCard (Cleanly separated in layout on mobile, floating on desktop) */}
            <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[460px] mt-4 lg:mt-0 flex flex-col items-center min-w-0">
              <div className="relative h-[210px] xs:h-[250px] sm:h-[340px] lg:h-[440px] w-full overflow-hidden rounded-2xl">
                <Scene3D dark={dark} />
              </div>
              <div className="mt-3 lg:mt-0 lg:absolute lg:-bottom-2 lg:right-0 float w-full flex justify-center lg:w-auto min-w-0">
                <ResponseCard />
              </div>
            </div>
          </div>
        </div>

        {/* Tech marquee */}
        <div className="overflow-hidden py-3 w-full max-w-full" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="marquee mono text-xs sm:text-sm muted">
            {[...marquee, ...marquee].map((t, i) => (
              <span key={i} className="mx-4 sm:mx-6 whitespace-nowrap">{t} <span className="acc2">/</span></span>
            ))}
          </div>
        </div>

        {/* About */}
        <Section id="about" title="About me" route="GET /about">
          <div className="grid gap-8 lg:gap-10 lg:grid-cols-2 items-start min-w-0 w-full max-w-full">
            <Reveal from="left" className="min-w-0 w-full max-w-full muted space-y-4 text-xs sm:text-base leading-relaxed break-words">
              {ABOUT.map((p) => <p key={p} className="break-words">{p}</p>)}
              <ul className="mt-5 sm:mt-6 space-y-4 pl-3.5 sm:pl-5" style={{ borderLeft: "2px solid var(--line)" }}>
                {JOURNEY.map((j) => (
                  <li key={j.what} className="min-w-0">
                    <p className="acc text-xs font-bold">{j.when}</p>
                    <p className="font-bold text-sm sm:text-base break-words" style={{ color: "var(--text)" }}>{j.what}</p>
                    <p className="text-xs sm:text-sm break-words">{j.sub}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal from="right" className="min-w-0 w-full max-w-full space-y-4 sm:space-y-6">
              <div className="surface rounded-xl p-3 sm:p-4 min-w-0 w-full max-w-full overflow-hidden">
                <p className="mono muted mb-2 text-xs flex items-center justify-between">
                  <span>how my APIs work</span>
                  <span className="sm:hidden text-[10px] opacity-60">← scroll →</span>
                </p>
                <div className="w-full overflow-x-auto min-w-0">
                  <RequestFlow reduce={reduce} />
                </div>
              </div>
              <div className="mono overflow-hidden rounded-xl text-slate-200 min-w-0 w-full max-w-full" style={{ background: "var(--code)", border: "1px solid var(--line)" }}>
                <div className="px-3 sm:px-4 py-2 text-xs text-slate-400" style={{ borderBottom: "1px solid var(--line)" }}>routers/posts.py</div>
                <pre className="overflow-x-auto p-3 sm:p-4 text-[10px] sm:text-xs leading-relaxed max-w-full"><Code text={SNIPPET} /></pre>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" title="What I do" route="GET /skills" intro="The work I can take on, and the tools I use for it.">
          <div className="grid gap-3.5 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 min-w-0 w-full max-w-full">
            {SERVICES.map((s, i) => (
              <Reveal key={s.t} delay={i * 120} from="zoom" className="h-full min-w-0">
                <div className="surface zap h-full rounded-xl p-4 sm:p-5 transition hover:-translate-y-1 min-w-0">
                  <h3 className="font-bold text-base sm:text-lg">{s.t}</h3>
                  <p className="muted mt-2 text-xs sm:text-sm leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 min-w-0 w-full max-w-full">
            {Object.entries(SKILLS).map(([g, items], gi) => (
              <Reveal key={g} delay={gi * 120} from={gi % 2 ? "right" : "left"} className="min-w-0">
                <h3 className="acc mb-3 font-bold text-base sm:text-lg">{g}</h3>
                <ul className="flex flex-wrap gap-1.5 sm:gap-2">{items.map((s) => <li key={s} className="chip text-xs sm:text-sm">{s}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" title="Projects" route="GET /projects" intro="Each project is a working API with source code. Open the code to see the schema, routes and README.">
          <div className="grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2 min-w-0 w-full max-w-full">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 150} className="h-full min-w-0">
                <article className="surface zap flex h-full flex-col justify-between rounded-xl p-4 sm:p-6 transition hover:-translate-y-1 min-w-0 w-full max-w-full overflow-hidden">
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-extrabold">{p.title}</h3>
                    <p className="muted mt-2 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
                    <ul className="mt-3 sm:mt-4 list-inside list-disc space-y-1 text-xs sm:text-sm">
                      {p.features.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                    <div className="mono mt-3 sm:mt-4 space-y-1 rounded-lg p-2.5 sm:p-3 text-[10px] sm:text-xs overflow-x-auto min-w-0 max-w-full" style={{ background: "var(--code)", color: "#e2e8f0" }}>
                      {p.endpoints.map((e) => {
                        const [m, ...rest] = e.split(" ");
                        return (
                          <div key={e} className="whitespace-nowrap">
                            <span style={{ color: m === "GET" ? "#19e6ff" : "#7b9bff" }} className="font-bold">{m}</span> {rest.join(" ")}
                          </div>
                        );
                      })}
                    </div>
                    <ul className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 text-xs">
                      {p.stack.map((t) => <li key={t} className="chip !px-2 !py-0.5 !text-[11px] sm:!text-xs">{t}</li>)}
                    </ul>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3 pt-2">
                    <a href={p.code} target="_blank" rel="noreferrer" className="btn btn-line !py-1.5 !px-3 !text-xs sm:!text-sm">Source code</a>
                    {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-main !py-1.5 !px-3 !text-xs sm:!text-sm">Live demo</a>}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" title="Let's work together" route="POST /contact" intro="I'm looking for my first junior backend developer role. Send a message, or find me on these platforms.">
          <div className="grid gap-8 md:grid-cols-2 min-w-0 w-full max-w-full">
            <Reveal from="left" className="min-w-0 w-full max-w-full">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <a href={`mailto:${PROFILE.email}`} className="acc font-bold hover:underline text-xs sm:text-base break-all">{PROFILE.email}</a>
                <button onClick={copyMail} className="btn btn-line !px-2.5 !py-1 !text-xs cursor-pointer">{copied ? "Copied ✓" : "Copy"}</button>
              </div>
              <p className="muted mt-2 text-xs sm:text-sm">{PROFILE.location}</p>
              <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">{SOCIALS.map((s) => <SocialLink key={s.id} s={s} big />)}</div>
              <a href={PROFILE.cv} download className="btn btn-main mt-6 sm:mt-8 inline-block !text-xs sm:!text-sm">Download CV</a>
            </Reveal>
            <Reveal from="right" className="min-w-0 w-full max-w-full">
              <form onSubmit={send} className="space-y-3 min-w-0 w-full max-w-full">
                <input
                  required
                  className="field text-base sm:text-sm"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  required
                  className="field text-base sm:text-sm"
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <textarea
                  required
                  className="field text-base sm:text-sm"
                  rows={5}
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn btn-main w-full sm:w-auto disabled:opacity-50 cursor-pointer !text-xs sm:!text-sm"
                >
                  {status === "submitting" ? "Sending..." : "Send message"}
                </button>

                {status === "success" && (
                  <p className="rounded-lg bg-emerald-500/10 p-2.5 text-xs sm:text-sm font-semibold text-emerald-400">
                    ✓ {statusMsg}
                  </p>
                )}
                {status === "error" && (
                  <p className="rounded-lg bg-rose-500/10 p-2.5 text-xs sm:text-sm font-semibold text-rose-400">
                    ✗ {statusMsg}
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </Section>

        <footer className="muted py-6 text-center text-xs sm:text-sm px-4" style={{ borderTop: "1px solid var(--line)" }}>
          © {new Date().getFullYear()} {PROFILE.name} · Junior Backend Developer Portfolio
        </footer>
      </div>
    </div>
  );
}
