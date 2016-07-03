-- DDL Script
-- Table: DS_CONNECTION - Data Store Connection
CREATE TABLE IF NOT EXISTS DS_CONNECTION
(
    CONN_ID             INT PRIMARY KEY,
    CONN_NAME           TEXT NOT NULL,
    CONN_TYPE           TEXT NOT NULL,
    CONN_DESC           TEXT,
    DB_HOSTNAME         TEXT,
    DB_PORT             INT,
    DB_SID              TEXT,
    DB_SCHEMA           TEXT,
    USERNAME            TEXT,
    PASSWORD            TEXT,
    URL                 TEXT,
    FILE_ACCESS_TYPE    TEXT,
    FTP_HOSTNAME        TEXT,
    FILE_PATH           TEXT,
    FILE_NAME_PATTERN   TEXT,
    FILE_DELIMITER      TEXT,
    FILE_TEXT_QUALIFIER TEXT,
    FILE_HAS_HEADER     TEXT,
    AUTH_TYPE           TEXT,
    AUTH_SCOPE          TEXT,
    MQ_TYPE             TEXT,
    MQ_SERVER           TEXT,
    MQ_QUEUE            TEXT,
    MQ_EXCHANGE         TEXT,
    CREATE_USER         TEXT,
    CREATE_TS           TEXT,
    UPDATE_USER         TEXT,
    UPDATE_TS           TEXT,
    SEC_GRP             TEXT
);

-- Table: DS_