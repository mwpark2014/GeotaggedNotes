# pull official base image
FROM node:alpine
# set working directory
WORKDIR /frontend
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY frontend/package*.json ./
RUN ls
RUN npm install
RUN npm install -g react-scripts@3.4.1

# add app
COPY ./frontend ./
# start app
CMD ["npm","start"]
