FROM	ubuntu:20.04
ARG 	DEBIAN_FRONTEND=noninteractive
RUN	mkdir -p /stageUs
WORKDIR	/stageUs
RUN	apt-get -y update
RUN	apt-get -y upgrade
RUN	apt-get -y install
RUN	apt-get -y install nodejs
RUN	apt-get -y install npm
RUN	apt-get -y install postgresql
RUN	apt-get -y install postgresql-contrib
RUN	apt-get -y install redis-server
RUN	npm init
RUN	npm install
RUN	npm install express
RUN	npm install cors
RUN	npm install jsonwebtoken
RUN	npm install mongodb
RUN	npm install mongoose
RUN	npm install mongoose-timestamp
RUN	npm install node-fetch
RUN	npm install openssl
RUN	npm install pg
RUN	npm install -g pm2
RUN	npm install redis

COPY	game_index.html /game_index.html
COPY	index.html /index.html
COPY	modify.html /modify.html
COPY	modifyPwd.html /modifyPwd.html
COPY	private.pem /private.pem
COPY	public.pem /public.pem
COPY	register.html /register.html
COPY	server.js /server.js
COPY	week5_index.html /week5_index.html

RUN	mkdir -p /router
WORKDIR	/router
COPY	./router ./

RUN	mkdir -p /schema
WORKDIR	/schema
COPY	./router/schema/logSchema.js /schema.js

WORKDIR	/stageUs
CMD	node server.js
