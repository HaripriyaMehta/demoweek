from keras.models import load_model
import numpy as np
import cv2
import keras
from keras.models import Sequential, load_model
from keras import backend as K
import operator
K.set_image_dim_ordering('th')
import os


filename ='textfile.txt'
try:
    os.remove(filename)
except OSError:
    pass

image =cv2.imread('chair.jpg', 0)
img = cv2.resize(image, (28,28))
arr = np.array(img-255)
arr = np.array(arr/255.)
new_test_cnn = arr.reshape(1, 1, 28, 28).astype('float32')
print(new_test_cnn.shape)
model = load_model('quickdraw.model')

new_cnn_predict = model.predict(new_test_cnn, batch_size=32, verbose = 0)
pr = model.predict_classes(arr.reshape(1, 1, 28, 28))
max_index, max_value = max(enumerate(new_cnn_predict[0]), key=operator.itemgetter(1))


path = "quick_draw_images"

listoffiles = os.listdir(path)

print("This drawing is identifies as ", listoffiles[max_index])

file = open(filename, 'w')
file.write(str(listoffiles[3].replace(".npy",  "")))
file.close()




