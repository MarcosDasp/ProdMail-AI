import pandas as pd
from datasets import Dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments

df = pd.read_csv('data/emails.csv')
dataset = Dataset.from_pandas(df)

tokenizer = AutoTokenizer.from_pretrained('distilbert-base-uncased')

def tokenize(batch):
    return tokenizer(
        batch['text'],
        padding=True,
        truncation=True,
    )

dataset = dataset.map(tokenize, batched=True)

model = AutoModelForSequenceClassification.from_pretrained(
    'distilbert-base-uncased',
    num_labels=2    
    )

training_args = TrainingArguments(
    output_dir='./model',
    per_device_train_batch_size=8,
    num_train_epochs=3,
    logging_steps=10,
    save_strategy='epoch',
    report_to='none'
)

trainer = Trainer(
    model = model,
    args = training_args,
    train_dataset = dataset,
)

trainer.train()

model.save_pretrained('model')
tokenizer.save_pretrained('model')