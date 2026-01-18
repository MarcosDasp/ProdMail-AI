from flask import Flask, render_template, request, jsonify
from utils.pdf_reader import extract_text_from_pdf
from ai.classifier import classify_email
from ai.responder import generate_reply

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    email_text = ""

    if request.is_json:
        data = request.get_json(silent=True)
        if data:
            email_text = data.get("text", "")

    if not email_text:
        file = request.files.get("file")
        if file and file.filename:
            if file.filename.endswith(".txt"):
                email_text = file.read().decode("utf-8", errors="ignore")
            elif file.filename.endswith(".pdf"):
                email_text = extract_text_from_pdf(file)

    if not email_text:
        email_text = request.form.get("text", "")

    if not email_text.strip():
        return jsonify({"error": "Nenhum texto fornecido"}), 400

    category = classify_email(email_text)
    suggested_reply = generate_reply(email_text, category)


    return jsonify({
        "category": category,
        "suggested_reply": suggested_reply
    })

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)