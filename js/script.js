document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabContend = document.querySelectorAll('.tabcontent'),
    tabParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabContend.forEach((item) => {
      item.style.display = 'none';
    });
    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabContend[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }
  hideTabContent();
  showTabContent();

  tabParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //timer
  const deadline = '2021-05-09';
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZyro(num) {
    if (num >= 0 && num <= 9) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);
    //setClock('.timer', deadline);

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZyro(t.days);
      hours.innerHTML = getZyro(t.hours);
      minutes.innerHTML = t.minutes;
      seconds.innerHTML = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);
  //end timer
  //modal

  const modal = document.querySelector('.modal'),
    btnTrigger = document.querySelectorAll('[date-modal]');
    //closeModal = document.querySelector('[data-close]');

  function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  btnTrigger.forEach(function (item) {
    item.addEventListener('click', openModal);
  });

  //closeModal.addEventListener('click', closeMod);

  function closeMod() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal||event.target.getAttribute('data-close')=='') {
      closeMod();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.code == 'Escape') {
      closeMod();
    }
  });
  //modal modification

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
  //используем классы для карточек
  class MemuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAN();
    }

    changeToUAN() {
      this.price = +this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = `
      <div class="menu__item">
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle"> ${this.title} </h3> 
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
      </div>
     `;
      this.parent.append(element);
    }
  }
  // const div = new MemuCard();
  // div.render()
  new MemuCard(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    `Меню "Фитнес" - это новый подход к приготовлению блюд:
   больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно
     'новый продукт с оптимальной ценой и высоким качеством!`,
    9,
    '.menu .container'
  ).render();

  new MemuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум"',
    `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и
    качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода
     в ресторан!`,
    15,
    '.menu .container'
  ).render();

  new MemuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное',
    `Меню “Постное” - это тщательный подбор ингредиентов: 
    полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, 
    кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
    12,
    '.menu .container'
  ).render();

  
  //Forms
  const forms = document.querySelectorAll('form'),

 message = {
  loaded:'Загрузка',
  success:'Спасибо, мы с Вами свяжемся',
  failure:'Что-то пошло не так'
};

forms.forEach(item =>{
  postData(item);
});

function postData(form) {
  form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    statusMessage.textContent = message.loaded;
    form.append(statusMessage);

    const xhr = new XMLHttpRequest();
    xhr.open('POST','https://webhook.site/53a5141f-5221-43f4-b299-8a0c0aca7da4');
    xhr.setRequestHeader('Content-type','multipart/form-data','charset=utf-8');

    const formData = new FormData(form);
    xhr.send(formData);
    xhr.addEventListener('load',()=>{
      if (xhr.status === 200){
        console.log(xhr.response);
        showThanksModal(message.success);
        form.reset();
        statusMessage.remove();
      } else {
        showThanksModal(message.failure);
       
      }
    });
    
  });
} 
//модификация модального окна
function showThanksModal(message){
  const prevModalDialog = document.querySelector('.modal__dialog');
  //prevModalDialog.style.display = 'none';
  prevModalDialog.classList.add('hide');
  openModal();

  const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog')
      thanksModal.innerHTML = `
        <div class="mogal__content" > 
          <div class="mogal__title">${message}</div>
          <div class="mogal__close" data-close>&times;</div>
        </div>
      `;

  document.querySelector('.modal').append(thanksModal);
  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    closeMod();
  }, 4000);
}
 //fetch запросы к серверу
 fetch('https://jsonplaceholder.typicode.com/posts',{
   method:'POST',
   body:JSON.stringify({ name:"Alex" }),
   headers:{
    'Content-type':'application/json'
   }
 })
 .then(response => response.json())
 .then(json=>console.log(json));

//end
});

