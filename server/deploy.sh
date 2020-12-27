#! /bin/bash
docker stop server_gold-price-tracking-server_1
docker rm server_gold-price-tracking-server_1
docker image rm oat9002/gold-price-tracking-server
docker-compose -f docker-compose.yml up -d