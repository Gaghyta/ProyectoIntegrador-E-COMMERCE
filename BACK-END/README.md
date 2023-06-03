**VIRTUAL TRENDS BACKEND**

Backend para E-commerce de la marca VIRTUAL TRENDS que ofrece indumentaria y accesorios personalizados utilizando sistemas de representación 3D que permiten mostrar la proyección de prendas que aún no han sido materializadas.

Instalación
A continuación se detallan los pasos necesarios para instalar y configurar el proyecto.

Requisitos previos
Python 3.x
MySQL y el SGBD Workbench instalados

Acceso a la contraseña de MySQL a través de variable de entorno para evitar conflictos:

Paso 1: Crear y activar el entorno virtual

-Crear
python3 -m venv env

-Activar tu entorno virtual: 
Desde la línea de comandos, ingresa al directorio donde se encuentra tu entorno virtual y ejecuta el comando para activarlo. Por ejemplo:


source path/to/venv/bin/activate  # En Linux/macOS
path\to\venv\Scripts\activate     # En Windows

Paso 2: Establecer la contraseña de la base de datos en una variable de entorno

Para establecer la contraseña de la base de datos en una variable de entorno

-Abre una terminal y asegúrate de estar en el directorio del proyecto.

-Ejecuta el comando CORRESPONDIENTE A TU SISTEMA OPERATIVO para configurar la variable de entorno:

(Dentro del entorno virtual, ejecuta el comando export (en Linux/macOS) o set (en Windows) para establecer la variable de entorno DB_PASSWORD)


export DB_PASSWORD=mi_contraseña  # En Linux/macOS
set DB_PASSWORD=mi_contraseña     # En Windows
Esto establecerá la variable de entorno solo dentro del entorno virtual activo.

Paso 4: Configurar la variable de entorno dentro del archivo de SETTINGS.PY
Luego, en tu archivo settings.py, puedes acceder al valor de la variable de entorno utilizando os.environ.get('DB_PASSWORD')


Reemplaza "tu-contrasena" con la contraseña real de tu base de datos MySQL.


Paso 5 (opcional): Podés verificar si la variable de entorno se configuró correctamente ejecutando el siguiente comando dentro del entorno virtual:

echo $DB_PASSWORD

Si la variable de entorno se muestra correctamente con el valor que configuraste, significa que todo está en orden.

Paso 6: Configurar el archivo settings.py

No es necesario modificar directamente el archivo settings.py. En su lugar, el archivo ya está configurado para utilizar la variable de entorno DB_PASSWORD. Aseguráte de que la siguiente configuración esté presente en el archivo settings.py:


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'nombre-de-la-base-de-datos',
        'USER': 'nombre-de-usuario',
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': 'localhost',
        'PORT': '3306',
        'OPTIONS': {
            'sql_mode': 'traditional',
        }
    }
}
Reemplaza "nombre-de-la-base-de-datos" y "nombre-de-usuario" con los valores correctos para tu configuración de MySQL.


Paso 7: Iniciar el servidor de desarrollo

python manage.py runserver
El servidor se ejecutará en http://localhost:8000/.

Otros comandos útiles

python manage.py migrate: Aplica las migraciones de la base de datos.

python manage.py createsuperuser: Crea un superusuario para acceder al panel de administración.

Contribuciones

Si deseas contribuir a este proyecto, sigue estos pasos:

Realiza un fork del repositorio.

Crea una rama con tu nueva funcionalidad: git checkout -b nombre-de-la-rama.

Realiza tus cambios y realiza commit: git commit -m "Descripción de los cambios".

Haz push a la rama: git push origin nombre-de-la-rama.

Envía un pull request a la rama principal del repositorio.

Contacto

Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto con nosotros virtualtrends2020@gmail.com