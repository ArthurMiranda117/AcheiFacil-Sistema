from flask import Blueprint, jsonify, request
from models.retirada import Retirada

retirada_bp = Blueprint('retirada', __name__)

@retirada_bp.route('/api/listaRetirada', methods=['GET'])
def Listar_Retirada():
    listarRetirada = Retirada.Listar_Retirada()
    return jsonify(listarRetirada)

@retirada_bp.route('/api/cadastroRetirada', methods=['POST'])
def Cadastrar_Retirada():
    data = request.get_json()

    item_ID = data.get('item_ID')
    nome_retirada = data.get('nome_retirada')
    cpf_retirada = data.get('cpf_retirada')
    data_retirada = data.get('data_retirada')
    atendente = data.get('atendente')

    id = Retirada.Cadastrar_Retirada(item_ID, nome_retirada, cpf_retirada, data_retirada, atendente)

    if id == 1:
        return jsonify({"message": "Retirada cadastrada com sucesso!"}), 201
    elif id == 2:
        return jsonify({"message": "Item não encontrado!"}), 404
    elif id == 3:
        return jsonify({"message": "Item já foi retirado!"}), 400
    else:
        return jsonify({"message": "Falhou em salvar os dados."}), 500

@retirada_bp.route('/api/excluiRetirada/<int:id>', methods=['DELETE'])
def Remover_Retirada(id):
    retirada = Retirada.Remover_Retirada(id)

    if retirada is None:
        return jsonify({"message": "Não foi possível remover o registro."}), 500

    return jsonify({"message": "Retirada removida com sucesso!"}), 200

@retirada_bp.route('/api/editarRetirada/<int:id>', methods=['GET'])
def Editar_Retirada(id):
    dados = Retirada.Editar_Retirada(id)
    return jsonify(dados)

@retirada_bp.route('/api/atualizarRetirada/<int:id>', methods=['PUT'])
def Atualizar_Retirada(id):
    data = request.get_json(force=True)

    item_ID = data.get('item_ID')
    nome_retirada = data.get('nome_retirada')
    cpf_retirada = data.get('cpf_retirada')
    data_retirada = data.get('data_retirada')
    atendente = data.get('atendente')

    retirada = Retirada.Atualizar_Retirada(id, item_ID, nome_retirada, cpf_retirada, data_retirada, atendente)

    if retirada == 0:
        return jsonify({"message": "Não foi possível alterar o registro."}), 500
    else:
        return jsonify({"message": "Retirada alterada com sucesso!"}), 200