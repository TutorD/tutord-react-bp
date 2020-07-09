FROM library/node:14.5.0
MAINTAINER BBAILEY

COPY Makefile package.json package-lock.json ./

RUN npm install --quiet && \
  rm -rf /root/.npm

COPY ./ ./

CMD ["npm", "start"]
