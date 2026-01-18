# 📧 ProdMail AI - Classificação de emails com AI

Aplicação web simples que utiliza **Inteligência Artificial** para **classificar emails** como **Produtivos** ou **Improdutivos** e **sugerir respostas automáticas** com base nessa classificação.

O projeto foi desenvolvido como parte de um processo seletivo para vaga de desenvolvedor, seguindo os requisitos propostos.

---

## 🚀 Funcionalidades

- Upload de emails nos formatos **.txt** ou **.pdf**
- Inserção direta de texto do email
- Classificação automática do email:
  - **Produtivo** → requer ação ou resposta
  - **Improdutivo** → não requer ação imediata
- Sugestão de resposta automática utilizando IA
- Backend em **Python (Flask)**
- Frontend em **HTML, CSS (BootStrap) e JavaScript**

---

## 🧠 Inteligência Artificial Utilizada

- **Classificação de emails**: modelo de *Text Classification* usando **Hugging Face Transformers**
- **Geração de respostas**: **Google Gemini API (modelo Gemini Pro)** utilizando *free tier* para testes

> A arquitetura foi pensada de forma modular, permitindo fácil substituição do modelo de IA no futuro.

---

## 🗂️ Estrutura do Projeto

```
Projeto/
├── app.py
├── .env
├── requirements.txt
├── ai/
│   ├── __init__.py
│   ├── classifier.py
│   ├── responder.py
│   └── train_classifier.py
├── data/
│   └── emails.csv
├── utils/
│   ├── __init__.py
│   └── pdf_reader.py
├── templates/
│   └── index.html
├── static/
│   └── main.js
└── README.md
```

---

## ⚙️ Requisitos

- Python **3.10+**
- pip
- Conta Google para gerar a **API Key do Gemini** (free tier)

---

## 🔑 Configuração da API (Gemini)

Crie um arquivo **`.env`** na raiz do projeto com o seguinte conteúdo:

```env
GEMINI_API_KEY=your_api_key_here
```

> ⚠️ O arquivo `.env` não deve ser versionado. Ele já está listado no `.gitignore`.

---

## ▶️ Como executar o projeto localmente

### 1️⃣ Clone o repositório

```bash
git clone <url-do-repositorio>
cd Projeto
```

### 2️⃣ Crie e ative um ambiente virtual

**Windows (PowerShell):**

```powershell
python -m venv venv
venv\Scripts\activate
```

**Linux / macOS:**

```bash
python3 -m venv venv
source venv/bin/activate
```

---

### 3️⃣ Instale as dependências

```bash
pip install -r requirements.txt
```

---

### 🧠 Treinamento do Modelo de Classificação

Antes de executar a aplicação, é necessário treinar o modelo responsável por classificar os e-mails como **Produtivo** ou **Improdutivo**.

O projeto já inclui:
- O script de treinamento: `ai/train_classifier.py`
- O dataset de treinamento (já presente no repositório)

### Para realizar o treinamento:

1. Execute o script de treinamento:

```bash
python ai/train_classifier.py
```

> Observação: o treinamento precisa ser executado apenas uma vez, a menos que o dataset seja alterado.

---

### 4️⃣ Execute a aplicação

```bash
python app.py
```

A aplicação estará disponível em:

👉 **http://127.0.0.1:5000**

---

## 🧪 Exemplos de uso

- Texto simples:
  > "Preciso de ajuda com meu acesso ao sistema"

- Upload de arquivo:
  - `email.txt`
  - `email.pdf`

A resposta exibirá:
- Categoria do email
- Sugestão de resposta automática

---

## 🛠️ Tecnologias Utilizadas

- **Python**
- **Flask**
- **Hugging Face Transformers**
- **Google Gemini API**
- **HTML5 / BootStrap / JavaScript**

---

## 📌 Observações Importantes

- O uso da IA de geração de respostas depende de limites do *free tier* da Google Gemini API
- O projeto foi desenvolvido com foco em clareza, modularização e facilidade de execução
- A classificação pode ser melhorada com mais dados de treinamento

---

## 📄 Licença


Este projeto é destinado exclusivamente para fins educacionais e avaliação técnica.
