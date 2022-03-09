# pull the base image
FROM node:16

# set the working direction
WORKDIR /usr/src/app

run yarn -v

# copy build folder
COPY ./build ./

RUN yarn global add serve

# start app
CMD ["serve", "-s", "build"]