from langchain_cohere import CohereEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.utilities import SQLDatabase
from langchain_groq import ChatGroq
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain_core.tools import tool
from langchain_core.messages import SystemMessage, HumanMessage
from langgraph.prebuilt import create_react_agent

def load_embedding_model():
    try:
        embedding_model = CohereEmbeddings(model="embed-english-v3.0", cohere_api_key=os.environ['COHERE_API_KEY2'])
        print("----Embedding model loaded successfully")
        return embedding_model
    except Exception as e:
        print(f"!!!!--Error loading embedding model: {e}")
        return None  

def load_text(file_path):
    loader = TextLoader(r"{}".format(file_path))
    pages = loader.load()
    print(f"----Loaded {len(pages)} pages from {file_path}")
    return pages

def build_retriever(documents, embedding_model, vector_path):
    try:
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=600,
            chunk_overlap=150,
            length_function=len,
            add_start_index=True,
        )

        chunks = text_splitter.split_documents(documents)

        print(f"----Split {len(documents)} documents into {len(chunks)} chunks.")

        retriever = Chroma.from_documents(chunks, embedding_model, persist_directory=vector_path).as_retriever(
            search_type="similarity_score_threshold",
            search_kwargs={"k": 3, "score_threshold": 0.1}
        )

        print("----Retriever built successfully")
        return retriever

    except Exception as e:
        print(f"!!!!--Error building retriever: {e}")
        return None

def load_sql_db():
    try:
        sql_db = SQLDatabase.from_uri("mysql+pymysql://avnadmin:AVNS_wJVhaCKEwosM0TNlFU9@mysql-3db72baf-arkarchanmyae2-f431.i.aivencloud.com:15966/defaultdb")
        print("----SQL DB loaded successfully")
        return sql_db
    except Exception as e:
        print(f"!!!!--Error loading SQL DB: {e}")
        return None


def load_gemini():
    try:
        gemini = ChatGoogleGenerativeAI(model="gemini-2.0-flash-001",
            temperature=0.3,
            google_api_key=os.environ['google_api'])

        print("----Gemini loaded successfully")
        return gemini
    except Exception as e:
        print(f"!!!!--Error loading Gemini: {e}")
        return None

def load_groq():
    try:
        groq = ChatGroq(temperature=0, model_name="llama-3.3-70b-versatile", groq_api_key=os.environ['GROQ_API_KEY'])
        print("----Groq loaded successfully")
        return groq
    except Exception as e:
        print(f"!!!!--Error loading Groq: {e}")
        return None

def prepare_tool(retriever, sql_db):
    try:
        
        gemini_lite = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash-lite",
            temperature=0,
            google_api_key=os.environ['google_api']
        )

        toolkit = SQLDatabaseToolkit(db=sql_db, llm=gemini_lite)
        sql_tools = toolkit.get_tools()

        @tool
        def retrieve_preparaing_data(user_input: str) -> str:
            """
            retrieve scholarship preparaing data from vector database based on user input
            """
            results = retriever.invoke(str)
            context_text = "\n\n---\n\n".join([doc.page_content for doc in results])
            return context_text

        tools = sql_tools + [retrieve_preparaing_data]
        return tools
    except Exception as e:
        print(f"!!!!--Error preparing tool: {e}")
        return None

def build_agent(llm, tools):
    try:
        system_prompt = """
        You are a versatile scholarship assistant capable of answering user questions by accessing information from either a SQL database or a document knowledge base.
        Your primary goal is to understand the user's query and use the most appropriate tool(s) to find the answer.

        You have access to the following types of tools:
        1.  **SQL Tools:** Use these tools when the user is asking about structured data stored in the database tables, such as information about Scholarships.
            * When using the SQL tools to query the database, you MUST create a syntactically correct MySQL query.
            * Unless the user specifies a specific number, always limit your query to at most 5 results.
            * Never query for all the columns from a specific table; only ask for the relevant columns.
            * You MUST double check your query before executing it. If you get an error, rewrite the query and try again.
            * DO NOT make any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database.
            * You should familiarize yourself with the database schema by using the schema tools *if* the query is database-related and requires understanding the tables.

        2.  **Document Search Tools (RAG):** Use `retrieve_preparaing_data` tool when the user is asking about scholarship preparaing, or any information not found in the database.
            * Input to `retrieve_preparaing_data` tool should be a clear search query based on the user's question.
            * Analyze the results returned by these tools to synthesize your answer.

        **Instructions:**
        * Begin by carefully analyzing the user's question to determine if it requires database access, document search, or potentially both.
        * Select the tool(s) whose description best matches the requirement of the user's question.
        * Only use the tools provided to find the information needed. Do not rely on your internal knowledge for specific details that should be in the database or documents.
        * After using the tool(s), synthesize the results into a clear and concise answer for the user.
        """

        system_message = SystemMessage(content=system_prompt)
        agent_executor = create_react_agent(llm, tools, prompt=system_message)
        return agent_executor
    except Exception as e:
        print(f"!!!!--Error building agent: {e}")
        return None
