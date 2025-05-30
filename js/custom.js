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

//Window scroll header
  let lastScrollTop = 0;
const header = document.getElementById("custom-header");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop && currentScroll > 100) {
    // Scroll Down and scrolled more than 100px
    header.style.top = "-150px";
  } else {
    // Scroll Up
    header.style.top = "0";
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

  
//Cart Function 
  document.addEventListener('DOMContentLoaded', () => {
    const template = document.querySelector('.product-template');
    if (template) {
      fetch('category.json')
        .then(res => res.json())
        .then(categories => {
          template.style.display = 'none';
  
          for (let category in categories) {
            const section = document.querySelector(`#${category} .product-dynamic`);
            if (!section) continue;
  
            categories[category].forEach(product => {
              const clone = template.cloneNode(true);
              clone.classList.remove('product-template');
              clone.style.display = 'block';
  
              const productBox = clone.querySelector('.product-box');
              const image = productBox.querySelector('.product-image');
              const title = productBox.querySelector('.product-title');
              const price = productBox.querySelector('.product-price');
  
              image.src = product.image;
              image.alt = product.name;
              title.textContent = product.name;
              title.setAttribute('data-id', product.id);
              title.setAttribute('data-name', product.name);
              price.textContent = `$${product.price.toFixed(2)}`;
              price.setAttribute('data-price', product.price);
  
              section.appendChild(clone);
            });
          }
        })
        .catch(err => console.error('Error fetching categories:', err));
    }
  
    // Load New Arrival products
    fetch('category.json')
      .then(res => res.json())
      .then(data => {
        const newArrivalProducts = data['new-arrival'] || [];
        const container = document.querySelector('#new-arrival-products');
        if (!container) return;
  
        const templateCol = document.querySelector('.product-template .col-6');
        if (!templateCol) return;
  
        newArrivalProducts.forEach(product => {
          const productEl = templateCol.cloneNode(true);
  
          const img = productEl.querySelector('.product-image');
          const title = productEl.querySelector('.product-title');
          const price = productEl.querySelector('.product-price');
  
          img.src = product.image;
          img.alt = product.name;
          title.textContent = product.name;
          title.setAttribute('data-id', product.id);
          title.setAttribute('data-name', product.name);
          price.textContent = `$${parseFloat(product.price).toFixed(2)}`;
          price.setAttribute('data-price', product.price);
  
          container.appendChild(productEl);
        });
      })
      .catch(error => console.error('Failed to load New Arrival products:', error));
  
    // Load Popular products
    fetch('category.json')
      .then(res => res.json())
      .then(data => {
        const popularProducts = data['popular'] || [];
        const container = document.querySelector('#popular-products');
        if (!container) return;
  
        const templateCol = document.querySelector('.product-template .col-6');
        if (!templateCol) return;
  
        popularProducts.forEach(product => {
          const productEl = templateCol.cloneNode(true);
  
          const img = productEl.querySelector('.product-image');
          const title = productEl.querySelector('.product-title');
          const price = productEl.querySelector('.product-price');
  
          img.src = product.image;
          img.alt = product.name;
          title.textContent = product.name;
          title.setAttribute('data-id', product.id);
          title.setAttribute('data-name', product.name);
          price.textContent = `$${parseFloat(product.price).toFixed(2)}`;
          price.setAttribute('data-price', product.price);
  
          container.appendChild(productEl);
        });
      })
      .catch(error => console.error('Failed to load Popular products:', error));
  
    // Category slider
    fetch('category-list.json')
      .then(response => response.json())
      .then(data => {
        const sliderContainer = $('#category-slider');
        const categories = data.categories || [];
  
        if (sliderContainer.hasClass('slick-initialized')) {
          sliderContainer.slick('unslick');
        }
  
        sliderContainer.empty();
  
        categories.forEach(category => {
          const slide = `
            <div class="slider position-relative product-box shadow text-center">
              <div class="product-pic">
                <a href="products.html"><img src="${category.image}" alt="${category.name}"></a>
              </div>
              <div class="category-content">
                <h4 class="category-name">${category.name}</h4>
                <a href="products.html" class="shop-btn">Shop Now</a>
              </div>
            </div>
          `;
          sliderContainer.append(slide);
        });
  
        sliderContainer.slick({
          dots: false,
          infinite: true,
          arrows: false,
          autoplay: true,
          fade: false,
          slidesToShow: 5,
          slidesToScroll: 2,
          responsive: [
            {
              breakpoint: 1399,
              settings: { dots: false, slidesToShow: 5, slidesToScroll: 1, infinite: true }
            },
            {
              breakpoint: 991,
              settings: { dots: false, arrows: false, slidesToShow: 3, slidesToScroll: 3, infinite: true }
            },
            {
              breakpoint: 767,
              settings: { slidesToShow: 2, dots: false, arrows: false, slidesToScroll: 1 }
            }
          ]
        });
      })
      .catch(error => console.error('Error loading category data:', error));
  
    // Initialize cart count and render cart items
    updateCartCount();
    renderCartItems();
  });
  
  // Delegated event listener for Add to Cart buttons
  document.addEventListener('click', e => {
    const addCartBtn = e.target.closest('.add-cart');
    if (!addCartBtn) return;
  
    e.preventDefault();
  
    const productBox = addCartBtn.closest('.product-box');
    if (!productBox) return;
  
    const titleEl = productBox.querySelector('.product-title');
    const priceEl = productBox.querySelector('.product-price');
    const imageEl = productBox.querySelector('.product-image');
  
    if (!titleEl || !priceEl || !imageEl) return;
  
    const id = titleEl.getAttribute('data-id');
    const name = titleEl.getAttribute('data-name');
    const price = parseFloat(priceEl.getAttribute('data-price'));
    const image = imageEl.getAttribute('src');
  
    let cart = JSON.parse(localStorage.getItem('product_list')) || {};
  
    if (cart[id]) {
      cart[id][0].quantity += 1;
    } else {
      cart[id] = [{
        id,
        name,
        price,
        image,
        quantity: 1
      }];
    }
  
    localStorage.setItem('product_list', JSON.stringify(cart));
    updateCartCount();
    showPopup(`"${name}" added to cart`);
  });
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('product_list')) || {};
    let count = 0;
    for (let key in cart) {
      count += cart[key][0].quantity;
    }
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) cartCountEl.textContent = count;
  }
  
  function renderCartItems() {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;
  
    const cart = JSON.parse(localStorage.getItem('product_list')) || {};
    cartContainer.innerHTML = '';
  
    for (let key in cart) {
      const item = cart[key][0];
      const itemHTML = `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-image">
          <div class="cart-details">
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)}</p>
            <div class="quantity-controls">
              <button class="qty-decrease">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="qty-increase">+</button>
            </div>
          </div>
        </div>
      `;
      cartContainer.insertAdjacentHTML('beforeend', itemHTML);
    }
  
    bindQuantityButtons();
    updateCartTotal();
  }
  
  function bindQuantityButtons() {
    document.querySelectorAll('.qty-increase').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.closest('.cart-item').getAttribute('data-id');
        updateQuantity(productId, 1);
      });
    });
  
    document.querySelectorAll('.qty-decrease').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.closest('.cart-item').getAttribute('data-id');
        updateQuantity(productId, -1);
      });
    });
  }
  
  function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('product_list')) || {};
    if (!cart[productId]) return;
  
    let newQty = cart[productId][0].quantity + change;
    if (newQty < 1) newQty = 1;
  
    cart[productId][0].quantity = newQty;
    localStorage.setItem('product_list', JSON.stringify(cart));
  
    const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
    if (cartItem) {
      const qtyEl = cartItem.querySelector('.quantity');
      if (qtyEl) qtyEl.textContent = newQty;
    }
  
    updateCartCount();
    updateCartTotal();
  }
  
  function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('product_list')) || {};
    let total = 0;
    for (let key in cart) {
      total += cart[key][0].price * cart[key][0].quantity;
    }
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  }
  
  function showPopup(message) {
    const popup = document.getElementById('popup-message');
    if (!popup) return;
  
    popup.textContent = message;
    popup.style.display = 'block';
    popup.style.opacity = '1';
  
    setTimeout(() => { popup.style.opacity = '0'; }, 2500);
    setTimeout(() => { popup.style.display = 'none'; }, 3000);
  }
  

  //Header catregory display
  fetch('category-list.json')
  .then(response => response.json())
  .then(data => {
    const select = document.getElementById('category-select');
    if (!select || !data.categories) return;

    data.categories.forEach((category, index) => {
      const option = document.createElement('option');
      option.value = category.name; // You can use `index` if you need unique ID
      option.textContent = category.name;
      select.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error loading category list:', error);
  });

  //Header catregory display for mobile
  fetch('category-list.json')
  .then(response => response.json())
  .then(data => {
    const select = document.getElementById('category-select-mb');
    if (!select || !data.categories) return;

    data.categories.forEach((category, index) => {
      const option = document.createElement('option');
      option.value = category.name; // You can use `index` if you need unique ID
      option.textContent = category.name;
      select.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error loading category list:', error);
  });

  //Dynamic dropdwon for mega menu
  fetch('categories-dropdown.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch JSON');
      }
      return response.json();
    })
    .then(data => {
      const dropdown = document.getElementById('dynamic-dropdown');
      const groups = data.categoryGroups;

      groups.forEach(group => {
        const outerLi = document.createElement('li');
        const innerUl = document.createElement('ul');

        if (group.items) {
          group.items.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'dropdown-item';
            a.href = 'products.html';
            a.textContent = item;
            li.appendChild(a);
            innerUl.appendChild(li);
          });
        } else if (group.image) {
          const li = document.createElement('li');
          const img = document.createElement('img');
          img.src = group.image;
          img.alt = '';
          li.appendChild(img);
          innerUl.appendChild(li);
        }

        outerLi.appendChild(innerUl);
        dropdown.appendChild(outerLi);
      });
    })
    .catch(error => {
      console.error('Error loading dropdown data:', error);
    });

//Mobile Dropdown menu
  fetch('categories-dropdown.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load categories JSON');
      }
      return response.json();
    })
    .then(data => {
      const menu = document.getElementById('mobile-dropdown');
      const categoryGroups = data.categoryGroups;

      categoryGroups.forEach((group, groupIndex) => {
        if (group.items) {
          group.items.forEach((item, itemIndex) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'dropdown-item';
            a.href = 'products.html';
            a.textContent = item;
            li.appendChild(a);
            menu.appendChild(li);

            // Optional: Add divider after each item except last
            if (itemIndex < group.items.length - 1) {
              const divider = document.createElement('li');
              divider.innerHTML = '<hr class="dropdown-divider">';
              menu.appendChild(divider);
            }
          });
        }
      });
    })
    .catch(error => {
      console.error('Error loading categories:', error);
    });

//Category showing in the prodcuct page
  fetch('category-list.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load category list');
      }
      return response.json();
    })
    .then(data => {
      const categories = data.categories;
      const list = document.getElementById('products-category');

      categories.forEach(category => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = "products.html";

        const img = document.createElement('img');
        img.src = category.image;
        img.alt = category.name;
        img.style.width = '50px'; // optional styling
        img.style.marginRight = '8px';

        const span = document.createElement('span');
        span.textContent = category.name;

        a.appendChild(img);
        a.appendChild(span);
        li.appendChild(a);
        list.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error loading categories:', error);
    });


    //Product page al products are showing from category.json file
    fetch('category.json')
      .then(response => {
        if (!response.ok) throw new Error("Failed to load products");
        return response.json();
      })
      .then(data => {
        const allProducts = [
          ...data["new-arrival"],
          ...data["popular"],
          ...data["featured"],
          ...data["best-seller"]
        ];
    
        // Remove duplicate products by ID
        const uniqueProducts = Array.from(
          new Map(allProducts.map(item => [item.id, item])).values()
        );
    
        const container = document.getElementById('custom-products');
        const productCountText = document.querySelector('.products-right p');
    
        // Update product count
        productCountText.textContent = `Showing all ${uniqueProducts.length} Products`;
    
        // Render each product
        uniqueProducts.forEach(product => {
          const col = document.createElement('div');
          col.className = 'col-6 col-md-4 col-lg-3';
    
          col.innerHTML = `
            <div class="product-box text-center position-relative">
              <div class="product-pic"> 
                <img src="${product.image}" alt="${product.name}" class="product-image">
              </div>
              <div class="product-content">
                <div class="product-title text-truncate" data-id="${product.id}" data-name="${product.name}">
                  ${product.name}
                </div>
                <div class="product-price" data-price="${product.price}">
                  $${product.price.toFixed(2)}
                </div>
              </div>
              <div class="cart-details position-absolute">
                <ul>
                  <li><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                  <li><a href="#" class="add-cart"><i class="fa-solid fa-bag-shopping"></i></a></li>
                </ul>
              </div>
            </div>`;
    
          container.appendChild(col);
        });
      })
      .catch(error => console.error('Error loading products:', error));
    

// Load categories into both desktop and mobile selects without duplicates
fetch('category-list.json')
.then(response => response.json())
.then(data => {
  const categorySelect = document.getElementById('category-select');
  const categorySelectMb = document.getElementById('category-select-mb');

  const uniqueCategories = new Set();
  data.categories.forEach(cat => uniqueCategories.add(cat.name));

  const categoryOptions = [...uniqueCategories].map(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    return option;
  });

  categorySelect.innerHTML = '<option value="">All Categories</option>';
  categoryOptions.forEach(option => categorySelect.appendChild(option.cloneNode(true)));

  categorySelectMb.innerHTML = '<option value="">All Categories</option>';
  categoryOptions.forEach(option => categorySelectMb.appendChild(option.cloneNode(true)));
});

// Shared product filtering logic
function filterProducts(searchTerm, selectedCategory) {
fetch('product.json')
  .then(response => response.json())
  .then(data => {
    const filtered = data.products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      return nameMatch && categoryMatch;
    });
    displayProducts(filtered);
  });
}

// Handle desktop search form
const desktopForm = document.getElementById('productSearchForm');
if (desktopForm) {
desktopForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const searchTerm = desktopForm.querySelector('input[name="search"]').value.toLowerCase();
  const selectedCategory = desktopForm.querySelector('select[name="category"]').value;
  filterProducts(searchTerm, selectedCategory);
});
}

// Handle mobile search form
const mobileForm = document.getElementById('productSearchFormMb');
if (mobileForm) {
  mobileForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchTermMb = mobileForm.querySelector('input[name="search_mb"]').value.toLowerCase();
    const selectedCategoryMb = mobileForm.querySelector('select[name="category_mb"]').value;
    filterProducts(searchTermMb, selectedCategoryMb);
  });
}



// Display filtered products
function displayProducts(products) {
const container = document.getElementById('product-results');
container.innerHTML = '';

if (products.length === 0) {
  container.innerHTML = '<p>No products found.</p>';
  return;
}

products.forEach(product => {
  const div = document.createElement('div');
  div.className = 'col-12';
  div.innerHTML = `
      <div class="product-card p-3 border rounded text-center h-100">
        <a href="products.html?id=${product.id}" class="text-decoration-none text-dark">
        <img src="${product.image}" alt="${product.name}" class="img-fluid mb-2" style="max-height: 120px; object-fit: contain;">
        </a>
        <h5>
        ${product.name}
        <p class="mt-2"><strong>$${product.price.toFixed(2)}</strong></p>
        </h5>
      </div>
  `;
  container.appendChild(div);
});
}