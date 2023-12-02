FROM node 
RUN mkdir - /home/banking-frontend
WORKDIR /home/banking-frontend
COPY ./ ./
RUN npm install --legacy-peer-deps
RUN npm run build
CMD [ "npm","start"]