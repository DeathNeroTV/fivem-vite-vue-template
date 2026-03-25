# 🚀 FiveM Vite Vue Template

Ein vollständig vorkonfiguriertes **FiveM NUI Template** mit moderner
Frontend-Architektur und klarer Trennung zwischen Game-Logik und UI.

Dieses Template ermöglicht dir, **skalierbare, performante und wartbare
FiveM UIs** mit aktuellen Web-Technologien zu entwickeln.

---

## 🧩 Stack im Detail

| Kategorie     | Technologie               |
| ------------- | ------------------------- |
| ⚡ Build Tool | Vite 8                    |
| 🧩 Framework  | Vue 3.5 (Composition API) |
| 🎨 Styling    | TailwindCSS v4            |
| 🧠 Sprache    | TypeScript                |
| ⭐ Icons      | FontAwesome               |
| 🎮 Bridge     | FiveM NUI                 |
| 📊 Charts     | Chart.js                  |
| 🎞 Animation  | GSAP                      |

---

## ✨ Features

- 🔥 Direkt einsatzbereit (Zero Setup)
- 🔁 Saubere Lua ↔ Vue Kommunikation
- 🧠 Composable NUI API (`useNui`)
- 🎯 Zentral konfigurierbare Events
- ⚡ Optimierter Produktions-Build
- 🎨 Utility-first Styling mit Tailwind
- 📊 Integrierte Chart.js Unterstützung
- 🎞 Performante Animationen mit GSAP

---

## 📁 Projektstruktur

client/ → FiveM Client Scripts
server/ → Server Scripts
shared/ → Zentrale Config
development/ → Vue + Vite Projekt
dist/ → Build Output (NUI)
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

⚠️ **Wichtig:**
Im Dev Mode existiert **kein FiveM Kontext**, daher funktionieren:

- ❌ `SendNUIMessage`
- ❌ `RegisterNUICallback`

👉 Für UI-Testing solltest du Mock-Daten verwenden.

---

## 📦 Build

```bash
npm run build
```

➡ Output wird automatisch in `dist/` generiert
➡ Dieser Ordner wird von FiveM geladen

---

## 🎮 Nutzung im Spiel

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

### 📤 Lua → UI

```lua
SendNUIMessage({
    action = 'eventName',
    payload = {}
})
```

---

### 📥 UI → Lua (Callback)

```ts
fetch(`https://${GetParentResourceName()}/eventName`, {
	method: "POST",
	body: JSON.stringify(data),
});
```

---

## 🧠 useNui Composable

```ts
const { send, listen } = useNui();

// Event senden
send("eventName", { foo: "bar" });

// Event empfangen
listen("eventName", (data) => {
	console.log(data);
});
```

---

## 📊 Chart.js Integration

Chart.js ist bereits vorbereitet und kann direkt verwendet werden.

### Installation (optional)

```bash
npm install chart.js
```

---

### Beispiel (Vue Component)

```ts
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale);
```

```vue
<template>
	<canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
	import { onMounted, ref } from "vue";
	import { Chart } from "chart.js";

	const canvas = ref<HTMLCanvasElement | null>(null);

	onMounted(() => {
		if (!canvas.value) return;

		new Chart(canvas.value, {
			type: "bar",
			data: {
				labels: ["A", "B", "C"],
				datasets: [
					{
						label: "Example",
						data: [10, 20, 30],
					},
				],
			},
		});
	});
</script>
```

---

## 🎞 GSAP Animationen

GSAP ermöglicht dir **performante UI Animationen**, ideal für NUI.

### Installation

```bash
npm install gsap
```

---

### Beispiel

```ts
import { gsap } from "gsap";

gsap.to(".box", {
	x: 200,
	duration: 0.5,
	ease: "power2.out",
});
```

---

### Vue Integration (Best Practice)

```ts
import { onMounted } from "vue";
import { gsap } from "gsap";

onMounted(() => {
	gsap.from(".card", {
		opacity: 0,
		y: 20,
		duration: 0.4,
	});
});
```

---

## 🎨 Styling (TailwindCSS)

```css
@import "tailwindcss";
```

---

## ⭐ FontAwesome Setup

```ts
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas, far, fab);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
```

---

## ⚠️ Wichtige Hinweise

- ⚠️ Build ist Pflicht vor Nutzung in FiveM
- ⚠️ Dev Mode ≠ FiveM Runtime
- ⚠️ Event-Namen müssen exakt übereinstimmen
- ⚠️ UI ohne Fokus → keine Interaktion

---

## 🧠 Best Practices

- 🔹 Events zentral definieren (`shared/config.lua`)
- 🔹 UI strikt von Game-Logik trennen
- 🔹 Composables für Wiederverwendbarkeit nutzen
- 🔹 fxmanifest_default.lua in fxmanifest.lua umbenennen
- 🔹 Animationen sparsam einsetzen (Performance!)
- 🔹 Charts nur bei Bedarf rendern (Lifecycle beachten)

---

## 📄 Lizenz

MIT
