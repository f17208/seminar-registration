echo "starting tests...";
echo "warning: e2e tests are not executed here, please run them on your local machine (see README.md)"
react-scripts test --testPathIgnorePatterns=.*e2e.test.js --watchAll=false