# 🚀 FiveM Vite Vue Template

Ein vollständig vorkonfiguriertes **FiveM NUI Template** mit moderner
Frontend-Architektur:

- ⚡ Vite 8\
- 🧩 Vue 3.5 + Composition API\
- 🎨 TailwindCSS v4\
- ⭐ FontAwesome\
- 🧠 TypeScript + Alias System\
- 🎮 FiveM NUI Integration

---

## ✨ Features

- 🔥 Direkt einsatzbereit
- 🔁 Lua ↔ Vue Kommunikation
- 🧠 Composable NUI API
- 🎯 Konfigurierbare Events
- ⚡ Optimierter Build (Vite + ESBuild)
- 🎨 TailwindCSS integriert

---

## 📁 Struktur

    client/
    server/
    shared/
    development/
    dist/
    fxmanifest.lua

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

---

## 📦 Build

```bash
npm run build
```

---

## 🎮 Nutzung

```bash
/commandName
```

Config (shared):

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
SendNUIMessage({ action = 'eventName', playload = {} })
```

---

## 🧠 Composable (useNui)

```ts
const { send, listen } = useNui();

send("eventName");
listen("eventName", cb);
```

---

## 🎨 Styling

```css
@import "tailwindcss";
```

---

## ⚠️ Hinweise

- Build erforderlich vor Nutzung
- Dev Mode ≠ FiveM Runtime
- Event Namen müssen identisch sein

---

## 📄 Lizenz

MIT
