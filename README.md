# Front-end Developer Nanodegree Neighborhood Map
This project was to create an application that uses the [Google Maps API](https://cloud.google.com/maps-platform/) and another Third party API to display locations and information on the map. I used [Create React App](https://github.com/facebookincubator/create-react-app) to set up the starting structure. For the other third party API I used [Foursquare](https://developer.foursquare.com/).

This was a project part of the [Front-end Web Developer nanodegree Scholarship](https://eu.udacity.com/course/front-end-web-developer-nanodegree--nd001) with Udacity and Google. Here's my other [projects for fend](https://inacarine.github.io/fend).

## Instructions
To setup the project locally on your machine:
1. **Using git:** You will need [git](https://git-scm.com/) installed on your computer. In the command line, run this command `$ git clone https://github.com/InaCarine/fend-neighborhood-map.git`, and the files will be cloned to your computer.

2. Then to run the project in your browser, enter the following in the command line:
```
# Install dependencies
npm install

# To run the app
npm start
```

You will know if the application started successfully when you see the following message:
```
Compiled successfully!

You can now view fend-neighborhood-map in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.1.70:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

There should already be a tab opened up in your browser with the app, if not go to the following url http://localhost:3000/.

## Offline use
This project uses the default service worker that comes with Create React App. The service worker only works in production build and not in the development build. For testing the service worker, run the following command: `npm run build`.

You will then need to setup a local server to view the app:
```
  npm install -g serve
  serve -s build
```

When the server is up and working you can view the app on the following url: http://localhost:5000
