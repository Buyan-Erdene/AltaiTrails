// Data model class
class TravelPackage {
    constructor(id, title, location, duration, price, category, month, type, imageUrl) {
      this.id = id;
      this.title = title;
      this.location = location;
      this.duration = duration;
      this.price = price;
      this.category = category;
      this.month = month;
      this.type = type;
      this.imageUrl = imageUrl;
    }
  
    toHTML() {
      return `
        <article data-category="${this.category}" data-month="${this.month}" 
                 data-location="${this.location}" data-type="${this.type}"
                 data-price="${this.price}" data-duration="${this.duration}">
          <a href="aylal.html?id=${this.id}">
            <img src="${this.imageUrl}" alt="${this.title}">
            <h2>${this.title}</h2>
            <p>📍 ${this.location}</p>
            <p>⏳${this.duration} хоног</p>
            <p>💰 ${this.price.toLocaleString()}</p>
          </a>
          <span class="doodheseg">
            <a href="hadgalsan.html" class="heart"><span class="iconheart">🧡</span></a>
            <a href="sags.html"><button>Захиалах</button></a>
          </span>
        </article>
      `;
    }
  }
  
  // Main module for handling travel packages
  const TravelModule = {
    packages: [],
  
    async fetchData() {
      try {
        const response = await fetch('https://api.jsonbin.io/YOUR_BIN_ID/latest');
        const data = await response.json();
        this.packages = data.map(item => new TravelPackage(
          item.id,
          item.title,
          item.location,
          item.duration,
          item.price,
          item.category,
          item.month,
          item.type,
          item.imageUrl
        ));
      } catch (error) {
        console.error('Error fetching travel data:', error);
      }
    },
  
    filterPackages(filters = {}) {
      return this.packages.filter(pkg => {
        if (filters.location && pkg.location !== filters.location) return false;
        if (filters.category && pkg.category !== filters.category) return false;
        if (filters.month && pkg.month !== filters.month) return false;
        if (filters.type && pkg.type !== filters.type) return false;
        if (filters.maxPrice && pkg.price > filters.maxPrice) return false;
        if (filters.maxDuration && pkg.duration > filters.maxDuration) return false;
        return true;
      });
    },
  
    renderPackages(container, filters = {}) {
      const filteredPackages = this.filterPackages(filters);
      container.innerHTML = filteredPackages.map(pkg => pkg.toHTML()).join('');
    },
  
    getUrlParams() {
      const params = new URLSearchParams(window.location.search);
      return {
        location: params.get('location'),
        category: params.get('category'),
        month: params.get('month'),
        type: params.get('type'),
        maxPrice: params.get('maxPrice'),
        maxDuration: params.get('maxDuration')
      };
    }
  };
  
  // Initialize and handle UI updates
  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.aylluud');
    await TravelModule.fetchData();
    
    // Apply URL filters on load
    const urlFilters = TravelModule.getUrlParams();
    TravelModule.renderPackages(container, urlFilters);
  
    // Handle filter changes
    const filterInputs = document.querySelectorAll('select, input[type="range"]');
    filterInputs.forEach(input => {
      input.addEventListener('change', () => {
        const filters = {
          location: document.getElementById('location').value,
          type: document.getElementById('tour-type').value,
          month: document.getElementById('travel-month').value,
          maxPrice: parseInt(document.getElementById('price').value),
          maxDuration: parseInt(document.getElementById('duration').value)
        };
        TravelModule.renderPackages(container, filters);
      });
    });
  });
  
  export default TravelModule;