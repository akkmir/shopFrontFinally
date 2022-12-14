## :battery: :battery: :battery: Akkmir2022. Клиентская часть проекта
### :file_folder: Оглавление
* Стек проекта, используемые библиотеки
* Структура проекта, краткое описание всех папок
* Обращения к серверу, механизм и принципы
* Состояние проекта, описание работы со стейтом
* Базовое описание компонентов, раздел дополняется
---
### :computer: Стек проекта
Проект реализован с использованием библиотеки React, без TS. Стили задаются с помощью StyledComponents, за исключением единичных компонентов и инфостраниц - там используется нативный CSS. Не рекомендуется прибегать к использованию чистого CSS тк это лишает возможности напрямую взаимодействовать с оформлением компонента из представления без использования лишего inLine-css кода. Стили для модального окна регистрации в личном кабинете прописаны в index.html - это техдолг, тк модуль авторизации в Google, который там используются, необходимо будет поместить в JSX структуру проекта - с помощью легковесной библиотеки Helmet, к примеру. Для работы со стейтом используется Redux Toolkit
### :file_folder: Структура проекта, начиная с папки src
Единичные папки могут быть пустыми, тк закладывались на случай подстраховки. При необходимости их можно удалить из проекта. Проект разбит на папки на основе типов содержимого: страницы, переиспользуемые view, компоненты - в данном случае подразумеваются, кнопки, инпуты, селекты и тд - файлы стилей, файлы редюсеров, сервисы и тд
```diff
> src - основной каталог проекта akkmir
  >> admin - в данную папку планировалось размещение админ-части проекта
  >> appStore - папка со стейтом приложения и редюсерами
    >>> firebaseDBconnector - папка для работы с Firebase Realtime Database
    >>> indexDBstore - рассматривался запасной вариант на случай нестабильной работы localStorage
    >>> reducers - здесь лежат все редюсеры
    >>> store.js
  >> bricks - кирпичики приложения, страницы, компоненты и представления
    >>> comps - небольшие переиспользуемые компоненты
      >>>> button - компонент кнопка
      >>>> infoPages !! - некорректное расположение, правильнее вынести во views
      >>>> input - компонент поле ввода текста
      >>>> mainPage !! - некорректное расположение, правильнее вынести во views
      >>>> modals - компоненты-модалки
      >>>> Список компонентов.jsx
    >>> mobile - вьюшки для мобильной версии сайта
      >>>> pages - страницы для отображения в маршрутах
      >>>> views - представления, могут быть переиспользуемыми
    >>> pages - страницы для отображения в маршрутах
    >>> requests - компоненты, хранящие запросы, в идеале перенести сюда все запросы приложения
    >>> views - представления, могут быть переиспользуемыми
    >>> Main.jsx - хаб представлений, содержит в том числе все маршруты
  >> fonts - папка, содержащая шрифты
  >> img - папка с изображениям
  >> services - тут хранятся сервисы приложения, такие как подбор и всплывающие подсказки
    >>> hooks - папка для пользовательских хуков
  >> styles - файлы со стилями styledComponents
    >>> mobile - стили для мобильной версии
    >>> pages - стили для страниц сайта
  >> App.js - главный файл приложения
  >> index.js - точка входа в приложение
```
### :lock: Обращения к серверу API
Обращения к серверу происходят с помощью специального компонента, который возвращает пустой <React.Fragment>, а в хуке UseEffect производит все запросы, за счет этого позволяет обходиться без использования миддлваров. Пример request-компонента можно посмотреть ниже. Компонент работает в связке с Redux'ом, при создании нового запроса, нужно отражать это в редюсерах
```JavaScript
<RequestComponent
  make={false}
  callbackAction={'GET_GENERATIONS'}
  requestData={{
    type: 'GET',
    urlstring: '/generations',
  }}
/>
```
При разработке сервер с апи расположен на дев сервере, чтобы реакт мог подключаться к нему, необходимо указать в файле package.json поле proxy, в котором указать необходимый адрес сервера
```JavaScript
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "proxy": "yourdomain.ru",
```
### :lock: Работа с состоянием приложения
Используется Redux Toolkit. Редюсеры деляется на отдельные файлы исходя из своего предназначения, все общие методы и поля собраны в главном редюсере mainReducer. RTK позволяет реализовать запросы к серверу на основе своего решения RTK Query, в случае, если requst-компонент будет иметь просадку на асинхронности, можно обратиться к нему. Пример редюсера приведен ниже
```JavaScript
import { createSlice } from '@reduxjs/toolkit'
export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    auth: null,
    authType: null,
    authObject: null
  },
  reducers: {
    changeAuth: (state, action) => {
      state.auth = action.payload
    },
    changeAuthType: (state, action) => {
      state.authType = action.payload
    },
    changeAuthObject: (state, action) => {
      state.authObject = action.payload
    }
  }
})

export const { changeAuth, changeAuthType, changeAuthObject } = authReducer.actions
export default authReducer.reducer
```
