# pull official base image
FROM node:latest

# set working directory
WORKDIR /mnt

# add `/app/node_modules/.bin` to $PATH
ENV PATH /mnt/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./

# install yarn 
RUN apt-get update && apt-get install -y yarn

# with --production devDependencies won't be installed
RUN yarn install --production
RUN yarn global add react-scripts

# add app
COPY . ./

EXPOSE 9090

# start app
CMD ["sh", "scripts/run.sh"]