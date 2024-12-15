## instrucciones de instalación

1. Clonar el repositorio
```bash	
git clone https://github.com/cavargasl/wishlistifytest
```
2. Acceder a la carpeta del proyecto
```bash
cd wishlistifytest
```
3. Ejecutar el comando `npm install`
4. Ejecutar el comando `npm run dev`

La aplicación debería estar disponible en http://localhost:5173/.

# Documentación de decisiones de arquitectura y optimizaciones implementadas
### 1. Arquitectura Hexagonal
**Decisión:**  
Se eligió implementar una arquitectura hexagonal para garantizar una separación clara entre las capas de dominio, aplicación, infraestructura y compartidos (shared). Esto permite mayor mantenibilidad, escalabilidad y testeabilidad del código.

**Implementación:**  
- **Core:** Contiene la lógica de negocio y entidades (como productos y lista de deseos).
- **Domain:** Define los modelos y reglas del dominio.
- **Application:** Contiene los servicios que construyen las reglas de negocio.
- **Infrastructure:** Define los adaptadores y repositorios necesarios para interactuar con APIs externas o persistencia local.
- **Shared:** Proporciona configuraciones comunes reutilizables por todas las entidades.

### 2. Uso de TanStack Query para el Manejo de Datos Asincrónicos
**Decisión:**  
Se optó por TanStack Query en lugar de Redux o Zustand para el manejo de datos asincrónicos, ya que ofrece una solución más eficiente y simplificada para manejar el fetching, cacheo y sincronización de datos.

**Razones:**  
- Caché automático para evitar llamadas redundantes a la API.
- Lógica integrada para scroll infinito usando `useInfiniteQuery`.
- Revalidación automática para mantener los datos actualizados.
- Reducción de código boilerplate comparado con Redux.

**Optimización Implementada:**  
- Scroll infinito utilizando `useInfiniteQuery`, que incluye lógica para paginación y cacheo automático.
- Localización de estado, manteniendo un estado independiente para cada entidad.

### 3. Persistencia de Datos Favoritos en LocalStorage
**Decisión:**  
Se decidió persistir los datos de productos favoritos en LocalStorage para que los favoritos sean accesibles incluso después de cerrar o reiniciar la aplicación.

**Implementación:**  
- Se creó una nueva entidad llamada `whitelist` en el directorio `core`.
- Sincronización con `React Query` para mantener el estado local y persistente.

**Optimización Implementada:**  
- Uso de hooks de React Query para sincronizar automáticamente el estado de favoritos con LocalStorage.

### 4. Configuración y Uso de Axios
**Decisión:**  
Se centralizó la configuración de Axios en un único archivo `axiosConfig.ts` para reutilizar esta configuración en todos los repositorios.

**Implementación:**  
- Configuración de `baseURL`, headers comunes y manejo global de errores.
- Uso de interceptores para agregar lógica previa a las solicitudes y respuestas.

**Optimización Implementada:**  
- Eliminación de duplicación de configuraciones.
- Simplificación de la interacción con la API pública.

### 5. Gestión de Estado de Scroll Infinito
**Decisión:**  
El manejo del estado y la lógica de scroll infinito se implementó utilizando TanStack Query, evitando la necesidad de crear un estado global o manualmente.

**Optimización Implementada:**  
- Uso de `useInfiniteQuery` para paginación y cacheo automático.

### 6. Patrones de Diseño y Principios SOLID
**Decisión:**  
Se siguieron los principios SOLID y patrones de diseño para mantener un código limpio y escalable.

**Implementación:**  
- Principio de Responsabilidad Única (SRP) y Principio de Inversión de Dependencias (DIP).
- Repositorios e infraestructura dependen de abstracciones, no de implementaciones concretas.

### 7. Configuración de Herramientas de Desarrollo
**Decisión:**  
Se configuraron herramientas como Prettier y ESLint para mantener el código limpio y consistente.

**Implementación:**  
- Prettier para el formateo automático del código.
- ESLint como linter para asegurar la calidad del código.
- Lint-staged y Husky para validación antes de cada commit.