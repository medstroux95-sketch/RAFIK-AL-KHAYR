import { UmrahPackage, SiteSettings, ReviewItem, FaqItem } from '../types';

export const initialSiteSettings: SiteSettings = {
  agencyName: "رفيق الخير للسفر والسياحة",
  agencySubtitle: "RAFIQ AL KHAIR TRAVEL & TOURISM",
  slogan: "نسعى لراحتكم لتكون رفيقكم في الخير",
  phone: "0662574740",
  whatsapp: "212662574740",
  email: "rafikelkhayer@gmail.com",
  address: "شارع الحسن الثاني، الدار البيضاء، المغرب",
  city: "الدار البيضاء",
  country: "المغرب",
  licenseNumber: "LIC-MOR-2024-8841",
  bankName: "التجاري وفا بنك - Attijariwafa Bank",
  bankRib: "007 780 0001234567890123 45",
  bankSwift: "BCMAMAMC",
  socialInstagram: "https://instagram.com/rafiqalkhair",
  socialFacebook: "https://facebook.com/rafiqalkhair",
  heroTitle: "رحلتك إلى بيت الله الحرام تبدأ من هنا",
  heroSubtitle: "اكتشف أرقى برامج العمرة من المغرب بكل عناية واحترافية، فنادق قريبة من الحرمين، طيران مباشر، وتأطير ديني متواصل ليضمن لك رحلة إيمانية لا تُنسى.",
  announcementText: "✨ فتح باب التسجيل لعمرة شعبان ورمضان وعمرة تركيا المباركة - المقاعد محدودة!",
  isAnnouncementActive: true,
  depositPercentage: 30,
  currency: "درهم مغربي (MAD)"
};

export const initialPackages: UmrahPackage[] = [
  {
    id: "pkg-shaban-ramadan",
    slug: "omra-chaban-ramadan",
    title: "عمرة شعبان ورمضان المباركة 1446",
    subtitle: "عمرة مباركة رحلة إيمانية تعلّ القلب سعادة - تنظيم احترافي وتأطير متكامل",
    category: "ramadan",
    categoryLabel: "موسم رمضان المبارك",
    departureCity: "الدار البيضاء (مطار محمد الخامس)",
    destinationCities: ["مكة المكرمة", "المدينة المنورة"],
    departureDate: "2026-02-18",
    returnDate: "2026-03-12",
    durationDays: 22,
    nightsMakkah: 12,
    nightsMadinah: 10,
    startingPrice: 18500,
    roomOptions: [
      { type: 'quint', label: 'غرفة خماسية', price: 18500, capacity: 5, available: true, notes: 'اقتصادية للعائلات والمجموعات' },
      { type: 'quad', label: 'غرفة رباعية', price: 19000, capacity: 4, available: true, notes: 'شائعة وممتازة' },
      { type: 'triple', label: 'غرفة ثلاثية', price: 19500, capacity: 3, available: true, notes: 'راحة وسكينة' },
      { type: 'double', label: 'غرفة ثنائية', price: 20500, capacity: 2, available: true, notes: 'خصوصية تامة' },
    ],
    hotels: [
      {
        name: "فندق تاج بارك مكة",
        city: "مكة المكرمة",
        stars: 4,
        distanceToHaram: "450 متر عن الحرم المكي الشريف",
        mealPlan: "شامل الإفطار بوفيه مفتوح",
        description: "فندق راقٍ يوفر غرفاً فسيحة ومكيفة مع إطلالات خلابة وقرب ممتاز من ساحات الحرم.",
        image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "فندق الحياة الماسي",
        city: "المدينة المنورة",
        stars: 4,
        distanceToHaram: "250 متر عن المسجد النبوي الشريف",
        mealPlan: "شامل الإفطار",
        description: "موقع استثنائي في المنطقة المركزية الشمالية على بعد دقائق معدودة سيراً على الأقدام من باب السلام.",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
      }
    ],
    airline: "الخطوط الملكية المغربية / الخطوط السعودية",
    flightDetails: "رحلة مباشرة ذهاباً وإياباً من مطار الدار البيضاء مع وزن أمتعة 2 حقائب (23 كغ) + حقيبة يد",
    includedServices: [
      "تذاكر الطيران ذهاباً وإياباً من الدار البيضاء",
      "التأشيرة الإلكترونية مع التأمين الطبي المعتمد",
      "الإقامة الفندقية المختارة في مكة المكرمة والمدينة المنورة",
      "التنقلات الداخلية بباصات VIP سياحية حديثة ومكيفة ومريحة",
      "مرشدون ومؤطرون دينيون ذوو خبرة لمرافقة المعتمرين طيلة الرحلة",
      "زيارات ومزارات تاريخية في مكة المكرمة والمدينة المنورة (غار حراء، ثور، قباء، أحد)",
      "حقيبة هدايا المعتمر (كتيب العمرة، حقيبة ظهر، ملصقات الأمتعة)",
      "خدمة مساعدة ودعم على مدار الساعة طوال أيام الأسبوع"
    ],
    excludedServices: [
      "المصاريف الشخصية والمشتريات الخاصة",
      "وجبات الغداء والعشاء غير المذكورة",
      "رسوم فحص طبي إضافي إن وجد"
    ],
    itinerary: [
      { dayNumber: 1, title: "الانطلاق من الدار البيضاء والوصول للمدينة المنورة", description: "التجمع بمطار محمد الخامس، إتمام إجراءات السفر، الوصول إلى مطار الأمير محمد بن عبد العزيز، الاستقبال والنقل إلى الفندق واستلام الغرف.", location: "المدينة المنورة" },
      { dayNumber: 2, title: "الصلاة بالمسجد النبوي وزيارة الروضة الشريفة", description: "أداء الصلوات بالمسجد النبوي الشريف والسلام على رسول الله ﷺ وصاحبيه، مع تنسيق دخول الروضة الشريفة بتصاريح نسك.", location: "المدينة المنورة" },
      { dayNumber: 3, title: "جولة المزارات النبوية الشريفة", description: "جولة صباحية بالحافلات لزيارة مسجد قباء، شهداء أحد وجبل الرماة، ومسجد القبلتين مع شروحات تاريخية غنية.", location: "المدينة المنورة" },
      { dayNumber: 10, title: "الإحرام والتوجه نحو مكة المكرمة", description: "الاغتسال وارتداء ملابس الإحرام من الفندق، التوجه لميقات ذي الحليفة (أبيار علي) لعقد نية العمرة، ثم ركوب قطار الحرمين السريع أو الحافلة إلى مكة المكرمة وأداء طواف وسعي العمرة في جماعة.", location: "مكة المكرمة" },
      { dayNumber: 15, title: "مزارات مكة المكرمة", description: "زيارة مشاعر منى ومزدلفة وعرفات، وجبل النور، مع إرشادات دعوية وتربوية راقية.", location: "مكة المكرمة" },
      { dayNumber: 22, title: "طواف الوداع والعودة إلى أرض الوطن", description: "أداء طواف الوداع ببيت الله الحرام، التوجه إلى مطار الملك عبد العزيز بجدة، والعودة بسلام إلى الدار البيضاء محملين بالخير والمغفرة.", location: "جدة / الدار البيضاء" }
    ],
    image: "/images/packages/shaban-ramadan.jpg",
    gallery: [
      "/images/packages/shaban-ramadan.jpg",
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1000&q=80"
    ],
    seatsTotal: 50,
    seatsBooked: 38,
    isFeatured: true,
    isSpecialOffer: true,
    rawadaAvailable: true,
    status: "active",
    createdAt: "2026-01-10T10:00:00Z"
  },
  {
    id: "pkg-nov-dec-medium-eco",
    slug: "omra-novembre-decembre-2026",
    title: "عمرة الخريف المباركة (البرنامج الاقتصادي والمتوسط)",
    subtitle: "تاريخ السفر: الذهاب 21 نونبر 2026 / العودة 05 دجنبر 2026 (15 يوماً)",
    category: "economic",
    categoryLabel: "برنامج اقتصادي ومتوسط",
    departureCity: "الدار البيضاء",
    destinationCities: ["مكة المكرمة", "المدينة المنورة"],
    departureDate: "2026-11-21",
    returnDate: "2026-12-05",
    durationDays: 15,
    nightsMakkah: 8,
    nightsMadinah: 6,
    startingPrice: 14500,
    roomOptions: [
      { type: 'quad', label: 'غرفة رباعية (البرنامج الاقتصادي)', price: 14500, capacity: 4, available: true, notes: 'فندق أسكن بمكة + فندق الحياة الماسي بالمدينة' },
      { type: 'triple', label: 'غرفة ثلاثية (البرنامج الاقتصادي)', price: 15500, capacity: 3, available: true, notes: 'فندق أسكن بمكة + فندق الحياة الماسي بالمدينة' },
      { type: 'double', label: 'غرفة ثنائية (البرنامج الاقتصادي)', price: 17500, capacity: 2, available: true, notes: 'فندق أسكن بمكة + فندق الحياة الماسي بالمدينة' },
      { type: 'quad', label: 'غرفة رباعية (البرنامج المتوسط)', price: 17000, capacity: 4, available: true, notes: 'فندق تاج بارك بمكة + فندق الحياة الماسي بالمدينة' },
      { type: 'triple', label: 'غرفة ثلاثية (البرنامج المتوسط)', price: 18500, capacity: 3, available: true, notes: 'فندق تاج بارك بمكة + فندق الحياة الماسي بالمدينة' },
      { type: 'double', label: 'غرفة ثنائية (البرنامج المتوسط)', price: 19500, capacity: 2, available: true, notes: 'فندق تاج بارك بمكة + فندق الحياة الماسي بالمدينة' },
    ],
    hotels: [
      {
        name: "فندق تاج بارك / فندق أسكن",
        city: "مكة المكرمة",
        stars: 4,
        distanceToHaram: "بين 350 إلى 600 متر عن ساحات الحرم",
        mealPlan: "حسب اختيار الباقة (متوفر بإفطار وبدون إفطار)",
        description: "فنادق فندقية ممتازة تضمن الراحة والنظافة الفائقة وقرباً سلساً من الحرم المكي الشريف.",
        image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "فندق الحياة الماسي",
        city: "المدينة المنورة",
        stars: 4,
        distanceToHaram: "250 متر عن المسجد النبوي الشريف",
        mealPlan: "شامل الإفطار",
        description: "إقامة هادئة بالقرب من باب الملك فهد والمسجد النبوي الشريف، خدمات راقية وتسهيلات كاملة للمعتمرين.",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
      }
    ],
    airline: "الخطوط السعودية / الملكية المغربية",
    flightDetails: "تذكرة سفر ذهاب وعودة من الدار البيضاء، أمتعة مسجلة مجانية",
    includedServices: [
      "الإقامة بالفنادق المتفق عليها بمكة والمدينة المنورة",
      "تذاكر الطيران ذهاب وعودة",
      "تأشيرة السعودية الإلكترونية مع التأمين الشامل",
      "التنقلات الداخلية بحافلات مكيفة حديثة",
      "مرافق ومرشد ديني طيلة فترة الإقامة",
      "ضمان ومتابعة للمسافرين لخدمة متواصلة",
      "زيارات المزارات الدينية بالمدينة المنورة ومكة"
    ],
    excludedServices: [
      "المصروفات الشخصية",
      "تأمين إضافي على الأمتعة الخاصة"
    ],
    itinerary: [
      { dayNumber: 1, title: "21 نونبر: السفر والوصول إلى المملكة", description: "الإقلاع من مطار الدار البيضاء، الاستقبال بمطار جدة أو المدينة ونقل المعتمرين إلى فندق الإقامة.", location: "المدينة المنورة" },
      { dayNumber: 2, title: "الصلاة بالمسجد النبوي وزيارات المدينة", description: "التشرف بزيارة قبر المصطفى ﷺ والروضة النبوية، وزيارة مسجد قباء وشهداء أحد.", location: "المدينة المنورة" },
      { dayNumber: 7, title: "الانتقال إلى مكة المكرمة والإحرام", description: "الاحرام من الميقات، الانتقال بحافلات حديثة لمكة، والتطويف وأداء مناسك العمرة جماعة.", location: "مكة المكرمة" },
      { dayNumber: 15, title: "05 دجنبر: ختام الرحلة والعودة", description: "طواف الوداع والاستعداد للمغادرة إلى المطار للعودة إلى الدار البيضاء.", location: "مكة / الدار البيضاء" }
    ],
    image: "/images/packages/nov-dec-2026.jpg",
    gallery: [
      "/images/packages/nov-dec-2026.jpg",
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
    ],
    seatsTotal: 45,
    seatsBooked: 29,
    isFeatured: true,
    isSpecialOffer: true,
    rawadaAvailable: true,
    status: "active",
    createdAt: "2026-01-15T10:00:00Z"
  },
  {
    id: "pkg-turkey-umrah-comb",
    slug: "omra-via-turquie-istanbul",
    title: "عمرة عبر تركيا - إسطنبول ومكة والمدينة",
    subtitle: "رحلة روحانية .. تنظيم احترافي مع الخطوط التركية من الدار البيضاء (04 إلى 20 دجنبر)",
    category: "turkey",
    categoryLabel: "برنامج العمرة المزدوجة مع إسطنبول",
    departureCity: "الدار البيضاء (الخطوط التركية)",
    destinationCities: ["إسطنبول", "مكة المكرمة", "المدينة المنورة"],
    departureDate: "2026-12-04",
    returnDate: "2026-12-20",
    durationDays: 17,
    nightsMakkah: 7,
    nightsMadinah: 4,
    nightsIstanbul: 5,
    startingPrice: 17000,
    roomOptions: [
      { type: 'quad', label: 'غرفة رباعية (البرنامج الأول - رويال اسطنبول + تاج بارك + رويال المدينة)', price: 17000, capacity: 4, available: true, notes: 'رويال اسطنبول بالإفطار + تاج بارك مكة بالإفطار + رويال المدينة' },
      { type: 'triple', label: 'غرفة ثلاثية (البرنامج الأول)', price: 18500, capacity: 3, available: true, notes: 'رويال اسطنبول بالإفطار + تاج بارك مكة بالإفطار + رويال المدينة' },
      { type: 'double', label: 'غرفة ثنائية (البرنامج الأول)', price: 20500, capacity: 2, available: true, notes: 'رويال اسطنبول بالإفطار + تاج بارك مكة بالإفطار + رويال المدينة' },
      { type: 'quad', label: 'غرفة رباعية (البرنامج الفاخر - رويال اسطنبول + فندق أنجم مكة + قال المدينة)', price: 20000, capacity: 4, available: true, notes: 'رويال اسطنبول بالإفطار + فندق أنجم مكة بالإفطار + قال بالمدينة بالإفطار' },
      { type: 'triple', label: 'غرفة ثلاثية (البرنامج الفاخر)', price: 23000, capacity: 3, available: true, notes: 'رويال اسطنبول بالإفطار + فندق أنجم مكة بالإفطار + قال بالمدينة بالإفطار' },
      { type: 'double', label: 'غرفة ثنائية (البرنامج الفاخر)', price: 26000, capacity: 2, available: true, notes: 'رويال اسطنبول بالإفطار + فندق أنجم مكة بالإفطار + قال بالمدينة بالإفطار' },
    ],
    hotels: [
      {
        name: "فندق رويال إسطنبول (Royal Istanbul)",
        city: "إسطنبول",
        stars: 4,
        distanceToHaram: "قلب المدينة التاريخية بجوار المعالم السياحية",
        mealPlan: "شامل وجبة الإفطار التركي الفاخر",
        description: "فندق أنيق يقع بالقرب من ميدان السلطان أحمد ومضيق البوسفور، خدمة وضيافة استثنائية.",
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "فندق أنجم مكة / تاج بارك",
        city: "مكة المكرمة",
        stars: 5,
        distanceToHaram: "مطل ومجاور لساحة الحرم المكي مباشرة",
        mealPlan: "شامل الإفطار بوفيه مفتوح",
        description: "أحد أفخم الفنادق المطلة على الحرم مع نفق خاص ومباشر إلى ساحات الصلاة وخدمات VIP.",
        image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "فندق رويال المدينة / قال المدينة",
        city: "المدينة المنورة",
        stars: 4,
        distanceToHaram: "150 متر عن ساحة الحرم النبوي",
        mealPlan: "شامل الإفطار",
        description: "موقع فريد أمام المسجد النبوي الشريف يوفر سهولة التحرك لكبار السن والعائلات.",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
      }
    ],
    airline: "الخطوط الجوية التركية (Turkish Airlines)",
    flightDetails: "الدار البيضاء ✈ إسطنبول ✈ جدة / المدينة ✈ إسطنبول ✈ الدار البيضاء مع خدمات الخطوط التركية المتميزة",
    includedServices: [
      "تذكرة الطائرة مع الخطوط التركية من الدار البيضاء ذهاباً وإياباً",
      "تأشيرة العمرة وتأمين السفر للمملكة السعودية",
      "التنقل داخل المملكة السعودية بحافلات VIP حديثة",
      "إقامة 5 ليالٍ في إسطنبول مع الإفطار و5 جولات سياحية اختيارية",
      "إقامة 7 ليالٍ في مكة المكرمة بالفنادق المحددة",
      "إقامة 4 ليالٍ في المدينة المنورة",
      "مزارات مكة المكرمة والمدينة المنورة",
      "تأطير ديني وتقني طيلة أيام الرحلة",
      "ملاحظة هامة: تصريح الروضة الشريفة مضمون ومتاح"
    ],
    excludedServices: [
      "رسوم تأشيرة تركيا (في حال كانت مطلوبة لبعض الجنسيات)",
      "المصاريف الترفيهية الفردية بإسطنبول"
    ],
    itinerary: [
      { dayNumber: 1, title: "04 دجنبر: السفر إلى إسطنبول الساحرة", description: "الإقلاع من مطار محمد الخامس عبر الخطوط التركية، الوصول لإسطنبول، الاستقبال والنقل للفندق، جولة مسائية حرة.", location: "إسطنبول" },
      { dayNumber: 3, title: "جولة البوسفور والمعالم الإسلامية", description: "رحلة بحرية في مضيق البوسفور وزيارة جامع السلطان أحمد، آيا صوفيا، وتوبكابي سراي.", location: "إسطنبول" },
      { dayNumber: 6, title: "09 دجنبر: التوجه إلى مكة المكرمة لأداء العمرة", description: "السفر من إسطنبول إلى جدة، الإحرام على متن الطائرة، الاستقبال والانتقال لفندق مكة، وأداء طواف وسعي العمرة.", location: "مكة المكرمة" },
      { dayNumber: 12, title: "16 دجنبر: الانتقال إلى طيبة الطيبة (المدينة المنورة)", description: "الانتقال إلى المدينة المنورة، استلام الغرف، وزيارة السلام على النبي ﷺ وزيارة الروضة الشريفة.", location: "المدينة المنورة" },
      { dayNumber: 17, title: "20 دجنبر: العودة إلى أرض الوطن", description: "ختام الرحلة المباركة والعودة عبر الخطوط التركية إلى الدار البيضاء.", location: "الدار البيضاء" }
    ],
    image: "/images/packages/turkey-umrah.jpg",
    gallery: [
      "/images/packages/turkey-umrah.jpg",
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
    ],
    seatsTotal: 40,
    seatsBooked: 27,
    isFeatured: true,
    isSpecialOffer: true,
    rawadaAvailable: true,
    status: "active",
    createdAt: "2026-01-18T10:00:00Z"
  }
];

export const initialReviews: ReviewItem[] = [
  {
    id: "rev-1",
    name: "الحاج عبد الرحيم بنجلون",
    city: "فاس",
    packageName: "عمرة شعبان ورمضان",
    rating: 5,
    date: "قبل أسبوعين",
    comment: "ما شاء الله، رحلة في قمة التنظيم من وكالة رفيق الخير. الفنادق كانت قريبة جداً من الحرم والتأطير الديني كان في المستوى الرفيع، جزاهم الله خيراً.",
    verified: true
  },
  {
    id: "rev-2",
    name: "لالة فاطمة الزهراء العلمي",
    city: "الدار البيضاء",
    packageName: "عمرة عبر تركيا",
    rating: 5,
    date: "قبل شهر",
    comment: "تجربة الجمع بين زيارة معالم إسطنبول وأداء مناسك العمرة في مكة والمدينة كانت رائعة جداً، واهتمام طاقم الوكالة بوالدتي المسنة كان استثنائياً.",
    verified: true
  },
  {
    id: "rev-3",
    name: "محمد الصديقي",
    city: "الرباط",
    packageName: "البرنامج الاقتصادي المتميز",
    rating: 5,
    date: "قبل 3 أسابيع",
    comment: "السعر كان ممتازاً مقارنة بالجودة، دقة في المواعيد، وحافلات النقل جديدة ومريحة. سأكرر السفر مع رفيق الخير بإذن الله.",
    verified: true
  }
];

export const initialFaqs: FaqItem[] = [
  {
    id: "faq-1",
    category: "booking",
    question: "كيف أقوم بحجز رحلة العمرة مع وكالة رفيق الخير؟",
    answer: "يمكنك الحجز بسهولة عبر اختيار الباقة المناسبة، تحديد نوع الغرفة وعدد المسافرين، وتعبئة بياناتكم. بعد ذلك يتم تأكيد الحجز إما بدفع العربون (30%) عبر الحساب البنكي أو بمقر الوكالة، أو عبر الموقع الإلكتروني."
  },
  {
    id: "faq-2",
    category: "visas",
    question: "ما هي الوثائق المطلوبة لاستخراج تأشيرة العمرة من المغرب؟",
    answer: "جواز سفر بيومتري صالح لأكثر من 6 أشهر، صورة شخصية حديثة بخلفية بيضاء، وبيانات بطاقة التعريف الوطنية. نحن نتكفل بجميع إجراءات التأشيرة والتأمين الصحي السعودي."
  },
  {
    id: "faq-3",
    category: "hotels",
    question: "كم تبعد الفنادق عن الحرم المكي والحرم النبوي؟",
    answer: "فنادقنا مصنفة بين 4 و5 نجوم وتقع على مسافة قريبة جداً تتراوح بين 150 إلى 500 متر عن ساحات الحرمين، مما يسهل على المعتمرين أداء الصلوات في أوقاتها بكل راحة."
  },
  {
    id: "faq-4",
    category: "flights",
    question: "هل الرحلات الجوية مباشرة؟ وما هي شركات الطيران المعتمدة؟",
    answer: "نوفر رحلات على متن الخطوط الملكية المغربية، الخطوط السعودية، والخطوط التركية (لبرامج عمرة تركيا)، مع توفير أوزان أمتعة مناسبة (حقيبتين 23 كغ للمعتمر) وخدمة نقل مباشرة من وإلى المطارات."
  },
  {
    id: "faq-5",
    category: "booking",
    question: "هل يمكنني دفع عربون فقط لتأكيد المقعد وتأجيل الباقي؟",
    answer: "نعم بكل تأكيد، يكفي دفع عربون 30% من قيمة الرحلة لتثبيت المقعد، ويمكن سداد باقي المبلغ على دفعات قبل موعد السفر بـ 15 يوماً."
  }
];
