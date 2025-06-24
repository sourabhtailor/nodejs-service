FROM node:22-slim
workdir /app
copy . .
cmd ["npm", "start"]
