# Revise this image so that it is much smaller in size (currently .5 GB)
FROM ubuntu:latest
LABEL maintainer="craig@tbvp.com.au"
#ENV ENV=prod
WORKDIR /src
RUN apt-get update && \
 apt-get install -y python3 python3-pip python3-dev libpq-dev git && \
 ln -s /usr/bin/python3 /usr/bin/python && \
 ln -s /usr/bin/pip3 /usr/bin/pip && \
 pip3 install pipenv
COPY Pipfile Pipfile.lock /src/
RUN pipenv install --system
COPY . /src
