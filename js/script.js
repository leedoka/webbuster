const buyCoffeeButtons = document.querySelectorAll('.btn__to__buy');

const closeModalWindow = document.getElementById('remodal__close');
const modalWindow = document.querySelector('.remodal');

const nameField = document.getElementById('name');
const phoneField = document.getElementById('phone');
const productField = document.getElementById('product-name');

const nameValidation = document.getElementById('validation-message-name');
const phoneValidation = document.getElementById('validation-message-phone');
const productValidation = document.getElementById('validation-message-product');

const submitButton = document.getElementById('my_form_send');

let nameValid = false;
let phoneValid = false;
let productValid = true;

const checkSubmitDisabled = () => {
  if (nameValid && phoneValid && productValid) {
    submitButton.classList.remove('btn-disabled');
  } else {
    submitButton.classList.add('btn-disabled');
  }
};

nameField.addEventListener('input', (() => {
  const value = nameField.value;

  if (!value || value.length < 2) {
    nameValidation.innerText = 'От 2-х букв';
    nameValid = false;
  } else {
    nameValidation.innerText = '';
    nameValid = true;
  }

  checkSubmitDisabled();
}));

phoneField.addEventListener('input', (() => {
  const value = phoneField.value;

  if (!value || value.length !== 11 || !parseInt(value)) {
    phoneValidation.innerText = 'введите 11 цифр';
    phoneValid = false;
  } else {
    phoneValidation.innerText = '';
    phoneValid = true;
  }

  checkSubmitDisabled();
}));

productField.addEventListener('input', (() => {
  const value = productField.value;

  if (!value || value.length < 2) {
    productValidation.innerText = 'От 2-х букв';
    productValid = false;
  } else {
    productValidation.innerText = '';
    productValid = true;
  }

  checkSubmitDisabled();
}));

buyCoffeeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    $('#name').val('');
    $('#phone').val('');
    $('#product-name').val('');

    nameValidation.innerText = '';
    phoneValidation.innerText = '';
    productValidation.innerText = '';

    checkSubmitDisabled();

    const productName = button.dataset.productName;
    productField.value = productName;
    modalWindow.classList.remove('invisible');
  })
})

closeModalWindow.onclick = function () {
  modalWindow.classList.add('invisible');
}

$('#my_form_send').click(function() {
  const form = $('#form');

  let formMessages = $('#remodal_result_form');

  let formData = form.serialize();

  $.ajax({
    type: 'POST',
    url: 'modal_send_form.php',
    data: formData
  })
  .done(function(response) {
    $(formMessages).removeClass('error');
    $(formMessages).addClass('success');

    $(formMessages).text(response);

    $('#name').val('');
    $('#phone').val('');
    $('#product-name').val('');

    setTimeout(() => {
      modalWindow.classList.add('invisible');
    }, 500);
  })
  .fail(function(data) {
    $(formMessages).removeClass('success');
    $(formMessages).addClass('error');

    if (data.responseText !== '') {
      $(formMessages).text(data.responseText);
    } else {
      $(formMessages).text('Oops! An error occured and your message could not be sent.');
    }
  });
});
