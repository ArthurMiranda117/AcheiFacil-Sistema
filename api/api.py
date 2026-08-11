from flask import Flask
from controllers.item_controller import item_bp
from controllers.retirada_controller import retirada_bp


app = Flask(__name__)
app.register_blueprint(item_bp)
app.register_blueprint(retirada_bp)
