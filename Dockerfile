FROM node:lts-alpine

ARG VCS_REF
ARG BUILD_DATE

ENV KUBE_LATEST_VERSION="v1.10.0"

 RUN apk add --update \
 python \
 curl \
 which \
 bash

 RUN curl -sSL https://sdk.cloud.google.com | bash

 ENV PATH $PATH:/root/google-cloud-sdk/bin

RUN apk add --update ca-certificates \
 && apk add --update -t deps curl 

RUN curl -Lk https://storage.googleapis.com/kubernetes-release/release/v1.10.0/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl \
 && chmod +x /usr/local/bin/kubectl 

ENV FLUX_LATEST_VERSION="1.12.0"

RUN curl -Lk https://github.com/weaveworks/flux/releases/download/1.12.0/fluxctl_linux_amd64 -o /usr/local/bin/fluxctl \
 && chmod +x /usr/local/bin/fluxctl \
 && apk del --purge deps \
 && rm /var/cache/apk/*

COPY package*.json ./

RUN npm i 

COPY . . 

EXPOSE 5000

CMD ["npm","start"]