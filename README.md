# Bomber Person

Bomber Person is a recreation of the SNES classic Super Bomberman 5. Specifically,
Bomber Person recreates the four player battle mode that was available for Super
Bomberman 5.

## Getting Started

The following instructions will allow you to get a copy of the Bomber Person project
up and running on your local machine for development and testing purposes.

### Prerequisities

Node is needed in order to use NPM. To download Node, you can visit the [nodejs](https://nodejs.org/en/)
website for the latest builds.

### Installing

To install, clone down the [Bomber Man Go server](https://github.com/amaxwellblair/bomber_go)
and clone down the [Bomber Man Game](https://github.com/julsfelic/bomber_person) to directory
of your choice.

To start up the Bomber Man Go server, simply provide the path to the binary in your
terminal and the server will start up.

```
~/Desktop/bomber_go/bomber_go
```

Once you have the server up and running, we'll go ahead an set up the game to run locally.
`cd` into the `bomber_person` directory and run:

```
$ npm install
```

This will go ahead an install are the necessary dependecies for the project.

Once finished, go ahead and run:

```
$ npm start
```

This will start up the game using webpack-dev-server on port 8080. All that is
left to do is pick your lobby, pick your player and have some fun!

## Running the tests

To run the test suite, run the command:

```
$ npm test
```

## Built With

* HTML5 Canvas
* JavaScript (ES2015)
* WebSockets
* Go

## Authors

* **Julian Feliciano** - *Initial work* - [github](https://github.com/julsfelic)
* **Allan Blair** - *Initial work* - [github](https://github.com/amaxwellblair)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.
