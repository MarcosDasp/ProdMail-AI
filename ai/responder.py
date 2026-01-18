import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.0-flash")

def generate_reply(email_text, category):
    prompt = f"""
            Você é um assistente de suporte profissional.

            Categoria do email: {category}

            Email recebido:
            {email_text}

            Gere APENAS o texto da resposta.
            Seja educado, profissional e objetivo.
            """
        
    response = model.generate_content(prompt)
    return response.text.strip()
