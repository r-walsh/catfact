#!/usr/bin/env node

const axios = require('axios');
const { spawn } = require('child_process');

const URL = 'https://catfact.ninja/fact';

const pbcopy = data => new Promise((resolve, reject) => {
  const proc = spawn('pbcopy');

  proc.on('error', reject);
  proc.on('close', () => resolve(data));

  proc.stdin.write(data);
  proc.stdin.end();
});

axios.get(URL)
  .then(({ data: { fact } }) =>
    pbcopy(fact)
    .then(data =>
      console.log(`Copied the following catfact to your clipboard:\n\t${data}`),
    )
    .catch(console.error),
  )
  .catch(console.error);

