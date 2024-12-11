CREATE DATABASE pw2024;
USE pw2024;

CREATE TABLE personal (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(200) DEFAULT NULL,
  direccion varchar(300) DEFAULT NULL,
  telefono varchar(15) DEFAULT NULL,
  estatus varchar(1) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE Clientes (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(255) NOT NULL,
  direccion varchar(255) DEFAULT NULL,
  telefono varchar(20) DEFAULT NULL,
  correo_electronico varchar(255) DEFAULT NULL,
  ciudad varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE Articulos (
  id int(11) NOT NULL AUTO_INCREMENT,
  descripcion varchar(400) DEFAULT NULL,
  precio decimal(10,2) DEFAULT NULL,
  cantidad_en_almacen int DEFAULT NULL,
  fecha_caducidad DATE DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE Ventas (
  id int(11) NOT NULL AUTO_INCREMENT,
  id_articulo int(11) NOT NULL,
  id_cliente int(11) NOT NULL,
  cantidad int NOT NULL,
  precio decimal(10,2) NOT NULL,
  IVA decimal(10,2) NOT NULL,
  subtotal decimal(10,2) NOT NULL,
  total decimal(10,2) NOT NULL,
  fecha_venta DATETIME DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_articulo) REFERENCES Articulos(id),
  FOREIGN KEY (id_cliente) REFERENCES Clientes(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE Compras (
  id int(11) NOT NULL AUTO_INCREMENT,
  id_articulo int(11) NOT NULL,
  cantidad int NOT NULL,
  precio decimal(10,2) NOT NULL,
  IVA decimal(10,2) NOT NULL,
  subtotal decimal(10,2) NOT NULL,
  total decimal(10,2) NOT NULL,
  fecha_compra DATETIME DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_articulo) REFERENCES Articulos(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE Registros (
  id int(11) NOT NULL AUTO_INCREMENT,
  id_personal int(11) NOT NULL,
  fecha DATE DEFAULT NULL,
  hora TIME DEFAULT NULL,
  movimiento enum('entrada','salida') DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_personal) REFERENCES personal(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
