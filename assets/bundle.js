document.addEventListener('DOMContentLoaded', function () {
    // Get all elements with the class "tag"
    let tagList = document.querySelectorAll('.tag');

    // Loop through each element and add a click event listener
    tagList.forEach(function (tag) {
        tag.addEventListener('click', function () {
            tagList.forEach(function (tag) {
                tag.classList.remove('active');
            });

            // Add the "active" class to the clicked element
            tag.classList.add('active');
            let activeTag = tag.dataset.tag;

            document.querySelector('.bundle-product-list').id = activeTag;


        });
    });
    // Get all product card
    let productCard = document.querySelectorAll('.bundle-col-product-card');
    productCard.forEach(function (card) {
        card.addEventListener('click', function () {
            // Clone the template
            if (!card.classList.contains("active") && document.querySelectorAll('.selected-product-item.empty').length > 0) {



                card.classList.add('active');
                const template = document.querySelector('.product-card-template');
                const clone = document.importNode(template.content, true);

                // Update values
                const productImage = clone.querySelector('.product-image');
                productImage.src = card.querySelector('img').src;  // Set the image source


                // Assuming that you have a title element inside the product card, update accordingly

                clone.querySelector('.product-card').dataset.title = card.querySelector('.product-card_title').textContent;

                // Add event listener to the close icon
                const closeIcon = clone.querySelector('.close-icon');
                closeIcon.addEventListener('click', (e) => {
                    // Your close icon click event handler logic here
                    removeProduct(e);
                });

                // Append the cloned template to the document
                let emptyElement = document.querySelector('.selected-product-item.empty');
                emptyElement.appendChild(clone);
                emptyElement.classList.remove("empty");
                emptyElement.classList.add("active");


                document.querySelector('.selected-product-count').textContent = document.querySelectorAll('.selected-product-item.active').length;
                document.querySelector('.remaining-product-count').textContent = document.querySelectorAll('.selected-product-item.empty').length;
                if (document.querySelectorAll('.selected-product-item.active')?.length == Number(selectionLimit)) {
                    document.querySelector('.custom-submit-btn').disabled = false;
                    document.querySelector('.custom-submit-btn').innerHTML = "Add to Cart"
                }

            } else if (document.querySelectorAll('.selected-product-item.active').length >= Number(selectionLimit)) {
                alert("Max Selection limit is reached");

            }


        });
    });

    function removeProduct(e) {
        let selectedProductCard = e.target.closest('.selected-product-item');
        selectedProductCard.classList.remove('active');
        selectedProductCard.classList.add('empty');
        document.querySelector('.custom-submit-btn').disabled = true;
        document.querySelector('.custom-submit-btn').innerHTML = `<span class= 'remaining-product-count'> ${document.querySelectorAll('.selected-product-item.empty').length} </span> Remaining`

        document.querySelector('.remaining-product-count').textContent = document.querySelectorAll('.selected-product-item.empty').length;
        let productTitle = selectedProductCard.querySelector('.product-card').dataset.title;
        selectedProductCard.querySelector('.product-card').remove();
        productCard.forEach(function (card) {
            if (card.querySelector('.product-card_title').textContent == productTitle) {
                card.querySelector('.product-card_title').closest('.bundle-col-product-card').classList.remove('active')
            }

        });

    }
    document.querySelector('.custom-submit-btn').addEventListener('click', function (e) {
        let selectedBundleProductInputs = document.querySelectorAll('.selected_bundle_product');
        let selectedProducts = document.querySelectorAll('.selected-product-item.active');
        for (let i = 0; i < selectedProducts.length; i++) {
            selectedBundleProductInputs[i].value = selectedProducts[i].querySelector('.product-card').dataset.title;
        }
        e.target.closest('form').submit();



    });
});