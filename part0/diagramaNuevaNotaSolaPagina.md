```markdown
```mermaid

graph TD
    A[Usuario] -->|Escribe contenido en el campo de texto| B[Campo de texto]
    B -->|Hace clic en el botón Save| C[Botón Save]
    C -->|Envía solicitud POST con datos de la nueva nota| D[Servidor]
    D -->|Guarda la nueva nota en la base de datos| E[Base de datos]
    E -->|Devuelve respuesta de éxito| D
    D -->|Envía confirmación de la nueva nota a la aplicación| F[Aplicación SPA]
    F -->|Actualiza la lista de notas| G[Lista de notas]
    G -->|Muestra la nueva nota en la interfaz| A