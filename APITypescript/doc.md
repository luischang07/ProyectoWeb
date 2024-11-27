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