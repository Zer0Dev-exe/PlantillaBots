# 🤖 PlantillaBots

🚀 **PlantillaBots** es una plantilla para la creación de bots en JavaScript. Proporciona una estructura básica y organizada para facilitar el desarrollo y la implementación de bots.

## ✨ Características

- 🔹 **Comandos con prefijo**: Manejo de comandos tradicionales con prefijo.
- 🔹 **Comandos Slash**: Soporte para comandos tipo slash.
- 🔹 **Gestión de eventos**: Manejo estructurado de eventos.
- 🔹 **Funciones reutilizables**: Conjunto de funciones útiles para el desarrollo del bot.

## ⚙️ Requisitos

- 📌 [Node.js](https://nodejs.org/) v14 o superior
- 📌 [npm](https://www.npmjs.com/)

## 📥 Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/Zer0Dev-exe/PlantillaBots.git
   cd PlantillaBots

2. Instala las dependencias:
   ```bash
   npm install

3. Configura las variables de entorno:
    Renombra el archivo `.env.example` a `.env` con el siguiente comando:
    ```bash
    mv .env.example .env
    Abre el archivo `.env` y configura las variables necesarias.


## 🚀 Uso
Para iniciar el bot, usa el siguiente comando:
    ```bash
    node .

## 📂 Estructura del Proyecto
    ```plaintext
    📁 ComandosPrefix/  - Contiene los comandos que utilizan un prefijo.  
    📁 ComandosSlash/   - Incluye los comandos tipo slash.  
    📁 Esquemas/        - Modelos y esquemas de datos.  
    📁 Eventos/         - Manejadores de eventos.  
    📁 Funciones/       - Funciones reutilizables.  
    📁 Handlers/        - Manejadores para diferentes procesos del bot.  
    🔑 .env.example     - Archivo de configuración de entorno.
    📄 index.js         - Punto de entrada principal del bot.  
    ```

## 🤝 Contribuciones
    Las contribuciones son bienvenidas. Si deseas contribuir, sigue estos pasos:
    ```bash
    1. 🍴 Haz un fork del proyecto.
    2. 🌱 Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
    3. 🛠️ Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
    4. 🚀 Sube tus cambios (git push origin feature/nueva-funcionalidad).
    5. 🔄 Abre un Pull Request.

## 📜 Licencia
    ```plaintext
    📄 Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.