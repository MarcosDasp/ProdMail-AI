from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
        data = request.json
        text = data.get("text", "")

        return jsonify({
            "category": "Produtivo",
            "suggested_reply": "Obrigado pelo contato!"
        })

if __name__ == '__main__':
    app.run(debug=True)