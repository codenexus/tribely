import { TenantDocument, Status, FileUpload, PermissionLevel } from './common'

export interface User extends TenantDocument {
  // Basic info
  email: string
  firstName: string
  lastName: string
  username?: string
  
  // Profile
  avatar?: FileUpload
  bio?: string
  location?: string
  website?: string
  dateOfBirth?: Date
  
  // Account status
  status: Status
  emailVerified: boolean
  emailVerifiedAt?: Date
  lastLoginAt?: Date
  
  // Permissions & roles
  role: UserRole
  permissions: UserPermissions
  
  // Preferences
  preferences: UserPreferences
  
  // Privacy settings
  privacy: UserPrivacy
  
  // Metadata
  loginCount: number
  profileCompleteness: number
}

export enum UserRole {
  MEMBER = 'member',
  MODERATOR = 'moderator', 
  ADMIN = 'admin',
  OWNER = 'owner'
}

export interface UserPermissions {
  // Social permissions
  canCreatePosts: boolean
  canCommentOnPosts: boolean
  canUploadImages: boolean
  canSendMessages: boolean
  
  // Event permissions
  canCreateEvents: boolean
  canManageOwnEvents: boolean
  canManageAllEvents: boolean
  
  // Moderation permissions
  canModerateContent: boolean
  canManageUsers: boolean
  canViewAnalytics: boolean
  
  // Admin permissions
  canManageTenant: boolean
  canManageBilling: boolean
  canManageIntegrations: boolean
}

export interface UserPreferences {
  // Notification preferences
  notifications: {
    email: {
      newPosts: boolean
      newEvents: boolean
      newMessages: boolean
      eventReminders: boolean
      membershipExpiry: boolean
      weeklyDigest: boolean
    }
    
    push: {
      newMessages: boolean
      eventReminders: boolean
      mentions: boolean
    }
    
    inApp: {
      newPosts: boolean
      newMessages: boolean
      mentions: boolean
      likes: boolean
      comments: boolean
    }
  }
  
  // Display preferences
  display: {
    theme: 'light' | 'dark' | 'auto'
    language: string
    timezone: string
    dateFormat: 'US' | 'EU' | 'ISO'
    postsPerPage: number
  }
  
  // Social preferences
  social: {
    showOnlineStatus: boolean
    allowDirectMessages: boolean
    showActivityFeed: boolean
    autoFollowOnJoin: boolean
  }
}

export interface UserPrivacy {
  // Profile visibility
  profileVisibility: 'public' | 'members-only' | 'private'
  showEmail: boolean
  showLocation: boolean
  showWebsite: boolean
  showDateOfBirth: boolean
  
  // Activity visibility
  showLastSeen: boolean
  showActivityStatus: boolean
  showEventAttendance: boolean
  
  // Communication
  allowDirectMessages: 'everyone' | 'members-only' | 'friends-only' | 'none'
  allowMentions: boolean
  allowTagging: boolean
}

// Authentication types
export interface UserAuth {
  id: string
  email: string
  role: UserRole
  tenantId: string
  permissions: UserPermissions
  sessionId: string
  expiresAt: Date
}

// DTOs for API operations
export interface CreateUserDTO {
  email: string
  password: string
  firstName: string
  lastName: string
  username?: string
  tenantId: string
  role?: UserRole
}

export interface UpdateUserDTO {
  firstName?: string
  lastName?: string
  username?: string
  bio?: string
  location?: string
  website?: string
  dateOfBirth?: Date
  avatar?: FileUpload
  preferences?: Partial<UserPreferences>
  privacy?: Partial<UserPrivacy>
}

export interface UserProfileDTO {
  id: string
  firstName: string
  lastName: string
  username?: string
  avatar?: FileUpload
  bio?: string
  location?: string
  website?: string
  role: UserRole
  joinedAt: Date
  lastSeenAt?: Date
  isOnline: boolean
  profileCompleteness: number
}

export interface UserLoginDTO {
  email: string
  password: string
  tenantId?: string
  rememberMe?: boolean
}

export interface UserRegistrationDTO {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  username?: string
  tenantId?: string
  inviteCode?: string
  acceptTerms: boolean
  acceptPrivacy: boolean
}

// Password and security
export interface PasswordResetDTO {
  token: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordDTO {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UserSession {
  id: string
  userId: string
  tenantId: string
  token: string
  refreshToken: string
  expiresAt: Date
  lastActivityAt: Date
  ipAddress: string
  userAgent: string
  isActive: boolean
}

// User statistics and activity
export interface UserStats {
  postsCount: number
  eventsCreated: number
  eventsAttended: number
  messagesReceived: number
  messagesSent: number
  likesReceived: number
  likesGiven: number
  commentsCount: number
  followersCount: number
  followingCount: number
}

export interface UserActivity {
  id: string
  userId: string
  tenantId: string
  type: ActivityType
  description: string
  metadata?: Record<string, any>
  createdAt: Date
}

export enum ActivityType {
  // Profile activities
  PROFILE_UPDATED = 'profile_updated',
  AVATAR_CHANGED = 'avatar_changed',
  
  // Social activities  
  POST_CREATED = 'post_created',
  POST_LIKED = 'post_liked',
  POST_COMMENTED = 'post_commented',
  
  // Event activities
  EVENT_CREATED = 'event_created',
  EVENT_ATTENDED = 'event_attended',
  TICKET_PURCHASED = 'ticket_purchased',
  
  // Membership activities
  MEMBERSHIP_STARTED = 'membership_started',
  MEMBERSHIP_RENEWED = 'membership_renewed',
  MEMBERSHIP_EXPIRED = 'membership_expired',
  
  // System activities
  LOGIN = 'login',
  LOGOUT = 'logout',
  PASSWORD_CHANGED = 'password_changed'
}