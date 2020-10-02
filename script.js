(function(){
    let img, imgResult, cx ,cy, lens;
    img = document.querySelector('.img');
    imgResult = document.querySelector('.img-result');

    // Buat lens
    lens = document.createElement('div');
    lens.classList.add('lens');
    img.parentElement.insertBefore(lens, img)


    // Hitung rasio
    cx = img.offsetWidth / lens.offsetWidth;
    cy = img.offsetHeight / lens.offsetHeight;
    

    // Set img result
    imgResult.style.backgroundImage = `url(${img.src})`;
    imgResult.style.backgroundSize = `${img.offsetWidth * cx}px ${img.offsetHeight * cy}px`

    // Beri event
    img.addEventListener('mousemove' , zoom);
    lens.addEventListener('mousemove' , zoom)


    // Buat fungsi untuk menghitung posisi
    function zoom (event) {
        let pos, x, y, padding;
        event.preventDefault();

        // Ambil nilai dari batas
        pos = getCursor(event);
        

        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        console.log(`x: ${x}, posX: ${pos.x}`)
        // Check supaya jangan sampai keluar
        if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;};
        if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;};
        if( x < 0) x = 0;
        if( y < 0) y = 0;

        // Tambahkan dengan nilai padding
        padding = window.getComputedStyle(img.parentElement, null).getPropertyValue('padding');
        padding = Number (padding.slice(0, padding.length -2));


        // Terapkan
        lens.style.left = `${x + padding}px`;
        lens.style.top = `${y + padding}px`;
        imgResult.style.backgroundPosition = `-${x*cx}px -${y*cy}px`;
    };
    
    function getCursor(event){
        let a, x = 0, y = 0;

        // Jaga jaga jika event tidak ada
        event = event || window.event;
        
        // Ambil nilai 
        a = img.getBoundingClientRect();
        
        // Hitung agar tidak keluar jalur
        x = (event.pageX - a.left) - window.pageXOffset;
        y = (event.pageY - a.top) - window.pageYOffset;
  

        // Kembalikan nilai hasil 
        return {x,y}

    }

})()