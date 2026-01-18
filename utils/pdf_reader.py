from PyPDF2 import PdfReader
from PyPDF2.errors import PdfReadError

def extract_text_from_pdf(file):
    try:
        reader = PdfReader(file)
        text = ""

        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

        return text.strip()

    except PdfReadError:
        return ""

    except Exception as e:
        print("Erro ao ler PDF:", e)
        return ""
