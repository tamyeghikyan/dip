import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.datasets import mnist
from tensorflow import keras
from tensorflow.keras.layers import ELU, Dense, Flatten, Conv2D, MaxPooling2D, Dropout, BatchNormalization
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split

(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train = np.expand_dims(x_train, axis=-1) / 255.0
x_test = np.expand_dims(x_test, axis=-1) / 255.0
y_train_cat = keras.utils.to_categorical(y_train, 10)
y_test_cat = keras.utils.to_categorical(y_test, 10)


x_train_part, x_val_part, y_train_part, y_val_part = train_test_split(
    x_train, y_train_cat, test_size=0.2, random_state=42
)

datagen = ImageDataGenerator(
    rotation_range=10,
    width_shift_range=0.1,
    height_shift_range=0.1,
    zoom_range=0.1
)
train_generator = datagen.flow(x_train_part, y_train_part, batch_size=64)

# Callbacks
early_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
lr_reducer = ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=3)

if os.path.exists('model.h5'):
    model = load_model('model.h5')
    print("Model loaded.")
else:
    model = keras.Sequential([
        Conv2D(64, (3, 3), padding='same', input_shape=(28, 28, 1)),
        BatchNormalization(),
        ELU(),
        MaxPooling2D(pool_size=(2, 2)),

        Conv2D(128, (3, 3), padding='same'),
        BatchNormalization(),
        ELU(),

        Flatten(),


        Dense(128),
        BatchNormalization(),
        ELU(),
        Dropout(0.3),

        Dense(10, activation='softmax')
    ])

    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    model.fit(
        train_generator,
        validation_data=(x_val_part, y_val_part),
        epochs=1,
        callbacks=[early_stop, lr_reducer],
        steps_per_epoch=len(train_generator)
    )

    model.save('model.h5')
    print("Model saved.")

model.evaluate(x_test, y_test_cat)

# Предсказание одного примера
n = 1
x = np.expand_dims(x_test[n], axis=0)
res = model.predict(x)
print(res)
print(np.argmax(res))

plt.imshow(x_test[n].reshape(28, 28), cmap=plt.cm.binary)
plt.show()

# Предсказания по всему тестовому набору
pred = model.predict(x_test)
pred = np.argmax(pred, axis=1)

print(pred.shape)
print(pred[:20])
print(y_test[:20])

# Неправильно классифицированные примеры
mask = pred == y_test
print(mask[:10])

x_false = x_test[~mask]
y_false = y_test[~mask]

plt.figure(figsize=(10, 5))
for i in range(25):
    plt.subplot(5, 5, i + 1)
    plt.xticks([])
    plt.yticks([])
    plt.imshow(x_false[i].reshape(28, 28), cmap=plt.cm.binary)

plt.show()
