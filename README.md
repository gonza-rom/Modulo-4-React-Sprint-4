# Rick and Morty Page

Permite realizar la búsqueda de personajes de Rick and Morty, indicando al menos 3 caracteres del nombre y la cantidad máxima de personajes que se desea obtener.
Los personajes se obtienen de la API pública:

https://rickandmortyapi.com

-Se utiliza Axios para la petición, aprovechando la respuesta en formato JSON y el manejo de errores mejorado.

-La función que realiza la petición utiliza el hook useCallback para evitar redefinirla en cada renderizado, siempre que no cambien las dependencias. En este caso, depende del nombre a buscar y la cantidad requerida.

-Mientras se carga el listado de personajes, se muestra un loader para indicar al usuario que se está ejecutando una tarea. Al finalizar, se muestra un toast indicando la cantidad de personajes encontrados o un mensaje de error si no se obtuvieron resultados. Para evitar la acumulación de toasts, se modifica el mismo toast lanzado al inicio de la búsqueda, manejando para ello el ID mediante el hook useRef, dado que dicho ID se maneja como un estado pero su actualización no requiere que dispare un nuevo renderizado.

-Los personajes obtenidos se muestran en una tarjeta (card), la cual cuenta con un icono para agregarlo o quitarlo de la lista de favoritos.

-Los favoritos se manejan con un array en el contexto y se persisten en el localStorage del navegador. La lista de favoritos se abre (y se puede cerrar) desde un botón en el header. Se despliega en un modal manejado por una variable de estado en el contexto.

-El mismo componente card es utilizado tanto en el resultado de la búsqueda como para mostrar los favoritos.



