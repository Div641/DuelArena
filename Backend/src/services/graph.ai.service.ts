import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue,ReducedValue,  StateGraph, START, END } from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";
import {geminiModel, mistralModel,cohereModel, } from "./ai.service.js";
import {z} from "zod" 
import { createAgent, providerStrategy } from "langchain";


// type JUDGEMENT= {
//     winner:"solution_1" | "solution_2";
//     solution_1_score: number;
//     solution_2_score: number;
// }

// type AIDUELSTATE = {
//     messages: typeof MessagesValue,
//     solution_1:string;
//     solution_2:string;
//     judgement: JUDGEMENT ;
// }

// const state:AIDUELSTATE = ({ //data state hi help se ek node se dusri node pr jata
//     messages:MessagesValue ,
//     solution_1:"",
//     solution_2:"",
//     judgement: {
//         winner:"solution_1",
//         solution_1_score:0,
//         solution_2_score:0
//     }
// })

const State= new StateSchema({
    messages:MessagesValue,
    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (_current,next)=>{
            return next
        }
    }),
    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (_current,next)=>{
            return next
        }
    }),

    judge_recommendation: new ReducedValue(
    z.object({
        solution_1_score: z.number(),
        solution_2_score: z.number(),
        }).default({
        solution_1_score: 0,
        solution_2_score: 0,
    }),
    {
        reducer:(_current,next) => next,
    }
)
})

const solutionNode = async (state: typeof State.State) => {
  try {
    const mistralPromise = mistralModel.invoke(state.messages);

    const coherePromise = cohereModel.chat({
      model: "command-a-reasoning-08-2025",
      messages: [
        {
          role: "user",
          content: state.messages[0].content as string,
        },
      ],
    });

    const [mistralResponse, cohereResponse] = await Promise.all([
      mistralPromise,
      coherePromise,
    ]);

    console.dir(cohereResponse, { depth: null }); // now safe, after it's defined

    const cohereText =
     cohereResponse.message?.content?.find(
        (block: any) => block.type === "text"
      )?.text ?? "";

    console.log("Mistral:", mistralResponse.content);
    console.log("Cohere:", cohereText);

    return {
      messages: state.messages,
      solution_1: String(mistralResponse.content),
      solution_2: cohereText,
    };
  } catch (err) {
    console.error("Solution node error:", err);
    throw err;
  }
};

const judgeNode = async (state: typeof State.State) => {
    try{
    const {solution_1, solution_2} = state;
    const judge = createAgent({
        model:geminiModel,
        tools: [],
        responseFormat: providerStrategy( z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
        }))
    })

    console.log("invoking judge with state",state)
    const problemText = state.messages[0].content as string;

    const judgeResponse = await judge.invoke({

        messages:[
            new HumanMessage(
            `Youare a judge with evaluating the quality of two solutions to a problem. The problem is: ${problemText}. The first solution is: ${solution_1}. The second solution is: ${solution_2}. Please provide a score between 0 and 10 for each solution, where 0 means the solution is completely incorrect or irrelevant, and 10 means the solution is perfect and fully addresses the problem.`
            )
        ]
    })

    const result = judgeResponse.structuredResponse;

    console.log("Judge result:", result);

    return {
      judge_recommendation: result,
    };

  }catch (err) {
    console.error("Judge node error:", err);
    throw err;
}
}


const graph = new StateGraph(State)
    .addNode("solution",solutionNode)
    .addNode("judge",judgeNode)
    .addEdge(START,"solution")
    .addEdge("solution", "judge")
    .addEdge("solution",END)
    .compile()

//graph hmesha start node pr invoke hota hai jo solution node k pass jata n solution node modifies it
export default async function(userMessage:string){
    const result = await graph.invoke({
        messages:[
            new HumanMessage(userMessage)
        ]
    })
    console.log(result);

    return result;
}


// export default graph;