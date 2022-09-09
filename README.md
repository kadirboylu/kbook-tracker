# KBook Tracker

KBook Tracker is a book finder application developed with React. In this app you can create account and add books to your collection.

[See Demo App on Netlify](https://kbook-tracker.netlify.app/)

### You can:

- Sign up, login, logout and update your profile/password
- Search for any book.
- See details of the book.
- Add books to your collection. (Wish List, Have Read, Books to Read and Reading Now)

### I used:

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/) for routing
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Tailwind](https://tailwindcss.com/) and [SASS](https://sass-lang.com/guide) for styling
- [Axios](https://axios-http.com/docs/intro) for making API calls
- [Firebase](https://firebase.google.com/) for authentication and database
- [Google Books API](https://developers.google.com/books) for book search

## Usage

### Credentials

Go to project root directory and run:

```
cp .env.example .env
```

This will create an `.env` file with needed fields in root directory.

You need two things for this project to work:

1. An API key for the [Google Books API](https://developers.google.com/books/docs/v1/using#APIKey)

2. A [Firebase](https://firebase.google.com/) web project and your Firebase config credentials.

Once you get your credentials, open .env file and fill the related variables with your own credentials.

### Install dependencies

```
yarn
```

### Run React dev server

```
yarn dev
```

### To build for production

```
yarn build
```
