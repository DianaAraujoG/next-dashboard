
# Dasboard del Clima

Este proyecto esta diseñado para mostrar el pronóstico del tiempo en función de datos con sultados del API OpenWeather. Incluye características como filtrado por horario y tipo de clima, el clima del estado y la calidad del aire. 

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:
- Node.js (versión 16 o superior recomendada)
- npm como gestor de paquetes

## 🚀 Instalación

1. Clona este repositorio en tu máquina local:
```bash
   git clone https://github.com/DianaAraujoG/next-dashboard.git
   cd next-dashboard
```
2. Instala las dependencias del proyecto:
```bash
   npm install
 ```
## 💻 Ejecución del Proyecto Localmente
Para correr el proyecto en un entorno de desarrollo, ejecuta:
```bash
    npm run dev
```

Esto iniciará un servidor de desarrollo en http://localhost:3000.

## 🧪 Correr Pruebas
El proyecto utiliza Jest para pruebas unitarias. Para ejecutar las pruebas, usa el siguiente comando:

```bash
    npm run test
```
## 🛠️ Decisiones Técnicas
Este proyecto se diseñó teniendo en cuenta la simplicidad, el rendimiento y la escalabilidad:

- **React y Next.js**: Renderizado del lado del servidor (SSR) para mejor rendimiento y SEO.
- **TypeScript**: Tipado estático para un código más seguro y mantenible.
- **Day.js**: Biblioteca ligera para formatear fechas.
- **Jest**: Pruebas unitarias confiables para evitar regresiones.
- **TailwindCSS**: Estilos rápidos, responsivos y consistentes.

## 📁 Estructura del Proyecto
- `src/app/ui/Cards/PredictionCard`: Componente principal del pronóstico.
- `src/app/constants`: Constantes reutilizables (ej. descripciones del clima).
- `src/test`: Pruebas unitarias del componente.