CREATE TABLE cliente (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  ci VARCHAR(20) UNIQUE,
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion TEXT,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sucursal (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  direccion TEXT NOT NULL,
  ciudad VARCHAR(100),
  telefono VARCHAR(20)
);

CREATE TABLE contacto_cliente (
  id SERIAL PRIMARY KEY,
  cliente_id INT REFERENCES cliente(id),
  tipo VARCHAR(50),
  nombre VARCHAR(100),
  telefono VARCHAR(20)
);

CREATE TABLE cliente_sucursal (
  cliente_id INT REFERENCES cliente(id),
  sucursal_id INT REFERENCES sucursal(id),
  PRIMARY KEY (cliente_id, sucursal_id)
);

CREATE TABLE encomienda (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE NOT NULL,
  remitente_id INT REFERENCES cliente(id),
  destinatario_id INT REFERENCES cliente(id),
  descripcion TEXT,
  peso DECIMAL(10,2),
  volumen DECIMAL(10,2),
  valor_declarado DECIMAL(10,2),
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tipo_paquete (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  descripcion TEXT
);

CREATE TABLE detalle_encomienda (
  id SERIAL PRIMARY KEY,
  encomienda_id INT REFERENCES encomienda(id),
  tipo_id INT REFERENCES tipo_paquete(id),
  cantidad INT,
  observaciones TEXT
);

CREATE TABLE seguro (
  id SERIAL PRIMARY KEY,
  encomienda_id INT UNIQUE REFERENCES encomienda(id),
  monto DECIMAL(10,2),
  descripcion TEXT
);

CREATE TABLE estado_envio (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50)
);

CREATE TABLE envio (
  id SERIAL PRIMARY KEY,
  encomienda_id INT UNIQUE REFERENCES encomienda(id),
  sucursal_origen_id INT REFERENCES sucursal(id),
  sucursal_destino_id INT REFERENCES sucursal(id),
  fecha_envio TIMESTAMP,
  fecha_estimada TIMESTAMP,
  costo DECIMAL(10,2),
  estado_id INT REFERENCES estado_envio(id)
);

CREATE TABLE seguimiento (
  id SERIAL PRIMARY KEY,
  envio_id INT REFERENCES envio(id),
  estado_id INT REFERENCES estado_envio(id),
  ubicacion TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  observaciones TEXT
);

CREATE TABLE entrega (
  id SERIAL PRIMARY KEY,
  envio_id INT UNIQUE REFERENCES envio(id),
  fecha_entrega TIMESTAMP,
  nombre_recibe VARCHAR(100),
  ci_recibe VARCHAR(20),
  firma TEXT
);

CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  rol VARCHAR(50),
  estado BOOLEAN DEFAULT TRUE
);

CREATE TABLE empleado (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  cargo VARCHAR(100),
  telefono VARCHAR(20),
  sucursal_id INT REFERENCES sucursal(id)
);

CREATE TABLE pago (
  id SERIAL PRIMARY KEY,
  envio_id INT REFERENCES envio(id),
  monto DECIMAL(10,2),
  metodo VARCHAR(50),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE factura (
  id SERIAL PRIMARY KEY,
  pago_id INT UNIQUE REFERENCES pago(id),
  numero_factura VARCHAR(50),
  nit VARCHAR(20),
  razon_social VARCHAR(150),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cliente (nombre, apellido, ci, telefono, email, direccion) VALUES
('Juan', 'Perez', '123456', '77711111', 'juan@gmail.com', 'La Paz'),
('Maria', 'Lopez', '654321', '77722222', 'maria@gmail.com', 'Cochabamba'),
('Carlos', 'Quispe', '987654', '77733333', 'carlos@gmail.com', 'Oruro');

INSERT INTO sucursal (nombre, direccion, ciudad, telefono) VALUES
('Sucursal Central', 'Av. Siempre Viva', 'La Paz', '2221111'),
('Sucursal Norte', 'Zona Norte', 'Cochabamba', '3332222'),
('Sucursal Sur', 'Zona Sur', 'Santa Cruz', '4443333');

INSERT INTO contacto_cliente (cliente_id, tipo, nombre, telefono) VALUES
(1, 'Emergencia', 'Ana Perez', '70000001'),
(2, 'Familiar', 'Luis Lopez', '70000002');

INSERT INTO cliente_sucursal (cliente_id, sucursal_id) VALUES
(1,1),(1,2),(2,2),(3,1),(3,3);

INSERT INTO tipo_paquete (nombre, descripcion) VALUES
('Caja', 'Caja de cartón'),('Sobre', 'Documentos'),('Paquete', 'Paquete general');

INSERT INTO encomienda (codigo, remitente_id, destinatario_id, descripcion, peso, volumen, valor_declarado) VALUES
('ENC001', 1, 2, 'Ropa', 5.5, 0.3, 200),
('ENC002', 2, 3, 'Documentos', 1.0, 0.1, 50),
('ENC003', 3, 1, 'Electrónicos', 3.0, 0.2, 500);

INSERT INTO detalle_encomienda (encomienda_id, tipo_id, cantidad, observaciones) VALUES
(1, 1, 2, 'Cajas medianas'),(2, 2, 5, 'Sobres sellados'),(3, 3, 1, 'Equipo delicado');

INSERT INTO seguro (encomienda_id, monto, descripcion) VALUES
(1, 20, 'Seguro básico'),(3, 50, 'Seguro completo');

INSERT INTO estado_envio (nombre) VALUES ('Registrado'),('En tránsito'),('Entregado');

INSERT INTO envio (encomienda_id, sucursal_origen_id, sucursal_destino_id, fecha_envio, fecha_estimada, costo, estado_id) VALUES
(1, 1, 2, NOW(), NOW() + INTERVAL '2 days', 50, 2),
(2, 2, 3, NOW(), NOW() + INTERVAL '3 days', 30, 1),
(3, 1, 3, NOW(), NOW() + INTERVAL '1 day', 70, 3);

INSERT INTO seguimiento (envio_id, estado_id, ubicacion, observaciones) VALUES
(1, 1, 'La Paz', 'Recepción'),
(1, 2, 'En camino', 'Transporte terrestre'),
(3, 3, 'Santa Cruz', 'Entregado correctamente');

INSERT INTO entrega (envio_id, fecha_entrega, nombre_recibe, ci_recibe, firma) VALUES
(3, NOW(), 'Juan Perez', '123456', 'FirmaDigital');

INSERT INTO usuario (nombre_usuario, password, rol) VALUES
('admin', '123', 'admin'),
('operador1', '123', 'operador');

INSERT INTO empleado (nombre, apellido, cargo, telefono, sucursal_id) VALUES
('Luis', 'Gomez', 'Cajero', '77788888', 1),
('Ana', 'Martinez', 'Operador', '77799999', 2);

INSERT INTO pago (envio_id, monto, metodo) VALUES
(1, 50, 'Efectivo'),
(2, 30, 'QR'),
(3, 70, 'Tarjeta');

INSERT INTO factura (pago_id, numero_factura, nit, razon_social) VALUES
(1, 'F001', '1234567', 'Juan Perez'),
(3, 'F002', '7654321', 'Carlos Quispe');
