
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("cart")) || []; 
        this.subscribers = []; // Төлөвийн өөрчлөлтийг мэдэх хэрэгтэй компонентууд
    }

    // Барааг сагсанд нэмэх
    addItem(itemId) {
        if (!this.cart.includes(itemId)) {
            this.cart.push(itemId);
            this.saveToLocalStorage();
            this.notifySubscribers();
            return true; // Барааг нэмсэн
        }
        return false; // Бараа аль хэдийн сагсанд байна
    }

    // Барааг сагснаас хасах
    removeItem(itemId) {
        const index = this.cart.indexOf(itemId);
        if (index !== -1) {
            this.cart.splice(index, 1);
            this.saveToLocalStorage();
            this.notifySubscribers();
            return true; // Барааг хассан
        }
        return false; // Бараа сагсанд байхгүй байна
    }

    // Сагсанд байгаа барааны тоог авах
    getCount() {
        return this.cart.length;
    }

    // Сагсны өгөгдлийг LocalStorage-д хадгалах
    saveToLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    // Төлөв өөрчлөгдөхөд бүртгэлтэй компонентуудад мэдэгдэх
    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.cart));
    }

    //өөрчлөлтийг авах
    subscribe(callback) {
        this.subscribers.push(callback);
    }
}

const cartManager = new CartManager();