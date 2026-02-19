# Coding Standards

## General Principles

- Keep logic modular and separated by responsibility.
- Avoid hardcoded secrets.
- Use clear and descriptive variable names.
- Keep functions focused on a single responsibility.
- Follow RESTful API conventions.

---

## Backend Standards (Flask)

- Use proper HTTP status codes (200, 201, 400, 404).
- Validate request input before processing.
- Use SQLAlchemy ORM instead of raw SQL.
- Keep AI route separate from CRUD routes.
- Maintain stateless API behavior.

---

## Frontend Standards (React)

- Use functional components.
- Use React hooks (useState, useEffect).
- Handle async calls with try/catch.
- Keep API calls centralized.
- Maintain clear state separation.

---

## AI Integration Standards

- AI logic must remain modular.
- AI must not modify database directly.
- AI must not persist user data.
- AI output must follow defined constraints.
- AI must be replaceable without affecting frontend logic.

---

## Security Considerations

- Input validation on backend.
- No exposure of sensitive configuration.
- No hardcoded API keys.
- CORS configured for controlled access.
