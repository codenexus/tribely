import { TenantDocument, Status, FileUpload } from './common'

export interface Post extends TenantDocument {
  // Content
  content: string
  excerpt?: string
  
  // Media
  images?: FileUpload[]
  attachments?: FileUpload[]
  
  // Organization
  authorId: string
  
  // Context (optional - for event-specific posts)
  eventId?: string
  
  // Engagement
  likes: PostLike[]
  comments: PostComment[]
  shares: PostShare[]
  
  // Counts (denormalized for performance)
  likesCount: number
  commentsCount: number
  sharesCount: number
  
  // Status & Visibility
  status: PostStatus
  visibility: PostVisibility
  
  // Moderation
  moderationStatus: ModerationStatus
  moderatedBy?: string
  moderatedAt?: Date
  moderationReason?: string
  
  // Features
  isPinned: boolean
  allowComments: boolean
  allowSharing: boolean
  
  // Metadata
  editedAt?: Date
  views: number
  
  // Tags/Categories
  tags: string[]
  
  // Rich content
  mentions: PostMention[]
  hashtags: string[]
}

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  SCHEDULED = 'scheduled',
  ARCHIVED = 'archived',
  DELETED = 'deleted'
}

export enum PostVisibility {
  PUBLIC = 'public',
  MEMBERS_ONLY = 'members-only',
  FOLLOWERS_ONLY = 'followers-only',
  PRIVATE = 'private'
}

export enum ModerationStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'rejected',
  FLAGGED = 'flagged',
  HIDDEN = 'hidden'
}

export interface PostLike extends TenantDocument {
  postId: string
  userId: string
  type: ReactionType
}

export enum ReactionType {
  LIKE = 'like',
  LOVE = 'love',
  LAUGH = 'laugh',
  ANGRY = 'angry',
  SAD = 'sad',
  CELEBRATE = 'celebrate'
}

export interface PostComment extends TenantDocument {
  postId: string
  authorId: string
  content: string
  
  // Threading
  parentCommentId?: string
  replies?: PostComment[]
  depth: number
  
  // Status
  status: PostStatus
  moderationStatus: ModerationStatus
  
  // Engagement
  likes: PostLike[]
  likesCount: number
  
  // Metadata
  editedAt?: Date
  mentions: PostMention[]
}

export interface PostShare extends TenantDocument {
  postId: string
  userId: string
  shareType: ShareType
  message?: string
  sharedTo?: string
}

export enum ShareType {
  INTERNAL = 'internal',
  EMAIL = 'email',
  LINK = 'link',
  SOCIAL = 'social'
}

export interface PostMention {
  userId: string
  username: string
  startIndex: number
  endIndex: number
}

// Feed types
export interface FeedPost {
  id: string
  content: string
  images?: FileUpload[]
  author: {
    id: string
    firstName: string
    lastName: string
    username?: string
    avatar?: FileUpload
    role: string
  }
  
  // Context
  eventId?: string
  eventTitle?: string
  
  // Engagement
  likesCount: number
  commentsCount: number
  sharesCount: number
  userHasLiked: boolean
  userReactionType?: ReactionType
  
  // Timing
  createdAt: Date
  editedAt?: Date
  
  // Features
  isPinned: boolean
  allowComments: boolean
  allowSharing: boolean
  
  // Recent interactions
  recentLikes: Array<{
    userId: string
    firstName: string
    lastName: string
    avatar?: FileUpload
    type: ReactionType
  }>
  
  recentComments: Array<{
    id: string
    content: string
    authorId: string
    authorName: string
    authorAvatar?: FileUpload
    createdAt: Date
  }>
}

// DTOs for API operations
export interface CreatePostDTO {
  content: string
  images?: FileUpload[]
  attachments?: FileUpload[]
  eventId?: string
  visibility: PostVisibility
  allowComments?: boolean
  allowSharing?: boolean
  tags?: string[]
  scheduledFor?: Date
}

export interface UpdatePostDTO {
  content?: string
  images?: FileUpload[]
  attachments?: FileUpload[]
  visibility?: PostVisibility
  allowComments?: boolean
  allowSharing?: boolean
  tags?: string[]
  isPinned?: boolean
}

export interface CreateCommentDTO {
  postId: string
  content: string
  parentCommentId?: string
}

export interface UpdateCommentDTO {
  content: string
}

export interface AddReactionDTO {
  postId: string
  type: ReactionType
}

export interface SharePostDTO {
  postId: string
  shareType: ShareType
  message?: string
  sharedTo?: string
}

// Feed queries and filters
export interface FeedQuery {
  // Pagination
  page?: number
  limit?: number
  cursor?: string
  
  // Filtering
  authorId?: string
  eventId?: string
  tags?: string[]
  visibility?: PostVisibility[]
  
  // Sorting
  sortBy?: 'newest' | 'oldest' | 'popular' | 'trending'
  timeRange?: 'today' | 'week' | 'month' | 'all'
  
  // Content types
  includeImages?: boolean
  includeEvents?: boolean
  pinnedOnly?: boolean
}

export interface FeedResponse {
  posts: FeedPost[]
  pagination: {
    page: number
    limit: number
    total: number
    hasNext: boolean
    hasPrev: boolean
    nextCursor?: string
  }
  filters: {
    totalPosts: number
    postsToday: number
    postsThisWeek: number
    activeAuthors: number
  }
}

// Content moderation
export interface ModerationAction {
  id: string
  postId?: string
  commentId?: string
  moderatorId: string
  action: ModerationActionType
  reason: string
  notes?: string
  createdAt: Date
}

export enum ModerationActionType {
  APPROVE = 'approve',
  REJECT = 'reject',
  HIDE = 'hide',
  DELETE = 'delete',
  PIN = 'pin',
  UNPIN = 'unpin',
  LOCK_COMMENTS = 'lock_comments',
  UNLOCK_COMMENTS = 'unlock_comments'
}

// Post analytics
export interface PostAnalytics {
  postId: string
  views: number
  uniqueViews: number
  engagementRate: number
  likesOverTime: Array<{
    date: string
    count: number
  }>
  commentsOverTime: Array<{
    date: string
    count: number
  }>
  topReactions: Array<{
    type: ReactionType
    count: number
    percentage: number
  }>
  audienceBreakdown: {
    memberTypes: Record<string, number>
    locations: Record<string, number>
    ageGroups: Record<string, number>
  }
}