const SearchView = {
    render: async () => {
        let query = new URLSearchParams(window.location.search).get('q') || "";

        let html = `
            <div class="search-page-container">
                <div class="section-header">
                    <div style="display:flex; gap:5px; align-items:center;">
                        <span style="font-size:24px; color:var(--text-muted); font-weight:bold;">نتائج بحث</span>
                        <h2 style="font-size:24px; font-weight:900;">"${query}"</h2>
                    </div>
                    <img src="assets/icons/back_arrow.svg" class="back-arrow" onclick="app.navigate('/')" alt="رجوع">
                </div>
                <div class="search-results-grid" id="searchResultsGridPage">
                    <!-- تعبئة النتائج ديناميكياً -->
                </div>
        `;

        // سكشن تصفح المزيد المكرر
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
        html += `</div></div></div>`;

        return html;
    },

    afterRender: async () => {
        const grid = document.getElementById('searchResultsGridPage');
        if(!grid) return;
        let query = new URLSearchParams(window.location.search).get('q') || "";
        query = query.toLowerCase().trim();

        if(!query) {
            grid.innerHTML = `<div class="empty-state-view"><h3>لم تقم بكتابة أي جملة بحث</h3></div>`;
            return;
        }

        // فلترة المنتجات والعروض
        let filteredProducts = DB.products.filter(p => p.name.toLowerCase().includes(query) || p.details.toLowerCase().includes(query));
        
        let htmlContent = "";

        // عرض النتائج مجمعة ومنظمة تماشياً مع الديزاين
        if(filteredProducts.length === 0) {
            grid.innerHTML = `<div class="empty-state-view"><img src="assets/icons/empty.svg"><h3>عذراً، هذا المحتوى غير متوفر</h3></div>`;
            return;
        }

        // استخراج المجموعات الفرعية
        let groups = {};
        filteredProducts.forEach(p => {
            if(!groups[p.category]) groups[p.category] = [];
            groups[p.category].push(p);
        });

        for (let catKey in groups) {
            let catObj = DB.categories.find(c => c.id === catKey);
            htmlContent += `<div class="search-group-header" style="grid-column: 1/-1; font-weight:800; margin-top:15px; font-size:16px;">${catObj ? catObj.name : ''} (${groups[catKey].length})</div>`;
            
            groups[catKey].forEach(prod => {
                htmlContent += `
                    <div class="search-result-card" onclick="app.navigate('/item?id=${prod.id}')" style="cursor:pointer;">
                        <img src="${prod.posterImg}" alt="${prod.name}">
                        <div class="search-result-info">
                            <span class="product-title">${prod.name}</span>
                            <span class="product-price">${prod.price} ج.م</span>
                            <p>${prod.details}</p>
                        </div>
                    </div>
                `;
            });
        }

        grid.innerHTML = htmlContent;
    }
};