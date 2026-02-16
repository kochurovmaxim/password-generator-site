export class I18n {
  constructor() {
    this.translations = {
      en: {
        head_title: "Password Generator",
        title: "Password Generator",
        length: "Length",
        use: "Use:",
        uppercase: "Uppercase letters",
        lowercase: "Lowercase letters",
        numbers: "Numbers",
        symbols: "Symbols",
        exclude: "Exclude:",
      },
      ru: {
        head_title: "Генератор пароля",
        title: "Генератор пароля",
        length: "Длина",
        use: "Использовать:",
        uppercase: "Заглавные буквы",
        lowercase: "Строчные буквы",
        numbers: "Числа",
        symbols: "Символы",
        exclude: "Исключить:",
      },
    };

    this.currentLang =
      localStorage.getItem("language") ||
      navigator.language.split("0")[0] ||
      "ru";

    if (!this.translations[this.currentLang]) {
      this.currentLang = "ru";
    }
  }

  get(key) {
    return this.translations[this.currentLang][key] || key;
  }

  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem("language", lang);
      document.documentElement.lang = lang;
      this.updateDOM();
    }
  }

  updateDOM() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      el.textContent = this.get(key);
    });
  }
}
