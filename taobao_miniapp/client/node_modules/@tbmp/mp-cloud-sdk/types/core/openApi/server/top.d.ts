import { IRequestOptions } from "../../../shared/request";
export default class Top {
    client: any;
    context: IRequestOptions;
    constructor(context: IRequestOptions);
    invoke(apiName: string, data?: any, httpHeaders?: any): Promise<any>;
}
