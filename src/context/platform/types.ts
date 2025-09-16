export enum Platform {
    DESKTOP = 'desktop',
    MOBILE = 'mobile',
}

export type PlatformContextType = {
    platform: Platform;
    isMobile: boolean;
    isDesktop: boolean;
}
