# Registro y Login Server — Taller 2

Proyecto desarrollado para la materia de programación en la universidad. Es una aplicación web full-stack que implementa un sistema de registro e inicio de sesión de usuarios con autenticación mediante tokens JWT y base de datos en la nube con Supabase.

---

## Funcionalidades

- **Registro de usuarios** — El usuario puede crear una cuenta ingresando un nombre de usuario y contraseña. La contraseña se almacena de forma segura usando encriptación con bcrypt.
- **Inicio de sesión** — El usuario puede iniciar sesión con sus credenciales. Si son correctas, el servidor genera un token JWT con una duración de 1 hora.
- **Ruta protegida** — Existe un endpoint `/protegido` que solo es accesible si el usuario envía un token JWT válido en el header de la petición.
- **Interfaz web** — Página frontend sencilla y elegante con formularios de registro, login y un botón para acceder al contenido protegido.

---

## Tecnologías utilizadas

- **Node.js** — Entorno de ejecución del servidor
- **Express.js** — Framework para la creación del servidor y manejo de rutas
- **Supabase** — Base de datos en la nube (PostgreSQL) donde se almacenan los usuarios
- **bcryptjs** — Librería para encriptar contraseñas antes de guardarlas
- **jsonwebtoken (JWT)** — Generación y verificación de tokens de autenticación
- **dotenv** — Manejo de variables de entorno de forma segura
- **CORS** — Configuración para permitir peticiones desde el frontend

---

## Integraciones

- **Supabase** — La aplicación se conecta a una base de datos PostgreSQL en la nube a través del cliente oficial de Supabase. Almacena los usuarios con su contraseña encriptada.
- **Middleware de autenticación** — Se implementó un middleware personalizado que intercepta las peticiones a rutas protegidas, extrae el token JWT del header `Authorization` y lo verifica antes de dar acceso.
- **Variables de entorno** — Las credenciales sensibles (URL de Supabase, clave anónima y JWT secret) se manejan mediante un archivo `.env` y nunca se exponen en el código fuente.
- **Railway** — La aplicación está desplegada en Railway, que detecta automáticamente el entorno Node.js y sirve la aplicación en producción, lo hice con el fin que no tuviese que descargar todo el repositorio para que pudiese utilizar.

---

## Enlaces

- 🌐 **Aplicación en producción:** [https://registrologinserver-production.up.railway.app](https://registrologinserver-production.up.railway.app)
- 💻 **Repositorio en GitHub:** [https://github.com/Joshuabym856/RegistroLoginServer](https://github.com/Joshuabym856/RegistroLoginServer)
