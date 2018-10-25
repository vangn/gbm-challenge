# GBM Front-end Developer Challenge

For this challenge we created a small application with React and Redux in conjunction with Express to build a local server.

For the persistence of the data granted by the API obtained by the IPC (Índice de Precios y Cotizaciones), two requester were implemented, one on the client side (jQuery) and another one on the server side (NodeJS). Both requesters work together through with routes predefined by the developer, this is generated so that the access route to the API is in a secure way for third parties.

The app has a server-side rendering was implemented using EJS (Embedded JavaScript templating) As a template for the page to have an improvement in performance when rendering the components.

The graph with the data was created with a open source components from React Timeseries Charts'

`https://github.com/esnet/react-timeseries-charts/`

Installation

# Clone the repository
git clone https://github.com/crsandeep/simple-react-full-stack

# It is necessary download NodeJS

`https://nodejs.org/`

# Install dependencies

`$ npm install`

# To build the app with Webpack

`$ npm run build`

# To raise the local server:

`$ npm run server`

# To build and rise the server:

`$ npm run start`

# In the browser:

`http://localhost:3000/`


# Next feature:
- Login user with OAuth2 form


