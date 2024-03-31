export const OPEN_ORDER = 'OPEN_ORDER';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export const OPER_ERROR_ORDER = 'OPER_ERROR_ORDER';
export const CLOSE_ERROR_ORDER = 'CLOSE_ERROR_ORDER';

export interface IOPEN_ORDER {
    readonly type: typeof OPEN_ORDER;
}
export interface ICLOSE_ORDER {
    readonly type: typeof CLOSE_ORDER;
}
export interface IOPER_ERROR_ORDER {
    readonly type: typeof OPER_ERROR_ORDER;
}
export interface ICLOSE_ERROR_ORDER {
    readonly type: typeof CLOSE_ERROR_ORDER;
}

export type TModalActions =
    | IOPEN_ORDER
    | ICLOSE_ORDER
    | IOPER_ERROR_ORDER
    | ICLOSE_ERROR_ORDER;
