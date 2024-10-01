const fs = require('fs');

// Commit message rules
const commitMessageRegex = /^\[(fix|chore|feat|hotfix|docs)\]\[([A-Z]+-\d+)\]: (.+)$/;

function getCommitMessage() {
  const commitMessageFilePath = process.argv[2];
  return fs.readFileSync(commitMessageFilePath, 'utf8').trim();
}

function validateCommitMessage(commitMessage) {
  if (!commitMessageRegex.test(commitMessage)) {
    console.error('Commit message must be in the format: [<Prefix>][<Ticket ID>]: <Description>');
    process.exit(1);
  }

  console.log(`Commit message is valid.`);
}

const commitMessage = getCommitMessage();
validateCommitMessage(commitMessage);
