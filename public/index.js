$(document).ready(function () {
  // banner owl carousel
  $("#banner-area .owl-carousel").owlCarousel({
    dots: true,
    items: 1,
  });

  // top sale owl carousel
  $("#top-sale .owl-carousel").owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });

  // isotope filter
  var $grid = $(".grid").isotope({
    itemSelector: ".grid-item",
    layoutMode: "fitRows",
  });

  // filter items on button click
  $(".button-group").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });
});

function addToCart(product_id) {
  fetch(`/cart/${product_id}`, { method: "POST" })
    .then((response) => response.json())
    .then((data) => window.location.replace("/cart"))
    .catch((e) => {
      alert(e.message);
    });
}

function removeFromCart(cartitem_id) {
  fetch(`/cart/${cartitem_id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => location.reload())
    .catch((e) => {
      console.log(e);
      alert(e.message);
    });
}

function removeOneFromCart(cartitem_id) {
  fetch(`/cart/${cartitem_id}`, { method: "PUT" })
    .then((response) => response.json())
    .then((data) => location.reload())
    .catch((e) => {
      console.log(e);
      alert(e.message);
    });
}
