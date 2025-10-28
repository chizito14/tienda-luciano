const fs = require('fs');
const path = require('path');

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function listFiles(dir) {
  return fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir,f)).isFile());
}

function normalize(s){
  return s ? s.toString().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'').replace(/[^a-z0-9]+/g,' ').trim() : '';
}

function tokens(s){
  return normalize(s).split(/\s+/).filter(Boolean);
}

function jaccard(a,b){
  const A = new Set(a);
  const B = new Set(b);
  const inter = [...A].filter(x=>B.has(x)).length;
  const union = new Set([...A,...B]).size || 1;
  return inter/union;
}

function levenshtein(a,b){
  if(a===b) return 0;
  const la=a.length, lb=b.length;
  if(la===0) return lb;
  if(lb===0) return la;
  let v0 = new Array(lb+1).fill(0).map((_,i)=>i);
  let v1 = new Array(lb+1).fill(0);
  for(let i=0;i<la;i++){
    v1[0]=i+1;
    for(let j=0;j<lb;j++){
      const cost = a[i]===b[j] ? 0 : 1;
      v1[j+1] = Math.min(v1[j]+1, v0[j+1]+1, v0[j]+cost);
    }
    [v0,v1]=[v1,v0];
  }
  return v0[lb];
}

function levRatio(a,b){
  const d = levenshtein(a,b);
  const max = Math.max(a.length,b.length) || 1;
  return 1 - d/max;
}

const projectRoot = path.resolve(__dirname,'..');
const jsonPath = path.join(projectRoot,'src','assets','Json.products.json');
const imgDir = path.join(projectRoot,'src','assets','img-product');

if(!fs.existsSync(jsonPath)){
  console.error('Json.products.json not found at', jsonPath);
  process.exit(1);
}
if(!fs.existsSync(imgDir)){
  console.error('img-product dir not found at', imgDir);
  process.exit(1);
}

const products = readJSON(jsonPath);
const files = listFiles(imgDir);
const fileBase = files.map(f=>({file:f, name: f.replace(/\.[^.]+$/,'')}));

const report = [];

for(const p of products){
  const id = p.id;
  const name = p.name || p.description || '';
  const imagen = p.imagen || null;
  const basenameFromImagen = imagen ? path.basename(imagen) : null;

  const nameTokens = tokens(name + ' ' + (p.codigo || ''));

  const candidates = fileBase.map(fb=>{
    const fileTokens = tokens(fb.name);
    const jac = jaccard(nameTokens, fileTokens);
    const lev = levRatio(normalize(name), normalize(fb.name));
    const score = (jac*0.6) + (lev*0.4);
    return { file: fb.file, score: Math.round(score*1000)/1000 };
  }).sort((a,b)=>b.score-a.score).slice(0,5);

  const exactExists = basenameFromImagen ? files.includes(basenameFromImagen) : false;

  report.push({ id, name, imagen, basenameFromImagen, exactExists, candidates });
}

const outPath = path.join(projectRoot,'image-matching-report.json');
fs.writeFileSync(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), filesCount: files.length, productsCount: products.length, report }, null, 2));
console.log('Report written to', outPath);
