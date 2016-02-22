# Sense-Rover

##Proyecto de fin de curso 2014-2016 del ciclo formativo de desarrollo de aplicaciones web


Demostración:
http://senserover-terrestre.rhcloud.com/


Características
--------

- **Local Authentication** using Email and Password
- **OAuth 2.0 Authentication** Google
- Flash notifications
- MVC Project Structure
- Node.js clusters support
- Bootstrap 3 + Webflow.io
- Contact Form (powered by Mailgun)
- **Account Management**
 - Profile Details
 - Change Password
 - Forgot Password
 - Reset Password
- CSRF protection


Instalacción
---------------

La manera mas sencilla de empezar es clonando el repositorio

```bash
# Clonar repositorio
git clone https://github.com/DW32-IGSR/senserover miproyecto

# Entrar en el directorio creado
cd miproyecto

# Instalar dependencias con NPM
npm install

node app.js
```

Obtención de API Keys
------------------

Para utilizar cualquiera de las API incluidos o métodos de autenticación OAuth, tendrá que obtener credenciales apropiadas:  ID Cliente, Clave cliente secreta, API Key, o
Usuario & Contraseña. Usted tendrá que ir a través de cada proveedor para generar nuevas credenciales.


<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1000px-Google_2015_logo.svg.png" width="200">
- Visitar [Google Cloud Console](https://cloud.google.com/console/project)
- Haga click en el botón **Crear Proyecto**
- Introducir *Nombre de Proyecto* a continuación, haga clic en el botón **Crear**
- A continuación, haga click en *Autenticación APIs* en la barra lateral y seleccione la pestaña *API*
- Haga click en *API de Google+* luego en *APIs Social*, haga click en **Habilitar API**
- A continuación, en *Autenticación APIs* en la barra lateral haga click en la pestaña *Credenciales*
- Haga click en el botón **Crear nuevo cliente ID**
- Seleccionar *Aplicación Web* y haga click en **la pantalla para Configurar Consentimiento**
- Select *Web Application* and click on **Configure Consent Screen**
Rellene los campos necesarios a continuación, haga clic en **Guardar**
- En el ID de cliente Crear diálogo modal:
 - **Tipo de aplicación**: Aplicación Web
 - **Autorizado Javascript orígenes**: http: // localhost: 3000
 - **Autorizado redirigir URI**: http://localhost:3000/auth/google/callback
- Haga click en el botón **Crear ID de cliente*
- Copiar y pegar*ID de cliente* y *Clave cliente secreta* llaves en `.env`

<hr>

<img src="https://raw.github.com/mailgun/media/master/Mailgun_Primary.png" width="200">
- Go to http://www.mailgun.com
- Sign up and add your *Domain Name*
- From the domain overview, copy and paste the default SMTP *Login* and *Password* into `.env` file


Estructura del proyecto
-----------------

| Nombre                                        | Descripción                                                        |
| --------------------------------------------- | ------------------------------------------------------------------ |
| **config**/passport.js                        | Passport Local y OAuth estrategias.                                |
| **controllers**/Administracion.js             | Controller para administración                                     |
| **controllers**/Alertas.js                    | Controller el form de alertas                                      |
| **controllers**/Comprar.js                    | Controller el form de compra/renovación                            |
| **controllers**/DatosAPI.js                   | Controller para las API de datos que envian los drones.            |
| **controllers**/DronesAPI.js                  | Controller para las API de drones.                                 |
| **controllers**/DronesAPI.js                  | Controller para las API de drones.                                 |
| **controllers**/Email.js                      | Controller para enviar correos.                                    |
| **controllers**/error404.js                   | Controller que salta cuando no se envian datos APIs correctamente. |
| **controllers**/Estructura_Email.js           | Controller para Mailgun.                                           |
| **controllers**/Home.js                       | Controller para sessiones usuario.                                 |
| **controllers**/LoginRegistro.js              | Controller para login y registro.                                  |
| **controllers**/Perfil.js                     | Controller para el perfil usuario.                                 |
| **controllers**/Productos.js                  | Controller para productos.                                         |
| **controllers**/Pronosticos.js                | Controller para pronosticos.                                       |
| **controllers**/RangoFecha.js                 | Controller para el form de rango de fechas.                        |
| **controllers**/Tienda.js                     | Controller para la tienda.                                         |
| **controllers**/UploadImage.js                | Controller para poder subir avatares.                              |
| **controllers**/validadarAPI.js               | Controller para validar en el servidor las APIs.                   |
| **models**/Alertas.js                         | Schema Mongoose y model de Alertas.                                |
| **models**/Dato.js                            | Schema Mongoose y model de Datos.                                  |
| **models**/Drones.js                          | Schema Mongoose y model de Drones.                                 |
| **models**/Especificaciones.js                | Schema Mongoose y model de Especificaciones del producto           |
| **models**/HistorialPedidos.js                | Schema Mongoose y model de HistorialPedidos.                       |
| **models**/Opiniones.js                       | Schema Mongoose y model de Opiniones sobre los productos.          |
| **models**/Productos.js                       | Schema Mongoose y model de Productos.                              |
| **models**/Usuario.js                         | Schema Mongoose y model de Usuario                                 |
| **public**/                                   | (fonts, css, js, img).                                             |
| **public**/**avatar**/                        | El lugar donde se guardan los avatares.                            |
| **public**/**bootstrap**/                     | Todo lo relacinado con bootstrap.                                  |
| **public**/**css**/                           | Hubicación de los css.                                             |
| **public**/**dist**/                          | Un theme de boostrap.                                              |
| **public**/**icons**/                         | Iconos que utilizamos.                                             |
| **public**/**images**/                        | Imagenes que utilizamos.                                           |
| **public**/**js**/additional-methods.min.js   | Specify client-side JavaScript dependencies.                       |
| **public**/**js**/bootstrapValidator.min.js   | Specify client-side JavaScript dependencies.                       |
| **public**/**js**/browserMqtt.js   | Specify client-side JavaScript dependencies.                       |
| **public**/**js**/comprar.js   | Specify client-side JavaScript dependencies.                       |
| **public**/**js**/cookie.js   | Specify client-side JavaScript dependencies.                       |
| **public**/**js**/forget_pass.js   | Specify client-side JavaScript dependencies.                       |
| **public**/**js**/additional-methods.min.js   | Specify client-side JavaScript dependencies.                       |
| **public**/**js**/additional-methods.min.js   | Specify client-side JavaScript dependencies.                       |
| .travis.yml                        | [Travis CI](https://travis-ci.org/) integration.                   |
| .env.example                       | Your API keys, tokens, passwords and database URI.                 |
| app.js                             | Main application file.                                             |
| setup.js                           | Tool for removing authentication providers and other things.       |
| **public**/                        | Static assets (fonts, css, js, img).                               |
| **public**/**js**/application.js   | Specify client-side JavaScript dependencies.                       |
| **public**/**js**/main.js          | Place your client-side JavaScript here.                            |
| **public**/**css**/main.less       | Main stylesheet for your app.                                      |
| **public/css/themes**/default.less | Some Bootstrap overrides to make it look prettier.                 |
| **views/account**/                 | Templates for *login, password reset, signup, profile*.            |
| **views/api**/                     | Templates for API Examples.                                        |
| **views/partials**/flash.jade      | Error, info and success flash notifications.                       |
| **views/partials**/header.jade     | Navbar partial template.                                           |
| **views/partials**/footer.jade     | Footer partial template.                                           |
| **views**/layout.jade              | Base template.                                                     |
| **views**/home.jade                | Home page template.                                                |
| .travis.yml                        | [Travis CI](https://travis-ci.org/) integration.                   |
| .env.example                       | Your API keys, tokens, passwords and database URI.                 |
| app.js                             | Main application file.                                             |
| setup.js                           | Tool for removing authentication providers and other things.       |


Listado de paquetes
----------------

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| async                           | Utility library that provides asynchronous control flow.              |
| bcrypt-nodejs                   | Library for hashing and salting user passwords.                       |
| bitgo                           | Multi-sig Bitcoin wallet API.                                         |
| cheerio                         | Scrape web pages using jQuery-style syntax.                           |
| clockwork                       | Clockwork SMS API library.                                            |
| connect-mongo                   | MongoDB session store for Express.                                    |
| dotenv                          | Loads environment variables from .env file.                                                |
| express                         | Node.js web framework.                                                |
| body-parser                     | Express 4 middleware.                                                 |
| cookie-parser                   | Express 4 middleware.                                                 |
| express-session                 | Express 4 middleware.                                                 |
| morgan                          | Express 4 middleware.                                                 |
| compression                     | Express 4 middleware.                                                 |
| errorhandler                    | Express 4 middleware.                                                 |
| method-override                 | Express 4 middleware.                                                 |
| serve-favicon                   | Express 4 middleware offering favicon serving and caching.            |
| express-flash                   | Provides flash messages for Express.                                  |
| express-validator               | Easy form validation for Express.                                     |
| fbgraph                         | Facebook Graph API library.                                           |
| github-api                      | GitHub API library.                                                   |
| jade                            | Template engine for Express.                                          |
| lastfm                          | Last.fm API library.                                                  |
| instagram-node                  | Instagram API library.                                                |
| lob                             | Lob API library                                                       |
| lusca                           | CSRF middleware.                                                      |
| mongoose                        | MongoDB ODM.                                                          |
| node-foursquare                 | Foursquare API library.                                               |
| node-linkedin                   | LinkedIn API library.                                                 |
| node-sass-middleware            | Sass middleware compiler.                                                 |
| nodemailer                      | Node.js library for sending emails.                                   |
| passport                        | Simple and elegant authentication library for node.js                 |
| passport-facebook               | Sign-in with Facebook plugin.                                         |
| passport-github                 | Sign-in with GitHub plugin.                                           |
| passport-google-oauth           | Sign-in with Google plugin.                                           |
| passport-twitter                | Sign-in with Twitter plugin.                                          |
| passport-instagram              | Sign-in with Instagram plugin.                                        |
| passport-local                  | Sign-in with Username and Password plugin.                            |
| passport-linkedin-oauth2        | Sign-in with LinkedIn plugin.                                         |
| passport-oauth                  | Allows you to set up your own OAuth 1.0a and OAuth 2.0 strategies.    |
| paypal-rest-sdk                 | PayPal APIs library.                                                  |
| request                         | Simplified HTTP request library.                                      |
| stripe                          | Offical Stripe API library.                                           |
| tumblr.js                       | Tumblr API library.                                                   |
| twilio                          | Twilio API library.                                                   |
| twit                            | Twitter API library.                                                  |
| lodash                          | Handy JavaScript utlities library.                                    |
| validator                       | Used in conjunction with express-validator in **controllers/api.js**. |
| mocha                           | Test framework.                                                       |
| chai                            | BDD/TDD assertion library.                                            |
| supertest                       | HTTP assertion library.                                               |
| multiline                       | Multi-line strings for the generator.                                 |
| blessed                         | Interactive command line interface for the generator.                 |
| yui                             | Used by the Yahoo API example.                                        |


Licencia
-------

The MIT License (MIT)

Copyright (c) 2016 Iosu Recalde, Ruben Alvarez, Gorka Perez and Sergio Valera.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.