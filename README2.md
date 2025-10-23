⚽ XAcademy Frontend

Aplicación web desarrollada en Angular 19 para el XAcademy DEV Challenge.
Forma parte de un proyecto fullstack con backend en Node.js + Express + Sequelize, que permite visualizar, crear y editar jugadores asociados al usuario autenticado.

🚀 Tecnologías utilizadas
🧠 Frontend

Angular 19 (standalone components, signals, reactive forms)

TypeScript

RxJS

Chart.js → para los gráficos radar

CSS responsivo con variables y grid

JWT Authentication (via interceptor)

⚙️ Backend

Node.js + Express

Sequelize (ORM con MySQL / PostgreSQL)

JWT (jsonwebtoken)

bcryptjs para encriptar contraseñas

CORS + dotenv

Docker Compose (opcional) para levantar DB y API

📂 Estructura principal del proyecto

frontend/
 ├── src/
 │   ├── app/
 │   │   ├── core/
 │   │   │   ├── auth/              → login, guard e interceptor JWT
 │   │   │   └── my-players.service.ts
 │   │   ├── pages/
 │   │   │   ├── login/             → formulario de inicio de sesión
 │   │   │   ├── players/           → listado de jugadores
 │   │   │   ├── player-detail/     → detalle con gráfico radar
 │   │   │   └── my-players/        → CRUD de jugadores del usuario
 │   │   ├── app.routes.ts          → configuración de rutas
 │   │   └── app.config.ts          → router + http interceptor
 │   └── assets/

🔐 Autenticación

Login mediante POST /auth/login

Token JWT almacenado en localStorage

Interceptor que agrega el header Authorization: Bearer <token> automáticamente

authGuard protege rutas privadas (/players, /my-players)

🧩 Funcionalidades principales
🏁 Login

Formulario reactivo con validaciones de email y contraseña

Si es correcto, redirige al listado principal

🧍‍♂️ Players

Lista de jugadores del sistema (GET /api/players)

Filtros combinados: nombre, club, posición, versión, género

Botón de exportación a CSV

Navegación al detalle

📊 Player Detail

Muestra estadísticas con un Radar Chart (Chart.js)

Visualiza atributos como pace, shooting, passing, etc.

Botón “← Volver” con routerLink

🧾 My Players

Lista de jugadores creados por el usuario autenticado (GET /api/my-players)

Crear jugador (POST /api/my-players)

Editar jugador (PUT /api/my-players/:id)

Diseño en tarjetas responsivas con etiquetas de posición y versión

🧹 Eliminar no es obligatorio en el challenge (no se pide en la consigna oficial).

🧠 Consideraciones técnicas

Uso de signals (loading, error, items) para manejar estados reactivos sin necesidad de BehaviorSubject.

Reactive Forms para crear/editar con validaciones.

Diseño adaptable con CSS Grid + variables globales.

Manejo de errores y feedback visual básico.

⚙️ Instalación y ejecución local
1️⃣ Clonar repositorio
git clone https://github.com/tuusuario/xacademy-frontend.git
cd xacademy-frontend
2️⃣ Instalar dependencias
npm install
3️⃣ Ejecutar en modo desarrollo
ng serve --proxy-config proxy.conf.json
4️⃣ Backend (Node.js + Express)
cd backend
npm install
npm run dev
🔗 API Endpoints principales
Método	Endpoint	Descripción
POST	/auth/login	Login del usuario
GET	/api/players	Listar jugadores globales
GET	/api/players/:id	Detalle de jugador
GET	/api/my-players	Listar jugadores del usuario
POST	/api/my-players	Crear nuevo jugador
PUT	/api/my-players/:id	Editar jugador existente

📸 Capturas
Pantalla	Descripción
Login	Inicio de sesión con validación reactiva
Players	Listado global con filtros
Player Detail	Gráfico radar de estadísticas
My Players	CRUD de jugadores del usuario autenticado

🧾 Licencia

Desarrollado con fines educativos para el XAcademy DEV Challenge
Uso libre para fines de aprendizaje y demostración.

👨‍💻 Autor: Pacheco Paolo
📅 Entrega: Octubre 2025
