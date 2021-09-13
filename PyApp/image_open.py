import cv2

image = cv2.imread("image.png")

image = image * 255

print(image.shape)

cv2.imshow("image",image)
cv2.waitKey(0)
cv2.destroyAllWindows()