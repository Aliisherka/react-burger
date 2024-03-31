export interface IIngredient {
    _id: string;
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    uniqueId?: string
}

export interface IConstructorIngredient {
    uniqueId?: string
}

export interface IOrder {
    _id: string;
    updatedAt: string;
    status: string;
    number: number;
    name: string;
    createdAt: string;
    ingredients: string[];
}

export interface IMessage {
    success: boolean;
    total: number;
    totalToday: number;
    orders: IOrder[]
}
