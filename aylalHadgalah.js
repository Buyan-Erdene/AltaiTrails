
    import Aylluud, { loadData } from './aylalUusgeh.js';

    // Global function to handle adding products
    window.addProduct = (productId) => {
      // Find the product in the data
      const product = window.productData.find(item => item.id === productId);

      if (product) {
        // Save the product to local storage
        const hadgalsanItems = JSON.parse(localStorage.getItem('hadgalsan')) || [];
        if (!hadgalsanItems.some(item => item.id === productId)) {
          hadgalsanItems.push(product);
          localStorage.setItem('hadgalsan', JSON.stringify(hadgalsanItems));
          alert('Амжилттай хадгаллаа!');

          // Redirect to hadgalsan.html
          window.location.href = 'hadgalsan.html';
        } else {
          alert('Энэ бараа аль хэдийн хадгалагдсан байна.');
        }
      }
    };

    async function initialize() {
      // Load data from the API
      const data = await loadData();
      window.productData = data; // Store data globally for access in addProduct

      // Create an instance of Aylluud and render the products
      const aylluud = new Aylluud({ id: 'products', record: data });
      document.getElementById('aylluud').innerHTML = aylluud.render();
    }

    // Initialize the page
    initialize();