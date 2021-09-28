import torch
from model import NeuralNetwork

net = NeuralNetwork()
net.load_state_dict(torch.load("englishv8.pt"))
net.eval()
model_input = torch.zeros(1,280,280,4)
torch.onnx.export(net,model_input,"english_onnx.onnx",
                  input_names=["input"],output_names=["output"],
                  dynamic_axes={
                      "input" : {0:"batch_size"},
                      "output" : {0:"batch_size"}
                  },
                  verbose=True)
