{
    const $loginModal = $('#loginModal');
    $loginModal.on('show.bs.modal', function () {
      $('.modal-register__btn-register').on('submit', function () {
          $loginModal.hide();
      })

    });

    const $registerModal = $('#registerModal');
    $registerModal.on('show.bs.modal', function () {
        $('.modal-register__btn-register').on('submit', function () {
            $registerModal.hide();
        })

    })
}