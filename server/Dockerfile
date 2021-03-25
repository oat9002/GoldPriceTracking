# Use the official image as a parent image.
FROM node:15-alpine

# Install curl
RUN apk --no-cache add curl

# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY . .

# Run the command inside your image filesystem.
RUN yarn

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 4000

# Run the specified command within the container.
CMD [ "yarn", "start" ]
