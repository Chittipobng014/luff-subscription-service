(function () {

    'use strict';

    Omise.setPublicKey('pkey_test_5g2u8v0btb2p6utli1o');

    const billingForm = document.getElementById('billingForm');
    const checkoutForm = document.getElementById('checkout-form')
    checkoutForm.addEventListener('submit', submitHandler, false);

    // Submit handler for checkout form.
    function submitHandler(event) {
        event.preventDefault();

        const cardInformation = {
            name: checkoutForm.nameOnCard.value,
            number: checkoutForm.cardNumber.value,
            expiration_month: checkoutForm.expiryMonth.value,
            expiration_year: checkoutForm.expiryYear.value,
            security_code: checkoutForm.securityCode.value
        };

        const billing = {
            first_name: billingForm.firstName.value,
            last_name: billingForm.lastName.value,
            address_1: billingForm.address1.value,
            address_2: billingForm.address2.value,
            city: billingForm.district.value,
            state: billingForm.province.value,
            postcode: billingForm.zipCode.value,
            country: billingForm.country.value,
            email: billingForm.email.value,
            phone: billingForm.phoneNumber.value
        }

        Omise.createToken('card', cardInformation, function (statusCode, response) {
            console.log(cardInformation)
            if (statusCode === 200) {
                checkoutForm.token.value = response.id;
                checkoutForm.billing.value = JSON.stringify(billing)
                checkoutForm.submit();
            } else {
                console.log(`error`)
            }
        });
    }

})();

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})