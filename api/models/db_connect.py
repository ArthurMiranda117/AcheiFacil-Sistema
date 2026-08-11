import mysql.connector
from mysql.connector import Error

class MySQLConnector:
    def __init__(self):
        self.config = {
            'host': 'localhost',
            'user': 'root',
            'password':'',
            'database': 'db_acheifacil'
        }
        self.conn = None
    def connect(self):
        """Estabelece a conexão com o banco de dados"""
        try:
            self.conn = mysql.connector.connect(**self.config)
            if self.conn.is_connected():
                return self.conn
        except Error as e:
            print(f"Erro ao conectar ao MySQL: {e}")
            return None
            
    def close(self):
        """Fecha a conexão"""
        if self.conn and self.conn.is_connected():
            self.conn.close()
            print("Conexão MySQL fechada")