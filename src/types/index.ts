export type RoomType = 'double' | 'triple' | 'quad' | 'quint';

export interface RoomOption {
  type: RoomType;
  label: string;
  price: number;
  capacity: number;
  available: boolean;
  notes?: string;
}

export interface HotelDetail {
  name: string;
  city: 'مكة المكرمة' | 'المدينة المنورة' | 'إسطنبول' | string;
  stars: number;
  distanceToHaram?: string;
  description?: string;
  mealPlan?: string;
  image?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  location: string;
}

export type PackageCategory = 'ramadan' | 'economic' | 'medium' | 'turkey' | 'luxury';

export interface UmrahPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: PackageCategory;
  categoryLabel: string;
  departureCity: string;
  destinationCities: string[];
  departureDate: string;
  returnDate: string;
  durationDays: number;
  nightsMakkah: number;
  nightsMadinah: number;
  nightsIstanbul?: number;
  startingPrice: number;
  roomOptions: RoomOption[];
  hotels: HotelDetail[];
  airline: string;
  flightDetails: string;
  includedServices: string[];
  excludedServices: string[];
  itinerary: ItineraryDay[];
  image: string;
  gallery: string[];
  seatsTotal: number;
  seatsBooked: number;
  isFeatured: boolean;
  isSpecialOffer: boolean;
  rawadaAvailable?: boolean;
  status: 'active' | 'archived' | 'draft';
  createdAt: string;
}

export interface BookingTraveler {
  fullName: string;
  gender?: 'ذكر' | 'أنثى';
  passportNumber?: string;
  birthDate?: string;
  isPrimary?: boolean;
}

export type BookingStatus =
  | 'draft'
  | 'new'
  | 'pending_review'
  | 'pending_payment'
  | 'confirmed'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'pending' | 'deposit_paid' | 'fully_paid' | 'refunded';

export type PaymentMethod = 'cash_agency' | 'bank_transfer' | 'card_online' | 'unpaid';

export interface Booking {
  id: string;
  bookingCode: string;
  packageId: string;
  packageName: string;
  packageSlug: string;
  departureDate: string;
  departureCity: string;
  roomType: RoomType;
  roomTypeLabel: string;
  roomPricePerPerson: number;
  travelersCount: number;
  travelers: BookingTraveler[];
  primaryContact: {
    fullName: string;
    phone: string;
    whatsapp: string;
    email?: string;
    city: string;
    notes?: string;
  };
  couponCode?: string;
  discountAmount: number;
  totalAmount: number;
  depositAmount: number;
  paidAmount: number;
  remainingAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  internalNotes?: string[];
  cancellationReason?: string;
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  bookingCode: string;
  amount: number;
  method: 'cash' | 'bank_transfer' | 'cmi_card';
  reference: string;
  receiptNumber: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  notes?: string;
}

export interface SiteSettings {
  agencyName: string;
  agencySubtitle: string;
  slogan: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  country: string;
  licenseNumber: string;
  bankName: string;
  bankRib: string;
  bankSwift?: string;
  socialInstagram: string;
  socialFacebook: string;
  heroTitle: string;
  heroSubtitle: string;
  announcementText: string;
  isAnnouncementActive: boolean;
  depositPercentage: number;
  currency: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  city: string;
  packageName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'visas' | 'hotels' | 'flights';
}

export interface InquiryMessage {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  subject: string;
  packageInterest?: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  performedBy: string;
  details: string;
  timestamp: string;
}
