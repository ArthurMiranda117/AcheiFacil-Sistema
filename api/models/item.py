from models.db_connect import MySQLConnector
from mysql.connector import Error

class Item:
    def __init__(self, title, content):
        self.title = title
        self.content = content

    @staticmethod
    def Cadastrar_Item(categoria, descricao, cor, data, local):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            script = "INSERT INTO tb_item (categoria, descricao, cor_item, data_achado, local_achado) VALUES (%s,%s,%s,%s,%s)"
            cursor.execute(script, (categoria, descricao, cor, data, local))
            conn.commit()
            return 1

        except Error as e:
            print(f"Erro: {e}")
            return 0
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()

    @staticmethod
    def Listar_Item():
        db = MySQLConnector()
        conn = None
        resultado = []

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)
            sql = "SELECT * FROM tb_item"
            cursor.execute(sql)
            resultado = cursor.fetchall()

        except Error as e:
            print(f"Erro: {e}")
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()

        return resultado

    @staticmethod
    def Remover_Item(id):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            query = "SELECT categoria, cor_item FROM tb_item WHERE ID_itens = %s"
            cursor.execute(query, (id,))
            resultado = cursor.fetchone()

            sql = "DELETE FROM tb_item WHERE ID_itens = %s"
            cursor.execute(sql, (id,))
            conn.commit()

            return resultado

        except Error as e:
            if conn:
                conn.rollback()
            print(f"Erro: {e}")
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()

    @staticmethod
    def Editar_Item(id):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            sql = "SELECT * FROM tb_item WHERE ID_itens = %s"
            cursor.execute(sql, (id,))
            resultado = cursor.fetchone()

        except Error as e:
            print(f"Erro: {e}")
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()

        return resultado

    @staticmethod
    def Atualizar_Item(id, categoria, descricao, cor, data, local):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            sql = "UPDATE tb_item SET categoria = %s, descricao = %s, cor_item = %s, data_achado = %s, local_achado = %s WHERE ID_itens = %s"
            cursor.execute(sql, (categoria, descricao, cor, data, local, id))
            conn.commit()
            return 1

        except Error as e:
            print(f"Erro: {e}")
            return 0
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()