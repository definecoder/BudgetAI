import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { DBRef, MongoClient } from "mongodb";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { index } from "cheerio/lib/api/traversing";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const client = new MongoClient(process.env.MONGO_URI || "");

const embeddings = new OpenAIEmbeddings({});
const collection = client.db("budgetAI").collection("expenses");
const dbConfig = {
  collection: collection,
  indexName: "default", // The name of the Atlas search index to use.
  textKey: "text", // Field name for the raw text content. Defaults to "text".
  embeddingKey: "embedding", // Field name for the vector embeddings. Defaults to "embedding".
};

const getInfo = async (text: string) => {
  const res = await collection.find({}).toArray();

  const docs = JSON.stringify(res);

  const splitter = new RecursiveCharacterTextSplitter();

  const splitTexts = await splitter.splitText(docs);

  const vectorstore = await MemoryVectorStore.fromTexts(
    splitTexts,
    {},
    embeddings
  );

  const retriever = vectorstore.asRetriever();

  const prompt = ChatPromptTemplate.fromTemplate(`
    You're a Expense Manager, Answer the following question based only on the provided context:
    <context>
    {context}
    </context>
    Question: {input}
  `);

  const llm = new ChatOpenAI({ model: "gpt-3.5-turbo" });

  const documentChain = await createStuffDocumentsChain({
    llm: llm,
    prompt,
  });

  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever,
  });

  const response = await retrievalChain.invoke({
    input: text,
  });

  console.log(response.answer);
};

// getInfo("test");

getInfo("Did I buy Apple?");
