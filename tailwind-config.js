(function () {
  // Tailwind CDN defines `tailwind` globally. If it's not present, do nothing.
  if (typeof tailwind === "undefined") return;

  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: [
            "Inter",
            "system-ui",
            "-apple-system",
            "Segoe UI",
            "Roboto",
            "Arial",
            "sans-serif",
          ],
          mono: [
            "ui-monospace",
            "SFMono-Regular",
            "Menlo",
            "Monaco",
            "Consolas",
            "Liberation Mono",
            "monospace",
          ],
        },
        colors: {
          // Single accent for all pages.
          accent: {
            DEFAULT: "var(--color-accent)",
            50: "var(--color-accent-50)",
            100: "var(--color-accent-100)",
            200: "var(--color-accent-200)",
            700: "var(--color-accent)",
            800: "var(--color-accent-800)",
          },
          // Unify both palettes to the same neutral tokens.
          slate: {
            50: "var(--neutral-50)",
            100: "var(--neutral-100)",
            200: "var(--neutral-200)",
            300: "var(--neutral-300)",
            400: "var(--neutral-400)",
            500: "var(--neutral-500)",
            600: "var(--neutral-600)",
            700: "var(--neutral-700)",
            800: "var(--neutral-800)",
            900: "var(--neutral-900)",
            950: "var(--neutral-950)",
          },
          zinc: {
            50: "var(--neutral-50)",
            100: "var(--neutral-100)",
            200: "var(--neutral-200)",
            300: "var(--neutral-300)",
            400: "var(--neutral-400)",
            500: "var(--neutral-500)",
            600: "var(--neutral-600)",
            700: "var(--neutral-700)",
            800: "var(--neutral-800)",
            900: "var(--neutral-900)",
            950: "var(--neutral-950)",
          },
        },
        boxShadow: {
          paper: "var(--shadow-paper)",
        },
      },
    },
  };
})();

