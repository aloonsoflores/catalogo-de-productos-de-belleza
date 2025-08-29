# Beauty Catalog - Catálogo de Productos de Belleza

1. Coloca productos_belleza.xlsx en la carpeta scripts/.
2. Compila el TS a JS CommonJS:

```bash
npx tsc -p tsconfig.scripts.json --outDir dist-scripts
```

3. Renombra a .cjs:

```bash
mv dist-scripts/convertirExcelAJson.js dist-scripts/convertirExcelAJson.cjs
```

4. Ejecuta:

```bash
node dist-scripts/convertirExcelAJson.cjs
```

✅ Esto generará src/data/productos.json correctamente, sin errores de ruta ni ESM.

## Descripción
Aplicación web moderna para gestionar un catálogo de productos de belleza con funcionalidades de carga desde Excel, filtrado avanzado y búsqueda en tiempo real.

## Características Principales

### ✨ Funcionalidades
- **Carga de archivos Excel/CSV**: Importa productos directamente desde archivos Excel (.xlsx) o CSV
- **Tabla responsive**: Visualización clara y organizada de todos los productos
- **Filtros avanzados**: Filtra por categoría, marca y búsqueda de texto
- **Búsqueda en tiempo real**: Encuentra productos específicos instantáneamente
- **Descarga de plantilla**: Genera un archivo Excel de ejemplo con el formato correcto

### 📊 Estructura de Datos
Los productos se muestran con las siguientes columnas:
- **Categoría**: CREMAS, MASCARILLA, OTROS
- **Marca**: Marca del producto
- **Producto**: Nombre del producto
- **Características**: Descripción y propiedades
- **Volumen**: Cantidad/tamaño del producto
- **Precio**: Precio en euros

### 🎨 Diseño
- Diseño responsive compatible con móviles y escritorio
- Tema moderno con gradientes rosa/violeta apropiado para productos de belleza
- Animaciones suaves y micro-interacciones
- Interfaz intuitiva y profesional

## Instalación y Uso

### Requisitos Previos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [repository-url]

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Uso de la Aplicación

#### 1. Cargar Productos desde Excel
1. Haz clic en "Seleccionar Archivo" en la sección de carga
2. Selecciona un archivo Excel (.xlsx) o CSV con tus productos
3. Los productos se cargarán automáticamente en la tabla

#### 2. Formato del Archivo Excel
El archivo debe tener las siguientes columnas en este orden:
```
Categoría | Marca | Producto | Características | Volumen | Precio
```

Ejemplo:
```
CREMAS | 3INA | THE SORBET FACE CREAM | Crema Hidratación | 50ml | 20€
CREMAS | Biotherm | AQUASOURCE HYDRA BARRIER CREAM |  | 50ml | 32€
```

#### 3. Descargar Plantilla de Ejemplo
- Haz clic en "Descargar Ejemplo" para obtener un archivo Excel con el formato correcto
- Usa esta plantilla como base para tus productos

#### 4. Filtrar y Buscar
- **Búsqueda**: Escribe en el campo de búsqueda para encontrar productos por nombre, marca o características
- **Filtro por Categoría**: Selecciona una categoría específica del dropdown
- **Filtro por Marca**: Selecciona una marca específica del dropdown
- **Combinar filtros**: Todos los filtros se pueden usar simultáneamente

## Tecnologías Utilizadas

### Frontend
- **React 18**: Biblioteca de JavaScript para interfaces de usuario
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework de CSS para diseño rápido
- **Vite**: Herramienta de construcción y desarrollo
- **Lucide React**: Librería de iconos moderna

### Librerías Específicas
- **XLSX (SheetJS)**: Para leer archivos Excel y CSV
- **React Hot Toast**: Para notificaciones elegantes

## Estructura del Proyecto

```
src/
├── components/          # Componentes React reutilizables
│   ├── FileUploader.tsx     # Componente de carga de archivos
│   ├── FilterControls.tsx   # Controles de filtrado
│   ├── InfoBanner.tsx       # Banner de información importante
│   └── ProductTable.tsx     # Tabla de productos
├── hooks/              # Hooks personalizados de React
│   └── useProductFilters.ts # Hook para manejo de filtros
├── types/              # Definiciones de TypeScript
│   └── Product.ts          # Tipos de datos de productos
├── utils/              # Utilidades y funciones auxiliares
│   └── excelReader.ts      # Funciones para leer archivos Excel
├── data/               # Datos estáticos
│   └── sampleProducts.ts   # Productos de ejemplo
└── App.tsx             # Componente principal
```

## Información Importante Mostrada

### Avisos Obligatorios
- **Productos TESTERS**: "Todos los productos son TESTERS, salvo indicación contraria en las características"
- **Pedido mínimo**: "Pedido mínimo: 2 productos e importe superior a 20€"
- **Contacto**: "Para realizar pedidos, contactar al teléfono: +34 XXX XXX XXX"

## Personalización

### Modificar Información de Contacto
Edita el archivo `src/components/InfoBanner.tsx` para cambiar el número de teléfono.

### Añadir Nuevas Categorías
Las categorías se generan automáticamente desde los datos cargados, pero puedes modificar los productos de ejemplo en `src/data/sampleProducts.ts`.

### Cambiar Colores del Tema
Modifica las clases de Tailwind CSS en los componentes para cambiar el esquema de colores.

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de la construcción
npm run preview

# Linting
npm run lint
```

## Resolución de Problemas

### El archivo Excel no se carga
- Verifica que el archivo tenga la extensión .xlsx o .csv
- Asegúrate de que las columnas estén en el orden correcto
- Revisa que no haya filas completamente vacías

### Los filtros no funcionan
- Recarga la página y vuelve a cargar el archivo
- Verifica que los datos del Excel estén en el formato correcto

### Problemas de rendimiento con muchos productos
- La aplicación está optimizada para manejar miles de productos
- Los filtros usan memorización para mejorar el rendimiento

## Contribuciones
Para contribuir al proyecto, por favor:
1. Haz fork del repositorio
2. Crea una rama para tu feature
3. Realiza tus cambios
4. Ejecuta las pruebas y linting
5. Envía un pull request

## Licencia
Este proyecto está bajo la licencia MIT. Ver archivo LICENSE para más detalles.