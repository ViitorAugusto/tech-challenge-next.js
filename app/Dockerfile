FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# This Dockerfile sets up a Node.js application environment.
# It uses the official Node.js 24 image, sets the working directory to /app,
# installs the application dependencies, and exposes port 3000.