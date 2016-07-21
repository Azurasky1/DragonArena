# DragonArena

> creating a 2d game with JS and HTML

[![Join the chat at https://gitter.im/Azurasky1/2dgame](https://badges.gitter.im/Azurasky1/2dgame.svg)](https://gitter.im/Azurasky1/2dgame?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Setup

Clone this project on your local machine with

```sh
git clone https://github.com/Azurasky1/DragonArena.git
```

### Installing the project dependencies

This project uses NodeJS, npm and Gulp. If you don't have them already
installed on your local machine check the
[official npm documentation](https://docs.npmjs.com/getting-started/installing-node)
and the [official NodeJS documentation](https://docs.npmjs.com/getting-started/installing-node),
then install Gulp globally on your machine with:

```sh
npm install --global gulp-cli
```

Now reach your project directory and run:

```sh
npm install
```

This will install all the project's dependencies inside a new `node_modules`
folder.

## Running the App

Once you have all the dependencies installed, open a terminal inside this
project's root directory, then run:

```sh
npm start
```

This will start the server NodeJS application responsible for serving both the
client app and the server API.

Leave the `npm` task running in your terminal, then your client application should
be automatically rendered inside a browser.

## Development

While running the `npm start` task, you can start coding inside the `src`
directory.

Every time a file is changed, the browser will be automatically
refreshed and all the information will be updated in order to immediately
see you code changes.

## DragonArena API

The API will be served inside your App URL + `/api/`.
When the app is run in Development mode on your local machine, you can reach
your local APIs from [http://localhost:5001/api/](http://localhost:5001/api/).

You can run a quick sanity check on your server machine just opening a browser
on: [http://localhost:5001/api/status](http://localhost:5001/api/status).

You should be able to see a JSON formatted output displaying a `Status: 200`
and some other server information.

A random HASH key is also generated inside the `message` key.
You can verify your server is really running by refreshing
this page and make sure the random generated number is different from
the previous one.

If, for some reason, the number never changes, try to manually stop and restart
the `npm start` task on your terminal.

## Building a new release App

This is currently work in progress.

## License

MIT © [Bill B. and Andrea Sonny](https://github.com/Azurasky1/DragonArena/blob/master/LICENSE)
