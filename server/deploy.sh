#! /usr/bin/bash
docker compose down
docker image rm oat9002/gold-price-tracking-server
docker compose up -d
docker container ps