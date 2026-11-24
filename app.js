const $=id=>document.getElementById(id);
const esc=s=>String(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const P={
check:'<circle cx="12" cy="12" r="9.5"/><path d="M7.5 12.3l3 3 6-6.6"/>',
fridge:'<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M6 13.5h12M8.5 6v3M8.5 16v2.5"/>',
power:'<rect x="5" y="2.5" width="14" height="19" rx="1.5"/><path d="M12.8 6.5l-2.6 5h3.6l-2.6 5"/>',
wallet:'<path d="M4 7.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1z"/><path d="M4 7.5l11-3.5v3.5M16 14h4"/>',
cake:'<path d="M4 20.5h16v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2zM4 16c2 1.5 4 1.5 6 0s4-1.5 6 0 3 1.5 4 .5M12 11.5V8"/>',
cal:'<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
mail:'<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 7.5l9 6 9-6"/>',
car:'<path d="M5 16v-5l2-5h10l2 5v5M3 16h18M7 19v-3M17 19v-3"/>',
child:'<circle cx="12" cy="7.5" r="3.5"/><path d="M5.5 20.5c0-3.8 2.9-6.5 6.5-6.5s6.5 2.7 6.5 6.5"/>',
med:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M12 9v7M8.5 12.5h7M9 5V3.5h6V5"/>',
home:'<path d="M3.5 11L12 3.5l8.5 7.5M5.5 9.5v11h13v-11M10 20.5v-5.5h4v5.5"/>',
subs:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8.5 20.5h7M12 17v3.5"/>',
pros:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3.5 17.5l3 3 5.8-5.8a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
docs:'<path d="M14 3H6.5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8.5z"/><path d="M14 3v5.5h5.5M8.5 13h7M8.5 17h4.5"/>',
meals:'<path d="M4 11.5h16a8 8 0 0 1-16 0zM9 8c0-1 1-1 1-2.5M14 8c0-1 1-1 1-2.5"/>',
trip:'<path d="M21 15.5l-8-4.5V5a1.5 1.5 0 0 0-3 0v6l-7 4.5v2l7-2v4l-2 1.5v1.5l3.5-1 3.5 1v-1.5L13 19.5v-4l8 2z"/>',
fashion:'<path d="M12 7.5a2 2 0 1 1 2-2M12 7.5v1.5L3 16a1.5 1.5 0 0 0 1 2.5h16A1.5 1.5 0 0 0 21 16l-9-7"/>',
invest:'<path d="M3.5 20.5h17M5 16.5l4.5-5 3.5 3 6.5-7.5M15.5 7h4v4"/>'};
const svg=k=>`<svg class="i" viewBox="0 0 24 24">${P[k]}</svg>`;
const parts=[["check","משימות","tasks"],["fridge","מקרר","fridge"],["power","ארון חשמל","power"],["wallet","ארנק","wallet"],["cake","ימי הולדת","bday"],
["cal","לוח שנה"],["mail","תיבת חשבונות"],["car","מכוניות"],["child","הילד"],["med","ארון תרופות"],["home","הבית"],["subs","מנויים"],
["pros","אנשי מקצוע"],["docs","מסמכים חשובים"],["meals","תכנון ארוחות"],["trip","חופשות ובילויים"],["fashion","אופנה"],["invest","השקעות פיננסיות"]];
const PEOPLE=["איציק","אסתר","סינתיה"];
const SHELVES=["מוצרי חלב","ירקות ופירות","שתייה","בשר ודגים","לחם ומאפים"];
const FREEZER=[3,4];
const EMO={"חלב":"🥛","ביצ":"🥚","גבינ":"🧀","ירק":"🥦","פיר":"🍎","לחם":"🍞","בשר":"🥩","עוף":"🍗","דג":"🐟","מים":"💧","מיץ":"🧃","יוגורט":"🥣","חמאה":"🧈","גלידה":"🍨"};
const emo=n=>{for(const k in EMO)if(n.includes(k))return EMO[k];return "📦"};

let S=JSON.parse(localStorage.getItem("mb2")||"null")||{tasks:[],cards:[],
 items:[["חלב",0],["גבינה",0],["ביצים",0],["ירקות",1],["לחם",4]].map(([n,s])=>({n,s,in:true,exp:""})),
 power:["מזגן","חימום","בוילר","מכונת כביסה ומייבש","טעינת טסלה"].map(n=>({n,now:0,last:0})),
 bdays:[{n:"איציק",d:""},{n:"אסתר",d:""},{n:"הילד",d:""}],pin:""};
const save=()=>{localStorage.setItem("mb2",JSON.stringify(S));draw()};
const buzz=()=>navigator.vibrate&&navigator.vibrate(8);
let me=localStorage.getItem("me");
if(!me){me=(prompt("מי משתמש במכשיר הזה? איציק, אסתר, סינתיה, או מטבח")||"מטבח").trim();localStorage.setItem("me",me)}
const nm=w=>w===me?"אני":w;
const todayStr=()=>new Date().toISOString().slice(0,10);

const f=(l,h)=>`<label class="f"><span>${l}</span>${h}</label>`;
const scr=(id,t,b)=>`<div class="screen" id="${id}"><div class="top"><h2${id=="soon"?' id="soonT"':''}>${t}</h2><button class="btn" onclick="closeAll()">חזרה</button></div>${b}</div>`;
const pOpts=PEOPLE.map(p=>`<option value="${p}">${nm(p)}</option>`).join("");
const alerts=[[0,"בזמן המשימה"],[10,"10 דקות לפני"],[30,"חצי שעה לפני"],[60,"שעה לפני"],[1440,"יום לפני"]].map(([v,t])=>`<option value="${v}">${t}</option>`).join("");
document.body.innerHTML=`<header><h1>משק בית</h1><div class="rule"></div><div class="sub">כל הבית במקום אחד</div></header>
<div class="grid" id="grid"></div><div class="side" id="side" onclick="openToday()"></div>`
+scr("tasks","משימות",`<div class="card form">${f("מה לעשות",'<input id="tTitle">')}${f("תאריך",'<input id="tDate" type="date">')}${f("שעה",'<input id="tTime" type="time">')}
${f("אחראי",`<select id="tWho">${pOpts}<option value="כולם">כולם</option></select>`)}${f("התראה",`<select id="tAlert">${alerts}</select>`)}
<button class="add" onclick="addTask()">הוסף משימה</button></div><div id="tOpen"></div><h3>בוצע</h3><div id="tDone"></div>`)
+scr("today","משימות להיום",`<div id="tToday"></div>`)
+scr("fridge","מקרר",`<div class="fz"><div class="zt">מקרר</div><div id="fTop"></div><div class="frz"><div class="zt">מקפיא</div><div id="fBot"></div></div></div>
<div class="card form">${f("מוצר חדש",'<input id="fName">')}${f("מדף",`<select id="fShelf">${SHELVES.map((s,i)=>`<option value="${i}">${s}</option>`).join("")}</select>`)}${f("תאריך תפוגה",'<input id="fExp" type="date">')}
<button class="add" onclick="addItem()">הוסף למקרר</button></div><h3>רשימת קניות · אברגרין</h3><div id="fShop"></div>`)
+scr("power","ארון חשמל",`<div class="card tot"><small>החודש</small><b id="pTot"></b><div id="pCmp"></div></div><div id="pList"></div>`)
+scr("wallet","ארנק",`<div id="wLock" class="card form"><div id="wMsg"></div><input id="wPin" type="password" inputmode="numeric" maxlength="6"><button class="add" onclick="unlock()">פתח</button></div>
<div id="wIn"><div class="card tot"><small>הוצאות החודש</small><b id="wTot"></b></div><div id="wCards"></div>
<div class="card form">${f("שם הכרטיס",'<input id="cName">')}${f("של מי",`<select id="cOwner">${pOpts}</select>`)}${f("בנק",'<input id="cBank">')}
${f("4 ספרות אחרונות",'<input id="cLast" inputmode="numeric" maxlength="4">')}${f("תוקף",'<input id="cExp" placeholder="MM/YY">')}${f("יום חיוב בחודש",'<input id="cDay" inputmode="numeric">')}${f("מסגרת $",'<input id="cLimit" inputmode="decimal">')}
<button class="add" onclick="addCard()">הוסף כרטיס</button></div></div>`)
+scr("bday","ימי הולדת",`<div id="bList"></div><div class="card form">${f("שם",'<input id="bName">')}${f("תאריך",'<input id="bDate" type="date">')}<button class="add" onclick="addBday()">הוסף יום הולדת</button></div>`)
+scr("soon","",`<div class="empty">בקרוב</div>`)+`<div class="scene" id="scene"></div>`;
if(PEOPLE.includes(me)){$("tWho").value=me;$("cOwner").value=me}

parts.forEach(([k,t,id])=>{const d=document.createElement("div");d.className="icon";d.innerHTML=svg(k)+`<span class="t">${t}</span>`;
 d.onpointermove=e=>{const r=d.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  d.style.transform=`perspective(600px) rotateX(${-y*14}deg) rotateY(${x*14}deg) translateY(-3px)`;d.style.setProperty("--sx",(x+.5)*100+"%");d.style.setProperty("--sy",(y+.5)*100+"%")};
 const reset=()=>d.style.transform="";d.onpointerleave=reset;
 d.onpointerdown=()=>{d.classList.remove("sh");void d.offsetWidth;d.classList.add("sh")};
 d.onclick=()=>{buzz();reset();openFrom(d,id||"soon",t)};$("grid").appendChild(d)});

function show(id,el){const sc=$(id);draw();sc.style.display="block";sc.scrollTop=0;if(!el)return;
 const r=el.getBoundingClientRect();sc.style.transformOrigin=`${r.left+r.width/2}px ${r.top+r.height/2}px`;
 sc.animate([{transform:"perspective(1200px) scale(.12) rotateY(-220deg)",opacity:.3},{transform:"perspective(1200px) scale(1) rotateY(0)",opacity:1}],{duration:1500,easing:"cubic-bezier(.22,1,.36,1)"})}
function openFrom(el,id,t){if(id=="soon")$("soonT").textContent=t;
 if(id=="fridge")return scene3D("fr",()=>show("fridge"));
 if(id=="power")return scene3D("pw",()=>show("power"));
 show(id,el)}
function scene3D(type,done){const sc=$("scene");sc.innerHTML="";sc.style.display="flex";
 const o=document.createElement("div");o.className="obj"+(type=="pw"?" pw":"");
 o.innerHTML=(type=="fr"?'<div class="in"><i></i><i></i><b></b></div>':'<div class="in p">'+"<span></span>".repeat(8)+'</div>')
  +'<div class="sd l"></div><div class="sd r"></div>'
  +(type=="fr"?'<div class="dr dtop"><em>מקרר</em></div><div class="dr dbot"><em>מקפיא</em></div>':'<div class="dr dfull"><em>ארון חשמל</em></div>');
 sc.appendChild(o);
 o.animate([{transform:"translateZ(-2400px) rotateY(-35deg)",opacity:0},{transform:"translateZ(-2200px) rotateY(-32deg)",opacity:1,offset:.12},{transform:"translateZ(0) rotateY(0)",opacity:1}],
  {duration:1900,easing:"cubic-bezier(.16,1,.3,1)",fill:"forwards"}).onfinish=()=>{
  const ds=[...o.querySelectorAll(".dr")];let n=0;
  ds.forEach(d=>{d.animate([{transform:"rotateY(0)"},{transform:"rotateY(-115deg)"}],{duration:1300,easing:"cubic-bezier(.65,0,.35,1)",fill:"forwards"}).onfinish=()=>{
   if(++n<ds.length)return;
   o.animate([{transform:"translateZ(0)",opacity:1},{transform:"translateZ(1000px)",opacity:0}],{duration:900,delay:250,easing:"cubic-bezier(.7,0,.3,1)",fill:"forwards"}).onfinish=()=>{sc.style.display="none";done()}}})}}
let unlocked=false;
function closeAll(){buzz();unlocked=false;document.querySelectorAll(".screen").forEach(s=>s.style.display="none");draw()}
function openToday(){buzz();show("today")}

function ics(lines){const a=document.createElement("a");
 a.href="data:text/calendar;charset=utf-8,"+encodeURIComponent(["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//MeshekBayit//HE","BEGIN:VEVENT","UID:"+Date.now()+"@mb",...lines,"END:VEVENT","END:VCALENDAR"].join("\r\n"));
 a.download="mb.ics";a.click()}
function addTask(){const title=$("tTitle").value.trim();if(!title){$("tTitle").focus();return}buzz();
 S.tasks.push({title,date:$("tDate").value,time:$("tTime").value,who:$("tWho").value,alert:+$("tAlert").value,done:false});$("tTitle").value="";save()}
function toggle(i){buzz();S.tasks[i].done=!S.tasks[i].done;save()}
function taskRow(t,i){return `<div class="card row ${t.done?'on done':''}"><svg class="chk" viewBox="0 0 28 28" onclick="toggle(${i})"><circle cx="14" cy="14" r="12.5"/><path d="M8.5 14.5l3.8 3.8 7.2-8"/></svg>
 <div class="grow"><div class="title">${esc(t.title)}</div><small>${t.date||'ללא תאריך'}${t.time?' · '+t.time:''} · ${nm(t.who)}</small></div>
 ${t.done?'':`<button class="btn" onclick="taskCal(${i})">⏰</button>`}</div>`}
function taskCal(i){const t=S.tasks[i];if(!t.date){alert("צריך לבחור תאריך למשימה");return}
 ics(["DTSTART:"+t.date.replace(/-/g,"")+"T"+(t.time||"09:00").replace(":","")+"00","DURATION:PT30M","SUMMARY:"+t.title,"BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:"+t.title,"TRIGGER:-PT"+(t.alert||0)+"M","END:VALARM"])}

function addItem(){const n=$("fName").value.trim();if(!n){$("fName").focus();return}buzz();S.items.push({n,s:+$("fShelf").value,in:true,exp:$("fExp").value});$("fName").value="";$("fExp").value="";save()}
function toggleItem(i){buzz();S.items[i].in=!S.items[i].in;save()}
const soonExp=d=>d&&(new Date(d)-new Date(todayStr()))/864e5<=2;
let dg=null;
function itDown(e,i){dg={i,el:e.currentTarget,x:e.clientX,y:e.clientY,m:false};dg.el.setPointerCapture(e.pointerId)}
document.addEventListener("pointermove",e=>{if(!dg)return;const dx=e.clientX-dg.x,dy=e.clientY-dg.y;
 if(!dg.m&&Math.hypot(dx,dy)<8)return;dg.m=true;
 Object.assign(dg.el.style,{transform:`translate(${dx}px,${dy}px) scale(1.15)`,zIndex:60,pointerEvents:"none"});
 document.querySelectorAll(".shelf").forEach(s=>s.classList.remove("hl"));
 const sh=document.elementFromPoint(e.clientX,e.clientY)?.closest(".shelf");if(sh)sh.classList.add("hl")});
document.addEventListener("pointerup",e=>{if(!dg)return;const d=dg;dg=null;if(!d.m){toggleItem(d.i);return}
 const sh=document.elementFromPoint(e.clientX,e.clientY)?.closest(".shelf");
 if(sh){const it=S.items.splice(d.i,1)[0];it.s=+sh.dataset.s;S.items.push(it)}buzz();save()});
const shelfHTML=si=>`<div class="shelf" data-s="${si}"><div class="sl">${SHELVES[si]}</div><div class="items">`+
 S.items.map((it,i)=>[it,i]).filter(([it])=>it.s===si).map(([it,i])=>`<div class="it ${it.in?'':'out'} ${soonExp(it.exp)?'ex':''}" onpointerdown="itDown(event,${i})"><span>${emo(it.n)}</span><small>${esc(it.n)}</small></div>`).join("")+`</div></div>`;

function unlock(){const p=$("wPin").value;if(p.length<4){alert("קוד של 4 ספרות לפחות");return}
 if(!S.pin){S.pin=p;unlocked=true}else if(p===S.pin)unlocked=true;else alert("קוד שגוי");$("wPin").value="";save()}
function addCard(){const n=$("cName").value.trim();if(!n){$("cName").focus();return}buzz();
 S.cards.push({n,owner:$("cOwner").value,bank:$("cBank").value.trim(),l:$("cLast").value.replace(/\D/g,"").slice(-4),exp:$("cExp").value,day:$("cDay").value,limit:+$("cLimit").value||0,spent:0});
 ["cName","cBank","cLast","cExp","cDay","cLimit"].forEach(x=>$(x).value="");save()}
function setNum(path,i,key,v){S[path][i][key]=+v||0;save()}

function addBday(){const n=$("bName").value.trim();if(!n){$("bName").focus();return}buzz();S.bdays.push({n,d:$("bDate").value});$("bName").value="";$("bDate").value="";save()}
function setBday(i,v){S.bdays[i].d=v;save()}
function daysTo(d){const t=new Date(todayStr()),x=new Date(d);x.setFullYear(t.getFullYear());if(x<t)x.setFullYear(t.getFullYear()+1);return Math.round((x-t)/864e5)}
function bdCal(i){const b=S.bdays[i];if(!b.d){alert("צריך תאריך");return}
 ics(["DTSTART;VALUE=DATE:"+b.d.replace(/-/g,""),"RRULE:FREQ=YEARLY","SUMMARY:יום הולדת "+b.n,"BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:יום הולדת "+b.n+" בעוד שבועיים","TRIGGER:-P14D","END:VALARM"])}

function draw(){
 const all=S.tasks.map((t,i)=>[t,i]),open=all.filter(([t])=>!t.done);
 $("tOpen").innerHTML=open.map(([t,i])=>taskRow(t,i)).join("")||'<div class="empty">אין משימות פתוחות</div>';
 $("tDone").innerHTML=all.filter(([t])=>t.done).map(([t,i])=>taskRow(t,i)).join("");
 const td=open.filter(([t])=>!t.date||t.date<=todayStr());
 $("tToday").innerHTML=td.map(([t,i])=>taskRow(t,i)).join("")||'<div class="empty">אין משימות להיום</div>';
 $("side").className="side"+(open.length?" hot":"");$("side").innerHTML=svg("check")+`<b>${open.length}</b>משימות`;
 $("fTop").innerHTML=[0,1,2].map(shelfHTML).join("");$("fBot").innerHTML=FREEZER.map(shelfHTML).join("");
 const miss=S.items.filter(it=>!it.in);
 $("fShop").innerHTML=miss.map(it=>`<div class="card row"><span>${emo(it.n)}</span><div class="grow title">${esc(it.n)}</div><a class="btn" href="https://www.shopevergreenkosher.com/" target="_blank">לקנייה</a></div>`).join("")||'<div class="empty">לא חסר כלום</div>';
 const now=S.power.reduce((a,p)=>a+p.now,0),last=S.power.reduce((a,p)=>a+p.last,0);
 $("pTot").textContent="$"+now.toFixed(2);
 $("pCmp").innerHTML=last?`חודש שעבר $${last.toFixed(2)} <span class="${now>last?'up':'down'}">${now>last?'▲':'▼'}</span>`:"";
 $("pList").innerHTML=S.power.map((p,i)=>`<div class="card form"><div class="title">${p.n} ${p.last?`<span class="${p.now>p.last?'up':'down'}">${p.now>p.last?'▲':'▼'}</span>`:''}</div>
  ${f("החודש $",`<input inputmode="decimal" value="${p.now||''}" onchange="setNum('power',${i},'now',this.value)">`)}
  ${f("חודש שעבר $",`<input inputmode="decimal" value="${p.last||''}" onchange="setNum('power',${i},'last',this.value)">`)}</div>`).join("");
 $("wLock").style.display=unlocked?"none":"grid";$("wIn").style.display=unlocked?"block":"none";
 $("wMsg").textContent=S.pin?"הכנס קוד לארנק":"בחר קוד לארנק (4 ספרות לפחות)";
 $("wTot").textContent="$"+S.cards.reduce((a,c)=>a+(c.spent||0),0).toFixed(2);
 $("wCards").innerHTML=S.cards.map((c,i)=>`<div class="cc"><div class="title">${esc(c.n)}</div><small>${esc(c.bank)}${c.owner?' · '+nm(c.owner):''}</small>
  <div class="n">•••• ${esc(c.l)}</div><small>${c.exp?'תוקף '+esc(c.exp):''}${c.day?' · חיוב ב-'+esc(c.day)+' לחודש':''}${c.limit?' · מסגרת $'+c.limit:''}</small>
  <input inputmode="decimal" placeholder="הוצאות החודש $" value="${c.spent||''}" onchange="setNum('cards',${i},'spent',this.value)"></div>`).join("")||'<div class="empty">עוד אין כרטיסים</div>';
 $("bList").innerHTML=S.bdays.map((b,i)=>{const n=b.d?daysTo(b.d):null;return `<div class="card row"><span>🎂</span><div class="grow"><div class="title">${esc(b.n)}</div>
  <small class="${n!==null&&n<=14?'warn':''}">${n===null?'אין תאריך':n===0?'היום!':'בעוד '+n+' ימים'}</small>
  <input type="date" value="${b.d}" onchange="setBday(${i},this.value)" style="margin-top:8px"></div><button class="btn" onclick="bdCal(${i})">⏰</button></div>`}).join("");
}
draw();
