let books=[],categories=[],query="",activeCategory="";
const $=s=>document.querySelector(s);
async function loadData(){
  try{
    const [b,c]=await Promise.all([fetch("data/books.json"),fetch("data/categories.json")]);
    books=await b.json(); categories=await c.json(); renderAll();
  }catch(e){
    $("#bookGrid").innerHTML='<p class="muted">Unable to load book data. If opening locally, run a small static server instead of file://.</p>';
    console.error(e);
  }
}
function renderCategories(){
  const cats=["All",...categories.map(c=>c.name).filter(Boolean)];
  $("#categoriesList").innerHTML=cats.map(c=>`<button class="chip ${(!activeCategory&&c==="All")||activeCategory===c?"active":""}" data-cat="${c==="All"?"":c}">${c}</button>`).join("");
  document.querySelectorAll("#categoriesList .chip").forEach(x=>x.onclick=()=>{activeCategory=x.dataset.cat;renderAll()});
}
function filtered(){
  const q=query.toLowerCase().trim();
  return books.filter(b=>(!activeCategory||b.category===activeCategory)&&(!q||[b.title,b.author,b.isbn,b.category,...b.tags,...b.concepts].join(" ").toLowerCase().includes(q)));
}
function renderBooks(){
  const list=filtered();
  $("#resultCount").textContent=`${list.length} result${list.length!==1?"s":""}`;
  $("#bookGrid").innerHTML=list.length?list.map(b=>`<article class="book" data-id="${b.id}" tabindex="0">
    <div class="cover">${b.emoji||"📖"}</div><h3>${b.title}</h3><div class="author">${b.author} · ${b.year}</div>
    <div class="tags">${b.tags.slice(0,3).map(t=>`<span class="tag">${t}</span>`).join("")}</div>
  </article>`).join(""):`<p class="muted">No books found. Try another search.</p>`;
  document.querySelectorAll(".book").forEach(x=>{x.onclick=()=>openBook(+x.dataset.id);x.onkeydown=e=>{if(e.key==="Enter")openBook(+x.dataset.id)}});
}
function stars(n){return "★".repeat(n)+"☆".repeat(5-n)}
function openBook(id){
  const b=books.find(x=>x.id===id); if(!b)return;
  $("#bookDetail").innerHTML=`<div class="detail">
    <div class="detail-head"><div class="detail-cover">${b.emoji||"📖"}</div>
    <div><span class="eyebrow">${b.category}</span><h1 id="detailTitle">${b.title}</h1><p class="author">${b.author} · ${b.year}${b.isbn?" · ISBN "+b.isbn:""}</p>
    <div class="tags">${b.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
    <p class="muted">Reading difficulty: ${stars(b.difficulty)}<br>Practical value: ${stars(b.practicalValue)}</p></div></div>
    <section><h2>⭐ One-Sentence Insight</h2><p><strong>${b.oneSentenceInsight}</strong></p></section>
    <section><h2>📝 Book Summary</h2><p>${b.summary}</p></section>
    <section><h2>💡 Key Lessons</h2>${b.lessons.map((x,i)=>`<div class="lesson"><b>${i+1}.</b><span>${x}</span></div>`).join("")}</section>
    <section><h2>🧠 Key Concepts</h2><div class="chips">${b.concepts.map(x=>`<span class="chip">${x}</span>`).join("")}</div></section>
    <section><h2>🎯 Practical Takeaways</h2><div class="takeaways">${b.takeaways.map(x=>`<div class="takeaway">${x}</div>`).join("")}</div></section>
    <section><h2>👤 Who Should Read This?</h2><div class="chips">${b.whoShouldRead.map(x=>`<span class="chip">${x}</span>`).join("")}</div></section>
    <section><h2>📚 Chapter Summary</h2>${b.chapters.map((x,i)=>`<div class="chapter"><b>${i+1}. ${x.title}</b><span>${x.summary}</span></div>`).join("")}</section>
  </div>`;
  $("#modal").classList.remove("hidden");document.body.style.overflow="hidden";$("#closeModal").focus();
}
function closeModal(){$("#modal").classList.add("hidden");document.body.style.overflow=""}
function renderAll(){
  renderCategories();renderBooks();
  $("#stats").textContent=`${books.length} books · ${new Set(books.map(b=>b.category)).size} categories · summaries + lessons included`;
}
$("#search").addEventListener("input",e=>{query=e.target.value;renderBooks()});
$("#clearFilter").onclick=()=>{activeCategory="";query="";$("#search").value="";renderAll()};
$("#closeModal").onclick=closeModal;
$("#modal").onclick=e=>{if(e.target.id==="modal")closeModal()};
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#modal").classList.contains("hidden"))closeModal()});
$("#themeBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("bookvault-theme",document.body.classList.contains("dark")?"dark":"light")};
if(localStorage.getItem("bookvault-theme")==="dark")document.body.classList.add("dark");
$("#year").textContent=new Date().getFullYear();
loadData();
