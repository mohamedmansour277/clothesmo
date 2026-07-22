const app = {
  // الراوتر الشامل لتوليد الصفحات وتهيئتها
  routes: {
    "/": HomeView,
    "/@tshirt": SectionView,
    "/@pant": SectionView,
    "/@hoodie": SectionView,
    "/@offers": SectionView,
    "/item": ItemView,
    "/search": SearchView,
    "/cart": CartView,
  },

  init: () => {
    // الاستماع للضغط على الروابط الداخلية SPA
    document.body.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]") || e.target.closest("[data-link]")) {
        e.preventDefault();
        let href =
          e.target.getAttribute("href") ||
          e.target.closest("[data-link]").getAttribute("href");
        app.navigate(href);
      }
    });

    // التحكم بالمنيو الجانبي للناف بار وعلامة X التفاعلية
    const navToggle = document.getElementById("navToggle");
    const sidebarMenu = document.getElementById("sidebarMenu");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    const toggleMenu = () => {
      navToggle.classList.toggle("open");
      sidebarMenu.classList.toggle("open");
      sidebarOverlay.classList.toggle("open");
    };

    navToggle.addEventListener("click", toggleMenu);
    sidebarOverlay.addEventListener("click", toggleMenu);

    // إغلاق المنيو عند الضغط على أي لينك جانبي
    document.querySelectorAll(".sidebar-item").forEach((item) => {
      item.addEventListener("click", () => {
        if (sidebarMenu.classList.contains("open")) toggleMenu();
      });
    });

    // تشغيل حقل البحث المتطور والـ pop up التابع له
    const searchInput = document.getElementById("searchInput");
    const searchPop = document.getElementById("searchPop");
    const searchPopResults = document.getElementById("searchPopResults");
    const viewAllBtn = document.getElementById("viewAllResultsBtn");

    searchInput.addEventListener('input', () => {
    let val = searchInput.value.toLowerCase().trim();
    if(val.length > 0) {
        searchPop.classList.add('open');
        
        let res = DB.products.filter(p => p.name.toLowerCase().includes(val));
        
        // 1. تحديث نص الزرار وإظهاره إجبارياً هنا
        viewAllBtn.innerText = `عرض كل النتائج (${res.length})`;
        viewAllBtn.style.setProperty('display', 'block', 'important'); 

        if(res.length === 0) {
            searchPopResults.innerHTML = `<div style="padding:10px; text-align:center; color:var(--text-muted);">لا توجد نتائج مطابقة</div>`;
            viewAllBtn.style.setProperty('display', 'none', 'important'); // إخفاء لو مفيش نتائج
            return;
        }

        let groups = {};
        res.forEach(p => {
            if(!groups[p.category]) groups[p.category] = [];
            groups[p.category].push(p);
        });

        let popHtml = "";
        for(let key in groups) {
            let catObj = DB.categories.find(c => c.id === key);
            popHtml += `<div class="search-pop-group-title">${catObj ? catObj.name : ''} (${groups[key].length})</div>`;
            groups[key].slice(0, 4).forEach(prod => {
                popHtml += `
                    <div class="search-pop-item" 
                         onclick="event.stopPropagation(); event.preventDefault(); app.navigate('/item?id=${prod.id}');" 
                         style="cursor:pointer;">
                        <img src="${prod.posterImg}">
                        <div style="display:flex; flex-direction:column;">
                            <span style="font-weight:bold; font-size:13px;">${prod.name}</span>
                            <span style="font-size:12px; font-weight:800;">${prod.price} ج.م</span>
                        </div>
                    </div>
                `;
            });
        }
        
        // حقن المحتوى داخل حاوية النتائج فقط وليس الأب الكلي
        searchPopResults.innerHTML = popHtml;
    } else {
        searchPop.classList.remove('open');
    }
});

    // زر البحث الرئيسي أو زر السابميت
    const triggerSearchAction = () => {
      let val = searchInput.value.trim();
      if (val) {
        searchPop.classList.remove("open");
        app.navigate(`/search?q=${encodeURIComponent(val)}`);
      }
    };

    document
      .getElementById("searchSubmitBtn")
      .addEventListener("click", triggerSearchAction);
    viewAllBtn.addEventListener("click", triggerSearchAction);
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") triggerSearchAction();
    });

    // الاستماع لضغط زر السلة العلوي في الناف
    document
      .getElementById("cartBtn")
      .addEventListener("click", () => app.navigate("/cart"));

    // الاستماع لزر بياناتك في الناف بار الجانبي
    document
      .getElementById("sidebarUserDataBtn")
      .addEventListener("click", () => app.openUserDataModal());

    // مودال حفظ البيانات وتخزين الـ LocalStorage
    document.getElementById("saveUserDataBtn").addEventListener("click", () => {
      let name = document.getElementById("userName").value.trim();
      let gov = document.getElementById("userGov").value.trim();
      let city = document.getElementById("userCity").value.trim();
      let village = document.getElementById("userVillage").value.trim();
      let addressDet = document.getElementById("userAddressDet").value.trim();

      if (!name || !gov || !city || !addressDet) {
        app.showToast("يرجى ملء الحقول الأساسية للعقد والشحن !");
        return;
      }

      let userData = { name, gov, city, village, addressDet };
      localStorage.setItem("juba_user_data", JSON.stringify(userData));

      document.getElementById("userDataModal").classList.remove("open");
      app.showToast("تم حفظ بيانات عنوانك بنجاح");

      // إعادة تحميل الصفحة الحالية لتعكس وضع التعديل إذا كنا في السلة
      app.router();
    });

    // الاستماع لزر رجوع المتصفح الخلفي والأمامي
    window.addEventListener("popstate", app.router);

    app.updateCartBadge();
    app.router();
  },

  navigate: (url) => {
    window.history.pushState(null, null, url);
    app.router();
  },

  router: async () => {
    let path = window.location.pathname;
    let searchParams = new URLSearchParams(window.location.search);

    // إغلاق أي فقاعة بحث مفتوحة تلقائياً عند الانتقال
    document.getElementById("searchPop").classList.remove("open");

    // تطبيق قواعد إدارة وإخفاء حقل البحث العلوي بناءً على اقتراح تجربة المستخدم المعتمد لدينا
    const searchBarWrapper = document.getElementById("searchBarWrapper");
    if (path === "/cart" || path === "/item") {
      searchBarWrapper.style.display = "none";
    } else {
      searchBarWrapper.style.display = "block";
    }

    // مطابقة مسارات الأقسام التفاعلية
    let view = app.routes[path];
    let htmlContent = "";

    if (path.startsWith("/@")) {
      let catId = path.substring(2);
      view = SectionView;
      htmlContent = await view.render(catId);
    } else if (view) {
      htmlContent = await view.render(searchParams);
    } else {
      htmlContent = `<div class="empty-state-view"><img src="assets/icons/empty.svg"><h3>عذراً، هذا المحتوى غير متوفر</h3></div>`;
    }

    document.getElementById("app-root").innerHTML = htmlContent;
    if (view && view.afterRender) await view.afterRender();

    // تمرير لقمة الصفحة عند تغيير المسار
    window.scrollTo(0, 0);
  },

  // إضافة المشتريات للسلة وتجميع الكميات المتطابقة بالمقاس واللون
  addToCart: (item) => {
    let cart = JSON.parse(localStorage.getItem("juba_cart")) || [];

    let match = cart.find(
      (c) => c.id === item.id && c.size === item.size && c.color === item.color,
    );
    if (match) {
      match.qty += item.qty;
    } else {
      cart.push(item);
    }

    localStorage.setItem("juba_cart", JSON.stringify(cart));
    app.updateCartBadge();
    app.showToast("تم إضافة العنصر بنجاح إلى السلة");
  },

  updateCartBadge: () => {
    let cart = JSON.parse(localStorage.getItem("juba_cart")) || [];
    let totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    document.getElementById("cartBadge").innerText = totalQty;
  },

  openUserDataModal: () => {
    let userData = JSON.parse(localStorage.getItem("juba_user_data"));
    if (userData) {
      document.getElementById("userName").value = userData.name || "";
      document.getElementById("userGov").value = userData.gov || "";
      document.getElementById("userCity").value = userData.city || "";
      document.getElementById("userVillage").value = userData.village || "";
      document.getElementById("userAddressDet").value =
        userData.addressDet || "";
    }

    const modal = document.getElementById("userDataModal");
    modal.classList.add("open");

    // إغلاق المودال عند الضغط خارجه لحماية التجربة السريعة
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  },

  // نظام التوست المخصص المتحرك من أسفل يمين الشاشة
  showToast: (text) => {
    const container = document.getElementById("toastContainer");
    container.innerHTML = `<div class="custom-toast">${text}</div>`;
    container.classList.add("show");

    setTimeout(() => {
      container.classList.remove("show");
    }, 3000);
  },
};

// انطلاق تشغيل التطبيق بالكامل فور تحميل الصفحة وثبات العناصر الأساسية
window.addEventListener("DOMContentLoaded", app.init);
