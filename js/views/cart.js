const CartView = {
    render: async () => {
        let cart = JSON.parse(localStorage.getItem('juba_cart')) || [];

        let html = `
            <div class="cart-page-container">
                <div class="section-header">
                    <h2>السلة</h2>
                    <img src="/assets/icons/arrow-left.svg" class="back-arrow" onclick="window.history.back()" alt="رجوع">
                </div>
        `;

        if(cart.length === 0) {
            html += `
                <div class="empty-state-view">
                    <img src="assets/icons/empty_cart.svg" alt="السلة فارغة">
                    <h3>السلة فارغة حالياً</h3>
                </div>
            `;
        } else {
            html += `<div class="cart-items-wrapper" id="cartItemsListContainer">`;
            cart.forEach((item, index) => {
                html += `
                    <div class="cart-item-swipe-container" data-index="${index}">
                        <div class="delete-underlay">
                            <img src="/assets/icons/delete.svg" alt="حذف" class="underlay-delete-btn" data-index="${index}">
                        </div>
                        <!-- أضفنا data-id و data-offer لتمريرهم للرابط عند الضغط -->
                        <div class="cart-item-card" data-id="${item.id}" data-offer="${item.isOffer ? 'true' : 'false'}" style="display:flex; align-items:stretch; gap:12px; cursor:pointer;">
                            <!-- صورة المنتج -->
                            <img src="${item.img}" alt="${item.name}" style="width:75px; height:75px; border-radius:12px; object-fit:cover; flex-shrink:0;">
                            
                            <!-- محتوى الكارد مقسم بالتساوي ليمين ويسار -->
                            <div style="flex:1; display:flex; justify-content:space-between; align-items:stretch;">
                                
                                <!-- الجانب الأيمن: تفاصيل المنتج الأساسية -->
                                <div style="display:flex; flex-direction:column; justify-content:center; gap:4px;">
                                    <span style="font-weight:bold; font-size:14px; line-height:1.3;">${item.name}</span>
                                    ${!item.isOffer ? `
                                        <span style="font-size:11px; color:var(--text-muted);">اللون : ${item.color}</span>
                                        <span style="font-size:11px; color:var(--text-muted);">المقاس : ${item.size}</span>
                                    ` : ''}
                                </div>
                                
                                <!-- الجانب الأيسر: السعر وتحته العداد بالظبط -->
                                <div style="display:flex; flex-direction:column; justify-content:space-between; align-items:flex-end; text-align:left;">
                                    <!-- السعر في الأعلى يسار -->
                                    <div style="font-weight:800; font-size:15px; color:var(--text-main);">${item.price * item.qty} ج.م</div>
                                    
                                    <!-- العداد في الأسفل يسار -->
                                    <div class="quantity-counter" style="width:fit-content; margin-top:auto;">
                                        <button class="counter-btn minus cart-qty-change" data-index="${index}" data-action="minus"></button>
                                        <span class="quantity-value">${item.qty}</span>
                                        <button class="counter-btn plus cart-qty-change" data-index="${index}" data-action="plus"></button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;

            // البانل السفلي الثابت لإتمام الشراء
            let hasUserData = localStorage.getItem('juba_user_data') !== null;
            html += `
                <div class="checkout-sticky-panel">
                    <div class="promo-code-container">
                        <input type="text" id="promoCodeInput" placeholder="كود الخصم" maxlength="6">
                        <button class="verify-promo-btn" id="verifyPromoBtn">تحقق</button>
                    </div>
                    <div class="user-data-trigger-bar" id="checkoutUserDataTrigger">
                        <img src="assets/icons/profile.svg" alt="بروفايل">
                        <span id="userDataBarText">${hasUserData ? 'تعديل بياناتك' : 'ادخل بياناتك من هنا'}</span>
                    </div>
                    <div class="summary-totals-box">
                        <div class="summary-row"><span>المبلغ</span><span id="subtotalPriceValue">0 ج.م</span></div>
                        <div class="summary-row"><span>الخصم</span><span id="discountRatioValue">0%</span></div>
                        <div class="summary-row total"><span>المبلغ الإجمالي</span><span id="grandTotalPriceValue">0 ج.م</span></div>
                    </div>
                    <button class="submit-order-whatsapp-btn" id="submitWhatsappOrderBtn">إتمام الطلب عبر الواتساب (0 ج.م)</button>
                </div>
            `;
        }

        // سكشن تصفح المزيد الموحد
        html += `
            <div class="browse-more-section" style="margin-bottom: 140px;">
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
        let cart = JSON.parse(localStorage.getItem('juba_cart')) || [];
        if(cart.length === 0) return;

        let currentDiscount = 0;

        // حساب الأسعار الإجمالية وتحديث الواجهة
        const updateTotals = () => {
            let subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
            let discountAmount = subtotal * currentDiscount;
            let grandTotal = subtotal - discountAmount;

            document.getElementById('subtotalPriceValue').innerText = `${subtotal} ج.م`;
            document.getElementById('discountRatioValue').innerText = `${currentDiscount * 100}%`;
            document.getElementById('grandTotalPriceValue').innerText = `${grandTotal} ج.م`;
            
            const mainBuyBtn = document.getElementById('submitWhatsappOrderBtn');
            mainBuyBtn.innerText = `إتمام الطلب عبر الواتساب (${grandTotal} ج.م)`;
        };

        updateTotals();

        // الضغط على الكارد للتوجيه لصفحة المنتج بالشكل الجديد (item?id=...&isOffer=...)
        document.querySelectorAll('.cart-item-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.quantity-counter') || e.target.closest('.counter-btn')) {
                    return; // تجاهل التوجيه إذا كانت النقرة داخل العداد
                }
                
                let productId = card.getAttribute('data-id');
                let isOffer = card.getAttribute('data-offer'); // جلب حالة العرض (true أو false)
                
                if (productId) {
                    app.navigate(`/item?id=${productId}&isOffer=${isOffer}`);
                }
            });
        });

        // التحكم بزيادة ونقصان الكميات داخل السلة
        document.querySelectorAll('.cart-qty-change').forEach(btn => {
            btn.addEventListener('click', () => {
                let idx = parseInt(btn.getAttribute('data-index'));
                let action = btn.getAttribute('data-action');

                if(action === 'plus') {
                    cart[idx].qty += 1;
                } else {
                    if(cart[idx].qty > 1) cart[idx].qty -= 1;
                }
                localStorage.setItem('juba_cart', JSON.stringify(cart));
                app.updateCartBadge();
                app.navigate('/cart');
            });
        });

        // التحقق من كود الخصم المكون من 6 خانات
        const promoBtn = document.getElementById('verifyPromoBtn');
        const promoInput = document.getElementById('promoCodeInput');
        promoBtn.addEventListener('click', () => {
            let code = promoInput.value.toUpperCase().trim();
            if(DB.promoCodes[code] !== undefined) {
                currentDiscount = DB.promoCodes[code];
                updateTotals();
                promoBtn.innerHTML = `<img src="assets/icons/check.svg" style="width:16px; height:16px;">`;
                promoInput.disabled = true;
                app.showToast("تم تطبيق الخصم بنجاح !");
            } else {
                app.showToast("كود الخصم غير صحيح");
            }
        });

        // فتح نافذة إدخال وتعديل البيانات من شريط السلة
        document.getElementById('checkoutUserDataTrigger').addEventListener('click', () => {
            app.openUserDataModal();
        });

        // تشغيل نظام السحب للحذف التفاعلي (Swipe to Delete) المعتمد في كارت السلة
        document.querySelectorAll('.cart-item-swipe-container').forEach(container => {
            const card = container.querySelector('.cart-item-card');
            let startTouchX = 0, currentMoveX = 0;

            card.addEventListener('touchstart', (e) => {
                startTouchX = e.touches[0].clientX;
            });

            card.addEventListener('touchmove', (e) => {
                currentMoveX = e.touches[0].clientX;
                let diff = currentMoveX - startTouchX;
                if(diff > 0 && diff < 120) {
                    card.style.transform = `translateX(${diff}px)`;
                }
            });

            card.addEventListener('touchend', (e) => {
                let diff = currentMoveX - startTouchX;
                if(diff > 80) {
                    card.style.transform = `translateX(100px)`;
                } else {
                    card.style.transform = `translateX(0px)`;
                }
            });
        });

        // زر الحذف المباشر
        document.querySelectorAll('.underlay-delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                let idx = parseInt(btn.getAttribute('data-index'));
                cart.splice(idx, 1);
                localStorage.setItem('juba_cart', JSON.stringify(cart));
                app.updateCartBadge();
                app.navigate('/cart');
                app.showToast("تم حذف المنتج من السلة");
            });
        });

        // إرسال الطلب النهائي المنظم بالكامل عبر الواتساب للرقم المطلوب
        document.getElementById('submitWhatsappOrderBtn').addEventListener('click', () => {
            let userData = JSON.parse(localStorage.getItem('juba_user_data'));
            if(!userData) {
                app.showToast("يرجى إدخال بياناتك وعنوانك أولاً لإتمام الطلب !");
                app.openUserDataModal();
                return;
            }

            let subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
            let discountAmount = subtotal * currentDiscount;
            let grandTotal = subtotal - discountAmount;

            let msg = `*طلب جديد من متجر JUBA*\n\n`;
            msg += `*الاسم:* ${userData.name}\n`;
            msg += `*العنوان:* ${userData.gov} - ${userData.city} - ${userData.village}\n`;
            msg += `*تفاصيل العنوان:* ${userData.addressDet}\n`;
            msg += `---------------------------\n`;
            msg += `*العناصر المطلوبة:*\n`;
            
            cart.forEach(item => {
                msg += `- ${item.name} ${!item.isOffer ? `(اللون: ${item.color} | المقاس: ${item.size})` : ''} | العدد: ${item.qty} | السعر: ${item.price * item.qty} ج.م\n`;
            });

            msg += `---------------------------\n`;
            msg += `*المبلغ الأساسي:* ${subtotal} ج.م\n`;
            msg += `*نسبة الخصم:* ${currentDiscount * 100}%\n`;
            msg += `*المبلغ الإجمالي النهائي:* ${grandTotal} ج.م\n`;

            let whatsappUrl = `https://api.whatsapp.com/send?phone=201029456680&text=${encodeURIComponent(msg)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
};