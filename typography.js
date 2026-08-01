(() => {
  const narrowSpace = '\u202F';
  const ignoredTags = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'TEXTAREA']);

  const normalizeText = (value) => {
    let text = value;

    // Имена и инициалы: Юрий Пылёв, А. С. Пушкин.
    text = text.replace(/\b(Юрий|Юлия|Александр|Анна)\s+(Пылёв|Пушкин(?:а)?)\b/gu, `$1${narrowSpace}$2`);
    text = text.replace(/\b([А-ЯЁ])\.\s+([А-ЯЁ])\.\s+([А-ЯЁ][а-яё-]+)\b/gu, `$1.${narrowSpace}$2.${narrowSpace}$3`);

    // Число и единица измерения: 5 кг, 10 %, 1 240 ₽.
    text = text.replace(/(\d+(?:[.,]\d+)?)\s+(?=(?:%|‰|₽|кг|г\.|л\.|мл|шт\.|см|мм|мин|ч|руб\.)(?![А-ЯЁа-яё]))/giu, `$1${narrowSpace}`);
    text = text.replace(/(\d+(?:[.,]\d+)?)\s+(?=[А-ЯЁа-яё])/gu, `$1${narrowSpace}`);

    // Знаки номера и параграфа: № 5, § 12.
    text = text.replace(/([№§])\s+(?=\d)/gu, `$1${narrowSpace}`);

    // Диапазоны: 5–6 раз.
    text = text.replace(/(\d+(?:[.,]\d+)?)\s*[–—-]\s*(\d+(?:[.,]\d+)?)(?=\s+[А-ЯЁа-яё%])/gu, '$1–$2');

    // Короткие предлоги и союзы не остаются в конце строки.
    text = text.replace(/(^|[\s([{—–,:;])((?:в|к|о|с|у|а|и|но|не|на|по|из|за|от|до|для|как))\s+(?=[А-ЯЁа-яё])/giu, `$1$2${narrowSpace}`);

    return text;
  };

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement && ignoredTags.has(node.parentElement.tagName)
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  let node;
  while ((node = walker.nextNode())) nodes.push(node);
  nodes.forEach((textNode) => {
    textNode.nodeValue = normalizeText(textNode.nodeValue);
  });
})();
