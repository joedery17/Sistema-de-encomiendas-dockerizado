MODULO 2 ARQUITECTURA DEL BACK END Y BASE DE DATOS
# Grupo 3
INTEGRANTES
- Antonio Benito José Manuel
- Carpio Vasquez Joel Dery
- Choquecallata Villca Federico
- Valverde Huarachi Rodrigo Cristian

# Videos del trabajo realizado en el trancurso del desarrollo del proyecto del modulo 2
- https://youtu.be/dso8o7BgzKg
- https://youtube.com/shorts/xsyGF7gn7BE?feature=share

# Sistema de Gestión de Encomiendas - Proyecto actualizado

Versión mejorada del proyecto `trabajotablas`, ampliada con las tablas faltantes del modelo relacional del proyecto final.

## Incluye

- NestJS + TypeORM + PostgreSQL
- Swagger en `/api/docs`
- CRUD básico para todas las tablas del modelo
- Script SQL completo en `database.sql`
- Configuración por variables de entorno

#Base de datos en DBeaver
<img width="1325" height="674" alt="base de dato 1" src="https://github.com/user-attachments/assets/9b5ac881-bb22-438e-ab84-dd84dcf3366b" />
<img width="1250" height="644" alt="base de datos 2" src="https://github.com/user-attachments/assets/7326701c-af19-404b-bec4-fbbfd4ec05b3" />


## Tablas incluidas

- cliente
- sucursal
- contacto_cliente
- cliente_sucursal
- tipo_paquete
- encomienda
- detalle_encomienda
- seguro
- estado_envio
- envio
- seguimiento
- entrega
- usuario
- empleado
- pago
- factura

## Instalación

1. Copiar `.env.example` a `.env`
2. Crear la base de datos en PostgreSQL
3. Ejecutar `database.sql`
4. Instalar dependencias:

```bash
npm install
```

5. Ejecutar el proyecto:

```bash
npm run start:dev
```

## Variables de entorno

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=sisenc_test
PORT=3000
```

## Swagger

Una vez iniciado el servidor, abrir:

```text
http://localhost:3000/api/docs
```
<img width="1600" height="758" alt="WhatsApp Image 2026-04-21 at 02 19 56" src="https://github.com/user-attachments/assets/b64a85b7-ce6e-448f-a27a-68e79d9e09cb" />
<img width="1600" height="761" alt="WhatsApp Image 2026-04-21 at 02 22 03" src="https://github.com/user-attachments/assets/d3419263-7dd1-4e89-882a-acaded9a32c1" />
<img width="1600" height="753" alt="WhatsApp Image 2026-04-21 at 02 29 42" src="https://github.com/user-attachments/assets/5d05adfa-6f3b-421b-a6f2-635c46b8b6e7" />

## Nota

Esta versión deja `synchronize: false` para respetar la estructura creada desde el script SQL.
