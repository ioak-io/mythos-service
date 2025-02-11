FROM node:latest
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "aihub-*.tgz", "./"]
RUN npm install --production --silent
COPY . .
COPY public.pem /usr/src/app/public.pem
EXPOSE 8015
CMD ["npm", "start"]
