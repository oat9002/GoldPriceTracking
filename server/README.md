# Gold price tracking server

-   You can run by using `docker-compose`

```yaml
version: "3.3"
services:
    gold-price-tracking-server:
        image: oat9002/gold-price-tracking-server:latest
        ports:
            - 4000:4000
        volumes:
            - ./config:/usr/src/app/config:ro #json config from firebase
        env_file:
            - .env
```

-   Using `.sample.env` to create `.env`

```
NOTIFY_GOLD_PRICE_TRACKING="token"
FIREBASE_DATABASE_URL="databaseURL"
MACKEREL_API_KEY="apikey" # optional, only if you need to call mackerel service
API_PORT=4000
MODE="development"
```
