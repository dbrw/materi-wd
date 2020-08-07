/**
 * javascript umumnya digunakan untuk memanipulasi DOM (elemen html)
 * baris di bawah ini artinya variabel mainNavLinks berisi semua elemen
 * <a> yang merupakan anak dari <li> yang adalah anak dari elemen berkelas navigasi
 */
let mainNavLinks = document.querySelectorAll(".navigasi li a");
let mainSections = document.querySelectorAll("main article");

/**
 * event listener adalah fungsi yang dijalankan waktu terjadi sebuah event, dalam hal ini,
 * fungsi throttle akan dipanggil saat jendela browser di-scroll. fungsi throttle sendiri
 * nantinya akan memanggil fungsi cekNavYangAktif untuk menentukan navigasi mana yang aktif
 * pada posisi jendela browser saat ini.
 */
window.addEventListener("scroll", throttle(cekNavYangAktif, 100));

function cekNavYangAktif(event) {
  let fromTop = window.scrollY; // mendapatkan nilai scroll dari atas halaman (mis. jika jendela di-scroll 100px dari atas halaman, maka variabel ini bernilai 100)
  let mainTop = document.querySelector("main").offsetTop;
  let tinggiNav = document.querySelector(".navigasi").offsetTop;

  mainNavLinks.forEach(link => {
    let article = document.querySelector(link.hash);
    let batasAtasArticle = article.offsetTop + mainTop - 40;
    let batasBawahArticle = batasAtasArticle + article.offsetHeight;

    if (
       batasAtasArticle <= fromTop &&
        batasBawahArticle > fromTop
    ) {
      link.parentElement.classList.add("active");
    } else {
      link.parentElement.classList.remove("active");
    }
  });
}

/**
 * fungsi ini digunakan untk membatasi jumlah pemanggilan fungsi sehingga mengurangi beban CPU.
 * tanpa fungsi ini, fungsi cekNavYangAktif bisa dipanggil beratus kali tiap detik jika CPU
 * cukup cepat.
 */
function throttle(callback, limit) {
  let wait = false;
  return function() {
    if(!wait) {
      callback.call();
      wait = true;
      window.setTimeout(function() {
        wait = false;
      }, limit);
    }
  };
}

/**
 * fungsi di bawah ini adalah untuk menentukan di mana letak kursor saat melakukan
 * klik pada tombol navigasi sehingga membuat efek ripple menjadi lebih nyata
 */
let Buttons = {
  init: function() {
    let btns = document.querySelectorAll('.navigasi-link');
    // animasi dengan js
    let onMouseDown = function(event) {
      let scrollTop = document.body.scrollTop;
      let position = Buttons.getPosition(this);
      let x = event.pageX - position.left;
      let y = event.pageY - position.top - scrollTop;
      Buttons.onclick(this, x, y);
    };

    for(i = 0; i < btns.length; i++) {
      btns[i].onmousedown = onMouseDown;
    }
    console.log(btns);
  },
  onclick: function(self, x, y) {
    self.setAttribute("style", "--koord-x: " + x + "px;--koord-y: " + y + "px;" );
    self.classList.add('animate');
    window.setTimeout(function(){
      self.classList.remove('animate');
    }, 400);
  },
  getPosition: function(el) {
    let x = 0;
    let y = 0;
    while ( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop )) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return {top: y, left: x};
  }
};

Buttons.init();
