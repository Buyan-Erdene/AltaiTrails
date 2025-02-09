
    import Baraa from './baraa.js';

    function niitUne(items) {
      return items.reduce((total, item) => total + item.price, 0); 
    }

    function taslalNemeh(price) {
      return price.toLocaleString();
    }

    function niitUniigShinechleh(items) {
      const niitune = niitUne(items);
      document.getElementById('total-price').textContent = taslalNemeh(niitune);  
    }

    function renderHadgalsanAylluud() {
      const hadgalsanAylluud = JSON.parse(localStorage.getItem('hadgalsan')) || [];  //localaas duudaj gargah
      const hadgalsanAylalElement = document.getElementById('hadgalsan-items');

      if (hadgalsanAylluud.length === 0) {
        hadgalsanAylalElement.innerHTML = `<p>Хадгалсан бараа байхгүй байна.</p>`;
        niitUniigShinechleh([]);
      } else {
        hadgalsanAylalElement.innerHTML = hadgalsanAylluud
          .map(item => new Baraa(item).render())
          .join('');
        niitUniigShinechleh(hadgalsanAylluud);
      }
    }

    function aylalUstgah(aylal) {
      let hadgalsanAylluud = JSON.parse(localStorage.getItem('hadgalsan')) || [];
      hadgalsanAylluud = hadgalsanAylluud.filter(item => item.id.toString() !== aylal.toString());
      localStorage.setItem('hadgalsan', JSON.stringify(hadgalsanAylluud));
      renderHadgalsanAylluud();
      alert('Бараа устгагдлаа.');
    }

    document.getElementById('hadgalsan-items').addEventListener('click', (event) => { //daragdsan aylliin id oloh
      if (event.target.classList.contains('ustgahTovch')) {
        const aylal = event.target.dataset.id;
        aylalUstgah(aylal);
      }
    });

    document.getElementById('delete-all').addEventListener('click', () => {  //bugdiig ustgah
      localStorage.removeItem('hadgalsan');
      renderHadgalsanAylluud();
      alert('Бүх бараа устгагдлаа.');
    });

    renderHadgalsanAylluud();