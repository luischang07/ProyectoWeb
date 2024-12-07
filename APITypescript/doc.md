# Documentación de las Peticiones

## Rutas y Servicios

### Obtener todos los registros de personal
- **Ruta**: `GET /api/personal`
- **Descripción**: Obtiene todos los registros de personal.
- **Servicio**: [`getPersonal`](src/services/personalServices.ts)
- **Retorno**:
  - **Éxito**: Array de objetos de personal, `{mensaje: "No hay personal para mostrar"}`.
  - **Error**: `{ error: "No se puede obtener el personal" }`

### Obtener un registro de personal por ID
- **Ruta**: `GET /api/personal/:id`
- **Descripción**: Obtiene un registro de personal por su ID.
- **Servicio**: [`getPersonalOne`](src/services/personalServices.ts)
- **Retorno**:
  - **Éxito**: Objeto de personal, `{mensaje:"No existe el personal ${id}"}`.
  - **Error**: `{ error: "No se puede obtener el personal" }`

### Obtener un registro de personal por teléfono
- **Ruta**: `GET /api/personal/telefono/:telefono`
- **Descripción**: Obtiene un registro de personal por su número de teléfono.
- **Servicio**: [`getPersonalTelefono`](src/services/personalServices.ts)
- **Retorno**:
  - **Éxito**: Objeto de personal.
  - **Error**: `{ error: "No se puede obtener el personal" }`

### Crear un nuevo registro de personal
- **Ruta**: `POST /api/personal`
- **Descripción**: Crea un nuevo registro de personal.
- **Servicio**: [`createPersonal`](src/services/personalServices.ts)
- **Retorno**:
  - **Éxito**: Resultado de la inserción.
  - **Error**: `{ error: "No se puede crear el personal" }`

### Actualizar un registro de personal
- **Ruta**: `PUT /api/personal`
- **Descripción**: Actualiza un registro de personal existente.
- **Servicio**: [`updatePersonal`](src/services/personalServices.ts)
- **Retorno**:
  - **Éxito**: Resultado de la actualización.
  - **Error**: `{ error: "No se puede actualizar el personal" }`

### Eliminar un registro de personal
- **Ruta**: `DELETE /api/personal`
- **Descripción**: Elimina un registro de personal por su ID.
- **Servicio**: [`deletePersonal`](src/services/personalServices.ts)
- **Retorno**:
  - **Éxito**: `{ mensaje: "Personal eliminado", "No existe el personal" }`
  - **Error**: `{ error: "No se puede eliminar el personal" }`

### Obtener todos los registros de clientes
- **Ruta**: `GET /api/clientes`
- **Descripción**: Obtiene todos los registros de clientes.
- **Servicio**: [`getClientes`](src/services/clientesServices.ts)
- **Retorno**:
  - **Éxito**: Array de objetos de clientes, `{mensaje: "No hay clientes para mostrar"}`.
  - **Error**: `{ error: "No se puede obtener los clientes" }`

### Obtener un registro de cliente por ID
- **Ruta**: `GET /api/clientes/:id`
- **Descripción**: Obtiene un registro de cliente por su ID.
- **Servicio**: [`getClienteOne`](src/services/clientesServices.ts)
- **Retorno**:
  - **Éxito**: Objeto de cliente, `{mensaje:"No existe el cliente ${id}"}`.
  - **Error**: `{ error: "No se puede obtener el cliente" }`

### Crear un nuevo registro de cliente
- **Ruta**: `POST /api/clientes`
- **Descripción**: Crea un nuevo registro de cliente.
- **Servicio**: [`createCliente`](src/services/clientesServices.ts)
- **Retorno**:
  - **Éxito**: Resultado de la inserción.
  - **Error**: `{ error: "No se puede crear el cliente" }`

### Actualizar un registro de cliente
- **Ruta**: `PUT /api/clientes`
- **Descripción**: Actualiza un registro de cliente existente.
- **Servicio**: [`updateCliente`](src/services/clientesServices.ts)
- **Retorno**:
  - **Éxito**: Resultado de la actualización.
  - **Error**: `{ error: "No se puede actualizar el cliente" }`

### Eliminar un registro de cliente
- **Ruta**: `DELETE /api/clientes`
- **Descripción**: Elimina un registro de cliente por su ID.
- **Servicio**: [`deleteCliente`](src/services/clientesServices.ts)
- **Retorno**:
  - **Éxito**: `{ mensaje: "Cliente eliminado", "No existe el cliente" }`
  - **Error**: `{ error: "No se puede eliminar el cliente" }`

### Obtener todos los registros de artículos
- **Ruta**: `GET /api/articulos`
- **Descripción**: Obtiene todos los registros de artículos.
- **Servicio**: [`getArticulos`](src/services/articulosServices.ts)
- **Retorno**:
  - **Éxito**: Array de objetos de artículos, `{mensaje: "No hay artículos para mostrar"}`.
  - **Error**: `{ error: "No se pueden obtener los artículos" }`

### Obtener un registro de artículo por ID
- **Ruta**: `GET /api/articulos/:id`
- **Descripción**: Obtiene un registro de artículo por su ID.
- **Servicio**: [`getArticuloOne`](src/services/articulosServices.ts)
- **Retorno**:
  - **Éxito**: Objeto de artículo, `{mensaje:"No existe el artículo ${id}"}`.
  - **Error**: `{ error: "No se puede obtener el artículo" }`

### Crear un nuevo registro de artículo
- **Ruta**: `POST /api/articulos`
- **Descripción**: Crea un nuevo registro de artículo.
- **Servicio**: [`createArticulo`](src/services/articulosServices.ts)
- **Retorno**:
  - **Éxito**: Resultado de la inserción.
  - **Error**: `{ error: "No se puede crear el artículo" }`

### Actualizar un registro de artículo
- **Ruta**: `PUT /api/articulos`
- **Descripción**: Actualiza un registro de artículo existente.
- **Servicio**: [`updateArticulo`](src/services/articulosServices.ts)
- **Retorno**:
  - **Éxito**: Resultado de la actualización.
  - **Error**: `{ error: "No se puede actualizar el artículo" }`

### Eliminar un registro de artículo
- **Ruta**: `DELETE /api/articulos`
- **Descripción**: Elimina un registro de artículo por su ID.
- **Servicio**: [`deleteArticulo`](src/services/articulosServices.ts)
- **Retorno**:
  - **Éxito**: `{ mensaje: "Artículo eliminado", "No existe el artículo" }`
  - **Error**: `{ error: "No se puede eliminar el artículo" }`

### Obtener todos los registros de compras
- **Ruta**: `GET /api/compras`
- **Descripción**: Obtiene todos los registros de compras.
- **Servicio**: [`getCompras`](src/services/comprasServices.ts)
- **Retorno**:
  - **Éxito**: Array de objetos de compras, `{mensaje: "No hay compras para mostrar"}`.
  - **Error**: `{ error: "No se pueden obtener las compras" }`

### Obtener un registro de compra por ID
- **Ruta**: `GET /api/compras/:id`
- **Descripción**: Obtiene un registro de compra por su ID.
- **Servicio**: [`getCompraById`](src/services/comprasServices.ts)
- **Retorno**:
  - **Éxito**: Objeto de compra, `{mensaje:"No existe la compra ${id}"}`.
  - **Error**: `{ error: "No se puede obtener la compra" }`

### Crear un nuevo registro de compra
- **Ruta**: `POST /api/compras`
- **Descripción**: Crea un nuevo registro de compra.
- **Servicio**: [`createCompra`](src/services/comprasServices.ts)
- **Retorno**:
  - **Éxito**: Resultado de la inserción.
  - **Error**: `{ error: "No se puede crear la compra" }`

### Actualizar un registro de compra
- **Ruta**: `PUT /api/compras`
- **Descripción**: Actualiza un registro de compra existente.
- **Servicio**: [`updateCompra`](src/services/comprasServices.ts)
- **Retorno**:
  - **Éxito**: Resultado de la actualización.
  - **Error**: `{ error: "No se puede actualizar la compra" }`

### Eliminar un registro de compra
- **Ruta**: `DELETE /api/compras`
- **Descripción**: Elimina un registro de compra por su ID.
- **Servicio**: [`deleteCompra`](src/services/comprasServices.ts)
- **Retorno**:
  - **Éxito**: `{ mensaje: "Compra eliminada", "No existe la compra" }`
  - **Error**: `{ error: "No se puede eliminar la compra" }`

### Obtener todos los registros de registros
- **Ruta**: `GET /api/registros`
- **Descripción**: Obtiene todos los registros de registros.
- **Servicio**: [`getRegistros`](src/services/registrosServices.ts)
- **Retorno**:
  - **Éxito**: Array de objetos de registros, `{mensaje: "No hay registros para mostrar"}`.
  - **Error**: `{ error: "No se pueden obtener los registros" }`

### Crear un nuevo registro de registro
- **Ruta**: `POST /api/registros`
- **Descripción**: Crea un nuevo registro de registro.
- **Servicio**: [`createRegistro`](src/services/registrosServices.ts)
- **Retorno**:
  - **Éxito**: Resultado de la inserción.
  - **Error**: `{ error: "No se puede crear el registro" }`

### Eliminar un registro de registro
- **Ruta**: `DELETE /api/registros/:id`
- **Descripción**: Elimina un registro de registro por su ID.
- **Servicio**: [`deleteRegistro`](src/services/registrosServices.ts)
- **Retorno**:
  - **Éxito**: `{ mensaje: "Registro eliminado", "No existe el registro" }`
  - **Error**: `{ error: "No se puede eliminar el registro" }`