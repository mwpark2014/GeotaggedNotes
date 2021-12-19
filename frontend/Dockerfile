FROM node:10.16.0-stretch-slim AS react-dev
RUN mkdir -p /app/frontend && \
    npm install -g react-scripts@1.1.1
COPY ./frontend/package.json ./frontend/package-lock.json /app/frontend/
RUN cd /app/frontend && npm install
COPY ./frontend /app/frontend
WORKDIR /app/frontend
CMD ["npm","start"]
