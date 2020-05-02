# Use the official image as a parent image.
FROM node:current-slim

# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY package.json .

# Run the command inside your image filesystem.
RUN npm install -g yarn

RUN yarn

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 5000

# Run the specified command within the container.
CMD [ "yarn", "start" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .