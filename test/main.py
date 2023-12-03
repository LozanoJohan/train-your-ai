import tensorflow as tf
from tensorflow.keras.datasets import cifar10
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten, Conv2D, MaxPooling2D
from tensorflow.keras.optimizers import Adam
import matplotlib.pyplot as plt

# Cargando y preparando el conjunto de datos CIFAR-10
(x_train, y_train), (x_test, y_test) = cifar10.load_data()

# Reduciendo la cantidad de datos para acelerar el entrenamiento
# Por ejemplo, usa solo el 10% de los datos
reduction_factor = 0.1
num_train = int(x_train.shape[0] * reduction_factor)
num_test = int(x_test.shape[0] * reduction_factor)

x_train, y_train = x_train[:num_train], y_train[:num_train]
x_test, y_test = x_test[:num_test], y_test[:num_test]

x_train, x_test = x_train / 255.0, x_test / 255.0

# Creando el modelo
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    Flatten(),
    Dense(64, activation='relu'),
    Dense(10)
])

# Compilando el modelo
model.compile(optimizer=Adam(),
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

# Entrenando el modelo
history = model.fit(x_train, y_train, epochs=10, validation_data=(x_test, y_test))


test_loss, test_acc = model.evaluate(x_test,  y_test, verbose=2)
print(f'Test accuracy: {test_acc}')

model.save('saved_model/my_model.h5')
