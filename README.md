# Christopher's Simple MARTA Route Information Web App

## Why
Because the MARTA Android app is ridiculously slow.

## How
It's very simple. Vanilla JS, some simple CSS, and some very basic Bootstrap
power the frontend. The only external libraries I use are Axios (to fetch the
data from my API) and the Google Maps API (to ... load Google Maps).

On the backend, I use Express to create a simple sub-app that I mount to a
server. I use Axios to fetch the API data from the MARTA developer API, and I
just relay the information to the frontend with no manipulation.

For mapping the bus routes, I have several scripts in `data/scripts` that
download the GTFS data from MARTA and transform the CSV into JSON. Then, on
the front end, I pass the JSON to the Google Maps API.

I didn't use any transpilation like Babel or anything, and I used things like
`async/await`, and object destructuring, so this is probably only gonna work in a
modern browser. It's for personal use and I *personally* use Google Chrome, so
that's that.

## Links
- [MARTA Developer API](http://www.itsmarta.com/app-developer-resources.aspx)
- [Axios](https://github.com/axios/axios)
- [N/S map marker credit](https://www.flaticon.com/authors/dave-gandy)
