
    //Variables and query selectors
    const options = {
        root: null,
        threshold: 0.5,
        margin: '0px'
    };

    const contacts = document.querySelectorAll('.contact-wrapper'); 

    const cvText = document.querySelectorAll('.text-content');

    const lightboxContainer = document.querySelector('.lightbox-container');

    const certificates = document.querySelectorAll('.certificate');

    const comparisonSlider = document.querySelector('input[type=range]');
    const comparisonImg = document.querySelector('.img-comparison img:last-child')



    //Methods

    const endPreload = () => {
        const preload = document.querySelector('.preload');
        const preloadCircle = preload.querySelector('.circle');

        preloadCircle.style.scale = '0';

        setTimeout( () => {
            preload.style.display = 'none';
            showHeaderContent();
            contactsSlideOut();
        }, 1000);
    }

    const showHeaderContent = () => {
        const headerContent = document.querySelector('.intro-content');
        headerContent.classList.add('active');
    }

    const contactsSlideOut = () => {
        let leftDistance = parseInt( document.querySelector('.contacts').dataset.left );
        let topDistance = document.querySelector('.contacts').dataset.top;

        setTimeout( () => {
            contacts.forEach( contact => {
                contact.style.transform = `translate(${leftDistance}vmin, ${topDistance}vmin)`;
                leftDistance += 11;
            });
        }, 500);
    }


    const animateCvTitles = (id) => {
        const titles = document.querySelectorAll('.cv-titles h2');

        titles.forEach(title => {
            title.classList.remove('active');
        })

        titles[id].classList.add('active');
    }


    const animateCvGraphics = (id) => {
        const graphic = document.querySelector('.graphics-row');
        const distance = -100 * id;

        graphic.style.transform = `translateX(${distance}%)`; 
    }


    const animateCvComponents = (cvText, observer) => {
      
        cvText.forEach(text => {
          
            if(text.isIntersecting) {
                let id = text.target.dataset.id;

                animateCvTitles(id);
                animateCvGraphics(id);
            }
        });
    }


    const observer = new IntersectionObserver(animateCvComponents, options);


    const displayInLightbox = (image) => {
        const lightboxImg = lightboxContainer.querySelector('img');

        lightboxContainer.classList.add('active');
        lightboxImg.src = image.target.dataset.imagesrc;
    }
    
    const clipImg = () => {
        let sliderVal = comparisonSlider.value;
        comparisonImg.style.clipPath = `inset(0 0 0 ${sliderVal}%)`;
    }



    //Initialisations and Event Listeners

    window.addEventListener('load', () => {

        setTimeout(() => { 
            endPreload();
        }, 1000);

    });


    contacts.forEach(contact => {
        const contactIcon = contact.querySelector('i');
        const contactInfo = contact.querySelector('.contact-info');

        contactIcon.addEventListener('click', () => contactInfo.classList.toggle('active'));
    });


    cvText.forEach( text => { observer.observe(text) });


    certificates.forEach(certificate => {
        certificate.addEventListener('click', displayInLightbox);
    });


    lightboxContainer.addEventListener(
        'click', () => lightboxContainer.classList.remove('active')
    );

    
    comparisonSlider.oninput = () => clipImg();