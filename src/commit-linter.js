const fs = require('fs');
const path = require('path');

// Path to the commit message file
const commitMessageFilePath = path.join('.git', 'COMMIT_EDITMSG');

// Regex for validating commit message
const commitMessageRegex = /^\[(fix|chore|feat|hotfix|docs)\]\[([A-Z]+-\d+)\]: (.+)$/;

// Function to validate the commit message
function validateCommitMessage() {
  try {
    const commitMessage = fs.readFileSync(commitMessageFilePath, 'utf8').trim();

    // Check if the commit message is a merge commit (starts with "Merge")
    if (commitMessage.startsWith('Merge')) {
      console.log('Merge commit detected, skipping commit message validation.');
      return;
    }

    // Validate commit message format
    if (!commitMessage.match(commitMessageRegex)) {
      console.error(`Invalid commit message format:\n"${commitMessage}"`);
      console.error('Commit message must be in the format: [<Prefix>][<Ticket ID>]: <Description>');
      console.error('Allowed Prefix are: fix|chore|feat|hotfix|docs');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error reading commit message:', error);
    process.exit(1);
  }
}

// Run the validation
validateCommitMessage();
