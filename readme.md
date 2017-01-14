# NodeJS Pretty Setup

NodeJS, ExpressJS MVC Project Pretty Setup configuration with ECS6 on frontend, (add ReactJS)

## Download Proyect
Clone repositorie

``
    git clone https://github.com/joelengt/nodejs-mvc.git
``

## Instalation
Insite proyect, run commands instalation:

- Install npm dependencies

``
    npm install
``

## Static Server Only Frontend
- Optionally if you work only on frontend, you can start a static server for your public assets

``
   npm run static-server
``
  
## Let's Start
All the commands is on package.json - * scripts *

- Start Server

``
npm start
``

## Development

- Builds JS - webpack
  You can work with ECS6 --> Development on ./src/client/js/
  With this command webpack is watching you code from ECS6 to ECS5 and compress min.js to ./public/js
    
    ``
        npm run webpack-js
    `` 
    * By default, dependencies for ReactJS is setup and work normally
    * If you want to change configuration path.
    Edit ``./webpack.config.js``

-  Builds JS- browserify (optinal)
   The same way that webpack. 
   
    ``
        npm run build-js
    ``

- Builds CSS
   We can work with stylus preprocesator for css.
   
    ``
        npm run build-css
    ``
    * You can compress the css on public directly with
    
    ``
        npm run compress-css
    ``


