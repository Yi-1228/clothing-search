const $=id=>document.getElementById(id);
let allProducts=[];
const money=n=>new Intl.NumberFormat("zh-TW",{style:"currency",currency:"TWD",maximumFractionDigits:0}).format(Number(n)||0);
function unique(key){return [...new Set(allProducts.map(p=>p[key]).filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b),"zh-Hant"))}
function fillSelect(id,values,label){const el=$(id);el.innerHTML=`<option value="">${label}</option>`+values.map(v=>`<option value="${String(v).replaceAll('"',"&quot;")}">${v}</option>`).join("")}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function render(){
 let q=$("searchInput").value.trim().toLowerCase(),cat=$("categoryFilter").value,brand=$("brandFilter").value,sort=$("sortFilter").value;
 let rows=allProducts.filter(p=>(!cat||String(p.category_name)===cat)&&(!brand||String(p.brand_name)===brand)&&(!q||[p.product_id,p.product_name,p.brand_name,p.category_name,p.color].some(v=>String(v??"").toLowerCase().includes(q))));
 if(sort==="price-asc")rows.sort((a,b)=>a.price-b.price);if(sort==="price-desc")rows.sort((a,b)=>b.price-a.price);if(sort==="name")rows.sort((a,b)=>String(a.product_name).localeCompare(String(b.product_name),"zh-Hant"));
 $("resultCount").textContent=`顯示 ${rows.length} 件商品`; $("emptyState").classList.toggle("hidden",rows.length!==0);
 $("productGrid").innerHTML=rows.map(p=>`<article class="product-card"><div class="image-box"><img loading="lazy" src="${escapeHtml(p.image_url||"")}" alt="${escapeHtml(p.product_name)}" onerror="this.onerror=null;this.src='./images/products/product-001.jpg'"><span class="pill">${escapeHtml(p.category_name)}</span><span class="stock">庫存 ${Number(p.stock_qty)||0}</span></div><div class="product-info"><div class="product-meta">${escapeHtml(p.brand_name)} · ${escapeHtml(p.product_id)}</div><div class="product-name" title="${escapeHtml(p.product_name)}">${escapeHtml(p.product_name)}</div><div class="product-bottom"><span class="price">${money(p.price)}</span><span class="color-size">${escapeHtml(p.color)} / ${escapeHtml(p.size)}</span></div></div></article>`).join("");
}
async function init(){
 try{
  const api=window.APP_CONFIG?.API_URL;
  const res=await fetch(api||"./data/products.json");
  if(!res.ok)throw new Error("資料載入失敗");
  const payload=await res.json();allProducts=Array.isArray(payload)?payload:(payload.products||[]);
  $("connectionText").textContent=api?"API 即時資料":"展示資料模式";
  $("heroCount").textContent=allProducts.length;
  $("brandCount").textContent=unique("brand_name").length;
  $("categoryCount").textContent=unique("category_name").length;
  fillSelect("categoryFilter",unique("category_name"),"所有分類");
  fillSelect("brandFilter",unique("brand_name"),"所有品牌");
  render();
 }catch(e){$("connectionText").textContent="資料載入錯誤";$("productGrid").innerHTML=`<p>無法載入商品資料：${escapeHtml(e.message)}</p>`}
}
["searchInput","categoryFilter","brandFilter","sortFilter"].forEach(id=>$(id).addEventListener(id==="searchInput"?"input":"change",render));
$("resetButton").addEventListener("click",()=>{$("searchInput").value="";$("categoryFilter").value="";$("brandFilter").value="";$("sortFilter").value="default";render()});
init();