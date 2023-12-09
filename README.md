# Backend-Aula-Sensorial
## Main API
Descripcion de la API
## Requisitos Previos
- NodeJS: ^18.18.0
- NPM: ^10.2.2
- MySQL: ^8.0.35-ubuntu0.22.04.1 (Ubuntu)
## Instalacion, Configuracion y Primer Inicio
1. Clonar el repositorio `https://github.com/dpaulsoria/Backend-Aula-Sensorial.git`
2. Acceder a la carpeta con `cd Backend-Aula-Sensorial`
3. Instalar las dependencias con `npm install`
4. Asegurarse de tener instalados los paquetes `mysql2`, `sequelize` y `sequelize-cli` tanto de forma local a nivel de proyecto, como de forma global en la PC con este comando `npm i -g mysql2 sequelize sequelize-cli` y `npm  i mysql2 sequelize sequelize-cli`
5. Asegurarse de tener el .env correspondiente. Recordar utilizar los valores apropiados.
    ```
    ACCESS_TOKEN_SECRET=secret
    ACCESS_TOKEN_TIME=15m
    REFRESH_TOKEN_SECRET=secret

    # Para el entorno de desarrollo
    DEV_DB_NAME=aula_sensorial
    DEV_DB_USER=root
    DEV_DB_PASSWORD=secret
    DEV_DB_HOST=localhost

    # Para el entorno de pruebas
    TEST_DB_NAME=nombre_bd_pruebas
    TEST_DB_USER=usuario_pruebas
    TEST_DB_PASSWORD=contraseña_pruebas
    TEST_DB_HOST=host_pruebas

    # Para el entorno de producción
    PROD_DB_NAME=aula_sensorial
    PROD_DB_USER=klaeoeiwyw
    PROD_DB_PASSWORD=secret
    PROD_DB_HOST=aula-sensorial-server.mysql.database.azure.com

    NODE_ENV=development
    PORT=3000

    DEFAULT_USER=admin
    DEFAULT_USER_PASSWORD=secret

    ```
6. Si el motor de base de datos esta instalado correctamente y el .env es el adecuado, empezar con crear la base de datos con `npm run create`. Recordar que tambien esta el comando `npm run drop` y `npm run migrate`.
7. Correr la Main API con `npm run dev`
8. Con respecto al sistema de almacenamiento de archivos
    - La carpeta de uploads debe tener ciertos permisos
    ```
    ❯ chmod -R 775 uploads
    ❯ ls -l | grep uploads
    drwxrwxr-x haze haze 4.0 KB Sat Dec  9 01:04:47 2023 uploads
    ```
### Cosas que faltan
Cómo Empezar: Ofrece una guía de inicio rápido que muestra cómo poner en marcha tu API después de la instalación.

Uso: Describe cómo utilizar tu API. Incluye ejemplos de solicitudes y respuestas, y explica los diferentes endpoints y métodos disponibles (GET, POST, etc.).

Documentación de la API: Detalla la documentación de tu API. Esto puede ser un enlace a una página de documentación externa o una sección dentro del README.

Pruebas: Explica cómo ejecutar las pruebas unitarias y de integración para tu API, si las hay.

Contribuir: Si estás abierto a contribuciones, incluye pautas sobre cómo otros pueden contribuir a tu proyecto.

Licencia: Indica bajo qué licencia se distribuye tu API.

Información de Contacto y Soporte: Proporciona detalles sobre cómo otros pueden contactarte para obtener soporte o más información.

Capturas de Pantalla/Demos: Incluir capturas de pantalla o enlaces a demos puede ser útil para mostrar cómo funciona tu API.

FAQs: Una sección de Preguntas Frecuentes puede ayudar a aclarar dudas comunes de los usuarios.

Agradecimientos: Si deseas, puedes incluir agradecimientos a colaboradores, mentores, o recursos que fueron particularmente útiles.

Este esquema es flexible y puedes adaptarlo según las necesidades específicas de tu proyecto y tu audiencia. Un README bien estructurado y completo es una parte esencial de cualquier proyecto de software, ya que ayuda a los usuarios y desarrolladores a entender y utilizar tu API de manera efectiva.




