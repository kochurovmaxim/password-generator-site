export class Notification {
  constructor() {
    this.container = document.createElement("div");
    this.container.className = "notification-container";
    document.document.querySelector("main").appendChild(this.container);
  }

  show(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    this.container.appendChild(notification);

    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 2500);
  }

  success(message) {
    this.show(message, "success");
  }

  error(message) {
    this.show(message, "error");
  }
}
