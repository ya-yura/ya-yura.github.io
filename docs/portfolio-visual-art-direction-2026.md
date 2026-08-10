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

Пересобраны десять смысловых конструкций:

1. шкала доказательств — от прямого подтверждения до предположения;
2. матрица приоритетов — частота проблемы и тяжесть последствий;
3. сравнение обратной связи после скана;
4. план, факт и остаток с пересчётом упаковок;
5. путь документа от терминала до учётной системы;
6. четыре ответа после ошибки передачи;
7. сквозной сценарий неизвестного штрихкода — от скана до безопасного завершения;
8. библиотека общих блоков и состояний;
9. карта измерений «сигнал → решение»;
10. путь проверки от наблюдения до пилота.

### Сквозной сценарий исключения

Текущая внутренняя иллюстрация реализована не растровым файлом, а адаптивной HTML/CSS-композицией `exception-journey-panel` в `site/case-sklad-15.html`; стили находятся в `site/styles-v2.css`.

Её место выбрано намеренно: она стоит после четырёх отдельных решений и перед разделом «Из этих решений получается единая система». Поэтому визуал выполняет роль моста и показывает, как отдельные паттерны работают вместе в одном реальном случае.

Сценарий: кладовщик сканирует неизвестный штрихкод во время приёмки.

1. **Обнаружить.** Терминал прямо сообщает, что товар не добавлен, а 37 предыдущих сканирований сохранены.
2. **Сохранить и защитить.** Система создаёт исключение, сохраняет контекст документа и запрещает завершение, пока обязательная проблема не решена. При этом приёмку можно продолжить, если это разрешено политикой склада.
3. **Передать ответственному.** В единой очереди старший смены получает документ, место, количество и действие. Рядом видны другие типы исключений: отсутствующая марка и транспортная упаковка.
4. **Вернуть результат.** Решение возвращается на терминал; завершение становится доступным только после проверки, а пользователь видит путь документа до принятия в учётной системе.

Практическая задача визуала — за несколько секунд доказать четыре свойства концепции: прогресс не теряется, опасный исход заблокирован, у исключения есть владелец, решение прослеживается до учёта. Это не заявленный производственный эффект, а проектная гипотеза, которую необходимо проверить на реальном складе.

В самом визуале это обозначено подписью «Проектное решение»: разрешённая обработка неизвестного штрихкода и блокировка завершения опираются на существующие возможности продукта, а единый центр исключений, назначение владельца и автоматический возврат решения показаны как предлагаемое развитие сценария.

Визуал собран в коде по двум причинам:

- точные русские подписи и состояния интерфейса важнее декоративного объёма;
- на мобильном экране четыре шага перестраиваются в вертикальную историю, а не уменьшаются до нечитаемой картинки.

Архивные версии сохранены, но на сайте не используются:

- `site/assets/sklad-exception-hub-light-20260810.png` отклонён из-за фантазийной геометрии, светящихся соединителей и несуществующих складских объектов;
- `site/assets/sklad-exception-workstation-light-v2-20260810.png` отклонён, несмотря на правдоподобные предметы: композиция показывала рабочее место, но не объясняла причину, решение, передачу ответственности и результат.

### Схемы KUBTEL

Кейс использует четыре собственные смысловые конструкции:

1. сквозной переход от инцидента по адресу до подтверждения восстановления;
2. цикл статуса от привязки адреса до закрытия истории;
3. карта сервисных метрик: повторный контакт, время до ясного ответа, сохранённый контекст и самостоятельное завершение;
4. путь проверки от разбора причин обращений до пилота в одном регионе.

### Сквозной переход между каналами

Текущая внутренняя иллюстрация реализована как адаптивная HTML/CSS-композиция `service-handoff-panel` в `site/case-kubtel.html`; стили находятся в `site/styles-v2.css`.

Её место выбрано намеренно: после трёх продуктовых направлений и перед циклом статуса. Визуал показывает один конкретный случай, в котором личный кабинет и поддержка используют один контекст:

1. адрес и услуга сопоставляются с массовым инцидентом;
2. абонент видит подтверждённый этап и время следующего обновления;
3. при переходе в поддержку оператор уже видит адрес, инцидент, показанный статус и действие абонента;
4. восстановление возвращается в кабинет, а история закрывается после подтверждения.

Практическая задача визуала — доказать четыре свойства концепции: авария определяется по адресу, следующий апдейт обозначен честно, контекст не приходится повторять, восстановление подтверждается. Эффект пока не измерен: это продуктовая гипотеза для проверки на прототипе и региональном пилоте.

Архивный файл `site/assets/kubtel-context-chain-light-20260810.png` больше не подключён. Он сохраняется как история итерации, но отклонён: дом, стеклянная капсула, кольцо и галочка не показывали действия пользователя, переход в поддержку, владельца данных и результат сервиса.

## Растровые изображения и запросы для генерации

Главные растровые изображения созданы встроенным ImageGen. Сгенерированный текст в изображениях запрещён; все подписи добавлены в коде. Сквозной сценарий исключения не создавался генеративной моделью: он вручную собран в HTML и CSS, чтобы содержание и геометрия оставались точными.

### Запрос для «Склад 15»

> Create a premium, text-free hero visual for a world-class product/UX portfolio case study about safe warehouse receiving. Composition: wide landscape 16:10. A realistic rugged handheld warehouse barcode terminal at a refined three-quarter angle, positioned slightly left of center. Around it, four clearly separated translucent acrylic interface plates arranged on a disciplined editorial bento grid: a mint-green confirmed state, a warm coral exception state, a pale violet document state, and a sky-blue synchronization path. Use only simple geometric icons, short abstract bars, rings and check/error symbols. Add a restrained path of small translucent nodes that visually suggests terminal → server → accounting system without using any labels. Art direction: bright off-white/cool ivory background, soft studio daylight, crisp but gentle shadows, frosted glass and transparent acrylic, clean industrial design, strong hierarchy, generous negative space, modern European editorial layout, technically precise, vivid but not childish, memorable and high-end. The result should feel designed by a senior human art director, not like generic AI art. Strict exclusions: absolutely no words, letters, numbers, logos, brands, watermarks, fake text, illegible UI, dark background, black cyberpunk panels, neon sci-fi atmosphere, clutter, random floating blobs, extra devices, duplicated controls, warped hardware or impossible geometry. Keep the terminal anatomically and mechanically believable.

### Запрос для KUBTEL

> Create a premium, text-free hero visual for a world-class service-design / product UX portfolio case study about an internet provider showing a clear live service status during an outage. Composition: wide landscape 16:10 with the main object group centered-right and useful negative space. Build a calm, precise service-status object from three connected translucent acrylic stages: detection, diagnosis, and recovery. Include a believable minimal home/router symbol, a signal wave, a route of small glass nodes, one clear active stage, and a final restored-state check. The connection should read immediately as a real service moving through stages, not as random decoration. Art direction: bright off-white with a very pale cool blue-green tint, soft studio daylight, sophisticated glass and frosted acrylic materials, clean editorial bento geometry, restrained shadows, deep teal, clear sky blue, lavender and one small warm coral accent. Contemporary European product-design case study, technically precise, generous whitespace, vivid yet calm, premium and human. Strict exclusions: absolutely no words, letters, numbers, logos, brands, watermarks, fake UI text, dark background, cyberpunk, generic floating bubbles, clutter, duplicate devices, warped geometry, glossy toy look, impossible router hardware. No screen with fake content.

### Архивный запрос для рабочего места разбора исключений «Склада 15»

Версия по этому запросу отклонена: физическая сцена стала правдоподобнее, но не решала задачу сквозного объяснения процесса. Текст сохранён как история итерации, а не как спецификация текущего визуала.

Основная генерация:

> Use case: precise-object-edit. Asset type: a wide internal illustration for a senior product/UX portfolio case study about safe warehouse receiving. Image 1 is the edit target and may be used only for its bright off-white field, airy spacing, muted mint plus coral palette, and the general idea of one place where exceptions are handled. Discard its geometry completely: remove the glass platforms, glowing tubes, silver canister, crystalline shards, floating parts, and all invented machinery. Rebuild the scene from scratch as a physically believable receiving workstation that looks art-directed, constructed from real manufactured objects, and photographed in a premium studio.
>
> Scene: one clean warm-white warehouse workbench, seen from a calm three-quarter top-down camera at roughly 50 mm with restrained perspective. In the center sits a real shallow rectangular document tray made from coral powder-coated metal, with rounded corners and ordinary manufacturing thickness. Inside it lies one flat white receiving sheet on a dark clipboard and two plain removable barcode labels; the paper is flat and geometrically correct. Around the tray, arranged on the same tabletop and grounded by natural contact shadows: one normal kraft corrugated shipping carton with closed flaps and one correctly rectangular white barcode label made only of black vertical bars; one standard reusable Euro plastic tote in muted mint with credible ribs, handles, wall thickness and an open top; one compact rugged handheld warehouse mobile computer resting flat at a slight angle, with a coherent screen, side grips and physical buttons but no readable interface; and one ordinary roll of white thermal labels. Add only two small pieces of real colored warehouse floor tape on the tabletop, one mint and one coral, to organize the inspection area. No connecting tubes or symbolic cables.
>
> Style and material: sophisticated high-end catalog product photography or exceptionally realistic CGI indistinguishable from a photographed set; real cardboard fibers, matte polypropylene crate, powder-coated metal tray, rubberized terminal, paper and adhesive labels. Soft large-window studio light from upper left, gentle neutral shadows, precise edges, no haze, no noise, no glass, no glossy toy finish. Bright warm off-white background, spacious editorial composition, restrained coral and mint accents, technically calm and human. All five objects must be complete, mechanically plausible, separate from one another and fully supported by the tabletop. Keep the important group within the central 82 percent for responsive cropping.
>
> Strict constraints: absolutely no words, letters, digits, logos, brands, watermarks, fake UI text, decorative symbols, sci-fi elements, transparent acrylic, glowing lines, pipes, impossible joints, floating objects, duplicated objects, melted plastic, warped box flaps, bent barcode, asymmetrical crate walls, extra scanner handles, broken perspective, visual noise, random particles or crystalline forms. The result must feel like a top agency set designer and product photographer made it from real warehouse equipment.

Первая точечная коррекция — очистка клавиатуры и бланка:

> Use case: precise-object-edit. Image 1 is the edit target. Preserve the scene, camera, crop, warm off-white background, lighting, shadows, object count, object positions, kraft carton, mint Euro tote, coral metal tray, label roll, clipboard, mobile terminal, colored tape pieces, materials and palette exactly as they are. Make only a micro-detail cleanup pass. Replace every keycap on the rugged handheld terminal with a coherent, evenly spaced grid of plain unmarked matte-black rectangular keys. Simplify the white receiving sheet on the clipboard to a clean blank operational form made only from straight pale-gray horizontal and vertical ruling lines. Keep each barcode as a clean rectangular set of straight parallel black vertical bars with consistent edges and no digits or letters. Do not move, add, remove or redesign any object; no words, letters, digits, logos, brands, watermarks, fake UI, glowing elements, transparent acrylic, noise, particles, warped geometry or extra hardware.

Финальная точечная коррекция — удаление оставшихся микрометок:

> Use case: precise-object-edit. Image 1 is the edit target. Preserve absolutely everything in the image exactly: camera, crop, lighting, background, shadows, carton, mint crate, coral metal tray, black clipboard, two loose barcode labels, label roll, rugged terminal with blank unmarked keys, colored tape pieces, positions, scale, materials and colors. Change only the sheet of paper held by the clipboard: replace the printed table/form with one completely plain, clean, unprinted warm-white rectangular sheet. It must contain no grid, no ruling, no form fields, no tiny marks, no pseudo-text, no dots, no smudges and no symbols. Keep the two separate loose barcode labels lying on top of the blank sheet exactly where they are; each barcode remains a clean rectangle of straight black vertical bars without digits or letters. Keep the metal clipboard clip and black backing geometrically correct. Do not alter anything else. No added or removed objects, no words, letters, digits, logos, brands, watermark, fake UI, noise, particles, warping, extra buttons, sci-fi details, acrylic, glass, glow or perspective changes.

### Архивный запрос для непрерывного контекста KUBTEL

Версия по этому запросу отклонена: материальный образ был аккуратным, но оставался декоративной метафорой и не объяснял работу сервиса. Текст сохранён только как история итерации.

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
- Внутренняя схема показывает не метафору, а точный переход: адрес → персональный статус → поддержка с готовым контекстом → подтверждённое восстановление.

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
