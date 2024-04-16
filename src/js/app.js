document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
    scrollNav();
    navegacionFija();
}
function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');


    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
        
    });
   
}
function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click',function(e){
            e.preventDefault();
            const seccionConst = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionConst);
            seccion.scrollIntoView({ behavior: "smooth" });
        });
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    
    for(let i = 1 ; i <= 12 ; i++){
        const imagen = document.createElement('picture'); 
        imagen.innerHTML = `
        <picture>
                <source srcset="build/img/thumb/${i}.avif" type="image/avif" >
                <source srcset="build/img/thumb/${i}.webp" type="image/webp" >
                <img loading = "lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="img ${i}">
        </picture>
        `;
        imagen.onclick= function(){
            mostrarImagen(i);
        }
        
        galeria.appendChild(imagen);
    }
}

function mostrarImagen( i ){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <picture>
            <source srcset="build/img/grande/${i}.avif" type="image/avif" >
            <source srcset="build/img/grande/${i}.webp" type="image/webp" >
            <img loading = "lazy" width="200" height="300" src="build/img/grande/${i}.jpg" alt="img ${i}">
        cture> 
    `;
    //crea el overlay con la img
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    
    //boton para crear el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        body.classList.remove('fijar-body');
        overlay.remove();

    }
    overlay.appendChild(cerrarModal);

    //aniadirlo al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}