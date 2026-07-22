const DB = {
  categories: [
    { id: "tshirt", name: "تيشيرت", icon: "/assets/icons/tshirticon.svg" },
    { id: "pant", name: "بنطلون", icon: "/assets/icons/panticon.svg" },
    { id: "hoodie", name: "هودي", icon: "/assets/icons/hoodieicon.svg" },
    { id: "offers", name: "العروض", icon: "/assets/icons/offersicon.svg" },
  ],
  products: [
    {
      id: "p1",
      category: "tshirt",
      name: "تيشيرت سعودي عالي الجودة",
      posterImg: "/assets/imgs/poster1.svg",
      images: [
        "/assets/imgs/tshirt1.svg",
        "/assets/imgs/tshirt2.svg",
        "/assets/imgs/tshirt3.svg",
      ],
      colors: [
        { name: "أخضر", value: "#2e7d32" },
        { name: "أحمر", value: "#c62828" },
        { name: "بنفسجي", value: "#6a1b9a" },
      ],
      sizes: ["S", "M", "L", "XL"],
      price: 570,
      details:
        "تفاصيل أكثر عن التيشيرت السعودي وأي بيانات حول اللون والخامة ومعلومات موجودة هنا بالتفصيل المريح للعميل.",
    },
    {
      id: "p2",
      category: "tshirt",
      name: "تيشيرت كتان مريح",
      posterImg: "/assets/imgs/poster7.svg",
      images: [
        "/assets/imgs/tshirt1.svg",
        "/assets/imgs/tshirt2.svg",
        "/assets/imgs/tshirt3.svg",
      ],
      colors: [
        { name: "رمادي", value: "#757575" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["M", "L", "XL"],
      price: 450,
      details:
        "خامة كتان أصلية مناسبة للأجواء الحارة مريحة جداً في اللبس اليومي.",
    },
    {
      id: "p5",
      category: "tshirt",
      name: "تيشيرت كتان مريح",
      posterImg: "/assets/imgs/poster5.svg",
      images: [
        "/assets/imgs/tshirt1.svg",
        "/assets/imgs/tshirt2.svg",
        "/assets/imgs/tshirt3.svg",
      ],
      colors: [
        { name: "رمادي", value: "#757575" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["M", "L", "XL"],
      price: 450,
      details:
        "خامة كتان أصلية مناسبة للأجواء الحارة مريحة جداً في اللبس اليومي.",
    },
    {
      id: "p6",
      category: "tshirt",
      name: "تيشيرت كتان مريح",
      posterImg: "/assets/imgs/poster1.svg",
      images: [
        "/assets/imgs/tshirt1.svg",
        "/assets/imgs/tshirt2.svg",
        "/assets/imgs/tshirt3.svg",
      ],
      colors: [
        { name: "رمادي", value: "#757575" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["M", "L", "XL"],
      price: 450,
      details:
        "خامة كتان أصلية مناسبة للأجواء الحارة مريحة جداً في اللبس اليومي.",
    },
    {
      id: "p7",
      category: "tshirt",
      name: "تيشيرت كتان مريح",
      posterImg: "/assets/imgs/poster2.svg",
      images: [
        "/assets/imgs/tshirt1.svg",
        "/assets/imgs/tshirt2.svg",
        "/assets/imgs/tshirt3.svg",
      ],
      colors: [
        { name: "رمادي", value: "#757575" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["M", "L", "XL"],
      price: 450,
      details:
        "خامة كتان أصلية مناسبة للأجواء الحارة مريحة جداً في اللبس اليومي.",
    },
    {
      id: "p8",
      category: "tshirt",
      name: "تيشيرت كتان مريح",
      posterImg: "/assets/imgs/poster3.svg",
      images: [
        "/assets/imgs/tshirt1.svg",
        "/assets/imgs/tshirt2.svg",
        "/assets/imgs/tshirt3.svg",
      ],
      colors: [
        { name: "رمادي", value: "#757575" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["M", "L", "XL"],
      price: 450,
      details:
        "خامة كتان أصلية مناسبة للأجواء الحارة مريحة جداً في اللبس اليومي.",
    },
    {
      id: "p9",
      category: "tshirt",
      name: "تيشيرت كتان مريح",
      posterImg: "/assets/imgs/poster4.svg",
      images: [
        "/assets/imgs/tshirt1.svg",
        "/assets/imgs/tshirt2.svg",
        "/assets/imgs/tshirt3.svg",
      ],
      colors: [
        { name: "رمادي", value: "#757575" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["M", "L", "XL"],
      price: 450,
      details:
        "خامة كتان أصلية مناسبة للأجواء الحارة مريحة جداً في اللبس اليومي.",
    },
    {
      id: "p10",
      category: "tshirt",
      name: "تيشيرت كتان مريح",
      posterImg: "/assets/imgs/poster5.svg",
      images: [
        "/assets/imgs/tshirt1.svg",
        "/assets/imgs/tshirt2.svg",
        "/assets/imgs/tshirt3.svg",
      ],
      colors: [
        { name: "رمادي", value: "#757575" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["M", "L", "XL"],
      price: 450,
      details:
        "خامة كتان أصلية مناسبة للأجواء الحارة مريحة جداً في اللبس اليومي.",
    },
    {
      id: "p11",
      category: "hoodie",
      name: "هودي المبرمجين الأنيق",
      posterImg: "/assets/imgs/poster6.svg",
      images: [
        "/assets/imgs/tshirt1.svg",
        "/assets/imgs/tshirt2.svg",
        "/assets/imgs/tshirt3.svg",
      ],
      colors: [
        { name: "زيتي", value: "#556b2f" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["L", "XL", "XXL"],
      price: 450,
      details: "هودي ثقيل شتوي مريح مخصص لعشاق البرمجة بتطريز رائع متين.",
    },
    {
      id: "p12",
      category: "hoodie",
      name: "هودي المبرمجين الأنيق",
      posterImg: "/assets/imgs/poster7.svg",
      images: [
        "/assets/imgs/tshirt1.svg",
        "/assets/imgs/tshirt2.svg",
        "/assets/imgs/tshirt3.svg",
      ],
      colors: [
        { name: "زيتي", value: "#556b2f" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["L", "XL", "XXL"],
      price: 450,
      details: "هودي ثقيل شتوي مريح مخصص لعشاق البرمجة بتطريز رائع متين.",
    },
    {
      id: "p13",
      category: "hoodie",
      name: "هودي المبرمجين الأنيق",
      posterImg: "/assets/imgs/poster1.svg",
      images: [
        "/assets/imgs/poster1.svg",
        "/assets/imgs/poster1.svg",
        "/assets/imgs/poster1.svg",
      ],
      colors: [
        { name: "زيتي", value: "#556b2f" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["L", "XL", "XXL"],
      price: 450,
      details: "هودي ثقيل شتوي مريح مخصص لعشاق البرمجة بتطريز رائع متين.",
    },
    {
      id: "p14",
      category: "hoodie",
      name: "هودي المبرمجين الأنيق",
      posterImg: "/assets/imgs/poster3.svg",
      images: [
        "/assets/imgs/poster1.svg",
        "/assets/imgs/poster1.svg",
        "/assets/imgs/poster1.svg",
      ],
      colors: [
        { name: "زيتي", value: "#556b2f" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["L", "XL", "XXL"],
      price: 450,
      details: "هودي ثقيل شتوي مريح مخصص لعشاق البرمجة بتطريز رائع متين.",
    },
    {
      id: "p15",
      category: "hoodie",
      name: "هودي المبرمجين الأنيق",
      posterImg: "/assets/imgs/poster1.svg",
      images: [
        "/assets/imgs/poster1.svg",
        "/assets/imgs/poster1.svg",
        "/assets/imgs/poster1.svg",
      ],
      colors: [
        { name: "زيتي", value: "#556b2f" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["L", "XL", "XXL"],
      price: 450,
      details: "هودي ثقيل شتوي مريح مخصص لعشاق البرمجة بتطريز رائع متين.",
    },
    {
      id: "p16",
      category: "hoodie",
      name: "هودي المبرمجين الأنيق",
      posterImg: "/assets/imgs/poster2.svg",
      images: [
        "/assets/imgs/poster1.svg",
        "/assets/imgs/poster1.svg",
        "/assets/imgs/poster1.svg",
      ],
      colors: [
        { name: "زيتي", value: "#556b2f" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["L", "XL", "XXL"],
      price: 450,
      details: "هودي ثقيل شتوي مريح مخصص لعشاق البرمجة بتطريز رائع متين.",
    },
    {
      id: "p17",
      category: "hoodie",
      name: "هودي المبرمجين الأنيق",
      posterImg: "/assets/imgs/poster3.svg",
      images: [
        "/assets/imgs/poster1.svg",
        "/assets/imgs/poster1.svg",
        "/assets/imgs/poster1.svg",
      ],
      colors: [
        { name: "زيتي", value: "#556b2f" },
        { name: "أسود", value: "#000000" },
      ],
      sizes: ["L", "XL", "XXL"],
      price: 450,
      details: "هودي ثقيل شتوي مريح مخصص لعشاق البرمجة بتطريز رائع متين.",
    },
    {
      id: "p18",
      category: "pant",
      name: "بنطلون جينز كلاسيك",
      posterImg: "/assets/imgs/poster4.svg",
      images: ["assets/images/pant_jeans_1.jpg"],
      colors: [{ name: "أزرق داكن", value: "#1a237e" }],
      sizes: ["32", "34", "36"],
      price: 500,
      details: "جينز متين لا يتأثر بالغسيل، قصة كلاسيكية مريحة.",
    },
    {
      id: "p19",
      category: "pant",
      name: "بنطلون جينز كلاسيك",
      posterImg: "/assets/imgs/poster5.svg",
      images: ["assets/images/pant_jeans_1.jpg"],
      colors: [{ name: "أزرق داكن", value: "#1a237e" }],
      sizes: ["32", "34", "36"],
      price: 500,
      details: "جينز متين لا يتأثر بالغسيل، قصة كلاسيكية مريحة.",
    },
    {
      id: "p20",
      category: "pant",
      name: "بنطلون جينز كلاسيك",
      posterImg: "/assets/imgs/poster6.svg",
      images: ["assets/images/pant_jeans_1.jpg"],
      colors: [{ name: "أزرق داكن", value: "#1a237e" }],
      sizes: ["32", "34", "36"],
      price: 500,
      details: "جينز متين لا يتأثر بالغسيل، قصة كلاسيكية مريحة.",
    },
    {
      id: "p21",
      category: "pant",
      name: "بنطلون جينز كلاسيك",
      posterImg: "/assets/imgs/poster7.svg",
      images: ["assets/images/pant_jeans_1.jpg"],
      colors: [{ name: "أزرق داكن", value: "#1a237e" }],
      sizes: ["32", "34", "36"],
      price: 500,
      details: "جينز متين لا يتأثر بالغسيل، قصة كلاسيكية مريحة.",
    },
  ],
  offers: [
    {
      id: "o1",
      type: "package", // هيكل مرن مخصص لدعم الحزم الترويجية
      name: "عرض فان داي الثانوية",
      bannerImg: "/assets/icons/ad1.svg",
      price: 900,
      details:
        "اشترى قطعتين تيشيرت واحصل على القطعة الثالثة مجاناً بالكامل من اختيارك.",
      productsIncluded: ["p1", "p2"],
    },
    {
      id: "o2",
      type: "package", // هيكل مرن مخصص لدعم الحزم الترويجية
      name: "عرض قطعتين والثالثة مجاناً",
      bannerImg: "/assets/icons/ad2.svg",
      price: 900,
      details:
        "اشترى قطعتين تيشيرت واحصل على القطعة الثالثة مجاناً بالكامل من اختيارك.",
      productsIncluded: ["p1", "p2"],
    },
    {
      id: "o3",
      type: "package", // هيكل مرن مخصص لدعم الحزم الترويجية
      name: "عرض قطعتين والثالثة مجاناً",
      bannerImg: "/assets/icons/ad3.svg",
      price: 900,
      details:
        "اشترى قطعتين تيشيرت واحصل على القطعة الثالثة مجاناً بالكامل من اختيارك.",
      productsIncluded: ["p1", "p2"],
    },
    {
      id: "o4",
      type: "package", // هيكل مرن مخصص لدعم الحزم الترويجية
      name: "عرض قطعتين والثالثة مجاناً",
      bannerImg: "/assets/icons/ad4.svg",
      price: 900,
      details:
        "اشترى قطعتين تيشيرت واحصل على القطعة الثالثة مجاناً بالكامل من اختيارك.",
      productsIncluded: ["p1", "p2"],
    },
    {
      id: "o5",
      type: "package", // هيكل مرن مخصص لدعم الحزم الترويجية
      name: "عرض قطعتين والثالثة مجاناً",
      bannerImg: "/assets/icons/ad5.svg",
      price: 1200,
      details:
        "اشترى قطعتين تيشيرت واحصل على القطعة الثالثة مجاناً بالكامل من اختيارك.",
      productsIncluded: ["p1", "p2"],
    },
  ],
  promoCodes: {
    MANS10: 0.1, // خصم 10%
    NABNI15: 0.15, // خصم 15%
  },
};
