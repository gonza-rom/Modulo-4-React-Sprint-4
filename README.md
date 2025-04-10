🌌 Rick and Morty Page

🧪 ¡Explorá el multiverso de Rick and Morty!
Esta aplicación te permite buscar personajes ingresando al menos 3 caracteres del nombre y la cantidad máxima de resultados que querés obtener. Los datos se obtienen desde la API pública:

🔗 https://rickandmortyapi.com

⚙️ Tecnologías y funcionalidades destacadas
🔍 Búsqueda inteligente

. La función que realiza la consulta está optimizada con useCallback para evitar renderizados innecesarios.
. Los personajes se cargan progresivamente según la cantidad solicitada.

📦 Axios + JSON

. Se utiliza Axios para la petición HTTP y el manejo de respuestas en formato JSON.
. Captura errores y responde con mensajes personalizados.

⏳ Experiencia de usuario fluida

. Se muestra un loader animado mientras se realiza la búsqueda.
. Un toast dinámico informa el estado del proceso: cargando, éxito o error.
. Se reutiliza el mismo toast mediante useRef, evitando acumulación innecesaria.

🃏 Visualización con tarjetas (Cards)

. Cada personaje aparece en una card interactiva, con botón para agregar o quitar de favoritos ⭐.

❤️ Gestión de favoritos

. Los favoritos se almacenan en un contexto global y se persisten en localStorage.
. Pueden visualizarse en un modal desde el botón del header.

♻️ Componente reutilizable

. El mismo componente card se usa tanto para los resultados de búsqueda como para los favoritos.

🚀 Sitio desplegado
🔗 https://rickandmortygon.netlify.app

👨‍🎓 Alumno
Gonzalo Romero
