import torch
from model import NeuralNetwork


def main():
  pytorch_model = NeuralNetwork()
  pytorch_model.load_state_dict(torch.load("english.pt"))
  pytorch_model.eval()
  dummy_input = torch.zeros(280,280,4)
  torch.onnx.export(pytorch_model, dummy_input, 'onnx_modelv6.onnx', 
                    input_names=["input"],
                    output_names=["output"],
                    dynamic_axes={
                      "input" : {0: "batch_size"},
                      "output": {0: "batch_size"}
                    },
                    verbose=True)

if __name__ == '__main__':
  main()