# 🚀 FiveM Vite Vue Template

Ein vollständig vorkonfiguriertes **FiveM NUI Template** mit moderner
Frontend-Architektur und klarer Trennung zwischen Game-Logik und UI.

Dieses Template ermöglicht dir, **skalierbare, performante und wartbare
FiveM UIs** mit aktuellen Web-Technologien zu entwickeln.

---

## 🧩 Stack im Detail

- ⚡ Vite 8\
- 🧩 Vue 3.5 (Composition API)\
- 🎨 TailwindCSS v4\
- ⭐ FontAwesome\
- 🧠 TypeScript\
- 🎮 FiveM NUI Bridge

---

## ✨ Features

- 🔥 Direkt einsatzbereit\
- 🔁 Lua ↔ Vue Kommunikation\
- 🧠 Composable NUI API\
- 🎯 Konfigurierbare Events\
- ⚡ Optimierter Build\
- 🎨 TailwindCSS integriert

---

## 📁 Struktur

client/ → FiveM Client Scripts\
server/ → Server Scripts\
shared/ → Zentrale Config\
development/ → Vue + Vite Projekt\
dist/ → Build Output\
fxmanifest.lua → Resource Definition

---

## ⚙️ Installation

```bash
cd development
npm install
```

---

## 🧪 Development

```bash
npm run dev
```

⚠️ Kein FiveM Kontext → keine NUI Events

---

## 📦 Build

```bash
npm run build
```

Output → dist/ (wird von FiveM geladen)

---

## 🎮 Nutzung

```bash
/commandName
```

```lua
Config = {
    CommandName = 'resourcename',
    OpenEvent = 'openUI',
    CloseEvent = 'closeUI'
}
```

---

## 🔁 NUI Kommunikation

### Lua → UI

```lua
SendNUIMessage({ action = 'eventName' })
SendNUIMessage({ action = 'eventName', payload = {} })
```

---

## 🧠 useNui Composable

```ts
const { send, listen } = useNui();

send("eventName");
listen("eventName", (data) => {});
```

---

## 🎨 Styling

```css
@import "tailwindcss";
```

---

## ⭐ FontAwesome

```ts
library.add(fas, far, fab);
```

---

## ⚠️ Hinweise

- Build erforderlich vor Nutzung\
- Dev Mode ≠ FiveM Runtime\
- Event Namen müssen identisch sein

---

## 📄 Lizenz

MIT
