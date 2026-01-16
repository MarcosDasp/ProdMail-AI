from transformers import pipeline

classifier = pipeline(
    "text-classification",
    model="model",
    tokenizer="model"
)

def classify_email(text):
    result = classifier(text)[0]
    label = result['label']

    if label == 'LABEL_1':
        return "Produtivo"
    else:
        return "Improdutivo"