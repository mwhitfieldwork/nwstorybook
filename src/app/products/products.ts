export interface IProducts {
    id: number;
    productName: string;
    displayName?: string;
    company?: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    commonId?: number;
    team?: string;
    subTeam?: string | number;
    hireDate?: string;
    fax?: string;
    state?: string;
    zip?: number;
    officeCity?: string;
    teamLeader?: string;
    office?: string;
    pictureUrl?: number;
    extension?: number;
    skills?: any;
    interests?: any;
    rating:number;
    unitPrice:number;
    quantityPerUnit:number;
}