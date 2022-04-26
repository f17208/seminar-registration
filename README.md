# Seminar Registration

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Note to reviewers (on installation)

I recommend running `yarn install` on your local machine before attempting to execute `docker run -v $(pwd):/mnt -p 9090:9090 -w /mnt mytest ./scripts/run.sh`, otherwise `node_modules` will be missing, as the project folder on the Docker host machine will be shared with the Docker container.

If you don't want to install `node_modules` on the host machine, I guess you'll have to avoid the `-v $(pwd):/mnt` option (see section 3 of this document).

You can use both Yarn or Npm for installation, execution, testing and running other scripts.


## 1 - Running the project locally

`yarn install`: installs `node_modules`.

`yarn start`: runs the app on localhost:9090.

`yarn test`: runs all tests but e2e. You can run this script without running `yarn start` before.

`yarn test:e2e`: runs e2e tests only. Since e2e tests require the app running on localhost:9090, you must run `yarn start` before.


## 2 - Running the project on Docker container sharing host machine's project folder

`yarn install`: installs `node_modules` (see note above)

`docker run -v $(pwd):/mnt -p 9090:9090 -w /mnt mytest ./scripts/test.sh`: runs all tests but e2e.

`docker run -v $(pwd):/mnt -p 9090:9090 -w /mnt mytest ./scripts/run.sh`: runs the app.


## 3 - Running the project on Docker container without sharing host machine's project folder

`docker run -p 9090:9090 -w /mnt mytest ./scripts/test.sh`: runs all tests but e2e.

`docker run -p 9090:9090 -w /mnt mytest ./scripts/run.sh`: runs the app.


## Other scripts

Other scripts you can run from the project's root directory: 

### `npm lint`

Runs eslint to analyze code style. Use --fix option to fix errors that can be automatically fixed.

