# Proyecto Final de programacion web
Proyecto de API/Backend y VueJS/Frontend:
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
(Backend)
Recuerde configurar correctamente sus variables de entorno creando un archivo .env dentro de la carpeta APITypescript.

Dentro se deberá incluir:

`DB_HOST`
`DB_USER`
`DB_PW`
`DB_DATABASE`
`PORT`

(Frontend)
Recuerde configurar correctamente sus variables de entorno creando un archivo .env dentro de la carpeta L02-Frontend-pw22431112.

Dentro se deberá incluir:

`VITE_API_KEY`
`VITE_AUTH_DOMAIN`
`VITE_PROJECT_ID`
`VITE_STORAGE_BUCKET`
`VITE_MESSAGING_SENDER_ID`
`VITE_APP_ID`

Esto para utilizar un bucket de firebase y utilizar el metodo de authorizacion.