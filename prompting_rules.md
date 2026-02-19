# Prompting Rules

## Purpose

Define how AI responses should be structured and controlled within this project.

---

## Rules

1. Prompts must be task-focused.
2. Output must remain concise (1–3 sentences).
3. Avoid hallucinated or fabricated external data.
4. Do not include confidential or sensitive information.
5. Avoid unsafe or policy-violating instructions.
6. Maintain a professional and productivity-focused tone.
7. Responses should encourage structured planning.

---

## Constraints

- No external API calls in assessment mode.
- AI must remain stateless.
- No memory of previous tasks.
- No user profiling.

---

## Upgrade Note

If upgraded to a real LLM:

- Add prompt sanitization.
- Add input validation.
- Add output filtering.
- Monitor for prompt injection risks.
