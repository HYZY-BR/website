export const STORAGE_KEYS = {
    CURRENT_WORKSPACE_ID: "hyzy_current_workspace_id",
} as const;

export const EVENTS = {
    WORKSPACE_CHANGED: "workspaceChanged",
} as const;

export const ROLES = {
    OWNER: "owner",
    ADMIN: "admin",
    MEMBER: "member",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
