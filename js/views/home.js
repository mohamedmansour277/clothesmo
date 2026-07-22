const HomeView = {
    render: async () => {
        // 1. سكشن الهيرو
        let html = `
            <section class="hero-section" style="margin-bottom: 25px;">
                <img src="/assets/imgs/herobg.svg" alt="كل اللي بتدور عليه عندنا" style="width:100%; border-radius:16px;">
            </section>
        `;

        // 2. كاردات الأقسام المربعة
        html += `<section class="categories-wrapper" style="margin-bottom:35px;">
                    <div class="categories-scroll-container">`;
        DB.categories.forEach(cat => {
            html += `
                <a href="/@${cat.id}" data-link class="category-square-card">
                    <img src="${cat.icon}" alt="${cat.name}">
                    <span>${cat.name}</span>
                </a>
            `;
        });
        html += `</div></section>`;

        // 3. سكشن العروض
        html += `
            <section class="home-section-wrapper" style="margin-bottom:35px; width:100%; overflow:hidden;">
                <div class="section-header" onclick="app.navigate('/@offers')">
                    <h2>العروض</h2>
                    <img src="/assets/icons/offersicon.svg" class="header-icon" alt="عروض">
                </div>
                <!-- شيلنا الـ padding الجانبي من هنا عشان ميعملش فرملة وهمية للصورة الأخيرة -->
                <div class="offers-slider-wrapper" style="position:relative; width:100%; overflow:hidden; direction:ltr;">
                    <div class="offers-slider" id="homeOffersSlider" style="display:flex; width:max-content; min-width:100%; transition:transform 0.3s ease-out; cursor:grab; will-change: transform;">
        `;

        // تكتيك ذكي: بنعكس المصفوفة هنا عشان أول عرض مضاف في الـ DB يظهر على اليمين علطول
        const reversedOffers = [...DB.offers].reverse();

        reversedOffers.forEach((offer, index) => {
            const isFirst = index === 0;
            const isLast = index === reversedOffers.length - 1;
            
            // توزيع المسافات بذكاء: أول صورة تسيب مسافة عالشمال عشان متلزقش في حافة الشاشة أول ما نفتح
            // وآخر صورة تسيب مسافة عاليمين عشان لما نوصلها تظهر كاملة ويكون في مسافة مريحة للعين
            const marginLeft = isFirst ? '16px' : '0px';
            const marginRight = isLast ? '16px' : '12px';

            html += `
                <div class="offer-slide" onclick="app.navigate('/item?id=${offer.id}&isOffer=true')" 
                     style="flex: 0 0 75vw; max-width: 500px; margin-left: ${marginLeft}; margin-right:${marginRight}; box-sizing:border-box; flex-shrink: 0;">
                    <img src="${offer.bannerImg}" alt="${offer.name}" draggable="false" style="width:100%; display:block; pointer-events:none; border-radius:16px;">
                </div>
            `;
        });

        html += ` 
                    </div>
                    <!-- توحيد النقاط ltr عشان تتماشى مع ترتيب الصور بالظبط وماتمشيش بالعكس -->
                    <div class="slider-dots" id="sliderDotsContainer" style="direction:ltr; display:flex; justify-content:center; gap:8px; margin-top:12px;"></div>
                </div>
            </section>
        `;

        // 4. الأقسام الفردية التمريرية
        const activeCats = DB.categories.filter(c => c.id !== 'offers');
        activeCats.forEach(cat => {
            const catProducts = DB.products.filter(p => p.category === cat.id).slice(0, 5);
            if(catProducts.length === 0) return;

            html += `
                <section class="home-section-wrapper" style="margin-bottom:35px;">
                    <div class="section-header" onclick="app.navigate('/@${cat.id}')">
                        <h2>${cat.name}</h2>
                        <img src="${cat.icon}" class="header-icon" alt="${cat.name}">
                    </div>
                    <div class="products-horizontal-scroll">
            `;

            catProducts.forEach(prod => {
                html += `
                    <div class="product-card" onclick="app.navigate('/item?id=${prod.id}')" style="cursor:pointer;">
                        <img src="${prod.posterImg}" alt="${prod.name}">
                    </div>
                `;
            });

            html += `
                        <div class="view-more-inline-card" onclick="app.navigate('/@${cat.id}')">
                            <span>عرض المزيد</span>
                        </div>
                    </div>
                </section>
            `;
        });

        return html;
    },

    afterRender: async () => {
        const slider = document.getElementById('homeOffersSlider');
        const dotsContainer = document.getElementById('sliderDotsContainer');
        if (!slider || !dotsContainer) return;

        const slides = slider.querySelectorAll('.offer-slide');
        const slideCount = slides.length;
        if (slideCount === 0) return;

        let currentIndex = 0;
        let isDragging = false;
        let startX = 0;
        let currentPosition = 0;
        let prevPosition = 0;
        let dragMoved = false;

        // 1. إنشاء الـ Dots بنفس اتجاه الـ LTR المتناسق مع السحب
        dotsContainer.innerHTML = '';
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }

        function goToSlide(index) {
            currentIndex = index;
            
            // حساب عرض الكارد الفعلي؛ بما إن الهوامش بقت متغيرة (أول وآخر عنصر) بنحسب المتوسط التقريبي المريح للحركة وهو عرض الكارد + 12px
            const slideWidth = slides[0].getBoundingClientRect().width + 12;
            
            // حساب العرض الكلي لشريط الصور الفعلي من المتصفح مباشرة
            const totalSliderWidth = slider.scrollWidth;
            
            // حساب عرض الشاشة المتاحة (الحاوية الخارجية)
            const wrapperWidth = slider.parentElement.getBoundingClientRect().width;
            
            // الحسبة الحقيقية لأقصى مسافة سحب حقيقية: العرض الكلي ناقص عرض الشاشة المتاحة بالظبط
            const maxScroll = totalSliderWidth - wrapperWidth; 

            // الحساب الطبيعي للموضع المستهدف
            let targetTranslate = currentIndex * slideWidth * -1;
            
            // لو أول صورة، نرجع للصفر تماماً بدون أي ترحيل
            if (currentIndex === 0) {
                targetTranslate = 0;
            }
            // لو وصلنا لآخر صورة أو الحسبة تخطت النهاية الفعيلة، اجبر السلايدر يقف عند نقطة النهاية بالملي عشان تظهر 100% كاملة
            else if (currentIndex === slideCount - 1 || Math.abs(targetTranslate) > maxScroll) {
                targetTranslate = maxScroll * -1;
            }

            currentPosition = targetTranslate;
            prevPosition = currentPosition;
            
            slider.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            slider.style.transform = `translateX(${currentPosition}px)`;
            
            updateDots();
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        // 2. معالجة السحب
        function dragStart(e) {
            isDragging = true;
            dragMoved = false;
            slider.style.cursor = 'grabbing';
            slider.style.transition = 'none';
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        }

        function dragMove(e) {
            if (!isDragging) return;
            const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            const diffX = currentX - startX;

            if (Math.abs(diffX) > 5) {
                dragMoved = true;
                const temporaryTranslate = prevPosition + diffX;
                slider.style.transform = `translateX(${temporaryTranslate}px)`;
            }
        }

        function dragEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            slider.style.cursor = 'grab';

            let endX = e.type.includes('mouse') ? e.pageX : ((e.changedTouches && e.changedTouches.length > 0) ? e.changedTouches[0].clientX : startX);
            const totalDiff = endX - startX;

            // السحب لليسار (شمال) يقلب للي بعده، واليمين يرجع لورا
            if (totalDiff < -40 && currentIndex < slideCount - 1) {
                currentIndex++;
            } else if (totalDiff > 40 && currentIndex > 0) {
                currentIndex--;
            }

            goToSlide(currentIndex);
        }

        slider.addEventListener('mousedown', dragStart);
        slider.addEventListener('mousemove', dragMove);
        slider.addEventListener('mouseup', dragEnd);
        slider.addEventListener('mouseleave', dragEnd);

        slider.addEventListener('touchstart', dragStart, { passive: true });
        slider.addEventListener('touchmove', dragMove, { passive: true });
        slider.addEventListener('touchend', dragEnd);

        slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                if (dragMoved) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);
        });

        window.addEventListener('resize', () => goToSlide(currentIndex));
    }
};