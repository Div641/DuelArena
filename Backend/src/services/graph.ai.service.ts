import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue,ReducedValue,  StateGraph, START, END } from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";
import {geminiModel, mistralModel,cohereModel, } from "./ai.service.js";
import {z} from "zod" 
import { createAgent, providerStrategy } from "langchain";





//schema describe the data blueprint structure and 
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
});





const solutionNode: GraphNode<typeof State>  = async (state: typeof State.State) => {
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

    // console.dir(cohereResponse, { depth: null }); // now safe, after it's defined

    const cohereText =
     cohereResponse.message?.content?.find(
        (block: any) => block.type === "text"
      )?.text ?? "";


    const solution_1 = String(mistralResponse.content ?? "").trim();
    const solution_2 = String(cohereText ?? "").trim();

    console.log("Mistral:", mistralResponse.content);
    console.log("Cohere:", cohereText);

    if (!solution_1 || !solution_2) {
      console.warn("Warning: one of the solutions came back empty.", {
        solution_1_empty: !solution_1,
        solution_2_empty: !solution_2,
      });
    }


    return {
      messages: state.messages,
      solution_1,
      solution_2,
    };
  } catch (err) {
    console.error("Solution node error:", err);
    throw err;
  }
};




const judgeNode: GraphNode<typeof State> = async (state: typeof State.State) => {
    try{
    const {solution_1, solution_2} = state;

    if (!solution_1 || !solution_2) {
      console.error("Judge node received empty solution(s):", { solution_1, solution_2 });
    }

    const judge = createAgent({
        model:geminiModel,
        tools: [],
        responseFormat: providerStrategy( z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
        }))
    })

    // console.log("invoking judge with state",state)
    const problemText = state.messages[0].content as string;

    const judgeResponse = await judge.invoke({

        messages:[
            new HumanMessage(
            `Youare a judge with evaluating the quality of two solutions to a problem. The problem is: ${problemText}. The first solution is: ${solution_1}. The second solution is: ${solution_2}. Please provide a score between 0 and 10 for each solution, where 0 means the solution is completely incorrect or irrelevant, and 10 means the solution is perfect and fully addresses the problem.`
            )
        ]
    })

    // Log the FULL response so we can see if structuredResponse is actually populated
    console.log("Full judge response:", JSON.stringify(judgeResponse, null, 2));


    const result = judgeResponse.structuredResponse;

    if (!result || typeof result.solution_1_score !== "number" || typeof result.solution_2_score !== "number") {
      console.error(
        "Judge did not return a valid structured response. Falling back to default scores.",
        judgeResponse
      );
      // Returning undefined here would trigger the Zod default (0,0) silently.
      // We throw instead so the failure is visible rather than masked.
      throw new Error("Judge node failed to produce a valid structured response.");
    }


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