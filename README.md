# Frontend

InstaPic frontend
https://photo-sharing-demo-ef00f.web.app/

## Availbel feature

Login
https://cln.sh/Jp1aie
Registration
https://cln.sh/yuvCfY
Create post
https://cln.sh/XaO9xh
Post list lazy loading
https://cln.sh/xBmpIH

## Installation

Install firebase CLI

```bash
npm install -g firebase-tools
```

Install proejct dependency

```bash
npm install
```

## Run

```bash
npm start
```

# Backend

InstaPic frontend

## Installation

Install firebase CLI

```bash
npm install -g firebase-tools
```

Install proejct dependency

```bash
npm install
```

## Run

```bash
npm watch
npm debug
```

## API reference

##### Authorization header

`Bearer <user_token>`

##### GET /v1/post

\*Authorization header required

###### query

| key      | type   | required |
| -------- | ------ | -------- |
| authorId | string | false    |
| page     | string | false    |

##### POST /v1/post

\*Authorization header required

###### body

| key      | type   | required |
| -------- | ------ | -------- |
| caption  | string | true     |
| photoUrl | string | true     |

##### GET /v1/user/:id

\*Authorization header required

| key | type | required |
| --- | ---- | -------- |
|     |      |          |

##### POST /v1/register

###### body

| key      | type   | required |
| -------- | ------ | -------- |
| name     | string | true     |
| password | string | true     |
