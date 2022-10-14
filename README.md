# Instituto Politécnico Formosa.

## Servidor p/ 1er Parcial: Programación II
![Uso de Nodejs y Express para Servidor](https://camo.githubusercontent.com/0831579ca65c4ea04fef03561371669f02c7d55855df5c4356aa113e8e7708f7/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f70726163746963616c6465762f696d6167652f66657463682f732d2d4b6b536373746e4a2d2d2f635f696d616767615f7363616c652c665f6175746f2c666c5f70726f67726573736976652c685f3432302c715f6175746f2c775f313030302f68747470733a2f2f6465762d746f2d75706c6f6164732e73332e616d617a6f6e6177732e636f6d2f75706c6f6164732f61727469636c65732f7a6f6a757937396c6f33666e33716474376736702e706e67)
## Para ejecutar se debe tener instalado Node.js y npm.
*  ### Para Instalar las dependencias:

```js

npm  i

```

*  ### Para ejecutar el proyecto en modo Desarrollo, ejecutar el siguiente comando:

```js

npm  run  nodemon

```

*  ### Para el proyecto en modo Producción, ejecutar el siguiente comando:

```js

npm  start

```
[Link Github Para Descargar la App](https://github.com/alanBonnet/Parcial-1/releases)

# Usos
* ## Lo ideal para comenzar es registrarte como usuario: 
---
> ## HTTP: **POST** :http://localhost:3000/user 
>    * **=> requiere del siguiente body:**

```json  
	 {
		 "username":"AquiVaElNombreDeUsuario",
		 "password":"tuContraseña",
		 "email":"UnEmailVálido"
	 }
```
---
* ## El siguiente paso sería iniciar sesión para acceder a las funciones:
---
> 	* ## HTTP: **POST**: [http://localhost:3000/login](http://localhost:3000/login)  
>     * **=> requiere del siguiente body:**

```json  
	 {
		 "username":"AquiVaElNombreDeUsuario",
		 "password":"tuContraseña"
	 }
```

> 	* ##	O puede intentar ingresando estas cuentas de prueba: 	
>    * **Usuario con rol de Admin:**

```json  
	 {
		 "username":"Admin",
		 "password":"Admin321"
	 }
```

> 	* **Usuarios de prueba sin Admin:**
```json  
	 {
		 "username":"UsuarioPrueba",
		 "password":"UsuarioPruebaMod"
	 }
```
```json  
	 {
		 "username":"UsuarioPrueba1",
		 "password":"UsuarioPrueba2"
	 }
```
---
* # Una vez reciba el Token, cópielo y uselo como header Authorization en su cliente y así acceder a las funciones:
---
> ## HTTP: **PUT**: [http://localhost:3000/user](http://localhost:3000/user) 
>   * **=> requiere del siguiente body:**
>   * Solo se puede cambiar el password y el email al mismo tiempo;

```json  
	 {
		 "password":"tuContraseña",
		 "email":"UnEmailVálido"
	 }
```
---
>  ## HTTP: **GET**: [http://localhost:3000/user](http://localhost:3000/user) 		
>    * Sirve para ver la información de tu cuenta. 	
---
>  ## HTTP: **DELETE**: [http://localhost:3000/user](http://localhost:3000/user) 	
>    * En caso de que quieras eliminar la cuenta.
---
* # Funciones de Tareas con el Token:
---
>  ## HTTP: **GET** *(SOLO ROL DE ADMIN)*: [http://localhost:3000/task](http://localhost:3000/task)  
>   *  Mostraría todas las tareas existentes en la Base de Datos:
---
> ## HTTP: **GET** [http://localhost:3000/task/:idTarea](http://localhost:3000/task/:idTarea)
>   *  Para tener en cuenta; 
> Para obtener el :idTarea preferiblemente que haga un GET de las tareas
> ( /task/user) y copie el "_id" de la tarea que desea modificar: 	 
>   * Ejemplo (usando la cuenta del **"UsuarioPrueba1"**): 	 
>   * Y entrando a esta tarea de ejemplo:
>     * #### HTTP: **GET**:  [http://localhost:3000/task/6348ff8873c8a926fd3dc92c](http://localhost:3000/task/6348ff8873c8a926fd3dc92c)
>     *  Nos devolvería lo siguiente:
```json
	{
		"_id":  "6348ff8873c8a926fd3dc92c",

		"title":  "Tarea 6",
		"description":  "Decripcion Tarea 10",
		"fecha":  "2022-10-07T13:34:18.000Z",
		"estado":  2,
		"isActive":  true,
		"idUser":  {
			"_id":  "6344f187de497d3ac62adf76",
			"username":  "UsuarioPrueba1",
			"email":  "UsuarioPrueba@gmail.com"
		},
		"createdAt":  "2022-10-14T06:19:52.394Z",
		"updatedAt":  "2022-10-14T06:19:52.394Z"
	}
```
---
>  ## HTTP: **GET**: [http://localhost:3000/task/user](http://localhost:3000/task/user) 	
>    *  **Muestra todas las tareas del usuario que inició sesión y usa su token para esta petición**. 	
---
>  ## HTTP:  **POST**: [http://localhost:3000/task](http://localhost:3000/task)  
>    * **=> requiere el siguiente Body:** 		
>        * El formato de Fecha es ( *aaaa-mm-dd* **T** *hh:mm:ss***Z** ) por defecto toma el tiempo que es creada la tarea. 		
>        * El estado por defecto es 1:

		 
| Estado |número  |
|--|--|
| Pendiente | 1 |
|En Proceso|2|
| Completado | 3 |
	
* ### **Ejemplo:**
```json  
	 {
		"title":"Tarea 6",
		"description":"Decripcion Tarea 10",
		"fecha":"2022-10-07T13:34:18Z",
		"estado":2
	 }
```
	
---
>  ## HTTP: **PUT**: [http://localhost:3000/task/:idTarea](http://localhost:3000/task/) 
> **=> requiere el siguiente Body:** 	
>   * Para tener en cuenta; 
> Para obtener el :idTarea preferiblemente que haga un GET de las tareas
> ( /task/user) y copie el "_id" de la tarea que desea modificar: 	 
>   * Ejemplo (usando la cuenta del **"UsuarioPrueba1"**): 	 
>   * Y entrando a esta tarea de ejemplo:

```json
	{
		"_id":  "6348ff8873c8a926fd3dc92c",

		"title":  "Tarea 6",
		"description":  "Decripcion Tarea 10",
		"fecha":  "2022-10-07T13:34:18.000Z",
		"estado":  2,
		"isActive":  true,
		"idUser":  {
			"_id":  "6344f187de497d3ac62adf76",
			"username":  "UsuarioPrueba1",
			"email":  "UsuarioPrueba@gmail.com"
		},
		"createdAt":  "2022-10-14T06:19:52.394Z",
		"updatedAt":  "2022-10-14T06:19:52.394Z"
	}
```

> * ### HTTP: **PUT** :[http://localhost:3000/task/6348ff8873c8a926fd3dc92c](http://localhost:3000/task/6348ff8873c8a926fd3dc92c) 
> **=> requiere el siguiente Body:**

```json  
	 {
		"title":"Tarea 6",
		"description":"Descripción Tarea 11",
		"fecha":"2022-10-07T13:34:18Z",
		"estado":3
	 }
```
---
> ## HTTP: **PUT**: [http://localhost:3000/task/:idTarea/complete](http://localhost:3000/task/:idTarea/complete) 
> #### Para completar una tarea
>   * #### :idTarea hace referencia al "_id" de la tarea a completar
>   * Por ejemplo:
> * #### HTTP: **PUT**: [http://localhost:3000/task/6348ff8873c8a926fd3dc92c/complete](http://localhost:3000/task/6348ff8873c8a926fd3dc92c/complete) 
---
> ## HTTP: **DELETE**: [http://localhost:3000/task/:idTarea](http://localhost:3000/task/:idTarea)
> #### Para eliminar una tarea
>   * #### :idTarea hace referencia al "_id" de la tarea a completar
>   * Por ejemplo:
> * ### HTTP: **DELETE**: [http://localhost:3000/task/6348ff8873c8a926fd3dc92c](http://localhost:3000/task/6348ff8873c8a926fd3dc92c)
---
