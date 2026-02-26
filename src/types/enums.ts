export enum ServiceStatus {
    ACTIVE = 'ACTIVE',
    MAINTENANCE = 'MAINTENANCE',
    SUSPENDED = 'SUSPENDED',
    DELETED = 'DELETED'
}

export enum AppType {
    API = 'API',
    APP = 'APP',
    OTHER = 'OTHER',
    WEB = 'WEB',
    MOBILE = 'MOBILE'
}

export enum SoftwareType {
    APP_MOBILE = 'APP_MOBILE',
    SITE = 'SITE',
    WEBAPP = 'WEBAPP',
    API = 'API',
    DESKTOP = 'DESKTOP',
    OTHER = 'OTHER'
}

export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    EXPIRED = 'EXPIRED',
    CANCELED = 'CANCELED',
    PENDING = 'PENDING',
    UPGRADED = 'UPGRADED'
}

export enum Periodicity {
    MONTHLY = 'MONTHLY',
    SEMIANNUAL = 'SEMIANNUAL',
    ANNUAL = 'ANNUAL'
}

export enum PlanTagType {
    BEST_VALUE = 'BEST_VALUE',
    MOST_POPULAR = 'MOST_POPULAR',
    NEW_ARRIVAL = 'NEW_ARRIVAL',
    RECOMMENDED = 'RECOMMENDED',
    LIMITED_OFFER = 'LIMITED_OFFER',
    BEST_SELLER = 'BEST_SELLER'
}

export enum InvoiceStatus {
    PAID = 'PAID',
    PENDING = 'PENDING',
    CANCELED = 'CANCELED',
    OVERDUE = 'OVERDUE'
}

export enum BillingType {
    ADHOC = 'ADHOC',
    SUBSCRIPTION = 'SUBSCRIPTION',
    PACKAGE = 'PACKAGE'
}

export enum TicketStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    WAITING_CLIENT = 'WAITING_CLIENT',
    RESOLVED = 'RESOLVED',
    CLOSED = 'CLOSED'
}

export enum TicketPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    URGENT = 'URGENT'
}

export enum UserRole {
    SUPPORT = 'SUPPORT',
    ADMIN = 'ADMIN',
    CLIENT = 'CLIENT'
}

export enum UserPermission {
    EDITOR = 'EDITOR',
    GERENTE = 'GERENTE',
    ADMINISTRADOR = 'ADMINISTRADOR',
    VISUALIZADOR = 'VISUALIZADOR'
}

export enum NotificationType {
    BILLING = 'BILLING',
    SYSTEM = 'SYSTEM',
    MAINTENANCE = 'MAINTENANCE',
    SUPPORT = 'SUPPORT'
}

export enum AccessType {
    NETLIFY = 'NETLIFY',
    SITE_CLOUD = 'SITE_CLOUD',
    GOOGLE = 'GOOGLE',
    AWS = 'AWS',
    DATABASE = 'DATABASE',
    GIT_PROVIDER = 'GIT_PROVIDER',
    HOSTING_PANEL = 'HOSTING_PANEL',
    DNS_PROVIDER = 'DNS_PROVIDER',
    OTHER = 'OTHER',
    GITHUB = 'GITHUB',
    HYZY_CLOUD = 'HYZY_CLOUD',
    SERVER = 'SERVER',
    PANEL = 'PANEL',
    APP_CLOUD = 'APP_CLOUD'
}

export const APP_TYPE_LABELS: Record<AppType, string> = {
    [AppType.WEB]: 'Web App',
    [AppType.MOBILE]: 'Mobile App',
    [AppType.APP]: 'Aplicativo Geral',
    [AppType.API]: 'API / Backend',
    [AppType.OTHER]: 'Outro',
};

export const SERVICE_STATUS_LABELS: Record<ServiceStatus, string> = {
    [ServiceStatus.ACTIVE]: 'Ativo',
    [ServiceStatus.MAINTENANCE]: 'Manutenção',
    [ServiceStatus.SUSPENDED]: 'Suspenso',
    [ServiceStatus.DELETED]: 'Excluído',
};

export const SERVICE_STATUS_COLORS: Record<ServiceStatus, string> = {
    [ServiceStatus.ACTIVE]: 'bg-green-500',
    [ServiceStatus.MAINTENANCE]: 'bg-yellow-500',
    [ServiceStatus.SUSPENDED]: 'bg-red-500',
    [ServiceStatus.DELETED]: 'bg-gray-500',
};

export const SOFTWARE_TYPE_LABELS: Record<SoftwareType, string> = {
    [SoftwareType.APP_MOBILE]: 'App Mobile',
    [SoftwareType.SITE]: 'Site',
    [SoftwareType.WEBAPP]: 'Web App',
    [SoftwareType.API]: 'API',
    [SoftwareType.DESKTOP]: 'Desktop',
    [SoftwareType.OTHER]: 'Outro',
};
