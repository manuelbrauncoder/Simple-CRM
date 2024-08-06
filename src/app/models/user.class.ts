export class User {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: number;
    email: string;
    street: string;
    zipCode: number;
    city: string;

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : 0;
        this.email = obj ? obj.email : ''
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : 0;
        this.city = obj ? obj.city : '';
    }
}