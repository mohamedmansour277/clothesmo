const ItemView = {
    render: async (params) => {
        const id = params.get('id');
        const isOffer = params.get('isOffer') === 'true';

        let item = isOffer ? DB.offers.find(o => o.id === id) : DB.products.find(p => p.id === id);
        if(!item) return `<div class="empty-state-view"><img src="assets/icons/empty.svg"><h3>هذا المنتج غير متوفر</h3></div>`;

        let backUrl = isOffer ? '/@offers' : `/@${item.category}`;

        let html = `
            <div class="item-page-container" data-id="${item.id}" data-type="${isOffer ? 'offer' : 'product'}">
                <div class="slideshow-container">
                    <div class="section-header">
                        <h2 id="itemMainTitleText">${item.name}</h2>
                        <img src="/assets/icons/arrow-left.svg" class="back-arrow" onclick="app.navigate('${backUrl}')" alt="رجوع">
                    </div>
                    <img src="${isOffer ? item.bannerImg : item.images[0]}" class="main-item-image" id="itemMainDisplayImage">
                    <div class="thumbnails-wrapper">
        `;

        if(!isOffer) {
            item.images.forEach((img, idx) => {
                html += `<img src="${img}" class="thumbnail-img ${idx === 0 ? 'active' : ''}" data-idx="${idx}">`;
            });
        }

        html += `   </div>
                </div>
                <div class="item-options-section">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h1 class="item-title" style="font-size:22px; font-weight:800;">${item.name}</h1>
                        <span class="item-price" style="font-size:22px; font-weight:900;">${item.price} ج.م</span>
                    </div>
                    <p class="item-desc" style="color:var(--text-muted); line-height:1.6; margin:15px 0;">${item.details}</p>
        `;

        if(!isOffer) {
            // سكشن المقاسات والألوان الديناميكية
            html += `
                <div class="option-group" style="position:relative; margin-bottom:15px;">
                    <div class="options-title">المقاس :</div>
                    <div class="options-flex" id="sizesContainer">
            `;
            item.sizes.forEach(sz => {
                html += `<div class="size-box" data-size="${sz}">${sz}</div>`;
            });
            html += `</div><span class="error-msg" id="sizeError" style="color:red; font-size:12px; display:none; position:absolute; top:-15px; right:0;">يرجى اختيار المقاس</span></div>`;

            html += `
                <div class="option-group" style="position:relative; margin-bottom:15px;">
                    <div class="options-title">اللون :</div>
                    <div class="options-flex" id="colorsContainer">
            `;
            item.colors.forEach(col => {
                html += `<div class="color-box" data-color="${col.name}" style="background-color:${col.value};"></div>`;
            });
            html += `</div><span class="error-msg" id="colorError" style="color:red; font-size:12px; display:none; position:absolute; top:-15px; right:0;">يرجى اختيار اللون</span></div>`;
        }

        html += `
                    <div class="purchase-actions-bar">
                        <div class="quantity-counter">
                            <button class="counter-btn minus" id="itemQtyMinus"></button>
                            <span class="quantity-value" id="itemQtyValue">1</span>
                            <button class="counter-btn plus" id="itemQtyPlus"></button>
                        </div>
                        <button class="add-to-cart-btn" id="addItemToCartBtn">أضف إلى السلة</button>
                    </div>
                </div>
            </div>
        `;

        // سكشن تصفح المزيد التمريري السفلي الموحد
        html += `
            <div class="browse-more-section">
                <div class="section-header">
                    <h2>تصفح المزيد</h2>
                    <img src="/assets/icons/arrow-left.svg" class="header-icon">
                </div>
                <div class="categories-scroll-container">
        `;
        DB.categories.forEach(cat => {
            html += `
                <a href="/@${cat.id}" data-link class="category-square-card">
                    <img src="${cat.icon}" alt="${cat.name}">
                    <span>${cat.name}</span>
                </a>
            `;
        });
        html += `</div></div>`;

        return html;
    },

    afterRender: async () => {
        const container = document.querySelector('.item-page-container');
        if(!container) return;
        const itemId = container.getAttribute('data-id');
        const isOffer = container.getAttribute('data-type') === 'offer';

        let item = isOffer ? DB.offers.find(o => o.id === itemId) : DB.products.find(p => p.id === itemId);

        // تشغيل السلايد شو لمعاينة الصور
        if(!isOffer) {
            const mainImg = document.getElementById('itemMainDisplayImage');
            const thumbs = document.querySelectorAll('.thumbnail-img');
            thumbs.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    thumbs.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    mainImg.src = item.images[parseInt(thumb.getAttribute('data-idx'))];
                });
            });

            // اختيار المقاس
            const sizes = document.querySelectorAll('.size-box');
            sizes.forEach(box => {
                box.addEventListener('click', () => {
                    sizes.forEach(s => s.classList.remove('selected'));
                    box.classList.add('selected');
                    document.getElementById('sizeError').style.display = 'none';
                });
            });

            // اختيار اللون
            const colors = document.querySelectorAll('.color-box');
            colors.forEach(box => {
                box.addEventListener('click', () => {
                    colors.forEach(c => c.classList.remove('selected'));
                    box.classList.add('selected');
                    document.getElementById('colorError').style.display = 'none';
                });
            });
        }

        // التحكم في عداد الكمية
        const qtyVal = document.getElementById('itemQtyValue');
        document.getElementById('itemQtyPlus').addEventListener('click', () => {
            qtyVal.innerText = parseInt(qtyVal.innerText) + 1;
        });
        document.getElementById('itemQtyMinus').addEventListener('click', () => {
            let current = parseInt(qtyVal.innerText);
            if(current > 1) qtyVal.innerText = current - 1;
        });

        // حدث الضغط على أضف إلى السلة والتحقق من المدخلات
        document.getElementById('addItemToCartBtn').addEventListener('click', () => {
            let selectedSize = "FREE";
            let selectedColor = "FREE";

            if(!isOffer) {
                const sizeSel = document.querySelector('.size-box.selected');
                const colorSel = document.querySelector('.color-box.selected');

                let error = false;
                if(!sizeSel) { document.getElementById('sizeError').style.display = 'block'; error = true; }
                if(!colorSel) { document.getElementById('colorError').style.display = 'block'; error = true; }
                if(error) return;

                selectedSize = sizeSel.getAttribute('data-size');
                selectedColor = colorSel.getAttribute('data-color');
            }

            let cartItem = {
                id: item.id,
                name: item.name,
                price: item.price,
                img: isOffer ? item.bannerImg : item.posterImg,
                size: selectedSize,
                color: selectedColor,
                qty: parseInt(qtyVal.innerText),
                isOffer: isOffer
            };

            app.addToCart(cartItem);
        });
    }
};