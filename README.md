# CloudMind

## Descripción
CloudMind es una plataforma web que permite a los usuarios consultar la previsión del tiempo de su ciudad y planificar sus comidas semanales. El proyecto está dividido en frontend (Angular) y backend (Node.js + Express + MongoDB).

## Tecnologías utilizadas
- **Frontend:** Angular, Bootstrap
- **Backend:** Node.js, Express
- **Base de datos:** MongoDB
- **Despliegue:** GitHub Pages (frontend), Render (backend)

## Estructura del proyecto
```
CloudMind/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
├── frontend/
│   ├── src/app/components/
│   ├── src/app/services/
│   ├── src/app/guards/
│   ├── src/index.html
│   └── ...
├── Manual_Administrador_CloudMind.txt
├── Manual_Usuario_CloudMind.txt
└── ...
```

## Instalación y ejecución

### Backend
1. Ve a la carpeta `backend`.
2. Instala dependencias:
   ```
   npm install
   ```
3. Crea un archivo `.env` con la cadena de conexión de MongoDB y otras variables necesarias.
4. Ejecuta el servidor:
   ```
   node server.js
   ```

### Frontend
1. Ve a la carpeta `frontend`.
2. Instala dependencias:
   ```
   npm install
   ```
3. Ejecuta la aplicación Angular:
   ```
   ng serve
   ```

## Endpoints principales (API backend)
- `POST /api/auth/register` — Registro de usuario
- `POST /api/auth/login` — Inicio de sesión
- `GET /api/meals?userId=...` — Obtener comidas e ingredientes
- `POST /api/meals` — Guardar comidas e ingredientes
- `POST /api/users/email-preference` — Cambiar preferencia de correos
- `GET /api/users/:userId` — Obtener datos de usuario

## Despliegue
- **Frontend:** GitHub Pages (`https://jesusruiz04.github.io/Cloudmind/login`)
- **Backend:** Render (URL según configuración)

## Variables de entorno necesarias (backend)
- `MONGODB_URI` — Cadena de conexión a MongoDB
- `PORT` — Puerto del servidor (por defecto 3000)
- Otras según configuración de correo (si aplica)

## Arquitectura
- El frontend Angular consume la API REST del backend Node.js/Express.
- El backend gestiona usuarios, comidas, ingredientes y preferencias.
- MongoDB almacena usuarios y comidas.

## Contacto
- Correo de soporte: cloudmind.oficial@gmail.com

---

> Para más detalles, consulta los manuales de usuario y administrador incluidos en el proyecto.
