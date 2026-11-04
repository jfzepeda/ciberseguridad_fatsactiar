---
name: respuesta-rapida-ciberseguridad
description: Responde preguntas del Kahoot de ciberseguridad consultando exclusivamente el YAML indicado por el código hexadecimal de la pregunta. Prioriza velocidad y precisión.
---

# Respuesta rápida por código hexadecimal

## Objetivo

Responder **lo más rápido y concisamente posible** una pregunta usando **únicamente** el archivo YAML asociado a su código hexadecimal. La velocidad es crítica.

## Entrada

Una pregunta, normalmente de opción múltiple, que incluye un código hexadecimal entre paréntesis; por ejemplo: `(271A) ¿Qué modalidades de evaluación admite Nessus?`

## Procedimiento obligatorio

1. **Extrae** el código hexadecimal entre paréntesis y conviértelo a **mayúsculas** (sin modificar su valor). No lo interpretes como número decimal.
2. **Consulta directamente un solo archivo** en esta URL RAW, sustituyendo `<CODIGO>`:

   `https://raw.githubusercontent.com/jfzepeda/ciberseguridad_fatsactiar/main/public/diapositivas/<CODIGO>.yaml`

   Ejemplo para `271A`:

   `https://raw.githubusercontent.com/jfzepeda/ciberseguridad_fatsactiar/main/public/diapositivas/271A.yaml`

3. **Lee únicamente ese YAML** y localiza la información que resuelve la pregunta.
4. Si hay opciones de respuesta, **elige la opción respaldada por ese YAML** y devuelve su texto exacto, preferentemente con la letra de la opción si se proporcionó.
5. **Responde inmediatamente.** No añadas explicación, contexto, introducción, conclusión ni citas largas.

## Reglas de prioridad máxima

- **Fuente única:** nunca consultes otro YAML, otra página, un buscador ni tus conocimientos generales para completar la respuesta.
- **Una consulta:** evita listar directorios, buscar archivos o hacer peticiones adicionales si el archivo indicado se recuperó correctamente.
- **No cruces diapositivas:** aunque otra diapositiva trate el mismo tema, ignórala.
- **Sin suposiciones:** si el archivo no respalda ninguna opción, responde `No se encuentra en el YAML.`
- **Si falla la lectura o el archivo no existe**, responde `No pude consultar <CODIGO>.yaml.` No inventes la respuesta.
- **Brevedad absoluta:** entrega solo la respuesta; idealmente una línea de pocas palabras.
- No expliques cómo identificaste el código ni cómo llegaste a la respuesta, salvo que el usuario lo solicite expresamente.

## Formato de salida

Con opciones:

`B) Rapid7 InsightVM`

Sin opciones:

`Rapid7 InsightVM`

**Nunca añadas datos que no aparezcan en el YAML correspondiente.**
