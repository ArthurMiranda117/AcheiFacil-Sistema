from flask import Blueprint, jsonify, request
from models.item import Item

item_bp = Blueprint('item', __name__)

@item_bp.route('/api/listaItem', methods=['GET'])
def Listar_Item():
    listarItem = Item.Listar_Item()
    return jsonify(listarItem)

@item_bp.route('/api/cadastroItem', methods=['POST'])
def Cadastrar_Item():
    data = request.get_json()

    categoria = data.get('categoria')
    descricao = data.get('descricao')
    cor_item = data.get('cor_item')
    data_achado = data.get('data_achado')
    local_achado = data.get('local_achado')

    id = Item.Cadastrar_Item(categoria, descricao, cor_item, data_achado, local_achado)

    if id == 1:
        return jsonify({"message": "Item: " + categoria + " cadastrado com sucesso!"}), 201
    else:
        return jsonify({"message": "Falhou em salvar os dados."}), 500

@item_bp.route('/api/excluiItem/<int:id>', methods=['DELETE'])
def Remover_Item(id):
    item = Item.Remover_Item(id)

    if item is None:
        return jsonify({"message": "Não foi possível remover o registro."}), 500

    return jsonify({"message": "Item " + str(item['categoria']) + " removido com sucesso!"}), 200

@item_bp.route('/api/editarItem/<int:id>', methods=['GET'])
def Editar_Item(id):
    dados = Item.Editar_Item(id)
    return jsonify(dados)

@item_bp.route('/api/atualizarItem/<int:id>', methods=['PUT'])
def Atualizar_Item(id):
    data = request.get_json()

    categoria = data.get('categoria')
    descricao = data.get('descricao')
    cor_item = data.get('cor_item')
    data_achado = data.get('data_achado')
    local_achado = data.get('local_achado')

    resultado = Item.Atualizar_Item(id, categoria, descricao, cor_item, data_achado, local_achado)

    if resultado:
        return jsonify({"message": "Item atualizado com sucesso!"}), 200
    else:
        return jsonify({"message": "Erro ao atualizar item."}), 500