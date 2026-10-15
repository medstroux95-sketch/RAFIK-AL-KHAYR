import fs from 'fs';
import path from 'path';
import {
  UmrahPackage,
  Booking,
  SiteSettings,
  ReviewItem,
  FaqItem,
  InquiryMessage,
  PaymentRecord,
  AuditLog,
  BookingStatus,
  PaymentStatus,
  PaymentMethod
} from '../types';
import {
  initialPackages,
  initialSiteSettings,
  initialReviews,
  initialFaqs
} from '../data/seedData';

interface DatabaseSchema {
  packages: UmrahPackage[];
  bookings: Booking[];
  payments: PaymentRecord[];
  reviews: ReviewItem[];
  faqs: FaqItem[];
  inquiries: InquiryMessage[];
  settings: SiteSettings;
  auditLogs: AuditLog[];
}

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

function ensureDataFile(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const dir = path.dirname(DB_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const initialDb: DatabaseSchema = {
        packages: initialPackages,
        bookings: [
          {
            id: "bkg-1001",
            bookingCode: "RAK-2026-9041",
            packageId: "pkg-shaban-ramadan",
            packageName: "عمرة شعبان ورمضان المباركة 1446",
            packageSlug: "omra-chaban-ramadan",
            departureDate: "2026-02-18",
            departureCity: "الدار البيضاء",
            roomType: "double",
            roomTypeLabel: "غرفة ثنائية",
            roomPricePerPerson: 20500,
            travelersCount: 2,
            travelers: [
              { fullName: "الحاج رشيد التازي", gender: "ذكر", isPrimary: true },
              { fullName: "لالة خديجة التازي", gender: "أنثى", isPrimary: false }
            ],
            primaryContact: {
              fullName: "الحاج رشيد التازي",
              phone: "0661234567",
              whatsapp: "212661234567",
              email: "tazi.rachid@gmail.com",
              city: "الدار البيضاء",
              notes: "يرجى توفير مقاعد متجاورة في الطائرة وغرفة مطلة إن أمكن"
            },
            discountAmount: 0,
            totalAmount: 41000,
            depositAmount: 12300,
            paidAmount: 12300,
            remainingAmount: 28700,
            paymentStatus: "deposit_paid",
            paymentMethod: "bank_transfer",
            status: "confirmed",
            createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            internalNotes: ["تم التحقق من إيصال التحويل البنكي والتأكيد للعميل هاتفياً"]
          },
          {
            id: "bkg-1002",
            bookingCode: "RAK-2026-8812",
            packageId: "pkg-turkey-umrah-comb",
            packageName: "عمرة عبر تركيا - إسطنبول ومكة والمدينة",
            packageSlug: "omra-via-turquie-istanbul",
            departureDate: "2026-12-04",
            departureCity: "الدار البيضاء (الخطوط التركية)",
            roomType: "quad",
            roomTypeLabel: "غرفة رباعية (البرنامج الأول)",
            roomPricePerPerson: 17000,
            travelersCount: 4,
            travelers: [
              { fullName: "عمر العلمي", gender: "ذكر", isPrimary: true },
              { fullName: "يوسف العلمي", gender: "ذكر" },
              { fullName: "أمينة المنصوري", gender: "أنثى" },
              { fullName: "سلمى العلمي", gender: "أنثى" }
            ],
            primaryContact: {
              fullName: "عمر العلمي",
              phone: "0662889900",
              whatsapp: "212662889900",
              city: "مراكش",
              email: "omar.alami@outlook.com"
            },
            discountAmount: 1000,
            couponCode: "RAMADANMUBARAK",
            totalAmount: 67000,
            depositAmount: 20100,
            paidAmount: 67000,
            remainingAmount: 0,
            paymentStatus: "fully_paid",
            paymentMethod: "card_online",
            status: "confirmed",
            createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
            internalNotes: ["الدفع تم إلكترونياً بنجاح، جاري استخراج تأشيرات العمرة وتذاكر الخطوط التركية"]
          }
        ],
        payments: [
          {
            id: "pay-101",
            bookingId: "bkg-1001",
            bookingCode: "RAK-2026-9041",
            amount: 12300,
            method: "bank_transfer",
            reference: "VIR-ATTIJARI-89211",
            receiptNumber: "REC-2026-0045",
            status: "completed",
            date: new Date(Date.now() - 86400000 * 2).toISOString(),
            notes: "عربون الحجز 30% مسدد بحساب الوكالة بالتجاري وفا بنك"
          },
          {
            id: "pay-102",
            bookingId: "bkg-1002",
            bookingCode: "RAK-2026-8812",
            amount: 67000,
            method: "cmi_card",
            reference: "CARD-AUTH-992318",
            receiptNumber: "REC-2026-0046",
            status: "completed",
            date: new Date(Date.now() - 86400000 * 1).toISOString(),
            notes: "أداء إلكتروني آمن للرحلة بالكامل"
          }
        ],
        reviews: initialReviews,
        faqs: initialFaqs,
        inquiries: [
          {
            id: "inq-1",
            fullName: "عبد الله الصنهاجي",
            phone: "0664556677",
            email: "senhaji@gmail.com",
            subject: "استفسار بخصوص عمرة شعبان ورمضان للعائلة",
            packageInterest: "عمرة شعبان ورمضان المباركة 1446",
            message: "السلام عليكم، نريد حجز غرفتين ثنائيتين لوالدي ولزوجتي، هل الفندق به كراسي متحركة لسهولة التنقل للحرم؟",
            status: "new",
            createdAt: new Date().toISOString()
          }
        ],
        settings: initialSiteSettings,
        auditLogs: [
          {
            id: "log-1",
            action: "INITIALIZATION",
            entity: "SYSTEM",
            entityId: "SYSTEM",
            performedBy: "مدير النظام",
            details: "تهيئة منصة رفيق الخير للسفر والسياحة بنجاح بكافة بيانات العروض والتسعيرات",
            timestamp: new Date().toISOString()
          }
        ]
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }

    const content = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error("Database reading error, using memory fallback", err);
    return {
      packages: initialPackages,
      bookings: [],
      payments: [],
      reviews: initialReviews,
      faqs: initialFaqs,
      inquiries: [],
      settings: initialSiteSettings,
      auditLogs: []
    };
  }
}

function saveDb(data: DatabaseSchema): boolean {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tempPath = `${DB_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, DB_PATH);
    return true;
  } catch (error) {
    console.error("Failed to save database:", error);
    return false;
  }
}

// ------------------- PACKAGES -------------------
export async function getPackages(): Promise<UmrahPackage[]> {
  const db = ensureDataFile();
  return db.packages;
}

export async function getPackageById(id: string): Promise<UmrahPackage | undefined> {
  const db = ensureDataFile();
  return db.packages.find(p => p.id === id || p.slug === id);
}

export async function createPackage(pkgData: Omit<UmrahPackage, 'id' | 'createdAt'>): Promise<UmrahPackage> {
  const db = ensureDataFile();
  const newPkg: UmrahPackage = {
    ...pkgData,
    id: `pkg-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  db.packages.unshift(newPkg);
  saveDb(db);
  await addAuditLog({
    action: "CREATE_PACKAGE",
    entity: "PACKAGE",
    entityId: newPkg.id,
    performedBy: "مدير البرامج",
    details: `تم إضافة برنامج جديد: ${newPkg.title}`
  });
  return newPkg;
}

export async function updatePackage(id: string, updates: Partial<UmrahPackage>): Promise<UmrahPackage | null> {
  const db = ensureDataFile();
  const index = db.packages.findIndex(p => p.id === id);
  if (index === -1) return null;

  db.packages[index] = {
    ...db.packages[index],
    ...updates
  };
  saveDb(db);
  await addAuditLog({
    action: "UPDATE_PACKAGE",
    entity: "PACKAGE",
    entityId: id,
    performedBy: "مدير البرامج",
    details: `تم تحديث بيانات البرنامج: ${db.packages[index].title}`
  });
  return db.packages[index];
}

export async function deletePackage(id: string): Promise<boolean> {
  const db = ensureDataFile();
  const initialLength = db.packages.length;
  db.packages = db.packages.filter(p => p.id !== id);
  if (db.packages.length !== initialLength) {
    saveDb(db);
    await addAuditLog({
      action: "DELETE_PACKAGE",
      entity: "PACKAGE",
      entityId: id,
      performedBy: "مدير البرامج",
      details: `تم حذف البرنامج رقم: ${id}`
    });
    return true;
  }
  return false;
}

// ------------------- BOOKINGS -------------------
export async function getBookings(): Promise<Booking[]> {
  const db = ensureDataFile();
  return db.bookings;
}

export async function getBookingByCode(code: string, phone?: string): Promise<Booking | null> {
  const db = ensureDataFile();
  const cleanCode = code.trim().toUpperCase();
  const booking = db.bookings.find(b => b.bookingCode.toUpperCase() === cleanCode);
  if (!booking) return null;

  if (phone) {
    const cleanInputPhone = phone.replace(/\D/g, '');
    const cleanStoredPhone = booking.primaryContact.phone.replace(/\D/g, '');
    if (!cleanStoredPhone.endsWith(cleanInputPhone.slice(-8))) {
      return null;
    }
  }

  return booking;
}

export async function createBooking(data: {
  packageId: string;
  roomType: string;
  travelersCount: number;
  travelers: { fullName: string; gender?: 'ذكر' | 'أنثى'; passportNumber?: string }[];
  primaryContact: {
    fullName: string;
    phone: string;
    whatsapp: string;
    email?: string;
    city: string;
    notes?: string;
  };
  paymentMethod: PaymentMethod;
  couponCode?: string;
  isDepositOnly?: boolean;
}): Promise<Booking> {
  const db = ensureDataFile();
  const pkg = db.packages.find(p => p.id === data.packageId);
  if (!pkg) {
    throw new Error("البرنامج المطلوب غير متوفر");
  }

  // Check capacity
  if (pkg.seatsBooked + data.travelersCount > pkg.seatsTotal) {
    throw new Error(`عذراً، المقاعد المتبقية في هذه الرحلة هي ${pkg.seatsTotal - pkg.seatsBooked} مقاعد فقط`);
  }

  const room = pkg.roomOptions.find(r => r.type === data.roomType) || pkg.roomOptions[0];
  const pricePerPerson = room.price;
  let totalAmount = pricePerPerson * data.travelersCount;

  let discountAmount = 0;
  if (data.couponCode && data.couponCode.trim().toUpperCase() === "RAMADANMUBARAK") {
    discountAmount = 1000;
    totalAmount = Math.max(0, totalAmount - discountAmount);
  }

  const depositRate = db.settings.depositPercentage || 30;
  const depositAmount = Math.round((totalAmount * depositRate) / 100);

  // Generate Unique Booking Code
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const bookingCode = `RAK-2026-${randomSuffix}`;

  let paidAmount = 0;
  let paymentStatus: PaymentStatus = 'pending';
  let bookingStatus: BookingStatus = 'new';

  if (data.paymentMethod === 'card_online') {
    paidAmount = data.isDepositOnly ? depositAmount : totalAmount;
    paymentStatus = data.isDepositOnly ? 'deposit_paid' : 'fully_paid';
    bookingStatus = 'confirmed';
  }

  const newBooking: Booking = {
    id: `bkg-${Date.now()}`,
    bookingCode,
    packageId: pkg.id,
    packageName: pkg.title,
    packageSlug: pkg.slug,
    departureDate: pkg.departureDate,
    departureCity: pkg.departureCity,
    roomType: room.type,
    roomTypeLabel: room.label,
    roomPricePerPerson: pricePerPerson,
    travelersCount: data.travelersCount,
    travelers: data.travelers,
    primaryContact: data.primaryContact,
    couponCode: data.couponCode,
    discountAmount,
    totalAmount,
    depositAmount,
    paidAmount,
    remainingAmount: Math.max(0, totalAmount - paidAmount),
    paymentStatus,
    paymentMethod: data.paymentMethod,
    status: bookingStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    internalNotes: [
      `تم إنشاء الحجز عبر الموقع الإلكتروني بتاريخ ${new Date().toLocaleDateString('ar-MA')}`,
      `طريقة الدفع المختارة: ${data.paymentMethod}`
    ]
  };

  // Update booked seats count in package
  pkg.seatsBooked += data.travelersCount;

  db.bookings.unshift(newBooking);

  if (paidAmount > 0) {
    db.payments.unshift({
      id: `pay-${Date.now()}`,
      bookingId: newBooking.id,
      bookingCode: newBooking.bookingCode,
      amount: paidAmount,
      method: data.paymentMethod === 'card_online' ? 'cmi_card' : 'cash',
      reference: `PAY-${Date.now().toString().slice(-6)}`,
      receiptNumber: `REC-${newBooking.bookingCode.replace('RAK-', '')}`,
      status: 'completed',
      date: new Date().toISOString(),
      notes: data.isDepositOnly ? "عربون الحجز الإلكتروني" : "دفع المبلغ الإجمالي للحجز"
    });
  }

  saveDb(db);

  await addAuditLog({
    action: "NEW_BOOKING",
    entity: "BOOKING",
    entityId: newBooking.bookingCode,
    performedBy: data.primaryContact.fullName,
    details: `حجز جديد برقم ${newBooking.bookingCode} للبرنامج: ${pkg.title} - عدد المسافرين: ${data.travelersCount}`
  });

  return newBooking;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
  paymentStatus?: PaymentStatus,
  note?: string
): Promise<Booking | null> {
  const db = ensureDataFile();
  const booking = db.bookings.find(b => b.id === id || b.bookingCode === id);
  if (!booking) return null;

  booking.status = status;
  if (paymentStatus) {
    booking.paymentStatus = paymentStatus;
  }
  booking.updatedAt = new Date().toISOString();

  if (note) {
    if (!booking.internalNotes) booking.internalNotes = [];
    booking.internalNotes.push(`[${new Date().toLocaleDateString('ar-MA')}]: ${note}`);
  }

  saveDb(db);

  await addAuditLog({
    action: "UPDATE_BOOKING_STATUS",
    entity: "BOOKING",
    entityId: booking.bookingCode,
    performedBy: "موظف الحجوزات",
    details: `تعديل حالة الحجز ${booking.bookingCode} إلى ${status}`
  });

  return booking;
}

export async function recordBookingPayment(
  bookingId: string,
  amount: number,
  method: 'cash' | 'bank_transfer' | 'cmi_card',
  reference: string,
  note?: string
): Promise<PaymentRecord | null> {
  const db = ensureDataFile();
  const booking = db.bookings.find(b => b.id === bookingId || b.bookingCode === bookingId);
  if (!booking) return null;

  const payment: PaymentRecord = {
    id: `pay-${Date.now()}`,
    bookingId: booking.id,
    bookingCode: booking.bookingCode,
    amount,
    method,
    reference,
    receiptNumber: `REC-${Date.now().toString().slice(-5)}`,
    status: 'completed',
    date: new Date().toISOString(),
    notes: note
  };

  db.payments.unshift(payment);

  booking.paidAmount += amount;
  booking.remainingAmount = Math.max(0, booking.totalAmount - booking.paidAmount);

  if (booking.remainingAmount <= 0) {
    booking.paymentStatus = 'fully_paid';
    booking.status = 'confirmed';
  } else if (booking.paidAmount > 0) {
    booking.paymentStatus = 'deposit_paid';
    booking.status = 'confirmed';
  }
  booking.updatedAt = new Date().toISOString();

  if (!booking.internalNotes) booking.internalNotes = [];
  booking.internalNotes.push(`تم تسجيل دفعة مالية بقيمة ${amount.toLocaleString('ar-MA')} درهم مرجع (${reference})`);

  saveDb(db);

  await addAuditLog({
    action: "RECORD_PAYMENT",
    entity: "PAYMENT",
    entityId: payment.receiptNumber,
    performedBy: "القسم المالي",
    details: `تسجيل دفعة بقيمة ${amount} درهم للحجز ${booking.bookingCode}`
  });

  return payment;
}

// ------------------- SITE SETTINGS -------------------
export async function getSettings(): Promise<SiteSettings> {
  const db = ensureDataFile();
  return db.settings;
}

export async function updateSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = ensureDataFile();
  db.settings = {
    ...db.settings,
    ...updates
  };
  saveDb(db);
  await addAuditLog({
    action: "UPDATE_SETTINGS",
    entity: "SETTINGS",
    entityId: "CONFIG",
    performedBy: "مدير الموقع",
    details: "تحديث الإعدادات العامة للموقع وهوية الوكالة"
  });
  return db.settings;
}

// ------------------- REVIEWS -------------------
export async function getReviews(): Promise<ReviewItem[]> {
  const db = ensureDataFile();
  return db.reviews;
}

export async function addReview(review: Omit<ReviewItem, 'id' | 'date'>): Promise<ReviewItem> {
  const db = ensureDataFile();
  const newReview: ReviewItem = {
    ...review,
    id: `rev-${Date.now()}`,
    date: "الآن"
  };
  db.reviews.unshift(newReview);
  saveDb(db);
  return newReview;
}

// ------------------- FAQS -------------------
export async function getFaqs(): Promise<FaqItem[]> {
  const db = ensureDataFile();
  return db.faqs;
}

// ------------------- INQUIRIES -------------------
export async function getInquiries(): Promise<InquiryMessage[]> {
  const db = ensureDataFile();
  return db.inquiries;
}

export async function createInquiry(data: Omit<InquiryMessage, 'id' | 'status' | 'createdAt'>): Promise<InquiryMessage> {
  const db = ensureDataFile();
  const newInq: InquiryMessage = {
    ...data,
    id: `inq-${Date.now()}`,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  db.inquiries.unshift(newInq);
  saveDb(db);
  return newInq;
}

// ------------------- AUDIT LOGS -------------------
export async function getAuditLogs(): Promise<AuditLog[]> {
  const db = ensureDataFile();
  return db.auditLogs;
}

export async function addAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>): Promise<void> {
  try {
    const db = ensureDataFile();
    db.auditLogs.unshift({
      ...log,
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString()
    });
    // Keep max 200 logs
    if (db.auditLogs.length > 200) {
      db.auditLogs = db.auditLogs.slice(0, 200);
    }
    saveDb(db);
  } catch (e) {
    console.error("Failed to add audit log", e);
  }
}

// ------------------- DASHBOARD STATS -------------------
export async function getDashboardStats() {
  const db = ensureDataFile();
  const totalBookings = db.bookings.length;
  const newBookings = db.bookings.filter(b => b.status === 'new' || b.status === 'pending_review').length;
  const confirmedBookings = db.bookings.filter(b => b.status === 'confirmed').length;

  const totalCollectedRevenue = db.payments.reduce((acc, p) => acc + (p.status === 'completed' ? p.amount : 0), 0);
  const totalPendingAmount = db.bookings.reduce((acc, b) => acc + (b.status !== 'cancelled' ? b.remainingAmount : 0), 0);

  const totalPilgrims = db.bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((acc, b) => acc + b.travelersCount, 0);

  const totalCapacity = db.packages.reduce((acc, p) => acc + p.seatsTotal, 0);
  const totalBookedSeats = db.packages.reduce((acc, p) => acc + p.seatsBooked, 0);

  return {
    totalBookings,
    newBookings,
    confirmedBookings,
    totalCollectedRevenue,
    totalPendingAmount,
    totalPilgrims,
    totalCapacity,
    totalBookedSeats,
    packagesCount: db.packages.length
  };
}
