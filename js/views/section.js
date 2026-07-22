const SectionView = {
    render: async (catId) => {
        const category = DB.categories.find(c => c.id === catId);
        if(!category) return `<div class="empty-state-view"><img src="assets/icons/empty.svg"><h3>هذا القسم غير متوفر</h3></div>`;

        const isOffers = catId === 'offers';
        const title = category.name;

        let html = `
            <div class="section-page-container">
                <div class="section-header">
                    <h2>${title}</h2>
                    <img src="/assets/icons/arrow-left.svg" class="back-arrow" onclick="app.navigate('/')" alt="رجوع">
                </div>
                <div class="section-products-grid" id="sectionProductsGrid" data-cat="${catId}">
                    <!-- المنتجات يتم ضخها ديناميكياً لتفعيل زيادة الـ 12 قطعة -->
                </div>
                <div class="load-more-btn-container" id="loadMoreBtnContainer" style="display:none;">
                    <button class="load-more-global-btn" id="loadMoreSectionData">عرض المزيد</button>
                </div>
        `;

        // سكشن تصفح المزيد المكرر في الأسفل بأسلوب الكروت المربعة التمريرية
        html += `
            <div class="browse-more-section">
                <div class="section-header">
                    <h2>تصفح المزيد</h2>
                    <img src="/assets/icons/arrow-left.svg" class="header-icon">
                </div>
                <div class="categories-scroll-container">
        `;
        DB.categories.filter(c => c.id !== catId).forEach(cat => {
            html += `
                <a href="/@${cat.id}" data-link class="category-square-card">
                    <img src="${cat.icon}" alt="${cat.name}">
                    <span>${cat.name}</span>
                </a>
            `;
        });
        html += `</div></div></div>`;

        return html;
    },

    afterRender: async () => {
        const grid = document.getElementById('sectionProductsGrid');
        if(!grid) return;
        const catId = grid.getAttribute('data-cat');
        const isOffers = catId === 'offers';

        let items = isOffers ? DB.offers : DB.products.filter(p => p.category === catId);
        let itemsShown = 0;
        const chunkSize = 12;

        const loadNextChunk = () => {
            let limit = Math.min(itemsShown + chunkSize, items.length);
            let chunkHtml = "";

            for(let i = itemsShown; i < limit; i++) {
                let item = items[i];
                if(isOffers) {
                    // كروت العروض بعرض كامل أطول تماشياً مع متطلباتك ورسمة الديزاين
                    chunkHtml += `
                        <div class="product-card offer-card-wide" onclick="app.navigate('/item?id=${item.id}&isOffer=true')" style="grid-column: span 2; cursor:pointer;">
                            <img src="${item.bannerImg}" alt="${item.name}">
                            
                        </div>
                    `;
                } else {
                    chunkHtml += `
                        <div class="product-card" onclick="app.navigate('/item?id=${item.id}')" style="cursor:pointer;">
                            <img src="${item.posterImg}" alt="${item.name}">
                            
                        </div>
                    `;
                }
            }

            grid.insertAdjacentHTML('beforeend', chunkHtml);
            itemsShown = limit;

            const loadMoreBtn = document.getElementById('loadMoreBtnContainer');
            if(itemsShown < items.length) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        };

        loadNextChunk();

        const btn = document.getElementById('loadMoreSectionData');
        if(btn) btn.addEventListener('click', loadNextChunk);
    }
};