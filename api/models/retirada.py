from models.db_connect import MySQLConnector
from mysql.connector import Error

class Retirada:
    def __init__(self, title, content):
        self.title = title
        self.content = content

    @staticmethod
    def Cadastrar_Retirada(item_id, nome, cpf, data, atendente):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)


            cursor.execute("SELECT status FROM tb_item WHERE ID_itens = %s", (item_id,))
            item = cursor.fetchone()

            if item is None:
                return 2  # item não encontrado

            if item['status'] == 'retirado':
                return 3  # item já foi retirado

            script = "INSERT INTO tb_retirada (item_ID, nome_retirada, cpf_retirada, data_retirada, atendente) VALUES (%s,%s,%s,%s,%s)"
            cursor.execute(script, (item_id, nome, cpf, data, atendente))


            cursor.execute("UPDATE tb_item SET status = 'retirado' WHERE ID_itens = %s", (item_id,))

            conn.commit()
            return 1

        except Error as e:
            if conn:
                conn.rollback()
            print(f"Erro: {e}")
            return 0
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()

    @staticmethod
    def Listar_Retirada():
        db = MySQLConnector()
        conn = None
        resultado = []

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)
            sql = "SELECT * FROM tb_retirada"
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
    def Remover_Retirada(id):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            query = "SELECT * FROM tb_retirada WHERE ID_retirada = %s"
            cursor.execute(query, (id,))
            resultado = cursor.fetchone()

            sql = "DELETE FROM tb_retirada WHERE ID_retirada = %s"
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
    def Editar_Retirada(id):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            query = "SELECT * FROM tb_retirada WHERE ID_retirada = %s"
            cursor.execute(query, (id,))
            resultado = cursor.fetchone()
            return resultado

        except Error as e:
            print(f"Erro: {e}")
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()

    @staticmethod
    def Atualizar_Retirada(id, item_id, nome, cpf, data, atendente):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            query = "UPDATE tb_retirada SET item_ID = %s, nome_retirada = %s, cpf_retirada = %s, data_retirada = %s, atendente = %s WHERE ID_retirada = %s"
            cursor.execute(query, (item_id, nome, cpf, data, atendente, id))
            conn.commit()
            return 1

        except Error as e:
            if conn:
                conn.rollback()
            print(f"Erro: {e}")
            return 0
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()