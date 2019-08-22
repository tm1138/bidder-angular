export class UserInfoModel
{
    guid: string;
    customerUid: string;

    first_name: string;
    last_name: string;

    email: string;
    mob_number: number;

    password: string;

    constructor(obj: any = null)
    {
        if(obj != null)
        {
            Object.assign(this, obj);
        }
    }
}