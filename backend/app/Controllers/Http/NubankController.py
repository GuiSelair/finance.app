from flask import Flask
from pynubank import Nubank

app = Flask(__name__)
nu = Nubank()

@app.route("/login", methods=["GET"])
def login():
  uuid, qr_code = nu.get_qr_code()
  qr_code.print_ascii(invert=True)
  input('Após escanear o QRCode pressione enter para continuar')
  try:
    nu.authenticate_with_qr_code("cpf", "senha", uuid)
    return "Logado com sucesso"
  except pynubank.nubank.NuException:
    print("ERROR: Usuário não autorizado.")

@app.route("/accountBalance")
def accountBalance():
  return nu.get_account_balance()

@app.route("/accountStatemests")
def accountStatemests():
  return nu.get_account_statements()

if __name__ == "__main__":
  app.run()

