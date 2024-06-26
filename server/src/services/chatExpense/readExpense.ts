import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MongoClient, ObjectId } from "mongodb";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

const client = new MongoClient(process.env.MONGO_URI || "");

const embeddings = new OpenAIEmbeddings({});
const collection = client.db("budgetAI").collection("expenses");

const generateEmbeddings = async () => {
  const docs = await collection.find({}).toArray();

  docs.forEach(async (doc) => {
    if (doc.embedding) return;

    console.log("embedding...");
    const emb = await embeddings.embedQuery(JSON.stringify(doc));
    await collection.findOneAndUpdate(
      {
        _id: doc._id,
      },
      {
        $set: {
          embedding: emb,
        },
      }
    );
  });
};

const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
  collection: collection,
  indexName: "vector_index",
  textKey: "text",
  embeddingKey: "embedding",
});

export const getInfo = async (text: string, userId: string) => {
  // const k = await collection.countDocuments();

  await generateEmbeddings();
  const llm = new ChatOpenAI({ model: "gpt-3.5-turbo-0125" });
  const retriever = vectorStore.asRetriever();
  const prompt = ChatPromptTemplate.fromTemplate(`
    You're a Expense Manager, Answer the following question based on the provided context:
    <context>
    {context}
    </context>
    Question: {input}
  `);

  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: new StringOutputParser(),
  });

  let ctx = await retriever.invoke(text);

  ctx = ctx.map((c) => {
    c.pageContent = JSON.stringify(c.metadata);
    return c;
  });

  ctx = ctx.filter((c) => {
    return c.metadata.user.toString() === userId.toString();
  });

  const response = await ragChain.invoke({
    context: ctx,
    input: text,
  });

  // console.log(response);
  return response;
};

// const checkRetriever = async () => {
//   const retriever = vectorStore.asRetriever();
//   const userId = new ObjectId("666586ea1f1fe37ab1f26ac4");
//   let ctx = await retriever.invoke(
//     `what are my expenses find for user ${userId} only`
//   );

//   ctx = ctx.map((c) => {
//     c.pageContent = JSON.stringify(c.metadata);
//     return c;
//   });

//   ctx = ctx.filter((c) => {
//     return c.metadata.user.toString() === userId.toString();
//   });

//   console.log(ctx);
// };

// checkRetriever();
