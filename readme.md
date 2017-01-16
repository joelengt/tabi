# NodeJS Pretty Setup

NodeJS, ExpressJS MVC Project Pretty Setup configuration with ECS6 on frontend, (add ReactJS)

## Download Proyect
Clone repositorie

``
    git clone https://github.com/joelengt/nodejs-mvc.git
``

## Instalation
Inside proyect, run commands instalation:

- Install npm dependencies

``
    npm install
``
  
## Start Sever Nodejs
All the commands is on package.json - * scripts *

- Config DB, ENV

   If you want to work with db, (NoSql, SQL), you need config conexion your local and production(required for deploy), all the confing is inside *./config* file.
   
   * Config ENV 
   
     Inside *./config/index.js*
     
     select the env you want to work 'development' or 'production':
     
       ``
          module.exports = config['development']
       ``
    
    
   * Config Variables server, db, and other
   
       You can edit the file correct 'development.js' or 'production.js' with your configuration.
   
- Start Server
``
npm start
``

## Development Frontend

### Static Server Only Frontend

- Optionally if you work only on frontend, you can start a static server for your public assets

``
   npm run static-server
``

### JavaScript

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
    
### CSS

- Builds CSS
   We can work with stylus preprocesator for css.
   
    ``
        npm run build-css
    ``
    * You can compress the css on public directly with
    
    ``
        npm run compress-css
    ``

## Testing
The Unit Testing (BDD) work with mocha and chai. Only need work your modules for testing on ./test

  ``
     npm run test
  ``
