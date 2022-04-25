# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /mnt

# add `/app/node_modules/.bin` to $PATH
ENV PATH /mnt/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

# with --production devDependencies won't be installed
RUN npm install --production
RUN npm install react-scripts -g

# add app
COPY . ./

EXPOSE 9090

# start app
CMD ["sh", "scripts/run.sh"]