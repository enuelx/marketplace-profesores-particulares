# Marketplace de Clases Particulares :rocket:

- [Integrantes](#integrantes)
- [Introducción](#introducción)  
- [Arquitectura](#arquitectura)
- [Requisitos](#requisitos) 
- [Backend & Frontend](#backend-frontend) 
    * [Descargar la aplicación e instalar dependencias](#descargar-la-aplicación-e-instalar-dependencias) 
    * [Ejecutar la app](#ejecutar-la-app) 
        * [Por Terminal](#por-terminal) 
        * [Por Docker Compose](#por-docker-compose) 
            * [Start Containers](#start-containers) 
            * [Stop Containers](#stop-containers) 
- [Healthcheck](#healthcheck) 
    * [Backend](#backend) 
    * [Frontend](#frontend) 
- [Uso del backend](#uso-del-backend) 

## Integrantes 
- Gordo, Juan Martin
- Haedo, Joaquin Hector
- Maidana, Emmanuel Carlos Leonel

## Introducción

Esta aplicación de un marketplace de clases particulares, siendo un proyecto integrador de la materia Aplicaciones Interactivas de UADE - 2022.

## Arquitectura

![img](https://i.postimg.cc/RFdVnmC4/diagrama-tpo-apis.png)

## Requisitos

- [NodeJS](https://nodejs.org/en/download/)
- Poseer una <b>MONGODB_URI</b> válida para comunicarse con la base de datos
- <b>Opcional:</b> [Docker Compose](https://docs.docker.com/compose/install/)

## Backend & Frontend

### Descargar la aplicación e instalar dependencias

```bash
git clone git@github.com:enuelx/marketplace-profesores-particulares.git marketplace
cd marketplace && cd api
npm install
cd ../frontend
npm install
cd ..
```

### Ejecutar la app

```bash
cd api
cp .env.example .env
cd ..
```
<b>Agregar los datos que faltan dentro del .env</b>

#### Por Terminal

```bash
cd api
npm start &
cd .. && cd frontend
npm start &
```

#### Por Docker Compose

##### Start Containers
```bash
docker-compose up --build -d
```
##### Stop Containers

```bash
docker-compose down
```

## Healthcheck

### Backend
![img](https://i.postimg.cc/N0QSHDq1/Captura-de-pantalla-2022-11-25-a-la-s-16-22-35.png)
### Frontend
![img](https://i.postimg.cc/zGC4vMMz/Captura-de-pantalla-2022-11-25-a-la-s-16-29-22.png)

## Uso del backend
Ahora tanto el backend como el frontend están listos para usar.

Se pueden probar los endpoints a través de [Swagger](https://swagger.io/). La misma se encuentra levantada en la ruta "/api-docs", por ejemplo, si el backend se encuentra en el puerto 3001, la ruta es: http://localhost:3001/api-docs


### Listado de endpoints

TODO