FROM ibmcom/ibmnode

ENV NODE_ENV production
ENV PORT 3000

WORKDIR "/app"

# Install app dependencies
COPY package.json package-lock.json /app/
RUN cd /app; npm install

# Bundle app source
COPY . /app

EXPOSE 3000
CMD ["npm", "start"]