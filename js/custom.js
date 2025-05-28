 // Product slider js
 $(".banner_slider").slick({
  dots: false,
  infinite: true,
  arrows: false,
  autoplay: true,
  fade: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1399,
      settings: {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 991,
      settings: {
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        dots: false,
        arrows: false,
        slidesToScroll: 1
      }
    }
  ]
});

 
 
 // Product slider js
 $(".category-slider").slick({
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    fade: false,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [{
        breakpoint: 1399,
        settings: {
          dots: false,
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 991,
        settings: {
          dots: false,
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          dots: false,
          arrows: false,
          slidesToScroll: 1
        }
      }
    ]
  });

 // Product tab area
  $(document).ready(function() {
    $('.tabs li').click(function() {
      var tab_id = $(this).attr('data-tab');
      $('.tabs li').removeClass('current');
      $('.tab-content').removeClass('current');
      $(this).addClass('current');
      $("#" + tab_id).addClass('current');
    })
  });

 // Shrink header 
  $(document).ready(function() {
    $(window).scroll(function() {
      if ($(document).scrollTop() > 270) {
        $(".menu-area").addClass("shrink")
      } else {
        $(".menu-area").removeClass("shrink")
      }
    });
  });


  let lastScrollTop = 0;
  const header = document.getElementById("custom-header");
  
  window.addEventListener("scroll", function() {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
      if (currentScroll > lastScrollTop) {
          // Downscroll
          header.style.top = "-150px"; // Hide header on downscroll
      } else {
          // Upscroll
          header.style.top = "0"; // Show header on upscroll
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  }, false);
  

  //Product Increase and Decrease
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('plus') || e.target.classList.contains('minus')) {
      const qtyWrapper = e.target.closest('.quantity-selector');
      const qtyValueEl = qtyWrapper.querySelector('.qty-value');
      let qty = parseInt(qtyValueEl.textContent);
  
      if (e.target.classList.contains('plus')) {
        qty++;
      } else if (e.target.classList.contains('minus') && qty > 1) {
        qty--;
      }
  
      qtyValueEl.textContent = qty;
    }
  });
//Product Increase and Decrease


//Add to cart Session
document.addEventListener("DOMContentLoaded", function () {
  const cartCount = document.getElementById("cart-count");
  const addToCartButtons = document.querySelectorAll(".add-cart");

  // Update cart count on load
  updateCartCount();

  addToCartButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      // Always fetch latest cart from localStorage
      let cart = JSON.parse(localStorage.getItem("product_list")) || {};

      const productBox = e.target.closest(".product-box");
      const title = productBox.querySelector(".product-title").dataset.name;
      const productid = productBox.querySelector(".product-title").dataset.id;
      const price = parseFloat(productBox.querySelector(".product-price").dataset.price);
      const image = productBox.querySelector(".product-pic img").getAttribute("src");

      // Add or update product in cart
      if (!cart[productid]) {
        cart[productid] = [{
          name: title,
          quantity: 1,
          url: image,
          price: price,
          productid: productid,
          rowtotal: price
        }];
      } else {
        cart[productid][0].quantity += 1;
        cart[productid][0].rowtotal = (cart[productid][0].quantity * price).toFixed(2);
      }

      // Save to localStorage
      localStorage.setItem("product_list", JSON.stringify(cart));

      // Update count and show confirmation popup
      updateCartCount();
      showCartPopup(`${title} added to cart!`);
    });
  });

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("product_list")) || {};
    let totalItems = 0;
    for (let key in cart) {
      totalItems += cart[key][0].quantity;
    }
    cartCount.textContent = totalItems;
  }

  // ✅ Popup function
  window.showCartPopup = function (message) {
    const popup = document.getElementById("cart-popup");
    popup.textContent = message;
    popup.style.display = "block";
    popup.style.opacity = "1";

    setTimeout(() => {
      popup.style.opacity = "0";
    }, 1500);

    setTimeout(() => {
      popup.style.display = "none";
    }, 2000);
  };
});

//Add to cart Session





