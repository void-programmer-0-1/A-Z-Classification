import torch
import torch.nn as nn
import torch.nn.functional as F

class NeuralNetwork(nn.Module):

  def __init__(self):
    super(NeuralNetwork,self).__init__()

    self.layer1 = nn.Sequential(
      nn.Conv2d(1,16,3,1,1),
      nn.BatchNorm2d(16),
      nn.ReLU(),
      nn.MaxPool2d(2,2)
    )

    self.layer2 = nn.Sequential(
      nn.Conv2d(16,32,3,1,1),
      nn.BatchNorm2d(32),
      nn.ReLU(),
      nn.MaxPool2d(2,2)
    )

    self.layer3 = nn.Sequential(
      nn.Conv2d(32,64,3,1,1),
      nn.BatchNorm2d(64),
      nn.ReLU(),
      nn.MaxPool2d(2,2)
    )

    self.layer4 = nn.Sequential(
      nn.Conv2d(64,128,3,1,1),
      nn.BatchNorm2d(128),
      nn.ReLU(),
      nn.MaxPool2d(2,2)
    )

    self.FC = nn.Sequential(
      nn.Linear(128,26)
    )


  def forward(self,x):
    
    x = torch.narrow(x, dim=2, start=3, length=1)
    x = x.reshape(1, 1, 280, 280)
    x = F.avg_pool2d(x, 10, stride=10)

    x = self.layer1(x)
    x = self.layer2(x)
    x = self.layer3(x)
    x = self.layer4(x)
    x = torch.flatten(x,1)
    x = self.FC(x)

    return x
