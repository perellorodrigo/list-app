export interface Item{
    name: string;
    id: number;
    status: boolean;
    dueDate: string;
    doneDate: string;
    notifications: Array<Number>
}