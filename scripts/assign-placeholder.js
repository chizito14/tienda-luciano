const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname,'..');
const jsonPath = path.join(projectRoot,'src','assets','Json.products.json');
const backupPath = jsonPath + '.bak2';
const placeholder = './assets/img-product/placeholder.svg';

if(!fs.existsSync(jsonPath)){
  console.error('Json.products.json not found at', jsonPath); process.exit(1);
}

const json = JSON.parse(fs.readFileSync(jsonPath,'utf8'));

// backup current if not exists
if(!fs.existsSync(backupPath)){
  fs.copyFileSync(jsonPath, backupPath);
  console.log('Backup created at', backupPath);
} else {
  console.log('Backup already exists at', backupPath);
}

let changed = 0;
const updated = json.map(item => {
  if(!item.imagen){
    item.imagen = placeholder;
    changed++;
  }
  return item;
});

fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2));
const summaryPath = path.join(projectRoot,'image-mapping-placeholder-summary.json');
fs.writeFileSync(summaryPath, JSON.stringify({ applied: changed, placeholder }, null, 2));
console.log('Applied placeholder to', changed, 'products. Summary written to', summaryPath);
