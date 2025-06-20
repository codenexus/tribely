import { BaseDocument, Status, FileUpload } from './common'

export interface Tenant extends BaseDocument {
  name: string
  slug: string
  description?: string
  
  // Domain configuration
  domain?: string
  subdomain?: string
  
  // Branding
  logo?: FileUpload
  favicon?: FileUpload
  primaryColor: string
  secondaryColor: string
  customCSS?: string
  
  // Settings
  settings: TenantSettings
  
  // Status and metadata
  status: Status
  ownerId: string
  
  // Billing (for SaaS mode)
  plan?: TenantPlan
  billingEmail?: string
  
  // Limits
  limits: TenantLimits
}

export interface TenantSettings {
  // Feature toggles
  features: {
    socialFeed: boolean
    eventTicketing: boolean
    messaging: boolean
    imageUploads: boolean
    paymentProcessing: boolean
    eventFeeds: boolean
    memberDirectory: boolean
  }
  
  // Membership configuration
  membership: {
    type: 'free' | 'paid' | 'invite-only'
    requireApproval: boolean
    allowSelfRegistration: boolean
    
    // Pricing (if paid)
    monthlyPrice?: number
    quarterlyPrice?: number
    annualPrice?: number
    
    // Discounts
    memberDiscountPercent: number
    memberDiscountType: 'percentage' | 'fixed'
  }
  
  // Event configuration
  events: {
    allowPublicEvents: boolean
    requireMembershipForDiscounts: boolean
    bundleMembershipWithTickets: boolean
    defaultEventVisibility: 'public' | 'members-only'
  }
  
  // Social configuration
  social: {
    requireApprovalForPosts: boolean
    allowAnonymousPosts: boolean
    maxPostLength: number
    allowPostEditing: boolean
    allowPostDeletion: boolean
  }
  
  // Notification settings
  notifications: {
    emailNotifications: boolean
    newMemberNotifications: boolean
    eventNotifications: boolean
    postNotifications: boolean
  }
}

export interface TenantPlan {
  id: string
  name: string
  price: number
  interval: 'monthly' | 'yearly'
  features: string[]
  limits: TenantLimits
}

export interface TenantLimits {
  maxMembers: number
  maxEvents: number
  maxPosts: number
  maxStorageGB: number
  maxAdmins: number
}

// Tenant context for requests
export interface TenantContext {
  tenant: Tenant | null
  isMultiTenant: boolean
  currentDomain: string
  subdomain?: string
}

// Tenant creation/update DTOs
export interface CreateTenantDTO {
  name: string
  slug: string
  description?: string
  domain?: string
  subdomain?: string
  ownerId: string
  settings?: Partial<TenantSettings>
}

export interface UpdateTenantDTO {
  name?: string
  description?: string
  domain?: string
  subdomain?: string
  logo?: FileUpload
  favicon?: FileUpload
  primaryColor?: string
  secondaryColor?: string
  customCSS?: string
  settings?: Partial<TenantSettings>
}