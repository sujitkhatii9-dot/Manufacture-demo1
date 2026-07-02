const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'assets', 'images');
const destDir = path.join(__dirname, 'public', 'assets', 'images');

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  if (!fs.existsSync(from)) {
    console.error(`Source directory ${from} does not exist!`);
    return;
  }
  fs.readdirSync(from).forEach(element => {
    const stat = fs.lstatSync(path.join(from, element));
    if (stat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
      console.log(`Copied ${element} to ${to}`);
    } else if (stat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

try {
  copyFolderSync(srcDir, destDir);
  console.log('Successfully copied assets to public directory!');
} catch (err) {
  console.error('Error copying assets:', err);
}
