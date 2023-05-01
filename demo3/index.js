import readline from 'readline';

const shell = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

shell.prompt();
shell.on('line', (input) => {
  console.log('what u input: ', input);
  shell.prompt();
})