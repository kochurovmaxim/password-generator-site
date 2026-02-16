import "./style.css";

import { I18n } from "./i18n";
import { PasswordGenerator } from "./password-generator";

class App {
  constructor() {
    this.generator = new PasswordGenerator();
    this.i18n = new I18n();

    this.elements = {
      passwordResult: document.querySelector(".password-generator__result"),
      generateBtn: document.querySelector("#button-generate"),
      copyBtn: document.querySelector("#button-copy"),
      lengthRange: document.querySelector(".password-settings__length-range"),
      lengthValue: document.querySelector(".password-settings__length-value"),
      settingInputs: document.querySelectorAll(".password-settings__check"),
      successCopyEl: document.querySelector(
        ".password-generator__success-copy",
      ),
      langBtns: document.querySelectorAll(".lang-btn"),
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.i18n.updateDOM();
  }

  bindEvents() {
    this.elements.generateBtn.addEventListener("click", () =>
      this.generatePassword(),
    );

    this.elements.copyBtn.addEventListener("click", () => this.copyPassword());

    this.elements.lengthRange.addEventListener("input", (event) => {
      const { value } = event.target;

      this.generator.setLength(value);
      this.elements.lengthValue.textContent = value;
    });

    this.elements.lengthRange.addEventListener("change", () =>
      this.generatePassword(),
    );

    this.elements.settingInputs.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        const { name, checked } = event.target;
        this.generator.setSettings({ [name]: checked });
        this.generatePassword();
      });
    });

    this.elements.langBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.i18n.setLanguage(btn.dataset.lang);
      });
    });
  }

  generatePassword() {
    try {
      const password = this.generator.generate();
      this.elements.passwordResult.textContent = password;
    } catch (e) {}
  }

  async copyPassword() {
    try {
      await navigator.clipboard.writeText(
        this.elements.passwordResult.textContent,
      );
    } catch (error) {
      console.error("Copy error:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});
