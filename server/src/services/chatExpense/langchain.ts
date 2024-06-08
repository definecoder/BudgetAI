import dotenv from "dotenv";
dotenv.config();
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { Document } from "@langchain/core/documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { MessagesPlaceholder } from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createRetrieverTool } from "langchain/tools/retriever";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { pull } from "langchain/hub";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";

const chatModel = new ChatOpenAI({});
const outputParser = new StringOutputParser();
const loader = new CheerioWebBaseLoader("https://www.langchain.com/langsmith");
const splitter = new RecursiveCharacterTextSplitter();

const str = "sdsds sadsds sdsds asa";

// str.indexOf
const embeddings = new OpenAIEmbeddings();

const main = async () => {
  const docs = await loader.load();
  const splitDocs = await splitter.splitDocuments(docs);
  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );
  const retriever = vectorstore.asRetriever();

  const prompt =
    ChatPromptTemplate.fromTemplate(`Answer the following question based only on the provided context:
        <context>
        {context}
        </context>
        Question: {input}`);

  const documentChain = await createStuffDocumentsChain({
    llm: chatModel,
    prompt,
  });

  // If we wanted to, we could run this ourselves by passing in documents directly:
  const res = await documentChain.invoke({
    input: "What is LangSmith?",
    context: [
      new Document({
        pageContent:
          "LangSmith is a platform for building production-grade LLM applications.",
      }),
    ],
  });

  console.log(res);

  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever,
  });

  const res2 = await retrievalChain.invoke({
    input: "What is LangSmith?",
  });

  console.log(res2.answer);

  const historyAwarePrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"],
    [
      "user",
      "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
    ],
  ]);

  const historyAwareRetrieverChain = await createHistoryAwareRetriever({
    llm: chatModel,
    retriever,
    rephrasePrompt: historyAwarePrompt,
  });

  const chatHistory = [
    new HumanMessage("Can LangSmith help test my LLM Applications?"),
    new AIMessage("Yes!"),
  ];

  // const res3 = await historyAwareRetrieverChain.invoke({
  //   chat_history: chatHistory,
  //   input: "Tell me how?",
  // });

  const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Answer the user's questions based on the below context:\n\n{context}",
    ],
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"],
  ]);

  const historyAwareCombineDocsChain = await createStuffDocumentsChain({
    llm: chatModel,
    prompt: historyAwareRetrievalPrompt,
  });

  const conversationalRetrievalChain = await createRetrievalChain({
    retriever: historyAwareRetrieverChain,
    combineDocsChain: historyAwareCombineDocsChain,
  });

  const result2 = await conversationalRetrievalChain.invoke({
    chat_history: [
      new HumanMessage("Can LangSmith help test my LLM applications?"),
      new AIMessage("Yes!"),
    ],
    input: "tell me how",
  });

  console.log(result2.answer);

  // creating agents

  const retrieverTool = await createRetrieverTool(retriever, {
    name: "langsmith_search",
    description:
      "Search for information about LangSmith. For any questions about LangSmith, you must use this tool!",
  });

  const searchTool = new TavilySearchResults({
    apiKey: process.env.TAVILY_API_KEY,
  });

  const tools = [retrieverTool, searchTool];

  const agentPrompt = await pull<ChatPromptTemplate>(
    "hwchase17/openai-functions-agent"
  );

  const agentModel = new ChatOpenAI({
    model: "gpt-3.5-turbo-1106",
    temperature: 0,
  });

  const agent = await createOpenAIFunctionsAgent({
    llm: agentModel,
    tools,
    prompt: agentPrompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: true,
  });

  // const agentResult = await agentExecutor.invoke({
  //   input: "how can LangSmith help with testing?",
  // });

  // console.log(agentResult.output);
  const agentResult2 = await agentExecutor.invoke({
    input: "what is the weather in SF?",
  });

  console.log(agentResult2.output);
};

main();

// const chain = prompt.pipe(chatModel);

// const llmChain = chain.pipe(outputParser);

// llmChain
//   .invoke({
//     input: "What is LangSmith?",
//   })
//   .then((response) => {
//     console.log(response);
//   });
