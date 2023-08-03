FROM node:18-slim

WORKDIR /usr/workspace

COPY ./ ./

# RUN apt-get update && apt-get install git -y
# RUN apk add --no-cache bash 

CMD [ "tail", "-f", "/dev/null" ]


