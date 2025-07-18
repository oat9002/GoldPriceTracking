# Use the official image as a parent image.
FROM oven/bun:alpine

# Install curl
RUN apk --no-cache add curl

# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY . .

# Run the command inside your image filesystem.
RUN bun install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 4000

# Run the specified command within the container.
CMD [ "bun", "run", "start" ]
