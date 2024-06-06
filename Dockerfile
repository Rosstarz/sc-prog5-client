FROM node:18-alpine
RUN mkdir -p /app/node_modules 
WORKDIR /app
COPY package*.json ./
# USER node
# RUN chown -R node:node /app
RUN npm install
COPY . .
EXPOSE 8080
RUN npm run build

CMD ["npm", "run", "start"]
