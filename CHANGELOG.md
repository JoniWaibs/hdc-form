# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Implementada actualización en tiempo real para la página de recursos
- Modificada la configuración de rutas API para soportar datos dinámicos
- Optimizada la configuración de Next.js para manejo de datos en tiempo real
- Resueltos problemas de build relacionados con el uso dinámico del servidor

### Technical
- Agregado `dynamic = "force-dynamic"` en la página de recursos
- Removida la caché y revalidación en endpoints de recursos
- Actualizada la configuración de fetch para mantener datos frescos
