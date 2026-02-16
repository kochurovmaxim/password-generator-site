export class PasswordGenerator {
  static CHAR_SETS = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };
  static CHAR_SETS_EXCLUDE = {
    lowercase: "abcdefghijkmnopqrstuvwxyz",
    uppercase: "ABCDEFGHJKLMNPQRSTUVWXYZ",
    numbers: "23456789",
    symbols: "!@#$%^&*()_+-=[]{};:,.<>?",
  };

  constructor() {
    this.settings = {
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      exclude: false,
    };
    this.length = 16;
  }

  setSettings(settings) {
    this.settings = { ...this.settings, ...settings };
  }

  setLength(length) {
    this.length = Math.max(4, Math.min(64, parseInt(length) || 16));
  }

  getAvailableChars() {
    let chars = "";
    if (this.settings.includeLowercase)
      chars += this.settings.exclude
        ? PasswordGenerator.CHAR_SETS_EXCLUDE.lowercase
        : PasswordGenerator.CHAR_SETS.lowercase;
    if (this.settings.includeUppercase)
      chars += this.settings.exclude
        ? PasswordGenerator.CHAR_SETS_EXCLUDE.uppercase
        : PasswordGenerator.CHAR_SETS.uppercase;
    if (this.settings.includeNumbers)
      chars += this.settings.exclude
        ? PasswordGenerator.CHAR_SETS_EXCLUDE.numbers
        : PasswordGenerator.CHAR_SETS.numbers;
    if (this.settings.includeSymbols)
      chars += this.settings.exclude
        ? PasswordGenerator.CHAR_SETS_EXCLUDE.symbols
        : PasswordGenerator.CHAR_SETS.symbols;
    return chars;
  }

  getRequiredCharSets() {
    const sets = [];
    if (this.settings.includeLowercase)
      this.settings.exclude
        ? sets.push(PasswordGenerator.CHAR_SETS_EXCLUDE.lowercase)
        : sets.push(PasswordGenerator.CHAR_SETS.lowercase);
    if (this.settings.includeUppercase)
      this.settings.exclude
        ? sets.push(PasswordGenerator.CHAR_SETS_EXCLUDE.uppercase)
        : sets.push(PasswordGenerator.CHAR_SETS.uppercase);
    if (this.settings.includeNumbers)
      this.settings.exclude
        ? sets.push(PasswordGenerator.CHAR_SETS_EXCLUDE.numbers)
        : sets.push(PasswordGenerator.CHAR_SETS.numbers);
    if (this.settings.includeSymbols)
      this.settings.exclude
        ? sets.push(PasswordGenerator.CHAR_SETS_EXCLUDE.symbols)
        : sets.push(PasswordGenerator.CHAR_SETS.symbols);
    return sets;
  }

  validate() {
    const availableChars = this.getAvailableChars();
    if (availableChars.length === 0) {
      return { valid: false, error: "no_settings" };
    }
    if (this.length < 4) {
      return { valid: false, error: "min_length" };
    }
    return { valid: true };
  }

  generate() {
    const validation = this.validate();
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const requiredSets = this.getRequiredCharSets();
    let password = "";

    requiredSets.forEach((charSet) => {
      const randomIndex = this.getRandomInt(0, charSet.length - 1);
      password += charSet[randomIndex];
    });

    const availableChars = this.getAvailableChars();
    while (password.length < this.length) {
      const randomIndex = this.getRandomInt(0, availableChars.length - 1);
      password += availableChars[randomIndex];
    }

    return this.shuffleString(password);
  }

  getRandomInt(min, max) {
    const range = max - min + 1;
    const randomValues = new Uint32Array(1);
    window.crypto.getRandomValues(randomValues);
    return min + (randomValues[0] % range);
  }

  shuffleString(str) {
    const array = str.split("");
    for (let i = array.length - 1; i > 0; i--) {
      const j = this.getRandomInt(0, i);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
  }
}
