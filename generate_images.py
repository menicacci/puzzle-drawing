from PIL import Image, ImageDraw, ImageFont
import json
import os

def generate_image(puzzle, output_path):
    # Definisci le dimensioni dell'immagine
    image_width = 200
    image_height = 200
    cell_size = 50

    # Crea un'immagine vuota
    image = Image.new('RGB', (image_width, image_height), 'white')
    draw = ImageDraw.Draw(image)

    # Definisci il font
    font = ImageFont.load_default()

    for i, num in enumerate(puzzle):
        row = i // 4  # Numero di riga (0-3)
        col = i % 4  # Numero di colonna (0-3)

        # Calcola le coordinate del rettangolo della cella
        x1 = col * cell_size
        y1 = row * cell_size
        x2 = x1 + cell_size
        y2 = y1 + cell_size

        # Disegna il rettangolo della cella
        draw.rectangle([(x1, y1), (x2, y2)], outline='black')

        # Scrivi il numero all'interno della cella
        text_width, text_height = draw.textsize(str(num), font=font)
        text_x = x1 + (cell_size - text_width) // 2
        text_y = y1 + (cell_size - text_height) // 2
        draw.text((text_x, text_y), str(num), font=font, fill='black')

    # Salva l'immagine
    image.save(output_path)

# Carica le configurazioni iniziali dal file JSON
with open('configurations.json', 'r') as json_file:
    configurations = json.load(json_file)

# Verifica se la cartella "images" esiste, altrimenti creala
if not os.path.exists('images'):
    os.makedirs('images')

# Genera le immagini per tutte le configurazioni
for i, config in enumerate(configurations):
    # Genera un nome personalizzato per il file immagine
    image_name = '_'.join(map(str, config)) + '.png'

    # Crea il percorso completo per il file immagine
    image_path = os.path.join('images', image_name)

    # Genera l'immagine utilizzando il nome personalizzato
    generate_image(config, image_path)
