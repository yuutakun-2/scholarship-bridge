from fastapi import FastAPI, Request
import uvicorn
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from utilities import load_embedding_model, load_gemini, load_groq, load_sql_db, load_text, build_retriever, prepare_tool, build_agent

# load necessary models
embedding_model = load_embedding_model()
gemini = load_gemini()
groq = load_groq()

# load sql db and documents
sql_db = load_sql_db()
documents = load_text("preparation.txt")

# build retriever and tools
retriever = build_retriever(documents, embedding_model, "vector_db")
tools = prepare_tool( retriever, sql_db)

# build agent
agent_executor = build_agent(gemini, tools)

app = FastAPI()

@app.post("/gen")
async def ask(request: Request):
    
    req = await request.json()

    print("\n"*3)
    print("<<<<<<<<<<<<<<< Request to General >>>>>>>>>>>>>>\n ")
    print("input  :: \n", req)

    # prepare messages for the agent
    messages = {
        "messages": req
    }

    # to store agent's steps
    tmp = list()

    print("-----" * 20, "\n bot thinkings :: \n",)
    for step in agent_executor.stream( messages, stream_mode="values"):
        step["messages"][-1].pretty_print()
        tmp.append(step["messages"][-1].content)

    print("-----" * 20, "\n bot reply :: \n",)
    print(tmp[-1])
    
    return {"message": tmp[-1]}


@app.post("/mock")
async def mock_interview(request: Request):
    req = await request.json()

    print("\n"*3)
    print("<<<<<<<<<<<<<<< Request to Mock interview >>>>>>>>>>>>>>")
    print("input :: \n", req)
    messages = [
        SystemMessage(
            content=
            "You are a scholarship interviewer. You will ask the candidate questions to determine if they are eligible for a scholarship. always answer in short sentences."
        ),
    ]

    for m in req:
        if m["role"] == "user":
            messages.append(HumanMessage(content=m["content"]))
        else:
            messages.append(AIMessage(content=m["content"]))

    response = groq.invoke(messages)
    print("-----" * 20, "\n bot reply :: \n", response.content)
    return {"message": response.content}

@app.get('/')
def hello():
    print('Server is live')
    return {"status": "success", "message": "API is running"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
