#! /bin/bash
docker stop server_gold-price-tracking-server_1
docker rm server_gold-price-tracking-server_1
docker-compose pull
docker-compose -f docker-compose.yml up -d