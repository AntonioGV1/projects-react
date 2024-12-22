```markdown
```mermaid

graph TD
    A[Usuario] -->|Escribe URL https://studies.cs.helsinki.fi/exampleapp/spa| B[Navegador]
    B -->|Envía una solicitud GET| C[Servidor]
    C -->|Devuelve HTML, CSS y JS| D[Aplicación SPA]
    D -->|Carga recursos necesarios| E[Interfaz de usuario]
    E -->|Muestra la lista de notas| F[Notas]
    F -->|Usuario interactúa con la interfaz| A