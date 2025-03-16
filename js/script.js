// Класс для отдельного элемента корзины
class CartItem {
    constructor(name, price, quantity = 1) {
      this.name = name;
      this.price = price;
      this.quantity = quantity;
    }
  
    getTotal() {
      return this.price * this.quantity;
    }
  }
  
  // Функция для загрузки корзины из localStorage (если есть)
  function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  
  // Класс для корзины
  class ShoppingCart {
    constructor() {
      // Загружаем сохранённые заказы из localStorage или начинаем с пустого массива
      this.items = loadCartFromLocalStorage();
    }
  
    addItem(name, price) {
      const existingItem = this.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push(new CartItem(name, price));
      }
      this.saveCart();
    }
  
    removeItem(name) {
      const existingItem = this.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity <= 0) {
          this.items = this.items.filter(item => item.name !== name);
        }
        this.saveCart();
      }
    }
  
    getTotalSum() {
      return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
    }
  
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  }
  
  // Класс для управления интерфейсом на meni‑page
  class UI {
    constructor() {
      this.shoppingCart = new ShoppingCart();
      this.notificationContainer = document.getElementById('notification-container');
      this.notificationSound = document.getElementById('notification-sound');
      this.cartCountElement = document.getElementById('cart-count');
  
      // Находим все кнопки "Adaugă în coș"
      this.addButtons = document.querySelectorAll('.add-to-cart');
  
      this.initialize();
      this.updateCartCount();
    }
  
    initialize() {
      this.addButtons.forEach(button => {
        button.addEventListener('click', event => {
          const name = button.getAttribute('data-name');
          const price = parseFloat(button.getAttribute('data-price'));
          this.shoppingCart.addItem(name, price);
          this.updateCartCount();
          this.showNotification(`Adăugat: ${name}`, 'success');
        });
      });
    }
  
    updateCartCount() {
      const totalItems = this.shoppingCart.items.reduce((sum, item) => sum + item.quantity, 0);
      this.cartCountElement.textContent = totalItems;
    }
  
    // Метод для отображения уведомлений с звуком и анимацией
    showNotification(message, type) {
      const notification = document.createElement('div');
      notification.className = 'notification';
  
      // Изменяем цвет уведомления в зависимости от типа
      if (type === 'success') {
        notification.style.backgroundColor = '#4caf50';
      } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
      }
  
      notification.textContent = message;
      this.notificationContainer.appendChild(notification);
  
      // Воспроизводим звук уведомления
      if (this.notificationSound) {
        this.notificationSound.currentTime = 0;
        this.notificationSound.play().catch(err => {
          console.error('Eroare la redarea sunetului:', err);
        });
      }
  
      // Удаляем уведомление через 3 секунды
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  }
  
  // Инициализация после загрузки документа
  document.addEventListener('DOMContentLoaded', () => {
    new UI();
  });
  // Добавим обработчик событий сразу после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    const openMapButton = document.getElementById('open-map');
    const mapModal = document.getElementById('map-modal');
  
    // Открыть карту
    openMapButton.addEventListener('click', function() {
      mapModal.style.display = 'flex';
    });
  
    // Закрыть карту
    document.querySelector('.close-btn').addEventListener('click', function() {
      mapModal.style.display = 'none';
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".add-to-cart");
    const notificationContainer = document.getElementById("notification-container");
    const notificationSound = document.getElementById("notification-sound");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const itemName = this.getAttribute("data-name");
            showNotification(`${itemName} a fost adăugat în coș!`);
        });
    });

    function showNotification(message) {
        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.textContent = message;
        notificationContainer.appendChild(notification);

        notificationSound.play();
        
        setTimeout(() => {
            notification.classList.add("fade-out");
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }
});
