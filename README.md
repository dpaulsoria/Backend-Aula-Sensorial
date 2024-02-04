# Backend-Aula-Sensorial
## Main API
Descripcion de la API
## Requisitos Previos
- NodeJS: ^18.18.0
- NPM: ^10.2.2
- Base de datos: MongoDB
## Instalacion, Configuracion y Primer Inicio
Nota: Recuerda crear la carpeta uploads para que la subida de archivos funcione correctamente en el servidor.
1. Clonar el repositorio `https://github.com/dpaulsoria/Backend-Aula-Sensorial.git`
2. Acceder a la carpeta con `cd Backend-Aula-Sensorial`
3. Instalar las dependencias con `npm install`
4. Asegurarse de tener instalados los paquetes `mongoose` y `mongodb`
5. Asegurarse de tener el .env correspondiente. Recordar utilizar los valores apropiados.
    ```
    PORT=3000
    NODE_ENV=development
    HOST=localhost
    # File System
    EXCLUDED_EXTENSIONS=".exe,.bat,.cmd,.sh,.php,.pl,.py,.js,.vbs,.ps1,.psm1,.scr,.dll,.com,.jar,.vb,.jse,.wsf,.wsh,.sh,.bash,.msi,.reg,.gadget,.mdb,.accdb,.dbf,.sql,.bak,.docm,.xlsm,.pptm,.odt,.fodt,.uot,.rtf,.pdf,.zip,.rar,.7z,.tar,.gz,.tgz,.bz2,.ace,.uue"
    LIMITED_SIZE="1073741824" # Debe ser en bytes
    DB_CON=mongodb+srv://root:hWva8k5eCSTULzLa@cluster0.fbbjfnx.mongodb.net/?retryWrites=true&w=majority
    JWT_SECRET=secret
    REFRESH_TOKEN_SECRET=secret
    ```
6. La base de datos esta en la nube de mongo atlas.
7. Comando para pruebas `npm run test`
8. Correr la Main API con nodemon `npm run dev`
8. Con respecto al sistema de almacenamiento de archivos
    - La carpeta de uploads debe tener ciertos permisos
    ```
    ❯ chmod -R 775 public/media
    ❯ ls -l | grep public/media
    drwxrwxr-x haze haze 4.0 KB Sat Dec  9 01:04:47 2023 public/media
    ```

## Documentacion
Al desplegar la API se habilita la ruta /api-docs en la que se describen los escenarios de los endpoints y esquemas, se desarrolla con SWAGGER.  
Cosas a tener en cuenta:
-  MUY IMPORTANTE > Se deben crear los DEVICES antes del uso, es decir, si en el aula sensorial hay 3 parlantes, 2 pantallas y 2 luces, se deben crear utilizando los endpoints adecuados. De esta forma luego se pueden manejar sus cambios de estado. Revisar el esquema de los dispositivos.
- La autenticacion de usuario funciona con un token almacenado en la base de datos
- La contraseña se almacena hasheada en la base de datos.
## Pruebas
Para las pruebas se utiliza JEST y SUPERTEST, tan solo se debe correr el comando `npm run test`
## Licencia
La licencia usada es MIT




