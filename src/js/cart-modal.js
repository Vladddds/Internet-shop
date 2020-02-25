{
    const cartBtn = document.getElementById('cart-btn');

    class CartSummary {
        static countSummary() {
            const sums = [...document.querySelectorAll('[data-name="item-sum"]')];
            const cartTotal = document.querySelector('[data-name="cart-total"]');
            const total = sums
                .map(elem => +elem.innerText.trim().slice(1))
                .reduce((accum, currentSum) => currentSum + accum, 0);
            cartTotal.innerText = `${total}.00`
        }

    }

    class CartItem {
        constructor({price, name, sale, imgSource}) {
            this.container = document.getElementById('cart-container');
            this.item = this.createItem(price, name, sale, imgSource);
            this.countPrice(this.item, price);
        }

        createItem(price, name, sale, imgSource) {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'cart-item';
            itemWrapper.innerHTML =
                `
              <div class="row">
                <div class="col-12 col-lg-6">
                  <div class="row">
                    <div class="col-6 col-md-5 col-lg-6 pr-0 text-center">
                      <img src= ${imgSource}
                           class="img-fluid cart-item__image"
                           alt="Image">
                    </div>
                    <div class="col-6 col-md-7 col-lg-6 pl-0">
                      <div class="cart-info text-left">
                        <div class="cart-info__name">
                          ${name}
                        </div>
                        <span class="cart-info__sale font-weight-light">
                          ${sale ? '$' + sale : ''} 
                        </span>
                        <span class="cart-info__price bg-dark text-white py-1 px-2">
                         $${price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-6">
                  <div class="row">
                    <div class="col d-none d-md-block col-md-5 d-lg-none"></div>
                    <div class="col-12 col-md-7 col-lg-12 pl-md-0 pl-lg-3">
                      <div class="cart-item-quantity d-flex justify-content-between">
                        <div class="cart-counter d-flex justify-content-between align-items-center">
                        <span class="cart-counter__label mr-3">
                          Quantity:
                        </span>
                          <div class="counter-controls d-flex justify-content-between align-items-center">
                            <input type="text"
                                   class="counter-controls__count border border-dark mr-2"
                                   value="1"
                                   data-name="counter-input">
                            <div class="counter-buttons">
                              <button class="counter-controls__button border border-dark"
                                      data-name="counter-minus">
                                -
                              </button>
                              <button class="counter-controls__button border border-dark"
                                      data-name="counter-plus">
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="cart-item-sum text-center">
                        <span class="cart-item-sum__label d-block text-secondary">
                          Sum
                        </span>
                          <span class="cart-item-sum__summary d-block"
                                data-name="item-sum">
                          $${price}
                        </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
            this.container.append(itemWrapper);
            return itemWrapper
        }

        countPrice(item, price) {
            const inputPrice = item.querySelector('[data-name="counter-input"]');
            const minusBtn = item.querySelector('[data-name="counter-minus"]');
            const plusBtn = item.querySelector('[data-name="counter-plus"]');
            const sum = item.querySelector('[data-name="item-sum"]');


            minusBtn.addEventListener('click', () => {
                if (inputPrice.value <= 1) {
                    return
                }
                inputPrice.value--;
                sum.innerText = `$${inputPrice.value * price}.00`;
                CartSummary.countSummary();
            });

            plusBtn.addEventListener('click', () => {
                inputPrice.value++;
                sum.innerText = `$${inputPrice.value * price}.00`;
                CartSummary.countSummary();
            })
        }
    }

    window.addEventListener('load', () => {
        updateCounter();
        renderCart();
    });

    cartBtn.addEventListener('click', () => {
        renderCart();
    });

    function renderCart() {
        document.getElementById('cart-container').innerHTML = '';
        JSON.parse(localStorage.getItem('cart')).forEach(props => {
            new CartItem(props)
        });

        CartSummary.countSummary()
    }

    function updateCounter() {
        const counter = document.getElementById('cart-counter');
        counter.innerText = JSON.parse(localStorage.getItem('cart')).length
    }
}


// {
//
//     const $cartModal = $('#cartModal');
//     $cartModal.on('show.bs.modal', function () {
//         $('.divan').remove();
//         let $cartBodyText = $('.modal-cart__body-text');
//         console.log($cartBodyText);
//         let $cartItems = JSON.parse(localStorage.getItem('cart'));
//         if ($cartItems.length > 0) {
//             $cartBodyText.remove();
//         }
//         $('.cart-element-wrapper').remove();
//
//         $cartItems.forEach(function (cartElem) {
//
//             let cartElementWrapper = $('<div>', {
//                 class: 'cart-element-wrapper'
//             });
//
//             $(cartElementWrapper).appendTo('.modal-cart__body');
//
//             let cartElement = $('<div>', {
//                 class: 'cart-element d-flex justify-content-between'
//             });
//             $(cartElement).appendTo(cartElementWrapper);
//
//             let imgWrapper = $('<div>', {
//                 class: 'cart-element__image-wrapper'
//             });
//
//             $(imgWrapper).appendTo(cartElement);
//
//             let imgCartElement = $('<img>', {
//                 class: 'cart-element__image',
//                 src: cartElem.imgSource,
//                 alt: cartElem.name
//             });
//
//             $(imgCartElement).appendTo(imgWrapper);
//
//             let infoWrapper = $('<div>', {
//                 class: 'cart-element__info-wrapper d-flex flex-column align-items-left'
//             });
//             $(infoWrapper).appendTo(cartElement);
//
//             let cartElementHeading = $('<span>', {
//                 class: 'cart-element__heading text-dark mb-2 font-weight-bold text-left',
//                 text: cartElem.name
//             });
//             $(cartElementHeading).appendTo(infoWrapper);
//
//             let cartElementSale = $('<span>', {
//                 class: 'cart-element__sale text-secondary text-left',
//             });
//             $(cartElementSale).appendTo(infoWrapper);
//
//             let strikeTrough = $('<del>', {
//                 text: cartElem.sale
//             });
//             $(strikeTrough).appendTo(cartElementSale);
//
//
//             let cartElementPrice = $('<span>', {
//                 class: 'cart-element__price bg-dark text-white px-1 py-1 text-center',
//                 text: cartElem.price
//             });
//             $(cartElementPrice).appendTo(infoWrapper);
//
//             let countWrapper = $('<div>', {
//                 class: 'cart-element__count-wrapper d-flex justify-content-between'
//             });
//             $(countWrapper).appendTo(cartElementWrapper);
//
//             let quantityWrapper = $('<div class="cart-element__quantity-wrapper d-flex flex-column align-items-start"></div>');
//             $(quantityWrapper).appendTo(countWrapper);
//
//             let quantityLable = $('<span class="cart-element__quantity-lable">Quantity:</span>');
//             $(quantityLable).appendTo(quantityWrapper);
//
//             let quantity = $('<div class="cart-element__quantity">' +
//                 '<input class="cart-element__quantity-input" type="number" value="1">' +
//                 '<button class="cart-element__button cart-element__button--subtract" type="button">-</button>' +
//                 '<button class="cart-element__button cart-element__button--add" type="button">+</button>' +
//                 '</div>');
//             $(quantity).appendTo(quantityWrapper);
//
//             let quantitySum = $('<div class="cart-element__quantity-sum d-flex flex-column">' +
//                 '<span class="cart-element__sum-lable">Sum</span>' +
//                 '<span class="cart-element__sum">$<span class="cart-element__sum-number"></span></span>' +
//                 '</div>');
//
//
//             $(quantitySum).appendTo(countWrapper);
//             $('.cart-element__sum-number').text(cartElem.price);
//
//         });
//
//         let totalNumber = $('.modal-cart__total-number');
//         console.log(totalNumber);
//         let total = 0;
//         [...$('.cart-element__sum-number')].forEach(function (elemNum) {
//             let summed = +(elemNum.innerText);
//             console.log(summed);
//             total = total + summed;
//             console.log(total);
//         });
//         $(totalNumber).text(total);
//
//
//         let elemSum = [...$('.cart-element__sum-number')];
//         let price = $('.cart-element__price').text();
//         console.log(price);
//
//         let qtyInput = $('.cart-element__quantity-input');
//
//         let qtyInputValue = qtyInput.val();
//
//         $(qtyInput).blur(function () {
//             if (qtyInput.val() > 1) {
//                 // qtyInputValue = $(qtyInput).val();
//                 console.log(qtyInput.val());
//                 let sum = $(qtyInput).val() * price;
//                 console.log(sum);
//                 $(elemSum).text(sum);
//
//                 let totalNumber = $('.modal-cart__total-number');
//                 console.log(totalNumber);
//                 let total = 0;
//                 [...$(elemSum)].forEach(function (elemNum) {
//                     let summed = +(elemNum.innerText);
//                     console.log(summed);
//                     total = total + summed;
//                     console.log(total);
//                 });
//                 $(totalNumber).text(total);
//
//             } else {
//                 qtyInputValue = 1;
//                 $(qtyInput).val('1');
//                 $(elemSum).text(price);
//             }
//         });
//
//         let btnSubtract = $('.cart-element__button--subtract');
//
//         $(btnSubtract).on('click', function () {
//             if (qtyInputValue > 1) {
//                 $(qtyInput).val(--qtyInputValue);
//                 console.log($(qtyInput).val());
//                 let sum = $(qtyInput).val() * price;
//                 console.log(sum);
//                 $(elemSum).text(sum);
//
//                 let totalNumber = $('.modal-cart__total-number');
//                 console.log(totalNumber);
//                 let total = 0;
//                 [...$(elemSum)].forEach(function (elemNum) {
//                     let summed = +(elemNum.innerText);
//                     console.log(summed);
//                     total = total + summed;
//                     console.log(total);
//                 });
//                 $(totalNumber).text(total);
//
//             } else {
//                 $(qtyInput).val('1');
//                 $(elemSum).text(price);
//             }
//         });
//
//         let btnAdd = $('.cart-element__button--add');
//
//         $(btnAdd).on('click', function () {
//             $(qtyInput).val(++qtyInputValue);
//             let sum = $(qtyInput).val() * price;
//             $(elemSum).text(sum);
//
//             let totalNumber = $('.modal-cart__total-number');
//             console.log(totalNumber);
//             let total = 0;
//             [...$(elemSum)].forEach(function (elemNum) {
//                 let summed = +(elemNum.innerText);
//                 console.log(summed);
//                 total = total + summed;
//                 console.log(total);
//             });
//             $(totalNumber).text(total);
//         });
//
//
//
//         console.log($cartItems);
//
//     });
//
//     //
//     // let elemSum = [...$('.cart-element__sum-number')];
//     // let price = $('.cart-element__price').text();
//     // console.log(price);
//     //
//     // let qtyInput = $('.cart-element__quantity-input');
//     //
//     // let qtyInputValue = qtyInput.val();
//     //
//     // $(qtyInput).blur(function () {
//     //     if (qtyInput.val() > 1) {
//     //         // qtyInputValue = $(qtyInput).val();
//     //         console.log(qtyInput.val());
//     //         let sum = $(qtyInput).val() * price;
//     //         console.log(sum);
//     //         $(elemSum).text(sum);
//     //
//     //         let totalNumber = $('.modal-cart__total-number');
//     //         console.log(totalNumber);
//     //         let total = 0;
//     //         [...$(elemSum)].forEach(function (elemNum) {
//     //             let summed = +(elemNum.innerText);
//     //             console.log(summed);
//     //             total = total + summed;
//     //             console.log(total);
//     //         });
//     //         $(totalNumber).text(total);
//     //
//     //     } else {
//     //         qtyInputValue = 1;
//     //         $(qtyInput).val('1');
//     //         $(elemSum).text(price);
//     //     }
//     // });
//     //
//     // let btnSubtract = $('.cart-element__button--subtract');
//     //
//     // $(btnSubtract).on('click', function () {
//     //     if (qtyInputValue > 1) {
//     //         $(qtyInput).val(--qtyInputValue);
//     //         console.log($(qtyInput).val());
//     //         let sum = $(qtyInput).val() * price;
//     //         console.log(sum);
//     //         $(elemSum).text(sum);
//     //
//     //         let totalNumber = $('.modal-cart__total-number');
//     //         console.log(totalNumber);
//     //         let total = 0;
//     //         [...$(elemSum)].forEach(function (elemNum) {
//     //             let summed = +(elemNum.innerText);
//     //             console.log(summed);
//     //             total = total + summed;
//     //             console.log(total);
//     //         });
//     //         $(totalNumber).text(total);
//     //
//     //     } else {
//     //         $(qtyInput).val('1');
//     //         $(elemSum).text(price);
//     //     }
//     // });
//     //
//     // let btnAdd = $('.cart-element__button--add');
//     //
//     // $(btnAdd).on('click', function () {
//     //     $(qtyInput).val(++qtyInputValue);
//     //     let sum = $(qtyInput).val() * price;
//     //     $(elemSum).text(sum);
//     //
//     //     let totalNumber = $('.modal-cart__total-number');
//     //     console.log(totalNumber);
//     //     let total = 0;
//     //     [...$(elemSum)].forEach(function (elemNum) {
//     //         let summed = +(elemNum.innerText);
//     //         console.log(summed);
//     //         total = total + summed;
//     //         console.log(total);
//     //     });
//     //     $(totalNumber).text(total);
//     // });
//
//
// }