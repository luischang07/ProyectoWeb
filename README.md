# Proyecto Final de programacion web
Instrucciones: Tomando como base los proyectos de API/Backend y VueJS/Frontend, continúe con la programación de los módulos faltantes de acuerdo 
con la lista siguiente: 

 - Módulo Clientes (id del cliente, nombre, dirección, teléfono, correo 
electrónico, ciudad). 

 - Módulo Artículos (id del artículo, descripción, precio, cantidad en almacén, 
fecha de caducidad). 

 - Módulo Ventas (id de la venta, id del artículo, id del cliente, cantidad, precio, 
IVA, subtotal, total, fecha de la venta). 

 - Módulo Personal (id del personal, nombre, dirección, teléfono, estatus). 

 - Módulo Compras (id de la compra, id del artículo, cantidad, precio, IVA, 
subtotal, total, fecha de compra).

 - Módulo Registro (id del personal, fecha, hora, movimiento (entrada o salida)). 

 - Backend: NodeJS, TypeScript, express, cors, Zod, base de datos MySQL conectada con MySQL2. 

 - Frontend: VueJS 3 con Vite, TypeScript, Axios, Zod. 

 - Los módulos y características de los puntos anteriores es lo mínimo obligatorio. 
Cualquier otro paquete o biblioteca que les sirva para el proyecto es permitida. 
Así como también otro módulo que incluyan o mejora de los que están les aumentará calificación.

 - Las características de diseño CSS3 que vimos, incluídos Grid o Flexbox 
deberán usarlas para mejorar el aspecto del proyecto, es importante una buena 
apariencia. 

- El trabajo es en equipo: máximo 4 integrantes.

 - Lo entregará un solo integrante del equipo  por la plataforma Teams en una tarea que se abrirá para ese propósito. Es indispensable que incluyan un archivo de texto con los nombres completos de todo el equipo.

 - Para la entrega: un archivo comprimido (ZIP) con una carpeta que incluya las carpetas del backend, frontend y la estructura SQL de las tablas con el nombre de su base de datos. Antes de comprimirlas eliminen las carpetas 
node_modules.

 - Fecha de entrega: 11 de diciembre 2024.


## Instalacion

Clona el repositorio:

```bash
  git clone https://github.com/luischang07/ProyectoWeb.git
```
Navega a la carpeta:
```bash
  cd ProyectoWeb
```
Dentro de la carpeta se encontraran dos subcarpetas:

![Captura de pantalla 2024-11-28 144333](https://github.com/user-attachments/assets/4f78040b-287c-4cad-a2c9-2e8461afb98a)

Donde APITypescript:


![Captura de pantalla 2024-11-28 150210](https://github.com/user-attachments/assets/2c3c0e34-eeac-44b5-be90-970160e9b481)


Esta el codigo del lado del servidor(Backend).

&

Donde L02-Frontend-pw22431112:


![image](https://github.com/user-attachments/assets/26b14659-f392-43b0-9a67-dcdd87596248)

Esta el codigo del lado del Cliente (Frontend).


# Run Locally

Instalar dependencias del Backend:

```bash
  cd APITypescript
  npm install
```

Instalar dependencias del Frontend:

```bash
  cd L02-Frontend-pw22431112
  npm install
```

Correr el Servidor(Backend):

```bash
  cd APITypescript
  npm run dev
```

Correr el Frontend:

```bash
  cd L02-Frontend-pw22431112
  npm run dev
```
- esto correra ambas partes en el modo desarrollo.

# Notas

Recuerde configurar correctamente sus variables de entorno creando un archivo .env dentro de la carpeta APITypescript.

Dentro se deberá incluir:

`DB_HOST`
`DB_USER`
`DB_PW`
`DB_DATABASE`
`PORT`

