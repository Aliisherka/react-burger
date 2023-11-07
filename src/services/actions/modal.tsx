export const OPEN_ORDER = 'OPEN_ORDER';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export interface IOPEN_ORDER {
    readonly type: typeof OPEN_ORDER;
}
export interface ICLOSE_ORDER {
    readonly type: typeof CLOSE_ORDER;
}

export type TModalActions = 
    | IOPEN_ORDER
    | ICLOSE_ORDER;