import { TenantDocument, Status, FileUpload } from './common'

export interface Event extends TenantDocument {
  // Basic info
  title: string
  description: string
  slug: string
  
  // Media
  coverImage?: FileUpload
  gallery?: FileUpload[]
  
  // Timing
  startDate: Date
  endDate: Date
  timezone: string
  isAllDay: boolean
  
  // Location
  location: EventLocation
  
  // Pricing & Tickets
  ticketing: EventTicketing
  
  // Access & Visibility
  visibility: EventVisibility
  status: EventStatus
  
  // Organization
  organizerId: string
  organizerInfo: EventOrganizer
  
  // Settings
  settings: EventSettings
  
  // Metadata
  attendeeCount: number
  maxAttendees?: number
  views: number
  
  // SEO
  metaTitle?: string
  metaDescription?: string
  
  // Social
  allowComments: boolean
  allowSharing: boolean
}

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published', 
  CANCELLED = 'cancelled',
  POSTPONED = 'postponed',
  COMPLETED = 'completed'
}

export enum EventVisibility {
  PUBLIC = 'public',
  MEMBERS_ONLY = 'members-only',
  PRIVATE = 'private',
  INVITE_ONLY = 'invite-only'
}

export interface EventLocation {
  type: 'physical' | 'virtual' | 'hybrid'
  
  // Physical location
  venue?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  latitude?: number
  longitude?: number
  
  // Virtual location
  virtualUrl?: string
  virtualPlatform?: string
  virtualInstructions?: string
  
  // Accessibility
  isAccessible: boolean
  accessibilityNotes?: string
}

export interface EventTicketing {
  type: 'free' | 'paid' | 'donation'
  
  // Free events
  requiresRegistration: boolean
  
  // Paid events
  currency: string
  tickets: EventTicket[]
  
  // Member pricing
  memberDiscount: MemberDiscount
  
  // Sales settings
  salesStart: Date
  salesEnd: Date
  
  // Donation events  
  suggestedDonation?: number
  minimumDonation?: number
}

export interface EventTicket {
  id: string
  name: string
  description?: string
  type: TicketType
  
  // Pricing
  price: number
  memberPrice?: number
  
  // Availability
  quantity: number
  sold: number
  maxPerOrder: number
  
  // Timing
  salesStart: Date
  salesEnd: Date
  
  // Access
  includesAccess: string[]
  
  // Settings
  isVisible: boolean
  requiresApproval: boolean
}

export enum TicketType {
  GENERAL = 'general',
  VIP = 'vip',
  EARLY_BIRD = 'early-bird',
  STUDENT = 'student',
  SENIOR = 'senior',
  GROUP = 'group',
  VOLUNTEER = 'volunteer'
}

export interface MemberDiscount {
  enabled: boolean
  type: 'percentage' | 'fixed' | 'free'
  value: number
  description?: string
  requiresCode?: boolean
  code?: string
}

export interface EventOrganizer {
  id: string
  name: string
  email: string
  phone?: string
  website?: string
  bio?: string
  avatar?: FileUpload
}

export interface EventSettings {
  // Registration
  requiresApproval: boolean
  allowWaitlist: boolean
  collectAttendeeInfo: boolean
  customFields: EventCustomField[]
  
  // Communication
  enableEventFeed: boolean
  allowAttendeePosts: boolean
  moderateEventFeed: boolean
  
  // Notifications
  sendReminderEmails: boolean
  reminderDays: number[]
  sendFollowUpEmail: boolean
  
  // Check-in
  enableCheckIn: boolean
  requireCheckIn: boolean
  
  // Integrations
  syncToCalendar: boolean
  enableZoom: boolean
  zoomMeetingId?: string
}

export interface EventCustomField {
  id: string
  name: string
  type: 'text' | 'email' | 'phone' | 'select' | 'multiselect' | 'checkbox' | 'textarea'
  required: boolean
  options?: string[]
  placeholder?: string
  validation?: string
}

// Event registration and attendance
export interface EventRegistration extends TenantDocument {
  eventId: string
  userId: string
  ticketId: string
  
  // Registration details
  status: RegistrationStatus
  registeredAt: Date
  
  // Ticket info
  ticketType: string
  quantity: number
  totalPrice: number
  
  // Payment
  paymentStatus: PaymentStatus
  paymentId?: string
  
  // Check-in
  checkedIn: boolean
  checkedInAt?: Date
  checkedInBy?: string
  
  // Custom fields
  customFields: Record<string, any>
  
  // Communication
  confirmationSent: boolean
  remindersSent: number
}

export enum RegistrationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  WAITLISTED = 'waitlisted',
  DECLINED = 'declined'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

// DTOs for API operations
export interface CreateEventDTO {
  title: string
  description: string
  startDate: Date
  endDate: Date
  timezone: string
  location: Partial<EventLocation>
  ticketing: Partial<EventTicketing>
  visibility: EventVisibility
  coverImage?: FileUpload
  settings?: Partial<EventSettings>
}

export interface UpdateEventDTO {
  title?: string
  description?: string
  startDate?: Date
  endDate?: Date
  location?: Partial<EventLocation>
  ticketing?: Partial<EventTicketing>
  visibility?: EventVisibility
  status?: EventStatus
  coverImage?: FileUpload
  settings?: Partial<EventSettings>
}

export interface EventListDTO {
  id: string
  title: string
  slug: string
  description: string
  startDate: Date
  endDate: Date
  location: EventLocation
  coverImage?: FileUpload
  ticketing: {
    type: EventTicketing['type']
    lowestPrice?: number
    memberPrice?: number
    soldOut: boolean
  }
  organizerInfo: Pick<EventOrganizer, 'name' | 'avatar'>
  attendeeCount: number
  maxAttendees?: number
  status: EventStatus
  visibility: EventVisibility
}

export interface EventDetailsDTO extends EventListDTO {
  gallery?: FileUpload[]
  organizerInfo: EventOrganizer
  settings: EventSettings
  tickets: EventTicket[]
  userRegistration?: EventRegistration
  canRegister: boolean
  canEdit: boolean
  canManage: boolean
}

// Event statistics
export interface EventStats {
  totalEvents: number
  upcomingEvents: number
  completedEvents: number
  totalRevenue: number
  totalAttendees: number
  averageAttendees: number
  topEvents: Array<{
    eventId: string
    title: string
    attendees: number
    revenue: number
  }>
}