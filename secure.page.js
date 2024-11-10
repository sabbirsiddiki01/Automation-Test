class SecurePage {
    /**
     * define selectors using getter methods
     */
    get flashAlert() {
        return $('.error-message-container');
    }

    /**
     * a method to encapsulate automation code to interact with the page
     * e.g. to get the text of the flash alert
     */
    async getFlashAlertText() {
        return this.flashAlert.getText();
    }
}

export default new SecurePage();
