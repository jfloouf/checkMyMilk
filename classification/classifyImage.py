# -*- coding: utf-8 -*-
"""
Created on Sat Apr 10 18:25:41 2021
Inspiration source: https://gogul.dev/software/flower-recognition-deep-learning

@author: Johannes
"""
######## IMPORT LIBRARIES ########
 
# keras imports
from keras.applications.xception import Xception, preprocess_input
from keras.preprocessing import image
from keras.models import Model

# other imports
import numpy as np
import os
import json
import pickle
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import time

######## LOAD CLASSIFIER MODEL ########

# Load user configs and variables
with open('conf.json') as f:
    config = json.load(f)
weights = config["weights"]
classifier_path = config["classifier_path"]

# Load the trained log regression model for milk images
classifier = pickle.load(open(classifier_path, 'rb'))

# Load Xception model
base_model = Xception(weights=weights)
3
model = Model(inputs=base_model.input, outputs=base_model.get_layer('avg_pool').output)
image_size = (299, 299)

def classifyImage(path_to_img):
    """
    Function that uses the loaded Keras model with an additional logistic
    regression model to classify images as milk (label 0) or something else
    (label 1).

    Parameters
    ----------
    path_to_img : path to image to classify

    Returns
    -------
    0 if the image contained milk, 1 otherwise

    """
    # Use Xception model together with the log regression model
    img = image.load_img(path_to_img, target_size=image_size)
    x = np.expand_dims(image.img_to_array(img), axis=0)
    x_preproc = preprocess_input(x)
    feature = model.predict(x_preproc)
    flat = np.expand_dims(feature.flatten(), axis=0)
    preds = classifier.predict(flat)
    return preds[0] # predicts 0 for milk, 1 otherwise

######## TESTING THE MODEL ########

# Load test images
test_imgs_path = config["test_path"]
test_imgs = os.listdir(test_imgs_path)
# Loop through images, plot and classify
for image_path in test_imgs:
    path = test_imgs_path + "/" + image_path
    prediction = classifyImage(path)
    img = mpimg.imread(path)
    imgplot = plt.imshow(img)
    plt.show()
    if prediction == 0:
        print("THIS IS MILK!")
    else:
        print("THIS IS SOMETHING ELSE!")
    time.sleep(1)