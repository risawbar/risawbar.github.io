document.addEventListener('DOMContentLoaded', function () {
    const belum = document.getElementById('belum');
    const sudah = document.getElementById('sudah');

    belum.addEventListener('click', function (e) {
        e.preventDefault();
        tambahBelum();
        
    });

    sudah.addEventListener('click', function(e) {
        e.preventDefault();
        tambahSudah();
    })

    const arrIsi = [];
    const CUST = 'custom'

    function buatObj(id, title, author, year, isComplete) {
        return {
            id,
            title,
            author,
            year,
            isComplete
        }

    }

    

    function generateId() {
        return +new Date();
    }

    function tambahBelum() {
    const judul = document.getElementById('inputNama').value
    const penulis = document.getElementById('inputPenulis').value
    const tahun = parseInt(document.getElementById('inputTahun').value)
    const buatId = generateId();
    const isiObj = buatObj(buatId, judul, penulis, tahun, false);
    arrIsi.push(isiObj);
    document.dispatchEvent(new Event(CUST));
    simpanData();

    }

    function tambahSudah() {
    const judul = document.getElementById('inputNama').value
    const penulis = document.getElementById('inputPenulis').value
    const tahun = document.getElementById('inputTahun').value
    const buatId = generateId();
    const isiObj = buatObj(buatId, judul, penulis, tahun, true);
    arrIsi.push(isiObj);
    document.dispatchEvent(new Event(CUST))
    simpanData();
    }


    document.addEventListener(CUST, function() {
        const bbaca = document.getElementById('list-belum');
        const sbaca = document.getElementById('list-sudah');
        bbaca.innerText = "";
        sbaca.innerText = "";


        for(let i of arrIsi) {
            const aitem = buatBaca(i);
        
            if(!i.isComplete) {
                bbaca.append(aitem);
            } else {
                sbaca.append(aitem);
            }
    
        }
    });

    function buatBaca(isiObj) {
        
        const textJudul = document.createElement('h1');
        textJudul.innerText = "Judul : " + isiObj.title.toUpperCase();

        const garis = document.createElement('hr');

        const textPenulis = document.createElement('p');
        textPenulis.innerText = "Penulis : " + isiObj.author;

        const textTahun = document.createElement('p');
        textTahun.innerText = "Tahun : " + isiObj.year;

        const container = document.createElement('div');
        container.classList.add('inner');
        container.append(textJudul, garis, textPenulis, textTahun);
        container.setAttribute('id', `no-${isiObj.id}`);

        if(isiObj.isComplete) {
            const tomBelum = document.createElement('button');
            tomBelum.classList.add('tombol-belum');
            tomBelum.innerText = "Belum Dibaca";
            tomBelum.addEventListener('click', function() {
                keBelum(isiObj.id);
            });

            const tomHapus = document.createElement('button');
            tomHapus.classList.add('tombol-hapus')
            tomHapus.innerText = "Hapus Buku";
            tomHapus.addEventListener('click', function() {
                keHapus(isiObj.id);         
            })

            container.append(tomBelum, tomHapus);

        } else {
            const tomSudah = document.createElement('button');
            tomSudah.classList.add('tombol-sudah');
            tomSudah.innerText = "Sudah Dibaca"
            tomSudah.addEventListener('click', function() {
                keSudah(isiObj.id);
            });

            const tomHapus = document.createElement('button');
            tomHapus.classList.add('tombol-hapus')
            tomHapus.innerText = "Hapus Buku";
            tomHapus.addEventListener('click', function() {
                keHapus(isiObj.id);         
            })

            container.append(tomSudah, tomHapus);
        }

        function keSudah(bukuId) {
            const target = temukanId(bukuId)
            if(target == null) return;

            target.isComplete = true;
            document.dispatchEvent(new Event(CUST));
            simpanData();
        }

        function keBelum(bukuId) {
            const target2 = temukanId(bukuId)
            target2.isComplete = false;
            document.dispatchEvent(new Event(CUST));
            simpanData();
            
        }

        function keHapus(bukuId) {
            const target3 = temukanIdx(bukuId)
            arrIsi.splice(target3, 1);
            document.dispatchEvent(new Event(CUST));
            simpanData();
            
        }

        function temukanIdx(todoId) {
            for(const olla of arrIsi) {
                if(olla.id === todoId) {
                    return olla;
                }
            }
            return -1;
        }


        function temukanId(bukuId) {
            for(item of arrIsi) {
                if(item.id === bukuId) {
                    return item
                }
            }

            return null
        }
        
        return container;
    }


    function simpanData() {
        if (isStorageExist()) {
          const parsed = JSON.stringify(arrIsi);
          localStorage.setItem(STORAGE_KEY, parsed);
          document.dispatchEvent(new Event(SAVED));
        }
      }
      const SAVED = 'simpan';
      const STORAGE_KEY = 'localStrg';

      function isStorageExist() {
        if (typeof (Storage) === undefined) {
          alert('Browser tidak mendukung local storage');
          return false;
        }
        return true;
      }

      function loadDataFromStorage() {
        const serializedData = localStorage.getItem(STORAGE_KEY);
        let data = JSON.parse(serializedData);
       
        if (data !== null) {
          for (const todo of data) {
            arrIsi.push(todo);
          }
        }
       
        document.dispatchEvent(new Event(CUST));
      }

      if (isStorageExist()) {
        loadDataFromStorage();
      }
    
   
})