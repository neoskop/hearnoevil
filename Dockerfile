FROM node:12.6.0-alpine AS build
USER node
WORKDIR /home/node
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM node:12.6.0-alpine
USER node
WORKDIR /home/node
COPY package.json yarn.lock ./
RUN yarn --production=true
COPY --from=build --chown=node /home/node/lib lib
RUN mkdir -p bin && \
    chmod +x /home/node/lib/index.js && \
    ln -s /home/node/lib/index.js /home/node/bin/hearnoevil
ENV PATH="/home/node/bin:${PATH}"
ENTRYPOINT ["/home/node/bin/hearnoevil"]
CMD ["--help"]