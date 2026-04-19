export interface OptionVote {
    optionText:string;
    voteCount:number;
}

export interface Polls {
    id?:number;
    question:string;
    options:OptionVote[];
}
