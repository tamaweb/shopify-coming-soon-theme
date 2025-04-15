class NotificationPopup extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
        this.popup = document.querySelector('.not-pu-section');
        this.closeBtn = this.popup.querySelector('.newsletter__close-btn');
        this.hasSubscription = Boolean(this.dataset.hasSubscription === "true");
        this.cookie = document.cookie.includes("hideNotificationPopup=true")
        console.log(this.hasSubscription, this.cookie)
        if(this.hasSubscription || this.cookie) return;

        this.popup.classList.remove('hidden')

        this.closeBtn.addEventListener('click', () => {
            this.popup.classList.add('hidden')
            this.setCookie('hideNotificationPopup', 'true', 7);
        })          
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
}

customElements.define("notification-popup", NotificationPopup);