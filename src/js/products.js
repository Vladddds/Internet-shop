const $loadBtn = $('#products-load-btn');           // load more button
const $cartButtons = $('[data-action|="cart"]');    // buttons to add product to cart
const $detailsModal = $('#detailsModal');           // modal that called to get details of product
const productProps = {};                            // attributes of product for modals and cart
const $cartCounter = $('#cart-counter');            // counter of items in cart
const $productItems = $('.product-item');           // product cards

let modalCaller = null;                             // button, that called details modal
let $currentProduct = null;                         //
let itemsOnPage = 3;                                // count of product cards on page


$(document).ready(() => {
    // init cart in localStorage
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', '[]')
    }
    // define count of product cards on page
    if ($(window).width() < 768) {
        itemsOnPage = 3
    } else if ($(window).width() < 980) {
        itemsOnPage = 4
    } else itemsOnPage = 9;

    showItems($productItems, itemsOnPage);
    disableButtons();
});


$cartButtons.on('click', (e) => {
    $currentProduct = $(e.target.closest('.product-item ') || $(modalCaller.closest('.product-item')) || $(null));
    // в строке 31 вместо null дописать селектор для элемента в котором указаны атрибуты
    defineProps($currentProduct);
    addToCart(productProps);
    disableButtons();
    $currentProduct.data('purchased', 'true');
    $(e.target).closest('[data-action|="cart"]').prop('disabled', true);
    if (!e.target.classList.contains('null')) {// вместо null класс кнопки из галереи (желательно плюс минус уникальный)
        $(e.target).closest('[data-action|="cart"]').find('span').text('Purchased');
    }
});

$loadBtn.on('click', () => {
    showItems($('.product-item:hidden'), itemsOnPage)

    if ($('.product-item:hidden').length === 0) {
        $loadBtn.remove()
    }
});


// event that fire on every modal call (details modal)
$detailsModal.on('show.bs.modal', (e) => {
    $currentProduct = $(e.relatedTarget).closest('.product-item ');
    modalCaller = $(e.relatedTarget);

    defineProps($currentProduct);
    callDetailsModal(productProps);
});


// adding to localStorage current product
function addToCart(product) {
    const currentCart = JSON.parse(localStorage.getItem('cart'));
    currentCart.push(product);
    localStorage.setItem('cart', JSON.stringify(currentCart));

    $cartCounter.text(+($cartCounter.text()) + 1);
}

// disabling buttons on main page due to items in localStorage
function disableButtons() {
    const localCart = JSON.parse(localStorage.getItem('cart'));
    if (localCart.length) {
        localCart.forEach(item => {
            const $tempProduct = $(`[data-id |= ${item.id.toString()}]`);
            $tempProduct.find('[data-action|="cart"]').prop('disabled', true);
            $tempProduct.find('[data-action|="cart"]').text('Purchased');
            $tempProduct.data('purchased', 'true')
        })
    }
}

// calling modals with defined props
function callDetailsModal({price, name, sale, imgSource, purchased}) {
    const $modalTitle = $('#details-title');
    const $modalSale = $('#details-sale');
    const $modalPrice = $('#details-price');
    const $modalImage = $('#details-modal-image');
    const $modalCartBtn =$('#modal-cart-btn');

    // disabling or resetting previously disabled buttons
    if (purchased === 'true') {
        $modalCartBtn.prop('disabled', true);
        $modalCartBtn.find('span').text('Purchased');
    } else {
        $modalCartBtn.prop('disabled', false);
        $modalCartBtn.find('span').text('Add to cart');
    }

    $modalTitle.text(name);
    $modalSale.text(`${sale ? '$' + sale : ''}`);
    $modalPrice.text(`$${price}`);
    $modalImage.attr('src', imgSource);


}

//defining props of current product
function defineProps(product) {
    productProps.price = product.data('price');
    productProps.name = product.data('name');
    productProps.sale = product.data('sale');
    productProps.imgSource = product.data('src');
    productProps.id = product.data('id');
    productProps.purchased = product.data('purchased');
}

// show cards on page (defined count)
function showItems(items, count) {
    for (let i = 0; i < count; i++) {
        $(items[i]).removeAttr('hidden').fadeIn('slow');
        if (!items[i]) {
            return
        }
    }
}



// countCart

// appendItem
`
<div class = "${Math.random()}">
`
// countPrice



// countSum


