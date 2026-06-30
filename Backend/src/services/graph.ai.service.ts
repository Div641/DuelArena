import { StateSchema, MessagesValue,  StateGraph, START, END } from "@langchain/langgraph";


type JUDGEMENT= {
    winner:"solution_1" | "solution_2";
    solution_1_score: number;
    solution_2_score: number;
}

type AIDUELSTATE = {
    messages: typeof MessagesValue,
    solution_1:string;
    solution_2:string;
    judgement: JUDGEMENT ;
}

const state:AIDUELSTATE = ({ //data state hi help se ek node se dusri node pr jata
    messages:MessagesValue ,
    solution_1:"",
    solution_2:"",
    judgement: {
        winner:"solution_1",
        solution_1_score:0,
        solution_2_score:0
    }
})