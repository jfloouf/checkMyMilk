# test script to preform prediction on test images inside

# keras imports
from keras.applications.xception import Xception, preprocess_input
from keras.preprocessing import image
from keras.models import Model

# other imports
import numpy as np
import os
import json
import pickle
import cv2

# load the user configs
with open('conf.json') as f:    
	config = json.load(f)

# config variables
weights 		= config["weights"]
train_path 		= config["train_path"]
test_path 		= config["test_path"]
classifier_path = config["classifier_path"]

# load the trained logistic regression classifier
classifier = pickle.load(open(classifier_path, 'rb'))

# Load Xception model
base_model = Xception(weights=weights)
model = Model(inputs=base_model.input, outputs=base_model.get_layer('avg_pool').output)
image_size = (299, 299)

# get all the train labels
train_labels = os.listdir(train_path)

# get all the test images paths
test_images = os.listdir(test_path)

# loop through each image in the test data
for image_path in test_images:
	path 		= test_path + "/" + image_path
	img 		= image.load_img(path, target_size=image_size)
	x 			= image.img_to_array(img)
	x 			= np.expand_dims(x, axis=0)
	x 			= preprocess_input(x)
	feature 	= model.predict(x)
	flat 		= feature.flatten()
	flat 		= np.expand_dims(flat, axis=0)
	preds 		= classifier.predict(flat)
	prediction 	= train_labels[preds[0]]
	
	# perform prediction on test image
	print ("I think it is a " + prediction)
# 	img_color = cv2.imread(path, 1)
# 	cv2.putText(img_color, "I think it is a " + prediction, (140,445), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)
# 	cv2.imshow("test", img_color)

# 	# key tracker
# 	key = cv2.waitKey(0) & 0xFF
# 	if (key == ord('q')):
# 		cv2.destroyAllWindows()

