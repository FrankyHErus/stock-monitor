## Описание📝

Веб-приложение “Биржевой монитор”, которое отображает актуальные котировки акций и позволяет пользователю отслеживать изменения цен в реальном времени

## Стек🛠️
### Основные технологии
- Next.js 15
- React 18
- Typescript 5
- ESLint 9
### API
- Axios
### Стилизация
- TailwindCSS 4

## Запуск приложения🚀

1. Для запуска проекта сначала стягиваем проект с гитхаба и переходим в созданную директорию
```bash
git clone https://github.com/FrankyHErus/stock-monitor.git
cd stock-monitor
```
2. Устанавливаем зависимости
```bash
npm install
```
3. Не забываем создать файлик .env в корне проекта, а также положить наш API ключ к finhub.io (Важно, чтобы переменная была названа NEXT_PUBLIC_API_KEY)
```bash
echo "NEXT_PUBLIC_API_KEY=<API-ключ>" > .env
```
4. Запускаем
```bash
npm run dev
```

После этого веб-приложение будет доступно на localhost:3000
