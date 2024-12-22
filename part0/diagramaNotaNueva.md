```markdown
```mermaid
graph TD
    A[Usuario] -->|Escribe en el campo de texto| B[Campo de texto]
    B -->|Hace clic en el botón Save| C[Botón Save]
    C -->|Envía una solicitud POST| D[Servidor]
    D -->|Guarda la nueva nota en la base de datos| E[Base de datos]
    E -->|Devuelve respuesta de éxito| D
    D -->|Devuelve confirmación a la aplicación| C
    C -->|Actualiza la lista de notas| F[Lista de notas]
    F -->|Muestra la nueva nota| A