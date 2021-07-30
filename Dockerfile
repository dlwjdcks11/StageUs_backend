FROM	ubuntu:20.04
ARG 	DEBIAN_FRONTEND=noninteractive
RUN	    mkdir -p /stageUs
WORKDIR	/stageUs
RUN	    apt-get -y update
RUN	    apt-get -y upgrade
RUN	    apt-get -y install
RUN	    apt-get -y install nodejs
RUN	    apt-get -y install npm
RUN	    apt-get -y install postgresql
RUN	    apt-get -y install postgresql-contrib
RUN	    apt-get -y install redis-server
RUN     apt-get -y install vim
RUN	    npm init -y
RUN	    npm install
RUN	    npm install express
RUN	    npm install cors
RUN	    npm install jsonwebtoken
RUN	    npm install mongodb
RUN	    npm install mongoose
RUN	    npm install mongoose-timestamp
RUN	    npm install node-fetch
RUN	    npm install openssl
RUN	    npm install pg
RUN	    npm install -g pm2
RUN	    npm install redis

COPY	./game_index.html /stageUs/game_index.html
COPY    ./index.html /stageUs/index.html
COPY    ./modify.html /stageUs/modify.html
COPY    ./modifyPwd.html /stageUs/modifyPwd.html
COPY    ./private.pem /stageUs/private.pem
COPY    ./public.pem /stageUs/public.pem
COPY    ./register.html /stageUs/register.html
COPY    ./server.js /stageUs/server.js
COPY    ./week5_index.html /stageUs/week5_index.html

RUN	    mkdir -p /stageUs/router
WORKDIR	/stageUs/router
COPY    ./router ./

RUN	    mkdir -p /stageUs/router/schema
WORKDIR	/stageUs/router/schema
COPY    ./router/schema ./

WORKDIR	/stageUs
VOLUME  /stageUs
EXPOSE  9443 5432
CMD	    ["service", "redis-server", "start"]
