# Запросы генерации контекстных обложек

Дата: 10 августа 2026 года  
Инструмент: встроенный ImageGen  
Режим: новая генерация + точечное редактирование

## «Склад 15» — основная генерация

```text
Use case: stylized-concept
Asset type: premium homepage case-study cover for a world-class product and UX designer portfolio

Primary request: Create a striking, sophisticated 3D editorial visualization of one critical moment in real warehouse receiving. The image must tell a specific story without words: an orderly accepted flow remains safe while one unknown barcode is isolated, assigned for review, and the unsafe finish is visibly blocked.

Scene/backdrop: A bright warm off-white studio stage containing one coherent, physically believable compact warehouse receiving workstation. Everything stands on the same floor plane with natural contact shadows. No floating screens and no abstract collection of unrelated objects.

Subject and story:
- The central hero is a mechanically believable rugged handheld warehouse barcode terminal on a low working stand, actively scanning the clean barcode label of one ordinary kraft carton.
- Behind and slightly left, a short real metal roller conveyor carries several already accepted kraft cartons and one muted-mint reusable Euro tote forward in an orderly protected lane. Use restrained green confirmation lights or simple check-shaped physical indicators only; this accepted flow remains intact.
- The scanned carton with the unknown barcode is the single warm-coral exception. A plausible mechanical diverter has moved only this carton onto a shallow coral inspection tray beside the conveyor. The barcode label is straight and correctly attached; the carton geometry is normal.
- On the right, the end of the receiving lane is protected by a real compact safety gate with a clear locked-stop indicator, showing that final completion cannot happen yet.
- Beside that gate is one small wall-mounted industrial supervisor touchscreen or rugged tablet showing a single coral incident block made only from abstract bars and a person/owner symbol, no readable text. A restrained physical signal cable or rail connects the inspection tray to this supervisor station so ownership is visually clear.
- The entire composition should read left-to-right as: accepted work preserved → one barcode exception isolated → supervisor owns it → unsafe completion blocked.

Style/medium: premium high-end CGI indistinguishable from carefully art-directed product photography; contemporary European product-design editorial; technically precise, memorable, vivid, mature.
Composition/framing: wide 3:2 landscape, calm three-quarter top-down camera around 45–55 mm, strong central focal point, disciplined geometry, generous outer breathing room. Keep every important object inside the central 78 percent so the image survives responsive cropping.
Lighting/mood: soft large-window daylight from upper left, controlled highlights, crisp gentle shadows, one emotionally clear coral interruption within a calm mint-green process.
Color palette: warm ivory, natural kraft cardboard, matte black rubberized terminal, brushed light metal, muted mint and deep green for accepted work, coral-red only for the exception and locked gate, one very small lilac accent at the supervisor station.
Materials/textures: believable cardboard fibers, matte polypropylene tote, powder-coated metal tray, rubberized terminal, brushed aluminum rollers, practical industrial touchscreen.
Constraints: one coherent real workstation; all objects complete, correctly scaled, mechanically plausible, grounded, and manufactured; readable cause-and-effect through staging alone.
Avoid: all words, letters, digits, logos, brands, watermarks, fake UI text, futuristic glass panels, transparent acrylic cards, floating nodes, glowing tubes, random decorative shapes, sci-fi machinery, impossible conveyor mechanics, warped cartons, bent barcodes, duplicated devices, extra scanner handles, melted plastic, visual noise, particles, dark cyberpunk background, toy-like styling, generic infographic or dry diagram. This must feel art-directed by a senior human designer, not generated decoration.
```

## «Склад 15» — устранение дублирующей коробки

```text
Use case: precise-object-edit
Asset type: premium homepage case-study cover
Input images: Image 1 is the edit target.

Primary request: Fix one narrative ambiguity while preserving the entire art direction and scene.

Change only these details:
1. Remove the kraft carton currently sitting on the main conveyor immediately in front of the mint tote. Continue the now-visible conveyor rollers naturally through that space.
2. Redirect the thin red scanner beam from the rugged handheld terminal so it lands precisely on the barcode label of the single kraft carton already sitting on the coral inspection tray.
3. The coral-tray carton must be the only actively scanned problem carton. Do not create, duplicate, move, resize, or redesign any other carton.

Preserve exactly: camera, crop, warm off-white room, sunlight pattern, lighting, shadows, accepted cartons on the far-left conveyor, mint Euro tote, green confirmation indicators, terminal and stand, conveyor structure, coral inspection tray, wall-mounted supervisor touchscreen, red signal cable, safety gate, lock indicator, object scale, materials, palette, premium photographic CGI finish.

Constraints: physically plausible straight scan beam; one clear problem carton; normal unwarped cardboard geometry; barcode label flat and straight; all objects grounded.
Avoid: any words, letters, digits, logos, watermarks, new objects, floating UI, sci-fi elements, warped conveyor, altered gate, duplicated boxes, visual noise, style changes.
```

Эта версия исправила дублирование, но создала новый артефакт: луч начинался от опоры конвейера. Поэтому потребовалась ещё одна точечная итерация.

## «Склад 15» — финальная очистка

```text
Use case: precise-object-edit
Asset type: premium homepage case-study cover
Input images: Image 1 is the edit target.

Primary request: Make one final realism cleanup while preserving the full scene.

Change only these details:
1. Remove the thin diagonal red laser line completely. Reconstruct the floor, conveyor support and coral tray beneath it naturally. There must be no scanning beam anywhere.
2. On the rugged handheld terminal screen, add one simple, crisp coral warning state: a small centered coral rounded square containing one plain white exclamation mark. No other interface, no bars, no text, no digits.

Preserve exactly: all cartons and their positions, the single carton on the coral exception tray, empty conveyor rollers in front of the mint tote, accepted cartons on the far-left conveyor, green confirmation indicators, mint tote, terminal body and stand, conveyor, inspection tray, wall-mounted supervisor touchscreen, red signal cable, safety gate and lock, camera, crop, lighting, shadows, materials, color palette and premium realistic CGI finish.

Constraints: terminal icon must be geometrically clean and screen-aligned; all real-world geometry remains plausible.
Avoid: any laser or glowing line, words, letters, digits, logos, watermarks, new objects, moved objects, extra cartons, fake text, warped hardware, sci-fi additions, style or lighting changes.
```

## KUBTEL — финальная генерация

```text
Use case: stylized-concept
Asset type: premium homepage case-study cover for a world-class service and product designer portfolio

Primary request: Create a memorable, sophisticated 3D editorial visualization of one real internet-service outage existing as one shared context across the customer home, the physical network repair, and customer support. This must be a strong visual story, not a diagram and not a collection of abstract icons.

Scene/backdrop: A bright warm off-white studio set designed as one coherent service-recovery environment. Three physically grounded zones share the same floor plane and natural contact shadows.

Subject and story:
- Left zone: a believable compact white home internet router on a refined small residential side table or wall shelf, with correct ports, vents and subtle status LEDs. Beside it, a real modern smartphone on a stand displays one clean outage status block made only from a coral rounded rectangle, a pulse dot and two abstract bars; no text.
- Center hero: a mechanically believable compact outdoor or building telecom fiber distribution cabinet, open for maintenance. Inside are orderly fiber trays, connectors and one clearly isolated coral service module under repair. The cabinet must look manufactured and technically credible, not sci-fi. A controlled amber/coral work light marks the active repair, while the preserved network route remains mint/teal.
- Right zone: a professional support workstation with one slim desktop monitor and compact keyboard on a clean desk. The monitor displays the exact same distinctive outage status block geometry and color as the customer smartphone, plus a simple address-pin shape and one user/context symbol, all without text. This visibly proves the support agent already has the same incident context.
- One real, correctly connected fiber cable in muted mint/teal travels cleanly from the home router into the central distribution cabinet and onward to the network side. It should be physically plausible and neatly routed, not a glowing abstract tube.
- A second very restrained data connection from the central cabinet to both phone and support screen may be suggested only by matching screen state and small synchronized indicator lights, not floating nodes.
- The composition must read immediately as: customer service affected → repair is happening in the network → customer and support see the same incident.

Style/medium: high-end premium CGI indistinguishable from meticulously art-directed product photography; contemporary European service-design editorial; technically precise, mature, emotionally reassuring.
Composition/framing: wide 3:2 landscape, calm three-quarter top-down camera around 45–55 mm, central cabinet as the main focal point, router and smartphone grouped clearly on one side, support workstation grouped clearly on the other. Strong hierarchy and generous breathing room. Keep all important objects inside the central 78 percent for responsive cropping.
Lighting/mood: soft cool daylight with warm studio fill, crisp gentle shadows, luminous but controlled materials, calm competence during a service incident.
Color palette: ivory and light warm gray, deep teal and muted mint for service continuity, clear sky blue for information, one focused coral-red repair accent, tiny lilac secondary accent.
Materials/textures: matte router plastic, anodized metal cabinet, credible fiber trays and cables, glass phone and monitor screens, powder-coated desk, subtle rubber and brushed aluminum.
Constraints: every object complete, grounded, correctly scaled and mechanically plausible; one shared status symbol repeated consistently on the phone and support monitor; all cables have believable origins and destinations; no readable text.
Avoid: words, letters, digits, logos, brands, watermarks, fake UI text, toy house icons, floating glass cards, transparent capsules, random bubbles, glowing sci-fi rails, abstract status chain, impossible fiber loops, duplicated devices, warped screens, malformed ports, melted hardware, decorative clutter, people or hands, dark cyberpunk atmosphere, generic infographic or dry diagram. The result must look conceived and directed by a senior human designer, not like generic AI imagery.
```

## Итоговые файлы

- `site/assets/portfolio-sklad-receiving-story-v2-20260810.png`
- `site/assets/portfolio-sklad-receiving-story-v2-20260810.webp`
- `site/assets/portfolio-kubtel-shared-incident-v2-20260810.png`
- `site/assets/portfolio-kubtel-shared-incident-v2-20260810.webp`

PNG сохранены как мастер-файлы. Сайт загружает оптимизированные WebP-версии через элемент `picture`.
