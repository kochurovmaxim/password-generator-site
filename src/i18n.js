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
        error_no_settings: "At least one character type must be selected",
        error_generation: "Error generating password",
        error_min_length: "Minimum password length: 4 characters",
        error_copy: "Failed to copy password",
        copied: "Copied!",
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
        error_no_settings: "Должен быть выбран хотя бы один тип символов",
        error_generation: "Ошибка генерации пароля",
        error_min_length: "Минимальная длина пароля: 4 символа",
        error_copy: "Не удалось скопировать пароль",
        copied: "Скопировано!",
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
