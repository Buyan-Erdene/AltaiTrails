
    import Aylluud, { loadData } from 'aylalUusgeh.js';

    window.addHadgalsan = (productId) => {   //hadgalah tovch darah uyd
      const aylal = window.productData.find(item => item.id === productId);  //daragdsan ite iin id g avna

      if (aylal) {
        const hadgalsanAylluud = JSON.parse(localStorage.getItem('hadgalsan')) || [];  //local storage oos hadgalsan aylluudiig json helbereer avna
        if (!hadgalsanAylluud.some(item => item.id === productId)) {  //aylal omno ni hadgalagdsan esehiig shalgana
          hadgalsanAylluud.push(aylal); //hadgalagdaagu bol local ruu nemj json helbereer hadgalna
          localStorage.setItem('hadgalsan', JSON.stringify(hadgalsanAylluud));
          alert('Амжилттай хадгаллаа!');
          window.location.href = 'hadgalsan.html';
        } else {
          alert('Энэ бараа аль хэдийн хадгалагдсан байна.');
        }
      }
    };

    async function initialize() {  //data tatah
      const data = await loadData();
      window.productData = data;  //ogogdliig hadgalna
      const aylluud = new Aylluud({ id: 'products', record: data });  //shine aylluud object uusgene
      document.getElementById('aylluud').innerHTML = aylluud.render();  //aylluud id tai element dotor renderlej hiine
    }
    initialize(); //duudah