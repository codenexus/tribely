// Base interface for all documents
export interface BaseDocument {
  id: string
  createdAt: Date
  updatedAt: Date
}

// Multi-tenant base interface
export interface TenantDocument extends BaseDocument {
  tenantId: string
}

// Status enums
export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
  DELETED = 'deleted'
}

// Permission levels
export enum PermissionLevel {
  NONE = 'none',
  READ = 'read',
  WRITE = 'write',
  ADMIN = 'admin',
  OWNER = 'owner'
}

// File upload types
export interface FileUpload {
  id: string
  filename: string
  mimeType: string
  filesize: number
  url: string
  alt?: string
}

// Pagination
export interface PaginationMeta {
  page: number
  limit: number
  totalPages: number
  totalDocs: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface PaginatedResponse<T> {
  docs: T[]
  meta: PaginationMeta
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

export interface ApiError {
  message: string
  code?: string
  field?: string
}