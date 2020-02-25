// {
//     const $detailsModal = $('#detailsModal');
//     const $detailsCartBtn = $('#details-cart-btn');
//     const productProps = {};
//     const $cartCounter = $('#cart-counter');
//     let $currentProduct = null;
//     $detailsModal.on('show.bs.modal', (e) => {
//         $currentProduct = $(e.relatedTarget).closest('.product-item ');
//         productProps.price = $currentProduct.data('price');
//         productProps.name = $currentProduct.data('name');
//         productProps.sale = $currentProduct.data('sale');
//         productProps.imgSource = $currentProduct.data('src');
//         productProps.id = $currentProduct.data('id');
//         productProps.purchased = $currentProduct.data('purchased');
//
//         const $modalTitle = $('#details-title');
//         const $modalSale = $('#details-sale');
//         const $modalPrice = $('#details-price');
//         const $modalImage = $('#details-modal-image');
//
//         $modalTitle.text(productProps.name);
//         $modalSale.text(`${productProps.sale ? '$' + productProps.sale : ''}`);
//         $modalPrice.text(`$${productProps.price}`);
//         $modalImage.attr('src', productProps.imgSource);
//
//         if (productProps.purchased === 'true') {
//             $detailsCartBtn.prop('disabled', true);
//             $detailsCartBtn.find('span').text('Purchased');
//         } else {
//             $detailsCartBtn.prop('disabled', false);
//             $detailsCartBtn.find('span').text('Add to cart');
//         }
//     });
//
//     $detailsCartBtn.on('click', () => {
//         const currentCart = JSON.parse(localStorage.getItem('cart'));
//         currentCart.push(productProps);
//         localStorage.setItem('cart', JSON.stringify(currentCart));
//         $detailsCartBtn.prop('disabled', true);
//         $detailsCartBtn.find('span').text('Purchased');
//
//         $currentProduct.find('[data-action|="cart"]').prop('disabled', true);
//         $currentProduct.find('[data-action|="cart"]').text('Purchased');
//
//
//         $cartCounter.text(+($cartCounter.text()) + 1);
//     });
// }