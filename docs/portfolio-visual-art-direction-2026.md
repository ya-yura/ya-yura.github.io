# Визуальный арт-дирекшн портфолио

Дата фиксации: 10 августа 2026 года  
Статус: реализовано и опубликовано на `https://ya-yura.github.io/`

## Задача

Пересобрать визуальную подачу портфолио так, чтобы она выглядела современной, светлой, выразительной и технически точной. Визуалы должны не просто украшать страницы, а быстро объяснять суть каждого кейса и усиливать образ Юрия Пылёва как специалиста, который умеет работать со сложными продуктами системно.

## Что взято из референсов

В референсах повторялись четыре сильных приёма:

1. Светлое поле и много свободного пространства. За счёт этого даже яркие объекты выглядят собранно и дорого.
2. Редакционная сетка из крупных карточек. Она позволяет одновременно показать порядок, разнообразие и иерархию.
3. Полупрозрачные материалы, мягкий объём и один насыщенный акцент. Они добавляют технологичность без тяжёлого «киберпанка».
4. Интерфейс показан в реальном контексте, а не как случайный набор экранов. Хороший визуал сообщает идею ещё до чтения подписи.

В тёмных финансовых и игровых референсах использованы только принципы глубины, постановки объекта и направленного света. Тёмная палитра и неоновая стилистика сознательно не перенесены: они противоречат исходным светлым страницам портфолио и делают кейсы тяжелее.

## Главная идея системы

**Материальный образ привлекает внимание, настоящий интерфейс доказывает компетенцию.**

Поэтому визуальная система разделена на два слоя:

- растровые изображения отвечают за физический объект, свет, материал и первое впечатление;
- HTML, CSS и SVG отвечают за подписи, статусы, данные, сценарии и схемы.

Такой подход исключает сгенерированные псевдонадписи и сохраняет адаптивность, доступность и точность содержания.

## Новые ключевые визуалы

### «Склад 15»

Файл: `site/assets/portfolio-sklad-hero-light-20260810.png`

Роль:

- главный визуал первого экрана;
- обложка флагманского кейса на главной;
- материальная основа для настоящих статусов «Скан принят» и «Есть исключения».

Смысл композиции: терминал находится в центре единой системы. Вокруг него видны четыре состояния: подтверждение, исключение, документ и синхронизация. Визуал объясняет не отдельный экран, а связность всей операции.

### KUBTEL

Файл: `site/assets/portfolio-kubtel-status-light-20260810.png`

Роль:

- фон и смысловая траектория первого экрана кейса;
- визуальная основа карточки KUBTEL на главной;
- поддержка реального HTML-макета статуса услуги.

Смысл композиции: услуга проходит через обнаружение, диагностику и восстановление. Дом, роутер и последовательность прозрачных узлов связывают технический инцидент с понятным для человека статусом.

## Внутренние схемы и иллюстрации

Внутренние материалы больше не собраны как уменьшенные презентационные слайды. Текстовые схемы реализованы в HTML и CSS: они остаются резкими, доступны поиску, корректно читаются программами экранного доступа и меняют компоновку на узком экране.

### Схемы «Склада 15»

Пересобраны девять смысловых конструкций:

1. шкала доказательств — от прямого подтверждения до предположения;
2. матрица приоритетов — частота проблемы и тяжесть последствий;
3. сравнение обратной связи после скана;
4. план, факт и остаток с пересчётом упаковок;
5. путь документа от терминала до учётной системы;
6. четыре ответа после ошибки передачи;
7. библиотека общих блоков и состояний;
8. карта измерений «сигнал → решение»;
9. путь проверки от наблюдения до пилота.

Файл внутренней иллюстрации: `site/assets/sklad-exception-hub-light-20260810.png`.

Её роль — показать, что неизвестный товар, отсутствующая марка, транспортная упаковка и проблема сканирования сходятся не в четыре отдельных тупика, а в один управляемый центр исключений.

### Схемы KUBTEL

Общие складские картинки удалены из кейса. Вместо них добавлены:

1. собственный цикл статуса от привязки адреса до подтверждения восстановления;
2. карта сервисных метрик: повторный контакт, время до ясного ответа, сохранённый контекст и самостоятельное завершение;
3. путь проверки от разбора причин обращений до пилота в одном регионе.

Файл внутренней иллюстрации: `site/assets/kubtel-context-chain-light-20260810.png`.

Её роль — показать непрерывную связь между адресом, историей обращения, текущим состоянием услуги и подтверждением результата.

## Финальные запросы для генерации

Оба изображения созданы встроенным ImageGen. Сгенерированный текст в изображениях запрещён; все подписи добавлены в коде.

### Запрос для «Склад 15»

> Create a premium, text-free hero visual for a world-class product/UX portfolio case study about safe warehouse receiving. Composition: wide landscape 16:10. A realistic rugged handheld warehouse barcode terminal at a refined three-quarter angle, positioned slightly left of center. Around it, four clearly separated translucent acrylic interface plates arranged on a disciplined editorial bento grid: a mint-green confirmed state, a warm coral exception state, a pale violet document state, and a sky-blue synchronization path. Use only simple geometric icons, short abstract bars, rings and check/error symbols. Add a restrained path of small translucent nodes that visually suggests terminal → server → accounting system without using any labels. Art direction: bright off-white/cool ivory background, soft studio daylight, crisp but gentle shadows, frosted glass and transparent acrylic, clean industrial design, strong hierarchy, generous negative space, modern European editorial layout, technically precise, vivid but not childish, memorable and high-end. The result should feel designed by a senior human art director, not like generic AI art. Strict exclusions: absolutely no words, letters, numbers, logos, brands, watermarks, fake text, illegible UI, dark background, black cyberpunk panels, neon sci-fi atmosphere, clutter, random floating blobs, extra devices, duplicated controls, warped hardware or impossible geometry. Keep the terminal anatomically and mechanically believable.

### Запрос для KUBTEL

> Create a premium, text-free hero visual for a world-class service-design / product UX portfolio case study about an internet provider showing a clear live service status during an outage. Composition: wide landscape 16:10 with the main object group centered-right and useful negative space. Build a calm, precise service-status object from three connected translucent acrylic stages: detection, diagnosis, and recovery. Include a believable minimal home/router symbol, a signal wave, a route of small glass nodes, one clear active stage, and a final restored-state check. The connection should read immediately as a real service moving through stages, not as random decoration. Art direction: bright off-white with a very pale cool blue-green tint, soft studio daylight, sophisticated glass and frosted acrylic materials, clean editorial bento geometry, restrained shadows, deep teal, clear sky blue, lavender and one small warm coral accent. Contemporary European product-design case study, technically precise, generous whitespace, vivid yet calm, premium and human. Strict exclusions: absolutely no words, letters, numbers, logos, brands, watermarks, fake UI text, dark background, cyberpunk, generic floating bubbles, clutter, duplicate devices, warped geometry, glossy toy look, impossible router hardware. No screen with fake content.

### Запрос для центра исключений «Склада 15»

> Create a premium editorial product-design case-study illustration, landscape 16:10. Bright warm off-white seamless background. In the center: one refined coral-red translucent exception hub, shaped like a shallow rounded tray/capsule. Around it, four purposeful warehouse objects: a matte white shipping carton with a simple black barcode stripe pattern but no readable digits; a small metallic product canister with an abstract circular machine-readable mark but no readable code; a pale mint reusable transit crate with subtle nesting geometry; and a compact rugged handheld scanner silhouette. Thin mint and sky-blue acrylic connector rails converge from all four objects into the central hub, clearly suggesting that different warehouse exceptions arrive in one controlled place. Light technical 3D, clean glass and acrylic materials, subtle metal, soft studio shadows, restrained coral/mint/sky/lilac palette, crisp premium industrial-design rendering, generous negative space, sophisticated rather than playful. Keep all important objects within the central 80 percent for responsive cropping. No words, no letters, no numbers, no logos, no UI, no watermark, no dark background, no random decorative blobs.

### Запрос для непрерывного контекста KUBTEL

> Create a premium editorial product-design case-study illustration, landscape 16:10, on a bright warm off-white seamless background. Depict one continuous customer-service context chain as a refined light technical 3D object. On the left: a minimal matte-white home with a small mint router and an abstract location pin token. In the center: three overlapping translucent lavender and sky-blue rounded cards held together inside a clear glass capsule, representing preserved conversation history; cards contain only simple lines and dots, no readable text. On the right: a coral service-status ring with a small mint pulse indicator and a clear confirmation disc. Connect all elements with one elegant translucent mint rail so the composition reads as address → saved context → current service state → confirmation. Clean glass/acrylic materials, subtle metal, soft studio shadows, restrained coral/mint/sky/lilac palette, crisp premium industrial-design rendering, generous negative space, sophisticated and calm. Keep important objects within the central 80 percent for responsive cropping. No words, no letters, no numbers, no logos, no brand marks, no UI text, no watermark, no dark background, no random decorative blobs.

## Цветовая логика

Основные токены находятся в `site/styles-v2.css`.

- Фон страницы: тёплый светлый `#F7F6F2`.
- Основной текст: почти чёрный `#151514`.
- Главный акцент: коралловый `#FF5733`.
- Системный и подтверждающий акцент: зелёный `#087D5C`.
- Состояния и смысловые группы: мятный, небесно-голубой, сиреневый и персиковый.
- Границы всегда спокойные и полупрозрачные; они собирают сетку, но не дробят страницу.

Цвет используется семантически:

- зелёный — подтверждение и безопасное продолжение;
- коралловый — исключение, риск или важный тезис; для мелкого текста используется более контрастный оттенок `#CF381B`;
- голубой — система, обмен и измерение;
- сиреневый — документ, модель и связь между слоями;
- жёлтый — доказательства и проверка.

## Типографика

В активной системе только две гарнитуры:

- `Uncage` — заголовки;
- `TikTok Sans` — весь наборный текст, навигация, подписи, кнопки и данные.

Обе гарнитуры объявлены дизайн-токенами `--font-heading` и `--font-body`. Третьих гарнитур и локальных исключений нет.

Крупные заголовки ограничены функцией `clamp()`. На мобильном экране 390 пикселей текст не выходит за границы, главная кнопка остаётся видимой до первого изображения, горизонтального переполнения нет.

## Как визуалы работают на страницах

### Главная

- Первый экран сразу связывает позиционирование специалиста с реальным продуктовым кейсом.
- Четыре принципа представлены как светлая цветная сетка, а не как тяжёлая таблица.
- Кейсы имеют одинаковую структуру: визуальное доказательство сверху, контекст и результат снизу.
- Второй кейс не выглядит второстепенным: у него собственная цветовая логика и собственный материальный образ.

### «Склад 15»

- Первый экран показывает терминал как часть системы, а не как изолированный гаджет.
- Карта системы пересобрана в адаптивный HTML-компонент: учётная система, сервер и терминал читаются последовательно на любом экране.
- Четыре решения получили разные семантические поверхности, но одинаковую конструкцию карточки.
- Девять схем реализованы как адаптивные HTML-компоненты и используют те же две гарнитуры.
- Материальная иллюстрация связывает разные типы исключений с единым центром обработки.

### KUBTEL

- Сгенерированный материальный маршрут остаётся на заднем плане.
- Настоящая HTML-карточка статуса лежит поверх него и содержит весь значимый текст без артефактов.
- Контраст «до / после», общая модель состояния и сервисная схема используют тот же карточный язык, что и главная.
- Метрики и план проверки относятся только к KUBTEL и больше не повторяют складские материалы.
- Внутренняя иллюстрация показывает сохранение контекста между адресом, обращением и статусом услуги.

## Защита от признаков генерации

1. В растровых изображениях нет слов, цифр, логотипов и псевдоинтерфейсов.
2. Все тексты, данные и статусы набраны настоящими шрифтами в HTML или SVG.
3. Для каждого декоративного объекта определена конкретная роль в сценарии.
4. Нет случайных стрелок, подписей, иконок и «технологических» элементов без смысла.
5. Растровые изображения не растягиваются и не используются как фон для длинного текста.
6. Визуалы разных кейсов связаны материалом и сеткой, но различаются цветом и предметным образом.

## Проверка реализации

Проверены страницы:

- `site/index.html`;
- `site/case-sklad-15.html`;
- `site/case-kubtel.html`.

Результаты проверки:

- живая версия проверена при ширине 1280 пикселей: горизонтальное переполнение на обеих страницах равно нулю;
- мобильные первые экраны ранее проверены при ширине 390 пикселей, а новые схемы дополнительно получили явные перестроения на точках 920, 720 и 480 пикселей;
- двухколоночные схемы становятся одноколоночными, а путь документа и цикл статуса превращаются в вертикальные последовательности;
- старые внутренние SVG больше не подключены ни к одному кейсу;
- обе новые иллюстрации загружаются на живом сайте в исходном размере 1586 × 992 пикселя;
- в консоли нет ошибок и предупреждений;
- у всех изображений есть `alt`;
- у всех изображений заданы фактические `width` и `height`, чтобы не было сдвига при загрузке;
- на каждой странице один `h1` и один `main`;
- добавлена ссылка быстрого перехода к содержанию;
- мобильное меню открывается, закрывается и корректно обрабатывает клавишу Escape;
- активные стили используют только `Uncage` и `TikTok Sans`.

Коммиты реализации:

- `3973f1f8961dfc3c63ac3b08c1bfe539850f9ced` — новые внутренние схемы, иллюстрации и документация;
- `3c65a52dd6b44addef1fd0d00c25ecf668ea634e` — фактические размеры изображений и финальный ключ кэша стилей.

## Связанные инструкции

- Обновление изображений на живом сайте: `docs/how-to-update-live-images.md`.
- Развёртывание сайта: `docs/github-pages-deploy.md`.
- Исходная дизайн-система кейса: `docs/safe-receipt-design-system.md`.
