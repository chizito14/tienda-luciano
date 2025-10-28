const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname,'..');
const jsonPath = path.join(projectRoot,'src','assets','Json.products.json');
const reportPath = path.join(projectRoot,'image-matching-report.json');
const backupPath = jsonPath + '.bak';

if(!fs.existsSync(jsonPath)){
  console.error('Json.products.json not found at', jsonPath); process.exit(1);
}
if(!fs.existsSync(reportPath)){
  console.error('image-matching-report.json not found at', reportPath); process.exit(1);
}

const json = JSON.parse(fs.readFileSync(jsonPath,'utf8'));
const report = JSON.parse(fs.readFileSync(reportPath,'utf8'));
const mapById = new Map();
for(const r of report.report){
  const top = r.candidates && r.candidates.length ? r.candidates[0] : null;
  if(top && top.score >= 0.8){
    mapById.set(r.id, top.file);
  }
}

if(mapById.size === 0){
  console.log('No matches with score >= 0.8 found. Nothing to do.');
  process.exit(0);
}

// backup original if not exists
if(!fs.existsSync(backupPath)){
  fs.copyFileSync(jsonPath, backupPath);
  console.log('Backup created at', backupPath);
} else {
  console.log('Backup already exists at', backupPath);
}

const changed = [];
const updated = json.map(item => {
  const id = item.id;
  if(mapById.has(id)){
    const file = mapById.get(id);
    const newImagen = `./assets/img-product/${file}`;
    if(item.imagen !== newImagen){
      changed.push({ id, old: item.imagen, new: newImagen });
      item.imagen = newImagen;
    }
  }
  return item;
});

fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2));

const summaryPath = path.join(projectRoot,'image-mapping-applied-summary.json');
fs.writeFileSync(summaryPath, JSON.stringify({ appliedCount: changed.length, changed }, null, 2));

console.log('Applied mapping to', changed.length, 'products. Summary written to', summaryPath);
