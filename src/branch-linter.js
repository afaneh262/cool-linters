const { execSync } = require('child_process');

// Branch name rules
const branchNameLinter = {
  disallowed: [],
  prefixes: ["feat", "hotfix", "release", "chore", "docs", "fix"],
  skip: ["master", "develop", "staging", "dev", "main"],
  regex: /^(feat|hotfix|release|chore|docs|fix)\/([A-Z]+-\d+)-.+$/i,
};

function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

function validateBranch(branch) {
  if (branchNameLinter.skip.includes(branch)) {
    console.log(`Branch '${branch}' is valid.`);
    return;
  }

  if (branchNameLinter.disallowed.includes(branch)) {
    console.error(`Pushing to "${branch}" is not allowed, use git-flow.`);
    process.exit(1);
  }

  if (!branchNameLinter.regex.test(branch)) {
    console.error(`Branch '${branch}' does not match the allowed pattern.`);
    process.exit(1);
  }

  console.log(`Branch '${branch}' is valid.`);
}

const currentBranch = getCurrentBranch();
validateBranch(currentBranch);
