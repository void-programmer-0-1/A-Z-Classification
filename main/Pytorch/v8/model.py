import torch
import torch.nn as nn
import torch.nn.functional as F

class NeuralNetwork(nn.Module):

    def __init__(self):
        super(NeuralNetwork,self).__init__()

        self.conv1 = nn.Conv2d(1,16,3,1,1)
        self.conv2 = nn.Conv2d(16,32,3,1,1)
        self.conv3 = nn.Conv2d(32,64,3,1,1)
        self.conv4 = nn.Conv2d(64,128,3,1,1)

        self.dropout = nn.Dropout2d(0.2)

        self.FC = nn.Linear(128,26)

    def forward(self,x):
        
        x = x.reshape(280, 280, 4)
        x = torch.narrow(x, dim=2, start=3, length=1)
        x = x.reshape(1, 1, 280, 280)
        x = F.avg_pool2d(x, 10, stride=10)
        
        x = self.conv1(x)
        x = F.max_pool2d(x,2)
        x = F.relu(x)
        x = self.dropout(x)

        x = self.conv2(x)
        x = F.max_pool2d(x,2)
        x = F.relu(x)
        x = self.dropout(x)

        x = self.conv3(x)
        x = F.max_pool2d(x,2)
        x = F.relu(x)
        x = self.dropout(x)

        x = self.conv4(x)
        x = F.max_pool2d(x,2)
        x = F.relu(x)
        x = self.dropout(x)

        x = torch.flatten(x,1)
        x = self.FC(x)

        return x 
