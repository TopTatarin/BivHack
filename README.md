# Конфигуратор Страховых Продуктов сделан jojoMISIS

---

### Установка:
1. **База данных**:
   - Создайте базу данных:
     ```sql
     CREATE DATABASE insurance_configurator;
     ```
   - Запустите SQL для создания таблиц (параметры, продукты, партнёры).

2. **Backend**:
   - Установите зависимости:
     ```bash
     cd backend
     npm install
     ```
   - Настройте `config.js` для подключения к PostgreSQL.
   - Синхронизируйте БД:
     ```bash
     node sync.js
     ```
   - Запустите сервер:
     ```bash
     npm run dev
     ```

3. **Frontend**:
   - Установите зависимости:
     ```bash
     cd frontend
     npm install
     ```
   - Запустите React:
     ```bash
     npm start
     ```

---

### Основные функции:
- Управление страховыми продуктами, параметрами и партнёрами.
- Индивидуальная настройка параметров для партнёров.
- Интуитивно понятный интерфейс.

**Сервер**: `http://localhost:5000`  
**Приложение**: `http://localhost:3000`