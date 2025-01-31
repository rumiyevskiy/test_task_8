
document.addEventListener("DOMContentLoaded", function () {
 

  
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);  
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);  
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);  
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);  
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);  
    },
    webOS: function () {
      return navigator.userAgent.match(/webOS/i);  
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows() ||
            isMobile.webOS()
        );
    }
  };

  if (isMobile.any()) {
      document.body.classList.add('__touch');

      let menuArrows = document.querySelectorAll('.header__menu__item__arrow');

      if(menuArrows.length>0) {
        for(let i = 0; i < menuArrows.length; i++) {
          const menuArrow = menuArrows[i];
          
          menuArrow.addEventListener('click', function (e) {
            menuArrow.parentElement.classList.toggle('__active');
          });
        }
      };
  } else {
      document.body.classList.add('__pc');
  }
    
// *********************************************************************


  const returnBtn = document.querySelector('.return__btn');

  document.addEventListener('scroll', function () {
      if (scrollY >= 100) {
          returnBtn.classList.remove('hidden');
      }else{
          returnBtn.classList.add('hidden');
      };
  });

  returnBtn.addEventListener('click', function () {
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
      })
  });

  // *********************************************************************
 

  const burgerIcon = document.querySelector('.burger');
  const menuBody = document.querySelector('.header__menu__body');

    if(burgerIcon) {
          burgerIcon.addEventListener('click', () => {
          document.body.classList.toggle('__lock');
          burgerIcon.classList.toggle('__active');
          menuBody.classList.toggle('__active');
        })
    }

  // *********************************************************************
 

  const menuLinks = document.querySelectorAll('[data-goto]');

  if(menuLinks.length > 0){
    menuLinks.forEach(menuLink => {
      menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick (e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
          const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
        
        

          if(burgerIcon.classList.contains('__active')) {
            document.body.classList.remove('__lock');
            burgerIcon.classList.remove('__active');
            menuBody.classList.remove('__active');
          };

          window.scrollTo ({
              top: gotoBlockValue,
              behavior: 'smooth'
          });
          e.preventDefault();

      };
    };
  };

  
  // ***********************************************************************

  const popupLinks = document.querySelectorAll('.popup-link');
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll('.lock-padding');

  let unlock = true;

  const timeout = 300;

  if (popupLinks.length > 0) {
      for (let index = 0; index < popupLinks.length; index++) {
          const popupLink = popupLinks[index];
          popupLink.addEventListener("click", function (e) {
              const popupName = popupLink.getAttribute('href').replace('#', '');
              const curentPopup = document.getElementById(popupName);
 
              popupOpen(curentPopup);
              e.preventDefault();
          });
      }
  };
  
  const popupCloseIcon = document.querySelectorAll('.close-popup');
  if (popupCloseIcon.length > 0) {
      for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];

        el.addEventListener("click", function (e) {
                     
          popupClose(el.closest('.popup'));



              e.preventDefault();
        });
      }
  };

  function popupOpen(curentPopup) {
      if (curentPopup && unlock) {
          const popupActive = document.querySelector('.popup.open');
          if (popupActive) {
              popupClose(popupActive, false);
          } else {
              bodyLock();
          }
          curentPopup.classList.add('open');
          curentPopup.addEventListener("click", function (e) {
              if (!e.target.closest('.popup__content')) {
                  popupClose(e.target.closest('.popup'));
              }
          });
       };
  };

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        


      if (popupActive.querySelector('.full-form')) {
        
        funcSelectReset();
      } else {
          
      }

        popupActive.classList.remove('open');
        
          if (doUnlock) {
              bodyUnLock();
          }
      }
   };
  
  function bodyLock() {
      
      body.classList.add('__lock');

      unlock = false;
      setTimeout(function () {
          unlock = true;
      }, timeout);
  }

  function bodyUnLock() {
      setTimeout(function () {
          
          body.classList.remove('__lock');
      }, timeout);

      unlock = false;
      setTimeout(function () {
          unlock = true;
      }, timeout);
  }

  document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
          const popupActive = document.querySelector('.popup.open');
          popupClose(popupActive);
      }
  })

  window.addEventListener('load', function () {
    setTimeout(function () {
        popupOpen(popup1);
    }, 5000);
  });

  // ***********************************************************************
  
  const page_3 = document.querySelector(".popup__content-page-3");
  const btnResetPage3 = document.querySelector(".popup__content-page-3 button.custom-btn[type=reset]");
  const btnBackPage3 = document.querySelector(".popup__content-page-3 button.custom-btn.back");

  const selectedValues = new Set(); 

  const funcSelectReset = (event) => {

    const mainFormOrder = document.querySelector('.popup3 .full-form');

    selectedValues.clear();
    const inputs = mainFormOrder.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    const optionsForReset = document.querySelectorAll(".popup3 .full-form .option.selected");

    optionsForReset.forEach(opt => {
      opt.classList.remove("selected");
    });

    alert("Всі данні в формі видалені! ");
  
  }
  
  btnResetPage3.addEventListener("click", funcSelectReset);

  



  // *****************************************************************

      async function getCountryByDialCode(dialCode) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/all`);
            const countries = await response.json();

            for (const country of countries) {
                if (country.idd?.root) {
                    const countryCode = country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '');
                    if (dialCode.startsWith(countryCode)) {
                        return country.flags.svg;
                    }
                }
            }
        } catch (error) {
            console.error("Помилка отримання даних:", error);
        }
        return null;
    }

    document.querySelectorAll('.phone-input').forEach(input => {
        input.addEventListener("input", async () => {
            const inputValue = input.value.trim();
            const flagImg = input.closest('.input__container').querySelector('.flag');

            if (inputValue.length < 2) {
                flagImg.style.display = "none";
                return;
            }

            const flagUrl = await getCountryByDialCode(inputValue);
            
            if (flagUrl) {
                flagImg.src = flagUrl;
                flagImg.style.display = "block";
            } else {
                flagImg.style.display = "none";
            }
        });
    });
  // *****************************************************************

  
    
    function digitsCountersInit(digitsCountersItems) {
        let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
        if (digitsCounters) {
            digitsCounters.forEach(digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            });
        }
    }

    function digitsCountersAnimate(digitsCounter) {
        let startTimestamp = null;
        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
        const startValue = parseInt(digitsCounter.innerHTML);
        const startPosition = 0;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);

    }

    let options = {
        threshold: 0.3
    }

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
                if (digitsCountersItems.length) {
                    digitsCountersInit(digitsCountersItems);
                }
            }
        });
    }, options);

    let sections = document.querySelectorAll(".running-numbers .running-numbers__box");
    if (sections.length) {
        sections.forEach(section => {
            observer.observe(section);
        });
    }


  // *****************************************************************

});
  




