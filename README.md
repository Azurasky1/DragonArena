# 2dgame

[![Join the chat at https://gitter.im/Azurasky1/2dgame](https://badges.gitter.im/Azurasky1/2dgame.svg)](https://gitter.im/Azurasky1/2dgame?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
creating a 2d game with JS and HTML

## Getting Started

### Get the code

Clone this project on your local machine with

```sh
git clone https://github.com/Azurasky1/2dgame.git
```

### Install the project dependencies

This project uses NodeJS, npm and Gulp. If you don't have them already
installed on your local machine check the
[official npm documentation](https://docs.npmjs.com/getting-started/installing-node)
and the [official NodeJS documentation](https://docs.npmjs.com/getting-started/installing-node),
then install Gulp globally on your machine with:

```sh
$ npm install --global gulp-cli
```

Then navigate inside your project directory and run:

```sh
npm install
```

## Server side

Once you have all the dependencies installed, open a terminal window,
navigate inside your local copy of this repository. Then run:

```sh
npm start
```

This will initialize the server on your local machine.
Leave the terminal running on your background,
then the client side should be able to establish a communication.

You can run a quick sanity check on your server machine just opening a browser
on: `http://localhost:3009/status`. If you're able to see a JSON formatted
output displaying a `Status: 200` and some other server information,
your server is up and running and your client app should be able to establish
a communication with it.

## Client app

Once you have all the dependencies install, open a terminal window,
navigate inside your local copy of this repository. Then run:

```sh
gulp serve
```

This will initialize the client application and will trigger your browser to be
opened on the served URL.

Start editing your source files and you will see your changing appearing
in real time inside your browser.
