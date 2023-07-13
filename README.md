# Realm - Grupo 2

## Implementacion de Bases de Datos NoSQL

### Levantar APP

* Requisitos previos: Node (v16 o mas), npm (v8 o mas).
  
Ingresar a ambos proyectos, y ejecutar el siguiente comando:
```shell
npm run dev
```
Esto correra localmente tanto la API Rest, como la aplicacion que escucha por el evento de creacion sobre el Realm "Task".

### Modo de uso
La API Rest corre en el puerto 3000 del host local (localhost:3000)
Posee varios endpoints disponibles para relacionarse, a continuacion se deja un ejemplo de cada uno

#### Get all tasks
```http
GET http://localhost:3000/tasks
```
```json
{
    "tasks": [
        {
            "_id": "64acc8c768e0ead5d3f98fba",
            "description": "Task 1",
            "dueDate": "2023-07-11T03:13:11.515Z",
            "asignee": "John Doe",
            "summary": "Summary 1",
            "isComplete": false,
            "status": "In progress",
            "priority": 3
        },
        {
            "_id": "64acd0ec2ac51d40b1d16e69",
            "description": "Task New",
            "dueDate": "2023-07-11T03:33:43.568Z",
            "asignee": "Brian Monroy",
            "summary": "A new task",
            "isComplete": false,
            "status": "Backlog",
            "priority": 5
        },
        {
            "_id": "64acd2f76a10e6855b90c48f",
            "description": "Task New 2",
            "dueDate": "2023-07-11T03:33:43.568Z",
            "asignee": "Facundo Oviedo",
            "summary": "A new task",
            "isComplete": false,
            "status": "Backlog",
            "priority": 5
        }
    ]
}
```

#### Get tasks with RQL
```http
GET http://localhost:3000/tasks/q?filter="priority >= 2"
```
```json
{
    "tasks": [
        {
            "_id": "64acd2f76a10e6855b90c48f",
            "description": "Task New 2",
            "dueDate": "2023-07-11T03:33:43.568Z",
            "asignee": "Facundo Oviedo",
            "summary": "A new task",
            "isComplete": false,
            "status": "Backlog",
            "priority": 5
        }
        {
            "_id": "64ae127f12353c1b7387e479",
            "description": "Create new endpoint",
            "dueDate": "2023-07-11T03:33:43.568Z",
            "asignee": "Brian Monroy",
            "summary": "New favorite endpoint",
            "isComplete": false,
            "status": "Backlog",
            "priority": 3
        }
    ]
}
```
Otras posibles consultas: En general todas las que sean de 1 solo predicados simples (1 property, 1 operador, 1 value).
```
http://localhost:3000/tasks/q?filter="description = Task 1"
```
```
http://localhost:3000/tasks/q?filter="status = Done"
```

#### Create user
```http
POST http://localhost:3000/users
body:
{
    "name": "Brian Monroy",
    "birthDate": "1998-10-12T03:00:00.000Z",
    "role": "Admin"
}
```

#### Create a task for an user
```http
POST http://localhost:3000/users/:userId/tasks
Example: 
POST http://localhost:3000/users/64ae0e5ea9b68d94b43a9026/tasks
body:
{
        "description": "Demo para el TP",
        "dueDate": "2023-07-11T03:33:43.568Z",
        "asignee": "Brian Monroy",
        "summary": "NoSQL TP",
        "isComplete": false,
        "status": "Backlog",
        "priority": 2
}
```
#### Get all users with their tasks
```http
GET http://localhost:3000/users
```
```json
{
    "users": [
        {
            "_id": "64ae0e5ea9b68d94b43a9026",
            "name": "Brian Monroy",
            "birthDate": "1998-10-12T03:00:00.000Z",
            "role": "Admin",
            "tasks": [
                {
                    "_id": "64ae127212353c1b7387e478",
                    "description": "Create new endpoint",
                    "dueDate": "2023-07-11T03:33:43.568Z",
                    "asignee": "Brian Monroy",
                    "summary": "New favorite endpoint",
                    "isComplete": false,
                    "status": "Backlog",
                    "priority": 2
                },
                {
                    "_id": "64af23dde6f5f73185ec9ff3",
                    "description": "Create Realm Demo",
                    "dueDate": "2023-07-11T03:33:43.568Z",
                    "asignee": "Brian Monroy",
                    "summary": "NoSQL TP",
                    "isComplete": false,
                    "status": "Backlog",
                    "priority": 2
                }
            ]
        }
    ]
}
```

La segunda aplicacion, escucha por creaciones en el realm Task, por lo cual cada vez que se genere una nueva tarea a un usuario, esa aplicacion detectara los cambios sincronizando con mongodbAtlas.
