Web-приложение для демонстраций в рамках воркшопа "Метрики, алертинги и дашборды" https://podlodka.io/qacrew

Представляет из себя node.js + express приложение.

Выставляет несколько эндпоинтов:

1. Конфигурацию middleware `ChaosMonkey`
    `/config/monkeyMode/<..mode..>`

    Включает разные режимы неполадок в приложении:

    `random500` - в 50% случаев возвращает 500 ошибку

    `random400` - в 50% случаев возвращает 400 ошибку

    `randomDelay?delays=<..delay1,delay2..>` - в 50% случаев добавляет с равно вероятностью одну из переданных в параметре задержек

    `randomError` - в 50% случаев логирует ошибку
2. API "прогноза погоды"

    `/weatherforecast/today?city=<...city...>`

    `/weatherforecast/tomorrow?city=<...city...>`

    `/weatherforecast/next3days?city=<...city...>`

    Возвращает "прогноз погоды" в json. На эти эндпоинты навешана middleware, которая добавляет неисправность в режиме, описанном выше.

3. `/metrics`
    Возвращает метрики в формате Prometheus

Кроме того в составе приложения есть утилита для генерации нагрузки. Запуск:

```
yarn load
```

Приложение публикуется на docker.hub
https://hub.docker.com/repository/docker/warhamsterboo/workshop_example_app