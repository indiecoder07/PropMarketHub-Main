const [major] = process.versions.node.split('.').map(Number);

if (major >= 21) {
  console.error('This project must run on Node 20.x (see .nvmrc).');
  console.error(`Current Node: v${process.versions.node}`);
  console.error('Run: nvm use && npm install && npm run dev');
  process.exit(1);
}
