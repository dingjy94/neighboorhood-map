## Introduction

A single page application featuring a map of my neighborhood (Gainesville, FL).

Published at [this repository's Github page](http://jingyid.me/neighboorhood-map/).

## Run

1. `npm install`
2. `npm start`
3. `npm run build`
4. You can click search to open the list, click marker or list item will display information from yelp.
5. If meet google Map API error or Yelp API error, the application will alert message.
6. Serviceworker implemented by the 'registerServiceWorker' built by 'create-react-app'.

## Dependency
- [ReactJS](https://reactjs.org/)
- [Yelp Fushion](https://www.yelp.com/fusion)
- [cors-anywhere](https://github.com/Rob--W/cors-anywhere)
- [react-gh-pages](https://github.com/gitname/react-gh-pages)


## Todo
- [x] footer
- [x] color change: black?
- [x] change title to restaurants
- [x] add photo and address view in list
- [ ] checkbox filter
- [ ] add About
- [x] fetch yelp once