

import matplotlib.pyplot as plt

image = plt.imread("image.png")
print(image.shape)

plt.imshow(image)
plt.show()