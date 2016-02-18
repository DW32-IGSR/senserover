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

| Nombre                             | Descripción                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **config**/passport.js             | Passport Local and OAuth strategies, plus login middleware.  |
| **controllers**/api.js             | Controller for /api route and all api examples.              |
| **controllers**/contact.js         | Controller for contact form.                                 |
| **controllers**/home.js            | Controller for home page (index).                            |
| **controllers**/user.js            | Controller for user account management.                      |
| **models**/User.js                 | Mongoose schema and model for User.                          |
| **public**/                        | Static assets (fonts, css, js, img).                         |
| **public**/**js**/application.js   | Specify client-side JavaScript dependencies.                 |
| **public**/**js**/main.js          | Place your client-side JavaScript here.                      |
| **public**/**css**/main.less       | Main stylesheet for your app.                                |
| **public/css/themes**/default.less | Some Bootstrap overrides to make it look prettier.           |
| **views/account**/                 | Templates for *login, password reset, signup, profile*.      |
| **views/api**/                     | Templates for API Examples.                                  |
| **views/partials**/flash.jade      | Error, info and success flash notifications.                 |
| **views/partials**/header.jade     | Navbar partial template.                                     |
| **views/partials**/footer.jade     | Footer partial template.                                     |
| **views**/layout.jade              | Base template.                                               |
| **views**/home.jade                | Home page template.                                          |
| .travis.yml                        | [Travis CI](https://travis-ci.org/) integration.             |
| .env.example                       | Your API keys, tokens, passwords and database URI.           |
| app.js                             | Main application file.                                       |
| setup.js                           | Tool for removing authentication providers and other things. |


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
