CREATE TABLE wallet (
    id                  VARCHAR(200) PRIMARY KEY,
    studentId           VARCHAR(200) UNIQUE,
    totalMoneyAmount    float
);

CREATE TABLE wallet_stock (
    id              VARCHAR(200) PRIMARY KEY,
    stockId         VARCHAR(200),
    walletId        VARCHAR(200),
    stockAmount     float,
    moneyAmount     float,             
    FOREIGN KEY (stockId) REFERENCES stock(id),
    FOREIGN KEY (walletId) REFERENCES wallet(id)
);


CREATE TABLE stock (
    id              VARCHAR(200) PRIMARY KEY,
    name            VARCHAR(200) UNIQUE,
    currentPrice    float,
    maxPriceDay     int,
    minPriceDay     int,
    beingAffected   tinyint default 0,
    affectedStage   int NULL,
    startBeingAffectedAt datetime NULL,
    lastUpdate Date
); 

CREATE TABLE buy_history (
    id              VARCHAR(200) PRIMARY KEY,
    buyPrice        float,
    stockId         VARCHAR(200),
    walletId        VARCHAR(200),
    FOREIGN KEY (stockId) REFERENCES stock(id),
    FOREIGN KEY (walletId) REFERENCES wallet(id)
); 


CREATE TABLE news_affected (
    id                      VARCHAR(200) PRIMARY KEY,
    durationTimeInSeconds   INT, 
    affectedFactorNumber    INT,
    stage                   INT,
    stockId					VARCHAR(200),
    FOREIGN KEY (stockId) REFERENCES stock(id)    
);

CREATE TABLE stock_price_history (
    id      VARCHAR(200) PRIMARY KEY,
    price   float,
    at      datetime,
    stockId	VARCHAR(200),
    FOREIGN KEY (stockId) REFERENCES stock(id)
);

-- This is temp;
CREATE TABLE student (
    id                  VARCHAR(200) PRIMARY KEY
);