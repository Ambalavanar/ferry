import sqlite

# Sqlite Database Adapters
class SqliteDbAdapter(object):
    
    def __init__(self, conn_params):
        self.conn_params = conn_params
        
    def get_connection():
        #TODO: Create a DB connectio and return
        
    def test_connection():
        #TODO: Return true if connection can be established with given params
        
    def query(sql, params):
        #TODO: Run the SQL with given params and return the result as dictionary
        
    def update(sql, params):
        #TODO: Run a DML statement with given params
        
    def batch_update(sql, batchParams):
        #TODO: Run a DML statement with list of params
        
    def get_schemas():
        #TODO: Return all available Schemas / Databases in the given connection
        
    def get_objects(schemaName):
        #TODO: Return all DB Objects (Tables, Views, Synonymns)
        
    def get_elements(schemaName, objectName):
        #TODO: Return all columns from the given Table.
