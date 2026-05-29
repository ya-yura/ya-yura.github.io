# Portfolio Site

Дата: 2026-05-24  
Статус: связный статический сайт-портфолио с обновленным живым русским текстовым слоем, собранный из HTML-шаблонов и текущих артефактов.  
Обновление 2026-05-15: добавлена CV/contact-страница на основе RTF-резюме из HH.  
Обновление 2026-05-24: переписаны тексты главной, about/evidence/CV и четырех кейсов по материалам `samples` и `works`; усилена маркировка фактов, прокси-метрик, гипотез и missing evidence.  
Визуальная концепция: Premium Industrial / Precision Systems Portfolio.

## Как открыть

Открыть `index.html` напрямую в браузере. Dev server не нужен.

## Страницы

- `index.html` - главная: first viewport, ключевые кейсы, системная практика, дополнительные доказательства, политика утверждений.
- `cases/sklad-15.html` - flagship case про scan-first warehouse UX.
- `cases/industrial-data-platform.html` - industrial UI case with rights/redaction gate.
- `cases/thermal-camera.html` - embedded UX case based on state/event/effect contract.
- `cases/ruchamp.html` - sport event operations lifecycle case.
- `evidence.html` - реестр доказательств, правила утверждений и карта прокси-метрик.
- `about.html` - positioning, site map and publication gaps.
- `cv.html` - резюме, контакт, опыт из RTF-резюме и связка компаний с кейсами.
- `visual-lab/sklad-15-premium-boards.html` - презентационные борды Склад-15 с честной маркировкой реконструкции и прокси-метрик.
- `assets/site.css` - общий CSS сайта.
- `assets/motion.js` - progressive enhancement для motion-системы: появления секций, раскрытие групп, активные flow-steps и кликабельные motion-proof loops.

## Motion

- `[Факт]` Motion внедрен как progressive enhancement: без JavaScript страницы остаются читаемыми.
- `[Факт]` В CSS сохранена поддержка `prefers-reduced-motion`; в этом режиме анимации не несут единственный смысл.
- `[Факт]` На главной добавлен блок `Motion показывает поведение, а не украшает страницу`.
- `[Факт]` В четырех флагманских кейсах добавлены motion-proof модули: Склад-15, Thermal, Industrial Data Platform и Ruchamp.
- `[Гипотеза]` Основная ценность motion: показать state transition, recovery, lifecycle и evidence labels, а не создать декоративный wow-эффект.

## Copy Edit

- Текстовый слой переписан на живой русский: без канцелярита, без неподтвержденной саморекламы и без выдуманных метрик.
- Каждый сильный claim оставлен с меткой: факт, факт из резюме, прокси-метрика, гипотеза, нужно добыть, артефакт или реконструкция.
- Метрики из резюме помечены как `[Факт из резюме]` и требуют источников перед переносом в кейсы как подтвержденный outcome.
- Редакторский артефакт: `../portfolio-copy-edit-2026-05-15.md`.
- Редакторский артефакт 2026-05-24: `../portfolio-humanized-copy-pass-2026-05-24.md`.

## Evidence Rules

Сайт намеренно оставляет claim labels в интерфейсе:

- `[Факт]`
- `[Факт из отчета]`
- `[Факт из резюме]`
- `[Прокси-метрика]`
- `[Гипотеза]`
- `[Нужно добыть]`
- `reconstructed`

Forecast, benchmark estimate, reconstructed mockup or planned A/B test must not be shown as achieved business impact.

## QA

- Local `href/src` references should resolve from `artifacts/portfolio-site`.
- Desktop QA screenshot: `qa-home-1440.png`.
- Mobile QA screenshot: `qa-home-mobile.png`.
