import { IChat } from "./common"

export class CChat implements IChat {
    id: string ='';
    members: string[] =[];
    messages: { from: string; body: string; }[] =[];
}
