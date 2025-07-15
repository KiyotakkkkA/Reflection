# Настройка окружения

## Отправка почты

```properties
MAIL_MAILER=smtp
MAIL_SCHEME=smtp
MAIL_HOST=[адрес хоста, уточняется у провайдера услуги]
MAIL_PORT=[порт, уточняется у провайдера услуги]
MAIL_USERNAME=[почта, от которой будут приходить письма]
MAIL_PASSWORD=[пароль, уточняется у провайдера услуги]
MAIL_FROM_ADDRESS=[почта, от которой будут приходить письма]
MAIL_FROM_NAME=[имя отправителя, отображаемое в заголовке письма]
```

## Настройка БД

```properties
DB_CONNECTION=mysql
DB_HOST=[адрес хоста]
DB_PORT=[порт]
DB_DATABASE=[имя базы данных]
DB_USERNAME=[имя пользователя]
DB_PASSWORD=[пароль]
```

# Выполение команд 

1. Выполнить задачи (необходимо использовать планировщик задач cron или другие аналоги)
```bash
cd [путь/к/проекту] && php artisan schedule:run >> /dev/null 2>&1
```

2. Запустить очередь (рассылка уведомлений Email)
```bash
cd [путь/к/проекту] && php artisan queue:work
```

