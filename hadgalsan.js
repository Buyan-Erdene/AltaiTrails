
    import Baraa from './baraa.js';

    // Function to calculate total price
    function calculateTotalPrice(items) {
      return items.reduce((total, item) => total + item.price, 0);
    }

    // Function to format price with thousand separators
    function formatPrice(price) {
      return price.toLocaleString();
    }

    // Function to update total price display
    function updateTotalPrice(items) {
      const totalPrice = calculateTotalPrice(items);
      document.getElementById('total-price').textContent = formatPrice(totalPrice);
    }

    // Function to render saved items
    function renderHadgalsanItems() {
      const hadgalsanItems = JSON.parse(localStorage.getItem('hadgalsan')) || [];
      const hadgalsanItemsElement = document.getElementById('hadgalsan-items');

      if (hadgalsanItems.length === 0) {
        hadgalsanItemsElement.innerHTML = `<p>Хадгалсан бараа байхгүй байна.</p>`;
        updateTotalPrice([]); // Update total price to 0
      } else {
        hadgalsanItemsElement.innerHTML = hadgalsanItems
          .map(item => new Baraa(item).render())
          .join('');
        updateTotalPrice(hadgalsanItems); // Update total price with current items
      }
    }

    // Function to delete an item
    function deleteItem(itemId) {
      let hadgalsanItems = JSON.parse(localStorage.getItem('hadgalsan')) || [];
      hadgalsanItems = hadgalsanItems.filter(item => item.id.toString() !== itemId.toString());
      localStorage.setItem('hadgalsan', JSON.stringify(hadgalsanItems));
      renderHadgalsanItems(); // This will also update the total price
      alert('Бараа устгагдлаа.');
    }

    // Event delegation for delete buttons
    document.getElementById('hadgalsan-items').addEventListener('click', (event) => {
      if (event.target.classList.contains('ustgahTovch')) {
        const itemId = event.target.dataset.id;
        deleteItem(itemId);
      }
    });

    // Function to delete all items
    document.getElementById('delete-all').addEventListener('click', () => {
      localStorage.removeItem('hadgalsan');
      renderHadgalsanItems(); // This will also update the total price
      alert('Бүх бараа устгагдлаа.');
    });

    // Render saved items when the page loads
    renderHadgalsanItems();